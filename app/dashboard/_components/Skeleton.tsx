import { cn } from "@/lib/utils";

/** Glass placeholder shown while a tab's data loads. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("glass overflow-hidden rounded-3xl p-5 sm:p-6", className)}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-2xl bg-action/10" />
        <div className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded-full bg-ink/10" />
          <div className="h-2.5 w-40 animate-pulse rounded-full bg-ink/5" />
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <div className="h-3 w-full animate-pulse rounded-full bg-ink/5" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-ink/5" />
        <div className="h-3 w-3/5 animate-pulse rounded-full bg-ink/5" />
      </div>
    </div>
  );
}
