import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

const BrandManager = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-subtle-bg border border-t-[1px] border-b-[1px] border-border">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-32 sm:pt-24">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              your personal brand manager
            </p>
          </CornerFrame>
        </div>

        <h1 className="mt-5 font-heading-condensed text-4xl font-[700] leading-[1.02] -tracking-[0.04em] text-ink sm:text-6xl md:text-5xl lg:text-5xl text-center flex flex-col">
          <span>One person who knows your business</span>
          <span>And what to work on next.</span>
        </h1>
      </div>
    </section>
  );
};

export default BrandManager;
