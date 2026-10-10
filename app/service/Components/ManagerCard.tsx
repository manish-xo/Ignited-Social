import Image from "next/image";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Edit the card here.
const MANAGER = {
  name: "Shambhavi Shukhla",
  role: "Personal Brand Manager",
  photo: "/stock/avatar-2.jpg",
};

const STATS: {
  icon: LucideIcon;
  iconBg: string;
  value: string;
  label: string;
}[] = [
  {
    icon: Users,
    iconBg: "bg-gradient-to-br from-violet-400 to-indigo-600",
    value: "50+",
    label: "accounts managed",
  },
  {
    icon: Award,
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    value: "3+ yrs",
    label: "experience",
  },
];

const COMPLETED = [
  "Analyzed top 15 founder profiles in your niche",
  "Published authority thread on Growth Strategy",
  "Replied to 18 high-intent comments",
];

const IN_PROGRESS = "Reaching out to 5 warm leads in DMs";
const QUEUED = { task: "Evening engagement sprint", time: "7:00 PM" };

function GroupLabel({ children, count }: { children: string; count?: number }) {
  return (
    <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
      {children}
      {count !== undefined && (
        <span className="rounded-full bg-border/60 px-1.5 py-px text-[9px] text-secondary">
          {count}
        </span>
      )}
    </p>
  );
}

export default function ManagerCard() {
  return (
    <div className="rounded-3xl border border-border bg-white p-5 shadow-[0_24px_48px_-24px_rgba(34,31,27,0.25)] sm:p-6">
      {/* ── profile ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]">
            <Image
              src={MANAGER.photo}
              alt={MANAGER.name}
              width={128}
              height={128}
              className="h-16 w-16 rounded-[14px] border-2 border-white object-cover"
            />
          </div>
          {/* online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </span>
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-heading text-lg font-bold -tracking-[0.02em] text-ink">
            <span className="truncate">{MANAGER.name}</span>
            <BadgeCheck
              size={17}
              className="shrink-0 fill-sky-500 text-white"
              aria-label="Verified"
            />
          </p>
          <p className="text-xs text-secondary">{MANAGER.role}</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online now
          </p>
        </div>
      </div>

      {/* ── stats ───────────────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {STATS.map(({ icon: Icon, iconBg, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-subtle-bg/70 p-2.5"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${iconBg}`}
            >
              <Icon size={15} strokeWidth={2.25} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink">{value}</span>
              <span className="block text-[11px] text-secondary">{label}</span>
            </span>
          </div>
        ))}
      </div>

      {/* ── today's workflow ────────────────────────────────────── */}
      <div className="mt-6 border-t border-dashed border-border pt-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
            Today&apos;s workflow
          </p>
          <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
            Live
          </span>
        </div>

        {/* completed */}
        <GroupLabel count={COMPLETED.length}>Completed today</GroupLabel>
        <ul className="space-y-1.5">
          {COMPLETED.map((task) => (
            <li
              key={task}
              className="flex items-start gap-2 rounded-xl border border-border/70 bg-white px-2.5 py-2 text-xs text-ink"
            >
              <CheckCircle2
                size={14}
                className="mt-px shrink-0 fill-emerald-500 text-white"
              />
              <span className="text-ink/80 line-through decoration-ink/20">
                {task}
              </span>
            </li>
          ))}
        </ul>

        {/* in progress */}

        {/* queued */}
        <div className="mt-4">
          <GroupLabel>Queued for later</GroupLabel>
          <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-border px-2.5 py-2 text-xs text-secondary">
            <span className="flex items-center gap-2">
              <Clock3 size={14} className="shrink-0 text-sky-500" />
              {QUEUED.task}
            </span>
            <span className="shrink-0 rounded-md bg-subtle-bg px-1.5 py-0.5 font-mono text-[10px] text-ink">
              {QUEUED.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
