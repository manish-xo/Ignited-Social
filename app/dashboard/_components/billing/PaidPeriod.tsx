import { cn } from "@/lib/utils";
import { formatMoney } from "../../lib/format";

const DAY = 86_400_000;

const short = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/**
 * One line from the start of the paid period to the day it ends, with today
 * marked: what's already paid for, how long is left, and what happens at the
 * end (the next charge, or access ending with no more charges).
 */
export default function PaidPeriod({
  start,
  end,
  cancelled,
  inTrial,
  nextCharge,
  now,
  className,
}: {
  start: string;
  end: string;
  cancelled: boolean;
  inTrial: boolean;
  /** Shown under the end date while active; leave out to hide the amount. */
  nextCharge?: number;
  /** "Today" in ms, from the page data. */
  now: number;
  className?: string;
}) {
  const from = Date.parse(start);
  const to = Date.parse(end);
  const span = Math.max(1, to - from);
  const done = Math.min(1, Math.max(0, (now - from) / span));
  const daysLeft = Math.max(0, Math.ceil((to - now) / DAY));

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between text-[11px] text-muted">
        <span>{inTrial ? "Free trial" : "Paid period"}</span>
        <span>
          <span className="font-mono tabular-nums">{daysLeft}</span>{" "}
          {daysLeft === 1 ? "day" : "days"} left
        </span>
      </div>

      <div className="relative mt-2.5 h-1.5 rounded-full bg-subtle-bg">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-ink/25"
          style={{ width: `${done * 100}%` }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full bg-ink"
          style={{ left: `calc(${done * 100}% - 1px)` }}
        />
        <div
          aria-hidden
          className={cn(
            "absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-white",
            cancelled ? "border-action" : "border-ink/40",
          )}
        />
      </div>

      <div className="mt-2.5 flex justify-between text-[11px]">
        <div>
          <p className="font-mono tabular-nums text-secondary">
            {short(start)}
          </p>
          <p className="text-muted">{inTrial ? "trial started" : "paid"}</p>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-mono tabular-nums",
              cancelled ? "font-medium text-action" : "text-secondary",
            )}
          >
            {short(end)}
          </p>
          <p className="text-muted">
            {cancelled
              ? inTrial
                ? "access ends, never charged"
                : "access ends, no more charges"
              : nextCharge !== undefined
                ? `next charge ${formatMoney(nextCharge)}`
                : "next charge"}
          </p>
        </div>
      </div>
    </div>
  );
}
