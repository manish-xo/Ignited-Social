import { loadStripe, Stripe } from "@stripe/stripe-js";

// Singleton so we don't reload stripe.js on every render.
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );
  }
  return stripePromise;
};
