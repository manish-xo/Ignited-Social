import { Layers } from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import type { SubscriptionLine } from "../../lib/types";
import { CardHeader, GlassCard, StatusChip } from "../ui";
import { CancelTrigger } from "./CancelSubscriptions";
import PaperCard from "./PaperCard";

const CANCELLABLE = new Set(["ACTIVE", "APPROVED", "SUSPENDED"]);

const KIND: Record<SubscriptionLine["kind"], string> = {
  plan: "Growth plan",
  upsell: "Content",
  addon: "Add-on",
};

/** Each subscription as a numbered note-paper card, with the monthly total. */
export default function SubscriptionsCard({
  subscriptions,
  monthlyTotal,
  asOf,
}: {
  subscriptions: SubscriptionLine[];
  monthlyTotal: number;
  asOf: number;
}) {
  return (
    <GlassCard>
      <CardHeader
        icon={Layers}
        title="Subscriptions"
        subtitle="Each one renews monthly through PayPal."
        action={
          subscriptions.length > 0 ? (
            <p className="text-right">
              <span className="block text-[11px] text-muted">
                Monthly total (active)
              </span>
              <span className="font-heading text-lg font-bold text-ink">
                {formatMoney(monthlyTotal)}
              </span>
            </p>
          ) : undefined
        }
      />

      {subscriptions.length === 0 ? (
        <p className="glass-inset mt-5 rounded-2xl p-4 text-sm text-secondary">
          We couldn&apos;t find a subscription on this account yet.
        </p>
      ) : (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((s, i) => {
            const cancelled = s.status === "CANCELLED";
            const endsOn =
              cancelled && s.paidUntil && Date.parse(s.paidUntil) > asOf
                ? s.paidUntil
                : null;
            return (
              <li key={s.id}>
                <PaperCard number={i + 1} dimmed={cancelled} className="h-full">
                  <p className="text-sm font-light text-secondary">
                    {KIND[s.kind]}
                  </p>
                  <p className="mt-0.5 text-xl font-bold leading-tight tracking-tight text-ink">
                    {s.name}
                  </p>

                  <p className="mt-4 text-2xl font-bold leading-none tracking-tight text-ink">
                    {formatMoney(s.monthlyPrice)}
                    <span className="ml-1 text-xs font-light text-secondary">
                      / month
                    </span>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <StatusChip status={s.status} />
                    <span className="text-[11px] text-muted">
                      {s.nextBillingDate && s.status === "ACTIVE"
                        ? `Renews ${formatDate(s.nextBillingDate)}`
                        : endsOn
                          ? `Ends ${formatDate(endsOn)}`
                          : ""}
                    </span>
                  </div>

                  {CANCELLABLE.has(s.status) && (
                    <CancelTrigger
                      ids={[s.id]}
                      className="mt-4 text-xs font-semibold text-secondary underline decoration-transparent underline-offset-2 transition-colors hover:text-ink hover:decoration-current"
                    >
                      Cancel {s.kind === "plan" ? "plan" : "this"}
                    </CancelTrigger>
                  )}
                </PaperCard>
              </li>
            );
          })}
        </ul>
      )}
    </GlassCard>
  );
}
