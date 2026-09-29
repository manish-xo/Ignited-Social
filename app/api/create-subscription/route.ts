import { NextRequest, NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { paypalSubscriptionSchema } from "@/schema/paypal-subscription";
import { getPaypalPlanId } from "@/lib/paypal/plans";
import { readFlow, writeFlow } from "@/lib/flow/session";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = paypalSubscriptionSchema.safeParse(body);

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
      plan,
      email: formEmail,
      fullName,
      country,
      postalCode,
      instagramUsername,
    } = parsed.data;

    const subscription = await paypalFetch(
      `/v1/billing/subscriptions/${subscriptionID}`,
    );
    // Right after approval PayPal can still report APPROVED for a few seconds
    // before flipping to ACTIVE — both mean the buyer agreed to the plan.
    if (!["ACTIVE", "APPROVED"].includes(subscription.status)) {
      return NextResponse.json(
        {
          message: `Subscription isn't active yet (status: ${subscription.status})`,
        },
        { status: 400 },
      );
    }

    // Don't trust the plan the browser sent — make sure the subscription the
    // buyer actually approved is for that plan.
    if (subscription.plan_id !== getPaypalPlanId(plan)) {
      console.error("PayPal plan mismatch:", {
        subscriptionID,
        claimed: plan,
        actual: subscription.plan_id,
      });
      return NextResponse.json(
        { message: "Subscription plan doesn't match. Please contact support." },
        { status: 400 },
      );
    }

    // Prefer the email typed into the form (that's what signup used); the
    // PayPal account email can be different.
    const email: string | null =
      formEmail ?? subscription.subscriber?.email_address ?? null;

    if (!email) {
      console.error(
        "PayPal subscription had no subscriber email:",
        subscriptionID,
      );
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
        {
          message: "Couldn't find your signup information.",
        },
        { status: 500 },
      );
    }

    // CHANGED — was "paypal_subsriptions" (missing the "c"), which meant
    // this insert was silently failing every time.
    const { error: insertError } = await supabaseAdmin
      .from("paypal_subscriptions")
      .insert({
        signup_id: signup?.id ?? null,
        paypal_subscription_id: subscriptionID,
        plan,
        status: subscription.status,
        email,
        full_name: fullName || null,
        country: country || null,
        postal_code: postalCode || null,
        instagram_username: instagramUsername || null,
      });

    if (insertError) {
      console.error("paypal_subscriptions insert error:", insertError);

      return NextResponse.json(
        { message: "Couldn't save your subscription." },
        { status: 500 },
      );
    }
    // Payment verified with PayPal — unlock the upsell step (and lock /payment).
    const flow = await readFlow(req);
    return writeFlow(
      NextResponse.json({ customerId: subscriptionID, status: "active" }),
      {
        signupId: flow?.signupId ?? signup?.id ?? "",
        email: flow?.email ?? email,
        username: flow?.username ?? instagramUsername ?? "",
        plan,
        stage: "paid",
        subscriptionId: subscriptionID,
      },
    );
  } catch (err) {
    console.error("create-subscription (PayPal) error:", err);

    return NextResponse.json(
      {
        message: "Couldn't verify your subscription. Please try again.",
      },
      { status: 500 },
    );
  }
};
