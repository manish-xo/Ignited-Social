"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Info } from "lucide-react";

interface AccordionProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  label,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl bg-[#efe9df]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink">
          <Info size={14} className="text-action" />
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-black/5 px-5 py-4 text-sm leading-relaxed text-secondary">
          {children}
        </div>
      )}
    </div>
  );
}
