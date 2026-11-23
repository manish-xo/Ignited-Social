import type { Metadata } from "next";
import { privatePage } from "@/lib/seo";

// Demo only: fake data, no PayPal. Kept out of search results.
export const metadata: Metadata = privatePage("Billing prototype");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
