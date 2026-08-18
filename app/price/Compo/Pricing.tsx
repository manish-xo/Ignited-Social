"use client";
import React from "react";
import GradientBackground from "@/components/ui/GradientBackground";
import GradientPanel from "@/components/ui/GradientPanel";
import Heading from "@/components/ui/Heading";
import {
  badges,
  plans,
  features,
  trustBadges,
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
            <Heading className="text-center hidden sm:block">
              Affordable plans for every
            </Heading>
            <Heading className="text-center hidden sm:block">Budget</Heading>

            <Heading className="text-center text-[9vw] sm:hidden">
              Affordable plans for
            </Heading>
            <Heading className="text-center text-[9vw] sm:hidden">
              every budget
            </Heading>
          </div>
          {/* SUBTEXTING */}
          <div>
            <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-5 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
              Choose a plan that fits your needs with transparent pricing,
              powerful features, and the to grow at your own pace.
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

              <ul className="mt-8 space-y-4">
                <li className="text-xs font-semibold uppercase tracking-wide text-muted">
                  What's included
                </li>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i
                      className={`ri-check-line mt-0.5 shrink-0 ${
                        plan.popular ? "text-action" : "text-ink"
                      }`}
                    ></i>

                    <div className="flex flex-col">
                      <span className="text-sm text-ink/90">
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

        <div className="trust-badges mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-6">
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <React.Fragment key={badge.label}>
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-action shrink-0" />
                  <p className="text-sm font-medium text-secondary whitespace-nowrap">
                    {badge.label}
                  </p>
                </div>
                {i < trustBadges.length - 1 && (
                  <span className="hidden h-4 w-px bg-border sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <PlanComparison />
      <Comparison />
      <div className="difference mx-auto pt-16 pb-10">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-xs">The difference</p>
          </CornerFrame>
        </div>

        <div className="heading">
          <Heading className="text-center hidden sm:block">
            How are we different
          </Heading>
          <Heading className="text-center text-[9vw] sm:hidden">
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
      </div>
    </section>
  );
};

export default Pricing;
