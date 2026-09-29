export type AddonSlug = "targeted-comments" | "dm-new-followers";

export interface AddonOffer {
  slug: AddonSlug;
  name: string;
  monthlyPrice: number;
  description: string;
  recommended?: boolean;
  // PayPal plan for this add-on on its own
  paypalPlanId: string;
}

export const ADDON_OFFERS: AddonOffer[] = [
  {
    slug: "targeted-comments",
    name: "Targeted Comments",
    monthlyPrice: 14,
    recommended: true,
    description:
      "We leave relevant comments on posts in your niche to drive profile visits and lift engagement.",
    paypalPlanId: process.env
      .NEXT_PUBLIC_PAYPAL_PLAN_ID_TARGETED_COMMENTS as string,
  },
  {
    slug: "dm-new-followers",
    name: "DM Your New Followers",
    monthlyPrice: 19,
    description:
      "Personalized welcome DMs that turn new followers into engaged, returning fans.",
    paypalPlanId: process.env
      .NEXT_PUBLIC_PAYPAL_PLAN_ID_DM_NEW_FOLLOWERS as string,
  },
];

// A PayPal subscription covers exactly one plan, so picking both add-ons uses
// a bundle plan priced at the sum of the two ($14 + $19 = $33/mo).
export const ADDONS_BUNDLE_PLAN_ID = process.env
  .NEXT_PUBLIC_PAYPAL_PLAN_ID_ADDONS_BUNDLE as string;

export function getAddonOffers(slugs: string[]) {
  return ADDON_OFFERS.filter((a) => slugs.includes(a.slug));
}

/** The PayPal plan to subscribe to for a given selection of add-ons. */
export function getAddonPlanId(slugs: string[]): string | null {
  const offers = getAddonOffers(slugs);
  if (offers.length === 0) return null;
  if (offers.length === ADDON_OFFERS.length) return ADDONS_BUNDLE_PLAN_ID;
  return offers[0].paypalPlanId;
}
