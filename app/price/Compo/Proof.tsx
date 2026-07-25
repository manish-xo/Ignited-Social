"use client";
import React from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { testimonials, stats } from "@/data/pricing";
import { Quote, Star, BadgeCheck } from "lucide-react";
const Proof = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl overflow-hidden p-10 sm:p-14">
        <div className="eyebrow flex items-center justify-center mb-5">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono  uppercase text-xs">Proof</p>
          </CornerFrame>
        </div>
        <div className="heading text-center flex flex-col items-center justify-center text-canvas font-heading text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] -tracking-[0.04em]">
          <Heading className="">Trusted by creators</Heading>
          <Heading>who value real growth.</Heading>
        </div>

        <div className="subHeading">
          <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[300] tracking-normal text-ink/80 sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            Thousands of creators, businesses, and brands trust us to grow their
            Instagram with real people, transparent reporting, and strategies
            designed for long-term success.
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
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative grid grid-cols-1 grid-rows-4 rounded-2xl border bg-white p-4 shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-tint-bg border border-action-tint font-[600] text-sm text-action">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-[600] text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>

              <i className="ri-double-quotes-l text-3xl text-action-on-dark mt-4"></i>

              <p className="text-xl text-ink font-[400] tracking-tight">
                {t.quote}{" "}
              </p>

              <div className="mt-12 flex items-center justify-between">
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

        <div className="flex items-center justify-center gap-1.5 mt-8">
          <div className="text-action">
            <i className="ri-star-s-fill"></i>
            <span className="font-[600]">Trustpilot</span>
          </div>
          <div>· 4.4 / 5</div>
          <div>· 290 reviews</div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
