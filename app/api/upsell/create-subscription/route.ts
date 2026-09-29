import { NextRequest, NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUpsellOffer, firstMonthPrice } from "@/lib/upsells";
import { paypalUpsellSchema } from "@/schema/paypal-upsell";
import { readFlow, writeFlow } from "@/lib/flow/session";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = paypalUpsellSchema.safeParse(body);

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
      offerSlug,
      parentSubscriptionId,
      email: formEmail,
      instagramUsername,
    } = parsed.data;

    const offer = getUpsellOffer(offerSlug);

    const subscription = await paypalFetch(
      `/v1/billing/subscriptions/${subscriptionID}`,
    );

    // Right after approval PayPal can still report APPROVED for a few seconds
    // before flipping to ACTIVE — both mean the buyer agreed to the plan.
    if (!["ACTIVE", "APPROVED"].includes(subscription.status)) {
      return NextResponse.json(
        {
          message: `Add-on isn't active yet (status: ${subscription.status})`,
        },
        { status: 400 },
      );
    }

    // Don't trust the offer the browser sent — make sure the subscription the
    // buyer actually approved is for that add-on.
    if (subscription.plan_id !== offer.paypalPlanId) {
      console.error("PayPal upsell plan mismatch:", {
        subscriptionID,
        claimed: offerSlug,
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
      console.error("PayPal upsell had no subscriber email:", subscriptionID);
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
      .from("paypal_upsells")
      .insert({
        signup_id: signup?.id ?? null,
        paypal_subscription_id: subscriptionID,
        parent_subscription_id: parentSubscriptionId || null,
        offer: offerSlug,
        first_month_amount: firstMonthPrice(offer),
        monthly_amount: offer.monthlyPrice,
        status: subscription.status,
        email,
        instagram_username: instagramUsername || null,
      });

    if (insertError) {
      console.error("paypal_upsells insert error:", insertError);

      return NextResponse.json(
        { message: "Couldn't save your add-on." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      upsellId: subscriptionID,
      status: "active",
    });
    // Add-on bought — move on to the add-ons step (only from the upsell step).
    const flow = await readFlow(req);
    return flow?.stage === "paid"
      ? writeFlow(response, { ...flow, stage: "upsell_done" })
      : response;
  } catch (err) {
    console.error("upsell/create-subscription (PayPal) error:", err);

    return NextResponse.json(
      { message: "Couldn't verify your add-on. Please try again." },
      { status: 500 },
    );
  }
};
