import { NextRequest, NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAddonOffers, getAddonPlanId } from "@/app/Addons/lib/addons";
import { paypalAddonsSchema } from "@/schema/paypal-addons";
import { readFlow, writeFlow } from "@/lib/flow/session";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = paypalAddonsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }
    const {
      subscriptionID,
      addonSlugs,
      parentSubscriptionId,
      email: formEmail,
      instagramUsername,
    } = parsed.data;

    const offers = getAddonOffers(addonSlugs);
    const expectedPlanId = getAddonPlanId(addonSlugs);

    const subscription = await paypalFetch(
      `/v1/billing/subscriptions/${subscriptionID}`,
    );

    // Right after approval PayPal can still report APPROVED for a few seconds
    // before flipping to ACTIVE — both mean the buyer agreed to the plan.
    if (!["ACTIVE", "APPROVED"].includes(subscription.status)) {
      return NextResponse.json(
        {
          message: `Add-ons aren't active yet (status: ${subscription.status})`,
        },
        { status: 400 },
      );
    }

    // Don't trust the selection the browser sent — make sure the subscription
    // the buyer actually approved is the plan for exactly those add-ons.
    if (subscription.plan_id !== expectedPlanId) {
      console.error("PayPal add-ons plan mismatch:", {
        subscriptionID,
        claimed: addonSlugs,
        actual: subscription.plan_id,
      });
      return NextResponse.json(
        { message: "Add-on plan doesn't match. Please contact support." },
        { status: 400 },
      );
    }

    // Prefer the email from signup/payment (sent from Redux); the PayPal
    // account email can be different.
    const email: string | null =
      (formEmail ?? subscription.subscriber?.email_address ?? null)
        ?.trim()
        .toLowerCase() ?? null;

    if (!email) {
      console.error("PayPal add-ons had no subscriber email:", subscriptionID);
      return NextResponse.json(
        {
          message:
            "Couldn't retrieve your email from PayPal. Please contact support.",
        },
        { status: 500 },
      );
    }

    const { data: signup, error: signupError } = await supabaseAdmin
      .from("Signup")
      .select("id")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (signupError) {
      console.error("Signup lookup error:", signupError);

      return NextResponse.json(
        { message: "Couldn't find your signup information." },
        { status: 500 },
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from("paypal_addons")
      .insert({
        signup_id: signup?.id ?? null,
        paypal_subscription_id: subscriptionID,
        parent_subscription_id: parentSubscriptionId || null,
        addons: offers.map((o) => o.slug),
        monthly_amount: offers.reduce((sum, o) => sum + o.monthlyPrice, 0),
        status: subscription.status,
        email,
        instagram_username: instagramUsername || null,
      });

    if (insertError) {
      console.error("paypal_addons insert error:", insertError);

      return NextResponse.json(
        { message: "Couldn't save your add-ons." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      addonSubscriptionId: subscriptionID,
      status: "active",
    });
    // Add-ons bought — unlock "setup complete" (only from the add-ons step).
    const flow = await readFlow(req);
    return flow?.stage === "upsell_done"
      ? writeFlow(response, {
          ...flow,
          stage: "addons_done",
          addons: offers.map((o) => o.slug),
        })
      : response;
  } catch (err) {
    console.error("addons/create-subscription (PayPal) error:", err);

    return NextResponse.json(
      { message: "Couldn't verify your add-ons. Please try again." },
      { status: 500 },
    );
  }
};
