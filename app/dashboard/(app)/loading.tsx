import { SkeletonCard } from "../_components/Skeleton";

export default function GrowthLoading() {
  return (
    <div className="space-y-5">
      <div className="h-5" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="glass h-[132px] animate-pulse rounded-3xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SkeletonCard className="h-[420px]" />
        <SkeletonCard className="h-[420px]" />
      </div>
    </div>
  );
}
