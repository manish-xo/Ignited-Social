import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A note-paper card: a white sheet with punched holes along the top, two
 * tilted sheets (accent and ink) peeking out behind it, and a "no. 01" in
 * the corner. Muted greys when `dimmed` (e.g. a cancelled subscription).
 */
export default function PaperCard({
  number,
  dimmed = false,
  selected = false,
  size = "md",
  children,
  className,
}: {
  number: number;
  dimmed?: boolean;
  /** Highlighted, e.g. ticked in the cancel picker. */
  selected?: boolean;
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}) {
  const sm = size === "sm";
  const holes = sm ? 5 : 7;
  // Alternate the slight tilt so a row of cards doesn't look stamped out.
  const flip = number % 2 === 0;

  return (
    // A little room for the sheet behind to peek out.
    <div className={cn("relative", sm ? "p-1" : "p-1.5", className)}>
      {/* one sheet behind, barely tilted */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-1.5 rounded-xl transition-colors duration-300",
          dimmed ? "bg-border" : "bg-action/80",
          flip ? "rotate-[1.5deg]" : "-rotate-[1.5deg]",
        )}
      />

      {/* the front sheet */}
      <div
        className={cn(
          "relative flex h-full flex-col rounded-xl border border-hairline bg-white shadow-[0_6px_16px_-12px_rgba(34,31,27,0.35)] transition-[transform,box-shadow] duration-300",
          sm ? "px-3.5 pb-3 pt-6" : "px-5 pb-4 pt-8",
          selected &&
            "-translate-y-0.5 shadow-[0_10px_20px_-14px_rgba(34,31,27,0.45)] ring-2 ring-action",
        )}
      >
        {/* small punched holes, the quiet paper detail */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-5 flex justify-between",
            sm ? "top-2.5" : "top-3",
          )}
        >
          {Array.from({ length: holes }, (_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full bg-canvas shadow-[inset_0_1px_1px_rgba(34,31,27,0.18)]",
                sm ? "h-1.5 w-1.5" : "h-2 w-2",
              )}
            />
          ))}
        </div>

        <div className={cn("flex-1", dimmed && "opacity-70")}>{children}</div>

        <p
          className={cn(
            "mt-3 self-end leading-none text-ink",
            dimmed && "text-muted",
          )}
        >
          <span
            className={cn("font-light", size === "sm" ? "text-xs" : "text-sm")}
          >
            no.
          </span>{" "}
          <span
            className={cn(
              "font-bold tabular-nums",
              size === "sm" ? "text-base" : "text-2xl",
            )}
          >
            {String(number).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
}
