"use client";

import React from "react";
import {
  Compass,
  Users,
  SlidersHorizontal,
  FileBarChart,
  RefreshCw,
  Lightbulb,
  History,
} from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const items: ServiceItem[] = [
  {
    icon: Compass,
    title: "Growth Strategy Review",
    description: "Review of what's working and where the next opportunity is.",
  },
  {
    icon: Users,
    title: "Audience Analysis",
    description:
      "Understand who you're reaching and how well they fit your target.",
  },
  {
    icon: SlidersHorizontal,
    title: "Targeting Optimization",
    description:
      "Adjust your audience strategy based on how performance has changed.",
  },
  {
    icon: FileBarChart,
    title: "Performance Report",
    description: "See the numbers that matter, and what they mean for you.",
  },
  {
    icon: RefreshCw,
    title: "Growth Manager Update",
    description: "Get a clear update from the person managing your account.",
  },
  {
    icon: Lightbulb,
    title: "Strategy Recommendations",
    description: "Know what we're focusing on next, and why.",
  },
  {
    icon: History,
    title: "Activity History",
    description:
      "See the actions and changes made throughout your growth journey.",
  },
];

export default function MonthlyService() {
  return (
    <section className="bg-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_2.25fr] lg:items-start lg:gap-12">
          {/* LEFT — intro */}
          <div>
            <CornerFrame className="inline-flex bg-action-tint-bg">
              <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
                07 · Your Monthly Service
              </p>
            </CornerFrame>

            {/* <h2 className="mt-5 max-w-xs font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              More than a growth number.
            </h2> */}

            <div className="-space-y-1.5 mt-6">
              <Heading as="h2">More than a</Heading>
              <Heading as="h2">growth number.</Heading>
            </div>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-secondary">
              Every month, your account gets ongoing attention, strategy, and
              reporting designed to keep growth moving forward.
            </p>
          </div>

          {/* RIGHT — horizontal icon strip, no boxes */}
          <div className="flex flex-wrap gap-x-10 gap-y-10">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="w-[150px] sm:w-[160px]">
                  <Icon size={22} strokeWidth={1.75} className="text-action" />
                  <h3 className="mt-4 text-sm font-bold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-secondary">
                    {item.description}
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
