import { Check, CheckCircle2 } from "lucide-react";
import { ADDON_OFFERS } from "../../lib/addons";
import EngagementPanel from "../../components/payment/EngagementPanel";
import AddonSelector from "./AddonSelector";

interface AddonsPageProps {
  searchParams: Promise<{
    plan?: string;
    customer?: string;
    username?: string;
  }>;
}

export default async function PaymentAddonsPage({
  searchParams,
}: AddonsPageProps) {
  const params = await searchParams;
  const plan = params.plan ?? "";
  const customerId = params.customer ?? "";
  const username = params.username ?? "yourhandle";

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ===== LEFT — why engagement matters ===== */}
      <div className="bg-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <EngagementPanel />
      </div>

      {/* ===== RIGHT — add-on picker ===== */}
      <div className="bg-canvas mt-6 relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-2 text-xs font-[500] text-green-500">
            <span className="w-[1rem] h-[1rem] flex items-center justify-center rounded-full bg-green-500">
              <Check size={10} color="white" className="stroke-2" />
            </span>
            Payment confirmed
          </div>

          <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-action">
            Suggested for your account
          </p>
          <h1 className="mt-2 tracking-tight text-3xl font-[700] tracking-tighter text-ink sm:text-4xl">
            A couple of small adds that tend to move the numbers.
          </h1>
          <p className="mt-3 text-sm text-secondary">
            Chosen for your niche by your growth manager. Take what's useful,
            skip the rest.
          </p>

          <AddonSelector
            offers={ADDON_OFFERS.map((a) => ({
              slug: a.slug,
              name: a.name,
              monthlyPrice: a.monthlyPrice,
              description: a.description,
              recommended: a.recommended ?? false,
            }))}
            customerId={customerId}
            plan={plan}
            username={username}
          />
        </div>
      </div>
    </div>
  );
}
