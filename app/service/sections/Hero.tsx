import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  MessageCircleHeart,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import MinimalHero from "../Components/Hero-Minimalism";
import GradientBackground from "@/components/ui/GradientBackground";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import { getPlan } from "@/lib/plans";

// Placeholder faces for the social-proof pill — swap for real creator photos.
const CREATOR_AVATARS = [
  { initial: "A", className: "bg-[#c08457]" },
  { initial: "M", className: "bg-[#7c6a5a]" },
  { initial: "R", className: "bg-[#a5715b]" },
];

const STATS = [
  {
    value: "90%",
    label: "of customers stay",
    detail: "Month-over-month retention",
  },
  {
    value: "20,000+",
    label: "accounts managed",
    detail: "Month-over-month retention",
  },
];

// Floating pills around the video. `position` is relative to the video box:
// negative offsets push a pill half outside the frame. Each one drifts on its
// own timing so they never move in sync.
interface FloatingPill {
  icon: LucideIcon;
  iconBg: string; // coloured badge behind the icon
  title: string;
  caption?: string;
  position: string;
  duration: string;
  delay: string;
  hideOnMobile?: boolean;
}

const FLOATING_PILLS: FloatingPill[] = [
  {
    icon: UserPlus,
    iconBg: "bg-gradient-to-br from-emerald-400 to-green-600",
    title: "+1,248 followers",
    caption: "this month",
    position: "top-[6%] -left-[6%] sm:-left-[18%]",
    duration: "7s",
    delay: "0s",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
    title: "Real people, no bots",
    position: "top-[24%] -right-[4%] sm:-right-[16%]",
    duration: "8s",
    delay: "-2s",
  },
  {
    icon: MessageCircleHeart,
    iconBg: "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600",
    title: "Daily outreach handled",
    caption: "by your Brand Manager",
    position: "top-[50%] -left-[24%]",
    duration: "9s",
    delay: "-4s",
    hideOnMobile: true,
  },
  {
    icon: TrendingUp,
    iconBg: "bg-gradient-to-br from-orange-400 to-rose-500",
    title: "Engagement 3.2×",
    caption: "vs. last quarter",
    position: "bottom-[18%] -right-[4%] sm:-right-[14%]",
    duration: "7.5s",
    delay: "-1s",
  },
  {
    icon: BarChart3,
    iconBg: "bg-gradient-to-br from-violet-400 to-indigo-600",
    title: "Weekly growth report",
    position: "bottom-[4%] -left-[4%] sm:-left-[12%]",
    duration: "8.5s",
    delay: "-3s",
    hideOnMobile: true,
  },
];

const Hero = () => {
  const startingPrice = getPlan("grow").price;

  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas">
      {/* Grid + particles background — fills this section, stays behind. */}
      <MinimalHero />

      {/* <ProHeader /> */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-32 sm:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
          {/* LEFT — copy */}
          <div>
            {/* social proof pill — centred on small screens, left from md up */}
            <div className="mx-auto flex w-fit items-center gap-2 md:mx-0 rounded-full border border-dashed border-ink/25 bg-canvas/80 py-1 pl-1 pr-3 backdrop-blur-sm">
              <div className="flex -space-x-1.5">
                {CREATOR_AVATARS.map((a) => (
                  <span
                    key={a.initial}
                    className={`flex h-5 w-5 items-center justify-center rounded-full border border-canvas text-[9px] font-bold text-white ${a.className}`}
                  >
                    {a.initial}
                  </span>
                ))}
              </div>
              <p className="font-mono font-[500] text-[0.75rem] text-ink/80">
                20,000+ creators. One manager each.
              </p>
            </div>

            <h1 className="mt-5 font-heading-condensed text-4xl font-[700] leading-[1.02] -tracking-[0.04em] text-ink sm:text-6xl md:text-5xl lg:text-5xl text-center md:text-left">
              More of the right Instagram followers. With your own{" "}
              <span className="text-action">Brand Manager.</span>
            </h1>

            <p className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-secondary sm:text-base text-center md:text-left">
              You&apos;ve got work worth seeing. Your personal Brand Manager
              finds people likely to{" "}
              <strong className="font-semibold text-ink">
                care, handles the daily outreach
              </strong>
              , and helps you give them a reason to stay.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-normal gap-3">
              <Link
                href="/price"
                className="group inline-flex items-center gap-4 rounded-full bg-action py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-action-hover"
              >
                Find my plan
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-action transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 rounded-full border border-action/40 bg-canvas/60 px-6 py-3 text-sm font-medium text-action transition-colors hover:bg-action-tint-bg"
              >
                How it works <ArrowDown size={14} />
              </a>
            </div>

            <p className="mt-6 text-xs text-ink sm:text-sm flex items-center justify-center md:block">
              From <strong className="font-bold">${startingPrice}</strong>
              /month <span className="mx-1.5 text-muted">•</span> First 7 days
              free
            </p>

            <div className="mt-14 flex flex-col items-center justify-center md:items-start">
              <p className="font-heading text-lg font-[700] -tracking-[0.06em] text-ink">
                We grow your audience.
              </p>
              <p className="text-sm text-secondary">
                You create and publish, with expert guidance.
              </p>
            </div>
          </div>

          {/* RIGHT — video (public/stock/Hero.mp4) */}
          <div className="relative mx-auto w-full max-w-sm md:ml-auto md:mr-0">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-ink/5 shadow-lg">
              <video
                src="/stock/Hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="A growth manager at work"
                className="h-full w-full object-cover"
              />
            </div>

            {/* floating pills — some straddle the frame edge */}
            {FLOATING_PILLS.map(
              ({
                icon: Icon,
                iconBg,
                title,
                caption,
                position,
                duration,
                delay,
                hideOnMobile,
              }) => (
                <div
                  key={title}
                  className={`absolute z-10 ${position} ${
                    hideOnMobile ? "hidden sm:block" : ""
                  }`}
                >
                  <div
                    className="animate-hero-float flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/70 bg-white/90 py-1.5 pl-1.5 pr-4 shadow-[0_8px_24px_-8px_rgba(34,31,27,0.25)] backdrop-blur-md"
                    style={{
                      animationDuration: duration,
                      animationDelay: delay,
                    }}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${iconBg}`}
                    >
                      <Icon size={15} strokeWidth={2.25} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-xs font-semibold text-ink">
                        {title}
                      </span>
                      {caption && (
                        <span className="block text-[10px] text-secondary">
                          {caption}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-8">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center">
              <p className="font-heading text-4xl font-[700] -tracking-[0.07em] text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-ink sm:text-sm ">{stat.label}</p>
              <p className="text-xs text-secondary sm:text-sm">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
