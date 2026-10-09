import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { UPSELL_OFFERS } from "@/lib/upsells";
import { ADDON_OFFERS } from "@/app/Addons/lib/addons";
import { DUMMY_DASHBOARD_DATA } from "./dummy-data";
import type { DashboardData } from "./types";

const offerName = (slug: string) =>
  [...UPSELL_OFFERS, ...ADDON_OFFERS].find((o) => o.slug === slug)?.name ??
  slug;

export async function getDashboardData(): Promise<DashboardData> {
  // Runs on the server, so it needs the server client reading the request's
  // cookies — the browser client never sees the login here and always fell
  // back to dummy data.
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session — shouldn't normally happen since this route is behind
  // login, but fall back cleanly rather than throwing.
  if (!user) return DUMMY_DASHBOARD_DATA;

  // The tables have RLS on with no public policies, so read them with the
  // service role — scoped to this user's own id / signup.
  const signupId = (user.user_metadata?.signup_id as string) ?? null;

  const [
    { data: onboarding },
    { data: signup },
    { data: upsells },
    { data: addonRows },
  ] = await Promise.all([
    supabaseAdmin
      .from("onboarding_responses")
      .select("answers")
      .eq("user_id", user.id)
      .maybeSingle(),
    signupId
      ? supabaseAdmin
          .from("Signup")
          .select("instagram_username, plan")
          .eq("id", signupId)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    signupId
      ? supabaseAdmin
          .from("paypal_upsells")
          .select("offer")
          .eq("signup_id", signupId)
          .in("status", ["ACTIVE", "APPROVED"])
      : Promise.resolve({ data: [] }),
    signupId
      ? supabaseAdmin
          .from("paypal_addons")
          .select("addons")
          .eq("signup_id", signupId)
          .in("status", ["ACTIVE", "APPROVED"])
      : Promise.resolve({ data: [] }),
  ]);

  const answers = (onboarding?.answers ?? {}) as Record<string, any>;

  const plan: string | null =
    signup?.plan ?? (user.user_metadata?.plan as string) ?? null;
  const profile = {
    instagram_username:
      signup?.instagram_username ??
      (user.user_metadata?.instagram_username as string) ??
      null,
    plan,
    addons: [
      ...(upsells ?? []).map((u: { offer: string }) => offerName(u.offer)),
      ...(addonRows ?? []).flatMap((a: { addons: string[] }) =>
        a.addons.map(offerName),
      ),
    ],
  };

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
