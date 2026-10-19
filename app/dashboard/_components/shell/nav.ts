import { BarChart3, CreditCard } from "lucide-react";

// Growth first, Billing second.
export const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Growth",
    title: "Your growth",
    subtitle: "Followers, reach and what your manager is targeting.",
    icon: BarChart3,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    title: "Plan & billing",
    subtitle: "Your plan, subscriptions and every payment.",
    icon: CreditCard,
  },
] as const;

export const activeNav = (pathname: string) =>
  NAV_ITEMS.find((i) => i.href === pathname) ?? NAV_ITEMS[0];
