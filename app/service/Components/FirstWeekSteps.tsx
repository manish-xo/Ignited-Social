"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import {
  AtSign,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  Lock,
  Sparkles,
  Target,
} from "lucide-react";

// How long each step stays open before moving to the next (seconds).
const STEP_DURATION = 6;

interface Step {
  title: string;
  body: ReactNode;
  /** Optional real screenshot; otherwise the built-in mockup is shown. */
  image?: string;
  mockup: ReactNode;
}

// ─── Mockups (right side) ───────────────────────────────────────────────────

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-xl border border-border bg-white p-4 shadow-[0_24px_48px_-28px_rgba(34,31,27,0.4)] sm:p-5">
      {children}
    </div>
  );
}

function FormMockup() {
  return (
    <MockFrame>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">
          Tell us about your business
        </p>
        <span className="flex items-center gap-1 rounded-full bg-subtle-bg px-2 py-0.5 text-[10px] text-secondary">
          <Clock3 size={11} /> ~10 min
        </span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-border/60">
        <div className="h-full w-2/3 rounded-full bg-action" />
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Instagram account
          </p>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs text-ink">
            <span className="flex items-center gap-1.5">
              <AtSign size={13} className="text-pink-500" /> yourhandle
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              <Lock size={10} /> Securely connected
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["Niche", "Fitness coaching"],
            ["Location", "London, UK"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                {label}
              </p>
              <div className="rounded-lg border border-border px-3 py-2 text-xs text-ink">
                {value}
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Who you want to reach
          </p>
          <div className="rounded-lg border border-action/40 px-3 py-2 text-xs leading-relaxed text-ink">
            Busy professionals who want to get fit at home
            <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-ink align-middle" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <span className="rounded-lg bg-action px-3 py-1.5 text-[11px] font-semibold text-white">
          Continue
        </span>
      </div>
    </MockFrame>
  );
}

function DashboardMockup() {
  const gradientId = useId(); // unique per copy (mobile + desktop render one each)
  return (
    <MockFrame>
      <div className="flex items-center gap-2.5">
        <Image
          src="/stock/avatar-2.jpg"
          alt=""
          width={64}
          height={64}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-ink">Your Brand Manager</p>
          <p className="flex items-center gap-1 text-[10px] text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Working on your account
          </p>
        </div>
        <span className="rounded-full bg-action-tint-bg px-2 py-0.5 text-[10px] font-semibold text-action">
          Day 3
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Followers", "1,029", "+42"],
          ["Following", "337", ""],
          ["Posts", "136", ""],
        ].map(([label, value, delta]) => (
          <div
            key={label}
            className="rounded-lg border border-border px-2.5 py-2"
          >
            <p className="text-[9px] uppercase tracking-wide text-muted">
              {label}
            </p>
            <p className="text-sm font-bold text-ink">
              {value}
              {delta && (
                <span className="ml-1 text-[9px] font-semibold text-emerald-600">
                  {delta}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-border p-2.5">
        <p className="text-[10px] font-semibold text-ink">Growth</p>
        <svg viewBox="0 0 200 60" className="mt-1 h-16 w-full" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-action)"
                stopOpacity="0.25"
              />
              <stop
                offset="100%"
                stopColor="var(--color-action)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path
            d="M0 52 L25 50 L50 47 L75 44 L100 36 L125 33 L150 22 L175 16 L200 8 L200 60 L0 60Z"
            fill={`url(#${gradientId})`}
          />
          <path
            d="M0 52 L25 50 L50 47 L75 44 L100 36 L125 33 L150 22 L175 16 L200 8"
            fill="none"
            stroke="var(--color-action)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ul className="mt-3 space-y-1.5 text-[11px] text-ink">
        {[
          "Targeting set up",
          "Daily outreach started",
          "First new followers coming in",
        ].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="fill-emerald-500 text-white" />
            {item}
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

function AuditMockup() {
  const rows = [
    {
      label: "Audience",
      score: 82,
      tone: "bg-emerald-500",
      note: "Strong fit",
    },
    { label: "Content", score: 64, tone: "bg-amber-400", note: "Room to grow" },
    { label: "Offer", score: 48, tone: "bg-rose-400", note: "Make it clearer" },
    {
      label: "Positioning",
      score: 71,
      tone: "bg-sky-500",
      note: "Sharpen bio",
    },
  ];
  return (
    <MockFrame>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Sparkles size={14} className="text-action" /> Week-one audit
          </p>
          <p className="text-[10px] text-secondary">
            What&apos;s working and what to improve
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold text-ink">
          <Download size={11} /> Yours to keep
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-ink">{r.label}</span>
              <span className="text-secondary">{r.note}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-border/60">
              <div
                className={`h-full rounded-full ${r.tone}`}
                style={{ width: `${r.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-action-tint-bg p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-bold text-action">
          <Target size={12} /> Top recommendation
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-ink">
          Add a clear booking link and one line on who you help to your bio.
        </p>
      </div>

      <p className="mt-3 flex items-center gap-1 text-[10px] text-muted">
        <BarChart3 size={11} /> Based on your profile, posts and audience
      </p>
    </MockFrame>
  );
}

// ─── Steps ──────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    title: "Tell us about your business.",
    body: (
      <p>
        A short form and a secure account connection. About ten minutes, all in.
      </p>
    ),
    mockup: <FormMockup />,
  },
  {
    title: "Your Brand Manager gets to work.",
    body: (
      <>
        <p>
          Targeting is set up within 24–48 hours. Join over the weekend and we
          start Monday.
        </p>
        <p className="mt-2">
          Most accounts see their first followers within 2–3 days.
        </p>
      </>
    ),
    mockup: <DashboardMockup />,
  },
  {
    title: "Get a clear view of what to improve.",
    body: (
      <p>
        In week one, we audit your audience, content, offer and positioning. The
        audit is yours to keep, even if you leave.
      </p>
    ),
    mockup: <AuditMockup />,
  },
];

/**
 * Left: steps as an accordion that advances on its own — a line fills across
 * the top of the open step, and when it's full the next one opens. Clicking a
 * step jumps to it; hovering the list pauses. Right: the matching visual.
 */
export default function FirstWeekSteps() {
  const [active, setActive] = useState(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const visible = useRef(false);
  const hovered = useRef(false);

  const syncPlayback = () => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (visible.current && !hovered.current) tween.resume();
    else tween.pause();
  };

  // Fill the open step's line; when full, open the next step.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    barRefs.current.forEach((bar, i) => {
      if (bar && i !== active) gsap.set(bar, { scaleX: 0 });
    });
    const bar = barRefs.current[active];
    if (!bar || reduce) return; // reduced motion: no auto-advance

    tweenRef.current?.kill();
    tweenRef.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: STEP_DURATION,
        ease: "none",
        paused: true,
        onComplete: () => setActive((i) => (i + 1) % STEPS.length),
      },
    );
    syncPlayback();

    return () => {
      tweenRef.current?.kill();
    };
  }, [active]);

  // Only run while the section is on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-14"
    >
      {/* ── steps ─────────────────────────────────────────────────── */}
      <div
        onMouseEnter={() => {
          hovered.current = true;
          syncPlayback();
        }}
        onMouseLeave={() => {
          hovered.current = false;
          syncPlayback();
        }}
      >
        {STEPS.map((step, i) => {
          const isOpen = active === i;
          return (
            <div key={step.title} className="relative pb-6 pt-5">
              {/* track + filling progress line */}
              <span className="absolute inset-x-0 top-0 h-px bg-border" />
              <span
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-action"
              />

              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isOpen}
                aria-controls={`first-week-step-${i}`}
                className={`flex w-full items-baseline gap-2.5 text-left text-lg font-semibold -tracking-[0.03em] transition-colors duration-300 sm:text-xl ${
                  isOpen ? "text-ink" : "text-ink/45 hover:text-ink/70"
                }`}
              >
                <span className="tabular-nums">{i + 1}.</span>
                {step.title}
              </button>

              <div
                id={`first-week-step-${i}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`pl-7 pt-3 text-sm leading-relaxed text-secondary transition-all duration-500 sm:text-base ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    {step.body}
                  </div>
                </div>
              </div>

              {/* phones: show the visual under the open step */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 md:hidden ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-5">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt=""
                        width={960}
                        height={640}
                        className="w-full rounded-xl border border-border object-cover"
                      />
                    ) : (
                      step.mockup
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── visual (tablet/desktop) ──────────────────────────────── */}
      <figure className="hidden md:block">
        <div className="rounded-2xl border border-dashed border-ink/20 bg-canvas/70 p-3">
          {/* stacked; the active one fades/scales in */}
          <div className="grid">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={active !== i}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === i
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none translate-y-3 scale-[0.97] opacity-0"
                }`}
              >
                {step.image ? (
                  <Image
                    src={step.image}
                    alt=""
                    width={960}
                    height={640}
                    className="w-full rounded-xl border border-border object-cover"
                  />
                ) : (
                  step.mockup
                )}
              </div>
            ))}
          </div>
        </div>
        <figcaption className="mt-3 text-xs leading-snug text-ink">
          See the work as it happens. Ask your Brand Manager about any of it.
        </figcaption>
      </figure>
    </div>
  );
}
