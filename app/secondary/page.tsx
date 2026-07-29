// app/price/_components/ComparisonBento.tsx
"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  Check,
  Target,
  UserCheck,
  ShieldCheck,
  BarChart3,
  FileText,
  Undo2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

gsap.registerPlugin(ScrollTrigger);

interface BentoCard {
  tag: string;
  title: string;
  description: string[];
  recommended?: boolean;
}

export interface Feature {
  tag: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const cards: BentoCard[] = [
  {
    tag: "IN-HOUSE TEAM",
    title: "Hiring In-House",
    description: [
      "High salary & hiring costs",
      "Time-consuming recruitment",
      "Employee turnover risks",
    ],
  },
  {
    tag: "FREELANCE AGENCY",
    title: "Hiring an Agency",
    description: [
      "Multiple clients, divided attention",
      "Generic growth strategies",
      "Slow communication",
    ],
  },
  {
    tag: "DEDICATED GROWTH MANAGER",
    title: "Your Dedicated GM",
    description: [
      "Personalized growth strategy",
      "Daily execution & optimization",
      "Transparent reporting",
      "Sustainable, real growth",
    ],
    recommended: true,
  },
  {
    tag: "GROWTH TOOLS",
    title: "Automation Tools",
    description: [
      "One-size-fits-all solutions",
      "No strategic guidance",
      "Tools don't replace expertise",
    ],
  },
  {
    tag: "PAID ADS",
    title: "Facebook Ads",
    description: [
      "Rising advertising costs",
      "Results stop when spending stops",
      "No long-term organic growth",
    ],
  },
];

export const features: Feature[] = [
  {
    tag: "TARGET",
    icon: Target,
    title: "Real, active followers",
    description:
      "Every new follower is someone likely to engage, buy, or convert — not a bot padding your count.",
  },
  {
    tag: "MANAGER",
    icon: UserCheck,
    title: "A dedicated growth manager",
    description:
      "You get strategy that adapts to your brand, not a generic playbook running on autopilot.",
  },
  {
    tag: "SAFETY",
    icon: ShieldCheck,
    title: "Safe, compliant growth",
    description:
      "Your account stays protected — no shadowbans, no risky automation, no surprises.",
  },
  {
    tag: "REPORT",
    icon: BarChart3,
    title: "Transparent reporting",
    description:
      "You always know exactly what you're paying for — no guesswork, no vague monthly PDFs.",
  },
  {
    tag: "STRATEGY",
    icon: FileText,
    title: "Content strategy support",
    description:
      "Growth doesn't stall because your content and your strategy are finally working together.",
  },
  {
    tag: "GUARANTEE",
    icon: Undo2,
    title: "Risk-free commitment",
    description:
      "Try it without the fear of getting locked into something that doesn't deliver.",
  },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

    rows.forEach((row, i) => {
      const isRecommended = row.dataset.recommended === "true";

      gsap.fromTo(
        row,
        {
          opacity: 0,
          x: isRecommended ? 0 : i % 2 === 0 ? -40 : 40,
          y: isRecommended ? 40 : 0,
          scale: isRecommended ? 0.92 : 1,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: isRecommended ? 0.9 : 0.7,
          ease: isRecommended ? "back.out(1.4)" : "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // connecting line draw
    const line = sectionRef.current?.querySelector(".ladder-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-subtle-bg w-full  mx-auto py-24 sm:py-32"
    >
      <div className="eyebrow flex items-center justify-center mb-3">
        <CornerFrame className="bg-action-tint-bg">
          <p className="font-mono uppercase text-xs">Weighing your options</p>
        </CornerFrame>
      </div>

      <Heading className="text-center">Comparison with other options</Heading>

      <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
        Four ways businesses try to grow — and the one that actually holds up.
      </p>

      {/* ladder layout */}
      <div className="relative mx-auto mt-20 max-w-3xl px-4 md:px-0">
        {/* connecting vertical line */}
        <div className="ladder-line absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />

        <div className="flex flex-col gap-6">
          {cards.map((card, i) => {
            const isRecommended = !!card.recommended;

            return (
              <div
                key={card.title}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                data-recommended={isRecommended}
                className={`relative z-10 mx-auto w-full ${
                  isRecommended ? "max-w-2xl" : "max-w-xl"
                }`}
              >
                {isRecommended ? (
                  // recommended — breaks the pattern, glowing highlight panel
                  <div className="relative rounded-3xl border-2 border-action bg-white p-8 shadow-[0_0_40px_-8px_rgba(90,76,224,0.35)]">
                    <span className="absolute -top-3 left-8 rounded-full bg-action px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                      RECOMMENDED
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-action">
                        {card.tag}
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-action">
                        <Check size={14} className="text-white" />
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading font-bold text-2xl text-ink">
                      {card.title}
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {card.description.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-ink/90"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-action" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // normal row — quiet, flat, minimal
                  <div className="flex items-center gap-4 rounded-xl border border-border bg-white/60 px-6 py-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/10">
                      <X size={12} className="text-danger" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-[0.1em] text-muted">
                          {card.tag}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-base text-ink">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-xs text-secondary">
                        {card.description.join(" · ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="conclusion mt-16 mx-auto flex items-center justify-center px-4">
        <div className="px-6 py-4 inline-flex flex-col justify-center items-center border border-secondary border-dashed rounded-md bg-canvas">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-[700] tracking-tight space-x-1">
            <span className="text-secondary">All the Expertise.</span>
            <span className="text-ink">None of the Overhead</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            One person, doing the job of a full team — strategist, executor, and
            marketer in one.
          </p>
        </div>
      </div>

      <div className="bento w-5xl mx-auto mt-20">
        <div className="grid grid-cols-3">
          <div className="box bg-sky-300 row-span-2 p-8">
            <h2>Growth Manager</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              quaerat at sit. Vel sint debitis nihil quod corporis repellendus,
              illo accusamus impedit, quidem officiis ex voluptate odit, modi
              adipisci labore.
            </p>
          </div>
          <div className="box bg-pink-300 row-span-1 col-span-2 p-8">
            Target
          </div>
          <div className="box bg-emerald-300 p-8">Safe</div>
          <div className="box bg-indigo-300 p-8">Result</div>
        </div>
      </div>
    </div>
  );
}
