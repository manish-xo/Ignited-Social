"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import {
  AtSign,
  BarChart3,
  Check,
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

function ReviewMockup() {
  return (
    <MockFrame>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Progress review</p>
        <span className="rounded-full bg-subtle-bg px-2 py-0.5 text-[10px] text-secondary">
          Week 4
        </span>
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">
        What we adjusted
      </p>
      <ul className="mt-1.5 divide-y divide-border rounded-lg border border-border text-[11px] text-ink">
        {[
          ["Targeting", "Added 2 accounts your audience follows"],
          ["Outreach", "More focus on your city"],
          ["Content", "Two Reels a week, fewer carousels"],
        ].map(([label, change]) => (
          <li key={label} className="flex items-start gap-2 px-3 py-2">
            <span className="w-16 shrink-0 font-semibold">{label}</span>
            <span className="text-secondary">{change}</span>
          </li>
        ))}
      </ul>

      {/* a message from the manager — the "work through it together" bit */}
      <div className="mt-4 flex items-start gap-2.5">
        <Image
          src="/stock/avatar-2.jpg"
          alt=""
          width={56}
          height={56}
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
        <div className="rounded-xl rounded-tl-sm bg-subtle-bg px-3 py-2 text-[11px] leading-relaxed text-ink">
          Your Reels reach about 3× more new people than your posts. Want to try
          two a week and see how it goes?
        </div>
      </div>
      <div className="mt-2.5 flex justify-end gap-2">
        <span className="rounded-lg border border-border px-2.5 py-1 text-[10px] font-semibold text-ink">
          Let&apos;s talk it through
        </span>
        <span className="rounded-lg bg-action px-2.5 py-1 text-[10px] font-semibold text-white">
          Let&apos;s try it
        </span>
      </div>
    </MockFrame>
  );
}

// ─── Steps ──────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    title: "Tell us what you’re building.",
    body: (
      <p>
        Complete a short form about your brand, your goals and who you want to
        reach. Then connect your Instagram account. About ten minutes, all in.
      </p>
    ),
    mockup: <FormMockup />,
  },
  {
    title: "Your manager gets to work.",
    body: (
      <p>
        They get to know your account, find people likely to care about your
        work and begin the daily outreach that brings them to your profile.
      </p>
    ),
    mockup: <DashboardMockup />,
  },
  {
    title: "Get a clear starting point.",
    body: (
      <p>
        In your first week, you get an account audit and practical
        recommendations on what to improve. Your manager helps you choose where
        to start, with your time and resources in mind.
      </p>
    ),
    mockup: <AuditMockup />,
  },
  {
    title: "Keep things moving, together.",
    body: (
      <p>
        Your manager reviews the progress, adjusts the growth strategy and
        brings you recommendations. When a decision feels difficult, you have
        someone to work through it with.
      </p>
    ),
    mockup: <ReviewMockup />,
  },
];

// ─── The line ───────────────────────────────────────────────────────────────
//
// A straight vertical line runs through the step numbers, starting at the
// first one. It fills from one step's number down to the next.

const NODE = 28; // node diameter (px)

interface Curve {
  width: number;
  height: number;
  /** y and distance along the line of each step's node */
  nodes: { y: number; s: number }[];
  length: number;
}

function buildCurve(width: number, height: number, ys: number[]): Curve {
  const top = ys[0] ?? 0;
  return {
    width,
    height,
    nodes: ys.map((y) => ({ y, s: y - top })),
    length: height - top,
  };
}

/**
 * Left: the four steps on a vertical line that advances on its own — the line
 * grows from the open step's number to the next, and when it gets there the
 * next step opens. Clicking a step jumps to it; hovering pauses.
 * Right: the matching visual.
 */
export default function FirstWeekSteps() {
  const [active, setActive] = useState(0);
  const [curve, setCurve] = useState<Curve | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progressRef = useRef<SVGPathElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const tweenStepRef = useRef(-1); // which step the current tween belongs to
  const visible = useRef(false);
  const hovered = useRef(false);

  const syncPlayback = () => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (visible.current && !hovered.current) tween.resume();
    else tween.pause();
  };

  // Measure the list and work out the arc; redo it whenever the size changes.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const ys = rowRefs.current.map((row) =>
        row ? row.offsetTop + NODE / 2 : 0,
      );
      setCurve(buildCurve(list.clientWidth, list.clientHeight, ys));
    };
    measure();
    // Rows are watched too: as a step opens/closes, the points below it move.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  // Grow the line from this step's point to the next; when it arrives, move on.
  useEffect(() => {
    const path = progressRef.current;
    if (!curve || !path) return;
    const from = curve.nodes[active].s;
    const to = curve.nodes[active + 1]?.s ?? curve.length;
    const offset = (s: number) => curve.length - s;

    // The curve is re-measured while a step opens; keep the line's progress
    // instead of starting this step over each time.
    const carry =
      tweenRef.current && tweenStepRef.current === active
        ? tweenRef.current.progress()
        : 0;
    tweenRef.current?.kill();
    tweenStepRef.current = active;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      gsap.set(path, { strokeDashoffset: offset(from) }); // no auto-advance
      return;
    }
    tweenRef.current = gsap.fromTo(
      path,
      { strokeDashoffset: offset(from) },
      {
        strokeDashoffset: offset(to),
        duration: STEP_DURATION,
        ease: "none",
        paused: true,
        onComplete: () => setActive((i) => (i + 1) % STEPS.length),
      },
    );
    tweenRef.current.progress(carry);
    syncPlayback();

    return () => {
      tweenRef.current?.kill();
    };
  }, [active, curve]);

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

  const arc = curve
    ? `M ${NODE / 2} ${curve.nodes[0].y} V ${curve.height}`
    : "";

  return (
    <div
      ref={rootRef}
      className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-12"
    >
      {/* ── steps on the line ────────────────────────────────────── */}
      <ol
        ref={listRef}
        className="relative space-y-7"
        onMouseEnter={() => {
          hovered.current = true;
          syncPlayback();
        }}
        onMouseLeave={() => {
          hovered.current = false;
          syncPlayback();
        }}
      >
        {curve && (
          <svg
            aria-hidden
            width={curve.width}
            height={curve.height}
            className="pointer-events-none absolute left-0 top-0 overflow-visible"
          >
            {/* track */}
            <path
              d={arc}
              fill="none"
              stroke="var(--color-border-strong)"
              strokeWidth={1.25}
            />
            {/* filled part */}
            <path
              ref={progressRef}
              d={arc}
              fill="none"
              stroke="var(--color-action)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={curve.length}
              strokeDashoffset={curve.length - curve.nodes[active].s}
            />
          </svg>
        )}

        {STEPS.map((step, i) => {
          const isOpen = active === i;
          const isDone = i < active;
          return (
            <li
              key={step.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="relative flex gap-4"
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isOpen ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${step.title}`}
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] tabular-nums transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 ${
                  isOpen
                    ? "bg-action text-white shadow-[0_0_0_5px_rgb(90_76_224/0.14)]"
                    : isDone
                      ? "bg-action text-white"
                      : "border border-border-strong bg-subtle-bg text-muted hover:border-action/50 hover:text-action"
                }`}
              >
                {isDone ? (
                  <Check size={13} strokeWidth={3} aria-hidden />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </button>

              <div className="min-w-0 pb-1">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  tabIndex={-1}
                  aria-expanded={isOpen}
                  aria-controls={`first-week-step-${i}`}
                  className={`text-left text-lg font-semibold leading-7 -tracking-[0.03em] transition-colors duration-500 sm:text-xl ${
                    isOpen ? "text-ink" : "text-ink/40 hover:text-ink/65"
                  }`}
                >
                  {step.title}
                </button>
                {/* only the open step shows its text; smooth height change */}
                <div
                  id={`first-week-step-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pt-2 text-sm leading-relaxed text-secondary transition-all duration-500 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {step.body}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* ── visual ───────────────────────────────────────────────── */}
      <figure>
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
          See your account activity, performance and follower growth in one
          place. Ask your manager about any of it.
        </figcaption>
      </figure>
    </div>
  );
}
