"use client";

import { forwardRef, useState } from "react";
import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmt, type Account, type Audience } from "../data";

interface Props {
  audience: Audience;
  accounts: Account[];
  onOpenCase: (username: string) => void;
  onOpenCollection: () => void;
}

// Bento layout: one wide featured card + one, then a row of three.
// Each slot has its own colourway so the grid reads as a set.
const SLOTS = [
  "md:col-span-6 bg-action-on-dark text-[#24143d]",
  "md:col-span-3 bg-action-tint-bg text-ink",
  "md:col-span-3 bg-white/[0.06] text-white ring-1 ring-white/10",
  "md:col-span-4 bg-white/[0.06] text-white ring-1 ring-white/10",
  "md:col-span-4 bg-[#eeeaf5] text-ink",
  "md:col-span-4 bg-action-on-dark text-[#24143d]",
];

/** Section 6: six recorded growth results for the selected audience. */
const GrowthResults = forwardRef<HTMLElement, Props>(function GrowthResults(
  { audience, accounts, onOpenCase, onOpenCollection },
  ref,
) {
  const [list, setList] = useState(false);

  return (
    <section
      ref={ref}
      id="results"
      aria-labelledby="proof-heading"
      className="relative scroll-mt-40 overflow-hidden rounded-t-[36px] bg-[#19171f] pb-16 pt-16 text-white sm:pt-20"
    >
      {/* quiet rings in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-44 h-[600px] w-[600px] rounded-full border border-white/[0.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#b7aec8]">
          <span className="h-1.5 w-1.5 rounded-full bg-action-on-dark" />
          The growth, up close
        </div>

        <div className="mb-10 mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
          <h2
            id="proof-heading"
            className="text-4xl font-[600] leading-[0.9] -tracking-[0.04em] md:text-5xl"
          >
            See how their
            <br />
            <span className="text-action-on-dark">accounts grew.</span>
          </h2>
          <p className="max-w-[270px] pb-1 text-sm leading-relaxed text-[#b0a8bb]">
            Explore the results, then see the work behind them.
          </p>
        </div>

        {/* toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3 text-xs text-[#b0a8bb]">
            Showing
            <span className="rounded-full border border-[#514465] bg-[#2d273d] px-3 py-1.5 text-[11px] text-[#d8c8ff]">
              {audience.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#b0a8bb]">
              {accounts.length} selected accounts
            </span>
            <div
              role="group"
              aria-label="Results display"
              className="flex rounded-xl bg-white/[0.06] p-1"
            >
              {(
                [
                  [false, "Grid view", LayoutGrid],
                  [true, "List view", List],
                ] as const
              ).map(([isList, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  aria-pressed={list === isList}
                  onClick={() => setList(isList)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark",
                    list === isList
                      ? "bg-white text-ink"
                      : "text-white/60 hover:text-white",
                  )}
                >
                  <Icon size={15} aria-hidden />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* results */}
        <ul
          className={cn(
            "grid gap-4",
            list
              ? "grid-cols-1 gap-2.5"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-12",
          )}
        >
          {/* Keyed by slot, not account, so switching audience rolls each
              number to its new value instead of remounting the card. */}
          {accounts.map((a, i) => (
            <motion.li
              key={i}
              layout
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "rounded-[18px]",
                list
                  ? "bg-white/[0.06] text-white ring-1 ring-white/10"
                  : SLOTS[i],
              )}
            >
              <ResultCard
                account={a}
                featured={i === 0}
                list={list}
                onOpen={() => onOpenCase(a.username)}
              />
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex max-w-[860px] items-start gap-2.5 text-[11px] leading-relaxed text-[#988da8]">
          <span
            aria-hidden
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#5b506a] text-[10px]"
          >
            i
          </span>
          <p>
            Growth recorded in saved reports. Months shown are months with saved
            growth data, not elapsed service time. Accounts were managed by the
            team behind Ignited.
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <button
            type="button"
            onClick={onOpenCollection}
            className="group inline-flex w-fit items-center gap-6 border-b border-[#746781] pb-2.5 text-[15px] transition-colors hover:border-action-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark"
          >
            Explore all case studies
            <ArrowUpRight
              size={22}
              aria-hidden
              className="text-action-on-dark transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
          <p className="text-[11px] text-[#93879f]">
            Results vary by account, content and time period.
          </p>
        </div>
      </div>
    </section>
  );
});

export default GrowthResults;

function ResultCard({
  account: a,
  featured,
  list,
  onOpen,
}: {
  account: Account;
  featured: boolean;
  list: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Explore ${a.displayName}: ${fmt(a.totalGrowth)} recorded new followers`}
      className={cn(
        "group relative flex h-full w-full overflow-hidden rounded-[18px] text-left outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#e6daff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#19171f]",
        list
          ? "flex-col gap-4 px-6 py-5 sm:grid sm:grid-cols-[1.2fr_1fr_1.3fr] sm:items-center sm:gap-6 hover:translate-y-0 hover:bg-white/[0.04]"
          : "min-h-[270px] flex-col p-6",
        !list && featured && "md:min-h-[300px]",
      )}
    >
      {/* dot grid, tinted by the card's text colour and fading downwards */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1.2px)] bg-size-[14px_14px] opacity-[0.14] mask-[linear-gradient(to_bottom,black_30%,transparent)]"
      />

      {featured && !list && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 top-11 h-64 w-64 rounded-full border-[38px] border-white/10"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span className="max-w-[85%] text-[9px] font-semibold uppercase tracking-[0.1em] opacity-75">
          {a.tag}
        </span>
        {!list && (
          <ArrowUpRight
            size={18}
            aria-hidden
            className="opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100"
          />
        )}
      </div>

      <div className={cn("relative", !list && "mt-9")}>
        <div
          className={cn(
            "font-semibold leading-none -tracking-[0.06em]",
            list
              ? "text-4xl"
              : featured
                ? "text-5xl lg:text-6xl"
                : "text-4xl lg:text-5xl",
          )}
        >
          <NumberFlow value={a.totalGrowth} prefix="+" locales="en-US" />
        </div>
        <div className="mt-2 text-[10px] opacity-65">
          recorded follower growth
        </div>
      </div>

      <div
        className={cn(
          "relative flex items-end justify-between gap-2",
          !list && "mt-auto pt-6",
          list && "sm:items-center",
        )}
      >
        <div className="min-w-0">
          <strong className="block text-xs font-semibold">
            {a.displayName}
          </strong>
          <small className="mt-0.5 block text-[10px] opacity-65 [overflow-wrap:anywhere]">
            @{a.username}
          </small>
        </div>
        <div className="shrink-0 whitespace-nowrap text-right text-[9px] font-medium leading-snug opacity-65">
          {a.savedMonths} months
          <br />
          of saved data
        </div>
      </div>
    </button>
  );
}
