import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";

// Only sets the tab title / description for this section; the page itself is
// a client component, which can't export metadata.
export const metadata: Metadata = publicPage({
  title: "Instagram growth with a dedicated Brand Manager",
  description:
    "Grow your Instagram with real, organic followers. A dedicated Brand Manager handles daily outreach to the people your work is for. No bots, ever.",
  // Same content as the home page, so point search engines at "/".
  path: "/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
