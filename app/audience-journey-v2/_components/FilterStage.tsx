"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import type { Niche } from "../data";
import { buildCrowd } from "./crowd";
import { buildFilterJourney } from "./filterTimeline";
import { AudienceCard, Face, FACE, ProfilePhone, ReachOut } from "./Scenes";

const STAGE_HEIGHT = 680;
const WIDE_STAGE = 520;
const NARROW_STAGE = 400;
const STEPS = ["Find your audience", "Reach out", "Get discovered"];

export default function FilterStage({ niche }: { niche: Niche }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const holdsRef = useRef<number[]>([]);
  const syncRef = useRef<() => void>(() => {});
  const userPausedRef = useRef(false);
  const visibleRef = useRef(true);

  const [layout, setLayout] = useState({ width: WIDE_STAGE, scale: 1, panel: 0 });
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(0);

  const { people, kept } = useMemo(() => buildCrowd(niche), [niche]);

  /* Scale the fixed-size stage to its column. */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      const available = panel.clientWidth;
      if (!available) return;
      const width = available < 470 ? NARROW_STAGE : WIDE_STAGE;
      const scale = available / width;
      setLayout((prev) =>
        prev.width === width && prev.scale === scale && prev.panel === available
          ? prev
          : { width, scale, panel: available },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  /* Rebuild the story whenever the niche or stage width changes. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const labels = labelsRef.current;
    if (!root || !labels || !layout.panel) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    setHeld(0);

    const ctx = gsap.context(() => {
      const { tl, sync, holds } = buildFilterJourney({
        root,
        labels: Array.from(labels.children) as HTMLElement[],
        onStep: setStep,
      });
      timelineRef.current = tl;
      holdsRef.current = holds;
      syncRef.current = sync;
      if (prefersReduced) {
        tl.pause().seek(holds[0], false);
        sync();
      } else if (!userPausedRef.current && visibleRef.current) {
        tl.play(0);
      }
    }, [root, labels]);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [niche, layout.panel, layout.width]);

  /* Stop all work while the section is off screen. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        const tl = timelineRef.current;
        if (!tl || reduced) return;
        if (entry.isIntersecting && !userPausedRef.current) tl.play();
        else tl.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, [reduced]);

  const togglePlay = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    const next = !playing;
    userPausedRef.current = !next;
    setPlaying(next);
    if (next) tl.play();
    else tl.pause();
  }, [playing]);

  const replay = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    userPausedRef.current = false;
    setPlaying(true);
    tl.play(0);
  }, []);

  const nextHold = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    const next = (held + 1) % 3;
    setHeld(next);
    tl.pause().seek(holdsRef.current[next], false);
    syncRef.current();
  }, [held]);

  const stageStyle: CSSProperties = {
    width: layout.width,
    height: STAGE_HEIGHT,
    transform: `scale(${layout.scale})`,
    transformOrigin: "0 0",
  };

  const names = kept.map((p) => p.name);
  const statuses = [
    `Step 1 of 3. Find your audience: interests, location and related accounts narrow 14 people down to 4.`,
    `Step 2 of 3. Reach out: your Brand Manager follows and likes ${names.join(", ")}.`,
    `Step 3 of 3. Get discovered: ${names.length} new followers appear on your Instagram profile.`,
  ];

  const button =
    "flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white hover:text-action";

  return (
    <div>
      <div
        ref={panelRef}
        role="group"
        aria-label={`Illustrative animation of the three steps, ${niche.example.toLowerCase()}`}
        className="relative w-full overflow-hidden rounded-[28px] border border-action-tint bg-action-tint-bg/70"
        style={{ height: layout.panel ? STAGE_HEIGHT * layout.scale : STAGE_HEIGHT }}
      >
        <div ref={rootRef} aria-hidden className="absolute left-0 top-0" style={stageStyle}>
          <div
            ref={labelsRef}
            className="absolute left-5 top-[18px] h-[28px] w-[200px]"
          >
            {STEPS.map((s, i) => (
              <span
                key={s}
                className="invisible absolute left-0 top-0 flex h-[28px] items-center gap-2 rounded-lg border border-action-tint bg-white/80 px-2.5 text-[11.5px] font-medium text-ink"
              >
                <span className="font-mono text-[10.5px] text-action">0{i + 1}</span>
                {s}
              </span>
            ))}
          </div>

          <AudienceCard niche={niche} people={people} />
          <ReachOut kept={kept} />
          <ProfilePhone niche={niche} kept={kept} />

          {kept.map((p) => (
            <span
              key={p.key}
              data-traveller
              data-key={p.key}
              className="invisible absolute left-0 top-0 z-30 block rounded-full shadow-[0_10px_20px_-8px_rgba(61,53,122,0.6)]"
              style={{ width: FACE, height: FACE }}
            >
              <Face person={p} size={FACE} />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-3 z-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === step ? "w-5 bg-action" : "w-1.5 bg-action-on-dark"
                }`}
              />
            ))}
          </div>
          <span className="text-[10.5px] text-secondary">Illustrative example</span>
          <div className="flex items-center gap-1">
            {reduced ? (
              <button type="button" onClick={nextHold} aria-label="Show next step" className={button}>
                <SkipForward size={14} aria-hidden />
              </button>
            ) : (
              <>
                <button type="button" onClick={replay} aria-label="Replay animation" className={button}>
                  <RotateCcw size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause animation" : "Play animation"}
                  className={button}
                >
                  {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {statuses[step]}
      </p>
    </div>
  );
}
