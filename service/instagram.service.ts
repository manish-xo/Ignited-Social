import axios, { AxiosError, type AxiosResponse } from "axios";

import {
  IG_APP_ID,
  REQUEST_TIMEOUT_MS,
  SCRAPE_DO_BASE_URL,
  SCRAPE_DO_TOKEN,
  WEB_PROFILE_INFO_URL,
} from "./constants";
import { log } from "./logger";
import type { ProfileData, ProfileInfoResponse, RawProfileUser } from "./types";
import { InstagramScraperError, normalizeUsername } from "./utils";

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

class InstagramService {
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
}

export const instagramService = new InstagramService();
