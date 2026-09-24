import { CheckCircle2 } from "lucide-react";
import { getPlan } from "@/lib/plans";
import { UPSELL_OFFERS } from "@/lib/upsells";
import ProfileImpactPanel from "@/components/payment/ProfileImpactPanel";
import UpsellSelector from "./UpsellSelector";

interface SuccessPageProps {
  searchParams: Promise<{
    plan?: string;
    customer?: string;
    username?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);
  const customerId = params.customer ?? "";
  const username = params.username ?? "yourhandle";

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ===== LEFT — why-this-matters panel ===== */}
      <div className="bg-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <ProfileImpactPanel />
      </div>

      {/* ===== RIGHT — upsell offer ===== */}
      <div className="bg-canvas relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-lg mt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 size={18} />
            Payment confirmed
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Double your follow-back rate with on-brand content.
          </h1>
          <p className="mt-3 text-sm text-secondary">
            Your growth manager brings the right visitors to your profile.
            Content Creation gives them a reason to stay.
          </p>

          <UpsellSelector
            offers={UPSELL_OFFERS.map((o) => ({
              slug: o.slug,
              name: o.name,
              recommended: o.recommended ?? false,
              monthlyPrice: o.monthlyPrice,
              discountPct: o.discountPct,
              features: o.features,
            }))}
            customerId={customerId}
            plan={plan.slug}
            username={username}
          />
        </div>
      </div>
    </div>
  );
}
