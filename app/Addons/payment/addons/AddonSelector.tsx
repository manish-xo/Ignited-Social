"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowRight } from "lucide-react";

interface AddonView {
  slug: string;
  name: string;
  monthlyPrice: number;
  description: string;
  recommended: boolean;
}

interface AddonSelectorProps {
  offers: AddonView[];
  customerId: string;
  plan: string;
  username: string;
}

export default function AddonSelector({
  offers,
  customerId,
  plan,
  username,
}: AddonSelectorProps) {
  const router = useRouter();
  // Single selection instead of a Set — only one add-on can be active
  // at a time. null = nothing picked.
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOffer = offers.find((o) => o.slug === selected) ?? null;

  // Clicking the already-selected card deselects it (so "nothing added"
  // stays reachable), clicking a different one swaps the selection —
  // never adds a second one.
  const choose = (slug: string) => {
    setSelected((prev) => (prev === slug ? null : slug));
    console.log(true);
  };

  const goToDashboard = (addedSlug: string | null) => {
    const params = new URLSearchParams({ plan, username });
    if (addedSlug) params.set("addons", addedSlug);
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleAdd = async () => {
    if (!selectedOffer) {
      goToDashboard(null);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/addons/charge", {
        customerId,
        offerSlugs: [selectedOffer.slug],
      });
      goToDashboard(selectedOffer.slug);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Couldn't charge your card on file. Please try again.",
      );
      setSubmitting(false);
    }
  };

  const handleSkip = () => goToDashboard(null);

  return (
    <div className="mt-8">
      <div className="space-y-3">
        {offers.map((offer) => {
          const isSelected = offer.slug === selected;
          return (
            <button
              key={offer.slug}
              type="button"
              onClick={() => choose(offer.slug)}
              className={`w-full rounded-2xl border-2 p-5 text-left transition-colors ${
                isSelected
                  ? "border-action bg-action-tint-bg shadow-sm"
                  : "border-border bg-white/60 hover:border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected ? "border-action" : "border-border bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-action" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm sm:text-[1rem] font-[700] text-ink">
                        {offer.name}
                      </p>
                      {offer.recommended && (
                        <span className="rounded-full bg-action-tint-bg px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-action">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-secondary">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink">
                  ${offer.monthlyPrice}
                  <span className="text-xs font-normal text-muted">/mo</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={`${selectedOffer ? "border-2 border-dashed border-action-on-dark" : "border-2 border-dashed border-action-tint"} mt-4 flex items-center justify-between rounded-xl bg-action/5 px-4 py-4  text-sm`}
      >
        <span className="text-muted">
          {!selectedOffer
            ? "Nothing added — that's fine too"
            : selectedOffer.name}
        </span>
        {selectedOffer && (
          <span className="text-xl font-[800] text-ink">
            ${selectedOffer.monthlyPrice}
            <span className="text-sm font-[400] text-muted">/mo</span>
          </span>
        )}
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={submitting}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
      >
        {submitting
          ? "Adding..."
          : selectedOffer
            ? "Add to my plan"
            : "Continue to setup"}
        {!submitting && <ArrowRight size={15} />}
      </button>

      {selectedOffer && (
        <button
          type="button"
          onClick={handleSkip}
          disabled={submitting}
          className="mt-2 flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-ink hover:bg-border/20 disabled:opacity-60"
        >
          Continue without add-ons
        </button>
      )}

      <p className="mt-3 text-center text-xs text-muted">
        Add-ons bill with your subscription. Remove any time from your
        dashboard.
      </p>
    </div>
  );
}
