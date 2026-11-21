/**
 * The site's public address, used by sitemap.xml and robots.txt.
 *
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com) in Vercel once the
 * domain is connected. Until then it falls back to Vercel's production domain,
 * then to localhost for local development.
 */
export function siteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}
