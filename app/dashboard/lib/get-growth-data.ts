import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getInstagramGrowth } from "@/lib/instagram/growth";
import { getDashboardUser } from "./session";
import { DEFAULT_MANAGER } from "./support";
import type { GrowthPageData, TargetingStrategy } from "./types";

const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()) : [];
const text = (v: unknown): string | null =>
  typeof v === "string" && v.trim() ? v.trim() : null;

function targetingFrom(answers: Record<string, unknown>): TargetingStrategy {
  const limit = Number(answers.followingLimit);
  return {
    targetAudience: text(answers.targetAudience),
    niche: text(answers.customNiche) ?? text(answers.niche),
    maxFollowing: Number.isFinite(limit) && limit > 0 ? limit.toLocaleString() : null,
    targetGender: text(answers.targetGender),
    locationAccuracy:
      answers.locationScope === "local"
        ? "Local only"
        : answers.locationScope === "local-plus-national"
          ? "Local + national"
          : null,
    goals: list(answers.goals),
    locations: list(answers.locations),
    inspirationalProfiles: list(answers.similarAccounts).map((a) =>
      a.startsWith("@") ? a : `@${a}`,
    ),
    hashtags: list(answers.targetHashtags).map((h) =>
      h.startsWith("#") ? h : `#${h}`,
    ),
    additionalInfo: text(answers.additionalDetails),
  };
}

export async function getGrowthData(): Promise<GrowthPageData> {
  const { user, instagramUsername } = await getDashboardUser();

  const [{ data: onboarding }, { data: rating }, growth] = await Promise.all([
    supabaseAdmin
      .from("onboarding_responses")
      .select("answers")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabaseAdmin
      .from("manager_ratings")
      .select("rating")
      .eq("user_id", user.id)
      .maybeSingle(),
    instagramUsername
      ? getInstagramGrowth(user.id, instagramUsername)
      : Promise.resolve(null),
  ]);

  const gained = growth?.growthStats.totalGrowth ?? null;
  const activityNote = !growth
    ? "Your campaign is being set up. Your stats appear here as soon as we can read your Instagram account."
    : gained === null
      ? "We've taken your first account snapshot. Daily snapshots start building your growth chart from here."
      : gained > 0
        ? `You've gained ${gained.toLocaleString()} followers since we started tracking. Keep posting, we'll keep targeting.`
        : "Tracking is live. Growth usually starts showing within the first couple of weeks.";

  return {
    growthStats: growth?.growthStats ?? {
      totalGrowth: null,
      followers: null,
      following: null,
      posts: null,
    },
    statsUpdatedAt: growth?.lastUpdated ?? null,
    trackingSince: growth?.trackingSince ?? null,
    chartDataByRange: growth?.chartDataByRange ?? null,
    hasGrowthHistory: growth?.hasGrowthHistory ?? false,
    growthManager: { ...DEFAULT_MANAGER, activityNote },
    managerRating: (rating?.rating as number | undefined) ?? null,
    targeting: targetingFrom(
      (onboarding?.answers ?? {}) as Record<string, unknown>,
    ),
  };
}
