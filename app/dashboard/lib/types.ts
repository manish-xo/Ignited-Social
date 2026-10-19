export interface GrowthStats {
  totalGrowth: number | null; // null renders as "—", matches "not enough data yet"
  // null until the first Instagram snapshot is fetched
  followers: number | null;
  following: number | null;
  posts: number | null;
}

export type ChartMetric = "followers" | "following" | "growth";
export type ChartRange = "7d" | "4w" | "12m";

// A type alias (not an interface) so it fits EvilCharts' Record<string, unknown> rows.
export type ChartPoint = {
  label: string;
  value: number;
};

export type ChartData = Record<ChartRange, Record<ChartMetric, ChartPoint[]>>;

/** Shared by both tabs; read once in the dashboard layout. */
export interface DashboardShellData {
  instagramUsername: string | null;
  profilePicUrl: string | null;
  planName: string | null;
  /** Main PayPal subscription status, e.g. "ACTIVE"; null if none found */
  subscriptionStatus: string | null;
}

export interface GrowthManager {
  name: string;
  avatarInitial: string;
  activityNote: string;
}

export interface TargetingStrategy {
  targetAudience: string | null;
  niche: string | null;
  maxFollowing: string | null;
  targetGender: string | null;
  locationAccuracy: string | null;
  goals: string[];
  locations: string[];
  inspirationalProfiles: string[];
  hashtags: string[];
  additionalInfo: string | null;
}

export interface GrowthPageData {
  growthStats: GrowthStats;
  /** When the counts were read from Instagram (ISO), null if never */
  statsUpdatedAt: string | null;
  /** First snapshot (ISO) — "growth since" date */
  trackingSince: string | null;
  chartDataByRange: ChartData | null;
  hasGrowthHistory: boolean;
  growthManager: GrowthManager;
  managerRating: number | null;
  targeting: TargetingStrategy;
}

export interface SubscriptionLine {
  id: string;
  name: string;
  kind: "plan" | "upsell" | "addon";
  monthlyPrice: number;
  status: string; // PayPal status: ACTIVE, APPROVAL_PENDING, SUSPENDED, CANCELLED…
  nextBillingDate: string | null; // ISO
  startedAt: string | null; // ISO
}

export interface Payment {
  id: string;
  description: string;
  status: "paid" | "failed" | "pending" | "refunded";
  date: string; // ISO
  amount: number;
  currency: string;
}

export interface BillingDetails {
  name: string | null;
  email: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface OfferCard {
  slug: string;
  name: string;
  monthlyPrice: number;
  description: string;
}

export interface BillingPageData {
  plan: {
    name: string;
    price: number;
    features: string[];
  } | null;
  subscriptions: SubscriptionLine[];
  monthlyTotal: number;
  nextBillingDate: string | null;
  billing: BillingDetails;
  payments: Payment[];
  /** false when PayPal couldn't be reached; the page says so */
  paypalReachable: boolean;
  /** Where the customer manages / cancels PayPal payments */
  paypalManageUrl: string;
  offers: OfferCard[];
}
