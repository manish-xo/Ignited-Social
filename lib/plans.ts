export interface PlanFeature {
  text: string;
  note?: string;
}

export interface BothPlans {
  slug: "grow" | "scale";
  name: string;
  price: number;
  originalPrice?: number;
  features: PlanFeature[];
  testimonial: {
    quote: string;
    name: string;
    handle: string;
  };
}

export const BothPlan: Record<string, BothPlans> = {
  grow: {
    slug: "grow",
    name: "Grow",
    price: 139,
    features: [
      { text: "Consistent, organic follower growth" },
      { text: "Estimated 150–500+ followers per month" },
      {
        text: "Dedicated Growth Manager",
        note: "Support via email, phone, or video call",
      },
      { text: "Core audience targeting" },
      { text: "30-day money-back guarantee" },
    ],
    testimonial: {
      quote:
        "3 months in and our account has already gained 1,100 organic followers. I think that's pretty impressive!",
      name: "David",
      handle: "@echoic_audio · 10.5k followers",
    },
  },

  scale: {
    slug: "scale",
    name: "Scale",
    price: 199,
    originalPrice: 379,
    features: [
      { text: "Accelerated, higher-volume growth" },
      { text: "Estimated 250–800+ followers per month" },
      {
        text: "Dedicated Senior Growth Manager",
        note: "Support via email, phone, or video call",
      },
      { text: "Advanced audience targeting" },
      { text: "Strategic content review" },
      { text: "30-day money-back guarantee" },
    ],
    testimonial: {
      quote:
        "3 months in and our account has already gained 1,100 organic followers. I think that's pretty impressive!",
      name: "David",
      handle: "@echoic_audio · 10.5k followers",
    },
  },
};

export function getPlan(slug?: string): BothPlans {
  const normalizedSlug = slug?.toLowerCase();

  if (normalizedSlug === "grow" || normalizedSlug === "scale") {
    return BothPlan[normalizedSlug];
  }
  // if (slug && BothPlan[slug]) return BothPlan[slug];
  return BothPlan.grow; // sensible default if no/invalid plan param
}
