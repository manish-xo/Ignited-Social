"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  MANAGER,
  cycleOf,
  msUntilNextCycle,
  workflowsFor,
  type Task,
} from "./managerCards";

// Re-check the day at the 12 PM IST switch, and whenever the tab comes back
// into view (timers can be paused while a laptop sleeps).
function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        onChange();
        schedule();
      },
      msUntilNextCycle(Date.now()) + 1000,
    );
  };
  const onVisible = () => {
    if (document.visibilityState === "visible") {
      onChange();
      schedule();
    }
  };
  schedule();
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

// The page is prerendered, so the day is only known in the browser. The server
// renders day 0; this section sits below the fold, so the swap isn't seen.
const useCycle = () =>
  useSyncExternalStore(
    subscribe,
    () => cycleOf(Date.now()),
    () => 0,
  );

/**
 * The Brand Manager card. The manager stays put; next / previous only swap
 * the workflow underneath (today's special one first, then 5 from the pool).
 */
export default function ManagerCard() {
  const cycle = useCycle();
  const workflows = workflowsFor(cycle);
  // Reset to the special workflow when the day changes.
  const [view, setView] = useState({ cycle, index: 0, dir: 1 });
  const index = view.cycle === cycle ? view.index : 0;
  const workflow = workflows[index];

  const go = (dir: 1 | -1) =>
    setView({
      cycle,
      index: (index + dir + workflows.length) % workflows.length,
      dir,
    });

  return (
    <MotionConfig reducedMotion="user">
      <div className="rounded-[22px] border border-border bg-white p-5 shadow-[0_1px_0_rgba(34,31,27,0.04),0_18px_40px_-28px_rgba(34,31,27,0.35)] sm:p-6">
        {/* ── profile (fixed) ─────────────────────────────────────── */}
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <Image
              src={MANAGER.photo}
              alt={MANAGER.name}
              width={112}
              height={112}
              className="h-14 w-14 rounded-xl object-cover ring-1 ring-ink/10"
            />
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[2.5px] border-white bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-semibold tracking-tight text-ink">
              {MANAGER.name}
            </p>
            <p className="text-xs text-secondary">
              {MANAGER.role} · <span className="text-emerald-700">online</span>
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 divide-x divide-border rounded-xl bg-subtle-bg py-3">
          {[
            [MANAGER.accounts, "accounts managed"],
            [MANAGER.experience, "experience"],
          ].map(([value, label]) => (
            <div key={label} className="px-4">
              <dt className="sr-only">{label}</dt>
              <dd className="text-base font-semibold tracking-tight text-ink">
                {value}
              </dd>
              <dd className="text-[11px] text-secondary">{label}</dd>
            </div>
          ))}
        </dl>

        {/* ── today's workflow (changes with the arrows) ────────────── */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
              Today&apos;s workflow
            </p>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          {/* All six are stacked in one cell (invisibly) so the box keeps
              the tallest one's height and never jumps between clicks. */}
          <div className="relative mt-4 grid overflow-hidden">
            {workflows.map((w, i) => (
              <div
                key={`ghost-${i}`}
                aria-hidden
                className="invisible [grid-area:1/1]"
              >
                <WorkflowList completed={w.completed} later={w.later} />
              </div>
            ))}
            <AnimatePresence initial={false} custom={view.dir} mode="popLayout">
              <motion.div
                key={`${cycle}-${index}`}
                custom={view.dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
                  show: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                }}
                initial="enter"
                animate="show"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="[grid-area:1/1]"
              >
                <WorkflowList
                  completed={workflow.completed}
                  later={workflow.later}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <p aria-live="polite" className="sr-only">
            Workflow {index + 1} of {workflows.length}
          </p>
        </div>
      </div>

      {/* ── prev / next, below the card ──────────────────────────── */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <NavButton label="Previous workflow" onClick={() => go(-1)}>
          <ChevronLeft size={17} />
        </NavButton>
        <span className="w-10 text-center font-mono text-xs tabular-nums text-muted">
          {index + 1}/{workflows.length}
        </span>
        <NavButton label="Next workflow" onClick={() => go(1)}>
          <ChevronRight size={17} />
        </NavButton>
      </div>
    </MotionConfig>
  );
}

function WorkflowList({
  completed,
  later,
}: {
  completed: Task[];
  later: Task[];
}) {
  return (
    <div className="space-y-4">
      <Group title="Completed today" count={completed.length}>
        {completed.map((t) => (
          <Row key={t.text} task={t} done />
        ))}
      </Group>
      <Group title="Scheduled for later" count={later.length}>
        {later.map((t) => (
          <Row key={t.text} task={t} />
        ))}
      </Group>
    </div>
  );
}

function Group({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] text-muted">
        {title} · {count}
      </p>
      {/* thin line down the left joins the steps like a timeline */}
      <ul className="relative space-y-0.5 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-border">
        {children}
      </ul>
    </div>
  );
}

function Row({ task, done = false }: { task: Task; done?: boolean }) {
  return (
    <li className="relative flex items-start gap-3 py-1.5">
      <span
        className={`relative mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full ${
          done
            ? "bg-ink text-white"
            : "border border-dashed border-muted bg-white"
        }`}
      >
        {done && <Check size={9} strokeWidth={3.5} aria-hidden />}
      </span>
      <span
        className={`flex-1 text-[13px] leading-snug ${
          done ? "text-ink" : "text-secondary"
        }`}
      >
        {task.text}
      </span>
      <span className="shrink-0 pt-px text-[11px] tabular-nums text-muted">
        {task.time}
      </span>
    </li>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition-all duration-200 hover:border-action hover:bg-action hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 active:scale-95 active:border-action-active active:bg-action-active active:text-white"
    >
      {children}
    </button>
  );
}
