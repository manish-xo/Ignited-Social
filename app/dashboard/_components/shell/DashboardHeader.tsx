"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import InstagramAvatar from "@/components/custom/InstagramAvatar";
import { supportMailto } from "../../lib/support";
import type { DashboardShellData } from "../../lib/types";
import { StatusChip } from "../ui";
import { activeNav } from "./nav";

export default function DashboardHeader({
  shell,
}: {
  shell: DashboardShellData;
}) {
  const page = activeNav(usePathname());
  const username = shell.instagramUsername?.replace(/^@/, "") ?? "";

  return (
    <header className="glass flex flex-col gap-4 rounded-[28px] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3.5">
        <div className="rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px] shadow-[0_8px_20px_-10px_rgba(219,39,119,0.6)]">
          <InstagramAvatar
            src={shell.profilePicUrl}
            username={username || "?"}
            size={48}
            className="border-2 border-white"
            fallbackClassName="bg-white text-sm font-bold text-ink"
          />
        </div>
        <div className="min-w-0">
          <h1 className="font-heading-condensed text-2xl font-bold leading-none tracking-tight text-ink sm:text-[28px]">
            {page.title}
          </h1>
          <p className="mt-1 truncate text-xs text-secondary sm:text-sm">
            {username ? (
              <>
                <span className="font-semibold text-ink">@{username}</span>
                <span className="mx-1.5 text-placeholder">·</span>
              </>
            ) : null}
            {page.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {shell.planName && (
          <span className="rounded-full bg-action/10 px-3 py-1.5 text-xs font-semibold text-action ring-1 ring-action/15">
            {shell.planName} plan
          </span>
        )}
        <StatusChip status={shell.subscriptionStatus} className="py-1.5" />
        <a
          href={supportMailto(
            "Question about my account",
            username ? `Instagram: @${username}\n\n` : undefined,
          )}
          className="group ml-auto inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-white shadow-[0_10px_24px_-12px_rgba(34,31,27,0.7)] transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-action sm:ml-2"
        >
          <MessageCircle
            size={15}
            className="transition-transform duration-300 group-hover:-rotate-12"
          />
          Chat with us
        </a>
      </div>
    </header>
  );
}
