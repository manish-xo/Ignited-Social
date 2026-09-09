import { RefreshCw } from "lucide-react";
// import type { SubscriptionInfo } from "@/lib/dashboard/types";
import { SubscriptionInfo } from "../../lib/types";

export default function SubscriptionCard({
  subscription,
}: {
  subscription: SubscriptionInfo;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <RefreshCw size={16} />
        </span>
        <p className="font-heading text-base font-bold text-ink">
          Subscription
        </p>
      </div>

      <dl className="mt-4 divide-y divide-border text-sm">
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Purchased add-ons</dt>
          <dd>
            {subscription.purchasedAddons.length > 0 ? (
              <span className="font-semibold text-ink">
                {subscription.purchasedAddons.join(", ")}
              </span>
            ) : (
              <button
                type="button"
                className="rounded-lg bg-action px-3 py-1.5 text-xs font-semibold text-white hover:bg-action-hover"
              >
                + Purchase add-ons
              </button>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Unpaid amount</dt>
          <dd className="font-semibold text-ink">
            ${subscription.unpaidAmount}
          </dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Next billing date</dt>
          <dd className="font-semibold text-ink">
            {subscription.nextBillingDate}
          </dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-muted">Next billing amount</dt>
          <dd className="font-semibold text-ink">
            ${subscription.nextBillingAmount}
          </dd>
        </div>
      </dl>
    </div>
  );
}
