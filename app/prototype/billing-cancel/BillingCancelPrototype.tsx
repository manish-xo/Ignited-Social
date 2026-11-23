"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supportMailto } from "@/app/dashboard/lib/support";

/*
 * Billing page, cancellation prototype.
 *
 * Design pass after unslop (by Damir Sokolovsky, @heydamir, CC BY 4.0),
 * keeping the site's own colours and fonts:
 *   Fonts      SF Pro for everything, JetBrains Mono for dates and amounts
 *   Product    Ignited's client dashboard: what you pay for and when
 *   Character  calm, honest, unhurried
 *   World      an account statement
 *   Moment     the paid-period line: today, and the date access ends
 *   Signature  dates and amounts set in mono with tabular figures
 */

/* ── fake customer ─────────────────────────────────────────────── */

type Kind = "plan" | "upsell" | "addon";
interface Sub {
  id: string;
  name: string;
  kind: Kind;
  price: number;
  cancelled: boolean;
}

const KIND_LABEL: Record<Kind, string> = {
  plan: "Growth plan",
  upsell: "Content",
  addon: "Add-on",
};

const START: Sub[] = [
  { id: "plan", name: "Scale", kind: "plan", price: 147, cancelled: false },
  {
    id: "content",
    name: "Content Creation+",
    kind: "upsell",
    price: 289,
    cancelled: false,
  },
  {
    id: "comments",
    name: "Targeted Comments",
    kind: "addon",
    price: 14,
    cancelled: false,
  },
];

const FEATURES = [
  "Accelerated, higher-volume growth",
  "Estimated 250–800+ followers per month",
  "A dedicated Senior Brand Manager",
  "Advanced audience targeting",
];

// Fixed dates so the demo reads the same for everyone.
const TODAY = "2026-11-23";
const PERIOD_START = "2026-11-21";
const PAID_UNTIL = "2026-12-21";
const TRIAL_ENDS = "2026-11-28";
const MEMBER_SINCE = "2026-09-21";

const REASONS = [
  "It costs more than I want to spend",
  "I'm not seeing the growth I expected",
  "I don't need it right now",
  "Something else",
];

/* ── formatting ────────────────────────────────────────────────── */

const day = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const fullDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

/** Mono, tabular figures: the statement look for every date and amount. */
const Fig = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={cn("font-mono tabular-nums", className)}>{children}</span>
);

interface LogEntry {
  at: string;
  what: string;
  reason: string;
}

/* ── page ──────────────────────────────────────────────────────── */

export default function BillingCancelPrototype() {
  const [subs, setSubs] = useState<Sub[]>(START);
  const [inTrial, setInTrial] = useState(false);
  // What the cancel dialog opens with already ticked (null = closed).
  const [picking, setPicking] = useState<string[] | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  const plan = subs[0];
  const endsOn = inTrial ? TRIAL_ENDS : PAID_UNTIL;
  const active = subs.filter((s) => !s.cancelled);
  const total = active.reduce((sum, s) => sum + s.price, 0);

  const cancel = (ids: string[], reason: string) => {
    const names = subs
      .filter((s) => ids.includes(s.id) && !s.cancelled)
      .map((s) => (s.kind === "plan" ? `${s.name} plan` : s.name));
    setSubs((list) =>
      list.map((s) => (ids.includes(s.id) ? { ...s, cancelled: true } : s)),
    );
    setLog((l) => [
      {
        at: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        what: names.join(", "),
        reason: reason || "No reason given",
      },
      ...l,
    ]);
  };

  return (
    <>
      <PrototypeBar
        inTrial={inTrial}
        onTrial={setInTrial}
        onReset={() => {
          setSubs(START);
          setLog([]);
        }}
      />

      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Billing
        </h1>
        <p className="mt-1 text-sm text-secondary">
          @demo_account · member since <Fig>{fullDay(MEMBER_SINCE)}</Fig>
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* ── plan ─────────────────────────────────────────── */}
        <section className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <p className="text-sm text-secondary">
                Your plan
                {plan.cancelled && (
                  <>
                    {" · "}
                    <span className="text-ink">
                      cancelled <Fig>{day(TODAY)}</Fig>
                    </span>
                  </>
                )}
              </p>
              <p className="mt-1 font-body text-5xl font-semibold leading-none tracking-[-0.03em] text-ink">
                {plan.name}
              </p>
            </div>
            <p className="text-right">
              <Fig className="text-3xl font-medium text-ink">
                {money(plan.price)}
              </Fig>
              <span className="ml-1 text-sm text-secondary">a month</span>
            </p>
          </div>

          <PaidPeriod
            cancelled={plan.cancelled}
            inTrial={inTrial}
            nextCharge={total}
            className="mt-8"
          />

          <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-hairline pt-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-secondary"
              >
                <Check
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-muted"
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {plan.cancelled ? (
              <>
                <a
                  href="/price"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-action active:scale-[0.98]"
                >
                  <RotateCcw size={16} strokeWidth={1.5} />
                  Restart plan
                </a>
                <span
                  title="Not connected in the prototype"
                  className="cursor-not-allowed text-sm text-secondary underline decoration-hairline underline-offset-4"
                >
                  Manage in PayPal
                </span>
              </>
            ) : (
              <>
                <span
                  title="Not connected in the prototype"
                  className="inline-flex h-11 cursor-not-allowed items-center rounded-[10px] bg-ink px-5 text-sm font-medium text-white"
                >
                  Manage in PayPal
                </span>
                <button
                  type="button"
                  onClick={() => setPicking([])}
                  className="text-sm text-secondary underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
                >
                  Cancel subscriptions
                </button>
              </>
            )}
          </div>
        </section>

        {/* ── statement ────────────────────────────────────── */}
        <section className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-base font-semibold text-ink">Subscriptions</h2>
          <p className="mt-0.5 text-sm text-secondary">
            Each renews monthly through PayPal
          </p>

          <ul className="mt-5 border-t border-hairline">
            {subs.map((s) => (
              <li
                key={s.id}
                className="grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-hairline py-3"
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      s.cancelled ? "text-muted" : "text-ink",
                    )}
                  >
                    {s.kind === "plan" ? `${s.name} plan` : s.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {KIND_LABEL[s.kind]} ·{" "}
                    {s.cancelled ? (
                      <>
                        ends <Fig>{day(endsOn)}</Fig>
                      </>
                    ) : (
                      <>
                        {inTrial ? "trial ends" : "renews"}{" "}
                        <Fig>{day(endsOn)}</Fig>
                      </>
                    )}
                    {!s.cancelled && (
                      <>
                        {" · "}
                        <button
                          type="button"
                          onClick={() => setPicking([s.id])}
                          className="text-secondary underline decoration-transparent underline-offset-2 transition-colors hover:text-ink hover:decoration-current"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </p>
                </div>
                <Fig
                  className={cn(
                    "text-sm",
                    s.cancelled ? "text-muted" : "text-ink",
                  )}
                >
                  {s.cancelled ? "—" : money(s.price)}
                </Fig>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline justify-between border-b-[3px] border-double border-hairline py-4">
            <span className="text-sm text-secondary">
              {plan.cancelled
                ? "Nothing more to pay"
                : `Next charge, ${day(endsOn)}`}
            </span>
            <Fig className="text-lg font-medium text-ink">{money(total)}</Fig>
          </div>
        </section>
      </div>

      <TeamLog log={log} />

      <AnimatePresence>
        {picking && (
          <CancelDialog
            active={active}
            initial={picking}
            inTrial={inTrial}
            onClose={() => setPicking(null)}
            onConfirm={cancel}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── the moment: paid period ───────────────────────────────────── */

/**
 * One line from the start of the paid period to the day access ends, with
 * today marked. Says the whole cancellation story at a glance: what's already
 * paid for, and that nothing more is charged.
 */
function PaidPeriod({
  cancelled,
  inTrial,
  nextCharge,
  compact = false,
  className,
}: {
  cancelled: boolean;
  inTrial: boolean;
  nextCharge: number;
  compact?: boolean;
  className?: string;
}) {
  const end = inTrial ? TRIAL_ENDS : PAID_UNTIL;
  const span = daysBetween(PERIOD_START, end);
  const done = Math.min(1, daysBetween(PERIOD_START, TODAY) / span);
  const left = daysBetween(TODAY, end);

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between text-xs text-muted">
        <span>{inTrial ? "Free trial" : "Paid period"}</span>
        <span>
          <Fig>{left}</Fig> days left
        </span>
      </div>

      <div className="relative mt-3 h-1.5 rounded-full bg-subtle-bg">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-ink/25"
          style={{ width: `${done * 100}%` }}
        />
        {/* today */}
        <div
          className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full bg-ink"
          style={{ left: `calc(${done * 100}% - 1px)` }}
        />
        {/* the end of what's paid for */}
        <div
          className={cn(
            "absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-white",
            cancelled ? "border-action" : "border-ink/40",
          )}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 text-xs">
        <div>
          <Fig className="text-secondary">{day(PERIOD_START)}</Fig>
          <p className="text-muted">{inTrial ? "trial started" : "paid"}</p>
        </div>
        <div className="text-center">
          <Fig className="text-ink">{day(TODAY)}</Fig>
          <p className="text-muted">today</p>
        </div>
        <div className="text-right">
          <Fig
            className={cn(
              cancelled ? "font-medium text-action" : "text-secondary",
            )}
          >
            {day(end)}
          </Fig>
          <p className="text-muted">
            {cancelled
              ? inTrial
                ? "access ends, never charged"
                : "access ends, no charge"
              : compact
                ? "next charge"
                : `next charge ${money(nextCharge)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── prototype controls ────────────────────────────────────────── */

function PrototypeBar({
  inTrial,
  onTrial,
  onReset,
}: {
  inTrial: boolean;
  onTrial: (v: boolean) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-dashed border-hairline pb-4 text-xs text-muted">
      <p>Prototype with a fake customer. Nothing is charged or cancelled</p>
      <div className="flex items-center gap-5">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={inTrial}
            onChange={(e) => onTrial(e.target.checked)}
            className="h-3.5 w-3.5 accent-[var(--color-ink)]"
          />
          In free trial
        </label>
        <button
          type="button"
          onClick={onReset}
          className="underline-offset-2 hover:text-ink hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/** What the team would see. Customers won't see this in the real version. */
function TeamLog({ log }: { log: LogEntry[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium text-ink">Cancellations log</h2>
      <p className="mt-0.5 text-xs text-muted">
        What we&apos;d save for your team. Not shown to customers
      </p>
      {log.length === 0 ? (
        <p className="mt-4 text-sm text-secondary">Nothing cancelled yet</p>
      ) : (
        <ul className="mt-4 border-t border-hairline">
          {log.map((e, i) => (
            <li
              key={i}
              className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-4 border-b border-hairline py-3 text-sm sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <Fig className="whitespace-nowrap text-muted">{e.at}</Fig>
              <span className="text-ink">{e.what}</span>
              <span className="col-start-2 text-secondary sm:col-start-auto">
                {e.reason}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── cancel dialog: pick what to cancel ────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const label = (s: Sub) => (s.kind === "plan" ? `${s.name} plan` : s.name);

/**
 * The customer ticks what to cancel. Ticking the plan ticks (and locks)
 * everything else, because the content and add-ons run on top of the plan.
 */
function CancelDialog({
  active,
  initial,
  inTrial,
  onClose,
  onConfirm,
}: {
  /** Subscriptions that are still running. */
  active: Sub[];
  /** Ids ticked when the dialog opens. */
  initial: string[];
  inTrial: boolean;
  onClose: () => void;
  onConfirm: (ids: string[], reason: string) => void;
}) {
  const planSub = active.find((s) => s.kind === "plan");
  const [picked, setPicked] = useState<Set<string>>(
    () =>
      new Set(
        initial.includes(planSub?.id ?? "") ? active.map((s) => s.id) : initial,
      ),
  );
  const [step, setStep] = useState<"pick" | "working" | "done">("pick");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [done, setDone] = useState<Sub[]>([]);
  const keepRef = useRef<HTMLButtonElement>(null);
  const end = inTrial ? TRIAL_ENDS : PAID_UNTIL;

  const planPicked = !!planSub && picked.has(planSub.id);
  const chosen = active.filter((s) => picked.has(s.id));
  const kept = active.filter((s) => !picked.has(s.id));
  const saving = chosen.reduce((sum, s) => sum + s.price, 0);
  const everything = chosen.length === active.length;

  const toggle = (s: Sub) => {
    setPicked((prev) => {
      if (s.kind === "plan") {
        // The plan carries everything: on = all ticked, off = start over.
        return prev.has(s.id) ? new Set() : new Set(active.map((x) => x.id));
      }
      const next = new Set(prev);
      if (next.has(s.id)) next.delete(s.id);
      else next.add(s.id);
      return next;
    });
  };

  // The safe choice has focus first; Escape closes unless mid-cancel.
  useEffect(() => {
    keepRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "working") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const confirm = () => {
    if (!chosen.length) return;
    setStep("working");
    // Stands in for the PayPal calls (one per subscription) in the real version.
    setTimeout(() => {
      onConfirm(
        chosen.map((s) => s.id),
        reason === "Something else" ? other.trim() || "Something else" : reason,
      );
      setDone(chosen);
      setStep("done");
    }, 900);
  };

  const confirmLabel = everything
    ? "Cancel everything"
    : chosen.length === 1
      ? `Cancel ${label(chosen[0])}`
      : `Cancel ${chosen.length} subscriptions`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/30 p-3 sm:items-center"
      onClick={step === "working" ? undefined : onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.22, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-[460px] overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      >
        {step !== "working" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-subtle-bg hover:text-ink"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        )}

        {step === "done" ? (
          <>
            <h2
              id="cancel-title"
              className="pr-10 text-xl font-semibold tracking-tight text-ink"
            >
              {done.length === 1 ? `${label(done[0])} cancelled` : "Cancelled"}
            </h2>
            {done.length > 1 && (
              <ul className="mt-3 border-t border-hairline">
                {done.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between border-b border-hairline py-2.5 text-sm"
                  >
                    <span className="text-ink">{label(s)}</span>
                    <Fig className="text-muted">{money(s.price)}/mo</Fig>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {`You won't be charged for ${done.length === 1 ? "it" : "these"} ${inTrial ? "at all" : "again"}.`}{" "}
              {done.length === 1 ? "It keeps" : "They keep"} running until{" "}
              <Fig className="text-ink">{fullDay(end)}</Fig>.
              {kept.length > 0 &&
                ` ${kept.map(label).join(" and ")} ${kept.length === 1 ? "stays" : "stay"} active.`}{" "}
              A confirmation is on its way to your email.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 h-11 w-full rounded-[10px] bg-ink text-sm font-medium text-white transition-colors hover:bg-action active:scale-[0.98]"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <h2
              id="cancel-title"
              className="pr-10 text-xl font-semibold tracking-tight text-ink"
            >
              What would you like to cancel?
            </h2>
            <p className="mt-1.5 text-sm text-secondary">
              Pick one or more. Cancelling the plan ends everything with it
            </p>

            <fieldset className="mt-5" disabled={step === "working"}>
              <legend className="sr-only">Subscriptions to cancel</legend>
              <ul className="border-t border-hairline">
                {active.map((s) => {
                  const locked = s.kind !== "plan" && planPicked;
                  return (
                    <li key={s.id} className="border-b border-hairline">
                      <label
                        className={cn(
                          "grid min-h-14 grid-cols-[20px_minmax(0,1fr)_auto] items-center gap-x-3 py-3",
                          locked ? "cursor-not-allowed" : "cursor-pointer",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={picked.has(s.id)}
                          disabled={locked}
                          onChange={() => toggle(s)}
                          className="h-4 w-4 accent-[var(--color-ink)]"
                        />
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block truncate text-sm font-medium",
                              locked ? "text-secondary" : "text-ink",
                            )}
                          >
                            {label(s)}
                          </span>
                          <span className="block text-xs text-muted">
                            {s.kind === "plan"
                              ? "Cancels the content and add-ons too"
                              : locked
                                ? "Included, it runs on your plan"
                                : KIND_LABEL[s.kind]}
                          </span>
                        </span>
                        <Fig className="text-sm text-secondary">
                          {money(s.price)}/mo
                        </Fig>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            {chosen.length > 0 && (
              <>
                <div className="mt-5 rounded-xl bg-subtle-bg p-4 text-sm leading-relaxed text-secondary">
                  {inTrial ? (
                    <>
                      You&apos;re in your free trial, so you won&apos;t be
                      charged for {chosen.length === 1 ? "it" : "these"} at all.
                    </>
                  ) : (
                    <>
                      You stop paying{" "}
                      <Fig className="text-ink">{money(saving)}</Fig> a month.
                      This month is already paid, so{" "}
                      {planPicked
                        ? "your Brand Manager keeps working"
                        : chosen.length === 1
                          ? "it keeps running"
                          : "they keep running"}{" "}
                      until <Fig className="text-ink">{fullDay(end)}</Fig>.
                    </>
                  )}
                  {kept.length > 0 && (
                    <>
                      {" "}
                      {kept.map(label).join(" and ")}{" "}
                      {kept.length === 1 ? "stays" : "stay"} active.
                    </>
                  )}
                </div>

                {planPicked && (
                  <PaidPeriod
                    cancelled
                    inTrial={inTrial}
                    nextCharge={0}
                    compact
                    className="mt-5"
                  />
                )}

                <fieldset className="mt-6" disabled={step === "working"}>
                  <legend className="text-sm font-medium text-ink">
                    What&apos;s the main reason?{" "}
                    <span className="font-normal text-muted">Optional</span>
                  </legend>
                  <div className="mt-2">
                    {REASONS.map((r) => (
                      <label
                        key={r}
                        className="flex h-9 cursor-pointer items-center gap-2.5 text-sm text-secondary hover:text-ink"
                      >
                        <input
                          type="radio"
                          name="reason"
                          checked={reason === r}
                          onChange={() => setReason(r)}
                          className="h-4 w-4 accent-[var(--color-ink)]"
                        />
                        <span className={reason === r ? "text-ink" : undefined}>
                          {r}
                        </span>
                      </label>
                    ))}
                  </div>
                  {reason === "Something else" && (
                    <textarea
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                      rows={2}
                      placeholder="Tell us more"
                      className="mt-2 w-full rounded-[10px] border border-border px-3 py-2 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
                    />
                  )}
                </fieldset>

                {planPicked && (
                  <p className="mt-5 text-sm text-secondary">
                    Not sure?{" "}
                    <a
                      href={supportMailto(
                        "Before I cancel",
                        "Hi, I'm thinking about cancelling my plan. Could we talk first?\n",
                      )}
                      className="text-action underline underline-offset-4"
                    >
                      Talk to your Brand Manager first
                    </a>
                  </p>
                )}
              </>
            )}

            <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={confirm}
                disabled={step === "working" || chosen.length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-medium text-danger-ink transition-colors hover:bg-danger-bg disabled:text-muted disabled:hover:bg-transparent"
              >
                {step === "working" ? (
                  <>
                    <Loader2
                      size={16}
                      strokeWidth={1.5}
                      className="animate-spin"
                    />
                    Cancelling
                  </>
                ) : chosen.length === 0 ? (
                  "Pick something to cancel"
                ) : (
                  confirmLabel
                )}
              </button>
              <button
                ref={keepRef}
                type="button"
                onClick={onClose}
                disabled={step === "working"}
                className="h-11 rounded-[10px] bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-action active:scale-[0.98] disabled:opacity-60"
              >
                Keep everything
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
