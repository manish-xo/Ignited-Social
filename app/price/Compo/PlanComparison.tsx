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
  return <span className="text-xs md:text-sm text-ink/90">{value}</span>;
};

const PlanComparison = () => {
  return (
    <section className="bg-canvas w-full mx-auto pt-24 pb-10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="eyebrow flex items-center justify-center mb-3">
          <CornerFrame className="bg-action-tint-bg">
            <p className="font-mono uppercase text-[0.6em] sm:text-xs">
              Side by Side
            </p>
          </CornerFrame>
        </div>

        <div className="heading">
          <Heading className="text-center hidden sm:block">
            Not sure which plan fits?
          </Heading>
          <Heading className="text-center text-[9vw] sm:hidden">
            Not sure which
          </Heading>
          <Heading className="text-center text-[9vw] sm:hidden">
            plan fits?
          </Heading>
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

      <div className="mx-4 md:mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {/* header */}
        <div className="flex items-center bg-subtle-bg">
          <div className="flex-1 px-2 py-3 text-xs font-semibold text-ink sm:px-6 sm:py-4 sm:text-sm">
            Feature
          </div>
          <div className="flex-1 px-2 py-3 text-center text-[11px] font-semibold text-ink sm:text-sm sm:px-4 sm:py-4">
            Grow
            <p className="mt-0.5 text-[9px] font-normal text-muted sm:text-xs">
              $139/mo
            </p>
          </div>
          <div className="flex-1 border-l border-action/20 bg-action-tint-bg px-2 py-3 text-center text-[11px] font-semibold text-action sm:text-sm sm:px-4 sm:py-4">
            Scale
            <p className="mt-0.5 text-[9px] font-normal text-action/70 sm:text-xs">
              $199/mo
            </p>
          </div>
        </div>

        {/* rows */}
        {comparisonFeatures.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center border-t border-hairline ${
              i % 2 === 0 ? "bg-white" : "bg-subtle-bg/40"
            }`}
          >
            <div className="flex-1 px-2 py-3 text-xs font-medium leading-snug text-ink sm:px-6 sm:py-4 sm:text-sm">
              {row.label}
            </div>
            <div className="flex-1 px-2 py-3 text-center text-[11px] sm:text-sm sm:px-4 sm:py-4">
              {renderCell(row.grow)}
            </div>
            <div className="flex-1 border-l border-action/20 bg-action-tint-bg/30 px-2 py-3 text-center text-[11px] sm:text-sm sm:px-4 sm:py-4">
              {renderCell(row.scale)}
            </div>
          </div>
        ))}
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
