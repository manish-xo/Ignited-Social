"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Lock } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "@/libs/store";
import { setUpsell } from "@/libs/dataslice";

interface OfferView {
  slug: "content-creation" | "content-creation-plus";
  name: string;
  recommended: boolean;
  monthlyPrice: number;
  discountPct: number;
  features: string[];
  paypalPlanId: string;
}

interface UpsellSelectorProps {
  offers: OfferView[];
  customerId: string;
  plan: string;
  username: string;
}

function firstMonthPrice(offer: OfferView) {
  return Math.round(offer.monthlyPrice * (1 - offer.discountPct / 100));
}

export default function UpsellSelector({
  offers,
  customerId,
  plan,
  username: usernameFromUrl,
}: UpsellSelectorProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Payment/signup are in Redux; prefer them over the URL fallback.
  const payment = useAppSelector((state) => state.dataSlice.payment);
  const signup = useAppSelector((state) => state.dataSlice.signup);
  const username = payment?.username || signup?.username || usernameFromUrl;
  const email = payment?.email || signup?.email;

  // Nothing preselected — the client picks one, and can click it again to unselect.
  const [selected, setSelected] = useState<OfferView["slug"] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOffer = offers.find((o) => o.slug === selected);

  // PayPalButtons can hold on to the callbacks from its first render, so read
  // the current selection through a ref.
  const selectedRef = useRef(selectedOffer);
  selectedRef.current = selectedOffer;

  // With or without Content Creation, the next step is the add-ons page.
  const addonsUrl = (upsell?: string) =>
    `/Addons/payment/addons?${new URLSearchParams({
      plan,
      customer: customerId,
      username,
      ...(upsell ? { upsell } : {}),
    }).toString()}`;

  // Skipping still goes through the server, which moves the funnel pass on
  // to the add-ons step (and locks this page).
  const handleSkip = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await axios.post("/api/flow/skip", { step: "upsell" });
      router.replace(addonsUrl());
    } catch (err: any) {
      const next = err.response?.data?.next;
      if (next) return router.replace(next);
      setError("Couldn't continue. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {offers.map((offer) => {
          const isSelected = offer.slug === selected;
          return (
            <button
              key={offer.slug}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                setSelected((current) =>
                  current === offer.slug ? null : offer.slug,
                )
              }
              className={`relative w-full rounded-2xl border-2 p-5 text-left transition-colors ${
                isSelected
                  ? "border-action bg-white shadow-sm"
                  : "border-border bg-white/60 hover:border-border"
              }`}
            >
              {offer.recommended && (
                <span className="absolute -top-3 left-5 rounded-full bg-action px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Recommended
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected ? "border-action" : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-action" />
                    )}
                  </span>
                  <p className="font-heading text-base font-bold text-ink">
                    {offer.name}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted line-through">
                    ${offer.monthlyPrice}
                  </p>
                  <p className="font-heading text-xl font-extrabold text-ink">
                    ${firstMonthPrice(offer)}{" "}
                    <span className="text-xs font-medium text-muted">
                      first mo
                    </span>
                  </p>
                </div>
              </div>

              <p className="ml-8 mt-0.5 text-xs text-muted">
                Then ${offer.monthlyPrice}/mo · cancel anytime
              </p>

              <ul className="ml-8 mt-3 space-y-1.5">
                {offer.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-ink"
                  >
                    <span className="mt-1 text-success">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <span className="ml-8 mt-3 inline-block rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                {offer.discountPct}% OFF your first month
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-border/30 px-4 py-3 text-xs text-muted">
        <Lock size={13} />
        {selectedOffer
          ? `${selectedOffer.name}: $${firstMonthPrice(selectedOffer)} today, then $${selectedOffer.monthlyPrice}/mo. Cancel anytime.`
          : "Select an add-on above to continue."}
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-4">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Secure checkout via PayPal
        </p>
        <div
          className={
            !selectedOffer || submitting ? "pointer-events-none opacity-40" : ""
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
              createSubscription={(_data, actions) => {
                const offer = selectedRef.current;
                if (!offer) {
                  return Promise.reject(new Error("No add-on selected"));
                }
                return actions.subscription.create({
                  plan_id: offer.paypalPlanId,
                });
              }}
              onApprove={async (data) => {
                const offer = selectedRef.current;
                if (!offer) return;
                setSubmitting(true);
                setError(null);
                try {
                  const { data: res } = await axios.post(
                    "/api/upsell/create-subscription",
                    {
                      subscriptionID: data.subscriptionID,
                      offerSlug: offer.slug,
                      parentSubscriptionId: customerId || undefined,
                      email: email || undefined,
                      instagramUsername: username,
                    },
                  );

                  // Saved to Supabase by the API — keep a copy in Redux too.
                  dispatch(
                    setUpsell({
                      upsellId: res.upsellId,
                      parentSubscriptionId: customerId,
                      offer: offer.slug,
                      offerName: offer.name,
                      firstMonthAmount: firstMonthPrice(offer),
                      monthlyAmount: offer.monthlyPrice,
                      username,
                      email: email ?? "",
                      paymentMethod: "paypal",
                      status: "active",
                    }),
                  );

                  router.replace(addonsUrl(offer.slug));
                } catch (err: any) {
                  console.error(
                    "upsell create-subscription failed:",
                    err.response?.data ?? err,
                  );
                  setError(
                    err.response?.data?.message ??
                      "Something went wrong confirming your add-on.",
                  );
                  setSubmitting(false);
                }
              }}
              onError={(err) => {
                console.error("PayPal SDK error (upsell):", err, {
                  offer: selectedRef.current?.slug,
                });
                setError("PayPal couldn't complete that. Please try again.");
              }}
              onCancel={(data) => {
                console.warn("PayPal upsell checkout cancelled:", data);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        disabled={submitting}
        className="mt-2 flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-ink hover:bg-border/20 disabled:opacity-60"
      >
        Continue without content →
      </button>
    </div>
  );
}
