import { Image as ImageIcon, ArrowRight } from "lucide-react";
// import type { AddonOffer } from "@/lib/dashboard/types";
import type { AddonOffer } from "../../lib/types";

export default function AddonUpsellCard({ offer }: { offer: AddonOffer }) {
  const firstMonth = Math.round(
    offer.monthlyPrice * (1 - offer.discountPct / 100),
  );

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          Add-on
        </p>
        <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">
          {offer.discountPct}% OFF
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <ImageIcon size={15} />
        </span>
        <p className="font-heading text-base font-bold text-ink">
          {offer.name}
        </p>
      </div>
      <p className="mt-1 text-sm text-secondary">{offer.tagline}</p>

      <div className="mt-3 rounded-xl bg-[#efe9df] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          First month
        </p>
        <p className="mt-1">
          <span className="font-heading text-2xl font-extrabold text-ink">
            ${firstMonth}
          </span>{" "}
          <span className="text-sm text-muted line-through">
            ${offer.monthlyPrice}
          </span>
        </p>
        <p className="mt-0.5 text-xs text-muted">
          Then ${offer.monthlyPrice}/month · cancel anytime
        </p>
      </div>

      <ul className="mt-3 space-y-1.5">
        {offer.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-1 text-success">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-action text-sm font-semibold text-white hover:bg-action-hover"
      >
        Add to my plan
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
