export interface AddonOffer {
  slug: "targeted-comments" | "dm-new-followers";
  name: string;
  monthlyPrice: number;
  description: string;
  recommended?: boolean;
  // Stripe recurring Price for this add-on's subscription item
  priceId: string;
}

export const ADDON_OFFERS: AddonOffer[] = [
  {
    slug: "targeted-comments",
    name: "Targeted Comments",
    monthlyPrice: 14,
    recommended: true,
    description:
      "We leave relevant comments on posts in your niche to drive profile visits and lift engagement.",
    priceId: process.env.STRIPE_PRICE_TARGETED_COMMENTS as string,
  },
  {
    slug: "dm-new-followers",
    name: "DM Your New Followers",
    monthlyPrice: 19,
    description:
      "Personalized welcome DMs that turn new followers into engaged, returning fans.",
    priceId: process.env.STRIPE_PRICE_DM_NEW_FOLLOWERS as string,
  },
];

export function getAddonOffers(slugs: string[]) {
  return ADDON_OFFERS.filter((a) => slugs.includes(a.slug));
}
