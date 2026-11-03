import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import FirstWeekSteps from "../Components/FirstWeekSteps";

const QUESTIONS = [
  {
    q: "When does the work begin?",
    a: "We set up your audience targeting within 24–48 hours. If you join over the weekend, we start on Monday.",
  },
  {
    q: "What will I need to do?",
    a: "You continue creating and publishing, handling enquiries and putting your chosen recommendations into practice. Your manager helps you decide what deserves your attention and how to approach it with the time you have.",
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
          A person to take it from there.
        </Heading>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-secondary sm:text-base">
          Your Brand Manager takes the lead on audience growth and helps you
          work through what comes next.
        </p>

        <FirstWeekSteps />

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <Link
            href="/price"
            className="group inline-flex items-center gap-2 rounded-full bg-action py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-action-hover"
          >
            Find my plan
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-action transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </span>
          </Link>
          <p className="text-xs text-secondary">
            First 7 days free <span className="mx-1.5 text-muted">·</span> Your
            audit is yours to keep
          </p>
        </div>

        {/* quick answers */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 sm:gap-10">
          {QUESTIONS.map((item) => (
            <div key={item.q}>
              <p className="text-lg font-bold -tracking-[0.03em] text-ink">
                {item.q}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstWeek;
