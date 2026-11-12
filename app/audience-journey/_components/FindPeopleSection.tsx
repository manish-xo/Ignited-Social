"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { DEFAULT_NICHE, NICHES } from "../data";
import JourneyStage from "./JourneyStage";

export default function FindPeopleSection() {
  const [selected, setSelected] = useState(DEFAULT_NICHE);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const niche = NICHES[selected];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = NICHES.length - 1;
    const next =
      e.key === "ArrowRight"
        ? selected === last
          ? 0
          : selected + 1
        : e.key === "ArrowLeft"
          ? selected === 0
            ? last
            : selected - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      aria-labelledby="find-people-title"
      className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40"
    >
      <header className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              Who you want to reach
            </p>
          </CornerFrame>
        </div>
        <Heading
          as="h1"
          gradient={false}
          id="find-people-title"
          className="mt-5 pb-1 text-center font-heading-condensed text-4xl font-[600] leading-[0.95] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Let’s find the people
          <br />
          your work <span className="text-action">is for.</span>
        </Heading>
        <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-relaxed text-secondary sm:text-base">
          In your city or across the world. Your Brand Manager starts with what
          you do, who it’s for and where you want to grow.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Your type of work"
        onKeyDown={onKeyDown}
        className="mt-9 flex flex-wrap justify-center gap-2"
      >
        {NICHES.map((n, i) => {
          const active = i === selected;
          return (
            <button
              key={n.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`niche-tab-${n.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="niche-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                "rounded-full cursor-pointer border px-4 py-2.5 text-[13px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                active
                  ? "border-action bg-action text-white"
                  : "border-border text-secondary hover:border-action/40 hover:bg-action-tint-bg hover:text-ink",
              )}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <div
        id="niche-panel"
        role="tabpanel"
        aria-labelledby={`niche-tab-${niche.id}`}
        className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-action">
            {niche.label}
          </p>
          <h2 className="mt-4 text-3xl font-[600] leading-[1] -tracking-[0.05em] text-ink md:text-4xl">
            {niche.headline}
          </h2>
          <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-secondary sm:text-base">
            {niche.body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {niche.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                <Check
                  size={16}
                  strokeWidth={2.4}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-action"
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <JourneyStage niche={niche} />
      </div>
    </section>
  );
}
