"use client";
import React from "react";
import GradientBackground from "@/components/ui/GradientBackground";
import GradientPanel from "@/components/ui/GradientPanel";
import Heading from "@/components/ui/Heading";
import {
  badges,
  plans,
  features,
  pricingComparisonData,
  ComparisonCard,
  ComparisonBento,
} from "@/data/pricing";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CornerFrame from "@/components/ui/CornerFrame";
import { Check, X } from "lucide-react";
import PlanComparison from "./PlanComparison";
import Comparison from "@/app/secondary/page";
import { BothPlan } from "@/lib/plans";
import ComparisonPlan from "./Comparison";
import MinimalHero from "@/app/service/Components/Hero-Minimalism";

/** Real customer profile pictures shown beside the "Trusted by" line. */
const TRUSTED_AVATARS = [
  "/audiences/journey-v2/results/local/thedenverstylist-avatar.png",
  "/audiences/journey-v2/results/coaches/savfit__-avatar.png",
  "/audiences/journey-v2/results/creatives/james_bosley_studio-avatar.png",
];

const Pricing = () => {
  const left = ComparisonBento.filter((card) => !card.recommendation).slice(
    0,
    2,
  );
  const right = ComparisonBento.filter((card) => !card.recommendation).slice(
    2,
    4,
  );
  const center = ComparisonBento.find((card) => card.recommendation)!;

  const renderCard = (ComparisonBento: ComparisonCard) => (
    <div
      key={ComparisonBento.title}
      className={`flex flex-col rounded-2xl border p-6 ${
        ComparisonBento.recommendation
          ? "h-full justify-center border-action bg-gradient-to-b from-action-tint-bg to-white shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
          : "border-border bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
          {ComparisonBento.tag}
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full ${
            ComparisonBento.recommendation ? "bg-success" : "bg-danger/10"
          }`}
        >
          {ComparisonBento.recommendation ? (
            <Check size={14} className="text-white" />
          ) : (
            <X size={14} className="text-danger" />
          )}
        </span>
      </div>
      <h3
        className={`mt-3 tracking-tight leading-6 font-[700] text-ink ${
          ComparisonBento.recommendation ? "text-2xl" : "text-xl"
        }`}
      >
        {ComparisonBento.title}
      </h3>
      <ul className="mt-3 space-y-2">
        {ComparisonBento.description.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-secondary"
          >
            <span
              className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                ComparisonBento.recommendation ? "bg-action" : "bg-muted"
              }`}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* <GradientBackground /> */}

      <div className="relative isolate px-6 pt-4 overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto mt-12">
        <div className="mx-auto pt-20">
          {/* EYEBRO */}
          <div className="mb-4 sm:mb-6 flex justify-center eyebrow">
            <div className="relative inline-flex items-center justify-center gap-1.5 border-1.5 border-dashed rounded-full font-mono font-[600] uppercase bg-subtle-bg border border-border-strong text-ink/70 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-3 lg:text-sm xl:px-4 xl:py-1 xl:text-[0.7em]">
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              <span className="text-[0.8em] sm:text-xs ">
                Simple, Transparent Pricing
              </span>
            </div>
          </div>
          {/* HEADING */}
          <div className="Heading">
            <Heading
              as="h2"
              className="mt-5 text-center font-heading-condensed text-5xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-6xl"
            >
              Choose how fast
            </Heading>
            <Heading
              as="h2"
              className="text-center font-heading-condensed text-5xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-6xl"
            >
              you want to grow.
            </Heading>
          </div>
          {/* SUBTEXTING */}
          <div>
            <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-5 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-base md:text-lg lg:text-base">
              {/* Choose a plan that fits your needs with transparent pricing,
              powerful features, and the to grow at your own pace. */}
              Your Brand Manager handles the daily outreach and helps you decide
              what to post and what to improve. Choose the pace and level of
              guidance that fits you.
            </p>
          </div>

          {/* TRUST BADGES */}
          <div className="trust mt-14">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 md:gap-x-6">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className="badge flex flex-col items-center justify-center text-center min-w-[100px] sm:min-w-[120px] -space-y-0.5"
                >
                  <p
                    className={`flex items-center font-[600] text-sm sm:text-base whitespace-nowrap ${badge.highlight ? "text-action" : ""}`}
                  >
                    {badge.highlight ? (
                      <>
                        <i className={`${badge.icon}`}></i>
                        {badge.value}
                      </>
                    ) : (
                      <>
                        {badge.value}
                        <i className={`${badge.icon}`}></i>
                      </>
                    )}
                  </p>
                  <p
                    className={`text-xs ${badge.highlight ? "text-action-subtle font-[300]" : "text-muted font-[400]"}`}
                  >
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-28 grid max-w-4xl gap-8 sm:grid-cols-2 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-transform duration-200 ${
                plan.popular
                  ? "bg-white border-2 border-action border-dashed sm:-translate-y-3 scale-[1.02]"
                  : "bg-white border border-border shadow-sm hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-action px-4 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <h3 className="font-[700] text-[1.7rem] text-ink">
                {plan.title}
              </h3>
              <p className="mt-2 text-sm text-secondary">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-5xl text-ink">
                  ${plan.price}
                </span>
                <span className="text-secondary text-sm">/ month</span>
              </div>

              <p className="mt-1 text-xs text-muted">
                Billed monthly · cancel anytime
              </p>

              <a
                href={`/signup?plan=${plan.title.toLowerCase()}`}
                className={`mt-8 block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.popular
                    ? "bg-action text-white hover:bg-action-hover"
                    : "bg-subtle-bg text-ink hover:bg-action hover:text-white"
                }`}
              >
                {plan.cta}
              </a>

              <p className="mt-3 text-left text-xs font-semibold text-ink">
                First 7 days free
              </p>

              <ul className="mt-8 space-y-4">
                <li className="text-xs font-semibold uppercase tracking-wide text-muted">
                  What's included
                </li>
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${
                      feature.highlight
                        ? "-mx-3 rounded-xl border border-action/25 bg-action-tint-bg px-3 py-2.5"
                        : ""
                    }`}
                  >
                    <i
                      className={`ri-check-line mt-0.5 shrink-0 ${
                        plan.popular || feature.highlight
                          ? "text-action"
                          : "text-ink"
                      }`}
                    ></i>

                    <div className="flex flex-col">
                      <span
                        className={
                          feature.highlight
                            ? "text-sm font-semibold text-ink"
                            : "text-sm text-ink/90"
                        }
                      >
                        {feature.text}
                      </span>
                      {feature.note && (
                        <p className="text-xs text-ink/50 mt-0.5">
                          {feature.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="trust-badges mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <div className="flex -space-x-2" aria-hidden>
            {TRUSTED_AVATARS.map((src) => (
              <span
                key={src}
                className="h-7 w-7 overflow-hidden rounded-full bg-white ring-2 ring-canvas"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny avatar */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full scale-125 object-cover"
                />
              </span>
            ))}
          </div>
          <p className="text-sm font-medium text-secondary">
            Trusted by 1,100+ active brands and creators.
          </p>
        </div>
      </div>
      {/* <PlanComparison /> */}
      <ComparisonPlan />
      <Comparison />
      {/* <div className="difference mx-auto pt-16 pb-10">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-xs">The difference</p>
          </CornerFrame>
        </div>

        <div className="heading">
          <Heading
            as="h2"
            className="mt-5 text-center font-heading-condensed text-[8vw] sm:text-5xl font-[600] leading-[0.9] -tracking-[0.04em] text-ink md:text-6xl"
          >
            How are we different
          </Heading>
        </div>

        <div className="subHeading">
          <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            Build a loyal Instagram audience with organic growth strategies
            tailored for lasting success.
          </p>
        </div>

        <ComparisonTable data={pricingComparisonData} />
      </div> */}
    </section>
  );
};

export default Pricing;
