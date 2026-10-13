"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Quote } from "lucide-react";
import DotPattern from "@/components/ui/DotPattern";

// ─── Content ────────────────────────────────────────────────────────────────
// Each tab: one featured story (left) with a proof image (right), plus two
// smaller stories below. Add `image: "/stock/your-file.jpg"` to show a real
// screenshot instead of the placeholder box.

interface Story {
  title: string;
  quote: string;
  date: string;
}

interface RecordTab {
  label: string;
  eyebrow: string;
  featured: Story;
  proof: {
    image?: string;
    placeholderTitle: string;
    placeholderText: string;
    caption: string;
  };
  stories: [Story, Story];
}

const TABS: RecordTab[] = [
  {
    label: "Business results",
    eyebrow: "Business results • First growth",
    featured: {
      title: "“I’m already seeing a return.”",
      quote:
        "I’m really happy with my first month of growth. I’ve picked business, and all the referrals come from Instagram. I’m already seeing a return on my investment.",
      date: "31 July 2024",
    },
    proof: {
      placeholderTitle: "The customer’s message",
      placeholderText: "The conversation this result comes from.",
      caption: "Business and Instagram referrals reported by this customer",
    },
    stories: [
      {
        title: "New clients",
        quote:
          "I’ve got clients from the Instagram growth. Thank you! I hope we can keep working together.",
        date: "7 September 2024",
      },
      {
        title: "More website traffic",
        quote:
          "Our following has grown dramatically, we’re getting a lot more traffic to our. You’re doing a great job with account.",
        date: "13 January 2025",
      },
    ],
  },
  {
    label: "Follower growth",
    eyebrow: "Follower growth • 20 days",
    featured: {
      title: "150 new followers in 20 days.",
      quote:
        "In 20 days. I’ve gained 150 new followers. I’m so so happy with my numbers.",
      date: "14 June 2024",
    },
    proof: {
      placeholderTitle: "Follower insights",
      placeholderText: "The account’s follower growth for the period.",
      caption: "150 new followers, as reported in the customer’s message.",
    },
    stories: [
      {
        title: "From 7 to nearly 200",
        quote:
          "You took my account from 7 followers to nearly 200. I’m very happy with the results so far. The hardest part is getting that first following.",
        date: "12 January 2024",
      },
      {
        title: "A 10,000-follower milestone",
        quote:
          "I’ve reached my goal of growing my personal brand to 10,000 followers, with a real, targeted audience. Thank you for the amazing work.",
        date: "15 May 2025",
      },
    ],
  },
  {
    label: "The right audience",
    eyebrow: "Audience quality • Shared interests",
    featured: {
      title: "People who care about what to do.",
      quote:
        "I’d much rather have followers who care about hosting, entertaining and home decor. You’re doing a good job of finding the right people, and I really appreciate it.",
      date: "11 April 2026",
    },
    proof: {
      placeholderTitle: "Instagram follower growth",
      placeholderText: "This account’s insights across the same 20 days.",
      caption: "A customer describing the relevance of their new audience.",
    },
    stories: [
      {
        title: "The quality of the connections",
        quote:
          "I’m very happy with the results, and amazed by the quality of the accounts we’ve connected with.",
        date: "8 October 2023",
      },
      {
        title: "The people they hoped to reach",
        quote:
          "It looks like we’re getting exactly the kind of followers we were hoping for. Good work so far!",
        date: "25 April 2024",
      },
    ],
  },
  {
    label: "Content & reach",
    eyebrow: "Content & reach • One post",
    featured: {
      title: "1.2K+ views within an hour.",
      quote:
        "Thanks for the advice I made a few tweaks to my latest post, and it already had over 1.2k views within an hour. Wow!",
      date: "5 March 2024",
    },
    proof: {
      placeholderTitle: "The post and its insights",
      placeholderText: "The matching post, view count and time window.",
      caption:
        "The customer reported these views after making changes to their post.",
    },
    stories: [
      {
        title: "Help with the part that feels hard",
        quote:
          "We’ve just hit 2,000 followers. Thanks for reviewing what we post, too, I have to admit, posting daily doesn’t come naturally to me!",
        date: "21 February 2024",
      },
      {
        title: "A stronger first impression",
        quote:
          "I’ve made the changes you recommended to our Instagram bio. Your guidance is incredibly valuable, and I appreciate your dedication to helping us grow.",
        date: "30 December 2023",
      },
    ],
  },
  {
    label: "Personal support",
    eyebrow: "Personal support • Useful feedback",
    featured: {
      title: "“I’m taking notes already.”",
      quote:
        "Thanks you for taking such a deep look at my work. You’ve spotted what’s working and what could be better. I’m taking notes already. I’m very happy working with you.",
      date: "8 September 2023",
    },
    proof: {
      placeholderTitle: "A real review from the Brand Manager",
      placeholderText: "Advice and the customer’s reply shown together.",
      caption: "Specific feedback the customer could put to work.",
    },
    stories: [
      {
        title: "Happy enough to add two more accounts",
        quote:
          "We’re happy with the results, so we’ve added two more accounts!",
        date: "28 June 2023",
      },
      {
        title: "Trust in the people doing the work",
        quote:
          "I love the work you do. It’s clear you do it with integrity, and that means a great deal to me.",
        date: "13 April 2024",
      },
    ],
  },
];

// ─── Animation settings ─────────────────────────────────────────────────────
const INDICATOR_EASE = "elastic.out(1, 0.6)"; // springy slide of the active pill
const INDICATOR_DURATION = 0.9;
const OUT_DURATION = 0.25; // old content fades away…
const IN_DURATION = 0.6; // …new content rises in
const IN_EASE = "power3.out";

// useLayoutEffect warns during SSR; this is the usual safe swap.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Footer({ date }: { date: string }) {
  return (
    <p className="mt-auto pt-8 text-xs text-muted">
      Customer message <span className="mx-1">•</span> {date}
    </p>
  );
}

export default function RecordTabs() {
  const [active, setActive] = useState(0); // highlighted tab (moves instantly)
  const [shown, setShown] = useState(0); // content on screen (swaps after fade)

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const heightFrom = useRef<number | null>(null);
  const outTween = useRef<gsap.core.Timeline | null>(null);

  // ── sliding pill ─────────────────────────────────────────────────────────
  const moveIndicator = (index: number, animate: boolean) => {
    const tab = tabRefs.current[index];
    const indicator = indicatorRef.current;
    if (!tab || !indicator) return;
    const props = { x: tab.offsetLeft, width: tab.offsetWidth };
    if (!animate || prefersReducedMotion()) {
      gsap.set(indicator, props);
    } else {
      gsap.to(indicator, {
        ...props,
        duration: INDICATOR_DURATION,
        ease: INDICATOR_EASE,
        overwrite: true,
      });
    }
  };

  // Place the pill on first paint and keep it aligned when the bar resizes.
  useIsoLayoutEffect(() => {
    moveIndicator(active, false);
    const observer = new ResizeObserver(() => moveIndicator(active, false));
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── switching ────────────────────────────────────────────────────────────
  const select = (index: number) => {
    if (index === active) return;
    setActive(index);
    moveIndicator(index, true);

    // Keep the chosen tab visible when the bar scrolls sideways on phones.
    const tab = tabRefs.current[index];
    const scroller = scrollerRef.current;
    if (tab && scroller) {
      scroller.scrollTo({
        left: tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2,
        behavior: "smooth",
      });
    }

    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) {
      setShown(index);
      return;
    }

    // Fade the current stories out, then swap. Rapid clicks restart the
    // fade and land on the latest tab.
    outTween.current?.kill();
    heightFrom.current = panel.offsetHeight;
    gsap.set(panel, { height: panel.offsetHeight });
    outTween.current = gsap
      .timeline({ onComplete: () => setShown(index) })
      .to(panel.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0,
        y: -10,
        filter: "blur(4px)",
        duration: OUT_DURATION,
        ease: "power2.in",
        stagger: 0.03,
      });
  };

  // New stories are in the DOM: ease the box to its new height and bring the
  // pieces in one after another.
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || heightFrom.current === null) return;

    const from = heightFrom.current;
    heightFrom.current = null;
    gsap.set(panel, { height: "auto" });
    const to = panel.offsetHeight;

    gsap
      .timeline()
      .fromTo(
        panel,
        { height: from },
        {
          height: to,
          duration: 0.5,
          ease: "power3.inOut",
          clearProps: "height",
        },
      )
      .fromTo(
        panel.querySelectorAll("[data-reveal]"),
        { autoAlpha: 0, y: 24, filter: "blur(6px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: IN_DURATION,
          ease: IN_EASE,
          stagger: 0.07,
          clearProps: "filter,transform,visibility,opacity",
        },
        0.05,
      );
  }, [shown]);

  // Arrow keys move between tabs (standard tablist behaviour).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = TABS.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const tab = TABS[shown];

  return (
    <div className="mt-14">
      {/* ── tab bar ──────────────────────────────────────────────────── */}
      <div
        ref={scrollerRef}
        className="mx-auto max-w-3xl overflow-x-auto rounded-full bg-ink p-1.5 shadow-[0_12px_32px_-12px_rgba(34,31,27,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Customer results"
          onKeyDown={onKeyDown}
          className="relative flex min-w-max"
        >
          <span
            ref={indicatorRef}
            aria-hidden
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-b from-white to-[#d9d5cd] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-4px_rgba(0,0,0,0.5)]"
          />
          {TABS.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`record-tab-${i}`}
              aria-selected={active === i}
              aria-controls="record-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              className={`relative z-10 flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-medium transition-colors duration-300 sm:px-6 sm:text-sm ${
                active === i ? "text-ink" : "text-white/80 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── stories ──────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        id="record-panel"
        role="tabpanel"
        aria-labelledby={`record-tab-${shown}`}
        className="mt-12 overflow-hidden"
      >
        {/* featured */}
        {/* `isolate` + DotPattern at -z-10 keeps the dots behind the content
            without touching each child; `group` lets them tint on hover. */}
        <div className="group relative isolate grid gap-8 overflow-hidden rounded-3xl border border-dashed border-action/35 bg-canvas/60 p-6 transition-colors duration-500 hover:border-action/60 sm:p-8 md:grid-cols-[1fr_minmax(0,240px)] md:gap-10">
          <DotPattern className="-z-10" />
          <div className="flex flex-col">
            <p
              data-reveal
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-action shadow-[0_0_0_3px_rgba(90,76,224,0.15)]" />
              {tab.eyebrow}
            </p>
            <h3
              data-reveal
              className="mt-6 text-3xl font-bold leading-[1.05] -tracking-[0.05em] text-ink sm:text-4xl"
            >
              {tab.featured.title}
            </h3>
            <p
              data-reveal
              className="mt-4 text-lg leading-relaxed -tracking-[0.025em] text-secondary"
            >
              “{tab.featured.quote}”
            </p>
            <div data-reveal className="mt-auto">
              <Footer date={tab.featured.date} />
            </div>
          </div>

          <figure
            data-reveal
            className="mx-auto w-full max-w-[260px] md:max-w-none"
          >
            <div className="aspect-[9/10] overflow-hidden rounded-lg border border-dashed border-ink/25 bg-[#e8e6e1] shadow-[0_12px_28px_-16px_rgba(34,31,27,0.35)] transition-transform duration-500 ease-out group-hover:-rotate-1 group-hover:scale-[1.02]">
              {tab.proof.image ? (
                <Image
                  src={tab.proof.image}
                  alt={tab.proof.caption}
                  width={480}
                  height={540}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-ink/70">
                    Image space
                  </p>
                  <p className="mt-1 -tracking-[0.05em] text-lg font-bold leading-tight text-ink">
                    {tab.proof.placeholderTitle}
                  </p>
                  <p className="mt-1.5 text-[11px] text-ink/70">
                    {tab.proof.placeholderText}
                  </p>
                </div>
              )}
            </div>
            <figcaption className="mt-3 text-xs leading-snug text-ink">
              {tab.proof.caption}
            </figcaption>
          </figure>
        </div>

        {/* two smaller stories */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {tab.stories.map((story) => (
            <div
              key={story.title}
              data-reveal
              className="group relative isolate flex min-h-[200px] flex-col overflow-hidden rounded-3xl border border-dashed border-action/35 bg-canvas/60 p-6 transition-[border-color,box-shadow] duration-500 hover:border-action/60 hover:shadow-[0_18px_40px_-24px_rgba(90,76,224,0.45)] sm:p-7"
            >
              <DotPattern className="-z-10" />
              <Quote
                aria-hidden
                size={34}
                className="absolute right-5 top-5 -z-10 fill-action/10 text-transparent transition-colors duration-500 group-hover:fill-action/25"
              />
              <h4 className="pr-10 text-xl font-bold leading-tight -tracking-[0.05em] text-ink">
                {story.title}
              </h4>
              <p className="mt-2 leading-relaxed text-secondary">
                “{story.quote}”
              </p>
              <Footer date={story.date} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
