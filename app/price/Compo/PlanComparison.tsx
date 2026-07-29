"use client";
import { Check, Minus } from "lucide-react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { comparisonFeatures } from "@/data/pricing";

const renderCell = (value: string | boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="mx-auto text-action" />
    ) : (
      <Minus size={16} className="mx-auto text-muted" />
    );
  }
  return <span className="text-sm text-ink/90">{value}</span>;
};

const PlanComparison = () => {
  return (
    <section className="bg-canvas w-full mx-auto pt-24 pb-10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono font-[600] uppercase text-xs">
              Side by Side
            </p>
          </CornerFrame>
        </div>

        <div className="heading">
          <Heading className="text-center">Not sure which plan fits?</Heading>
          {/* <Heading className="text-center">to know</Heading> */}
        </div>

        <div className="subHeading">
          <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[300] tracking-normal text-ink/80 sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            Here&apos;s exactly what changes between Grow and Scale — so you can
            decide with confidence.
          </p>
        </div>

        {/* <h2 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-ink">
          Not sure which plan fits?
        </h2> */}
        {/* <p className="mt-4 text-secondary text-base">
          Here&apos;s exactly what changes between Grow and Scale — so you can
          decide with confidence.
        </p> */}
      </div>

      <div className="mx-auto mt-14 max-w-3xl overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
        <div className="min-w-[560px]">
          <div className="flex items-center bg-subtle-bg">
            <div className="flex-1 px-6 py-4 text-md font-semibold text-ink">
              Feature
            </div>
            <div className="w-44 px-4 py-4 text-center text-md font-semibold text-ink">
              Grow
              <p className="mt-0.5 text-xs font-normal text-muted">$139/mo</p>
            </div>
            <div className="w-44 border-l border-action/20 bg-action-tint-bg px-4 py-4 text-center text-md font-semibold text-action">
              Scale
              <p className="mt-0.5 text-xs font-normal text-action/70">
                $199/mo
              </p>
            </div>
          </div>

          {/* row */}
          {comparisonFeatures.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center border-t border-hairline ${
                i % 2 === 0 ? "bg-white" : "bg-subtle-bg/40"
              }`}
            >
              <div className="flex-1 px-6 py-4 text-sm font-medium text-ink">
                {row.label}
              </div>
              <div className="w-44 px-4 py-4 text-center">
                {renderCell(row.grow)}
              </div>
              <div className="w-44 border-l border-action/20 bg-action-tint-bg/30 px-4 py-4 text-center">
                {renderCell(row.scale)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted">
        Still unsure?{" "}
        <a
          href="#contact"
          className="text-action underline hover:text-action-hover"
        >
          Talk to us
        </a>{" "}
        and we&apos;ll help you pick.
      </p>
    </section>
  );
};

export default PlanComparison;
