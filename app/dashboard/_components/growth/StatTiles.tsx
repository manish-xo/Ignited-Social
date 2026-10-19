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
  featured?: boolean;
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
      featured: true,
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
      {tiles.map(({ label, value, icon: Icon, caption, featured, sign }) => (
        <div
          key={label}
          data-reveal
          className={cn(
            "group relative overflow-hidden rounded-3xl p-4 transition-[translate] duration-500 hover:-translate-y-1 sm:p-5",
            featured ? "glass-action text-white" : "glass",
          )}
        >
          {featured && (
            <span
              aria-hidden
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/15"
            />
          )}
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "text-xs font-semibold",
                featured ? "text-white/75" : "text-muted",
              )}
            >
              {label}
            </p>
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110",
                featured ? "bg-white/15 text-white" : "bg-action/10 text-action",
              )}
            >
              <Icon size={15} />
            </span>
          </div>
          <CountUp
            value={value}
            prefixSign={sign}
            className={cn(
              "mt-3 block font-heading-condensed text-[34px] font-bold leading-none tracking-tight sm:text-[40px]",
              featured
                ? "text-white"
                : sign && value !== null && value > 0
                  ? "text-success"
                  : "text-ink",
            )}
          />
          <p
            className={cn(
              "mt-2 truncate text-[11px]",
              featured ? "text-white/65" : "text-placeholder",
            )}
          >
            {caption}
          </p>
        </div>
      ))}
    </div>
  );
}
