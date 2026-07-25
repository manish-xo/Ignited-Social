// components/ui/DarkGradientSection.tsx
import React from "react";

interface DarkGradientSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function DarkGradientSection({
  children,
  className = "",
}: DarkGradientSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-[#17153A] ${className}`}>
      {/* Top gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background:
              "linear-gradient(to top right, var(--color-action-tint), var(--color-action))",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Bottom gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-0 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background:
              "linear-gradient(to top right, var(--color-action-tint), var(--color-action))",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* actual content, above the glow */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
