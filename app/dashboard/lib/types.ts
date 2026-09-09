export interface GrowthStats {
  totalGrowth: number | null; // null renders as "—", matches "not enough data yet"
  followers: number;
  following: number;
  posts: number;
}

export type ChartMetric = "followers" | "following" | "growth";
export type ChartRange = "7d" | "4w" | "12m";

export interface ChartPoint {
  label: string;
  value: number;
}

export interface GrowthManager {
  name: string;
  avatarInitial: string;
  activityNote: string;
}

export interface TargetingStrategy {
  targetAudience: string;
  niche: string;
  maxFollowing: string;
  targetGender: string;
  locationAccuracy: string;
  goals: string[];
  locations: string[];
  inspirationalProfiles: string[];
  hashtags: string[];
  additionalInfo: string;
}

export interface BillingInfo {
  billingName: string;
  cardBrand: string;
  cardLast4: string;
  country: string;
  zipCode: string;
}

export interface SubscriptionInfo {
  purchasedAddons: string[];
  unpaidAmount: number;
  nextBillingDate: string;
  nextBillingAmount: number;
}

export interface PlanInfo {
  name: string;
  price: number;
  features: string[];
}

export interface Invoice {
  number: string;
  status: "paid" | "failed" | "pending";
  date: string;
  amount: number;
}

export interface AddonOffer {
  name: string;
  tagline: string;
  discountPct: number;
  monthlyPrice: number;
  features: string[];
}

export interface DashboardData {
  instagramUsername: string;
  campaignStatus: string;
  planName: string;
  growthStats: GrowthStats;
  /** null until real analytics history exists — drives the chart's empty state */
  chartDataByRange: Record<
    ChartRange,
    Record<ChartMetric, ChartPoint[]>
  > | null;
  hasGrowthHistory: boolean;
  growthManager: GrowthManager;
  targeting: TargetingStrategy;
  billing: BillingInfo;
  subscription: SubscriptionInfo;
  plan: PlanInfo;
  invoices: Invoice[];
  addonOffer: AddonOffer;
}
