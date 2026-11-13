"use client";

import GrowthResults from "./GrowthResults";

/**
 * "The growth, up close" as its own page section. It has no tabs of its own:
 * it shares the selected niche with "Who you want to reach" through
 * NicheProvider, and stepping past a niche's last account moves both on.
 */
export default function GrowthSection() {
  return (
    // Same full-width grey band as the before & after section it replaced.
    <section
      aria-label="The growth, up close"
      className="relative overflow-clip border-y border-border bg-subtle-bg"
    >
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-24">
        <GrowthResults />
      </div>
    </section>
  );
}
