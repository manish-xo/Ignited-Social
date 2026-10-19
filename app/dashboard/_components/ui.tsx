import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  tone = "glass",
}: {
  children: ReactNode;
  className?: string;
  tone?: "glass" | "action";
}) {
  return (
    <section
      data-reveal
      className={cn(
        "rounded-3xl p-5 sm:p-6",
        tone === "action" ? "glass-action text-white" : "glass",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-action/10 text-action ring-1 ring-action/10">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="font-heading text-base font-bold tracking-tight text-ink">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

const STATUS: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-success-bg text-success-ink" },
  APPROVED: { label: "Starting", className: "bg-info-bg text-info-ink" },
  APPROVAL_PENDING: { label: "Pending", className: "bg-warning-bg text-warning-ink" },
  SUSPENDED: { label: "Paused", className: "bg-warning-bg text-warning-ink" },
  CANCELLED: { label: "Cancelled", className: "bg-danger-bg text-danger-ink" },
  EXPIRED: { label: "Expired", className: "bg-danger-bg text-danger-ink" },
  paid: { label: "Paid", className: "bg-success-bg text-success-ink" },
  pending: { label: "Pending", className: "bg-warning-bg text-warning-ink" },
  failed: { label: "Failed", className: "bg-danger-bg text-danger-ink" },
  refunded: { label: "Refunded", className: "bg-info-bg text-info-ink" },
};

export function StatusChip({
  status,
  className,
}: {
  status: string | null;
  className?: string;
}) {
  const s = (status && STATUS[status]) || {
    label: status ? status.charAt(0) + status.slice(1).toLowerCase() : "Unknown",
    className: "bg-subtle-bg text-secondary",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        s.className,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className="text-sm text-placeholder">{children}</span>;
}
