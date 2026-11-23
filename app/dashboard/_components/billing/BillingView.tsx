import type { BillingPageData } from "../../lib/types";
import Reveal from "../Reveal";
import PlanHero from "./PlanHero";
import SubscriptionsCard from "./SubscriptionsCard";
import BillingDetailsCard from "./BillingDetailsCard";
import PaymentHistoryCard from "./PaymentHistoryCard";
import OffersCard from "./OffersCard";
import { CancelProvider } from "./CancelSubscriptions";

/**
 * The Billing page layout. Used by the real dashboard page and by the
 * /prototype/billing-paper preview (with `onDemoCancel`, so nothing reaches PayPal).
 */
export default function BillingView({
  data,
  instagramUsername,
  onDemoCancel,
}: {
  data: BillingPageData;
  instagramUsername: string | null;
  /** Preview only: handles cancels instead of PayPal (see CancelProvider). */
  onDemoCancel?: (ids: string[]) => void;
}) {
  const main = data.subscriptions.find((s) => s.kind === "plan");

  return (
    // Lets the plan card and each subscription open the cancel picker.
    <CancelProvider
      subscriptions={data.subscriptions}
      asOf={data.asOf}
      demo={onDemoCancel}
    >
      <Reveal className="space-y-5">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          {data.plan && (
            <PlanHero
              plan={data.plan}
              main={main}
              nextBillingDate={data.nextBillingDate}
              monthlyTotal={data.monthlyTotal}
              paypalManageUrl={data.paypalManageUrl}
              asOf={data.asOf}
            />
          )}
          <BillingDetailsCard
            billing={data.billing}
            paypalManageUrl={data.paypalManageUrl}
          />
        </div>

        {/* Note-paper cards need the full width to sit side by side. */}
        <SubscriptionsCard
          subscriptions={data.subscriptions}
          monthlyTotal={data.monthlyTotal}
          asOf={data.asOf}
        />

        {/* Each full width: side by side, the short payment list and the
            tall add-ons grid left a big empty gap and squeezed the cards. */}
        <PaymentHistoryCard
          payments={data.payments}
          paypalReachable={data.paypalReachable}
          paypalManageUrl={data.paypalManageUrl}
        />
        <OffersCard offers={data.offers} username={instagramUsername} />
      </Reveal>
    </CancelProvider>
  );
}
