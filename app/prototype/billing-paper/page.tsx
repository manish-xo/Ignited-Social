import type { Metadata } from "next";
import { privatePage } from "@/lib/seo";
import BillingPaperPreview from "./BillingPaperPreview";

export const metadata: Metadata = privatePage("Billing preview");

/**
 * /prototype/billing-paper — the dashboard Billing page (paper-card
 * subscriptions and the cancel picker) with a fake customer, so it can be
 * seen without logging in. Nothing reaches PayPal.
 */
export default function Page() {
  return (
    <main className="min-h-dvh bg-canvas px-3 py-6 font-body md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <BillingPaperPreview />
      </div>
    </main>
  );
}
