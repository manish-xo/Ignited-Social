"use client";

import GrowthResults from "./GrowthResults";

/**
 * "The growth, up close" as its own page section. It steps through every
 * account by itself, so it can sit anywhere on the page.
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
