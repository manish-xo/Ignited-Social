// import { createClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabaseClient";
import { DUMMY_DASHBOARD_DATA } from "./dummy-data";
import type { DashboardData } from "./types";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session — shouldn't normally happen since this route is behind
  // login, but fall back cleanly rather than throwing.
  if (!user) return DUMMY_DASHBOARD_DATA;

  const [{ data: profile }, { data: onboarding }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("onboarding_responses")
      .select("answers")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const answers = (onboarding?.answers ?? {}) as Record<string, any>;

  return {
    ...DUMMY_DASHBOARD_DATA,

    instagramUsername:
      profile?.instagram_username || DUMMY_DASHBOARD_DATA.instagramUsername,
    planName: profile?.plan
      ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
      : DUMMY_DASHBOARD_DATA.planName,

    // Real onboarding answers, when present, override the dummy targeting
    // block field-by-field. Falls back per-field (not all-or-nothing) so a
    // partially-completed wizard still shows what it does have.
    targeting: {
      targetAudience:
        answers.targetAudience ?? DUMMY_DASHBOARD_DATA.targeting.targetAudience,
      niche:
        answers.customNiche ||
        answers.niche ||
        DUMMY_DASHBOARD_DATA.targeting.niche,
      maxFollowing:
        answers.followingLimit ?? DUMMY_DASHBOARD_DATA.targeting.maxFollowing,
      targetGender:
        answers.targetGender ?? DUMMY_DASHBOARD_DATA.targeting.targetGender,
      locationAccuracy:
        answers.locationScope === "local"
          ? "Local Only"
          : answers.locationScope === "local-plus-national"
            ? "Local + National"
            : DUMMY_DASHBOARD_DATA.targeting.locationAccuracy,
      goals: answers.goals ?? DUMMY_DASHBOARD_DATA.targeting.goals,
      locations: answers.locations ?? DUMMY_DASHBOARD_DATA.targeting.locations,
      inspirationalProfiles:
        answers.similarAccounts ??
        DUMMY_DASHBOARD_DATA.targeting.inspirationalProfiles,
      hashtags:
        answers.targetHashtags ?? DUMMY_DASHBOARD_DATA.targeting.hashtags,
      additionalInfo:
        answers.additionalDetails ||
        DUMMY_DASHBOARD_DATA.targeting.additionalInfo,
    },

    // Add-ons chosen during the upsell steps ARE real (stored on
    // profiles.addons) — surfacing them here even though billing/invoices
    // below stay dummy until the payment gateway is fully wired.
    subscription: {
      ...DUMMY_DASHBOARD_DATA.subscription,
      purchasedAddons: profile?.addons?.length
        ? profile.addons
        : DUMMY_DASHBOARD_DATA.subscription.purchasedAddons,
    },

    // TODO: once your payment gateway is fully wired, fetch real data here
    // using profile.stripe_customer_id (or equivalent):
    //   - billing        <- customers.retrieve(...)
    //   - invoices       <- invoices.list({ customer: ... })
    //   - growthStats / chartDataByRange <- your analytics/tracking source
    // Until then these three plus growth stats stay dummy.
  };
}
