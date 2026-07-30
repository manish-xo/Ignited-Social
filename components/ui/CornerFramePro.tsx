// components/ui/CornerFrame.tsx
import React from "react";

interface CornerFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function CornerFramePro({
  children,
  className = "",
}: CornerFrameProps) {
  return (
    <div
      className={`relative overflow-hidden border border-border bg-white shadow-sm ${className}`}
    >
      {/* corner brackets — extend on hover */}
      <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-muted/40 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-action" />
      <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-muted/40 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-action" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-muted/40 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-action" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-muted/40 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-action" />

      {children}
    </div>
  );
}
