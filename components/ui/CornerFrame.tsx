// components/ui/CornerFrame.tsx
import React from "react";

interface CornerFrameProps {
  children: React.ReactNode;
  className?: string;
  cornerColor?: string;
}

export default function CornerFrame({
  children,
  className = "",
  cornerColor = "bg-action",
}: CornerFrameProps) {
  return (
    <div className={`relative inline-flex border border-border ${className}`}>
      {/* corner accents */}
      <span className={`absolute -left-0.5 -top-0.5 h-1 w-1 ${cornerColor}`} />
      <span
        className={`absolute -bottom-0.5 -left-0.5 h-1 w-1 ${cornerColor}`}
      />
      <span className={`absolute -right-0.5 -top-0.5 h-1 w-1 ${cornerColor}`} />
      <span
        className={`absolute -bottom-0.5 -right-0.5 h-1 w-1 ${cornerColor}`}
      />

      <div className="relative z-10 px-2 py-1">{children}</div>
    </div>
  );
}
