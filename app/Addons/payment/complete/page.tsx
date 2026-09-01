import Link from "next/link";
import { CheckCheck } from "lucide-react";
import Logo from "@/components/Logo/Logo";

interface CompletePageProps {
  searchParams: Promise<{
    plan?: string;
    username?: string;
    addons?: string;
  }>;
}

export default async function PaymentCompletePage({
  searchParams,
}: CompletePageProps) {
  const params = await searchParams;
  const username = params.username ?? "yourhandle";
  const initial = username.replace(/^@/, "")[0]?.toUpperCase() ?? "?";

  const dashboardSetupUrl = `/Dashboard-Setup/Setup?${new URLSearchParams({
    plan: params.plan ?? "",
    username,
    ...(params.addons ? { addons: params.addons } : {}),
  }).toString()}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-md mt-6">
        <p className="mb-3 text-center flex items-center justify-center font-heading text-xl font-bold text-ink">
          <Logo className="" />
        </p>

        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="relative mx-auto h-20 w-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-action-tint-bg text-2xl font-bold text-action">
              {initial}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-success">
              <CheckCheck size={12} className="text-white" />
            </span>
          </div>

          <p className="mt-4 text-[0.65rem] font-[400] uppercase tracking-wider  text-muted">
            @{username.replace(/^@/, "")}
          </p>

          <h1 className="mt-3 text-3xl font-[700] tracking-tighter text-ink sm:text-4xl">
            Setup complete.
          </h1>
          <p className="mt-3 text-sm text-secondary">
            Your subscription is active and your growth manager has your
            campaign queued up. One step left — let's get your dashboard ready
            so you can follow progress from day one.
          </p>

          <div className="mt-6 rounded-2xl bg-[#efe9df] p-5 text-left">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Next step
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              Create your dashboard login. From there we'll tailor your growth
              plan around your goals and audience.
            </p>
          </div>

          <Link
            href={dashboardSetupUrl}
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-action text-sm font-medium text-white transition-colors hover:bg-action-hover"
          >
            Continue to Dashboard Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
