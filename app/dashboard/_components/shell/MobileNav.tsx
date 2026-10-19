"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, activeNav } from "./nav";
import { useSignOut } from "./useSignOut";

/** Floating tab bar for phones. */
export default function MobileNav() {
  const active = activeNav(usePathname());
  const { signOut, signingOut } = useSignOut();

  return (
    <nav className="glass fixed inset-x-4 bottom-4 z-40 flex items-center gap-1 rounded-[24px] p-1.5 md:hidden">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === active.href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-[18px] py-3 text-xs font-semibold transition-[background-color,color,box-shadow] duration-300",
              isActive
                ? "bg-white text-action shadow-[0_6px_16px_-8px_rgba(61,53,122,0.5)]"
                : "text-muted",
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={signOut}
        disabled={signingOut}
        aria-label="Log out"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-muted transition-colors hover:bg-danger-bg hover:text-danger disabled:opacity-60"
      >
        {signingOut ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <LogOut size={17} />
        )}
      </button>
    </nav>
  );
}
