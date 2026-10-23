import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import BeforeAfterShowcase from "../Components/BeforeAfterShowcase";

const Transformations = () => {
  return (
    <section className="relative overflow-clip bg-subtle-bg border-y border-border">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 sm:pt-24">
        <div className="eyebrow mb-3 flex items-center justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              before vs after
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed hidden sm:block text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Real profiles. Real numbers.
        </Heading>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Real profiles.
        </Heading>
        <Heading
          as="h2"
          className="text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Real numbers.
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Skip the hype and see the actual transformation. Unedited Instagram
          screenshots from creators and brands we&apos;ve worked with: the same
          profile when they started, and today.
        </p>

        <div className="mt-14">
          <BeforeAfterShowcase />
        </div>
      </div>
    </section>
  );
};

export default Transformations;
