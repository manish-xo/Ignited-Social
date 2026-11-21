import type { Metadata } from "next";
import { privatePage } from "@/lib/seo";

// Only sets the tab title / description for this section; the page itself is
// a client component, which can't export metadata.
export const metadata: Metadata = privatePage("Dashboard");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
