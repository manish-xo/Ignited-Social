import { NextRequest, NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { paypalSubscriptionSchema } from "@/schema/paypal-subscription";

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
      email,
      fullName,
      country,
      postalCode,
      instagramUsername,
    } = parsed.data;

    const subscription = await paypalFetch(
      `/v1/billing/subscriptions/${subscriptionID}`,
    );
    if (subscription.status !== "ACTIVE") {
      return NextResponse.json(
        {
          message: `Subscription isn't active yet (status: ${subscription.status})`,
        },
        { status: 400 },
      );
    }

    const { data: signup, error: signupError } = await supabaseAdmin
      .from("signups")
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
    return NextResponse.json({
      customerId: subscriptionID,
      status: "active",
    });
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
