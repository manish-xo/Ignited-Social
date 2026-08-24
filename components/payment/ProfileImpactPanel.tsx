import { Star } from "lucide-react";

// Simple placeholder tile for the before/after grid — swap the `bg-*`
// classes here for real `<img>` thumbnails once you have example content
// to showcase (either stock examples or a real client's before/after set).
function Tile({ tone }: { tone: "flat" | "polished" }) {
  return (
    <div
      className={`aspect-square rounded-lg ${
        tone === "flat"
          ? "bg-white/10"
          : "bg-gradient-to-br from-action/60 to-action/20"
      }`}
    />
  );
}

export default function ProfileImpactPanel() {
  return (
    <div className="mx-auto max-w-xl mt-20">
      <p className="font-heading text-xl font-bold tracking-tight">
        YourBrand.
      </p>

      <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
        Why this matters
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold leading-snug sm:text-3xl">
        Growth starts with{" "}
        <span className="text-action">scroll-stopping content</span>.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Profiles with fresh, on-brand posts convert noticeably more visitors
        into followers than those without. Your growth manager can bring the
        traffic — great content is what makes it stick.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
          Profile impact
        </p>

        <div className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-wide text-white/40">
              Before
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <Tile key={i} tone="flat" />
              ))}
            </div>
            <p className="mt-2 text-xs text-white/50">
              Follow-back <span className="font-semibold text-white">1.8%</span>
            </p>
          </div>

          <div>
            <p className="mb-2 text-[11px] uppercase tracking-wide text-success">
              With content
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <Tile key={i} tone="polished" />
              ))}
            </div>
            <p className="mt-2 text-xs text-white/50">
              Follow-back{" "}
              <span className="font-semibold text-success">4.4%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          &ldquo;Adding Content Creation in month two made a real difference —
          engagement picked up and the quality of new followers improved
          noticeably.&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-action-tint-bg text-[11px] font-bold text-action">
            J
          </div>
          <div>
            <p className="text-xs font-semibold">Jordan A.</p>
            <p className="text-[11px] text-white/40">Apparel brand owner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
