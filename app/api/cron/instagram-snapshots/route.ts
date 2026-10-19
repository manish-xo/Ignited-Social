import { NextRequest, NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { captureSnapshot } from "@/lib/instagram/growth";
import { normalizeUsername } from "@/service/utils";

// Called once a day by Vercel Cron (vercel.json). Takes a follower /
// following / posts snapshot of every customer's Instagram account, which
// builds the history behind total growth and the dashboard chart.
export const maxDuration = 300;

// Accounts already snapshotted this recently (e.g. by a dashboard visit) are
// skipped.
const SKIP_IF_NEWER_THAN_MS = 20 * 60 * 60 * 1000;
// A few at a time so scrape.do / Instagram don't rate-limit us.
const CONCURRENCY = 3;

async function listAllUsers(): Promise<User[]> {
  const users: User[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error) throw error;
    users.push(...data.users);
    if (data.users.length < 1000) return users;
  }
}

export async function GET(req: NextRequest) {
  // Vercel sends `Authorization: Bearer <CRON_SECRET>` on cron requests.
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await listAllUsers();

  // Same username source as the dashboard: the Signup row, then metadata.
  const signupIds = users
    .map((u) => u.user_metadata?.signup_id as string | undefined)
    .filter((id): id is string => !!id);
  const { data: signups, error: signupError } = signupIds.length
    ? await supabaseAdmin
        .from("Signup")
        .select("id, instagram_username")
        .in("id", signupIds)
    : { data: [], error: null };
  if (signupError) {
    console.error("Cron: reading signups failed:", signupError);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
  const usernameBySignup = new Map(
    (signups ?? []).map((s) => [String(s.id), s.instagram_username as string]),
  );

  const { data: recent } = await supabaseAdmin
    .from("instagram_snapshots")
    .select("user_id")
    .gte(
      "captured_at",
      new Date(Date.now() - SKIP_IF_NEWER_THAN_MS).toISOString(),
    );
  const fresh = new Set((recent ?? []).map((r) => r.user_id as string));

  const jobs = users
    .map((u) => ({
      userId: u.id,
      username:
        usernameBySignup.get(String(u.user_metadata?.signup_id)) ??
        (u.user_metadata?.instagram_username as string | undefined),
    }))
    .filter(
      (j): j is { userId: string; username: string } =>
        !!j.username && !!normalizeUsername(j.username) && !fresh.has(j.userId),
    );

  let captured = 0;
  const failed: string[] = [];

  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    await Promise.all(
      jobs.slice(i, i + CONCURRENCY).map(async ({ userId, username }) => {
        try {
          await captureSnapshot(userId, username);
          captured++;
        } catch (err) {
          failed.push(username);
          console.error(`Cron: snapshot for @${username} failed:`, err);
        }
      }),
    );
  }

  return NextResponse.json({
    users: users.length,
    skippedFresh: fresh.size,
    captured,
    failed,
  });
}
