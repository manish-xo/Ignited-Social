// components/ui/DotPattern.tsx
"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  cr?: number;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  cr = 1,
  className,
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-border/70 transition-opacity duration-500 group-hover:fill-action/25",
        className,
      )}
      style={{
        maskImage:
          "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
      }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={cr} cy={cr} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default DotPattern;
