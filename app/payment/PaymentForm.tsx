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
  nextChargeLabel: string;
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

export default function PaymentForm({
  plan,
  planName,
  price,
  username: usernameFromUrl,
  nextChargeLabel,
  paypalPlanId,
}: PaymentFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Signup stores the user in Redux; prefer that over the URL fallback.
  const signup = useAppSelector((state) => state.dataSlice.signup);
  const username = signup?.username || usernameFromUrl;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [postalCode, setPostalCode] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redux rehydrates from localStorage after first render, so prefill the
  // email once it arrives (without overwriting anything already typed).
  useEffect(() => {
    if (signup?.email) setEmail((current) => current || signup.email);
  }, [signup?.email]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid =
    emailValid && fullName.trim().length > 0 && postalCode.trim().length > 0;

  // PayPalButtons can hold on to the callbacks from its first render, which
  // would see the empty initial form. Read the latest values through a ref.
  const formRef = useRef({ fullName, email, country, postalCode, couponCode });
  formRef.current = { fullName, email, country, postalCode, couponCode };

  return (
    <div className="mt-8 space-y-6">
      {/* From PayPal closing until the next page opens (or an error). */}
      {submitting && (
        <FullScreenLoader
          title="Confirming your payment…"
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
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
        />
      </div>

      <div>
        <label
          htmlFor="payment-email"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Email{" "}
          <span className="font-normal text-muted-foreground">
            — for receipts &amp; updates
          </span>
        </label>
        <input
          id="payment-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Billing address
        </label>
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border-0 bg-transparent px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border-0 border-t border-border bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 text-sm">
        <div>
          <p className="font-medium text-ink">{planName} · billed monthly</p>
          <p className="text-xs text-muted">Next charge {nextChargeLabel}</p>
        </div>
        <p className="font-heading font-bold text-ink">${price.toFixed(2)}</p>
      </div>

      <div className="text-sm">
        {!couponOpen ? (
          <button
            type="button"
            onClick={() => setCouponOpen(true)}
            className="text-action underline underline-offset-2"
          >
            Have a coupon? Add code
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
            />
            <button
              type="button"
              onClick={() => setCouponCode(couponInput.trim())}
              className="rounded-xl border border-border px-4 text-sm font-medium text-ink hover:bg-border/30"
            >
              Apply
            </button>
          </div>
        )}
        {couponCode && (
          <p className="mt-1 text-xs text-muted">
            Coupon &ldquo;{couponCode}&rdquo; noted — not yet applied to price.
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      {!formValid && (
        <p className="text-center text-xs text-muted">
          Fill in your name, email, and postal code above to continue.
        </p>
      )}

      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Secure checkout via PayPal
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
                      postalCode: form.postalCode,
                      instagramUsername: username,
                      couponCode: form.couponCode || undefined,
                    },
                  );

                  // Saved to Supabase by the API — keep a copy in Redux too
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
                      postalCode: form.postalCode,
                      couponCode: form.couponCode || undefined,
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
                } catch (err: any) {
                  console.error(
                    "create-subscription failed:",
                    err.response?.data ?? err,
                  );
                  setError(
                    err.response?.data?.message ??
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
