import { cookies } from "next/headers";
import { Lock, RotateCcw, ShieldCheck } from "lucide-react";
import { getPlan, TRIAL_DAYS } from "@/lib/plans";
import PlanSummaryPanel from "@/components/payment/PlanSummaryPanel";
import PaymentForm from "./PaymentForm";
import { getPaypalPlanId } from "@/lib/paypal/plans";
import { FLOW_COOKIE, readFlowToken } from "@/lib/flow/session";

interface PaymentPageProps {
  searchParams: Promise<{ plan?: string; username?: string }>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);

  // proxy.ts only lets people here after signup, so the signed checkout
  // cookie holds the email and handle they signed up with.
  const flow = await readFlowToken((await cookies()).get(FLOW_COOKIE)?.value);
  const username = flow?.username || params.username || "";
  const email = flow?.email ?? "";

  // PayPal starts the plan with a free trial, so the first charge is
  // TRIAL_DAYS from today, not a month.
  const firstCharge = new Date();
  firstCharge.setDate(firstCharge.getDate() + TRIAL_DAYS);
  const firstChargeLabel = firstCharge.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ===== LEFT — dark plan summary panel (shared with signup) ===== */}
      <div className="bg-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <PlanSummaryPanel
          plan={plan}
          switchBasePath="/payment"
          username={username || undefined}
        />
      </div>

      {/* ===== RIGHT — payment form ===== */}
      <div className="bg-canvas relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto sticky top-48 max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Payment
          </p>
          <h1 className="mt-3 text-4xl font-[700] tracking-tighter text-ink sm:text-4xl">
            Start your free trial
          </h1>
          <p className="mt-3 text-md text-secondary">
            {username ? (
              <>
                For <span className="font-semibold text-ink">@{username}</span>
                .{" "}
              </>
            ) : null}
            Nothing is charged today.
          </p>

          <PaymentForm
            plan={plan.slug as "grow" | "scale"}
            planName={plan.name}
            price={plan.price}
            username={username}
            signupEmail={email}
            trialDays={TRIAL_DAYS}
            firstChargeLabel={firstChargeLabel}
            paypalPlanId={getPaypalPlanId(plan.slug as "grow" | "scale")}
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Lock size={12} /> Paid securely through PayPal
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw size={12} /> Cancel anytime from your dashboard
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} /> 30-day guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
