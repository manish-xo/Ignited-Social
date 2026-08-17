"use client";

import React from "react";
import { Star } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "2,400+", label: "Accounts managed" },
  { value: "51M+", label: "Followers grown" },
  { value: "140+", label: "Countries reached" },
  { value: "4.8/5", label: "Customer rating" },
  { value: "20K+", label: "Active accounts" },
];

const testimonials = [
  {
    name: "Jessica R.",
    role: "Lifestyle Creator",
    quote:
      "Finally seeing real growth from people who actually care about content. Worth every penny.",
  },
  {
    name: "Daniel K.",
    role: "Business Owner",
    quote:
      "The team knows what they're doing. My engagement and followers have both improved.",
  },
];

export default function ProofNumbers() {
  return (
    <section className="bg-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-lg text-center">
          <CornerFrame className="mx-auto inline-flex bg-action-tint-bg">
            <p className="px-1 font-mono text-xs uppercase tracking-[0.1em] text-action">
              08 · Proof
            </p>
          </CornerFrame>

          <div className="-space-y-1 mt-6">
            <Heading as="h2">The numbers behind the</Heading>
            <Heading as="h2">process.</Heading>
          </div>

          <p className="mx-auto mt-2 text-sm leading-relaxed text-secondary">
            Real growth is more than a number on a screen. We care about the
            people you reach, the impressions you make, and the consistency you
            build over time.
          </p>
        </div>

        {/* big stat typography — no cards, no boxes */}
        <div className="mt-16 flex flex-wrap items-baseline justify-center gap-x-14 gap-y-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* quiet testimonial snippets underneath — plain text, no cards */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 border-t border-hairline pt-10 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name}>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-action text-action" />
                ))}
              </div>
              <p className="mt-3 text-sm italic leading-relaxed text-secondary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-ink">
                {t.name}{" "}
                <span className="font-normal text-muted">· {t.role}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
