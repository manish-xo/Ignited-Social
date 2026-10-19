import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPlan } from "@/lib/plans";
import type { DashboardShellData } from "./types";

/**
 * The signed-in customer plus their signup row. Wrapped in React `cache` so
 * the layout and the page share one lookup per request.
 */
export const getDashboardUser = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // proxy.ts already guards /dashboard; this covers an expired session.
  if (!user) redirect("/dashboard/login");

  const signupId = (user.user_metadata?.signup_id as string) ?? null;

  // The tables have RLS on with no public policies, so read them with the
  // service role — scoped to this user's own signup.
  const [{ data: signup }, { data: subscription }] = await Promise.all([
    signupId
      ? supabaseAdmin
          .from("Signup")
          .select("instagram_username, instagram_profile_pic, plan, email")
          .eq("id", signupId)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    signupId
      ? supabaseAdmin
          .from("paypal_subscriptions")
          .select(
            "paypal_subscription_id, plan, status, email, full_name, country, postal_code, created_at",
          )
          .eq("signup_id", signupId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const planSlug: string | null =
    subscription?.plan ??
    signup?.plan ??
    (user.user_metadata?.plan as string) ??
    null;

  return {
    user,
    signupId,
    instagramUsername:
      (signup?.instagram_username as string | undefined) ??
      (user.user_metadata?.instagram_username as string | undefined) ??
      null,
    profilePicUrl: (signup?.instagram_profile_pic as string | null) || null,
    planSlug,
    email: (signup?.email as string | undefined) ?? user.email ?? null,
    subscription: subscription as {
      paypal_subscription_id: string;
      plan: string | null;
      status: string | null;
      email: string | null;
      full_name: string | null;
      country: string | null;
      postal_code: string | null;
      created_at: string;
    } | null,
  };
});

export async function getShellData(): Promise<DashboardShellData> {
  const u = await getDashboardUser();
  return {
    instagramUsername: u.instagramUsername,
    profilePicUrl: u.profilePicUrl,
    planName: u.planSlug ? getPlan(u.planSlug).name : null,
    subscriptionStatus: u.subscription?.status ?? null,
  };
}
