import { FileCheck2, Lock, ShieldCheck } from "lucide-react";
import { getPlan } from "@/lib/plans";
import PlanSummaryPanel from "@/components/payment/PlanSummaryPanel";
import PaymentForm from "./PaymentForm";
// import PayPalCheckout from "@/components/PayPalCheckout";

interface PaymentPageProps {
  searchParams: Promise<{ plan?: string; username?: string }>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);

  // In the real flow this comes from the signup step (Redux store / query
  // param). Falling back to a placeholder so this page still renders on
  // its own while signup is being worked on separately.
  const username = params.username ?? "yourhandle";

  const nextChargeDate = new Date();
  nextChargeDate.setMonth(nextChargeDate.getMonth() + 1);
  const nextChargeLabel = nextChargeDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ===== LEFT — dark plan summary panel (shared with signup) ===== */}
      <div className="bg-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <PlanSummaryPanel plan={plan} switchBasePath="/payment" />
      </div>

      {/* ===== RIGHT — payment form ===== */}
      <div className="bg-canvas relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto sticky top-48 max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Payment
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-ink">
            Complete your subscription
          </h1>
          <p className="mt-2 text-sm text-secondary">
            You&apos;re subscribing as{" "}
            <span className="font-semibold text-ink">@{username}</span>.
          </p>

          <PaymentForm
            plan={plan.slug as "grow" | "scale"}
            planName={plan.name}
            price={plan.price}
            username={username}
            nextChargeLabel={nextChargeLabel}
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Lock size={12} /> 256-bit SSL
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} /> 30-day guarantee
            </span>
            <span className="flex items-center gap-1">
              <FileCheck2 size={12} /> PCI DSS
            </span>
            <span>
              Powered by <strong className="text-ink">Stripe</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// const Payment = () => {
//   return (
//     <main>
//       <PayPalCheckout />
//     </main>
//   );
// };

// export default Payment;
