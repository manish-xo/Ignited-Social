import { Plus, Sparkles } from "lucide-react";
import { formatMoney } from "../../lib/format";
import { supportMailto } from "../../lib/support";
import type { OfferCard } from "../../lib/types";
import { CardHeader, GlassCard } from "../ui";

export default function OffersCard({
  offers,
  username,
}: {
  offers: OfferCard[];
  username: string | null;
}) {
  if (offers.length === 0) return null;

  return (
    <GlassCard>
      <CardHeader
        icon={Sparkles}
        title="Grow faster with add-ons"
        subtitle="Tell us which one you'd like and your manager sets it up."
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {offers.map((o) => (
          <div
            key={o.slug}
            className="glass-inset group flex flex-col rounded-2xl p-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(61,53,122,0.5)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-heading text-sm font-bold text-ink">{o.name}</p>
              <p className="shrink-0 font-heading text-sm font-bold text-action">
                {formatMoney(o.monthlyPrice)}
                <span className="text-[11px] font-medium text-muted">/mo</span>
              </p>
            </div>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-secondary">
              {o.description}
            </p>
            <a
              href={supportMailto(
                `Add ${o.name} to my plan`,
                username ? `Instagram: @${username}\n` : undefined,
              )}
              className="mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-action/10 text-xs font-semibold text-action transition-colors duration-300 group-hover:bg-action group-hover:text-white"
            >
              <Plus size={13} />
              Add to my plan
            </a>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
