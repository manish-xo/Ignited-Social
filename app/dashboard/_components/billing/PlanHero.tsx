import { ArrowUpRight, Check, Repeat } from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import { supportMailto } from "../../lib/support";
import type { BillingPageData, SubscriptionLine } from "../../lib/types";
import { Eyebrow, GlassCard, StatusChip } from "../ui";

export default function PlanHero({
  plan,
  main,
  nextBillingDate,
  monthlyTotal,
  paypalManageUrl,
}: {
  plan: NonNullable<BillingPageData["plan"]>;
  main: SubscriptionLine | undefined;
  nextBillingDate: string | null;
  monthlyTotal: number;
  paypalManageUrl: string;
}) {
  return (
    <GlassCard>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Eyebrow>Your plan</Eyebrow>
          <p className="mt-1 font-heading-condensed text-5xl font-bold leading-none tracking-tight text-ink">
            {plan.name}
          </p>
        </div>
        {main && <StatusChip status={main.status} />}
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
        <p className="font-heading-condensed text-4xl font-bold leading-none text-ink">
          {formatMoney(plan.price)}
          <span className="ml-1 font-body text-sm font-medium text-muted">
            / month
          </span>
        </p>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-[11px] text-muted">Next payment</dt>
            <dd className="font-semibold text-ink">
              {formatDate(nextBillingDate) ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-muted">All subscriptions</dt>
            <dd className="font-semibold text-ink">
              {formatMoney(monthlyTotal)} / mo
            </dd>
          </div>
          {main?.startedAt && (
            <div className="hidden sm:block">
              <dt className="text-[11px] text-muted">Member since</dt>
              <dd className="font-semibold text-ink">
                {formatDate(main.startedAt)}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <ul className="mt-6 grid gap-2 border-t border-hairline pt-5 sm:grid-cols-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-secondary">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border text-ink">
              <Check size={10} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={paypalManageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-action"
        >
          Manage in PayPal
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <a
          href={supportMailto(
            "Change my plan",
            `I'm on the ${plan.name} plan and would like to switch to:\n`,
          )}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-border-strong hover:bg-subtle-bg"
        >
          <Repeat size={14} />
          Change plan
        </a>
      </div>
    </GlassCard>
  );
}
