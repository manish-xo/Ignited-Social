// components/ui/Accordion.tsx
"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

export interface AccordionData {
  value: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionData[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openValue, setOpenValue] = useState<string | null>(
    items[0]?.value ?? null,
  );
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const innerRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const iconRefs = useRef<Record<string, SVGSVGElement | null>>({});

  // set initial state once, without React touching height afterward
  useLayoutEffect(() => {
    items.forEach((item) => {
      const el = contentRefs.current[item.value];
      if (!el) return;
      if (item.value === openValue) {
        gsap.set(el, { height: "auto" });
      } else {
        gsap.set(el, { height: 0 });
      }
    });
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeItem = (value: string) => {
    const el = contentRefs.current[value];
    const icon = iconRefs.current[value];
    if (!el) return;
    gsap.to(el, { height: 0, duration: 0.4, ease: "power3.inOut" });
    gsap.to(icon, { rotate: 0, duration: 0.4, ease: "power3.inOut" });
  };

  const openItem = (value: string) => {
    const el = contentRefs.current[value];
    const inner = innerRefs.current[value];
    const icon = iconRefs.current[value];
    if (!el || !inner) return;

    // measure natural height without flashing it visibly
    gsap.set(el, { height: "auto" });
    const fullHeight = el.offsetHeight;
    gsap.fromTo(
      el,
      { height: 0 },
      { height: fullHeight, duration: 0.4, ease: "power3.inOut" },
    );
    gsap.fromTo(
      inner,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.35, delay: 0.08, ease: "power2.out" },
    );
    gsap.to(icon, { rotate: 180, duration: 0.4, ease: "power3.inOut" });
  };

  const toggle = (value: string) => {
    const isOpen = openValue === value;

    if (isOpen) {
      closeItem(value);
      setOpenValue(null);
      return;
    }

    if (openValue) closeItem(openValue);
    openItem(value);
    setOpenValue(value);
  };

  return (
    <div className="divide-y divide-border rounded-2xl ">
      {items.map((item) => {
        const isOpen = openValue === item.value;
        return (
          <div key={item.value}>
            <button
              onClick={() => toggle(item.value)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-subtle-bg/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
            >
              <span
                className={`text-md font-medium transition-colors sm:text-[1.25rem] ${
                  isOpen ? "text-action" : "text-ink"
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                ref={(el) => {
                  iconRefs.current[item.value] = el;
                }}
                size={18}
                className={`shrink-0 ${isOpen ? "text-action" : "text-muted"}`}
              />
            </button>

            {/* NOTE: no `style` prop here — GSAP fully owns height */}
            <div
              ref={(el) => {
                contentRefs.current[item.value] = el;
              }}
              className="overflow-hidden"
            >
              <p
                ref={(el) => {
                  innerRefs.current[item.value] = el;
                }}
                className="px-6 py-6 rounded-xl border border-action-tint text-sm sm:text-[1rem] bg-action-tint-bg leading-relaxed text-secondary"
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
