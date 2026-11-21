import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";

// Only sets the tab title / description for this section; the page itself is
// a client component, which can't export metadata.
export const metadata: Metadata = publicPage({
  title: "Contact us",
  description:
    "Questions about your account or our plans? Get in touch with the Ignited Social team.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
