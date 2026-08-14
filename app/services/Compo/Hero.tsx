"use client";
import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import FollowerGrowthChart from "@/components/dashboard/FollowerGrowthChart";

export interface Badge {
  // icon: string;
  value: string | number;
  label: string;
}

export const badges: Badge[] = [
  {
    // icon: "ri-star-s-fill",
    value: "2,400+",
    label: "Accounts managed",
  },
  {
    // icon: "ri-add-line",
    value: "98%",
    label: "Real, active followers",
  },
  {
    // icon: "ri-add-line",
    value: "0",
    label: "Bans or shadowbans",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative isolate px-6 pt-4 pb-16 overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto mt-12">
        <div className="mx-auto pt-20">
          <div className="eyebrow flex items-center justify-center mb-5">
            <CornerFrame className="bg-action-tint-bg">
              <p className="font-mono uppercase text-xs">What we do</p>
            </CornerFrame>
          </div>

          <div className="heading text-center flex flex-col items-center justify-center font-heading text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] -tracking-[0.04em]">
            <Heading>Everything your growth</Heading>
            <Heading>actually needs</Heading>
          </div>

          <div className="subHeading">
            <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] tracking-normal text-ink/60 sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1rem]">
              One service, built from the ground up — targeting, strategy,
              reporting, and a real person behind every account. No bots, no
              guesswork.
            </p>
          </div>
        </div>

        <div className="trust mt-14">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 md:gap-x-6">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="badge flex flex-col items-center justify-center text-center min-w-[100px] sm:min-w-[120px] -space-y-0.5"
              >
                <p className="flex items-center font-[600] text-sm sm:text-base whitespace-nowrap} ">
                  {badge.value}
                </p>
                <p className="text-xs font-[300]">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
