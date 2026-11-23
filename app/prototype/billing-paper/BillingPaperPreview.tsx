"use client";

import { useState } from "react";
import BillingView from "@/app/dashboard/_components/billing/BillingView";
import type { BillingPageData } from "@/app/dashboard/lib/types";

// A fixed "today" so the preview reads the same on the server and in the browser.
const TODAY = Date.UTC(2026, 10, 23);
const PERIOD_START = "2026-11-21T09:00:00Z";
const PAID_UNTIL = "2026-12-21T09:00:00Z";

const line = (
  id: string,
  name: string,
  kind: "plan" | "upsell" | "addon",
  monthlyPrice: number,
) => ({
  id,
  name,
  kind,
  monthlyPrice,
  status: "ACTIVE",
  nextBillingDate: PAID_UNTIL,
  startedAt: "2026-09-21T09:00:00Z",
  periodStart: PERIOD_START,
  paidUntil: PAID_UNTIL,
  inTrial: false,
});

const START: BillingPageData = {
  plan: {
    name: "Scale",
    price: 147,
    features: [
      "Accelerated, higher-volume growth",
      "Estimated 250–800+ followers per month",
      "A dedicated Senior Brand Manager",
      "Advanced audience targeting",
    ],
  },
  subscriptions: [
    line("I-DEMO-PLAN", "Scale plan", "plan", 147),
    line("I-DEMO-CONTENT", "Content Creation+", "upsell", 289),
    line("I-DEMO-COMMENTS", "Targeted Comments", "addon", 14),
  ],
  monthlyTotal: 450,
  nextBillingDate: PAID_UNTIL,
  billing: {
    name: "Alex Morgan",
    email: "alex@example.com",
    country: "US",
    postalCode: "10001",
  },
  payments: [
    {
      id: "T-3",
      description: "Scale plan",
      status: "paid",
      date: PERIOD_START,
      amount: 147,
      currency: "USD",
    },
    {
      id: "T-2",
      description: "Content Creation+",
      status: "paid",
      date: PERIOD_START,
      amount: 289,
      currency: "USD",
    },
    {
      id: "T-1",
      description: "Targeted Comments",
      status: "paid",
      date: PERIOD_START,
      amount: 14,
      currency: "USD",
    },
  ],
  paypalReachable: true,
  paypalManageUrl: "#",
  offers: [
    {
      slug: "dm-new-followers",
      name: "DM Your New Followers",
      monthlyPrice: 19,
      description:
        "Personalized welcome DMs that turn new followers into engaged, returning fans.",
    },
  ],
  asOf: TODAY,
};

/** The real dashboard Billing components with a fake customer, no PayPal. */
export default function BillingPaperPreview() {
  const [data, setData] = useState(START);

  // What the cancel API does, done locally: the plan takes everything with it.
  const cancel = (ids: string[]) =>
    setData((d) => {
      const planId = d.subscriptions.find((s) => s.kind === "plan")?.id;
      const all = planId && ids.includes(planId);
      const subscriptions = d.subscriptions.map((s) =>
        all || ids.includes(s.id)
          ? { ...s, status: "CANCELLED", nextBillingDate: null }
          : s,
      );
      const active = subscriptions.filter((s) => s.status === "ACTIVE");
      return {
        ...d,
        subscriptions,
        monthlyTotal: active.reduce((sum, s) => sum + s.monthlyPrice, 0),
        nextBillingDate: active.length ? PAID_UNTIL : null,
      };
    });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-action/40 bg-action-tint-bg px-4 py-3 text-sm text-ink">
        <p>
          <span className="font-semibold text-action">Preview</span> · the real
          dashboard Billing page with a fake customer. Nothing reaches PayPal.
        </p>
        <button
          type="button"
          onClick={() => setData(START)}
          className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-subtle-bg"
        >
          Reset
        </button>
      </div>
      <BillingView
        data={data}
        instagramUsername="demo_account"
        onDemoCancel={cancel}
      />
    </>
  );
}
