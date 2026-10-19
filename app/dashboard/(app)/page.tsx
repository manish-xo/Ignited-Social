import { getDashboardUser } from "../lib/session";
import { getGrowthData } from "../lib/get-growth-data";
import Reveal from "../_components/Reveal";
import UpdatedAt from "../_components/growth/UpdatedAt";
import StatTiles from "../_components/growth/StatTiles";
import GrowthChart from "../_components/growth/GrowthChart";
import ManagerCard from "../_components/growth/ManagerCard";
import TargetingCard from "../_components/growth/TargetingCard";

export default async function GrowthPage() {
  const [data, { instagramUsername }] = await Promise.all([
    getGrowthData(),
    getDashboardUser(),
  ]);

  return (
    <Reveal className="space-y-5">
      <div data-reveal className="flex items-center justify-between px-1">
        <p className="font-heading text-sm font-bold text-ink">Account stats</p>
        <UpdatedAt iso={data.statsUpdatedAt} />
      </div>

      <StatTiles stats={data.growthStats} trackingSince={data.trackingSince} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <GrowthChart
          data={data.chartDataByRange}
          hasStats={data.growthStats.followers !== null}
          trackingSince={data.trackingSince}
        />
        <ManagerCard
          manager={data.growthManager}
          rating={data.managerRating}
          username={instagramUsername}
        />
      </div>

      <TargetingCard targeting={data.targeting} username={instagramUsername} />
    </Reveal>
  );
}
