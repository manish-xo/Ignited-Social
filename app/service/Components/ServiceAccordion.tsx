"use client";

import { useId, useState, type ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import DotPattern from "@/components/ui/DotPattern";

// Bullet points inside an open panel: small white tiles with a check.
function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
      {items.map((point) => (
        <li
          key={point}
          className="flex items-start gap-2.5 rounded-xl border border-action/15 bg-white px-3 py-2.5 text-[13px] font-medium leading-snug text-ink"
        >
          <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-action text-white">
            <Check size={10} strokeWidth={3.5} aria-hidden />
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

// Closing "who does what" line, set apart from the paragraphs above it.
function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 border-t border-dashed border-action/25 pt-4 text-[13px] font-medium text-ink">
      {children}
    </p>
  );
}

interface ServiceItem {
  eyebrow: string;
  title: string;
  description: string;
  toggleLabel: string;
  answer: ReactNode;
}

const ITEMS: ServiceItem[] = [
  {
    eyebrow: "1. Audience growth • Done for you",
    title: "We help the right people discover you.",
    description:
      "We find people who are most likely to care about your work. Handle the daily outreach. And this directly brings new interested people to your profile.",
    toggleLabel: "How we find your audience +",
    answer: (
      <>
        <p>
          Your niche, location, language and the accounts your ideal audience
          already follows give us a starting point. We continuously refine as we
          learn what works for your account.
        </p>
        <Points
          items={[
            "Target by location, language, gender and relevant accounts.",
            "Set exclusions for people you don't want us to approach.",
            "Improve your profile so more visitors have a reason to follow.",
          ]}
        />
      </>
    ),
  },
  {
    eyebrow: "2. Content • Done with you",
    title: "We help you create content that earns their trust.",
    description:
      "Every niche, every audience is different. We study & share practical suggestions for what to say, how to present it and what to try next. Our advice fits the time and resources you have.",
    toggleLabel: "See what the content help includes +",
    answer: (
      <>
        <p>
          <strong>Grow</strong> gives you a tailored DIY content plan.{" "}
          <strong>Scale</strong> adds weekly reviews and deeper strategy on top.
        </p>
        <p className="mt-3">
          We study your niche, what your audience watches. Then look at your
          posts and what the analytics tell us. Only after that we go to the
          drawing board to brainstorm topics, hooks, formats and a mix of posts
          that will
        </p>
        <Points
          items={[
            "Attract the right people.",
            "Earn their trust.",
            "Build your authority",
            "And make your offer clear.",
          ]}
        />

        <Note>
          You stay in charge, of course. And you continue to create and publish.
          (Scriptwriting & Editing services – Coming Soon.)
        </Note>
      </>
    ),
  },
  {
    eyebrow: "3. Business · With you on Scale",
    title: "We help you enhance your follower→customer journey.",
    description:
      "To make it easier for interested followers to enquire, book or buy. We review your offer, landing page & conversion sequence. All the steps someone takes from visiting your profile to becoming your customer. And help you decide what to change.",
    toggleLabel: "What we look at +",
    answer: (
      <>
        <p>
          Does your bio make it clear what you offer and who it’s for? Do your
          posts help someone understand why they might want it? Is the next step
          easy to find?
        </p>
        <p className="mt-3">
          Your manager looks for places where interested people could get stuck,
          then recommends changes—such as explaining your offer more clearly or
          making your booking link easier to find.
        </p>
        <Note>
          We recommend improvements; you put them into practice and handle the
          enquiries.
        </Note>
      </>
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
    <div className="">
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
            <h3 className="mt-2 text-2xl font-bold leading-[1.95rem] -tracking-[0.05em] text-ink sm:text-[1.7rem]">
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
                  className={`pt-4 text-sm leading-relaxed text-ink/75 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0"
                  }`}
                >
                  {/* dashed action border + the dot grid from the pricing
                      cards, fading out from the top-right corner */}
                  <div className="relative overflow-hidden rounded-2xl border border-dashed border-action/40 bg-action-tint-bg/60 p-5 sm:p-6 [&_strong]:font-semibold [&_strong]:text-ink">
                    <DotPattern className="fill-action/15" />
                    <div className="relative">{item.answer}</div>
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
