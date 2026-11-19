"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, NICHES, type CaseStudy } from "../data";
import CaseStudyArticle, { Avatar } from "./CaseStudyArticle";

const ALL = "all";
/** Cards per "Read more" click: 4 full rows of 3 on desktop, 6 of 2 on tablet. */
const PAGE = 12;

/**
 * Niche sidebar (search at the top, sticky on large screens) beside the case
 * studies. A niche shows one full story, then the niche's other accounts as
 * cards; opening a card swaps the story in place. "All niches" shows a card
 * for every story.
 */
export default function CaseStudiesBrowser() {
  const [selected, setSelected] = useState(ALL);
  const [query, setQuery] = useState("");
  // The story open in the selected niche (its first story by default).
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  // "All niches" shows the cards a page at a time.
  const [shown, setShown] = useState(PAGE);
  const topRef = useRef<HTMLDivElement>(null);

  const niches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? NICHES.filter((n) => n.label.toLowerCase().includes(q)) : NICHES;
  }, [query]);

  const stories =
    selected === ALL
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.nicheSlug === selected);
  const current = NICHES.find((n) => n.slug === selected);
  const open = stories.find((c) => c.slug === openSlug) ?? stories[0];
  const others = stories.filter((c) => c !== open);

  // Start from the top, not halfway down the last story.
  const scrollUp = () => {
    const top = topRef.current;
    if (top && top.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: top.offsetTop - 96, behavior: "smooth" });
    }
  };

  const choose = (slug: string, story: string | null = null) => {
    setSelected(slug);
    setOpenSlug(story);
    if (slug === ALL) setShown(PAGE);
    scrollUp();
  };

  const openStory = (slug: string) => {
    setOpenSlug(slug);
    scrollUp();
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-12 lg:pt-32">
      {/* ── sidebar ─────────────────────────────────────────────── */}
      <aside className="min-w-0 lg:sticky lg:top-28 lg:h-[calc(100vh-8.5rem)]">
        <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-3 shadow-[0_18px_40px_-32px_rgba(34,31,27,0.35)]">
          <label className="relative block">
            <span className="sr-only">Search niches</span>
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search niches"
              className="h-10 w-full rounded-xl border border-border bg-subtle-bg pl-9 pr-9 text-sm text-ink outline-none transition-colors placeholder:text-placeholder focus:border-action/50 focus:bg-white [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink"
              >
                <X size={13} aria-hidden />
              </button>
            )}
          </label>

          {/* data-lenis-prevent: the site's smooth scroll (Lenis) otherwise
              takes every wheel event for the page, so the list never scrolls. */}
          <nav
            aria-label="Niches"
            data-lenis-prevent
            className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:overflow-x-visible lg:px-0"
          >
            {!query && (
              <NicheButton
                label="All niches"
                count={CASE_STUDIES.length}
                active={selected === ALL}
                onClick={() => choose(ALL)}
              />
            )}
            {niches.map((n) => (
              <NicheButton
                key={n.slug}
                label={n.label}
                count={n.count}
                active={selected === n.slug}
                onClick={() => choose(n.slug)}
              />
            ))}
            {niches.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted">
                No niche matches “{query.trim()}”.
              </p>
            )}
          </nav>
        </div>
      </aside>

      {/* ── case studies ────────────────────────────────────────── */}
      <div ref={topRef} className="min-w-0">
        <header className="border-b border-border pb-7">
          <p className="text-[13px] font-medium text-action">Case studies</p>
          <h1 className="mt-2 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink md:text-5xl">
            {current ? current.label : "Real accounts. Real people."}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-secondary">
            {current
              ? `${current.count} ${current.count === 1 ? "story" : "stories"} from clients in this niche.`
              : "How our Brand Managers helped clients reach the people their work is for, with the numbers behind each story."}
          </p>
        </header>

        {selected === ALL ? (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stories.slice(0, shown).map((c) => (
                <StoryCard
                  key={c.slug}
                  story={c}
                  onOpen={() => choose(c.nicheSlug, c.slug)}
                />
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-[13px] text-muted">
                Showing {Math.min(shown, stories.length)} of {stories.length}{" "}
                stories
              </p>
              {shown < stories.length && (
                <button
                  type="button"
                  onClick={() => setShown((n) => n + PAGE)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-ink outline-none transition-colors hover:border-action hover:bg-action hover:text-white focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2"
                >
                  Read more stories
                  <ChevronDown size={15} aria-hidden />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <CaseStudyArticle key={open.slug} story={open} />
            {others.length > 0 && (
              <section
                aria-labelledby="more-stories"
                className="border-t border-border pt-10"
              >
                <h2
                  id="more-stories"
                  className="text-2xl font-semibold tracking-[-0.03em] text-ink"
                >
                  More {current?.label.toLowerCase()} stories
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {others.map((c) => (
                    <StoryCard
                      key={c.slug}
                      story={c}
                      onOpen={() => openStory(c.slug)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NicheButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-action lg:whitespace-normal",
        active
          ? "bg-action text-white"
          : "text-secondary hover:bg-action-tint-bg hover:text-ink",
      )}
    >
      <span className="leading-snug">{label}</span>
      <span
        className={cn(
          "text-xs tabular-nums",
          active ? "text-white/75" : "text-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function StoryCard({
  story,
  onOpen,
}: {
  story: CaseStudy;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 text-left outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-action/40 hover:shadow-[0_18px_40px_-28px_rgba(34,31,27,0.4)] focus-visible:ring-2 focus-visible:ring-action"
    >
      <span className="line-clamp-1 text-xs font-medium text-action">
        {story.specialty.split(" · ")[0]}
      </span>
      <span className="mt-4 flex items-center gap-3">
        <Avatar story={story} size="sm" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">
            {story.business ?? story.name}
          </span>
          <span className="block truncate text-xs text-muted">
            @{story.handle}
          </span>
        </span>
      </span>
      <span className="mt-5 block text-3xl font-semibold tabular-nums tracking-[-0.04em] text-ink">
        +{story.gained.toLocaleString("en-US")}
      </span>
      <span className="text-xs text-secondary">followers gained</span>
      <span className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-secondary">
        “{story.quote}”
      </span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-action">
        Read the story
        <ArrowRight
          size={14}
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </button>
  );
}
