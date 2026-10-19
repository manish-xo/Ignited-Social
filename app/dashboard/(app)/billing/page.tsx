import { getDashboardUser } from "../../lib/session";
import { getBillingData } from "../../lib/get-billing-data";
import Reveal from "../../_components/Reveal";
import PlanHero from "../../_components/billing/PlanHero";
import SubscriptionsCard from "../../_components/billing/SubscriptionsCard";
import BillingDetailsCard from "../../_components/billing/BillingDetailsCard";
import PaymentHistoryCard from "../../_components/billing/PaymentHistoryCard";
import OffersCard from "../../_components/billing/OffersCard";

export default async function BillingPage() {
  const [data, { instagramUsername }] = await Promise.all([
    getBillingData(),
    getDashboardUser(),
  ]);
  const main = data.subscriptions.find((s) => s.kind === "plan");

  return (
    <Reveal className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0 space-y-5">
        {data.plan && (
          <PlanHero
            plan={data.plan}
            main={main}
            nextBillingDate={data.nextBillingDate}
            monthlyTotal={data.monthlyTotal}
            paypalManageUrl={data.paypalManageUrl}
          />
        )}
        <PaymentHistoryCard
          payments={data.payments}
          paypalReachable={data.paypalReachable}
          paypalManageUrl={data.paypalManageUrl}
        />
        <OffersCard offers={data.offers} username={instagramUsername} />
      </div>

      <div className="min-w-0 space-y-5">
        <SubscriptionsCard
          subscriptions={data.subscriptions}
          monthlyTotal={data.monthlyTotal}
        />
        <BillingDetailsCard
          billing={data.billing}
          paypalManageUrl={data.paypalManageUrl}
        />
      </div>
    </Reveal>
  );
}
