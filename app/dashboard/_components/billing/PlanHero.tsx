import { ArrowUpRight, Check, Repeat } from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import { supportMailto } from "../../lib/support";
import type { BillingPageData, SubscriptionLine } from "../../lib/types";
import { GlassCard, StatusChip } from "../ui";

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
    <GlassCard tone="action" className="relative overflow-hidden">
      <span
        aria-hidden
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10"
      />
      <span
        aria-hidden
        className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/10"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Your plan
          </p>
          <p className="mt-1 font-heading-condensed text-5xl font-bold leading-none tracking-tight">
            {plan.name}
          </p>
        </div>
        {main && <StatusChip status={main.status} className="bg-white/90" />}
      </div>

      <div className="relative mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
        <div>
          <p className="font-heading-condensed text-4xl font-bold leading-none">
            {formatMoney(plan.price)}
            <span className="ml-1 font-body text-sm font-medium text-white/60">
              / month
            </span>
          </p>
        </div>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-[11px] text-white/55">Next payment</dt>
            <dd className="font-semibold">
              {formatDate(nextBillingDate) ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/55">All subscriptions</dt>
            <dd className="font-semibold">{formatMoney(monthlyTotal)} / mo</dd>
          </div>
          {main?.startedAt && (
            <div className="hidden sm:block">
              <dt className="text-[11px] text-white/55">Member since</dt>
              <dd className="font-semibold">{formatDate(main.startedAt)}</dd>
            </div>
          )}
        </dl>
      </div>

      <ul className="relative mt-6 grid gap-2 border-t border-white/15 pt-5 sm:grid-cols-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/90">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Check size={10} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex flex-wrap gap-2">
        <a
          href={paypalManageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-action-shadow transition-[translate] duration-300 hover:-translate-y-0.5"
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
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20"
        >
          <Repeat size={14} />
          Change plan
        </a>
      </div>
    </GlassCard>
  );
}
