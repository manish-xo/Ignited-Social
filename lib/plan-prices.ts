// Create these Prices in the Stripe Dashboard (Product catalog -> Prices)
// and drop the IDs into your .env — see .env.example.
export const STRIPE_PRICE_IDS: Record<"grow" | "scale", string> = {
  grow: process.env.STRIPE_PRICE_GROW as string,
  scale: process.env.STRIPE_PRICE_SCALE as string,
};
