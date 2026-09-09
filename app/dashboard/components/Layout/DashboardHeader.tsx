import { MessageCircle } from "lucide-react";

interface DashboardHeaderProps {
  instagramUsername: string;
  campaignStatus: string;
  planName: string;
}

export default function DashboardHeader({
  instagramUsername,
  campaignStatus,
  planName,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-ink">
            {instagramUsername[0]?.toUpperCase() ?? "?"}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Instagram
          </p>
          <p className="text-sm font-bold text-ink">@{instagramUsername}</p>
        </div>

        <div className="hidden h-8 w-px bg-border sm:block" />

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Campaign
          </p>
          <span className="mt-0.5 inline-block rounded-full bg-action-tint-bg px-2.5 py-1 text-xs font-semibold text-action">
            {campaignStatus}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Plan
          </p>
          <span className="mt-0.5 inline-block rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-ink">
            {planName}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-xl bg-action px-4 text-sm font-semibold text-white hover:bg-action-hover"
      >
        <MessageCircle size={15} />
        Chat with us
      </button>
    </div>
  );
}
