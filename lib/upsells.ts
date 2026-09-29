export interface UpsellOffer {
  slug: "content-creation" | "content-creation-plus";
  name: string;
  recommended?: boolean;
  monthlyPrice: number; // ongoing price, from month 2 onward
  discountPct: number; // e.g. 35 -> 35% off the first month
  features: string[];
  // PayPal plan: first month at discountPct off (trial cycle), then monthlyPrice
  paypalPlanId: string;
}

export const UPSELL_OFFERS: UpsellOffer[] = [
  {
    slug: "content-creation",
    name: "Content Creation",
    monthlyPrice: 199,
    discountPct: 35,
    features: [
      "12 static posts per month — thumb-stopping and on-brand",
      "Professionally designed around your direction",
      "Scheduled and posted with captions",
    ],
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_CONTENT_CREATION as string,
  },
  {
    slug: "content-creation-plus",
    name: "Content Creation+",
    recommended: true,
    monthlyPrice: 289,
    discountPct: 35,
    features: [
      "Everything in Content Creation",
      "Plus 3 Reels per month — the #1 format for reach",
      "Priority creative review from your manager",
    ],
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_CONTENT_CREATION_PLUS as string,
  },
];

export function getUpsellOffer(slug: string) {
  const offer = UPSELL_OFFERS.find((o) => o.slug === slug);
  if (!offer) throw new Error(`Unknown upsell offer: ${slug}`);
  return offer;
}

export function firstMonthPrice(offer: UpsellOffer) {
  return Math.round(offer.monthlyPrice * (1 - offer.discountPct / 100));
}
