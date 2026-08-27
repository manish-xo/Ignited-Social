import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getUpsellOffer } from "@/lib/upsells";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { customerId, offerSlug } = (await req.json()) as {
      customerId?: string;
      offerSlug?: string;
    };

    if (!customerId || !offerSlug) {
      return NextResponse.json(
        { message: "Missing customer or offer" },
        { status: 400 },
      );
    }

    const offer = getUpsellOffer(offerSlug);

    // Confirm the customer actually has a saved default payment method
    // before attempting an off-session charge.
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }
    const defaultPm = customer.invoice_settings?.default_payment_method;
    if (!defaultPm) {
      return NextResponse.json(
        { message: "No saved card on file for this customer" },
        { status: 400 },
      );
    }

    // A reusable "N% off, first invoice only" coupon. Create this once in
    // the Stripe Dashboard (Coupons -> New -> percent off, duration: once)
    // and set STRIPE_COUPON_FIRST_MONTH to its id — reused for every offer
    // here since they all currently run the same first-month discount.
    const couponId = process.env.STRIPE_COUPON_FIRST_MONTH as string;

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: offer.priceId }],
      discounts: couponId ? [{ coupon: couponId }] : undefined,
      default_payment_method: defaultPm as string,
      off_session: true, // customer isn't actively completing a checkout form
      payment_behavior: "error_if_incomplete", // fail loudly instead of silently pending
      expand: ["latest_invoice.payment_intent"],
      metadata: { addon: offer.slug },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (err: any) {
    // Stripe throws a specific error when the saved card needs the customer
    // to re-authenticate (rare for saved cards, but happens with some banks).
    if (err.code === "authentication_required") {
      return NextResponse.json(
        {
          message:
            "Your bank needs you to confirm this payment. Please re-enter your card details to continue.",
        },
        { status: 402 },
      );
    }

    console.error("upsell charge error:", err);
    return NextResponse.json(
      { message: err.message ?? "Couldn't complete that charge" },
      { status: 500 },
    );
  }
}
