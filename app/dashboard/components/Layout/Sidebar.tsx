"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, CreditCard, LogOut } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabaseClient";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Growth", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/dashboard/login");
  };

  return (
    <aside className="flex w-20 shrink-0 flex-col items-center justify-between border-r border-border bg-white py-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-action text-lg font-bold text-white">
          Y
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                  active
                    ? "bg-action-tint-bg text-action"
                    : "text-muted hover:bg-border/30 hover:text-ink"
                }`}
              >
                <Icon size={18} />
              </Link>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        aria-label="Sign out"
        className="flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-border/30 hover:text-ink"
      >
        <LogOut size={18} />
      </button>
    </aside>
  );
}
