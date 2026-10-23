import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import NicheTabs from "../Components/NicheTabs";

const Niches = () => {
  return (
    <section className="relative overflow-clip">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 sm:pt-24">
        <div className="eyebrow mb-3 flex items-center justify-center">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono text-[0.6em] uppercase sm:text-xs">
              for every niche
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed hidden sm:block text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Tailored strategy for your goals.
        </Heading>

        <Heading
          as="h2"
          className="mt-5 text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          Tailored strategy for
        </Heading>
        <Heading
          as="h2"
          className="text-center font-heading-condensed block sm:hidden text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
        >
          your goals.
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Pick the one that sounds like you. Your Brand Manager shapes the
          targeting around what you actually want from Instagram.
        </p>

        <NicheTabs />
      </div>
    </section>
  );
};

export default Niches;
