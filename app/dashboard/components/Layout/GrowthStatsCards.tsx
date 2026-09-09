import { TrendingUp } from "lucide-react";
// import type { GrowthStats } from "@/lib/dashboard/types";
import { GrowthStats } from "../../lib/types";

export default function GrowthStatsCards({ stats }: { stats: GrowthStats }) {
  const items = [
    { label: "Total Growth", value: stats.totalGrowth ?? "—" },
    { label: "Followers", value: stats.followers.toLocaleString() },
    { label: "Following", value: stats.following.toLocaleString() },
    { label: "Posts", value: stats.posts.toLocaleString() },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <TrendingUp size={16} />
        </span>
        <p className="font-heading text-base font-bold text-ink">Growth</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted">{item.label}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
