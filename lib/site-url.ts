/** The live site's address. */
export const PRODUCTION_URL = "https://www.ignited.social";

/**
 * The site's public address, used by sitemap.xml, robots.txt and the
 * canonical / share-card links in page metadata.
 *
 * Uses NEXT_PUBLIC_SITE_URL if it's set (e.g. to test another domain),
 * otherwise the live domain above.
 */
export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL;
  return url.replace(/\/+$/, "");
}
