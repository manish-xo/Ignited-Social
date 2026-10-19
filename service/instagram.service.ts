import axios, { AxiosError, type AxiosResponse } from "axios";

import {
  IG_APP_ID,
  REQUEST_TIMEOUT_MS,
  SCRAPE_DO_BASE_URL,
  SCRAPE_DO_TOKEN,
  WEB_PROFILE_INFO_URL,
} from "./constants";
import { log } from "./logger";
import type {
  ProfileData,
  ProfileInfoResponse,
  RawProfileUser,
  InstagramUser,
  InstagramSuggestionsResponse,
} from "./types";
import { InstagramScraperError, normalizeUsername } from "./utils";
import { ScrapeDoService } from "./ScrapeDo.service";
import { success } from "zod";

/**
 * Options for {@link getProfile}. The scrape.do token defaults to the configured
 * SCRAPE_DO_TOKEN but can be overridden per call.
 */
export interface GetProfileOptions {
  token?: string;
  /** Defaults to REQUEST_TIMEOUT_MS; lower it when a page is waiting. */
  timeoutMs?: number;
}

/** Maps the raw web_profile_info user object to our public ProfileData shape. */
function mapRawProfile(user: RawProfileUser): ProfileData {
  const profile: ProfileData = { id: user.id, username: user.username };
  if (user.full_name !== undefined) profile.fullName = user.full_name;
  if (user.biography !== undefined) profile.biography = user.biography;
  if (user.edge_followed_by?.count !== undefined)
    profile.followerCount = user.edge_followed_by.count;
  if (user.edge_follow?.count !== undefined)
    profile.followingCount = user.edge_follow.count;
  if (user.edge_owner_to_timeline_media?.count !== undefined)
    profile.postsCount = user.edge_owner_to_timeline_media.count;
  if (user.is_private !== undefined) profile.isPrivate = user.is_private;
  if (user.is_verified !== undefined) profile.isVerified = user.is_verified;
  if (user.is_business_account !== undefined)
    profile.isBusinessAccount = user.is_business_account;
  if (user.is_professional_account !== undefined)
    profile.isProfessionalAccount = user.is_professional_account;
  if (user.category_name) profile.categoryName = user.category_name;
  if (user.external_url) profile.externalUrl = user.external_url;
  if (user.profile_pic_url !== undefined)
    profile.profilePicUrl = user.profile_pic_url;
  if (user.profile_pic_url_hd !== undefined)
    profile.profilePicUrlHd = user.profile_pic_url_hd;
  return profile;
}

// Instagram serves link-preview crawlers a profile page whose description
// reads "1,234 Followers, 56 Following, 78 Posts - …". Big accounts are
// rounded there ("291M Followers").
const PREVIEW_USER_AGENT =
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

/** "1,672" → 1672, "12.5K" → 12500, "291M" → 291000000 */
function parseCount(text: string): number {
  const match = text.replace(/,/g, "").match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return NaN;
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[
    (match[2] ?? "").toUpperCase() as "K" | "M" | "B"
  ];
  return Math.round(parseFloat(match[1]) * (scale ?? 1));
}

const decodeEntities = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCharCode(parseInt(n, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

async function getProfileFromPage(
  username: string,
  timeout: number,
): Promise<ProfileData> {
  log.info(`Fetching profile for "${username}" from its public page…`);

  const response = await axios.get<string>(
    `https://www.instagram.com/${encodeURIComponent(username)}/`,
    {
      headers: { "User-Agent": PREVIEW_USER_AGENT },
      timeout,
      maxRedirects: 0,
      responseType: "text",
      validateStatus: () => true,
    },
  );
  if (response.status !== 200) {
    throw new InstagramScraperError(
      "HTTP",
      `profile page returned HTTP ${response.status}`,
      response.status,
    );
  }

  const html = response.data;
  const meta = (property: string) => {
    const m = html.match(
      new RegExp(`<meta property="og:${property}" content="([^"]*)"`),
    );
    return m ? decodeEntities(m[1]) : undefined;
  };

  const counts = meta("description")?.match(
    /^([\d.,]+[KMB]?) Followers, ([\d.,]+[KMB]?) Following, ([\d.,]+[KMB]?) Posts/i,
  );
  if (!counts) {
    throw new InstagramScraperError(
      "PARSE",
      "no follower counts on the profile page — the account may not exist",
    );
  }

  const profile: ProfileData = {
    id: html.match(/"profile_id":"(\d+)"/)?.[1] ?? username,
    username,
    followerCount: parseCount(counts[1]),
    followingCount: parseCount(counts[2]),
    postsCount: parseCount(counts[3]),
  };
  // og:title is "Full Name (@handle) • Instagram photos and videos".
  const fullName = meta("title")?.match(/^(.*?)\s*\(@/)?.[1];
  if (fullName) profile.fullName = fullName;
  const picture = meta("image");
  if (picture) profile.profilePicUrl = picture;

  log.info(
    `Resolved @${username}: ${profile.followerCount} followers, ${profile.followingCount} following, ${profile.postsCount} posts.`,
  );
  return profile;
}

/**
 * Fetches Instagram profile info for a username via the scrape.do proxy and
 * returns it as a {@link ProfileData} object (it does NOT write any file).
 *
 * This is the TypeScript port of the supplied Python script: it builds the
 * web_profile_info URL, URL-encodes it, and requests it through scrape.do so the
 * call isn't rate-limited the way a direct request is. `profile.id` is the
 * `ig_user_id` used to drive follower/following scraping.
 */

class InstagramService extends ScrapeDoService {
  async getProfile(
    username: string,
    options: GetProfileOptions = {},
  ): Promise<ProfileData> {
    const normalized = normalizeUsername(username ?? "");
    if (!normalized) {
      throw new InstagramScraperError("INPUT", "username is required.");
    }

    const token = options.token ?? SCRAPE_DO_TOKEN;
    const timeout = options.timeoutMs ?? REQUEST_TIMEOUT_MS;

    // No scrape.do token: read the counts off the public profile page, and
    // only try the (usually rate-limited) API if that fails.
    if (!token) {
      try {
        return await getProfileFromPage(normalized, timeout);
      } catch (err) {
        log.warn(
          `Profile page for "${normalized}" failed (${(err as Error).message}); trying the API directly.`,
        );
      }
    }

    const profileUrl = `${WEB_PROFILE_INFO_URL}?username=${encodeURIComponent(normalized)}`;
    // Without a token, ask Instagram directly. That works from a home IP
    // (local dev) but Instagram usually blocks datacenter IPs like Vercel's,
    // so production needs SCRAPE_DO_TOKEN.
    const via = token ? "scrape.do" : "Instagram (direct)";

    log.info(`Fetching profile for "${normalized}" via ${via}…`);

    let response: AxiosResponse<ProfileInfoResponse>;
    try {
      response = token
        ? await axios.get<ProfileInfoResponse>(SCRAPE_DO_BASE_URL, {
            // scrape.do takes the target URL as a query param; axios encodes it.
            params: { token, url: profileUrl },
            timeout,
            validateStatus: () => true,
          })
        : await axios.get<ProfileInfoResponse>(profileUrl, {
            headers: {
              "X-IG-App-ID": IG_APP_ID,
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
              Accept: "*/*",
            },
            timeout,
            // Instagram answers blocked requests with a redirect to login.
            maxRedirects: 0,
            validateStatus: () => true,
          });
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        throw new InstagramScraperError(
          "NETWORK",
          `Network failure contacting ${via}: ${error.code ?? error.message}`,
        );
      }
      throw new InstagramScraperError(
        "NETWORK",
        `Failed to fetch profile for "${normalized}" via ${via}.`,
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new InstagramScraperError(
        "AUTH",
        token
          ? `scrape.do rejected the request (HTTP ${response.status}) — check the scrape.do token.`
          : `Instagram blocked the direct request (HTTP ${response.status}) — set SCRAPE_DO_TOKEN.`,
        response.status,
      );
    }
    if (response.status === 429) {
      throw new InstagramScraperError(
        "RATE_LIMIT",
        `${via} returned 429 — rate limit reached.`,
        429,
      );
    }
    if (response.status < 200 || response.status >= 300) {
      throw new InstagramScraperError(
        "HTTP",
        `${via} returned HTTP ${response.status} for "${normalized}".`,
        response.status,
      );
    }

    const user = response.data?.data?.user;
    if (!user || !user.id) {
      throw new InstagramScraperError(
        "PARSE",
        `Profile response for "${normalized}" contained no user — the account may not exist or ${via} returned an unexpected body.`,
      );
    }

    const profile = mapRawProfile(user);
    log.info(
      `Resolved @${profile.username} -> id ${profile.id}` +
        (profile.followerCount !== undefined
          ? ` (${profile.followerCount} followers, ${profile.followingCount ?? "?"} following).`
          : "."),
    );
    return profile;
  }

  async searchUsernames(
    query: string,
    options: GetProfileOptions = {},
  ): Promise<InstagramUser[]> {
    const normalized = query.trim().replace(/^@/, "");

    if (!normalized || normalized.length < 2) {
      return [];
    }

    const token = options.token ?? SCRAPE_DO_TOKEN;

    if (!token) {
      throw new InstagramScraperError(
        "INPUT",
        "A scrape.do token is required (pass options.token or set SCRAPE_DO_TOKEN).",
      );
    }

    // Instagram's web username search endpoint
    const searchUrl =
      `https://www.instagram.com/web/search/topsearch/` +
      `?context=user&query=${encodeURIComponent(normalized)}`;

    log.info(`Searching Instagram users for "${normalized}" via scrape.do…`);

    let response: AxiosResponse<any>;

    try {
      response = await axios.get(SCRAPE_DO_BASE_URL, {
        params: {
          token,
          url: searchUrl,
        },
        timeout: REQUEST_TIMEOUT_MS,
        validateStatus: () => true,
        headers: {
          "X-IG-App-ID": IG_APP_ID,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        throw new InstagramScraperError(
          "NETWORK",
          `Network failure contacting scrape.do: ${
            error.code ?? error.message
          }`,
        );
      }

      throw new InstagramScraperError(
        "NETWORK",
        `Failed to search Instagram users for "${normalized}".`,
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new InstagramScraperError(
        "AUTH",
        `scrape.do rejected the request (HTTP ${response.status}) — check the scrape.do token.`,
        response.status,
      );
    }

    if (response.status === 429) {
      throw new InstagramScraperError(
        "RATE_LIMIT",
        `scrape.do returned 429 — proxy/credit rate limit reached.`,
        429,
      );
    }

    if (response.status < 200 || response.status >= 300) {
      throw new InstagramScraperError(
        "HTTP",
        `scrape.do returned HTTP ${response.status} while searching Instagram.`,
        response.status,
      );
    }

    const users = response.data?.users;

    if (!Array.isArray(users)) {
      log.warn(`Instagram search for "${normalized}" returned no users.`);

      return [];
    }

    return users
      .map((item: any): InstagramUser | null => {
        const user = item?.user;

        if (!user?.username || !user?.pk) {
          return null;
        }

        return {
          id: String(user.pk),
          username: user.username,
          fullname: user.full_name,
          profilePicUrl: user.profile_pic_url,
          isVerified: user.is_verified,
          isPrivate: user.is_private,
        };
      })
      .filter(
        (user: InstagramUser | null): user is InstagramUser => user !== null,
      )
      .slice(0, 8);
  }

  async suggestInstagramUsername(username: string) {
    const normalized = username.trim().replace(/^@/, "");

    if (!normalized || normalized.length < 2) {
      return {
        success: true,
        data: {
          data: [],
        },
      };
    }
    const url =
      `https://api.socialboost.co/api/customer/instagram-suggestions` +
      `?username=${encodeURIComponent(normalized)}`;

    const response = await axios.get<InstagramSuggestionsResponse>(url, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    return response.data;
  }
}

export const instagramService = new InstagramService();
