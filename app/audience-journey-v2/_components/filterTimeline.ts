import gsap from "gsap";
import { REMAINING } from "./crowd";
import { COUNT_LINE, FACE, ROW_AVATAR } from "./Scenes";

interface Options {
  root: HTMLElement;
  labels: HTMLElement[];
  onStep: (step: number) => void;
}

/** Calm, even pacing. Each filter gets time to be read before people fade. */
const PHASE_GAP = 3.1;
const ROW_GAP = 1.2;
const BANNER_GAP = 1.8;

/**
 * One looping timeline. Every tween is a `.to` from the state set up front,
 * so each repeat rewinds to exactly the same first frame.
 */
export function buildFilterJourney({ root, labels, onStep }: Options) {
  const q = gsap.utils.selector(root);
  const all = (s: string) => q(s) as HTMLElement[];
  const one = (s: string) => all(s)[0];

  // Centre of an element in stage units, from layout (ignores GSAP transforms).
  const centre = (el: HTMLElement) => {
    let x = el.offsetWidth / 2;
    let y = el.offsetHeight / 2;
    let node: HTMLElement | null = el;
    while (node && node !== root) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return { x, y };
  };

  const phases = all("[data-phase]");
  const faces = all("[data-face]");
  const keptFaces = faces.filter((f) => f.dataset.drop === "keep");
  const travellers = all("[data-traveller]");
  const rows = all("[data-row]");
  const rowAvatars = all("[data-row-avatar]");
  const banners = all("[data-banner]");

  // Measure where the kept faces sit once every filter is open, then close them.
  gsap.set(phases, { height: "auto" });
  const keptAt = keptFaces.map(centre);
  gsap.set(phases, { height: 0 });
  const rowAvatarAt = rowAvatars.map(centre);

  // The kept list is ordered differently from the crowd, so match by data-key.
  const keptOrder = travellers.map((t) =>
    keptFaces.findIndex((f) => f.dataset.key === t.dataset.key),
  );

  gsap.set(labels, { autoAlpha: 0, y: 8 });
  gsap.set(one("[data-card]"), { autoAlpha: 0, y: 22 });
  gsap.set(all("[data-phase-inner]"), { autoAlpha: 0, y: 8 });
  gsap.set(all("[data-pop]"), { autoAlpha: 0, scale: 0.85 });
  gsap.set(faces, {
    autoAlpha: 0,
    scale: 0.6,
    filter: "grayscale(0)",
    boxShadow: "0 0 0 0px #ffffff, 0 0 0 0px #5a4ce0",
  });
  gsap.set(travellers, {
    autoAlpha: 0,
    x: (i: number) => keptAt[keptOrder[i]].x - FACE / 2,
    y: (i: number) => keptAt[keptOrder[i]].y - FACE / 2,
  });
  gsap.set(one("[data-s2-title]"), { autoAlpha: 0, y: 14 });
  gsap.set(rows, { autoAlpha: 0, y: 10, borderColor: "#ebeae7" });
  gsap.set(rowAvatars, { autoAlpha: 0 });
  gsap.set(all("[data-heart]"), { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
  gsap.set(all("[data-state-following]"), { autoAlpha: 0 });
  // Scaled down so the phone fits under its heading.
  gsap.set(one("[data-phone]"), { autoAlpha: 0, y: 50, scale: 0.82, transformOrigin: "50% 0%" });
  gsap.set(one("[data-s3-title]"), { autoAlpha: 0, y: 14 });
  gsap.set(banners, { autoAlpha: 0, y: -84 });
  gsap.set(one("[data-count]"), { y: 0 });

  const tl = gsap.timeline({ paused: true, repeat: -1 });

  const showLabel = (i: number, at: number) => {
    if (i > 0) tl.to(labels[i - 1], { autoAlpha: 0, y: -8, duration: 0.35, ease: "power2.in" }, at);
    tl.to(labels[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, at + 0.3);
  };

  /* ---------- 01 Find your audience ---------- */

  showLabel(0, 0);
  tl.to(one("[data-card]"), { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.1);
  tl.to(faces, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.55,
    ease: "back.out(1.8)",
    stagger: { each: 0.035, from: "random" },
  }, 0.55);

  const dropTimes: number[] = [];
  phases.forEach((phase, i) => {
    const at = 1.9 + i * PHASE_GAP;
    tl.to(phase, { height: "auto", duration: 0.85, ease: "power3.inOut" }, at);
    tl.to(phase.querySelector("[data-phase-inner]"), { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at + 0.35);
    tl.to(phase.querySelectorAll("[data-pop]"), {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: 0.09,
    }, at + 0.5);

    const dropAt = at + 1.55;
    dropTimes.push(dropAt);
    tl.to(faces.filter((f) => f.dataset.drop === String(i)), {
      autoAlpha: 0.22,
      scale: 0.84,
      filter: "grayscale(1)",
      duration: 0.7,
      ease: "power2.out",
      stagger: { each: 0.12, from: "random" },
    }, dropAt);
  });

  const settled = dropTimes[2] + 1.1;
  tl.to(faces.filter((f) => f.dataset.drop !== "keep"), { autoAlpha: 0.1, duration: 0.5 }, settled);
  tl.to(keptFaces, {
    scale: 1.12,
    boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #5a4ce0",
    duration: 0.6,
    ease: "back.out(2.4)",
    stagger: 0.08,
  }, settled);

  const hold1 = settled + 0.9;

  /* ---------- the four people travel to step 02 ---------- */

  const move = hold1 + 1.1;
  tl.set(travellers, { autoAlpha: 1 }, move);
  tl.set(keptFaces, { autoAlpha: 0 }, move);
  tl.to(one("[data-card]"), { autoAlpha: 0, scale: 0.96, duration: 0.6, ease: "power2.inOut" }, move + 0.05);
  showLabel(1, move + 0.1);
  tl.to(one("[data-s2-title]"), { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, move + 0.45);

  const scale = ROW_AVATAR / FACE;
  travellers.forEach((t, i) => {
    const to = rowAvatarAt[i];
    const start = move + 0.25 + i * 0.1;
    // Different eases on x and y bend the path into a soft arc.
    tl.to(t, { x: to.x - FACE / 2, duration: 1.25, ease: "power2.inOut" }, start);
    tl.to(t, { y: to.y - FACE / 2, duration: 1.25, ease: "power3.inOut" }, start);
    tl.to(t, { scale, duration: 1.25, ease: "power2.inOut" }, start);
  });
  tl.to(rows, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1 }, move + 1.15);
  const landed = move + 0.25 + 0.3 + 1.25;
  tl.set(rowAvatars, { autoAlpha: 1 }, landed);
  tl.set(travellers, { autoAlpha: 0 }, landed);

  /* ---------- 02 Reach out: follow and like, one by one ---------- */

  const followBtns = all("[data-follow-btn]");
  const hearts = all("[data-heart]");
  const following = all("[data-state-following]");
  const firstRow = landed + 0.7;
  rows.forEach((row, i) => {
    const at = firstRow + i * ROW_GAP;
    // The row lifts slightly while its turn is happening, then settles.
    tl.to(row, { scale: 1.03, borderColor: "#bab4f2", duration: 0.35, ease: "power2.out" }, at);
    tl.to(followBtns[i], { scale: 0.88, duration: 0.12, ease: "power2.in", yoyo: true, repeat: 1 }, at + 0.25);
    tl.to(following[i], { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, at + 0.4);
    tl.to(hearts[i], { autoAlpha: 1, scale: 1, duration: 0.55, ease: "back.out(3.2)" }, at + 0.62);
    tl.to(row, { scale: 1, borderColor: "#ebeae7", duration: 0.45, ease: "power2.inOut" }, at + 1.0);
  });

  const hold2 = firstRow + 3 * ROW_GAP + 1.4;

  /* ---------- 03 Get discovered ---------- */

  const s3 = hold2 + 1.2;
  tl.to([one("[data-s2-title]"), ...rows], {
    autoAlpha: 0,
    y: "-=10",
    duration: 0.5,
    ease: "power2.in",
    stagger: 0.02,
  }, s3);
  showLabel(2, s3 + 0.1);
  tl.to(one("[data-s3-title]"), { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, s3 + 0.35);
  tl.to(one("[data-phone]"), { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, s3 + 0.6);

  const firstBanner = s3 + 1.8;
  banners.forEach((banner, i) => {
    const at = firstBanner + i * BANNER_GAP;
    if (i > 0)
      tl.to(banners[i - 1], { autoAlpha: 0, y: -22, scale: 0.94, duration: 0.45, ease: "power2.in" }, at);
    tl.to(banner, { autoAlpha: 1, y: 0, duration: 0.75, ease: "back.out(1.4)" }, at + 0.1);
    tl.to(one("[data-count]"), { y: -(i + 1) * COUNT_LINE, duration: 0.55, ease: "back.out(2)" }, at + 0.45);
  });

  const lastBanner = firstBanner + (banners.length - 1) * BANNER_GAP;
  tl.to(banners[banners.length - 1], { autoAlpha: 0, y: -22, scale: 0.94, duration: 0.45, ease: "power2.in" }, lastBanner + 2);
  const hold3 = lastBanner + 0.9;

  const end = lastBanner + 4;
  tl.to([one("[data-s3-title]"), one("[data-phone]")], { autoAlpha: 0, y: "-=16", duration: 0.6, ease: "power2.in" }, end);
  tl.to(labels[2], { autoAlpha: 0, y: -8, duration: 0.35 }, end);
  tl.to({}, { duration: 0.3 }, end + 0.6);

  /* ---------- text and step status follow the playhead ---------- */

  const remaining = one("[data-remaining]");
  let lastCount = -1;
  let lastStep = -1;
  const sync = () => {
    const time = tl.time();
    const passed = dropTimes.filter((t) => time >= t + 0.2).length;
    const count = REMAINING[passed];
    if (count !== lastCount) {
      remaining.textContent = String(count);
      lastCount = count;
    }
    const step = time < move ? 0 : time < s3 ? 1 : 2;
    if (step !== lastStep) {
      lastStep = step;
      onStep(step);
    }
  };
  tl.eventCallback("onUpdate", sync);

  return { tl, sync, holds: [hold1, hold2, hold3] };
}
