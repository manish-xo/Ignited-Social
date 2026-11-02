import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import Footer from "@/components/layout/Footer/Footer";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import AudienceExperience from "./_components/AudienceExperience";

export const metadata: Metadata = {
  title: "Ignited — A following for what you’re building",
  description:
    "Ignited homepage — interactive audience stories and growth results.",
};

// Redesigned Sections 5 + 6, kept on their own route while they're reviewed.
export default function AudiencesPage() {
  return (
    <>
      <ProHeader />

      <main className="bg-canvas">
        <section
          aria-labelledby="audiences-intro"
          className="mx-auto max-w-5xl px-6 pb-10 pt-32 text-center sm:pt-40"
        >
          <div className="flex justify-center">
            <CornerFrame className="bg-action-tint-bg">
              <p className="font-mono text-[0.6em] uppercase sm:text-xs">
                For your kind of work
              </p>
            </CornerFrame>
          </div>

          <Heading
            as="h1"
            gradient={false}
            id="audiences-intro"
            className="mt-5 pb-1 text-center font-heading-condensed text-4xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-5xl"
          >
            For people building
            <br />
            something <span className="text-action">of their own.</span>
          </Heading>

          <p className="mx-auto mt-6 max-w-[565px] text-[15px] leading-relaxed text-secondary sm:text-base">
            Your audience, your ambitions and the time you have shape how we
            help. Explore stories from the team behind Ignited.
          </p>
        </section>

        <AudienceExperience />

        <section
          aria-label="Choose a plan"
          className="bg-[#19171f] px-6 pb-14 text-white"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <p className="font-heading-condensed text-3xl font-[600] leading-[0.9] -tracking-[0.04em] md:text-4xl">
              Let’s make room for your growth.
              <small className="mt-2 block font-body text-xs font-normal tracking-normal text-[#b0a8bb]">
                First 7 days free · Your audit is yours to keep
              </small>
            </p>
            <Link
              href="/price"
              className="group inline-flex items-center gap-3 rounded-2xl bg-action py-3 pl-5 pr-3 text-sm font-medium text-white transition-colors hover:bg-action-hover"
            >
              Find my plan
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/15 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight size={15} aria-hidden />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
