"use client";

import React from "react";
import {
  UserX,
  Compass,
  TrendingDown,
  LineChart,
  X,
  LucideIcon,
} from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

const problems = [
  {
    icon: UserX,
    title: "The wrong audience",
    description:
      "More followers mean little when they don't care about what you do.",
  },
  {
    icon: Compass,
    title: "No clear direction",
    description:
      "Without a strategy, growth becomes a cycle of trying things and hoping they work.",
  },
  {
    icon: TrendingDown,
    title: "Growth without consistency",
    description:
      "A short spike feels good. Sustainable growth is what actually builds an account.",
  },
  {
    icon: LineChart,
    title: "No idea what's working",
    description:
      "If you can't see what's driving your growth, it's difficult to know what to do next.",
  },
];

function ProblemIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative inline-flex">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white">
        <Icon size={18} strokeWidth={1.75} className="text-ink/70" />
      </div>
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-white">
        <X size={10} strokeWidth={2.5} className="text-secondary" />
      </span>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="bg-subtle-bg px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-canvas px-6 py-12 sm:px-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_2fr] lg:items-start lg:gap-10">
          {/* LEFT — intro */}
          <div>
            <CornerFrame className="inline-flex bg-action-tint-bg">
              <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
                02 · The real problem
              </p>
            </CornerFrame>

            <div className="heading mt-5 max-w-xs font-heading text-3xl font-[700] leading-[1.05] -tracking-[0.02em] sm:text-4xl">
              <Heading className="text-left">
                Growing shouldn&apos;t feel{" "}
              </Heading>
              <Heading className="text-left">like guessing.</Heading>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              Posting more, chasing numbers, and hoping something sticks
              isn&apos;t a growth strategy.
            </p>
          </div>

          {/* RIGHT — problem grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map(({ icon, title, description }) => (
              <div key={title}>
                <ProblemIcon icon={icon} />
                <h3 className="mt-4 font-heading text-sm font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-secondary">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom pill */}
        <div className="mt-12 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-action/25 bg-action-tint-bg px-5 py-2 text-sm font-semibold text-action">
            That&apos;s where we come in.
          </span>
        </div>
      </div>
    </section>
  );
}
