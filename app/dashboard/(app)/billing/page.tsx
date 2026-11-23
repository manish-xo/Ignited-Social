import { getDashboardUser } from "../../lib/session";
import { getBillingData } from "../../lib/get-billing-data";
import BillingView from "../../_components/billing/BillingView";

export default async function BillingPage() {
  const [data, { instagramUsername }] = await Promise.all([
    getBillingData(),
    getDashboardUser(),
  ]);

  return <BillingView data={data} instagramUsername={instagramUsername} />;
}
