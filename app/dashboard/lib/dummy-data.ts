import type { DashboardData } from "./types";

export const DUMMY_DASHBOARD_DATA: DashboardData = {
  instagramUsername: "yourhandle",
  campaignStatus: "Waiting for Setup",
  planName: "Scale",

  growthStats: {
    totalGrowth: null,
    followers: 1029,
    following: 337,
    posts: 139,
  },
  chartDataByRange: null,
  hasGrowthHistory: false,

  growthManager: {
    name: "Maya",
    avatarInitial: "M",
    activityNote:
      "Your account is being set up. Manager activity usually starts showing up here within the first few days.",
  },

  targeting: {
    targetAudience:
      "Adults interested in outdoor recreation, hiking, and mountain travel.",
    niche: "Outdoors",
    maxFollowing: "6,000",
    targetGender: "All",
    locationAccuracy: "Local Only",
    goals: ["More Followers", "Build Community"],
    locations: ["Delhi", "Dharamshala"],
    inspirationalProfiles: ["@adventure", "@dharamshalalocal"],
    hashtags: ["#himachal", "#hiking", "#campinglife"],
    additionalInfo: "No additional info set.",
  },

  billing: {
    billingName: "Alex Johnson",
    cardBrand: "Visa",
    cardLast4: "4242",
    country: "India",
    zipCode: "110001",
  },
  subscription: {
    purchasedAddons: [],
    unpaidAmount: 0,
    nextBillingDate: "Oct 17, 2026",
    nextBillingAmount: 199,
  },
  plan: {
    name: "Scale",
    price: 199,
    features: [
      "Real Instagram followers — real people",
      "No bots, ever",
      "Targeting by niche, location, and gender",
      "Dedicated growth manager",
      "Cancel anytime — zero lock-in",
    ],
  },
  invoices: [
    { number: "INV-001", status: "paid", date: "Sep 17, 2026", amount: 199 },
  ],
  addonOffer: {
    name: "Content Creation",
    tagline: "Never worry about what to post again.",
    discountPct: 35,
    monthlyPrice: 199,
    features: [
      "12 custom posts designed monthly",
      "Matched to your brand",
      "Scheduled and posted for you",
    ],
  },
};
