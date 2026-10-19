import { AlertCircle, Receipt } from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import type { Payment } from "../../lib/types";
import { CardHeader, GlassCard, StatusChip } from "../ui";

export default function PaymentHistoryCard({
  payments,
  paypalReachable,
  paypalManageUrl,
}: {
  payments: Payment[];
  paypalReachable: boolean;
  paypalManageUrl: string;
}) {
  return (
    <GlassCard>
      <CardHeader
        icon={Receipt}
        title="Payment history"
        subtitle={
          <>
            Receipts for every payment are in{" "}
            <a
              href={paypalManageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-action underline-offset-2 hover:underline"
            >
              your PayPal account
            </a>
            .
          </>
        }
      />

      {!paypalReachable && (
        <p className="mt-5 flex items-center gap-2 rounded-2xl bg-warning-bg p-3.5 text-sm text-warning-ink">
          <AlertCircle size={16} className="shrink-0" />
          We couldn&apos;t reach PayPal just now, so some details may be
          missing. Refresh in a minute.
        </p>
      )}

      {payments.length === 0 ? (
        paypalReachable && (
          <p className="glass-inset mt-5 rounded-2xl p-4 text-sm text-secondary">
            No payments yet. Your first one shows up here once PayPal processes
            it.
          </p>
        )
      ) : (
        <div className="mt-5 overflow-hidden rounded-2xl glass-inset">
          {/* header row, tablet and up */}
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-ink/5 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:grid">
            <span>For</span>
            <span>Date</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>
          <ul className="divide-y divide-ink/5">
            {payments.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-sm transition-colors duration-300 hover:bg-white/60 sm:grid-cols-[1.4fr_1fr_1fr_auto]"
              >
                <span className="truncate font-semibold text-ink">
                  {p.description}
                </span>
                <span className="text-right font-heading font-bold text-ink sm:order-last">
                  {formatMoney(p.amount, p.currency)}
                </span>
                <span className="text-xs text-secondary sm:text-sm">
                  {formatDate(p.date)}
                </span>
                <span className="justify-self-end sm:justify-self-start">
                  <StatusChip status={p.status} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}
