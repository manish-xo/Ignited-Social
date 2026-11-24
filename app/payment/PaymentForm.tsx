"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "@/libs/store";
import { setPayment } from "@/libs/dataslice";
import FullScreenLoader from "@/components/Loader/FullScreenLoader";

interface PaymentFormProps {
  plan: "grow" | "scale";
  planName: string;
  price: number;
  username: string;
  /** The email they signed up with (from the checkout cookie), if known. */
  signupEmail: string;
  trialDays: number;
  /** When PayPal takes the first payment, e.g. "Dec 1, 2026". */
  firstChargeLabel: string;
  paypalPlanId: string;
}

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AE", name: "United Arab Emirates" },
];

const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30";

export default function PaymentForm({
  plan,
  planName,
  price,
  username: usernameFromServer,
  signupEmail,
  trialDays,
  firstChargeLabel,
  paypalPlanId,
}: PaymentFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Fallback for when the checkout cookie is missing: signup also keeps the
  // user in Redux.
  const signup = useAppSelector((state) => state.dataSlice.signup);
  const username = usernameFromServer || signup?.username || "";
  const [fullName, setFullName] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // The account is created with the signup email, so it can't be changed
  // here. Only ask for one if we somehow don't know it.
  const knownEmail = signupEmail || signup?.email || "";
  const email = knownEmail || typedEmail;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = emailValid && fullName.trim().length > 0;

  // PayPalButtons can hold on to the callbacks from its first render, which
  // would see the empty initial form. Read the latest values through a ref.
  const formRef = useRef({ fullName, email, country });
  useEffect(() => {
    formRef.current = { fullName, email, country };
  }, [fullName, email, country]);

  return (
    <div className="mt-8 space-y-6">
      {/* From PayPal closing until the next page opens (or an error). */}
      {submitting && (
        <FullScreenLoader
          title="Confirming your subscription…"
          description="This takes a few seconds. Please don't close or refresh this page."
        />
      )}

      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="payment-email"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Email{" "}
          <span className="font-normal text-muted-foreground">
            for receipts and your login
          </span>
        </label>
        {knownEmail ? (
          <p
            id="payment-email"
            className="rounded-xl border border-border bg-subtle-bg px-3.5 py-3 text-sm text-ink"
          >
            {knownEmail}
          </p>
        ) : (
          <input
            id="payment-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={typedEmail}
            onChange={(e) => setTypedEmail(e.target.value)}
            className={inputClass}
          />
        )}
      </div>

      <div>
        <label
          htmlFor="country"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Country
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={inputClass}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* What they pay and when */}
      <div className="divide-y divide-border rounded-xl border border-border bg-white text-sm">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="font-semibold text-ink">Due today</p>
            <p className="text-xs text-muted">
              {trialDays}-day free trial of {planName}
            </p>
          </div>
          <p className="font-heading text-lg font-bold text-ink">$0.00</p>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="font-medium text-ink">Then {planName}, monthly</p>
            <p className="text-xs text-muted">
              First charge {firstChargeLabel} unless you cancel before
            </p>
          </div>
          <p className="font-medium text-ink">
            ${price.toFixed(2)}
            <span className="text-xs font-normal text-muted">/mo</span>
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      {!formValid && (
        <p className="text-center text-xs text-muted">
          Add your name{knownEmail ? "" : " and email"} above to continue.
        </p>
      )}

      <div>
        <p className="mb-2 text-xs text-muted">
          You&apos;ll approve the subscription in a PayPal window. Pay with your
          PayPal account or a card.
        </p>
        <div
          className={
            !formValid || submitting ? "pointer-events-none opacity-40" : ""
          }
        >
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              vault: true,
              intent: "subscription",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", shape: "pill", label: "subscribe" }}
              createSubscription={(_data, actions) =>
                actions.subscription.create({ plan_id: paypalPlanId })
              }
              onApprove={async (data) => {
                setSubmitting(true);
                setError(null);
                const form = formRef.current;
                try {
                  const { data: res } = await axios.post(
                    "/api/create-subscription",
                    {
                      subscriptionID: data.subscriptionID,
                      plan,
                      email: form.email,
                      fullName: form.fullName,
                      country: form.country,
                      instagramUsername: username || undefined,
                    },
                  );

                  // Saved to Supabase by the API; keep a copy in Redux too
                  // so the upsell/success pages can read it.
                  dispatch(
                    setPayment({
                      paymentId: res.customerId,
                      username,
                      email: form.email,
                      plan,
                      amount: price,
                      paymentMethod: "paypal",
                      status: "active",
                      fullName: form.fullName,
                      country: form.country,
                    }),
                  );

                  const params = new URLSearchParams({
                    plan,
                    customer: res.customerId,
                    username,
                  });
                  // replace: Back mustn't return to the paid-for form.
                  router.replace(
                    `/upsell/payment/success?${params.toString()}`,
                  );
                } catch (err) {
                  const message = axios.isAxiosError(err)
                    ? err.response?.data?.message
                    : undefined;
                  console.error("create-subscription failed:", err);
                  setError(
                    message ??
                      "Something went wrong confirming your subscription.",
                  );
                  setSubmitting(false);
                }
              }}
              onError={(err) => {
                console.error("PayPal SDK error:", err, { paypalPlanId });
                setError("PayPal couldn't complete that. Please try again.");
              }}
              onCancel={(data) => {
                console.warn("PayPal checkout cancelled:", data);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}
