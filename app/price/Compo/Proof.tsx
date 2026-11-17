"use client";
import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { testimonials, stats } from "@/data/pricing";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

/** The three case studies shown on the page. The rest stay in data/pricing.ts. */
const FEATURED = [
  "rickstrooper",
  "james_bosley_studio",
  "medical_aesthetician_shannon",
];

const Proof = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl overflow-hidden p-10 sm:p-14">
        <div className="eyebrow flex items-center justify-center mb-5">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono  uppercase text-xs">The Results</p>
          </CornerFrame>
        </div>
        <div className="heading text-center flex flex-col items-center justify-center text-canvas font-heading text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] -tracking-[0.04em]">
          {/* <Heading className="hidden sm:block">Trusted by creators</Heading>
          <Heading className="text-center text-[8.5vw] sm:hidden">
            Trusted by creators
          </Heading>
          <Heading className="hidden sm:block">Who value real growth.</Heading>
          <Heading className="text-center text-[8.5vw] sm:hidden">
            Who value real
          </Heading>
          <Heading className="text-center text-[8.5vw] sm:hidden">
            growth.
          </Heading> */}

          {/* <Heading className="hidden sm:block">
            We've done this 20,000 times
            
          </Heading>
          <Heading className="block text-[8vw] sm:hidden">
            20,000 times.
          </Heading> */}

          {/* This is main Heading */}
          {/* <Heading className="text-[8vw] md:text-[7vw] sm:hidden md:block lg:hidden">
            We've done this
          </Heading>
          <Heading className="text-[8vw] md:text-[7vw] sm:hidden md:block lg:hidden">
            20,000 times
          </Heading>

          <Heading className="hidden sm:block md:hidden lg:block">
            We've done this 20,000 times
          </Heading> */}

          <Heading
            as="h2"
            className="mt-5 text-center font-heading-condensed text-[8vw] sm:hidden font-[600] leading-[0.9] -tracking-[0.04em] text-ink"
          >
            We've done this 20,000
          </Heading>

          <Heading
            as="h2"
            className="text-center font-heading-condensed text-[8vw] sm:hidden font-[600] leading-[0.9] -tracking-[0.04em] text-ink"
          >
            times
          </Heading>

          <Heading
            as="h2"
            className="text-center font-heading-condensed hidden sm:text-5xl md:text-6xl sm:block font-[600] leading-[0.9] -tracking-[0.04em] text-ink"
          >
            We've done this 20,000 times
          </Heading>
        </div>

        <div className="subHeading">
          <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[300] tracking-normal text-ink/80 sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            {/* Thousands of creators, businesses, and brands trust us to grow their
            Instagram with real people, transparent reporting, and strategies
            designed for long-term success. */}
            Six years in. We know what works on Instagram, across every niche
            you can name.
          </p>
        </div>

        {/* stat strip */}
        <div className="mx-auto mt-14 grid sm:max-w-3xl grid-cols-1 divide-y divide-hairline rounded-2xl border shadow-[0px_4px_2px_rgba(0,0,0,0.25)] bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-5 text-center"
            >
              <p className="font-[700] text-4xl text-ink">
                {stat.value}
                {stat.suffix && (
                  <i
                    className={`${stat.suffix} ${stat.highlight ? "text-action" : "text-muted"} text-xl`}
                  ></i>
                )}
              </p>
              <p className="mt-2 text-sm text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {FEATURED.map((handle) =>
            testimonials.find((t) => t.handle === handle)!,
          ).map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col rounded-2xl border bg-white p-4 shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {t.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- small avatar
                    <img
                      src={t.photo}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full border border-action-tint object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-action-tint-bg border border-action-tint font-[600] text-sm text-action">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-[600] text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                    <a
                      href={`https://www.instagram.com/${t.handle}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-xs text-action underline-offset-2 hover:underline"
                    >
                      @{t.handle}
                    </a>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-[700] leading-none text-action">
                    {t.followersGained}
                  </p>
                  <p className="mt-1 text-xs text-muted">followers</p>
                </div>
              </div>

              <i className="ri-double-quotes-l text-3xl text-action-on-dark mt-4"></i>

              <p className="flex-1 text-lg leading-snug text-ink font-[400] tracking-tight">
                {t.quote}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-0 5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-action"></i>
                  ))}
                </div>

                <span className="flex items-center gap-1 text-xs font-medium text-success">
                  <BadgeCheck size={14} /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <span className="inline-flex items-center gap-2 border-b border-hairline pb-1.5 text-[15px] text-ink">
            Explore all case studies
            <ArrowUpRight size={18} aria-hidden className="text-action" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Proof;
