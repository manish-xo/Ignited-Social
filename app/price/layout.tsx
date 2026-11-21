import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";

// Only sets the tab title / description for this section; the page itself is
// a client component, which can't export metadata.
export const metadata: Metadata = publicPage({
  title: "Pricing",
  description:
    "Two simple plans: Grow at $97/month or Scale at $147/month. First 7 days free, cancel anytime. Pick the pace that fits you.",
  path: "/price",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
