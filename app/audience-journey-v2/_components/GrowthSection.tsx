"use client";

import { NICHES } from "../data";
import GrowthResults from "./GrowthResults";
import { useNiche } from "./NicheContext";

/**
 * "The growth, up close" as its own page section. It has no tabs of its own:
 * the niche tabs in "Who you want to reach" switch it through NicheProvider.
 */
export default function GrowthSection() {
  const [selected] = useNiche();
  const niche = NICHES[selected];

  return (
    // Same full-width grey band as the before & after section it replaced.
    <section
      aria-label="The growth, up close"
      className="relative overflow-clip border-y border-border bg-subtle-bg"
    >
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-24">
        <GrowthResults niche={niche} />
      </div>
    </section>
  );
}
