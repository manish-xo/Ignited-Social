"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Flame, LifeBuoy, Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supportMailto } from "../../lib/support";
import { NAV_ITEMS, activeNav } from "./nav";
import { useSignOut } from "./useSignOut";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const itemClass =
  "group relative z-10 flex w-full flex-col items-center gap-1 rounded-2xl py-2.5 text-[10px] font-semibold transition-colors duration-300";

/** Desktop / tablet rail. Phones get MobileNav instead. */
export default function Sidebar() {
  const pathname = usePathname();
  const active = activeNav(pathname);
  const { signOut, signingOut } = useSignOut();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  // The white pill slides to the active tab.
  useIsoLayoutEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>(
      `[data-href="${active.href}"]`,
    );
    if (!el || !indicatorRef.current) return;
    const to = { y: el.offsetTop, height: el.offsetHeight };
    if (placed.current) {
      gsap.to(indicatorRef.current, { ...to, duration: 0.6, ease: "expo.out" });
    } else {
      gsap.set(indicatorRef.current, to);
      placed.current = true;
    }
  }, [active.href]);

  return (
    <aside className="glass sticky top-4 hidden h-[calc(100dvh-2rem)] w-[88px] shrink-0 flex-col items-center justify-between rounded-[28px] px-3 py-5 md:flex">
      <div className="flex w-full flex-col items-center">
        <Link
          href="/dashboard"
          aria-label="Ignited Social"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-action text-white"
        >
          <Flame size={20} />
        </Link>

        <div className="my-5 h-px w-8 bg-border" />

        <nav ref={navRef} className="relative flex w-full flex-col gap-1.5">
          <span
            ref={indicatorRef}
            aria-hidden
            className="absolute left-0 top-0 w-full rounded-2xl border border-border bg-subtle-bg"
          />
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === active.href;
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  itemClass,
                  isActive ? "text-action" : "text-muted hover:text-ink",
                )}
              >
                <Icon
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <a
          href={supportMailto("Help with my account")}
          className={cn(itemClass, "text-muted hover:bg-subtle-bg hover:text-ink")}
        >
          <LifeBuoy size={19} />
          Help
        </a>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className={cn(
            itemClass,
            "text-muted hover:bg-danger-bg hover:text-danger disabled:opacity-60",
          )}
        >
          {signingOut ? (
            <Loader2 size={19} className="animate-spin" />
          ) : (
            <LogOut size={19} />
          )}
          Log out
        </button>
      </div>
    </aside>
  );
}
