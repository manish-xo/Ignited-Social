import gsap from "gsap";
import type { Group } from "three";
import type { PropKind, Stage3D } from "./stage3d";

interface Options {
  root: HTMLElement;
  stage: Stage3D;
  width: number;
  height: number;
  query: string;
  dots: HTMLElement[];
  onStep: (step: number) => void;
}

/** Far enough that a slide is fully outside the panel at every stage width. */
const OFFSTAGE = 720;
const STEP_STARTS_TAIL = 0.65;
/** Overall speed of the story: 1 is the original pace, lower is slower. */
const PLAYBACK_SPEED = 0.65;

/**
 * One looping timeline for the whole story. It uses only `.to` tweens from a
 * state set up front, so every repeat rewinds cleanly to the same first frame.
 */
export function buildJourney({ root, stage, width, height, query, dots, onStep }: Options) {
  const q = gsap.utils.selector(root);
  const one = (selector: string) => q(selector)[0] as HTMLElement;

  // Layout position in stage units, ignoring GSAP transforms. Saves hard-coding
  // where each DOM element sits for the 3D props that interact with it.
  const world = (el: HTMLElement) => {
    let x = el.offsetWidth / 2;
    let y = el.offsetHeight / 2;
    let node: HTMLElement | null = el;
    while (node && node !== root) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return { x: x - width / 2, y: height / 2 - y };
  };

  const slides = q("[data-slide]");
  const caps = q("[data-cap]");

  gsap.set(slides, { x: -OFFSTAGE, rotation: -9, autoAlpha: 1, force3D: true });
  gsap.set(caps, { autoAlpha: 0, y: -18, scale: 0.84 });
  gsap.set(q("[data-chip]"), { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.3 });
  gsap.set(q("[data-tile]"), { scale: 0.4, autoAlpha: 0 });
  gsap.set(q("[data-results]"), { autoAlpha: 0 });
  gsap.set(q("[data-row]"), { autoAlpha: 0, y: 22, scale: 0.92 });
  gsap.set(q("[data-maya-tag]"), { autoAlpha: 0, scale: 0.3, y: 12 });
  gsap.set(q("[data-banner]"), { y: -110, autoAlpha: 0 });
  gsap.set(q("[data-like-badge]"), { autoAlpha: 0, scale: 0.2, y: 12, transformOrigin: "80% 100%" });
  gsap.set(q("[data-post-heart]"), { autoAlpha: 0, scale: 0.2 });
  gsap.set(q("[data-post-liked]"), { autoAlpha: 0, scale: 0.3 });
  gsap.set(q("[data-liked-line]"), { autoAlpha: 0, y: 6 });
  gsap.set(q("[data-touch]"), { autoAlpha: 0, x: 44, y: 70, scale: 1.3 });
  gsap.set(q("[data-head]"), { autoAlpha: 0, y: 12 });
  gsap.set(q("[data-grid-tile]"), { autoAlpha: 0, scale: 0.5 });
  gsap.set(dots, { width: 6, backgroundColor: "#bab4f2" });
  gsap.set(dots[0], { width: 20, backgroundColor: "#5a4ce0" });

  const tl = gsap.timeline({ paused: true, repeat: -1 }).timeScale(PLAYBACK_SPEED);

  /* ---------- small builders ---------- */

  const spawnAt = (kind: PropKind, x: number, y: number): Group => {
    const prop = stage.spawn(kind);
    prop.position.set(x, y, 0);
    return prop;
  };

  const grow = (prop: Group, size: number, at: number, duration = 0.55, ease = "back.out(2.6)") =>
    tl.to(prop.scale, { x: size, y: size, z: size, duration, ease }, at);

  const shrink = (prop: Group, at: number, duration = 0.3) =>
    tl.to(prop.scale, { x: 0, y: 0, z: 0, duration, ease: "back.in(2.4)" }, at);

  const showCap = (i: number, at: number) => {
    tl.to(caps[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1,0.6)" }, at);
    tl.to(dots[i], { width: 20, backgroundColor: "#5a4ce0", duration: 0.4, ease: "back.out(3)" }, at);
    if (i > 0)
      tl.to(dots[i - 1], { width: 6, backgroundColor: "#bab4f2", duration: 0.3 }, at);
  };

  const enter = (i: number, at: number) =>
    tl.to(
      slides[i],
      { x: 0, rotation: 0, duration: 1.05, ease: "elastic.out(1,0.72)" },
      at,
    );

  const leave = (i: number, at: number) => {
    tl.to(caps[i], { autoAlpha: 0, y: -14, duration: 0.25, ease: "power2.in" }, at);
    tl.to(
      slides[i],
      { x: OFFSTAGE, rotation: 9, duration: STEP_STARTS_TAIL, ease: "back.in(1.3)" },
      at,
    );
  };

  /** Props pop out of a point, drift apart with a soft arc, then pop away. */
  const burst = (
    kinds: PropKind[],
    origin: { x: number; y: number },
    at: number,
    { count, spread, size, life = 1.25 }: { count: number; spread: number; size: number; life?: number },
  ) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * 0.08 + (Math.PI * 0.84 * i) / Math.max(count - 1, 1);
      const reach = spread * (0.65 + 0.35 * ((i * 7) % 5) * 0.25);
      const prop = spawnAt(kinds[i % kinds.length], origin.x, origin.y);
      const start = at + i * 0.045;
      const s = size * (0.75 + ((i * 3) % 4) * 0.14);
      grow(prop, s, start, 0.42, "back.out(3.2)");
      tl.to(
        prop.position,
        {
          x: origin.x + Math.cos(angle) * reach,
          y: origin.y + Math.sin(angle) * reach,
          duration: life,
          ease: "power3.out",
        },
        start,
      );
      tl.to(
        prop.rotation,
        { z: (i % 2 ? -1 : 1) * (0.5 + (i % 3) * 0.3), duration: life, ease: "sine.out" },
        start,
      );
      shrink(prop, start + life - 0.2);
    }
  };

  /* ---------- 01 Find your audience ---------- */

  enter(0, 0);
  showCap(0, 0.15);

  tl.to(q("[data-tile]"), {
    autoAlpha: 1,
    scale: 1,
    duration: 0.5,
    ease: "back.out(2.2)",
    stagger: 0.05,
  }, 0.35);

  const bar = world(one("[data-searchbar]"));
  const lens = spawnAt("magnifier", -330, bar.y - 60);
  grow(lens, 26, 0.45, 0.6);
  tl.to(lens.position, { x: bar.x + 66, y: bar.y - 4, duration: 0.85, ease: "back.out(1.6)" }, 0.45);

  const TYPE_START = 1;
  const TYPE_LENGTH = Math.min(1.7, 0.08 * query.length);
  const typedEnd = TYPE_START + TYPE_LENGTH;

  tl.to(lens.position, { y: bar.y + 3, duration: 0.16, repeat: Math.round(TYPE_LENGTH / 0.16), yoyo: true, ease: "sine.inOut" }, TYPE_START);

  // Each interest floats out of the phone as its own bubble while the search runs.
  q("[data-chip='interest']").forEach((chip: HTMLElement, i: number) =>
    tl.to(chip, { autoAlpha: 1, scale: 1, duration: 0.95, ease: "elastic.out(1,0.5)" }, 1.15 + i * 0.42),
  );

  const resultsAt = typedEnd + 0.2;
  tl.to(q("[data-tile]"), { autoAlpha: 0, scale: 0.7, duration: 0.24, stagger: 0.015, ease: "power2.in" }, resultsAt);
  tl.to(q("[data-results]"), { autoAlpha: 1, duration: 0.2 }, resultsAt + 0.16);
  tl.to(q("[data-row]"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(2.4)", stagger: 0.09 }, resultsAt + 0.2);

  const place = one("[data-chip='place']");
  const placeAt = resultsAt + 0.4;
  tl.to(place, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "elastic.out(1,0.5)" }, placeAt);
  const placePos = world(place);
  // Bubbles centre on their left edge with xPercent, which offsetLeft does not include.
  const pinX = placePos.x - place.offsetWidth / 2;
  const pin = spawnAt("pin", pinX, placePos.y + 240);
  grow(pin, 18, placeAt, 0.2);
  tl.to(pin.position, { y: placePos.y + 44, duration: 0.95, ease: "bounce.out" }, placeAt);

  // The magnifier checks each result, then settles on the right person.
  const rows = q("[data-row]") as HTMLElement[];
  const scanAt = resultsAt + 0.85;
  rows.slice(0, 4).forEach((row, i) => {
    const r = world(row);
    tl.to(lens.position, { x: r.x + 74, y: r.y, duration: 0.34, ease: "back.out(2)" }, scanAt + i * 0.38);
  });
  const maya = world(one("[data-maya]"));
  const foundAt = scanAt + 1.55;
  tl.to(lens.position, { x: maya.x + 78, y: maya.y + 2, duration: 0.42, ease: "back.out(2.4)" }, foundAt);
  tl.to(lens.scale, { x: 32, y: 32, z: 32, duration: 0.5, ease: "elastic.out(1,0.5)" }, foundAt + 0.3);
  tl.to(one("[data-maya]"), { backgroundColor: "#edebf4", scale: 1.05, duration: 0.7, ease: "elastic.out(1,0.5)" }, foundAt + 0.3);
  tl.to(q("[data-maya-tag]"), { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1,0.5)" }, foundAt + 0.42);
  burst(["bubble", "bubbleTint"], maya, foundAt + 0.34, { count: 8, spread: 150, size: 10 });

  const hold1 = foundAt + 1.2;
  const leave1 = hold1 + 1;
  leave(0, leave1);
  shrink(lens, leave1, 0.28);
  shrink(pin, leave1, 0.28);

  /* ---------- 02 Reach out ---------- */

  const s2 = leave1 + 0.42;
  enter(1, s2);
  showCap(1, s2 + 0.15);

  tl.to(q("[data-chip='manager']"), { autoAlpha: 1, scale: 1, duration: 0.95, ease: "elastic.out(1,0.5)" }, s2 + 0.55);
  tl.to(q("[data-feed]"), { y: -46, duration: 4.4, ease: "sine.inOut" }, s2 + 0.4);

  const b1 = s2 + 1.25;
  const banners = q("[data-banner]") as HTMLElement[];
  tl.to(banners[0], { y: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(2.1)" }, b1);
  tl.to(q("[data-post-heart]"), { autoAlpha: 1, scale: 1, duration: 0.5, ease: "elastic.out(1,0.45)" }, b1 + 0.1);
  tl.to(q("[data-post-heart]"), { autoAlpha: 0, scale: 1.3, duration: 0.25, ease: "power2.in" }, b1 + 0.85);
  tl.to(q("[data-post-liked]"), { autoAlpha: 1, scale: 1, duration: 0.55, ease: "elastic.out(1,0.45)" }, b1 + 0.15);
  tl.to(q("[data-liked-line]"), { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(2.4)" }, b1 + 0.25);
  tl.to(q("[data-like-badge]"), { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" }, b1 + 0.3);
  burst(["heart"], world(banners[0]), b1 + 0.08, { count: 7, spread: 190, size: 13 });

  const b2 = b1 + 1.5;
  tl.to(banners[1], { y: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(2.1)" }, b2);
  const followOrigin = world(banners[1]);
  const plus = spawnAt("plus", followOrigin.x + 112, followOrigin.y);
  grow(plus, 15, b2 + 0.12, 0.7, "elastic.out(1,0.5)");
  tl.to(plus.position, { x: followOrigin.x + 142, y: followOrigin.y + 34, duration: 0.8, ease: "back.out(2)" }, b2 + 0.12);
  burst(["bubble", "plus"], followOrigin, b2 + 0.1, { count: 5, spread: 130, size: 7 });

  const tap2 = b2 + 1.3;
  const touch2 = q("[data-slide='1'] [data-touch]");
  tl.to(touch2, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.42, ease: "power3.out" }, tap2);
  tl.to(touch2, { scale: 0.72, duration: 0.11, ease: "power2.in", yoyo: true, repeat: 1 }, tap2 + 0.45);
  tl.to(banners[1], { scale: 0.95, duration: 0.11, ease: "power2.in", yoyo: true, repeat: 1 }, tap2 + 0.45);

  const hold2 = tap2 - 0.1;
  const leave2 = tap2 + 0.8;
  leave(1, leave2);
  shrink(plus, leave2, 0.28);

  /* ---------- 03 Get discovered ---------- */

  const s3 = leave2 + 0.42;
  enter(2, s3);
  showCap(2, s3 + 0.15);

  tl.to(q("[data-chip='visitor']"), { autoAlpha: 1, scale: 1, duration: 0.95, ease: "elastic.out(1,0.5)" }, s3 + 0.5);
  tl.to(q("[data-head]"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(2.4)", stagger: 0.07 }, s3 + 0.35);
  tl.to(q("[data-grid-tile]"), { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)", stagger: 0.06 }, s3 + 0.7);

  const tap3 = s3 + 1.75;
  const touch3 = q("[data-slide='2'] [data-touch]");
  tl.to(touch3, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, tap3);
  const pressed = tap3 + 0.55;
  tl.to(touch3, { scale: 0.72, duration: 0.1, ease: "power2.in", yoyo: true, repeat: 1 }, pressed);
  tl.to(touch3, { autoAlpha: 0, duration: 0.25 }, pressed + 0.28);

  const follow = one("[data-follow]");
  tl.to(follow, { scale: 0.93, duration: 0.1, ease: "power2.in" }, pressed);
  tl.to(follow, { scale: 1, duration: 0.7, ease: "elastic.out(1.1,0.4)" }, pressed + 0.1);
  tl.to(follow, { backgroundColor: "#efefef", color: "#111111", duration: 0.18 }, pressed + 0.08);
  tl.to(q("[data-follow-roll]"), { y: -28, duration: 0.5, ease: "back.out(2.4)" }, pressed + 0.08);
  tl.to(q("[data-count-roll]"), { y: -13, duration: 0.6, ease: "back.out(2.6)" }, pressed + 0.22);

  const origin = world(follow);
  burst(
    ["confettiA", "confettiB", "confettiC", "heart"],
    origin,
    pressed + 0.1,
    { count: 20, spread: 250, size: 9, life: 1.55 },
  );

  const toast = one("[data-chip='followed']");
  tl.to(toast, { autoAlpha: 1, scale: 1, duration: 0.95, ease: "elastic.out(1,0.5)" }, pressed + 0.5);
  const toastPos = world(toast);
  const check = spawnAt("check", toastPos.x, toastPos.y + 42);
  grow(check, 17, pressed + 0.56, 0.9, "elastic.out(1,0.45)");

  const hold3 = pressed + 1.6;
  const leave3 = hold3 + 1.5;
  leave(2, leave3);
  shrink(check, leave3, 0.28);
  tl.to(dots[2], { width: 6, backgroundColor: "#bab4f2", duration: 0.2 }, leave3 + 0.3);
  tl.to(dots[0], { width: 20, backgroundColor: "#5a4ce0", duration: 0.2 }, leave3 + 0.42);
  tl.to({}, { duration: 0.08 }, leave3 + STEP_STARTS_TAIL);

  /* ---------- text and step status follow the playhead, so seeking stays right ---------- */

  const typed = one("[data-typed]");
  let lastText = "";
  let lastStep = -1;
  const sync = () => {
    const time = tl.time();
    const typedShare = gsap.utils.clamp(0, 1, (time - TYPE_START) / TYPE_LENGTH);
    const text = query.slice(0, Math.round(typedShare * query.length));
    if (text !== lastText) {
      typed.textContent = text;
      lastText = text;
    }
    const step = time < s2 ? 0 : time < s3 ? 1 : 2;
    if (step !== lastStep) {
      lastStep = step;
      onStep(step);
    }
  };
  tl.eventCallback("onUpdate", sync);

  return { tl, sync, holds: [hold1, hold2, hold3] };
}
