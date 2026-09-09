"use client";

import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import type {
//   ChartMetric,
//   ChartRange,
//   ChartPoint,
// } from "@/lib/dashboard/types";
import { ChartMetric, ChartRange, ChartPoint } from "../../lib/types";

const METRIC_TABS: { id: ChartMetric; label: string }[] = [
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
  { id: "growth", label: "Growth" },
];

const RANGE_TABS: { id: ChartRange; label: string }[] = [
  { id: "7d", label: "Last 7 Days" },
  { id: "4w", label: "Last 4 Weeks" },
  { id: "12m", label: "Last 12 Months" },
];

interface GrowthChartCardProps {
  hasGrowthHistory: boolean;
  chartDataByRange: Record<
    ChartRange,
    Record<ChartMetric, ChartPoint[]>
  > | null;
}

export default function GrowthChartCard({
  hasGrowthHistory,
  chartDataByRange,
}: GrowthChartCardProps) {
  const [metric, setMetric] = useState<ChartMetric>("followers");
  const [range, setRange] = useState<ChartRange>("7d");

  const data = useMemo(
    () => chartDataByRange?.[range]?.[metric] ?? [],
    [chartDataByRange, range, metric],
  );

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <BarChart3 size={16} />
        </span>
        <div>
          <p className="font-heading text-base font-bold text-ink">
            Growth Chart
          </p>
          <p className="text-xs text-muted">
            Exact follower counts also live in your Instagram app's Insights
            tab.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-border p-1">
          {METRIC_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMetric(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                metric === t.id
                  ? "bg-action-tint-bg text-action"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl border border-border p-1">
          {RANGE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setRange(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                range === t.id
                  ? "bg-action-tint-bg text-action"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* text-action + currentColor below means this always matches your
          theme's action color without hardcoding a hex value */}
      <div className="relative mt-5 h-64 text-action">
        {hasGrowthHistory && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e1d8"
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="currentColor"
                strokeWidth={2}
                fill="url(#growthFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-border/10 px-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#efe9df] text-ink">
              <BarChart3 size={18} />
            </span>
            <p className="mt-3 text-sm font-bold text-ink">
              Your growth chart will show up here soon
            </p>
            <p className="mt-1 max-w-xs text-xs text-secondary">
              Once your growth manager's activity starts producing results, this
              fills in automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
