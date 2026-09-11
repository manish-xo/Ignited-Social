export const PAYPAL_PLAN_IDS: Record<"grow" | "scale", string> = {
  grow: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GROW as string,
  scale: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SCALE as string,
};

export const getPaypalPlanId = (slug: "grow" | "scale") => {
  const id = PAYPAL_PLAN_IDS[slug];

  if (!id) {
    throw new Error(`Missing PayPal plan id for "${slug}" — check .env.local`);
  }

  // Strips a trailing ";" (or any stray whitespace) if one sneaks into the
  // env value — .trim() alone does NOT do this, ";" isn't whitespace.
  return id.replace(/[;\s]+$/, "");
};
