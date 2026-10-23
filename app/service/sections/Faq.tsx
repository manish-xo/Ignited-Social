import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import FaqAccordion from "../Components/FaqAccordion";

const Faq = () => {
  return (
    <section
      id="faq"
      className="relative overflow-clip bg-subtle-bg border-y border-border"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 sm:pt-24">
        <div className="eyebrow mb-3 flex items-center justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              a few honest answers
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed hidden sm:block text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Will this work for someone like me?
        </Heading>
        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Will this work for
        </Heading>
        <Heading
          as="h2"
          className="text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          someone like me?
        </Heading>

        <FaqAccordion />
      </div>
    </section>
  );
};

export default Faq;
