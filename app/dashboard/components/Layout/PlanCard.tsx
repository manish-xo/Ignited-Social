import { Check } from "lucide-react";
// import type { PlanInfo } from "@/lib/dashboard/types";
import { PlanInfo } from "../../lib/types";

export default function PlanCard({ plan }: { plan: PlanInfo }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          Plan
        </p>
        <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold uppercase text-success">
          Current
        </span>
      </div>
      <p className="mt-1 font-heading text-xl font-bold text-ink">
        {plan.name}
      </p>

      <div className="mt-3 rounded-xl bg-[#efe9df] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          Billing
        </p>
        <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
          ${plan.price}
          <span className="text-sm font-medium text-muted"> /month</span>
        </p>
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">
        Included
      </p>
      <ul className="mt-2 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink">
            <Check size={14} className="mt-0.5 shrink-0 text-success" />
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 h-11 w-full rounded-xl bg-action text-sm font-semibold text-white hover:bg-action-hover"
      >
        Upgrade Plan
      </button>
      <button
        type="button"
        className="mt-2 h-11 w-full rounded-xl border border-border text-sm font-semibold text-ink hover:bg-border/20"
      >
        Update billing information
      </button>
    </div>
  );
}
