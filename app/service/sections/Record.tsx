import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import RecordTabs from "../Components/RecordTabs";

const Record = () => {
  return (
    <section className="relative min-h-screen overflow-clip">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 sm:pt-24">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              the record
            </p>
          </CornerFrame>
        </div>

        <Heading
          as="h2"
          className="mt-5 font-heading-condensed text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center leading-[0.9]"
        >
          More followers
        </Heading>
        <Heading
          as="h2"
          className="font-heading-condensed text-4xl md:text-5xl font-[600] -tracking-[0.04em] text-ink text-center"
        >
          And what happened next.
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          New audiences. Better content. Business from Instagram. Here’s what
          customers told the team behind Ignited
        </p>

        <RecordTabs />
      </div>
    </section>
  );
};

export default Record;
