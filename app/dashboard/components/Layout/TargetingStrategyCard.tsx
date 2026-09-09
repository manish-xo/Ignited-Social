import type { ReactNode } from "react";
import { Target } from "lucide-react";
// import type { TargetingStrategy } from "@/lib/dashboard/types";
import { TargetingStrategy } from "../../lib/types";

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "action" | "success";
}) {
  const toneClass =
    tone === "action"
      ? "bg-action-tint-bg text-action"
      : tone === "success"
        ? "bg-success/10 text-success"
        : "bg-border/30 text-ink";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${toneClass}`}
    >
      {children}
    </span>
  );
}

export default function TargetingStrategyCard({
  targeting,
}: {
  targeting: TargetingStrategy;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <Target size={16} />
        </span>
        <p className="font-heading text-base font-bold text-ink">
          Targeting &amp; Strategy
        </p>
      </div>

      <div className="mt-4 space-y-4 text-sm">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Target audience
          </p>
          <p className="mt-1 italic text-secondary">
            "{targeting.targetAudience}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Niche
            </p>
            <p className="mt-1 font-medium text-ink">{targeting.niche}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Max following
            </p>
            <p className="mt-1 font-medium text-ink">
              {targeting.maxFollowing}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Target gender
            </p>
            <p className="mt-1 font-medium text-ink">
              {targeting.targetGender}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Location accuracy
            </p>
            <p className="mt-1 font-medium text-ink">
              {targeting.locationAccuracy}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Goals
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {targeting.goals.map((g) => (
              <Chip key={g}>{g}</Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Locations
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {targeting.locations.map((l) => (
              <Chip key={l} tone="action">
                {l}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Inspirational profiles
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {targeting.inspirationalProfiles.map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Hashtags
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {targeting.hashtags.map((h) => (
              <Chip key={h} tone="success">
                {h}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Additional info
          </p>
          <p className="mt-1 text-secondary">{targeting.additionalInfo}</p>
        </div>
      </div>
    </div>
  );
}
