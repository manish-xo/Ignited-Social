import { Calendar, Star } from "lucide-react";
// import type { GrowthManager } from "@/lib/dashboard/types";
import { GrowthManager } from "../../lib/types";

export default function GrowthManagerCard({
  manager,
}: {
  manager: GrowthManager;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-action-tint-bg text-lg font-bold text-action">
            {manager.avatarInitial}
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success" />
        </div>
        <div>
          <p className="font-heading text-base font-bold text-ink">
            {manager.name}
          </p>
          <p className="text-xs text-muted">Your Growth Manager</p>
        </div>
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">
        Campaign activity
      </p>
      <div className="mt-2 rounded-xl bg-[#efe9df] p-4">
        <p className="text-sm leading-relaxed text-ink">
          {manager.activityNote}
        </p>
      </div>

      <button
        type="button"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-action text-sm font-semibold text-white hover:bg-action-hover"
      >
        <Calendar size={15} />
        Book a call with {manager.name}
      </button>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-secondary">How's {manager.name} doing?</span>
        <div className="flex gap-0.5 text-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} />
          ))}
        </div>
      </div>
    </div>
  );
}
