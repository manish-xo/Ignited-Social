"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Counts from 0 up to `value` once on mount. Renders "—" when null. */
export default function CountUp({
  value,
  prefixSign = false,
  className,
}: {
  value: number | null;
  /** Show "+" before positive numbers (growth). */
  prefixSign?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    `${prefixSign && n > 0 ? "+" : ""}${Math.round(n).toLocaleString("en-US")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || value === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const counter = { n: 0 };
    el.textContent = format(0);
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.6,
      delay: 0.25,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = format(counter.n);
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value === null ? "—" : format(value)}
    </span>
  );
}
