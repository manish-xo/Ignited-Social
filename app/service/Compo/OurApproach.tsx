"use client";

import React from "react";
import {
  Search,
  Target,
  SlidersHorizontal,
  TrendingUp,
  BarChart3,
  FileText,
} from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    description:
      "We look at your audience, positioning, and current growth to see where you are.",
  },
  {
    number: "02",
    icon: Target,
    title: "Target",
    description:
      "We identify the audiences most likely to connect with your account.",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Optimize",
    description:
      "We refine targeting based on what we're seeing — no assumptions.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow",
    description: "We turn relevant attention into sustainable audience growth.",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Learn",
    description:
      "We study behavior and identify what's creating the strongest response.",
  },
  {
    number: "06",
    icon: FileText,
    title: "Report",
    description:
      "You see growth, audience quality, and progress in your dashboard.",
  },
];

export default function OurApproach() {
  return (
    <section className="bg-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* header — centered, not split-column this time, to break the pattern */}
        <div className="mx-auto max-w-xl text-center">
          <CornerFrame className="mx-auto inline-flex bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs tracking-widest text-action">
              03 · Our Approach
            </p>
          </CornerFrame>

          {/* <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            A simple system built for real growth.
          </h2> */}

          <div className="-space-y-1.5 mt-6">
            <Heading as="h2">A simple system built</Heading>
            <Heading as="h2">for real growth.</Heading>
          </div>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary">
            We don&apos;t use the same playbook for every account. We learn what
            makes yours different, then build the strategy around it.
          </p>
        </div>

        {/* connected timeline flow — not a card grid */}
        <div className="relative mt-16">
          {/* connecting line — desktop only, runs behind the numbered circles */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-6 lg:gap-x-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-start lg:items-center lg:text-center"
                >
                  {/* numbered node sitting on the line */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-action bg-canvas">
                    <Icon size={18} className="text-action" />
                  </div>

                  <span className="mt-3 font-mono text-[10px] tracking-[0.1em] text-muted">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-1 text-base font-[700] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-secondary lg:mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
