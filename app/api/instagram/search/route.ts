import { NextRequest, NextResponse } from "next/server";

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
      { success: true, data },
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
