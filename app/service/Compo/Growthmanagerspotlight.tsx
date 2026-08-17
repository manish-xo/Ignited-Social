"use client";

import React from "react";
import { Quote, Check } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";

const responsibilities = [
  "Reviews your account",
  "Monitors growth",
  "Refines targeting",
  "Reviews performance",
  "Shares recommendations",
  "Helps plan next moves",
];

export default function GrowthManagerSpotlight() {
  return (
    <section className="bg-subtle-bg px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <CornerFrame className="mx-auto inline-flex bg-action-tint-bg">
          <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
            06 · Human Support
          </p>
        </CornerFrame>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_2fr] lg:items-center lg:gap-14">
          {/* LEFT — the person */}
          <div className="flex flex-col items-start">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-ink">
              {/* swap for a real photo: <img src="..." className="h-full w-full object-cover" /> */}
              <div className="flex h-full w-full items-center justify-center font-heading text-2xl font-bold text-white">
                SM
              </div>
            </div>

            <h3 className="mt-5 font-heading text-xl font-bold text-ink">
              Sarah Mitchell
            </h3>
            <p className="text-sm text-muted">Growth Manager</p>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              What Sarah does
            </p>
            <ul className="mt-3 space-y-2.5">
              {responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-secondary"
                >
                  <Check size={14} className="shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — the quote, editorial-style */}
          <div className="relative rounded-3xl bg-action-tint-bg p-8 sm:p-12">
            <Quote size={40} className="text-action/25" />
            <blockquote className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
              "Your engagement has improved this month. We're seeing stronger
              response from lifestyle audiences, so we're going to keep building
              in that direction."
            </blockquote>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-action/15 pt-6">
              <p className="text-xs text-secondary">
                Real questions. Real feedback.
                <br />
                Real people behind your growth.
              </p>
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((letter) => (
                  <div
                    key={letter}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-action-tint-bg bg-ink text-[10px] font-semibold text-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
