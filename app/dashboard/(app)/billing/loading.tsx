import { SkeletonCard } from "../../_components/Skeleton";

export default function BillingLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-5">
        <div className="glass-action h-[340px] animate-pulse rounded-3xl" />
        <SkeletonCard className="h-[220px]" />
      </div>
      <div className="space-y-5">
        <SkeletonCard className="h-[260px]" />
        <SkeletonCard className="h-[300px]" />
      </div>
    </div>
  );
}
