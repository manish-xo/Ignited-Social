"use client";

/* eslint-disable @next/next/no-img-element -- decorative avatars inside an animated mockup */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { MapPin, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { DotPattern } from "@/components/ui/DotPattern";
import type { Niche } from "../data";
import { buildJourney } from "./journeyTimeline";
import { Avatar, FeedScreen, PhoneFrame, ProfileScreen, SearchScreen } from "./PhoneScreens";
import { createStage3D, type Stage3D } from "./stage3d";

const STAGE_HEIGHT = 680;
const WIDE_STAGE = 520;
const NARROW_STAGE = 400;

function Bubble({
  kind,
  x,
  y,
  children,
}: {
  kind: string;
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <div
      data-chip={kind}
      className="absolute z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white bg-white/95 px-3 py-2 text-[12px] font-medium text-ink shadow-[0_16px_28px_-14px_rgba(61,53,122,0.7),inset_0_-3px_6px_rgba(90,76,224,0.08)]"
      style={{ left: `calc(50% + var(--spread) * ${x}px)`, top: y }}
    >
      {children}
    </div>
  );
}

function Caption({ index, step, title, sub }: { index: number; step: string; title: string; sub: string }) {
  return (
    <div data-cap className="absolute inset-x-0 top-[12px] text-center" style={{ zIndex: 5 - index }}>
      <p className="text-[17px] font-semibold leading-tight -tracking-[0.01em] text-ink">
        <span className="mr-1.5 font-mono text-[11px] font-medium text-action">{step}</span>
        {title}
      </p>
      <p className="mt-0.5 truncate px-6 text-[11.5px] text-secondary">{sub}</p>
    </div>
  );
}

export default function JourneyStage({ niche }: { niche: Niche }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<Stage3D | null>(null);
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

  /* Scale the fixed-size stage to its column. Narrow columns use a slimmer stage. */
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

  /* The WebGL layer lives as long as the panel. */
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const stage = createStage3D(canvasRef.current);
    stageRef.current = stage;
    const render = () => {
      if (visibleRef.current) stage.render(gsap.ticker.time);
    };
    gsap.ticker.add(render);
    return () => {
      gsap.ticker.remove(render);
      stage.dispose();
      stageRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!layout.panel) return;
    stageRef.current?.resize(
      layout.panel,
      Math.round(STAGE_HEIGHT * layout.scale),
      layout.width,
      STAGE_HEIGHT,
    );
  }, [layout]);

  /* Rebuild the story whenever the niche or stage size changes. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage3d = stageRef.current;
    if (!root || !layout.panel || !stage3d) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    setHeld(0);

    stage3d.clear();
    const ctx = gsap.context(() => {
      const { tl, sync, holds } = buildJourney({
        root,
        stage: stage3d,
        width: layout.width,
        height: STAGE_HEIGHT,
        query: niche.search,
        dots: Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-dot]") ?? []),
        onStep: setStep,
      });
      timelineRef.current = tl;
      holdsRef.current = holds;
      syncRef.current = sync;

      if (prefersReduced) {
        // No autoplay: show each settled step, and let the button move between them.
        tl.pause().seek(holds[0], false);
        sync();
      } else if (!userPausedRef.current && visibleRef.current) {
        tl.play(0);
      }
    }, root);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [niche, layout.panel, layout.width, layout.scale]);

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

  const spread = layout.width === NARROW_STAGE ? 0.72 : 1;
  const stageStyle = {
    width: layout.width,
    height: STAGE_HEIGHT,
    transform: `scale(${layout.scale})`,
    transformOrigin: "0 0",
    "--spread": spread,
  } as CSSProperties;

  const statuses = [
    `Step 1 of 3. Find your audience: searching Instagram and finding someone like ${niche.person}.`,
    `Step 2 of 3. Reach out: your Brand Manager likes ${niche.person}’s photo and follows them.`,
    `Step 3 of 3. Get discovered: ${niche.person} visits your profile and follows you.`,
  ];

  return (
    <div>
      <div
        ref={panelRef}
        role="group"
        aria-label={`Illustrative animation of the three steps, ${niche.example.toLowerCase()}`}
        className="relative w-full overflow-hidden rounded-[28px] border border-action-tint bg-action-tint-bg"
        style={{ height: layout.panel ? STAGE_HEIGHT * layout.scale : STAGE_HEIGHT }}
      >
        <DotPattern className="fill-action/15" />

        <div ref={rootRef} aria-hidden className="absolute left-0 top-0" style={stageStyle}>
          <Caption index={0} step="01" title="Find your audience" sub={niche.example} />
          <Caption
            index={1}
            step="02"
            title="Reach out"
            sub={`Your Brand Manager, on ${niche.person}’s Instagram`}
          />
          <Caption
            index={2}
            step="03"
            title="Get discovered"
            sub={`${niche.person} visits your profile`}
          />

          {/* 01 */}
          <div data-slide="0" className="absolute inset-0 opacity-0">
            <PhoneFrame>
              <SearchScreen niche={niche} />
            </PhoneFrame>
            <Bubble kind="interest" x={-172} y={196}>
              {niche.interests[0]}
            </Bubble>
            <Bubble kind="interest" x={176} y={258}>
              {niche.interests[1]}
            </Bubble>
            <Bubble kind="interest" x={-172} y={356}>
              {niche.interests[2]}
            </Bubble>
            <Bubble kind="place" x={170} y={536}>
              <MapPin size={13} strokeWidth={2.2} className="text-action" />
              {niche.place}
            </Bubble>
          </div>

          {/* 02 */}
          <div data-slide="1" className="absolute inset-0 opacity-0">
            <PhoneFrame>
              <FeedScreen niche={niche} />
            </PhoneFrame>
            <Bubble kind="manager" x={-168} y={430}>
              <img
                src="/stock/avatar-2.jpg"
                alt=""
                className="-ml-1.5 h-7 w-7 rounded-full object-cover"
              />
              <span className="leading-tight">
                Your Brand
                <br />
                Manager
              </span>
            </Bubble>
          </div>

          {/* 03 */}
          <div data-slide="2" className="absolute inset-0 opacity-0">
            <PhoneFrame>
              <ProfileScreen niche={niche} />
            </PhoneFrame>
            <Bubble kind="visitor" x={-168} y={150}>
              <span className="-ml-1.5">
                <Avatar niche={niche} name="portrait" size={28} />
              </span>
              <span className="leading-tight">
                {niche.person}
                <br />
                <span className="text-[10.5px] font-normal text-secondary">is visiting</span>
              </span>
            </Bubble>
            <Bubble kind="followed" x={166} y={392}>
              <span className="-ml-1.5">
                <Avatar niche={niche} name="portrait" size={28} />
              </span>
              <span className="leading-tight">
                {niche.person}
                <br />
                <span className="text-[10.5px] font-normal text-secondary">followed you</span>
              </span>
            </Bubble>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full"
        />

        <div className="absolute inset-x-4 bottom-3 z-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} data-dot className="block h-1.5 w-1.5 rounded-full bg-action-on-dark" />
            ))}
          </div>
          <span className="text-[10.5px] text-secondary">Illustrative example</span>
          <div className="flex items-center gap-1">
            {reduced ? (
              <button
                type="button"
                onClick={nextHold}
                aria-label="Show next step"
                className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white hover:text-action"
              >
                <SkipForward size={14} aria-hidden />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={replay}
                  aria-label="Replay animation"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white hover:text-action"
                >
                  <RotateCcw size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause animation" : "Play animation"}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white hover:text-action"
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
