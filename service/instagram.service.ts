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
    if (!token) {
      throw new InstagramScraperError(
        "INPUT",
        "A scrape.do token is required (pass options.token or set SCRAPE_DO_TOKEN).",
      );
    }

    const profileUrl = `${WEB_PROFILE_INFO_URL}?username=${encodeURIComponent(normalized)}`;

    log.info(`Fetching profile for "${normalized}" via scrape.do…`);

    let response: AxiosResponse<ProfileInfoResponse>;
    try {
      response = await axios.get<ProfileInfoResponse>(SCRAPE_DO_BASE_URL, {
        // scrape.do takes the target URL as a query param; axios encodes it.
        params: { token, url: profileUrl },
        timeout: REQUEST_TIMEOUT_MS,
        validateStatus: () => true,
      });
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        throw new InstagramScraperError(
          "NETWORK",
          `Network failure contacting scrape.do: ${error.code ?? error.message}`,
        );
      }
      throw new InstagramScraperError(
        "NETWORK",
        `Failed to fetch profile for "${normalized}" via scrape.do.`,
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
        `scrape.do returned HTTP ${response.status} for "${normalized}".`,
        response.status,
      );
    }

    const user = response.data?.data?.user;
    if (!user || !user.id) {
      throw new InstagramScraperError(
        "PARSE",
        `Profile response for "${normalized}" contained no user — the account may not exist or scrape.do returned an unexpected body.`,
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

  // async suggestInstagramUsername(username: string) {
  //   const url = `https://api.socialboost.co/api/customer/instagram-suggestions?username=${username}`;
  //   const result =
  //     await this.scrapeWithScrapeDo<InstagramSuggestionsResponse>(url);

  //   return result;
  // }

  // async suggestInstagramUsername(username: string) {
  //   const normalized = username.trim().replace(/^@/, "");

  //   if (!normalized || normalized.length < 2) {
  //     return {
  //       success: true,
  //       data: {
  //         data: [],
  //       },
  //     };
  //   }

  //   const variables = {
  //     data: {
  //       context: "blended",
  //       include_reel: "true",
  //       query: normalized,
  //       rank_token:
  //         "1788843026272|42518361dd43b9f2d88a0c62235c6bcc93d314f244a25d17ed0970b1f2336bf2",
  //       search_session_id: "96723812-97d5-48e8-b1fb-d53422a03c77",
  //       search_surface: "web_top_search",
  //     },
  //     hasQuery: true,
  //   };

  //   const body = new URLSearchParams({
  //     av: process.env.INSTAGRAM_AV ?? "",
  //     __user: "0",
  //     __a: "1",
  //     dpr: "1",

  //     lsd: process.env.INSTAGRAM_LSD ?? "",
  //     fb_dtsg: process.env.INSTAGRAM_FB_DTSG ?? "",
  //     jazoest: process.env.INSTAGRAM_JAZOEST ?? "",

  //     fb_api_caller_class: "RelayModern",
  //     fb_api_req_friendly_name: "PolarisSearchBoxRefetchableQuery",

  //     server_timestamps: "true",

  //     variables: JSON.stringify(variables),

  //     doc_id: "27706427925724183",
  //   });
  //   const response = await axios.post(
  //     "https://www.instagram.com/api/graphql",
  //     body.toString(),
  //     {
  //       timeout: REQUEST_TIMEOUT_MS,

  //       headers: {
  //         accept: "*/*",
  //         "content-type": "application/x-www-form-urlencoded",

  //         origin: "https://www.instagram.com",

  //         referer: "https://www.instagram.com/explore/search/",

  //         "user-agent":
  //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36",

  //         "x-fb-friendly-name": "PolarisSearchBoxRefetchableQuery",

  //         "x-fb-lsd": process.env.INSTAGRAM_LSD ?? "",

  //         "x-csrftoken": process.env.INSTAGRAM_CSRF_TOKEN ?? "",

  //         "x-ig-app-id": IG_APP_ID,

  //         cookie: process.env.INSTAGRAM_COOKIE ?? "",
  //       },
  //     },
  //   );
  //   return response.data;
  // }

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
