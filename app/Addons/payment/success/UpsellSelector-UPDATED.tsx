"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowRight, Lock } from "lucide-react";

interface OfferView {
  slug: string;
  name: string;
  recommended: boolean;
  monthlyPrice: number;
  discountPct: number;
  features: string[];
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
  username,
}: UpsellSelectorProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(
    offers.find((o) => o.recommended)?.slug ?? offers[0]?.slug,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOffer = offers.find((o) => o.slug === selected);

  // CHANGED: now goes to the second upsell step (/payment/addons) instead
  // of straight to /dashboard, carrying the same customer/plan/username
  // forward so the add-ons page can also charge the saved card.
  const goToAddons = () => {
    const params = new URLSearchParams({
      plan,
      customer: customerId,
      username,
    });
    router.push(`/payment/addons?${params.toString()}`);
  };

  const handleAdd = async () => {
    if (!selectedOffer) return;
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/upsell/charge", {
        customerId,
        offerSlug: selectedOffer.slug,
      });
      goToAddons();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Couldn't charge your card on file. Please try again.",
      );
      setSubmitting(false);
    }
  };

  const handleSkip = () => goToAddons();

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {offers.map((offer) => {
          const isSelected = offer.slug === selected;
          return (
            <button
              key={offer.slug}
              type="button"
              onClick={() => setSelected(offer.slug)}
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
        Using your card on file. One tap to add.
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={submitting || !selectedOffer}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
      >
        {submitting
          ? "Adding..."
          : selectedOffer
            ? `Add ${selectedOffer.name} — $${firstMonthPrice(selectedOffer)} today`
            : "Select a plan"}
        {!submitting && <ArrowRight size={15} />}
      </button>

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
