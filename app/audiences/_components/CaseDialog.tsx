"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search, X } from "lucide-react";
import { useLenis } from "@/components/providers/lenis-provider";
import {
  ACCOUNTS,
  AUDIENCES,
  audienceById,
  fmt,
  type AudienceId,
} from "../data";

export type DialogView =
  | { kind: "case"; username: string; fromCollection?: boolean }
  | { kind: "collection"; category: AudienceId | "all" };

interface Props {
  view: DialogView | null;
  onChange: (view: DialogView | null) => void;
}

const STEPS = [
  [
    "01 / DIAGNOSIS",
    "Where the account started.",
    "Customer goals, the initial account review and the practical opportunities the manager identified.",
  ],
  [
    "02 / THE DECISIONS",
    "What we worked on. And why.",
    "Specific audience choices, profile improvements and content recommendations, shown with real examples.",
  ],
  [
    "03 / THE PROGRESS",
    "The results, in context.",
    "Paired, dated before-and-after captures and matching records. Add the changes beyond follower growth where the evidence supports them.",
  ],
  [
    "04 / THE PERSON",
    "Meet their Brand Manager.",
    "The person behind the work, with their explanation of how the approach developed for this account.",
  ],
] as const;

/** One modal for both the full-story preview and the case-study collection. */
export default function CaseDialog({ view, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  // Open/close the native dialog with the view, and pause page smooth-scroll
  // so the wheel scrolls the dialog rather than the page behind it.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (view && !d.open) {
      d.showModal();
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else if (!view && d.open) {
      d.close();
    }
    d.scrollTop = 0;
  }, [view, lenis]);

  const onClose = () => {
    lenis?.start();
    document.body.style.overflow = "";
    onChange(null);
  };

  const label =
    view?.kind === "collection"
      ? "Case-study collection · Separate page preview"
      : "The full story · Separate page preview";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (outside the panel) closes.
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="case-dialog-title"
      data-lenis-prevent
      className="m-auto max-h-[88dvh] w-[min(920px,calc(100%-24px))] overflow-y-auto overscroll-contain rounded-[26px] bg-canvas p-0 text-ink shadow-[0_40px_90px_-30px_rgba(23,22,28,0.6)] backdrop:bg-[#17161c]/60 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-canvas/90 px-6 py-3.5 backdrop-blur-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {label}
        </span>
        <button
          type="button"
          autoFocus
          onClick={() => ref.current?.close()}
          aria-label="Close preview"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-ink transition-colors hover:border-action/40 hover:text-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-6 pb-10 pt-8 sm:px-10">
        {view?.kind === "case" && (
          <CaseView
            username={view.username}
            onBack={
              view.fromCollection
                ? () =>
                    onChange({
                      kind: "collection",
                      category:
                        ACCOUNTS.find((a) => a.username === view.username)
                          ?.category ?? "all",
                    })
                : undefined
            }
          />
        )}
        {view?.kind === "collection" && (
          <CollectionView
            initialCategory={view.category}
            onOpen={(username) =>
              onChange({ kind: "case", username, fromCollection: true })
            }
          />
        )}
      </div>
    </dialog>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-action" />
      {children}
    </div>
  );
}

function CaseView({
  username,
  onBack,
}: {
  username: string;
  onBack?: () => void;
}) {
  const a = ACCOUNTS.find((x) => x.username === username);
  if (!a) return null;

  return (
    <>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-action hover:underline"
        >
          <ArrowLeft size={14} aria-hidden /> All case studies
        </button>
      )}

      <Eyebrow>{audienceById(a.category).label}</Eyebrow>

      <div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2
            id="case-dialog-title"
            className="font-heading-condensed text-5xl font-bold leading-none -tracking-[0.04em]"
          >
            {a.displayName}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            @{a.username}
            <br />
            {a.niche}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-action-tint-bg px-5 py-4 sm:text-right">
          <div className="font-heading-condensed text-4xl font-bold leading-none -tracking-[0.04em] text-action">
            +{fmt(a.totalGrowth)}
          </div>
          <small className="mt-1.5 block max-w-[220px] text-[11px] leading-snug text-secondary">
            recorded followers · {a.savedMonths} months of saved growth data
          </small>
        </div>
      </div>

      {a.quote && (
        <div className="mt-8 rounded-2xl bg-ink p-6 text-white">
          <blockquote className="font-heading text-lg font-medium leading-[1.45]">
            “{a.quote}”
          </blockquote>
          <small className="mt-4 block text-[11px] text-white/55">
            Proposed wording for customer approval. Testimonial and growth data
            may cover different periods.
          </small>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {STEPS.map(([step, title, body]) => (
          <section
            key={step}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="font-mono text-[10px] tracking-[0.08em] text-action">
              {step}
            </div>
            <h3 className="mt-3 font-heading text-lg font-semibold leading-snug">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-secondary">
              {body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-muted">
        Page structure preview. The sections above describe material to
        assemble, rather than completed case-study findings. Saved-data months
        are not elapsed service duration. Historical work by the team behind
        Ignited.
      </p>
    </>
  );
}

function CollectionView({
  initialCategory,
  onOpen,
}: {
  initialCategory: AudienceId | "all";
  onOpen: (username: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ACCOUNTS.filter(
      (a) =>
        (category === "all" || a.category === category) &&
        [a.displayName, a.username, a.niche].some((v) =>
          v.toLowerCase().includes(q),
        ),
    );
  }, [query, category]);

  return (
    <>
      <Eyebrow>Explore the work</Eyebrow>
      <h2
        id="case-dialog-title"
        className="mt-5 font-heading-condensed text-5xl font-bold leading-none -tracking-[0.04em]"
      >
        Find a story close to yours.
      </h2>
      <p className="mt-4 max-w-[660px] text-sm leading-relaxed text-muted">
        Browse the 30 accounts selected for this preview. The full collection
        can grow across niches as complete cases are added.
      </p>

      <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
        <label className="flex flex-1 items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 focus-within:border-action/50 focus-within:ring-2 focus-within:ring-action/20">
          <Search size={15} className="text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search cases"
            placeholder="Search a name, handle or niche…"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-placeholder"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as AudienceId | "all")}
          aria-label="Filter by audience"
          className="h-11 rounded-xl border border-border bg-white px-3.5 text-sm outline-none focus:border-action/50 focus:ring-2 focus:ring-action/20"
        >
          <option value="all">All audiences</option>
          {AUDIENCES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-5 text-xs text-muted">
        {results.length} selected account{results.length === 1 ? "" : "s"}
      </p>

      {results.length ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {results.map((a) => (
            <button
              key={a.username}
              type="button"
              onClick={() => onOpen(a.username)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 text-left transition-colors hover:border-action/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action"
            >
              <span className="min-w-0">
                <strong className="block truncate text-sm font-semibold">
                  {a.displayName}
                </strong>
                <small className="block truncate text-[11px] text-muted">
                  @{a.username}
                </small>
                <small className="block truncate text-[11px] text-muted">
                  {a.tag}
                </small>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 font-heading-condensed text-2xl font-bold -tracking-[0.03em] text-action">
                +{fmt(a.totalGrowth)}
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          No matches. Try a different name or niche.
        </p>
      )}
    </>
  );
}
