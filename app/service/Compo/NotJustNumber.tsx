"use client";

import React from "react";
import { X, Check } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

const traditional = [
  "More followers",
  "Generic targeting",
  "Short-term thinking",
  "Little visibility",
  "Vanity metrics",
  '"Trust us"',
];

const ourApproach = [
  "Better-fit followers",
  "Account-specific strategy",
  "Consistent momentum",
  "Clear reporting",
  "Meaningful metrics",
  "Transparent process",
];

export default function NotJustNumbers() {
  return (
    <section className="bg-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* header */}
        <div className="mx-auto max-w-lg text-center">
          <CornerFrame className="mx-auto inline-flex bg-action-tint-bg">
            <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
              05 · Our Approach
            </p>
          </CornerFrame>

          {/* <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            We don&apos;t just chase numbers.
          </h2> */}

          <div className="-space-y-1.5 mt-6">
            <Heading as="h2">We don't just chase numbers.</Heading>
          </div>

          <p className="mx-auto mt-2 text-sm leading-relaxed text-secondary">
            From audience research to whole-goal thinking, we care about who
            you&apos;re reaching, how they&apos;re responding, and whether your
            growth is moving in the right direction.
          </p>
        </div>

        {/* split comparison panel — no cards, just a divided block */}
        <div className="relative mt-14 grid grid-cols-1 overflow-hidden rounded-3xl border border-border sm:grid-cols-2">
          {/* left — traditional */}
          <div className="bg-subtle-bg p-8 sm:p-10">
            <p className="text-md font-semibold text-secondary">
              Traditional Approach
            </p>
            <ul className="mt-6 space-y-4">
              {traditional.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-secondary"
                >
                  <X size={15} className="shrink-0 text-danger" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* right — our approach */}
          <div className="bg-white p-8 sm:p-10">
            <p className="text-md font-semibold text-action">Our Approach</p>
            <ul className="mt-6 space-y-4">
              {ourApproach.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-ink"
                >
                  <Check size={15} className="shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* center VS divider — desktop only */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-canvas bg-ink text-xs font-bold text-white shadow-md">
              VS
            </div>
          </div>
        </div>

        {/* closing line */}
        <p className="mt-10 text-center text-sm font-medium text-secondary">
          The goal isn&apos;t to look bigger. It&apos;s to become bigger in the
          right way.
        </p>
      </div>
    </section>
  );
}
