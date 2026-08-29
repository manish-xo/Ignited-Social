"use client";

import React from "react";
import { Check } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";

interface FeatureValue {
  title: string;
  description: string;
}
interface FeatureRow {
  label: string;
  grow: FeatureValue;
  scale: FeatureValue;
}

const sharedStrip = [
  "Dedicated growth manager",
  "Organic follower growth",
  "24/6 suppor",
  "Cancel anytime",
  "30-day money-back guarantee",
];

const features: FeatureRow[] = [
  {
    label: "Your growth manager",
    grow: {
      title: "Growth Manager",
      description: "One person on your account.",
    },
    scale: {
      title: "Senior Growth Manager",
      description: "Has grown accounts in your niche",
    },
  },
  {
    label: "Followers per month",
    grow: { title: "150–500+", description: "Steady growth, every month." },
    scale: { title: "250–800+", description: "Faster, higher volume." },
  },
  {
    label: "Audience targeting",
    grow: { title: "Core", description: "We find the people likely to care." },
    scale: {
      title: "Advanced",
      description: "We go after your competitors' followers.",
    },
  },
  {
    label: "Geo, language & gender targeting",
    grow: { title: "Included", description: "" },
    scale: { title: "Included", description: "" },
  },
  {
    label: "Competitor account targeting",
    grow: { title: "Included", description: "" },
    scale: { title: "Included", description: "" },
  },
  {
    label: "Content support",
    grow: {
      title: "Basic guidance",
      description: "Simple pointers on what to post.",
    },
    scale: {
      title: "Monthly plan + weekly review",
      description: "A plan, checked every week.",
    },
  },
  {
    label: "Who gets excluded",
    grow: {
      title: "Full control",
      description: "You decide who never gets touched.",
    },
    scale: {
      title: "Full control",
      description: "You decide who never gets touched.",
    },
  },
];

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  return (
    <div className="flex items-start gap-2">
      <Check size={15} className="mt-0.5 shrink-0 text-success" />
      <div>
        <p className="text-sm font-semibold text-ink">{value.title}</p>
        {value.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-secondary">
            {value.description}
          </p>
        )}
      </div>
    </div>
  );
};

const ComparisonPlan = () => {
  return (
    <section className="bg-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              Compare plans
            </p>
          </CornerFrame>
        </div>

        <div className="heading">
          <Heading className="text-center hidden sm:block">
            Grow or Scale?
          </Heading>
        </div>

        <div className="subHeading">
          {/* <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-6 font-[300] tracking-normal text-secondary sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            Here&apos;s exactly what changes between Grow and Scale — so you can
            decide with confidence.
          </p> */}
          <p className="mx-auto mt-4 text-sm leading-relaxed text-secondary">
            Same team, same care. Different speed and depth.
          </p>
        </div>
      </div>

      {/* shared strip */}
      {/* <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border-2 border-border border-dashed bg-subtle-bg px-6 py-3 text-center">
        {sharedStrip.map((item, i) => (
          <React.Fragment key={item}>
            <span className="text-xs font-medium text-secondary">{item}</span>
            {i < sharedStrip.length - 1 && (
              <span className="text-border">·</span>
            )}
          </React.Fragment>
        ))}
      </div> */}
      {/* shared strip */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5 rounded-2xl border-2 border-dashed border-border bg-subtle-bg px-5 py-4 text-center sm:rounded-full sm:px-6 sm:py-3">
        {sharedStrip.map((item, i) => (
          <React.Fragment key={item}>
            <span className="text-[11px] font-medium leading-snug text-secondary sm:text-xs">
              {item}
            </span>
            {i < sharedStrip.length - 1 && (
              <span className="hidden text-ink sm:inline">•</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="mx-auto mt-8 hidden max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm md:block">
        {/* header row */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-hairline">
          <div className="p-6" />
          <div className="border-l border-hairline p-6">
            <p className="font-heading text-lg font-bold text-ink">Grow</p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
              $139<span className="text-sm font-medium text-muted">/mo</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              For individuals &amp; brands ready to build steady, sustainable
              momentum.
            </p>
          </div>
          <div className="relative border-l border-hairline bg-action-tint-bg p-6">
            <span className="absolute right-4 top-4 rounded-full bg-action px-2.5 py-1 text-[10px] font-bold text-white">
              MOST VALUE
            </span>
            <p className="font-heading text-lg font-bold text-action">Scale</p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
              $199<span className="text-sm font-medium text-muted">/mo</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              For creators &amp; brands ready to move faster and dominate their
              niche.
            </p>
          </div>
        </div>

        {/* Feature rows */}
        {features.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1.2fr_1fr_1fr] border-b border-hairline last:border-b-0 ${
              i % 2 === 0 ? "bg-white" : "bg-subtle-bg/30"
            }`}
          >
            <div className="p-5 text-sm font-medium text-ink">{row.label}</div>
            <div className="border-l border-hairline p-5">
              <FeatureCell value={row.grow} />
            </div>
            <div className="border-l border-hairline bg-action-tint-bg/30 p-5">
              <FeatureCell value={row.scale} />
            </div>
          </div>
        ))}

        {/* footer — CTAs */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr]">
          <div className="p-6" />
          <div className="border-l border-hairline p-6">
            <a
              href="/signup?plan=grow"
              className="block w-full rounded-full bg-subtle-bg py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-hairline"
            >
              Start Free Trial
            </a>
          </div>

          <div className="border-l border-hairline bg-action-tint-bg p-6">
            <a
              href="/signup?plan=scale"
              className="block w-full rounded-full bg-action py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-action-hover"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
      <p className="mt-4 hidden text-center text-xs text-muted md:block">
        7-day free trial · cancel anytime
      </p>

      {/* ===== MOBILE — stacked plan cards ===== */}

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-5 md:hidden">
        {(["grow", "scale"] as const).map((planKey) => {
          const isScale = planKey === "scale";

          return (
            <div
              key={planKey}
              className={`overflow-hidden rounded-2xl border shadow-sm ${
                isScale
                  ? "border-action/30 bg-action-tint-bg/20"
                  : "border-border bg-white"
              }`}
            >
              <div
                className={`p-6 ${isScale ? "bg-action-tint-bg" : "bg-subtle-bg"}`}
              >
                {isScale && (
                  <span className="mb-2 inline-block rounded-full bg-action px-2.5 py-1 text-[10px] font-bold text-white">
                    MOST VALUE
                  </span>
                )}
                <p
                  className={`font-heading text-lg font-bold ${isScale ? "text-action" : "text-ink"}`}
                >
                  {isScale ? "Scale" : "Grow"}
                </p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
                  ${isScale ? "199" : "139"}
                  <span className="text-sm font-medium text-muted">/mo</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-secondary">
                  {isScale
                    ? "For creators & brands ready to move faster and dominate their niche."
                    : "For individuals & brands ready to build steady, sustainable momentum."}
                </p>
              </div>

              <div className="divide-y divide-hairline">
                {features.map((row) => (
                  <div key={row.label} className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {row.label}
                    </p>
                    <div className="mt-2">
                      <FeatureCell value={isScale ? row.scale : row.grow} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <a
                  href={`/signup?plan=${planKey}`}
                  className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                    isScale
                      ? "bg-action text-white hover:bg-action-hover"
                      : "bg-subtle-bg text-ink hover:bg-hairline"
                  }`}
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          );
        })}
        <p className="text-center text-xs text-muted">
          7-day free trial · cancel anytime
        </p>
      </div>
    </section>
  );
};

export default ComparisonPlan;
