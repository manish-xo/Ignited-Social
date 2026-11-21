"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MANAGERS } from "@/app/service/Components/brandManagers";
import type { CaseStudy } from "../data";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Client photo, or their initials until a photo is added. */
export function Avatar({
  story,
  size = "md",
}: {
  story: CaseStudy;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-10 w-10 text-xs" : "h-12 w-12 text-sm";
  if (!story.photo) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-action-tint bg-action-tint-bg font-semibold text-action",
          box,
        )}
      >
        {initials(story.name)}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full border border-border bg-white",
        box,
      )}
    >
      <Image
        src={story.photo}
        alt=""
        fill
        sizes="48px"
        // The cropped Instagram avatars include the story ring; zoom past it.
        className={cn(
          "object-cover",
          story.photo.endsWith("-avatar.png") && "scale-[1.22]",
        )}
      />
    </span>
  );
}

function Section({
  kicker,
  heading,
  children,
}: {
  kicker: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-border pt-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
      <p className="text-[13px] font-medium text-action">{kicker}</p>
      <div className="min-w-0">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink">
          {heading}
        </h3>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </section>
  );
}

const Paragraphs = ({ items }: { items: string[] }) => (
  <>
    {items.map((p) => (
      <p key={p} className="text-[15px] leading-relaxed text-secondary">
        {p}
      </p>
    ))}
  </>
);

/** "26 May 2025 – 25 Jun 2025" -> "Jun" */
const monthLabel = (dates: string) =>
  dates.split("–").pop()!.trim().split(" ")[1];

function ProgressChart({ story }: { story: CaseStudy }) {
  const { months } = story.progress;
  const max = Math.max(...months.map((m) => m.followers));
  return (
    <figure className="rounded-2xl border border-border bg-white p-5">
      <figcaption className="text-sm font-medium text-ink">
        Followers gained each month
      </figcaption>
      <div
        role="img"
        aria-label={`${story.name}: followers gained by month, from ${months[0].dates.split("–")[0].trim()} to ${months.at(-1)!.dates.split("–").pop()!.trim()}. Highest month: ${max.toLocaleString("en-US")}.`}
        className="mt-5 flex h-40 items-end gap-1 sm:gap-1.5"
      >
        {months.map((m) => (
          <div
            key={m.dates}
            title={`${m.dates}: ${m.followers.toLocaleString("en-US")}`}
            className="group flex h-full min-w-0 flex-1 flex-col justify-end"
          >
            <div
              className={cn(
                "w-full rounded-t-md transition-colors",
                m.followers === max
                  ? "bg-action"
                  : "bg-action/25 group-hover:bg-action/50",
              )}
              style={{ height: `${Math.max(4, (m.followers / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div aria-hidden className="mt-2 flex gap-1 sm:gap-1.5">
        {months.map((m, i) => (
          <span
            key={m.dates}
            className="min-w-0 flex-1 truncate text-center text-[10px] text-muted"
          >
            {/* Every other label when there are many months, so they fit. */}
            {months.length > 12 && i % 2 ? "" : monthLabel(m.dates)}
          </span>
        ))}
      </div>

      <details className="group/table mt-5 border-t border-border pt-4">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-action [&::-webkit-details-marker]:hidden">
          See the numbers
          <ChevronDown
            size={14}
            aria-hidden
            className="transition-transform group-open/table:rotate-180"
          />
        </summary>
        <table className="mt-3 w-full text-sm">
          <caption className="sr-only">
            Exact dates and followers gained for {story.name}
          </caption>
          <thead>
            <tr className="text-left text-xs text-muted">
              <th scope="col" className="pb-2 font-medium">
                Dates
              </th>
              <th scope="col" className="pb-2 text-right font-medium">
                Followers
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {months.map((m) => (
              <tr key={m.dates}>
                <td className="py-2 text-secondary">{m.dates}</td>
                <td className="py-2 text-right tabular-nums text-ink">
                  {m.followers.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/** One full client story. */
export default function CaseStudyArticle({ story }: { story: CaseStudy }) {
  const manager = MANAGERS.find(
    (m) => m.name.split(" ")[0] === story.approach.manager,
  );

  return (
    <article
      aria-labelledby={`${story.slug}-title`}
      className="space-y-10 py-10 first:pt-8"
    >
      {/* ── hero ─────────────────────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-start">
        <div>
          <p className="text-[13px] font-medium text-action">
            {story.specialty}
          </p>
          <h2
            id={`${story.slug}-title`}
            className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:text-4xl"
          >
            {story.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary">
            {story.intro}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar story={story} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {story.name}
                {story.business && (
                  <span className="font-normal text-secondary">
                    {" "}
                    · {story.business}
                  </span>
                )}
              </p>
              <a
                href={`https://www.instagram.com/${story.handle}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-action underline-offset-2 hover:underline"
              >
                @{story.handle}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <aside
          aria-label="The result"
          className="rounded-2xl bg-action-tint-bg p-5"
        >
          <p className="text-[13px] font-medium text-action">The result</p>
          <p className="mt-2 text-5xl font-semibold tabular-nums leading-none tracking-[-0.05em] text-ink">
            {story.gained.toLocaleString("en-US")}
          </p>
          <p className="mt-2 text-sm text-secondary">
            followers gained through daily outreach
          </p>
          <p className="mt-4 border-t border-action-tint pt-3 text-xs text-muted">
            {story.period}
          </p>
        </aside>
      </div>

      {/* ── the starting point ───────────────────────────────── */}
      <Section kicker="The starting point" heading={story.start.heading}>
        <Paragraphs items={story.start.paragraphs} />
        <ul aria-label="Audience" className="flex flex-wrap gap-2 pt-1">
          {story.start.audience.map((a) => (
            <li
              key={a}
              className="rounded-full border border-border bg-white px-3 py-1 text-[13px] text-ink"
            >
              {a}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── the approach ─────────────────────────────────────── */}
      <Section kicker="The approach" heading={story.approach.heading}>
        <Paragraphs items={story.approach.paragraphs} />

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
          {manager?.photo ? (
            <Image
              src={manager.photo}
              alt=""
              width={88}
              height={88}
              className="h-11 w-11 rounded-xl object-cover object-[50%_20%]"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-action-tint-bg text-sm font-semibold text-action"
            >
              {initials(manager?.name ?? story.approach.manager)}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {manager?.name ?? story.approach.manager}
              <span className="font-normal text-secondary">
                {" "}
                · Brand Manager
              </span>
            </p>
            <p className="text-[13px] text-secondary">
              {story.approach.managerFocus}
            </p>
          </div>
        </div>

        <ol className="grid gap-3 pt-1">
          {story.approach.steps.map((s, i) => (
            <li
              key={s.heading}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-action">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-action-tint-bg tabular-nums">
                  {i + 1}
                </span>
                {s.label}
              </p>
              <h4 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.03em] text-ink">
                {s.heading}
              </h4>
              <div className="mt-2 space-y-3">
                <Paragraphs items={s.paragraphs} />
              </div>
              {s.note && (
                <details className="group/note mt-4 rounded-xl bg-subtle-bg px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {s.note.summary}
                    <ChevronDown
                      size={14}
                      aria-hidden
                      className="shrink-0 text-muted transition-transform group-open/note:rotate-180"
                    />
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {s.note.body}
                  </p>
                </details>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* ── the progress ─────────────────────────────────────── */}
      <Section kicker="The progress" heading={story.progress.heading}>
        <Paragraphs items={story.progress.paragraphs} />
        <ProgressChart story={story} />
        {story.progress.update && (
          <div className="pt-2">
            <h4 className="text-lg font-semibold tracking-[-0.03em] text-ink">
              {story.progress.update.heading}
            </h4>
            <div className="mt-2 space-y-3">
              <Paragraphs items={story.progress.update.paragraphs} />
            </div>
          </div>
        )}
      </Section>

      {/* ── in their words ───────────────────────────────────── */}
      <figure className="rounded-2xl border border-border bg-white p-6 md:p-8">
        <blockquote className="text-xl leading-snug tracking-[-0.03em] text-ink md:text-2xl">
          “{story.quote}”
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <Avatar story={story} size="sm" />
          <span className="text-[13px] text-secondary">{story.quoteBy}</span>
        </figcaption>
      </figure>

      {/* ── next step ────────────────────────────────────────── */}
      <section
        aria-label="Your next step"
        className="flex flex-col gap-5 rounded-2xl bg-ink p-6 text-white md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em]">
            {story.close.heading}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            {story.close.body}
          </p>
        </div>
        <Link
          href="/price"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-hover md:self-auto"
        >
          Find my plan
          <ArrowRight size={15} aria-hidden />
        </Link>
      </section>
    </article>
  );
}
