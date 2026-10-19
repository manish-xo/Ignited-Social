import { Layers } from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import type { SubscriptionLine } from "../../lib/types";
import { CardHeader, GlassCard, StatusChip } from "../ui";

const KIND: Record<SubscriptionLine["kind"], string> = {
  plan: "Growth plan",
  upsell: "Content",
  addon: "Add-on",
};

export default function SubscriptionsCard({
  subscriptions,
  monthlyTotal,
}: {
  subscriptions: SubscriptionLine[];
  monthlyTotal: number;
}) {
  return (
    <GlassCard>
      <CardHeader
        icon={Layers}
        title="Subscriptions"
        subtitle="Each one renews monthly through PayPal."
      />

      {subscriptions.length === 0 ? (
        <p className="glass-inset mt-5 rounded-2xl p-4 text-sm text-secondary">
          We couldn&apos;t find a subscription on this account yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-2">
          {subscriptions.map((s) => (
            <li
              key={s.id}
              className="glass-inset flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3.5 transition-[translate] duration-300 hover:translate-x-1"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {s.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {KIND[s.kind]}
                  {s.nextBillingDate && s.status === "ACTIVE"
                    ? ` · renews ${formatDate(s.nextBillingDate)}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusChip status={s.status} />
                <p className="w-20 text-right font-heading text-sm font-bold text-ink">
                  {formatMoney(s.monthlyPrice)}
                  <span className="text-[11px] font-medium text-muted">/mo</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {subscriptions.length > 0 && (
        <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4 text-sm">
          <span className="text-secondary">Monthly total (active)</span>
          <span className="font-heading text-lg font-bold text-ink">
            {formatMoney(monthlyTotal)}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
