// app/price/_components/CTA.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import DarkGradientSection from "@/components/ui/DarkGradientSection";

export default function CTA() {
  return (
    <DarkGradientSection className="px-6 py-24 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-action-on-dark">Ready when you are</p>
        <h2 className="heading text-center flex flex-col items-center justify-center text-canvas font-heading text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] tracking-tighter">
          Your next 500 followers <br className="hidden sm:block" />
          start this week
        </h2>
        <p className="mt-5 text-base text-action-on-dark max-w-lg mx-auto">
          No contracts, no risk — just real growth, backed by a 30-day
          money-back guarantee.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
          >
            Get started
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to us first
          </a>
        </div>

        <p className="mt-6 text-sm text-action-on-dark/70">
          Cancel anytime · No credit card required to inquire
        </p>
      </div>
    </DarkGradientSection>
  );
}
