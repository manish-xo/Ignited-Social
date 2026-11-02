"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";
import { fmt, type Account, type Audience } from "../data";

interface Props {
  audience: Audience;
  index: number;
  featured: Account;
  onExploreResults: () => void;
  onOpenStory: (username: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Section 5: the audience pitch on the left, one customer's story on the right. */
export default function AudienceStory({
  audience,
  index,
  featured,
  onExploreResults,
  onOpenStory,
}: Props) {
  const isProduct = audience.id === "products";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={audience.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease }}
        className="grid items-center gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20"
      >
        {/* ── pitch (right on desktop, first on phones) ──────────── */}
        <div className="md:order-2">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-action">
            <span className="rounded-md bg-action-tint-bg px-2 py-1.5 font-mono text-[11px] font-medium tracking-normal">
              0{index + 1}
            </span>
            {audience.label}
          </div>

          <Heading
            as="h2"
            gradient={false}
            className="mt-6 max-w-[440px] pb-1 font-body text-4xl font-semibold leading-[1.05] -tracking-[0.06em] text-ink md:text-4xl"
          >
            {audience.headline}
          </Heading>

          <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-secondary">
            {audience.copy}
          </p>

          <ul className="mt-7 grid gap-3 text-sm text-ink">
            {audience.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-action-tint text-action"
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onExploreResults}
            className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-action py-3 pl-5 pr-3 text-sm font-medium text-white shadow-[0_14px_30px_-16px_rgba(90,76,224,0.9)] transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2"
          >
            Explore {audience.short} results
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/15 transition-transform group-hover:translate-y-0.5">
              <ArrowDown size={15} aria-hidden />
            </span>
          </button>
        </div>

        {/* ── customer story ───────────────────────────────────── */}
        <article className="relative pb-2 md:order-1 md:pb-0">
          <div
            className={cn(
              "relative h-[300px] overflow-hidden rounded-[24px] sm:h-[400px] lg:h-[430px]",
              isProduct ? "bg-white ring-1 ring-border" : "bg-ink",
            )}
          >
            <Image
              src={audience.photo.src}
              alt={audience.photo.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 1024px) 640px, (min-width: 768px) 55vw, 100vw"
              className={cn(isProduct ? "object-contain p-8" : "object-cover")}
            />
            {!isProduct && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#161125]/60" />
            )}

            <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-[#1a1823]/45 px-2.5 py-1.5 text-[10px] tracking-[0.03em] text-white backdrop-blur-md">
              {audience.photo.real
                ? "Product imagery · BlueMag Airsoft"
                : "Illustrative photography"}
            </span>

            <span
              className={cn(
                "absolute bottom-16 left-5 flex items-center gap-2 text-xs",
                isProduct ? "text-secondary" : "text-white",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                aria-hidden
                className="h-[15px] w-[15px]"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
              </svg>
              {audience.type}
            </span>
          </div>

          {/* growth stamp */}
          <div className="absolute -left-1 top-5 z-10 min-w-[150px] -rotate-[5deg] rounded-xl bg-action-on-dark px-5 py-4 text-[#2a1b57] shadow-[0_10px_24px_-10px_rgba(24,17,36,0.35)] sm:-left-4 sm:top-7">
            <strong className="block text-[1.75rem] font-semibold leading-none tracking-tight">
              +{fmt(featured.totalGrowth)} ↗
            </strong>
            <span className="mt-1 block text-[10px]">recorded followers</span>
            <small className="block text-[9px] opacity-70">
              {featured.savedMonths} months with saved growth data
            </small>
          </div>

          {/* customer quote */}
          <div className="relative z-10 -mt-10 ml-3 mr-3 rounded-2xl bg-ink px-6 pb-5 pt-6 text-white shadow-[0_18px_40px_-20px_rgba(27,21,37,0.6)] sm:-mr-6 sm:ml-10">
            <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.08em] text-white/55">
              <span>From the customer · Proposed quote</span>
              <span
                aria-hidden
                className="text-3xl font-bold leading-[0.6] text-action-on-dark"
              >
                “
              </span>
            </div>
            <blockquote className="text-base font-medium leading-[1.45] tracking-tight sm:text-lg">
              {featured.quote}
            </blockquote>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
              <div>
                <strong className="block text-[13px] font-semibold">
                  {audience.person}
                </strong>
                <small className="text-[11px] text-white/55">
                  @{featured.username}
                </small>
              </div>
              <button
                type="button"
                onClick={() => onOpenStory(featured.username)}
                className="group flex items-center gap-3 whitespace-nowrap py-1.5 text-xs text-action-on-dark transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark"
              >
                {audience.story}
                <ArrowUpRight
                  size={17}
                  aria-hidden
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </article>
      </motion.div>
    </AnimatePresence>
  );
}
