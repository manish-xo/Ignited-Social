"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ServiceItem {
  eyebrow: string;
  title: string;
  description: string;
  toggleLabel: string;
  answer: ReactNode;
}

const ITEMS: ServiceItem[] = [
  {
    eyebrow: "1. Audience growth / Done for you",
    title: "We help the right people discover you.",
    description:
      "We find people already interested in work like yours, then follow and like to bring them to your profile.",
    toggleLabel: "How we choose who to approach",
    answer: (
      <>
        <p>
          Your niche, your location and the accounts your ideal audience already
          follows give us a starting point. We review the response and keep
          refining.
        </p>
        <ul className="mt-3 space-y-1.5">
          {[
            "Target by location, language, gender and relevant accounts.",
            "Set exclusions for people you don't want us to approach.",
            "Improve your profile so more visitors have a reason to follow.",
          ].map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-action" />
              {point}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    eyebrow: "2. Content / Done with you",
    title: "We help you create content that earns their trust.",
    description:
      "Know what to post, why it matters and what to improve. Get advice you can use with the time and skills you actually have.",
    toggleLabel: "What the content help includes",
    answer: (
      <>
        <p>
          Grow gives you basic content reviews and practical pointers. Scale
          adds a monthly content plan, weekly reviews and deeper strategy.
        </p>
        <p className="mt-3">
          We study your niche, what your audience watches and what your own
          posts tell us. Then we work on topics, hooks, formats and a mix of
          posts that attracts people, earns trust and makes your offer clear.
          You create and publish.
        </p>
      </>
    ),
  },
  {
    eyebrow: "3. Business / With you on Scale",
    title: "We help you improve the path from interest to business.",
    description:
      "Make it easier for someone who likes your work to enquire, book or buy. Your offer and the steps to a sale get a closer look.",
    toggleLabel: "Where we look for missed business",
    answer: (
      <p>
        Does your bio say what you do? Is the offer clear? Can someone find the
        booking link? On Scale, your Brand Manager reviews the path from profile
        visit to enquiry or purchase and recommends changes. You put them into
        practice and handle the customers.
      </p>
    ),
  },
];

/**
 * Three service blocks; each has a small toggle revealing more detail. One
 * open at a time. Opens/closes smoothly by animating grid-template-rows
 * (0fr → 1fr), which tracks the content's real height — no measuring.
 */
export default function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div
            key={item.title}
            className="border-b border-border py-7 first:pt-0 last:border-b-0"
          >
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
              {item.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-[1.95rem] -tracking-[0.07em] text-ink sm:text-[1.95rem]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-base">
              {item.description}
            </p>

            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`group mt-4 inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-3.5 text-xs font-semibold transition-colors duration-300 ${
                isOpen
                  ? "border-action/30 bg-action-tint-bg text-action"
                  : "border-border bg-white text-ink hover:border-action/30 hover:text-action"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "rotate-90 bg-action text-white"
                    : "bg-subtle-bg text-ink group-hover:bg-action-tint-bg group-hover:text-action"
                }`}
              >
                <ChevronRight size={12} strokeWidth={2.5} />
              </span>
              {item.toggleLabel}
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`pt-4 text-sm leading-relaxed text-secondary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-border/70 bg-white/70 p-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
