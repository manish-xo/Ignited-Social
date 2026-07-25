// components/ui/GradientPanel.tsx
import React from "react";

interface GradientPanelProps {
  className?: string;
  radius?: number;
}

export default function GradientPanel({
  className = "",
  radius = 32,
}: GradientPanelProps) {
  return (
    <svg
      className={`pointer-events-none absolute h-[100vh] w-[95%] mx-auto ${className}`}
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-canvas)" />
          <stop offset="45%" stopColor="var(--color-action-tint)" />
          <stop offset="100%" stopColor="var(--color-action)" />
        </linearGradient>
      </defs>
      <path
        d={`M0,${radius}
            A${radius},${radius} 0 0 1 ${radius},0
            L${1440 - radius},0
            A${radius},${radius} 0 0 1 1440,${radius}
            L1440,700
            L0,700
            Z`}
        fill="url(#panelGradient)"
      />
    </svg>
  );
}
