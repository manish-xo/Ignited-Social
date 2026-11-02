"use client";

import { useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import { useLenis } from "@/components/providers/lenis-provider";
import { AUDIENCES, accountsFor } from "../data";
import AudienceTabs, { PANEL_ID, tabId } from "./AudienceTabs";
import AudienceStory from "./AudienceStory";
import GrowthResults from "./GrowthResults";
import CaseDialog, { type DialogView } from "./CaseDialog";

/**
 * Sections 5 + 6 as one experience: the sticky audience tabs drive both the
 * customer story and the six growth results below it.
 */
export default function AudienceExperience() {
  const [selected, setSelected] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [dialog, setDialog] = useState<DialogView | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const audience = AUDIENCES[selected];
  const accounts = accountsFor(audience.id);
  const featured = accounts[0];

  const select = (i: number) => {
    if (i === selected) return;
    setSelected(i);
    setAnnouncement(
      `${AUDIENCES[i].label} selected. Story and six growth results updated.`,
    );
  };

  const scrollToResults = () => {
    const el = resultsRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Leave room for the fixed header + sticky tab bar.
    if (lenis) lenis.scrollTo(el, { offset: -150, immediate: reduce });
    else
      el.scrollIntoView({
        behavior: reduce ? "instant" : "smooth",
        block: "start",
      });
  };

  return (
    <MotionConfig reducedMotion="user">
      <AudienceTabs selected={selected} onSelect={select} />

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={tabId(audience.id)}
        tabIndex={0}
        className="outline-none"
      >
        <section
          aria-label="A story for your kind of work"
          className="mx-auto max-w-6xl px-6 pb-14 pt-14 sm:pt-20 lg:min-h-[640px]"
        >
          <AudienceStory
            audience={audience}
            index={selected}
            featured={featured}
            onExploreResults={scrollToResults}
            onOpenStory={(username) => setDialog({ kind: "case", username })}
          />
        </section>

        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 pb-10 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          <p className="text-center">
            Your kind of work.{" "}
            <span className="text-action">
              Now, a closer look at the growth.
            </span>{" "}
            ↓
          </p>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GrowthResults
          ref={resultsRef}
          audience={audience}
          accounts={accounts}
          onOpenCase={(username) => setDialog({ kind: "case", username })}
          onOpenCollection={() =>
            setDialog({ kind: "collection", category: audience.id })
          }
        />
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <CaseDialog view={dialog} onChange={setDialog} />
    </MotionConfig>
  );
}
