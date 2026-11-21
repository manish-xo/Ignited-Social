import type { Metadata } from "next";

const SITE_NAME = "Ignited Social";

/**
 * Title, description and share card for a public page. The title is shown as
 * "<title> | Ignited Social" (the template lives in app/layout.tsx).
 * Keep descriptions under ~155 characters so Google doesn't cut them off.
 */
export function publicPage({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** The page's address, e.g. "/price". Used as its canonical URL. */
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

/**
 * A page that only makes sense mid-flow or behind a login (checkout,
 * onboarding, dashboard): a plain tab title, and kept out of search results.
 */
export function privatePage(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
