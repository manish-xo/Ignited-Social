export default function EngagementPanel() {
  return (
    <div className="mx-auto max-w-xl mt-20">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/50">
        The engagement loop
      </p>
      <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        Followers stick around when they feel{" "}
        <span className="text-action">noticed</span>.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Comments and DMs are the signals Instagram&apos;s algorithm rewards
        most. A little consistent engagement compounds everything your growth
        manager is already building.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
            Reply-back lift
          </p>
          <p className="mt-2 text-2xl font-bold">+1.6×</p>
          <p className="mt-1 text-xs text-white/50">
            avg. with Targeted Comments
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
            Welcome DM open rate
          </p>
          <p className="mt-2 font-heading text-2xl font-bold">27%</p>
          <p className="mt-1 text-xs text-white/50">from personalized intros</p>
        </div>
      </div>
    </div>
  );
}
