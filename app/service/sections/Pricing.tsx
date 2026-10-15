import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import PricingPlans from "../Components/PricingPlans";

const Pricing = () => {
  return (
    <section id="plans" className="relative overflow-clip">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 sm:pt-24">
        <div className="eyebrow mb-3 flex items-center justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              find your plan
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Make room for growth.
        </Heading>
        <Heading
          as="h2"
          className="text-center font-heading-condensed text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          We&apos;ll take on the daily work.
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Both plans come with your own Brand Manager and seven days free.
          Choose how much help you want along the way.
        </p>

        <PricingPlans />
      </div>
    </section>
  );
};

export default Pricing;
