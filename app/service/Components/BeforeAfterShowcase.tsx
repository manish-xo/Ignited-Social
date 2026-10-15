"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Camera,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";

// ─── Accounts ───────────────────────────────────────────────────────────────
// Real before/after Instagram screenshots from /public/before and /public/after.
// NOTE: the file numbers don't line up — before (2) pairs with after (3), etc.
// Four more pairs exist (3imakeroficial, legen_dary_toycollections,
// kramswodahs, jratical_design) but their before/after screenshots are
// identical; add them here once the real "after" screenshots are in.
interface Account {
  handle: string;
  before: { src: string; followers: number; label: string };
  after: { src: string; followers: number; label: string };
}

const img = (folder: "before" | "after", n: number) =>
  encodeURI(`/${folder}/${folder} (${n}).png`);

const ACCOUNTS: Account[] = [
  {
    handle: "unicron.com_news",
    before: { src: img("before", 2), followers: 4398, label: "4,398" },
    after: { src: img("after", 3), followers: 13500, label: "13.5k" },
  },
  {
    handle: "xoplayz.exe",
    before: { src: img("before", 3), followers: 199, label: "199" },
    after: { src: img("after", 4), followers: 6100, label: "6.1k" },
  },
  {
    handle: "adi_v.sage",
    before: { src: img("before", 4), followers: 2871, label: "2,871" },
    after: { src: img("after", 5), followers: 13000, label: "13k" },
  },
  {
    handle: "cjc.art_560",
    before: { src: img("before", 1), followers: 4999, label: "4,999" },
    after: { src: img("after", 2), followers: 10000, label: "10k" },
  },
];

const POINTS = [
  { icon: Camera, text: "Unedited Instagram screenshots" },
  { icon: UserCheck, text: "Same profile, before and after" },
  { icon: ShieldCheck, text: "Real people, no bots" },
  { icon: BadgeCheck, text: "Grown by one Brand Manager" },
];

// ─── Motion settings ────────────────────────────────────────────────────────
const AUTOPLAY_SECONDS = 3.8;
const MOVE = { duration: 0.9, ease: "expo.out" };
const SWIPE_THRESHOLD = 40; // px of drag needed to change card
const SIDE_SCALE = 0.78; // size of the cards above/below the highlighted one
const STACK_GAP = 18; // px of clear space between them

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function AccountCard({ account }: { account: Account }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-action/35 bg-action-tint-bg p-3.5 sm:p-4">
      <span
        data-accent
        className="absolute inset-y-6 left-0 w-1 rounded-r-full bg-action"
      />
      <p className="text-center text-sm font-bold text-ink">
        @{account.handle}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
        {(["before", "after"] as const).map((when) => (
          <div key={when} className="relative">
            <span
              className={`absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 rounded-md px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white shadow-sm ${
                when === "before" ? "bg-ink/85" : "bg-action"
              }`}
            >
              {when}
            </span>
            <Image
              src={account[when].src}
              alt={`@${account.handle} ${when}: ${account[when].label} followers`}
              width={300}
              height={138}
              draggable={false}
              className="aspect-[300/138] w-full rounded-xl border border-ink/10 bg-ink object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Left: what the section proves, plus a live read-out of the account on show.
 * Right: a stack of before/after cards that slides on its own (GSAP).
 *   - md and up: vertical stack — drag up/down, use the dots or ↑/↓.
 *   - phones: horizontal — swipe left/right; vertical swipes still scroll the
 *     page (touch-action: pan-y), so the section never traps scrolling.
 */
export default function BeforeAfterShowcase() {
  const [active, setActive] = useState(0);
  const [vertical, setVertical] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLSpanElement>(null);
  const gainRef = useRef<HTMLSpanElement>(null);
  const multipleRef = useRef<HTMLSpanElement>(null);
  const autoplay = useRef<gsap.core.Tween | null>(null);
  const paused = useRef({ hover: false, offscreen: true, drag: false });
  const firstLayout = useRef(true);
  const count = ACCOUNTS.length;

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  // Vertical on md+, horizontal below.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setVertical(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── place every card relative to the active one ─────────────────────────
  useIsoLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cardH = cardRefs.current[0]?.offsetHeight ?? 200;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // shortest way round the loop: -2…+1 for 4 cards
      let rel = i - active;
      if (rel > count / 2) rel -= count;
      if (rel < -count / 2) rel += count;
      const dist = Math.abs(rel);

      const props: gsap.TweenVars = vertical
        ? {
            x: 0,
            xPercent: 0,
            yPercent: -50,
            // side cards: smaller, and pushed out far enough to leave a
            // clear STACK_GAP between them and the highlighted card
            y:
              Math.sign(rel) *
              (dist === 0
                ? 0
                : cardH / 2 + (SIDE_SCALE * cardH) / 2 + STACK_GAP),
            scale: dist === 0 ? 1 : SIDE_SCALE,
            autoAlpha: dist === 0 ? 1 : dist === 1 ? 0.5 : 0,
            filter: `blur(${dist === 0 ? 0 : 2}px)`,
          }
        : {
            y: 0,
            yPercent: -50,
            xPercent: rel * 92,
            x: 0,
            scale: dist === 0 ? 1 : 0.9,
            autoAlpha: dist === 0 ? 1 : dist === 1 ? 0.45 : 0,
            filter: "blur(0px)",
          };

      card.style.zIndex = String(10 - dist);
      card.setAttribute("aria-hidden", dist === 0 ? "false" : "true");
      card.style.pointerEvents = dist === 0 ? "auto" : "none";

      if (firstLayout.current || reduce) gsap.set(card, props);
      else gsap.to(card, { ...props, ...MOVE, overwrite: "auto" });

      // the active card gets the accent bar + glow
      const accent = card.querySelector("[data-accent]");
      gsap.to(accent, { autoAlpha: dist === 0 ? 1 : 0, duration: 0.4 });
      gsap.to(card.firstElementChild, {
        boxShadow:
          dist === 0
            ? "0 24px 60px -24px rgba(90,76,224,0.55)"
            : "0 0px 0px 0px rgba(90,76,224,0)",
        duration: 0.6,
      });
    });

    // stage height follows the card size
    stage.style.height = vertical
      ? `${cardH * (1 + 2 * SIDE_SCALE) + STACK_GAP * 2 + 24}px`
      : `${cardH + 16}px`;
    firstLayout.current = false;
  }, [active, vertical, count]);

  // ── left-side numbers count up for the account on show ──────────────────
  useEffect(() => {
    const a = ACCOUNTS[active];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const counter = { after: a.before.followers, gain: 0, multiple: 1 };
    const target = {
      after: a.after.followers,
      gain: a.after.followers - a.before.followers,
      multiple: a.after.followers / a.before.followers,
    };
    const paint = () => {
      if (afterRef.current)
        afterRef.current.textContent = compact.format(counter.after);
      if (gainRef.current)
        gainRef.current.textContent = `+${Math.round(counter.gain).toLocaleString("en")}`;
      if (multipleRef.current)
        multipleRef.current.textContent = `${counter.multiple.toFixed(1)}×`;
    };
    if (reduce) {
      Object.assign(counter, target);
      paint();
      return;
    }
    const tween = gsap.to(counter, {
      ...target,
      duration: 1.4,
      ease: "power3.out",
      onUpdate: paint,
    });
    if (statRef.current) {
      gsap.fromTo(
        statRef.current.querySelectorAll("[data-swap]"),
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
        },
      );
    }
    return () => {
      tween.kill();
    };
  }, [active]);

  // ── autoplay: next card every few seconds, unless paused ────────────────
  const syncAutoplay = useCallback(() => {
    const p = paused.current;
    const t = autoplay.current;
    if (!t) return;
    if (p.hover || p.offscreen || p.drag) t.pause();
    else t.resume();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoplay.current?.kill();
    autoplay.current = gsap.delayedCall(AUTOPLAY_SECONDS, () => go(1));
    syncAutoplay();
    return () => {
      autoplay.current?.kill();
    };
  }, [active, go, syncAutoplay]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        paused.current.offscreen = !entry.isIntersecting;
        syncAutoplay();
      },
      { threshold: 0.3 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [syncAutoplay]);

  // ── drag / swipe ─────────────────────────────────────────────────────────
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    paused.current.drag = true;
    syncAutoplay();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    paused.current.drag = false;
    syncAutoplay();
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (vertical) {
      if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx))
        go(dy < 0 ? 1 : -1); // drag up → next
    } else if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1); // swipe left → next
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    if (e.key === next) {
      e.preventDefault();
      go(1);
    } else if (e.key === prev) {
      e.preventDefault();
      go(-1);
    }
  };

  const account = ACCOUNTS[active];

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-20">
      {/* ── left: the claim + live read-out ─────────────────────────── */}
      <div>
        <div
          ref={statRef}
          className="rounded-2xl border border-border bg-white p-4 shadow-[0_16px_36px_-24px_rgba(34,31,27,0.35)] sm:p-5"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Now showing
            </p>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              <TrendingUp size={11} /> Growing
            </span>
          </div>
          <p
            data-swap
            className="mt-1 text-lg font-bold -tracking-[0.02em] text-ink"
          >
            @{account.handle}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-subtle-bg px-3 py-2.5">
              <p className="text-[10px] text-secondary">Followers</p>
              <p className="mt-0.5 text-sm font-bold text-ink">
                <span
                  data-swap
                  className="text-secondary line-through decoration-ink/30"
                >
                  {account.before.label}
                </span>{" "}
                → <span ref={afterRef} className="text-action" />
              </p>
            </div>
            <div className="rounded-xl bg-subtle-bg px-3 py-2.5">
              <p className="text-[10px] text-secondary">New followers</p>
              <p className="mt-0.5 text-sm font-bold text-ink">
                <span ref={gainRef} />
              </p>
            </div>
            <div className="rounded-xl bg-action px-3 py-2.5 text-white">
              <p className="text-[10px] text-white/75">Growth</p>
              <p className="mt-0.5 text-sm font-bold">
                <span ref={multipleRef} />
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {POINTS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2.5 text-sm text-ink"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-subtle-bg text-action">
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <div className="font-[400]">{text}</div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted">
          Follower counts read from each account&apos;s own profile screenshots.
        </p>
      </div>

      {/* ── right: the card stack ───────────────────────────────────── */}
      <div className="flex items-center gap-5">
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Before and after Instagram accounts"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStart.current = null;
            paused.current.drag = false;
            syncAutoplay();
          }}
          onMouseEnter={() => {
            paused.current.hover = true;
            syncAutoplay();
          }}
          onMouseLeave={() => {
            paused.current.hover = false;
            syncAutoplay();
          }}
          className="relative w-full cursor-grab touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-action/40 active:cursor-grabbing"
        >
          {ACCOUNTS.map((a, i) => (
            <div
              key={a.handle}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-1/2 mx-auto w-[88%] will-change-transform md:w-full md:max-w-[640px]"
              style={{ transformOrigin: "center center" }}
            >
              <AccountCard account={a} />
            </div>
          ))}
        </div>

        {/* dots (vertical on md+) */}
        <div
          className="hidden flex-col gap-2.5 md:flex"
          role="tablist"
          aria-label="Choose account"
        >
          {ACCOUNTS.map((a, i) => (
            <button
              key={a.handle}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show @${a.handle}`}
              onClick={() => setActive(i)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === active
                    ? "h-5 w-1.5 bg-action"
                    : "h-1.5 w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* dots (horizontal on phones) */}
      <div
        className="-mt-6 flex justify-center gap-1.5 md:hidden"
        role="tablist"
        aria-label="Choose account"
      >
        {ACCOUNTS.map((a, i) => (
          <button
            key={a.handle}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show @${a.handle}`}
            onClick={() => setActive(i)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === active ? "h-1.5 w-5 bg-action" : "h-1.5 w-1.5 bg-ink/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
