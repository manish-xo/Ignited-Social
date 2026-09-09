"use client";

import { useDashboardData } from "../components/Layout/DashboardDataProvider";
import GrowthStatsCards from "../components/Layout/GrowthStatsCards";
import GrowthChartCard from "../components/Layout/GrowthChartCard";
import GrowthManagerCard from "../components/Layout/GrowthManagerCard";
import TargetingStrategyCard from "../components/Layout/TargetingStrategyCard";

const GrowthPage = () => {
  const data = useDashboardData();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <GrowthStatsCards stats={data.growthStats} />
        <GrowthChartCard
          hasGrowthHistory={data.hasGrowthHistory}
          chartDataByRange={data.chartDataByRange}
        />
      </div>
      <div className="space-y-5">
        <GrowthManagerCard manager={data.growthManager} />
        <TargetingStrategyCard targeting={data.targeting} />
      </div>
    </div>
  );
};

export default GrowthPage;
