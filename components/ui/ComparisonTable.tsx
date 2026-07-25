"use client";
import { Check, X } from "lucide-react";
import { ComparisonRow } from "@/data/pricing";

export interface ComparisonTableProps {
  // eyebrow?: string;
  // title: string;
  // description?: string;
  data: ComparisonRow[];
  usLabel?: string;
  otherLabel?: string;
  className?: string;
}

const ComparisonTable = ({
  data,
  usLabel = "Us",
  otherLabel = "Others",
  className = "",
}: ComparisonTableProps) => {
  return (
    <section className={`bg-canvas px-6 ${className}`}>
      {/* <div className="mx-auto max-w-2xl text-center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-secondary text-base">{description}</p>
        )}
      </div> */}

      <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {/* Header Row */}
        <div className="flex items-center bg-subtle-bg">
          <div className="flex-1 px-6 py-4 text-xl tracking-tighter font-[700] text-ink">
            Feature
          </div>
          <div className="w-48 px-4 py-4 text-center text-xl tracking-tighter font-[700] text-action sm:w-64">
            {usLabel}
          </div>
          <div className="w-48 px-4 py-4 text-center text-xl tracking-tighter font-[700] text-muted sm:w-64">
            {otherLabel}
          </div>
        </div>
        {/* Rows */}
        {data.map((row, i) => (
          <div
            key={row.feature}
            className={`flex items-center border-t border-hairline ${i % 2 === 0 ? "bg-white" : "bg-subtle-bg/40"}`}
          >
            <div className="flex-1 px-6 py-5 text-sm tracking-tight font-[500] text-ink">
              {row.feature}
            </div>

            <div className="flex w-40 items-start gap-2 px-4 py-5 sm:w-64">
              <Check size={16} className="mt-0.5 shrink-0 text-action" />
              <span className="text-xs leading-snug text-ink/90 sm:text-sm">
                {row.us}
              </span>
            </div>

            <div className="flex w-40 items-start gap-2 px-4 py-5 sm:w-64">
              <X size={16} className="mt-0.5 shrink-0 text-danger" />
              <span className="text-xs leading-snug text-muted sm:text-sm">
                {row.others}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonTable;
