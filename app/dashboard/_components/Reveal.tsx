"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts every [data-reveal] child in, one after another, when the
 * page mounts. The children start hidden via the `.dash-reveal` CSS rule, so
 * there's no flash before the animation runs.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(
        "[data-reveal]",
        { autoAlpha: 0, y: 26, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.07,
          clearProps: "transform",
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("dash-reveal", className)}>
      {children}
    </div>
  );
}
