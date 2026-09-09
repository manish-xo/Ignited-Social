import { CreditCard } from "lucide-react";
import { BillingInfo } from "../../lib/types";

export default function BillingCard({ billing }: { billing: BillingInfo }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <CreditCard size={16} />
        </span>
        <p className="font-heading text-base font-bold text-ink">Billing</p>
      </div>

      <dl className="mt-4 divide-y divide-border text-sm">
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Billing name</dt>
          <dd className="font-semibold text-ink">{billing.billingName}</dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Payment method</dt>
          <dd className="flex items-center gap-2 font-semibold text-ink">
            **** **** **** {billing.cardLast4}
            <span className="rounded bg-border/30 px-1.5 py-0.5 text-[10px] font-bold uppercase">
              {billing.cardBrand}
            </span>
          </dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Country</dt>
          <dd className="font-semibold text-ink">{billing.country}</dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Zip code</dt>
          <dd className="font-semibold text-ink">{billing.zipCode}</dd>
        </div>
      </dl>
    </div>
  );
}
