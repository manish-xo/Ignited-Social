import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * /robots.txt — lets search engines crawl the public site, keeps them out of
 * private and step-by-step pages, and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/onboarding",
        "/signup",
        "/payment",
        "/upsell",
        "/Addons",
        "/Dashboard-Setup",
        "/prototype",
        // Old preview pages that aren't part of the live site.
        "/audience-journey",
        "/audiences",
        "/secondary",
        "/services",
      ],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
