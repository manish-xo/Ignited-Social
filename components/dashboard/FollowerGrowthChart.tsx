"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/line-charts-9";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Share2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

// ============================================================
// DATA — single source of truth for both the chart and the stats bar
// ============================================================
const growthData = [
  { month: "Feb 26", goal: 11000, followers: 10800, followersArea: 10800 },
  { month: "Mar 26", goal: 11400, followers: 11250, followersArea: 11250 },
  { month: "Apr 26", goal: 11800, followers: 11620, followersArea: 11620 },
  { month: "May 26", goal: 12200, followers: 11980, followersArea: 11980 },
  { month: "Jun 26", goal: 12600, followers: 12210, followersArea: 12210 },
  { month: "Jul 26", goal: 13000, followers: 12480, followersArea: 12480 },
];

const chartConfig = {
  goal: { label: "Goal", color: "var(--color-muted)" },
  followers: { label: "Followers", color: "var(--color-action)" },
} satisfies ChartConfig;

// ============================================================
// DERIVED STATS — computed from growthData, never hardcoded
// ============================================================
function getGrowthStats(data: typeof growthData) {
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const monthlyDelta = latest.followers - previous.followers;
  const monthlyDeltaPct = (monthlyDelta / previous.followers) * 100;
  const goalGap = latest.followers - latest.goal;
  const onTrack = goalGap >= 0;

  return {
    totalFollowers: latest.followers,
    monthlyDelta,
    monthlyDeltaPct,
    goalGap: Math.abs(goalGap),
    onTrack,
    latestMonth: latest.month,
  };
}

interface StatItem {
  label: string;
  value: string;
  delta: string;
  isUp: boolean;
}

function buildStats(data: typeof growthData): StatItem[] {
  const s = getGrowthStats(data);

  return [
    {
      label: "Total Followers",
      value: s.totalFollowers.toLocaleString(),
      delta: `+${s.monthlyDelta.toLocaleString()} this month`,
      isUp: s.monthlyDelta >= 0,
    },
    {
      label: "Monthly Growth",
      value: `${s.monthlyDeltaPct >= 0 ? "+" : ""}${s.monthlyDeltaPct.toFixed(1)}%`,
      delta: "vs last month",
      isUp: s.monthlyDeltaPct >= 0,
    },
    {
      label: "Vs Goal",
      value: s.onTrack
        ? `+${s.goalGap.toLocaleString()}`
        : `-${s.goalGap.toLocaleString()}`,
      delta: s.onTrack ? "ahead of target" : "behind target",
      isUp: s.onTrack,
    },
    {
      label: "Current Month",
      value: s.latestMonth,
      delta: "reporting period",
      isUp: true,
    },
  ];
}

// ============================================================
// STATS BAR
// ============================================================
function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 border-b border-hairline px-6 pb-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-subtle-bg/40 p-3.5"
        >
          <p className="text-[11px] font-medium text-muted">{stat.label}</p>
          <p className="mt-1 font-heading text-lg font-bold text-ink">
            {stat.value}
          </p>
          <p
            className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
              stat.isUp ? "text-success-ink" : "text-danger-ink"
            }`}
          >
            {stat.isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {stat.delta}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CHART LABEL + TOOLTIP
// ============================================================
const ChartLabel = ({
  label,
  color = chartConfig.followers.color,
}: {
  label: string;
  color: string;
}) => (
  <div className="flex items-center gap-1.5">
    <div
      className="size-3.5 rounded-full border-4 bg-white"
      style={{ borderColor: color }}
    />
    <span className="text-muted">{label}</span>
  </div>
);

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  const filteredPayload = payload.filter(
    (entry) => entry.dataKey !== "followersArea",
  );
  const goalEntry = filteredPayload.find((e) => e.dataKey === "goal");

  return (
    <div className="min-w-[180px] rounded-lg border border-border bg-white p-3 shadow-sm">
      <div className="mb-2.5 text-xs font-medium tracking-wide text-muted">
        {label}
      </div>
      <div className="space-y-2">
        {filteredPayload.map((entry, index) => {
          const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
          const isFollowers = entry.dataKey === "followers";
          const isSuccess = goalEntry ? entry.value >= goalEntry.value : false;

          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              <ChartLabel
                label={`${config?.label ?? entry.dataKey}:`}
                color={entry.color}
              />
              <span className="font-semibold text-ink">
                {entry.value.toLocaleString()}
              </span>
              {isFollowers && goalEntry && (
                <Badge
                  className={`flex items-center gap-1 border-transparent text-xs ${
                    isSuccess
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  }`}
                >
                  {isSuccess ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                  {Math.abs(
                    ((entry.value - goalEntry.value) / goalEntry.value) * 100,
                  ).toFixed(0)}
                  %
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// CHART TOOLBAR MENU
// ============================================================
function ChartMenu() {
  const items = [
    { icon: Download, label: "Export Data" },
    { icon: Calendar, label: "Change Period" },
    { icon: Filter, label: "Filter Data" },
    { icon: RefreshCw, label: "Refresh" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="-me-1.5 h-8 w-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        {items.map(({ icon: Icon, label }) => (
          <DropdownMenuItem key={label}>
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Share2 className="size-4" />
          Share Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FollowerGrowthChart() {
  const stats = buildStats(growthData);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card className="w-full bg-transparent shadow-none lg:max-w-4xl mx-auto">
        <CardHeader className="min-h-auto border-0 pb-6 pt-6">
          <CardTitle className="text-base font-semibold text-ink">
            Follower Growth
          </CardTitle>
          <CardToolbar>
            <div className="flex items-center gap-4 text-sm">
              <ChartLabel
                label="Followers"
                color={chartConfig.followers.color}
              />
              <ChartLabel label="Goal" color={chartConfig.goal.color} />
            </div>
            <ChartMenu />
          </CardToolbar>
        </CardHeader>

        <StatsBar stats={stats} />

        <CardContent className="flex flex-col items-end px-2.5 pt-6">
          <ChartContainer
            config={chartConfig}
            className="h-[320px] w-full [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
          >
            <ComposedChart
              data={growthData}
              margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="followersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={chartConfig.followers.color}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={chartConfig.followers.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--color-hairline)"
                strokeOpacity={1}
                horizontal
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted)" }}
                dy={5}
                tickMargin={12}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted)" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                domain={["dataMin - 500", "dataMax + 500"]}
                tickMargin={12}
              />

              <ReferenceLine
                x="Jun 26"
                stroke={chartConfig.followers.color}
                strokeWidth={1}
              />

              <ChartTooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "var(--color-border)",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                }}
              />

              <Area
                type="linear"
                dataKey="followersArea"
                stroke="transparent"
                fill="url(#followersGradient)"
                strokeWidth={0}
                dot={false}
              />

              <Line
                type="linear"
                dataKey="followers"
                stroke={chartConfig.followers.color}
                strokeWidth={2}
                dot={{
                  fill: "#fff",
                  strokeWidth: 2,
                  r: 6,
                  stroke: chartConfig.followers.color,
                }}
              />

              <Line
                type="linear"
                dataKey="goal"
                stroke={chartConfig.goal.color}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{
                  fill: "#fff",
                  strokeWidth: 2,
                  r: 6,
                  stroke: chartConfig.goal.color,
                  strokeDasharray: "0",
                }}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
