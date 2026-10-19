import "server-only";
import { after } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { instagramService } from "@/service/instagram.service";
import { normalizeUsername } from "@/service/utils";
import type {
  ChartMetric,
  ChartPoint,
  ChartRange,
  GrowthStats,
} from "@/app/dashboard/lib/types";

// How old the latest snapshot may get before a dashboard visit refreshes it.
// The daily cron (app/api/cron/instagram-snapshots) keeps most accounts fresh.
const STALE_AFTER_MS = 12 * 60 * 60 * 1000;
// A first-ever fetch blocks the page, so don't let it hang for long.
const PAGE_FETCH_TIMEOUT_MS = 8_000;
const DAY_MS = 24 * 60 * 60 * 1000;

interface Snapshot {
  followers: number;
  following: number;
  posts: number;
  captured_at: string;
}

export interface InstagramGrowth {
  growthStats: GrowthStats;
  chartDataByRange: Record<
    ChartRange,
    Record<ChartMetric, ChartPoint[]>
  > | null;
  hasGrowthHistory: boolean;
  lastUpdated: string;
  trackingSince: string;
}

/**
 * Reads the account's counts from Instagram and stores them as a new
 * snapshot. Throws when Instagram (or scrape.do) can't be reached.
 */
export async function captureSnapshot(
  userId: string,
  username: string,
  timeoutMs?: number,
): Promise<Snapshot> {
  const profile = await instagramService.getProfile(username, { timeoutMs });

  if (profile.followerCount === undefined) {
    throw new Error(`No follower count in the profile for @${username}.`);
  }

  const { data, error } = await supabaseAdmin
    .from("instagram_snapshots")
    .insert({
      user_id: userId,
      username: normalizeUsername(username),
      followers: profile.followerCount,
      following: profile.followingCount ?? 0,
      posts: profile.postsCount ?? 0,
    })
    .select("followers, following, posts, captured_at")
    .single();

  if (error) throw error;
  return data as Snapshot;
}

/**
 * Followers, following and posts for the dashboard, plus the history behind
 * total growth and the growth chart. Returns null when there's no snapshot
 * yet and a fresh one can't be fetched.
 */
export async function getInstagramGrowth(
  userId: string,
  username: string,
): Promise<InstagramGrowth | null> {
  const handle = normalizeUsername(username);

  // Only this username's rows, so a changed handle starts a fresh history.
  const { data, error } = await supabaseAdmin
    .from("instagram_snapshots")
    .select("followers, following, posts, captured_at")
    .eq("user_id", userId)
    .eq("username", handle)
    .gte("captured_at", new Date(Date.now() - 366 * DAY_MS).toISOString())
    .order("captured_at", { ascending: true });

  if (error) {
    // Usually the table hasn't been created yet (supabase/migrations).
    // Still show today's numbers, just without history.
    console.error(
      `Reading Instagram snapshots failed: ${error.code} ${error.message}`,
    );
    try {
      const p = await instagramService.getProfile(handle, {
        timeoutMs: PAGE_FETCH_TIMEOUT_MS,
      });
      if (p.followerCount === undefined) return null;
      return summarize([
        {
          followers: p.followerCount,
          following: p.followingCount ?? 0,
          posts: p.postsCount ?? 0,
          captured_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error(`Instagram stats fetch for @${handle} failed:`, err);
      return null;
    }
  }

  const rows = (data ?? []) as Snapshot[];
  const latest = rows.at(-1);

  if (!latest) {
    // First visit: nothing to show, so wait for one fetch.
    try {
      rows.push(await captureSnapshot(userId, handle, PAGE_FETCH_TIMEOUT_MS));
    } catch (err) {
      console.error(`Instagram stats fetch for @${handle} failed:`, err);
      return null;
    }
  } else if (Date.now() - Date.parse(latest.captured_at) > STALE_AFTER_MS) {
    // Show what we have now; refresh after the response so the next visit
    // has newer numbers.
    after(() =>
      captureSnapshot(userId, handle).catch((err) =>
        console.error(`Instagram stats refresh for @${handle} failed:`, err),
      ),
    );
  }

  return summarize(rows);
}

function summarize(rows: Snapshot[]): InstagramGrowth {
  const first = rows[0];
  const latest = rows[rows.length - 1];
  const hasGrowthHistory = rows.length >= 2;

  return {
    growthStats: {
      totalGrowth: hasGrowthHistory ? latest.followers - first.followers : null,
      followers: latest.followers,
      following: latest.following,
      posts: latest.posts,
    },
    // Built from the first snapshot on, so the line starts as one point and
    // extends with every daily snapshot.
    chartDataByRange: {
      "7d": series(rows, dayBuckets()),
      "4w": series(rows, weekBuckets()),
      "12m": series(rows, monthBuckets()),
    },
    hasGrowthHistory,
    lastUpdated: latest.captured_at,
    trackingSince: first.captured_at,
  };
}

interface Bucket {
  label: string;
  start: number;
  end: number;
}

const fmt = (t: number, opts: Intl.DateTimeFormatOptions) =>
  new Date(t).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });

function startOfUtcDay(t: number) {
  const d = new Date(t);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

// Last 7 days, one point per day.
function dayBuckets(): Bucket[] {
  const today = startOfUtcDay(Date.now());
  return Array.from({ length: 7 }, (_, i) => {
    const start = today - (6 - i) * DAY_MS;
    return {
      label: fmt(start, { month: "short", day: "numeric" }),
      start,
      end: start + DAY_MS,
    };
  });
}

// Last 4 weeks, one point per 7-day stretch ending today.
function weekBuckets(): Bucket[] {
  const end = startOfUtcDay(Date.now()) + DAY_MS;
  return Array.from({ length: 4 }, (_, i) => {
    const start = end - (4 - i) * 7 * DAY_MS;
    return {
      label: fmt(start, { month: "short", day: "numeric" }),
      start,
      end: start + 7 * DAY_MS,
    };
  });
}

// Last 12 calendar months, one point per month.
function monthBuckets(): Bucket[] {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const start = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() - (11 - i),
      1,
    );
    const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (10 - i), 1);
    return { label: fmt(start, { month: "short" }), start, end };
  });
}

// Each bucket shows its latest snapshot; buckets with none are skipped.
// "growth" is followers gained since the first point in the range.
function series(
  rows: Snapshot[],
  buckets: Bucket[],
): Record<ChartMetric, ChartPoint[]> {
  const points: { label: string; row: Snapshot }[] = [];
  for (const b of buckets) {
    const row = rows.findLast((r) => {
      const t = Date.parse(r.captured_at);
      return t >= b.start && t < b.end;
    });
    if (row) points.push({ label: b.label, row });
  }

  const base = points[0]?.row.followers ?? 0;
  return {
    followers: points.map((p) => ({ label: p.label, value: p.row.followers })),
    following: points.map((p) => ({ label: p.label, value: p.row.following })),
    growth: points.map((p) => ({
      label: p.label,
      value: p.row.followers - base,
    })),
  };
}
