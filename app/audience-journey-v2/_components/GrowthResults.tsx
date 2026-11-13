"use client";

/* eslint-disable @next/next/no-img-element -- small screenshots shown at their natural size */
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowDown, ArrowUpRight, BadgeCheck, Pause, Play } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import type { Niche } from "../data";
import {
  formatGain,
  growth,
  RESULTS,
  resultImage,
  type CustomerResult,
} from "../results";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The result plays as a short sequence: before, arrow, after, then the number. */
const BEFORE_AT = 0.1;
const ARROW_AT = 0.75;
const AFTER_AT = 1.1;
const COUNT_AT = 1.7;

/** Each account plays its sequence, stays readable for a moment, then fades to the next. */
const CYCLE_SECONDS = 6.5;

const snapshot = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.7, ease: EASE },
  },
});

const arrow: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: ARROW_AT,
      type: "spring",
      stiffness: 420,
      damping: 16,
    },
  },
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: EASE } },
});

/** Counts up to the final gain once the sequence reaches it. */
function GainCounter({
  gained,
  rounded,
  play,
}: {
  gained: number;
  rounded: boolean;
  play: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = formatGain(gained, rounded);
      return;
    }
    if (!play) {
      el.textContent = formatGain(0, rounded);
      return;
    }
    const controls = animate(0, gained, {
      // Starts as the number fades in, so it never sits at zero.
      delay: COUNT_AT - 0.2,
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = formatGain(v, rounded);
      },
    });
    return () => controls.stop();
  }, [gained, rounded, play, reduce]);

  return <span ref={ref}>{formatGain(reduce ? gained : 0, rounded)}</span>;
}

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
        {highlight ? (
          <motion.span
            variants={{
              hidden: { color: "#858380", scale: 1 },
              show: {
                color: ["#858380", "#5a4ce0", "#5a4ce0"],
                scale: [1, 1.12, 1],
                transition: {
                  delay: AFTER_AT + 0.55,
                  duration: 0.7,
                  times: [0, 0.4, 1],
                },
              },
            }}
            className="inline-block origin-right normal-case tracking-normal"
          >
            {count} followers
          </motion.span>
        ) : (
          <span className="normal-case tracking-normal text-muted">
            {count} followers
          </span>
        )}
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

function Picker({
  niche,
  customers,
  selected,
  onSelect,
  cycling,
}: {
  niche: Niche;
  customers: CustomerResult[];
  selected: number;
  onSelect: (i: number) => void;
  cycling: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={`${niche.label} customers`}
      className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3"
    >
      {customers.map((c, i) => {
        const active = i === selected;
        return (
          <button
            key={c.handle}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(i)}
            className={cn(
              "relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
              active
                ? "border-action/50 bg-action-tint-bg"
                : "border-border bg-white/60 hover:border-action/30 hover:bg-white",
            )}
          >
            <img
              src={resultImage(niche.id, c.handle, "avatar")}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0">
              <span className="flex items-center gap-1 text-[13px] font-semibold text-ink">
                <span className="truncate">@{c.handle}</span>
                {c.verified && (
                  <BadgeCheck
                    size={14}
                    aria-label="Verified"
                    className="shrink-0 text-[#0095f6]"
                  />
                )}
              </span>
              <span
                className={cn(
                  "block text-xs",
                  active ? "text-action" : "text-secondary",
                )}
              >
                {growth(c).label} followers
              </span>
            </span>
            {active && cycling && (
              <motion.span
                key={`${niche.id}-${i}`}
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: CYCLE_SECONDS, ease: "linear" }}
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-action"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Real before and after snapshots for the selected niche. */
export default function GrowthResults({ niche }: { niche: Niche }) {
  const customers = RESULTS[niche.id];
  const [state, setState] = useState({ niche: niche.id, selected: 0 });
  // Start from the first customer whenever the niche tab changes.
  const selected = state.niche === niche.id ? state.selected : 0;
  const customer = customers[selected];
  const { gained, percent, rounded } = growth(customer);

  // The sequence waits until the section is on screen, then replays per customer.
  // Watched on the outer wrapper, which never changes, so switching niche or
  // account before it scrolls into view cannot leave the cards hidden.
  const resultRef = useRef<HTMLDivElement>(null);
  const inView = useInView(resultRef, { once: true, amount: 0.2 });

  // Accounts play one after another. Hovering or focusing inside pauses it,
  // and the button below the picker stops it for good.
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const cycling = inView && !hovered && !stopped && !reduce;

  useEffect(() => {
    if (!cycling) return;
    const timer = window.setTimeout(
      () =>
        setState({
          niche: niche.id,
          selected: (selected + 1) % customers.length,
        }),
      CYCLE_SECONDS * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [cycling, selected, niche.id, customers.length]);

  return (
    <div
      id="results"
      ref={resultRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          setHovered(false);
      }}
    >
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

      <Picker
        niche={niche}
        customers={customers}
        selected={selected}
        onSelect={(i) => setState({ niche: niche.id, selected: i })}
        cycling={cycling}
      />

      {!reduce && (
        <div className="mx-auto mt-3 flex max-w-3xl justify-end">
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-secondary transition-colors hover:bg-white hover:text-action"
          >
            {stopped ? (
              <Play size={12} aria-hidden />
            ) : (
              <Pause size={12} aria-hidden />
            )}
            {stopped ? "Play accounts" : "Pause accounts"}
          </button>
        </div>
      )}

      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${niche.id}-${customer.handle}`}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.45, ease: EASE },
            }}
            className="mx-auto mt-9 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20"
          >
            <div className="mx-auto w-full max-w-[420px]">
              <motion.div variants={snapshot(BEFORE_AT)}>
                <Snapshot
                  label="Before"
                  count={customer.before}
                  handle={customer.handle}
                  src={resultImage(niche.id, customer.handle, "before")}
                />
              </motion.div>
              <div className="my-3 flex justify-center text-action" aria-hidden>
                <motion.span
                  variants={arrow}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-action-tint-bg"
                >
                  <ArrowDown size={15} strokeWidth={2.2} />
                </motion.span>
              </div>
              <motion.div variants={snapshot(AFTER_AT)}>
                <Snapshot
                  highlight
                  label="After"
                  count={customer.after}
                  handle={customer.handle}
                  src={resultImage(niche.id, customer.handle, "after")}
                />
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <motion.p
                variants={fadeUp(COUNT_AT - 0.3)}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-action"
              >
                {niche.label}
              </motion.p>
              <motion.p
                variants={fadeUp(COUNT_AT - 0.2)}
                className="mt-4 font-heading text-6xl font-[700] leading-none -tracking-[0.06em] text-action tabular-nums md:text-7xl"
              >
                <GainCounter gained={gained} rounded={rounded} play={inView} />
              </motion.p>
              <motion.div variants={fadeUp(COUNT_AT + 0.2)}>
                <p className="mt-3 text-lg font-semibold text-ink">
                  followers gained
                </p>
                <p className="mt-1.5 text-sm text-secondary">
                  From {customer.before} to {customer.after} followers,{" "}
                  {percent}% more than before.
                </p>
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
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
