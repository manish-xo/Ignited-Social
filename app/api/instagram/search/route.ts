import { NextRequest, NextResponse } from "next/server";
import { instagramService } from "@/service/instagram.service";

// Cloudflare worker that scrapes Instagram search. Override per environment
// with INSTAGRAM_SEARCH_API_URL if it ever moves.
const SEARCH_API_BASE =
  process.env.INSTAGRAM_SEARCH_API_URL ??
  "https://instagramhastagsandprofilescrapper.instagram-astags-nd-rofile-crapper.workers.dev";

// The worker's path really is spelled "hastag".
const ENDPOINTS = {
  account: "scrape_account",
  hashtag: "scrape_hastag",
} as const;

type SearchType = keyof typeof ENDPOINTS;

export interface AccountResult {
  id: string;
  username: string;
  fullName: string;
  isVerified: boolean;
  followersLabel: string; // e.g. "291M followers" — the worker sends text
  profilePicUrl: string | null;
}

export interface HashtagResult {
  name: string;
  postCount: number;
  postCountLabel: string; // e.g. "52.9M posts"
}

// Both sources occasionally repeat an account/tag in one response.
function uniqueBy<T extends AccountResult | HashtagResult>(
  items: T[],
  type: SearchType,
): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = (
      type === "account"
        ? (item as AccountResult).username
        : (item as HashtagResult).name
    ).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// socialboost wraps picture URLs in its own proxy; unwrap so ours serves them.
const SOCIALBOOST_IMAGE_PROXY = "https://instagram-proxy-fbng.onrender.com/";

async function searchAccountsFallback(
  query: string,
): Promise<AccountResult[] | null> {
  try {
    const res = await instagramService.suggestInstagramUsername(query);
    const users = (res as any)?.data;
    if (!Array.isArray(users)) return null;
    return users
      .filter((u: any) => u?.username)
      .map((u: any): AccountResult => {
        const pic = String(u.profile_pic_url ?? "");
        const raw = pic.startsWith(SOCIALBOOST_IMAGE_PROXY)
          ? pic.slice(SOCIALBOOST_IMAGE_PROXY.length)
          : pic;
        return {
          id: String(u.id ?? u.pk ?? u.username),
          username: String(u.username),
          fullName: String(u.full_name ?? ""),
          isVerified: Boolean(u.is_verified),
          followersLabel: "", // this source doesn't include follower counts
          profilePicUrl: raw.startsWith("http") ? raw : null,
        };
      });
  } catch (err) {
    console.error("Instagram account search fallback failed:", err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") as SearchType | null;
  // People type "@nike" / "#fitness" — search on the bare term.
  const query = (req.nextUrl.searchParams.get("q") ?? "")
    .trim()
    .replace(/^[@#]+/, "");

  if (!type || !(type in ENDPOINTS)) {
    return NextResponse.json(
      { success: false, message: "type must be 'account' or 'hashtag'" },
      { status: 400 },
    );
  }

  if (query.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const res = await fetch(
      `${SEARCH_API_BASE}/${ENDPOINTS[type]}/${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(15_000) },
    );
    const body = await res.json().catch(() => null);

    if (!res.ok || !body?.success || !Array.isArray(body.data)) {
      console.error("Instagram search failed:", {
        type,
        query,
        status: res.status,
        message: body?.message,
        error: body?.error,
      });

      // The worker breaks whenever Instagram blocks its session; for accounts
      // fall back to the same suggestions API the signup form uses.
      if (type === "account") {
        const fallback = await searchAccountsFallback(query);
        if (fallback) {
          return NextResponse.json(
            {
              success: true,
              data: uniqueBy(fallback, "account"),
              source: "fallback",
            },
            { headers: { "Cache-Control": "private, max-age=300" } },
          );
        }
      }

      return NextResponse.json(
        { success: false, message: "Search is unavailable right now." },
        { status: 502 },
      );
    }

    const data =
      type === "account"
        ? body.data.map(
            (a: any): AccountResult => ({
              id: String(a.id ?? a.username),
              username: String(a.username ?? ""),
              fullName: String(a.fullName ?? ""),
              isVerified: Boolean(a.isVerified),
              followersLabel: String(a.followers ?? ""),
              profilePicUrl: a.profilePicUrl ?? null,
            }),
          )
        : body.data.map(
            (h: any): HashtagResult => ({
              name: String(h.name ?? ""),
              postCount: Number(h.postCount) || 0,
              postCountLabel: String(h.postCountLabel ?? ""),
            }),
          );

    return NextResponse.json(
      { success: true, data: uniqueBy(data, type) },
      // Same search twice in a row (e.g. typing then deleting a letter)
      // can come from the browser cache.
      { headers: { "Cache-Control": "private, max-age=300" } },
    );
  } catch (err) {
    console.error("Instagram search error:", { type, query, err });
    return NextResponse.json(
      { success: false, message: "Search is unavailable right now." },
      { status: 502 },
    );
  }
}
