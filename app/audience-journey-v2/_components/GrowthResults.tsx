"use client";

/* eslint-disable @next/next/no-img-element -- small screenshots shown at their natural size */
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { NICHES, type Niche } from "../data";
import { growth, RESULTS, resultImage, type CustomerResult } from "../results";
import { useNiche } from "./NicheContext";

function Snapshot({
  label,
  count,
  src,
  handle,
  highlight = false,
}: {
  label: string;
  count: string;
  src: string;
  handle: string;
  highlight?: boolean;
}) {
  return (
    <figure>
      <figcaption className="mb-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
        {label}
        <span
          className={cn(
            "normal-case tracking-normal",
            highlight ? "text-action" : "text-muted",
          )}
        >
          {count} followers
        </span>
      </figcaption>
      <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_18px_36px_-28px_rgba(34,31,27,0.5)]">
        <img
          src={src}
          alt={`@${handle} Instagram profile ${label.toLowerCase()}: ${count} followers`}
          className="block h-auto w-full rounded-lg"
          decoding="async"
        />
      </div>
    </figure>
  );
}

const stepButton =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-ink outline-none transition-colors duration-200 hover:border-action/40 hover:bg-action-tint-bg hover:text-action focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

/** The current account between previous and next buttons. */
function Stepper({
  niche,
  customer,
  index,
  total,
  nextNiche,
  prevNiche,
  onPrev,
  onNext,
}: {
  niche: Niche;
  customer: CustomerResult;
  index: number;
  total: number;
  /** Set when "next" leaves this niche, so the button can say where it goes. */
  nextNiche: Niche | null;
  prevNiche: Niche | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto mt-9 flex max-w-xl items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label={
          prevNiche
            ? `Previous: ${prevNiche.label}`
            : "Previous account"
        }
        className={stepButton}
      >
        <ChevronLeft size={18} aria-hidden />
      </button>

      <div
        aria-live="polite"
        className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-action/50 bg-action-tint-bg px-3 py-2.5"
      >
        <img
          src={resultImage(niche.id, customer.handle, "avatar")}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1 text-[13px] font-semibold text-ink">
            <span className="truncate">@{customer.handle}</span>
            {customer.verified && (
              <BadgeCheck
                size={14}
                aria-label="Verified"
                className="shrink-0 text-[#0095f6]"
              />
            )}
          </span>
          <span className="block text-xs text-action">
            {growth(customer).label} followers
          </span>
        </span>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-secondary">
          {index + 1} / {total}
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={nextNiche ? `Next: ${nextNiche.label}` : "Next account"}
        className={stepButton}
      >
        <ChevronRight size={18} aria-hidden />
      </button>
    </div>
  );
}

/**
 * Real before and after snapshots, one account at a time. Next and previous
 * step through the niche's accounts, then carry on into the neighbouring
 * niche, which also switches the tabs in "Who you want to reach".
 */
export default function GrowthResults() {
  const [nicheIndex, setNicheIndex] = useNiche();
  const niche = NICHES[nicheIndex];
  const customers = RESULTS[niche.id];
  const [state, setState] = useState({ niche: niche.id, selected: 0 });
  // Start from the first customer whenever the niche tab changes.
  const selected = state.niche === niche.id ? state.selected : 0;
  const customer = customers[selected];
  const { label, percent, rounded } = growth(customer);

  const count = NICHES.length;
  const atEnd = selected === customers.length - 1;
  const atStart = selected === 0;
  const nextNiche = atEnd ? NICHES[(nicheIndex + 1) % count] : null;
  const prevNiche = atStart ? NICHES[(nicheIndex - 1 + count) % count] : null;

  const goTo = (index: number, account: number) => {
    setState({ niche: NICHES[index].id, selected: account });
    setNicheIndex(index);
  };
  const onNext = () =>
    atEnd
      ? goTo((nicheIndex + 1) % count, 0)
      : setState({ niche: niche.id, selected: selected + 1 });
  const onPrev = () => {
    if (!atStart) return setState({ niche: niche.id, selected: selected - 1 });
    const prev = (nicheIndex - 1 + count) % count;
    goTo(prev, RESULTS[NICHES[prev].id].length - 1);
  };

  return (
    <div id="results">
      <header className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              The growth, up close
            </p>
          </CornerFrame>
        </div>
        <Heading
          as="h2"
          gradient={false}
          className="mt-5 pb-1 text-center font-heading-condensed text-3xl font-[600] leading-[0.95] -tracking-[0.04em] text-ink md:text-4xl"
        >
          See how their audience grew.
        </Heading>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-secondary">
          A closer look at accounts the team behind Ignited has helped grow.
        </p>
      </header>

      <Stepper
        niche={niche}
        customer={customer}
        index={selected}
        total={customers.length}
        nextNiche={nextNiche}
        prevNiche={prevNiche}
        onPrev={onPrev}
        onNext={onNext}
      />

      <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
        <div className="mx-auto w-full max-w-[420px]">
          <Snapshot
            label="Before"
            count={customer.before}
            handle={customer.handle}
            src={resultImage(niche.id, customer.handle, "before")}
          />
          <div className="my-3 flex justify-center text-action" aria-hidden>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-action-tint-bg">
              <ArrowDown size={15} strokeWidth={2.2} />
            </span>
          </div>
          <Snapshot
            highlight
            label="After"
            count={customer.after}
            handle={customer.handle}
            src={resultImage(niche.id, customer.handle, "after")}
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-action">
            {niche.label}
          </p>
          <p className="mt-4 font-body text-6xl font-semibold leading-none -tracking-[0.04em] text-action tabular-nums md:text-7xl">
            {label}
          </p>
          <p className="mt-3 text-lg font-semibold text-ink">followers gained</p>
          <p className="mt-1.5 text-sm text-secondary">
            From {customer.before} to {customer.after} followers, {percent}%
            more than before.
          </p>

          <figure className="mt-8 border-t border-border pt-7">
            <blockquote className="text-pretty text-lg leading-relaxed -tracking-[0.01em] text-ink md:text-xl">
              “{customer.quote}”
            </blockquote>
            <figcaption className="mt-3 text-xs text-muted">
              @{customer.handle}
            </figcaption>
          </figure>

          <a
            href={`https://www.instagram.com/${customer.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-action underline-offset-4 hover:underline"
          >
            View @{customer.handle} on Instagram
            <ArrowUpRight size={15} aria-hidden />
          </a>
          {rounded && (
            <p className="mt-6 text-xs text-muted">
              Counts as Instagram shows them, which rounds anything over
              10,000.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
