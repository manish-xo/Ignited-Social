import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import ManagerCard from "../Components/ManagerCard";
import ServiceAccordion from "../Components/ServiceAccordion";

const BrandManager = () => {
  return (
    <section className="relative min-h-screen overflow-clip bg-subtle-bg border border-t-[1px] border-b-[1px] border-border">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 sm:pt-24">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              your personal brand manager
            </p>
          </CornerFrame>
        </div>

        {/* <Heading
          as="h2"
          className="mt-2 block text-4xl sm:text-5xl md:text-6xl sm:hidden font-heading-condensed font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          One person who knows
        </Heading>
        <Heading
          as="h2"
          className="mt-1 block text-4xl sm:text-5xl md:text-6xl sm:hidden font-heading-condensed font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          your business. And
        </Heading>
        <Heading
          as="h2"
          className="mt-1 block text-4xl sm:text-5xl md:text-6xl sm:hidden font-heading-condensed font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          what to work on next.
        </Heading>

        <Heading
          as="h2"
          className="mt-5 font-heading-condensed hidden sm:block text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          One person who knows your business
        </Heading>
        <Heading
          as="h2"
          className="font-heading-condensed hidden sm:block text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center"
        >
          And what to work on next.
        </Heading> */}

        <Heading
          as="h2"
          className="font-heading-condensed hidden sm:block text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center"
        >
          Remove the guesswork
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Think of your Brand Manager as part of your team. A person who
          understands what you’re building, and your why. Then helps you decide
          what’s worth your time and what to work on next.
        </p>

        {/* Brand Manager card (left, sticks while scrolling on desktop) +
            what they do (right). Stacks on phones/tablets. */}
        <div className="mt-20 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
            <ManagerCard />
          </div>
          <ServiceAccordion />
        </div>

        {/* <p className="mx-auto mt-16 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Your brand manager takes an active role in growing your audience. And
          helps you work through the difficult decisions.
        </p> */}
      </div>
    </section>
  );
};

export default BrandManager;
