"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Clock3 } from "lucide-react";
import DarkGradientSection from "@/components/ui/DarkGradientSection";

// Hand-drawn doodles around the heading. Kept few, thin and faint so they add
// play without clutter. Each draws itself in, then sways gently.
const DOODLES: {
  name: string;
  viewBox: string;
  paths: string[];
  position: string;
  size: string;
  rotate: number;
  mobile?: boolean; // also show on phones
}[] = [
  {
    name: "sparkle",
    viewBox: "0 0 40 40",
    paths: [
      "M20 3 C21 14 26 19 37 20 C26 21 21 26 20 37 C19 26 14 21 3 20 C14 19 19 14 20 3 Z",
    ],
    position: "left-[8%] top-[16%]",
    size: "w-9",
    rotate: -8,
    mobile: true,
  },
  {
    name: "squiggle",
    viewBox: "0 0 90 30",
    paths: ["M3 18 C12 4 20 4 26 15 S40 28 47 15 S61 2 68 14 S82 26 87 12"],
    position: "right-[9%] top-[20%]",
    size: "w-20",
    rotate: 6,
  },
  {
    name: "loop-arrow",
    viewBox: "0 0 80 70",
    paths: [
      "M6 10 C30 4 52 14 46 30 C41 44 22 38 30 26 C38 15 64 28 70 56",
      "M60 50 L70 57 L73 45",
    ],
    position: "left-[12%] bottom-[18%]",
    size: "w-16",
    rotate: 0,
  },
  {
    name: "plus",
    viewBox: "0 0 24 24",
    paths: ["M12 3 L12 21", "M3 12 L21 12"],
    position: "left-[24%] top-[8%]",
    size: "w-4",
    rotate: 12,
  },
  {
    name: "circle",
    viewBox: "0 0 30 30",
    paths: [
      "M15 4 C23 4 26 10 26 15 C26 22 20 26 15 26 C8 26 4 21 4 15 C4 9 9 5 16 5",
    ],
    position: "right-[24%] bottom-[10%]",
    size: "w-5",
    rotate: 0,
  },
];

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-cta-reveal]", { autoAlpha: 0, y: 28 });

      // hide every doodle stroke, ready to be drawn in
      section
        .querySelectorAll<SVGPathElement>("[data-doodle] path")
        .forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        ctx.add(() => {
          gsap
            .timeline()
            .to("[data-cta-reveal]", {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.1,
              clearProps: "transform",
            })
            // doodles draw themselves in, one after another
            .to(
              "[data-doodle] path",
              {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: "power2.inOut",
                stagger: 0.12,
              },
              0.35,
            );

          // then each one sways on its own gentle loop
          gsap.utils.toArray<HTMLElement>("[data-doodle]").forEach((el, i) => {
            gsap.to(el, {
              y: i % 2 ? 6 : -6,
              rotation: `+=${i % 2 ? 4 : -4}`,
              duration: 3 + (i % 3) * 0.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.2 + i * 0.15,
            });
          });
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <DarkGradientSection
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#3b3180]"
    >
      {/* doodles */}
      {DOODLES.map((d) => (
        <svg
          key={d.name}
          data-doodle
          aria-hidden="true"
          viewBox={d.viewBox}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ rotate: `${d.rotate}deg` }}
          className={`pointer-events-none absolute z-0 h-auto text-white/45 ${d.size} ${d.position} ${
            d.mobile ? "" : "hidden md:block"
          }`}
        >
          {d.paths.map((path) => (
            <path key={path} d={path} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      ))}

      {/* content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <h2
          data-cta-reveal
          className="font-heading-condensed text-4xl font-bold leading-[0.95] -tracking-[0.04em] text-white sm:text-5xl md:text-6xl"
        >
          Your next followers are already out there. Let&apos;s help them find
          you.
        </h2>
        <p
          data-cta-reveal
          className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base"
        >
          Seven days free. Your own Brand Manager. An account audit you keep
          either way.
        </p>

        <div
          data-cta-reveal
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="#plans"
            className="group inline-flex items-center gap-3 rounded-full bg-canvas py-1.5 pl-6 pr-1.5 text-sm font-semibold text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.55)]"
          >
            Find my plan
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-action text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            href="/signup?plan=grow"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
          >
            <Clock3 size={15} className="text-white/80" />
            About ten minutes to get started
          </Link>
        </div>
      </div>
    </DarkGradientSection>
  );
}
