"use client";

import React from "react";
import { Leaf, UserCheck, BarChart3, ArrowRight } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import FollowerGrowthChart from "@/components/dashboard/FollowerGrowthChart";
import ProHeader from "@/components/layout/ProHeader/ProHeader";

const trustPoints = [
  { icon: Leaf, label: "Organic growth" },
  { icon: UserCheck, label: "Human-led strategy" },
  { icon: BarChart3, label: "Clear reporting" },
];

export default function ServicesHero() {
  return (
    <section className="bg-canvas px-6 pb-16 pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* LEFT — copy */}
        {/* <div>
          <CornerFrame className="inline-flex bg-action-tint-bg">
            <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
              How we grow
            </p>
          </CornerFrame>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Growth, built around your account.
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-secondary">
            We find the right audience, refine your strategy, and build
            consistent organic growth around what makes your account worth
            following.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              Start Growing <ArrowRight size={15} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-subtle-bg"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            {trustPoints.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs font-medium text-secondary"
              >
                <Icon size={14} className="text-success" />
                {label}
              </span>
            ))}
          </div>
        </div> */}
        <div className="mx-auto pt-20">
          <div className="eyebrow mb-5">
            <CornerFrame className="bg-action-tint-bg">
              <p className="font-mono uppercase text-[0.6em] sm:text-xs tracking-widest text-action">
                What we do
              </p>
            </CornerFrame>
          </div>

          <div className="heading font-heading text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] -tracking-[0.04em]">
            <Heading className="text-left">Growth, built </Heading>
            <Heading>around your account. </Heading>
          </div>

          <div className="subHeading">
            {/* <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] tracking-normal text-ink/60 sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1rem]">
              One service, built from the ground up — targeting, strategy,
              reporting, and a real person behind every account. No bots, no
              guesswork.
            </p> */}
            <p className="mt-4 max-w-md text-base leading-relaxed text-secondary">
              We find the right audience, refine your strategy, and build
              consistent organic growth around what makes your account worth
              following.
            </p>
          </div>
        </div>

        {/* RIGHT — dashboard preview */}
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.6fr]">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-muted">Followers</p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
              12,480
            </p>
            <p className="mt-1 text-xs font-semibold text-success-ink">
              +6.2%{" "}
              <span className="font-normal text-muted">vs last 7 days</span>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted">Follower Growth</p>
              <div className="flex gap-1 rounded-md bg-subtle-bg p-0.5">
                <span className="rounded px-2 py-0.5 text-[10px] font-semibold text-muted">
                  7D
                </span>
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-action shadow-sm">
                  30D
                </span>
                <span className="rounded px-2 py-0.5 text-[10px] font-semibold text-muted">
                  90D
                </span>
              </div>
            </div>
            <svg viewBox="0 0 200 60" className="mt-3 h-14 w-full">
              <polyline
                points="0,45 20,42 40,38 60,40 80,32 100,30 120,24 140,20 160,15 180,10 200,6"
                fill="none"
                stroke="var(--color-action)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-[11px] text-muted">Engagement</p>
            <p className="mt-0.5 font-heading text-base font-bold text-ink">
              4.8%
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-[11px] text-muted">New Followers</p>
            <p className="mt-0.5 font-heading text-base font-bold text-ink">
              +312
            </p>
          </div>
        </div> */}

        <div>
          <FollowerGrowthChart compact />
        </div>
      </div>
    </section>
  );
}
