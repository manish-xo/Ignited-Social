import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import FirstWeekSteps from "../Components/FirstWeekSteps";

const ROLES = [
  {
    title: "We handle the outreach.",
    text: "Research, targeting and daily growth activity.",
  },
  {
    title: "You keep creating.",
    text: "Make the content you’re best at, with clear pointers from us.",
  },
  {
    title: "You run your business.",
    text: "Answer enquiries, serve customers and act on the advice.",
  },
];

const FirstWeek = () => {
  return (
    <section className="relative min-h-screen overflow-clip bg-subtle-bg border border-t-[1px] border-b-[1px] border-border">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 sm:pt-24">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              your first week
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 font-heading-condensed text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          Ten minutes to get started.
        </Heading>
        <Heading
          as="h2"
          className="font-heading-condensed text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center"
        >
          A person to take it from here.
        </Heading>

        <FirstWeekSteps />

        {/* who does what */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3 sm:gap-6">
          {ROLES.map((role) => (
            <div key={role.title}>
              <p className="text-lg font-bold -tracking-[0.03em] text-ink">
                {role.title}
              </p>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-secondary">
                {role.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstWeek;
