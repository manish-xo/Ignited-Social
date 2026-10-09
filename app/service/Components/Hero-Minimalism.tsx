"use client";

import React, { useEffect, useRef } from "react";

// Light-theme colours — tweak here. Kept as RGB so opacity can be layered on.
const PARTICLE_RGB = "34, 31, 27"; // warm near-black (brand ink)
const PARTICLE_MAX_OPACITY = 0.45;
const LINE_COLOR = "rgba(34, 31, 27, 0.10)";
const SHIMMER_COLOR = "rgba(34, 31, 27, 0.18)";

interface MinimalHeroProps {
  className?: string;
}

export default function MinimalHero({ className = "" }: MinimalHeroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    // Respect "reduce motion": keep the grid, skip the moving particles.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Particle = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeStart: number;
      fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;

    // Size to the section (not the window), sharp on high-DPI screens.
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = root.clientWidth;
      height = root.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const count = () => Math.floor((width * height) / 7000);

    const reset = (p: Particle) => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = PARTICLE_MAX_OPACITY;
      p.fadeStart = Date.now() + Math.random() * 600 + 100;
      p.fadingOut = false;
      return p;
    };

    const init = () => {
      particles = Array.from({ length: count() }, () => reset({} as Particle));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.005;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(${PARTICLE_RGB}, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.8, Math.random() * 2 + 1);
      }
      raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      setSize();
      init();
    });
    observer.observe(root);

    setSize();
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className={`minimal-hero-bg ${className}`}>
      <style>{`
/* Fills the parent section (which needs position: relative) and stays
   behind its content; clicks pass straight through. */
.minimal-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.minimal-hero-bg .mh-layer {
  position: absolute;
  inset: 0;
}

/* grid lines */
.minimal-hero-bg .hline,
.minimal-hero-bg .vline {
  position: absolute;
  background: ${LINE_COLOR};
  will-change: transform, opacity;
}

.minimal-hero-bg .hline {
  height: 1px; left: 0; right: 0;
  transform: scaleX(0);
  transform-origin: 50% 50%;
  animation: mh-drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
}
.minimal-hero-bg .hline:nth-child(1){ top: 20%; animation-delay: 150ms; }
.minimal-hero-bg .hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
.minimal-hero-bg .hline:nth-child(3){ top: 80%; animation-delay: 410ms; }

.minimal-hero-bg .vline {
  width: 1px; top: 0; bottom: 0;
  transform: scaleY(0);
  transform-origin: 50% 0%;
  animation: mh-drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
}
.minimal-hero-bg .vline:nth-child(4){ left: 20%; animation-delay: 520ms; }
.minimal-hero-bg .vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
.minimal-hero-bg .vline:nth-child(6){ left: 80%; animation-delay: 760ms; }

/* subtle shimmer while the lines draw in */
.minimal-hero-bg .hline::after,
.minimal-hero-bg .vline::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, ${SHIMMER_COLOR}, transparent);
  opacity: 0;
  animation: mh-shimmer 900ms ease-out forwards;
}
.minimal-hero-bg .hline:nth-child(1)::after{ animation-delay: 150ms; }
.minimal-hero-bg .hline:nth-child(2)::after{ animation-delay: 280ms; }
.minimal-hero-bg .hline:nth-child(3)::after{ animation-delay: 410ms; }
.minimal-hero-bg .vline:nth-child(4)::after{ animation-delay: 520ms; }
.minimal-hero-bg .vline:nth-child(5)::after{ animation-delay: 640ms; }
.minimal-hero-bg .vline:nth-child(6)::after{ animation-delay: 760ms; }

@keyframes mh-drawX {
  0% { transform: scaleX(0); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: scaleX(1); opacity: 1; }
}
@keyframes mh-drawY {
  0% { transform: scaleY(0); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes mh-shimmer {
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .minimal-hero-bg .hline,
  .minimal-hero-bg .vline { animation: none; transform: none; }
  .minimal-hero-bg .hline::after,
  .minimal-hero-bg .vline::after { animation: none; }
}
      `}</style>

      {/* Particles */}
      <canvas ref={canvasRef} className="mh-layer h-full w-full" />

      {/* Grid lines (draw in on mount) */}
      <div className="mh-layer">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>
    </div>
  );
}
