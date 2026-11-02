"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  MapPin,
  Package,
  PenTool,
  SquarePlay,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AUDIENCES, type AudienceId } from "../data";

export const AUDIENCE_ICONS: Record<AudienceId, LucideIcon> = {
  creatives: PenTool,
  coaches: GraduationCap,
  local: MapPin,
  creators: SquarePlay,
  products: Package,
};

export const tabId = (id: AudienceId) => `audience-tab-${id}`;
export const PANEL_ID = "audience-panel";

interface Props {
  selected: number;
  onSelect: (index: number) => void;
}

/** Sticky "Find your people" bar. One tab drives both the story and the results. */
export default function AudienceTabs({ selected, onSelect }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const tab = tabRefs.current[i];
    if (!tab) return;
    tab.focus({ preventScroll: true });
    // On phones the row scrolls sideways; keep the new tab in view.
    tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = AUDIENCES.length - 1;
    const next =
      e.key === "ArrowRight"
        ? selected === last ? 0 : selected + 1
        : e.key === "ArrowLeft"
          ? selected === 0 ? last : selected - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    onSelect(next);
    focusTab(next);
  };

  return (
    <div className="sticky top-[76px] z-40 px-3 sm:top-[84px]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 rounded-[22px] border border-border bg-canvas/85 p-1.5 shadow-[0_18px_40px_-28px_rgba(34,31,27,0.45)] backdrop-blur-xl">
        <span
          id="audience-tabs-label"
          className="hidden shrink-0 pl-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted lg:block"
        >
          Find your people
        </span>

        <div
          role="tablist"
          aria-label="Choose your kind of work"
          onKeyDown={onKeyDown}
          className="flex min-w-0 flex-1 snap-x gap-1 overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-5 [&::-webkit-scrollbar]:hidden"
        >
          {AUDIENCES.map((a, i) => {
            const Icon = AUDIENCE_ICONS[a.id];
            const isActive = i === selected;
            return (
              <button
                key={a.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(a.id)}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={PANEL_ID}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(i)}
                className={cn(
                  "relative flex shrink-0 snap-start items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-4 py-3 text-[13px] font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                  isActive ? "text-white" : "text-secondary hover:bg-subtle-bg hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-2xl bg-action shadow-[0_12px_24px_-12px_rgba(90,76,224,0.9)]"
                  />
                )}
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                  className={cn(
                    "relative transition-colors",
                    isActive ? "text-action-tint" : "text-muted",
                  )}
                />
                <span className="relative">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
