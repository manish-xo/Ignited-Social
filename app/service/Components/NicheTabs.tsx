"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clapperboard,
  Megaphone,
  Store,
  type LucideIcon,
} from "lucide-react";

interface Niche {
  label: string;
  icon: LucideIcon;
  image: string;
  imagePosition?: string; // object-position for the photo
  outcomes: [string, string, string];
  description: string;
  linkLabel: string;
  href: string;
}

const NICHES: Niche[] = [
  {
    label: "Content creators",
    icon: Clapperboard,
    image: "/stock/content-creator.png",
    imagePosition: "30% center",
    outcomes: ["Engaged followers", "Higher reach per post", "Brand-deal ready"],
    description:
      "Grow an audience that actually watches. We reach people who already follow creators like you, and help your content earn the follow.",
    linkLabel: "More about creators",
    href: "/price",
  },
  {
    label: "Freelancers & consultants",
    icon: BriefcaseBusiness,
    image: "/stock/freelancer.png",
    imagePosition: "65% center",
    outcomes: [
      "High-paying clients",
      "Consistent lead flow",
      "B2B authority building",
    ],
    description:
      "Turn your portfolio into a client magnet. We target the decision-makers who need your expertise and initiate warm outreach.",
    linkLabel: "More about freelancers",
    href: "/price",
  },
  {
    label: "Small & local businesses",
    icon: Store,
    image: "/stock/small-business.png",
    imagePosition: "45% center",
    outcomes: ["Local customers", "More bookings & visits", "Neighbourhood reach"],
    description:
      "Get found by the people nearby. We target your area and the accounts local customers already follow, then help turn profile visits into real visits.",
    linkLabel: "More about local businesses",
    href: "/price",
  },
  {
    label: "Marketing agencies",
    icon: Megaphone,
    image: "/stock/market-agency.png",
    imagePosition: "60% center",
    outcomes: [
      "Growth for client accounts",
      "Hands-off daily outreach",
      "Clear weekly reporting",
    ],
    description:
      "Hand off the daily growth work for your client accounts. Each one gets a Brand Manager focused on its audience, so your team can focus on strategy.",
    linkLabel: "More about agencies",
    href: "/price",
  },
];

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * "Which one are you?" — pick a niche on the right, the photo card on the left
 * cross-fades and its outcomes + pitch animate in (GSAP).
 */
export default function NicheTabs() {
  const [active, setActive] = useState(1); // Freelancers open first, as designed
  const contentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRender = useRef(true);

  // Bring the new outcome pills + text in one after another.
  useIsoLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const content = contentRef.current;
    if (!content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { autoAlpha: 0, y: 14, filter: "blur(6px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          clearProps: "filter,transform,visibility,opacity",
        },
      );
    }, content);
    return () => ctx.revert();
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = NICHES.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const niche = NICHES[active];

  return (
    <div className="mt-14 grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-12">
      {/* ── photo card ──────────────────────────────────────────── */}
      <div
        id="niche-panel"
        role="tabpanel"
        aria-labelledby={`niche-tab-${active}`}
        className="relative order-2 aspect-[4/5] overflow-hidden rounded-[28px] bg-ink shadow-[0_30px_60px_-30px_rgba(34,31,27,0.55)] md:order-1"
      >
        {/* all photos stay mounted so switching is instant; active one fades in */}
        {NICHES.map((n, i) => (
          <Image
            key={n.image}
            src={n.image}
            alt=""
            fill
            sizes="(min-width: 768px) 460px, 100vw"
            priority={i === active}
            style={{ objectPosition: n.imagePosition ?? "center" }}
            className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            }`}
          />
        ))}

        {/* brand tint + legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-action/10" />

        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6"
        >
          {/* outcomes */}
          <ul className="flex flex-col items-start gap-1.5">
            {niche.outcomes.map((outcome) => (
              <li
                key={outcome}
                data-reveal
                className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 py-1 pl-1.5 pr-3 font-mono text-[10px] uppercase tracking-[0.08em] text-white backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-action-tint-bg shadow-[0_0_0_3px_rgba(90,76,224,0.45)]" />
                {outcome}
              </li>
            ))}
          </ul>

          {/* pitch */}
          <div>
            <span
              data-reveal
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md"
            >
              <niche.icon size={13} /> For {niche.label.toLowerCase()}
            </span>
            <p
              data-reveal
              className="mt-3 text-base leading-snug text-white sm:text-lg"
            >
              {niche.description}
            </p>
            <Link
              data-reveal
              href={niche.href}
              className="group mt-4 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-medium text-white transition-colors hover:border-white"
            >
              {niche.linkLabel}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── niche picker ────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Who it's for"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="order-1 grid grid-cols-1 gap-3 sm:grid-cols-2 md:order-2 md:grid-cols-1"
      >
        {NICHES.map((n, i) => {
          const isActive = i === active;
          return (
            <button
              key={n.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`niche-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="niche-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex min-h-[64px] items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                isActive
                  ? "border-action/50 bg-action-tint-bg shadow-[0_12px_28px_-16px_rgba(90,76,224,0.6)]"
                  : "border-border bg-white shadow-[0_8px_20px_-16px_rgba(34,31,27,0.35)] hover:-translate-y-0.5 hover:border-action/30"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                  isActive
                    ? "border-action bg-action text-white"
                    : "border-border bg-subtle-bg text-ink/70 group-hover:border-action/30 group-hover:text-action"
                }`}
              >
                <n.icon size={18} strokeWidth={1.75} />
              </span>
              <span
                className={`flex-1 text-sm font-semibold uppercase tracking-[0.04em] transition-colors ${
                  isActive ? "text-action" : "text-ink"
                }`}
              >
                {n.label}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-action text-white"
                    : "bg-subtle-bg text-ink/40 group-hover:text-action"
                }`}
              >
                <ArrowRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
