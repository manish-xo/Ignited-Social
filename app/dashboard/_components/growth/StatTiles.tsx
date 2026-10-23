import { FileImage, TrendingUp, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "../../lib/format";
import type { GrowthStats } from "../../lib/types";
import CountUp from "../CountUp";

interface Tile {
  label: string;
  value: number | null;
  icon: LucideIcon;
  caption: string;
  sign?: boolean;
}

export default function StatTiles({
  stats,
  trackingSince,
}: {
  stats: GrowthStats;
  trackingSince: string | null;
}) {
  const tiles: Tile[] = [
    {
      label: "Followers",
      value: stats.followers,
      icon: Users,
      caption: "People following you",
    },
    {
      label: "Total growth",
      value: stats.totalGrowth,
      icon: TrendingUp,
      caption: trackingSince
        ? `Since ${formatDate(trackingSince)}`
        : "Starts after your second snapshot",
      sign: true,
    },
    {
      label: "Following",
      value: stats.following,
      icon: UserPlus,
      caption: "Accounts you follow",
    },
    {
      label: "Posts",
      value: stats.posts,
      icon: FileImage,
      caption: "On your profile",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {tiles.map(({ label, value, icon: Icon, caption, sign }) => (
        <div
          key={label}
          data-reveal
          className="glass group rounded-3xl p-4 transition-colors duration-300 hover:border-border-strong sm:p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted">{label}</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-ink">
              <Icon size={15} />
            </span>
          </div>
          <CountUp
            value={value}
            prefixSign={sign}
            className={cn(
              "mt-3 block font-heading-condensed text-[34px] font-bold leading-none tracking-tight sm:text-[40px]",
              sign && value !== null && value > 0 ? "text-success" : "text-ink",
            )}
          />
          <p className="mt-2 truncate text-[11px] text-placeholder">
            {caption}
          </p>
        </div>
      ))}
    </div>
  );
}
