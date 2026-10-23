"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Pill tabs with a glass indicator that glides to the active tab. */
export default function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const move = (animate: boolean) => {
      const active = list.querySelector<HTMLElement>(`[data-id="${value}"]`);
      if (!active) return;
      const to = { x: active.offsetLeft, width: active.offsetWidth };
      if (animate) {
        gsap.to(indicator, { ...to, duration: 0.5, ease: "power3.out" });
      } else {
        gsap.set(indicator, to);
      }
    };

    move(placed.current);
    placed.current = true;

    // Keep it lined up when fonts load or the layout changes width.
    const ro = new ResizeObserver(() => move(false));
    ro.observe(list);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className={cn("relative flex rounded-2xl p-1 glass-inset", className)}
    >
      <span
        ref={indicatorRef}
        aria-hidden
        className="absolute bottom-1 left-0 top-1 rounded-xl border border-border bg-white"
      />
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          data-id={o.id}
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "relative z-10 flex-1 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
            value === o.id ? "text-action" : "text-muted hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
