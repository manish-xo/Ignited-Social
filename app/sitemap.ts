import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * /sitemap.xml — the public pages search engines should index.
 *
 * Checkout, dashboard, onboarding and the old preview pages are left out on
 * purpose (they're private or not meant to be found). Add a line here when a
 * new public page goes live.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/price`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/case-studies`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
