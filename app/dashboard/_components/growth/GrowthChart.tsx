"use client";

import { useMemo, useState } from "react";
import { BarChart3, LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { EvilLineChart } from "@/components/evilcharts/charts/recharts-line-chart";
import type { ChartConfig } from "@/components/evilcharts/ui/recharts-chart";
import { cn } from "@/lib/utils";
import { formatDate } from "../../lib/format";
import type { ChartData, ChartMetric, ChartRange } from "../../lib/types";
import SegmentedTabs from "../SegmentedTabs";
import { CardHeader, GlassCard } from "../ui";

const METRICS: { id: ChartMetric; label: string }[] = [
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
  { id: "growth", label: "Growth" },
];

const RANGES: { id: ChartRange; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "4w", label: "4 weeks" },
  { id: "12m", label: "12 months" },
];

const RANGE_TEXT: Record<ChartRange, string> = {
  "7d": "in the last 7 days",
  "4w": "in the last 4 weeks",
  "12m": "in the last 12 months",
};

// Line colors from the action ramp; the line fades light → deep along its length.
const LINE_COLORS: Record<ChartMetric, string[]> = {
  followers: ["#9f97ed", "#5a4ce0"],
  following: ["#bab4f2", "#6a5ee3"],
  growth: ["#7e73e7", "#2f7d4f"],
};

const compact = (v: number) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(v);

export default function GrowthChart({
  data,
  hasStats,
  trackingSince,
}: {
  data: ChartData | null;
  hasStats: boolean;
  trackingSince: string | null;
}) {
  const [metric, setMetric] = useState<ChartMetric>("followers");
  const [range, setRange] = useState<ChartRange>("4w");

  const points = useMemo(
    () => data?.[range]?.[metric] ?? [],
    [data, range, metric],
  );

  const config = useMemo(
    () =>
      ({
        value: {
          label: METRICS.find((m) => m.id === metric)?.label,
          colors: { light: LINE_COLORS[metric] },
        },
      }) satisfies ChartConfig,
    [metric],
  );

  // Change over the selected range, for the summary line above the chart.
  const change =
    points.length > 1 ? points[points.length - 1].value - points[0].value : null;

  return (
    <GlassCard className="flex flex-col">
      <CardHeader
        icon={LineChart}
        title="Growth chart"
        subtitle="Updates every day as your account grows."
      />

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SegmentedTabs
          label="Metric"
          options={METRICS}
          value={metric}
          onChange={setMetric}
        />
        <SegmentedTabs
          label="Range"
          options={RANGES}
          value={range}
          onChange={setRange}
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        {change !== null ? (
          <p className="flex items-center gap-1.5 text-sm text-secondary">
            {change >= 0 ? (
              <TrendingUp size={15} className="text-success" />
            ) : (
              <TrendingDown size={15} className="text-danger" />
            )}
            <span
              className={cn(
                "font-semibold",
                change >= 0 ? "text-success" : "text-danger",
              )}
            >
              {change > 0 ? "+" : ""}
              {change.toLocaleString("en-US")}
            </span>
            {metric === "following" ? "following" : "followers"}{" "}
            {RANGE_TEXT[range]}
          </p>
        ) : (
          points.length === 1 && (
            <p className="text-sm text-secondary">
              First snapshot
              {trackingSince ? ` on ${formatDate(trackingSince)}` : ""}. The
              line grows with a new point every day.
            </p>
          )
        )}

        <div className="relative mt-3 h-64 sm:h-72">
          {points.length > 0 ? (
            <EvilLineChart
              // Remount on switch so the line replays its draw-in.
              key={`${metric}-${range}`}
              config={config}
              data={points}
              curveType="monotone"
              animationType="left-to-right"
              className="aspect-auto h-full w-full"
              chartProps={{ margin: { top: 12, right: 12, left: 0, bottom: 0 } }}
            >
              <EvilLineChart.Grid stroke="rgba(34,31,27,0.08)" />
              <EvilLineChart.XAxis dataKey="label" />
              <EvilLineChart.YAxis
                domain={["auto", "auto"]}
                tickFormatter={compact}
              />
              <EvilLineChart.Tooltip variant="frosted-glass" roundness="xl" />
              <EvilLineChart.Line dataKey="value" strokeWidth={2.5} glowing>
                <EvilLineChart.Dot variant="border" />
                <EvilLineChart.ActiveDot variant="colored-border" />
              </EvilLineChart.Line>
            </EvilLineChart>
          ) : (
            <div className="glass-inset absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-action/10 text-action">
                <BarChart3 size={20} />
              </span>
              <p className="mt-3 font-heading text-sm font-bold text-ink">
                {hasStats
                  ? "No snapshots in this range yet"
                  : "We can't read your stats yet"}
              </p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-secondary">
                {hasStats
                  ? "Try a longer range."
                  : "As soon as we can reach your Instagram account, your numbers and chart appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
