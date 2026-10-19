import { ArrowUpRight, Wallet } from "lucide-react";
import type { BillingDetails } from "../../lib/types";
import { CardHeader, GlassCard, Muted } from "../ui";

export default function BillingDetailsCard({
  billing,
  paypalManageUrl,
}: {
  billing: BillingDetails;
  paypalManageUrl: string;
}) {
  const rows = [
    { label: "Payment method", value: "PayPal" },
    { label: "Billing name", value: billing.name },
    { label: "PayPal email", value: billing.email },
    { label: "Country", value: billing.country },
    { label: "Postal code", value: billing.postalCode },
  ];

  return (
    <GlassCard>
      <CardHeader icon={Wallet} title="Billing details" />

      <dl className="mt-4 divide-y divide-ink/5 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-muted">{r.label}</dt>
            <dd className="truncate text-right font-semibold text-ink">
              {r.value ?? <Muted>—</Muted>}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={paypalManageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-inset group mt-3 flex h-11 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-ink transition-colors duration-300 hover:text-action"
      >
        Update payment method
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
      <p className="mt-2 text-center text-[11px] text-placeholder">
        Payments are handled by PayPal. We never see your card.
      </p>
    </GlassCard>
  );
}
