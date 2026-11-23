import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  Repeat,
  RotateCcw,
} from "lucide-react";
import { formatDate, formatMoney } from "../../lib/format";
import { supportMailto } from "../../lib/support";
import type { BillingPageData, SubscriptionLine } from "../../lib/types";
import { Eyebrow, GlassCard, StatusChip } from "../ui";
import PaidPeriod from "./PaidPeriod";
import { CancelTrigger } from "./CancelSubscriptions";

export default function PlanHero({
  plan,
  main,
  nextBillingDate,
  monthlyTotal,
  paypalManageUrl,
  asOf,
}: {
  plan: NonNullable<BillingPageData["plan"]>;
  main: SubscriptionLine | undefined;
  nextBillingDate: string | null;
  monthlyTotal: number;
  paypalManageUrl: string;
  asOf: number;
}) {
  const cancelled = main?.status === "CANCELLED";
  const stillRunning = !!main?.paidUntil && Date.parse(main.paidUntil) > asOf;

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

      {cancelled && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-warning-bg p-4 text-sm text-warning-ink">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">
              Your plan is cancelled. You won&apos;t be charged again.
            </span>{" "}
            {stillRunning
              ? `Your Brand Manager keeps working on your account until ${formatDate(main?.paidUntil)}.`
              : "Restart any time to pick up where you left off."}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
        <p className="font-heading-condensed text-4xl font-bold leading-none text-ink">
          {formatMoney(plan.price)}
          <span className="ml-1 font-body text-sm font-medium text-muted">
            / month
          </span>
        </p>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-[11px] text-muted">
              {cancelled ? "Access until" : "Next payment"}
            </dt>
            <dd className="font-semibold text-ink">
              {formatDate(cancelled ? main?.paidUntil : nextBillingDate) ?? "—"}
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

      {main?.periodStart &&
        main.paidUntil &&
        (cancelled ? stillRunning : true) && (
          <PaidPeriod
            start={main.periodStart}
            end={main.paidUntil}
            cancelled={cancelled}
            inTrial={main.inTrial}
            nextCharge={monthlyTotal}
            now={asOf}
            className="mt-6"
          />
        )}

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

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {cancelled && (
          <Link
            href="/price"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-action"
          >
            <RotateCcw size={14} />
            Restart plan
          </Link>
        )}
        <a
          href={paypalManageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            cancelled
              ? "group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-border-strong hover:bg-subtle-bg"
              : "group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-action"
          }
        >
          Manage in PayPal
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        {!cancelled && (
          <>
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
            <CancelTrigger className="ml-auto inline-flex h-11 items-center px-3 text-sm font-semibold text-secondary underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-current">
              Cancel subscriptions
            </CancelTrigger>
          </>
        )}
      </div>
    </GlassCard>
  );
}
