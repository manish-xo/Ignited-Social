"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, formatMoney } from "../../lib/format";
import { supportMailto } from "../../lib/support";
import type { SubscriptionLine } from "../../lib/types";
import PaidPeriod from "./PaidPeriod";
import PaperCard from "./PaperCard";

/*
 * Cancelling from the Billing page. The customer picks what to cancel: the
 * whole plan (which takes the content and add-ons with it) or any of the
 * extras on their own. /api/billing/cancel does the PayPal side.
 */

const CancelContext = createContext<((ids: string[]) => void) | null>(null);

const REASONS = [
  "It costs more than I want to spend",
  "I'm not seeing the growth I expected",
  "I don't need it right now",
  "Something else",
];

const KIND_LABEL: Record<SubscriptionLine["kind"], string> = {
  plan: "Growth plan",
  upsell: "Content",
  addon: "Add-on",
};

const cancellable = (s: SubscriptionLine) =>
  s.status === "ACTIVE" || s.status === "APPROVED" || s.status === "SUSPENDED";

/** Wraps the Billing page so any "Cancel" link can open the picker. */
export function CancelProvider({
  subscriptions,
  asOf,
  demo,
  children,
}: {
  subscriptions: SubscriptionLine[];
  /** "Today" in ms, from the page data. */
  asOf: number;
  /**
   * Preview only: called with the ids instead of contacting PayPal, so the
   * preview page can update itself. Leave out on the real page.
   */
  demo?: (ids: string[]) => void;
  children: ReactNode;
}) {
  // Ids ticked when the dialog opens; null while it's closed.
  const [picking, setPicking] = useState<string[] | null>(null);
  const open = useCallback((ids: string[]) => setPicking(ids), []);
  const active = subscriptions.filter(cancellable);

  return (
    <CancelContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {picking && active.length > 0 && (
          <CancelDialog
            active={active}
            initial={picking}
            asOf={asOf}
            demo={demo}
            onClose={() => setPicking(null)}
          />
        )}
      </AnimatePresence>
    </CancelContext.Provider>
  );
}

/** A "Cancel" link that opens the picker with `ids` already ticked. */
export function CancelTrigger({
  ids = [],
  className,
  children,
}: {
  ids?: string[];
  className?: string;
  children: ReactNode;
}) {
  const open = useContext(CancelContext);
  if (!open) return null;
  return (
    <button type="button" onClick={() => open(ids)} className={className}>
      {children}
    </button>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

function CancelDialog({
  active,
  initial,
  asOf,
  demo,
  onClose,
}: {
  active: SubscriptionLine[];
  initial: string[];
  asOf: number;
  demo?: (ids: string[]) => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const plan = active.find((s) => s.kind === "plan");
  const [picked, setPicked] = useState<Set<string>>(
    () =>
      new Set(
        plan && initial.includes(plan.id) ? active.map((s) => s.id) : initial,
      ),
  );
  const [step, setStep] = useState<"pick" | "working" | "done">("pick");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<SubscriptionLine[]>([]);
  const keepRef = useRef<HTMLButtonElement>(null);

  const planPicked = !!plan && picked.has(plan.id);
  const chosen = active.filter((s) => picked.has(s.id));
  const kept = active.filter((s) => !picked.has(s.id));
  const saving = chosen.reduce((sum, s) => sum + s.monthlyPrice, 0);
  const everything = chosen.length === active.length;
  const inTrial = chosen.length > 0 && chosen.every((s) => s.inTrial);
  // When what's picked stops: the latest end among them.
  const endsOn =
    chosen
      .map((s) => s.paidUntil)
      .filter((d): d is string => !!d)
      .sort()
      .at(-1) ?? null;
  const names = (list: SubscriptionLine[]) =>
    list.map((s) => s.name).join(" and ");

  const toggle = (s: SubscriptionLine) =>
    setPicked((prev) => {
      if (s.kind === "plan") {
        return prev.has(s.id) ? new Set() : new Set(active.map((x) => x.id));
      }
      const next = new Set(prev);
      if (next.has(s.id)) next.delete(s.id);
      else next.add(s.id);
      return next;
    });

  // The safe choice has focus first; Escape closes unless mid-cancel.
  useEffect(() => {
    keepRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "working") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const confirm = async () => {
    if (!chosen.length) return;
    setStep("working");
    setError(null);
    if (demo) {
      // Preview: pretend PayPal took a moment, then update the page.
      await new Promise((r) => setTimeout(r, 700));
      demo(chosen.map((s) => s.id));
      setDone(chosen);
      setStep("done");
      return;
    }
    try {
      const res = await fetch("/api/billing/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: chosen.map((s) => s.id),
          reason:
            reason === "Something else"
              ? other.trim() || reason
              : reason || undefined,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          body.message || "Something went wrong. Please try again.",
        );
      const cancelled = new Set<string>(body.cancelled ?? []);
      setDone(active.filter((s) => cancelled.has(s.id)));
      if (body.failed?.length) {
        setError(
          "Some of these couldn't be cancelled. Please try them again or contact support.",
        );
      }
      setStep("done");
      router.refresh(); // the page shows the new statuses
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStep("pick");
    }
  };

  const confirmLabel = everything
    ? "Cancel everything"
    : chosen.length === 1
      ? `Cancel ${chosen[0].name}`
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
        className="relative max-h-[92dvh] w-full max-w-[560px] overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        {step !== "working" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle-bg hover:text-ink"
          >
            <X size={16} />
          </button>
        )}

        {step === "done" ? (
          <>
            <h2
              id="cancel-title"
              className="pr-10 font-heading text-xl font-bold tracking-tight text-ink"
            >
              {done.length === 1 ? `${done[0].name} cancelled` : "Cancelled"}
            </h2>
            {done.length > 1 && (
              <ul className="mt-3 border-t border-hairline">
                {done.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between border-b border-hairline py-2.5 text-sm"
                  >
                    <span className="text-ink">{s.name}</span>
                    <span className="font-mono tabular-nums text-muted">
                      {formatMoney(s.monthlyPrice)}/mo
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {`You won't be charged for ${done.length === 1 ? "it" : "these"} ${inTrial ? "at all" : "again"}.`}
              {endsOn && (
                <>
                  {" "}
                  {done.length === 1 ? "It keeps" : "They keep"} running until{" "}
                  <span className="font-mono tabular-nums text-ink">
                    {formatDate(endsOn)}
                  </span>
                  .
                </>
              )}
              {kept.length > 0 &&
                ` ${names(kept)} ${kept.length === 1 ? "stays" : "stay"} active.`}
            </p>
            {error && <p className="mt-3 text-sm text-danger-ink">{error}</p>}
            <button
              type="button"
              onClick={onClose}
              className="mt-8 h-11 w-full rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-action"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <h2
              id="cancel-title"
              className="pr-10 font-heading text-xl font-bold tracking-tight text-ink"
            >
              What would you like to cancel?
            </h2>
            <p className="mt-1.5 text-sm text-secondary">
              Pick one or more. Cancelling the plan ends everything with it
            </p>

            <fieldset className="mt-5" disabled={step === "working"}>
              <legend className="sr-only">Subscriptions to cancel</legend>
              <ul className="grid gap-3 sm:grid-cols-3">
                {active.map((s, i) => {
                  const locked = s.kind !== "plan" && planPicked;
                  const on = picked.has(s.id);
                  return (
                    <li key={s.id}>
                      <label
                        className={cn(
                          "block h-full",
                          locked ? "cursor-not-allowed" : "cursor-pointer",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          disabled={locked}
                          onChange={() => toggle(s)}
                          className="peer sr-only"
                        />
                        <PaperCard
                          number={i + 1}
                          size="sm"
                          selected={on}
                          className="h-full rounded-xl peer-focus-visible:ring-2 peer-focus-visible:ring-action"
                        >
                          <span className="flex items-start justify-between gap-2">
                            <span className="text-[11px] font-light text-secondary">
                              {KIND_LABEL[s.kind]}
                            </span>
                            <span
                              aria-hidden
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border",
                                on
                                  ? "border-action bg-action text-white"
                                  : "border-border bg-white",
                              )}
                            >
                              {on && <Check size={11} strokeWidth={3} />}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-sm font-bold leading-tight text-ink">
                            {s.name}
                          </span>
                          <span className="mt-2 block font-mono text-xs tabular-nums text-secondary">
                            {formatMoney(s.monthlyPrice)}/mo
                          </span>
                          <span className="mt-1.5 block text-[10px] leading-snug text-muted">
                            {s.kind === "plan"
                              ? "Cancels the extras too"
                              : locked
                                ? "Included with the plan"
                                : "On its own"}
                          </span>
                        </PaperCard>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            {chosen.length > 0 && (
              <>
                <div className="mt-5 rounded-2xl bg-subtle-bg p-4 text-sm leading-relaxed text-secondary">
                  {inTrial ? (
                    <>
                      You&apos;re in your free trial, so you won&apos;t be
                      charged for {chosen.length === 1 ? "it" : "these"} at all.
                    </>
                  ) : (
                    <>
                      You stop paying{" "}
                      <span className="font-mono tabular-nums text-ink">
                        {formatMoney(saving)}
                      </span>{" "}
                      a month.
                      {endsOn && (
                        <>
                          {" "}
                          This month is already paid, so{" "}
                          {planPicked
                            ? "your Brand Manager keeps working"
                            : chosen.length === 1
                              ? "it keeps running"
                              : "they keep running"}{" "}
                          until{" "}
                          <span className="font-mono tabular-nums text-ink">
                            {formatDate(endsOn)}
                          </span>
                          .
                        </>
                      )}
                    </>
                  )}
                  {kept.length > 0 && (
                    <>
                      {" "}
                      {names(kept)} {kept.length === 1 ? "stays" : "stay"}{" "}
                      active.
                    </>
                  )}
                </div>

                {planPicked && plan?.periodStart && plan.paidUntil && (
                  <PaidPeriod
                    start={plan.periodStart}
                    end={plan.paidUntil}
                    cancelled
                    inTrial={plan.inTrial}
                    now={asOf}
                    className="mt-5"
                  />
                )}

                <fieldset className="mt-6" disabled={step === "working"}>
                  <legend className="text-sm font-semibold text-ink">
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
                      maxLength={500}
                      placeholder="Tell us more"
                      className="mt-2 w-full rounded-2xl border border-border px-3 py-2 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
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

            {error && <p className="mt-5 text-sm text-danger-ink">{error}</p>}

            <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={confirm}
                disabled={step === "working" || chosen.length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-danger-ink transition-colors hover:bg-danger-bg disabled:text-muted disabled:hover:bg-transparent"
              >
                {step === "working" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
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
                className="h-11 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-action disabled:opacity-60"
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
