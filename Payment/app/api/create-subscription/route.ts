import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_PRICE_IDS } from "@/lib/plan-prices";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      paymentMethodId,
      plan,
      email,
      cardholderName,
      country,
      postalCode,
      instagramUsername,
      couponCode,
    } = body as {
      paymentMethodId?: string;
      plan?: "grow" | "scale";
      email?: string;
      cardholderName?: string;
      country?: string;
      postalCode?: string;
      instagramUsername?: string;
      couponCode?: string;
    };

    if (!paymentMethodId || !plan || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const priceId = STRIPE_PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    // 1. Find or create the customer
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existing.data[0] ??
      (await stripe.customers.create({
        email,
        name: cardholderName,
        address: country ? { country, postal_code: postalCode } : undefined,
        metadata: { instagramUsername: instagramUsername ?? "" },
      }));

    // 2. Attach the payment method and make it the default for invoices
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // 3. Resolve an optional promotion code
    let discounts: Stripe.SubscriptionCreateParams["discounts"] | undefined;
    if (couponCode) {
      const promo = await stripe.promotionCodes.list({
        code: couponCode,
        active: true,
        limit: 1,
      });
      if (!promo.data[0]) {
        return NextResponse.json(
          { message: "That coupon code isn't valid or has expired." },
          { status: 400 },
        );
      }
      discounts = [{ promotion_code: promo.data[0].id }];
    }

    // 4. Create the subscription. `default_incomplete` lets us confirm the
    // first payment on the client (handles 3-D Secure / SCA automatically).
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      discounts,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: { instagramUsername: instagramUsername ?? "", plan },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (err: any) {
    console.error("create-subscription error:", err);
    return NextResponse.json(
      { message: err.message ?? "Something went wrong" },
      { status: 500 },
    );
  }
}
