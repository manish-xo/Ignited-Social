"use client";

import React from "react";
import {
  UserCheck,
  Compass,
  Leaf,
  FileEdit,
  ShieldCheck,
  BarChart3,
  Check,
  ArrowRight,
} from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

interface ServiceCard {
  number: string;
  icon: React.ElementType;
  title: string;
  points: string[];
  className: string;
}

const services: ServiceCard[] = [
  {
    number: "01",
    icon: UserCheck,
    title: "Audience Targeting",
    points: [
      "Interest targeting",
      "Location targeting",
      "Behavior analysis",
      "Niche targeting",
    ],
    className: "sm:col-span-2 md:col-span-1 md:row-span-2",
  },
  {
    number: "02",
    icon: Compass,
    title: "Growth Strategy",
    points: ["Account analysis", "Growth planning", "Strategy refinement"],
    className: "md:col-span-2 md:row-span-1",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Organic Growth",
    points: [
      "Relevant audiences",
      "Sustainable growth",
      "Quality over vanity metrics",
    ],
    className: "md:col-span-1 md:row-span-1",
  },
  {
    number: "04",
    icon: FileEdit,
    title: "Content Guidance",
    points: ["Content review", "Topic direction", "Performance feedback"],
    className: "md:col-span-1 md:row-span-1",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Account Management",
    points: [
      "Growth manager",
      "Regular account reviews",
      "Direct communication",
    ],
    className: "md:col-span-2 md:row-span-1",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Reporting & Insights",
    points: ["Follower growth", "Audience insights", "Growth milestones"],
    className: "sm:col-span-2 md:col-span-1",
  },
];

export default function EverythingIncluded() {
  return (
    <section className="bg-subtle-bg px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:items-start lg:gap-12">
          {/* LEFT — intro, sticky on desktop so it stays visible while scanning the grid */}
          <div className="lg:sticky lg:top-28">
            <CornerFrame className="inline-flex bg-action-tint-bg">
              <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
                04 · Our Service
              </p>
            </CornerFrame>

            {/* <h2 className="mt-5 max-w-xs font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              Everything your growth needs.
            </h2> */}

            <div className="-space-y-1.5 mt-6">
              <Heading as="h2">Everything your</Heading>
              <Heading as="h2">growth needs.</Heading>
            </div>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-secondary">
              We don&apos;t leave anything to ongoing optimization — every part
              of the process works together to move your account forward.
            </p>

            <a
              href="#pricing"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              Start Growing <ArrowRight size={15} />
            </a>
          </div>

          {/* RIGHT — bento grid, asymmetric sizing */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(170px,auto)]">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.number}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-action/30 hover:shadow-md ${service.className}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.1em] text-muted">
                        {service.number}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-subtle-bg transition-colors duration-200 group-hover:bg-action">
                        <Icon
                          size={16}
                          className="text-muted transition-colors duration-200 group-hover:text-white"
                        />
                      </div>
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-bold text-ink">
                      {service.title}
                    </h3>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs text-secondary"
                      >
                        <Check
                          size={13}
                          className="mt-0.5 shrink-0 text-action"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
