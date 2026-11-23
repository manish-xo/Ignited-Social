import BillingCancelPrototype from "./BillingCancelPrototype";

/**
 * /prototype/billing-cancel — a clickable demo of cancelling a plan from the
 * dashboard's Billing page. Fake customer, no PayPal: nothing is charged or
 * cancelled. Used to agree on the flow before building it for real.
 */
export default function Page() {
  return (
    <main className="min-h-dvh bg-canvas font-body px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <BillingCancelPrototype />
      </div>
    </main>
  );
}
