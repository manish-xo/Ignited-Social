"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import DotPattern from "@/components/ui/DotPattern";
import { getPlan } from "@/lib/plans";

interface PlanFeature {
  text: string;
  note?: string;
}

interface PlanCard {
  slug: "grow" | "scale";
  tagline: string;
  followers: string;
  features: PlanFeature[];
  featured?: boolean;
}

const SUPPORT_NOTE = "Support via email, phone, or video call";

// Price + name come from lib/plans.ts (same source as signup/payment), so the
// page can never show a different price from checkout.
const PLANS: PlanCard[] = [
  {
    slug: "grow",
    tagline: "For accounts ready to build steady, sustainable momentum.",
    followers: "150–500+ followers",
    features: [
      { text: "Your personal Brand Manager.", note: SUPPORT_NOTE },
      { text: "Consistent, daily outreach." },
      { text: "Core audience targeting." },
      { text: "Tailored content plan." },
    ],
  },
  {
    slug: "scale",
    tagline: "For brands ready to move faster and dominate their niche.",
    followers: "250–800+ followers",
    featured: true,
    features: [
      { text: "Your own Senior Brand Manager.", note: SUPPORT_NOTE },
      { text: "Accelerated, higher-volume outreach." },
      { text: "Advanced audience targeting." },
      { text: "Tailored content plan + weekly reviews." },
      { text: "Offer, landing page and monetization funnel review." },
    ],
  },
];

const TRACK_RECORD = [
  { value: "90%", label: "month-over-month customer retention" },
  { value: "20,000", label: "accounts managed since 2016" },
];

export default function PricingPlans() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Cards rise in once, the first time the section scrolls into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-plan]", { autoAlpha: 0, y: 40 });
      gsap.set("[data-plan-item]", { autoAlpha: 0, x: -8 });
    }, root);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        ctx.add(() => {
          gsap
            .timeline()
            .to("[data-plan]", {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.12,
              // hand transform back to CSS so the hover lift works
              clearProps: "transform,opacity,visibility",
            })
            .to(
              "[data-plan-item]",
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.04,
              },
              0.35,
            );
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
        {PLANS.map((plan) => {
          const { name, price } = getPlan(plan.slug);
          const featured = plan.featured;

          return (
            <div
              key={plan.slug}
              data-plan
              className={`group relative isolate flex flex-col rounded-[28px] p-6 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 sm:p-8 ${
                featured
                  ? "border border-dashed border-action/60 bg-white shadow-[0_30px_60px_-30px_rgba(90,76,224,0.55)] hover:shadow-[0_36px_70px_-30px_rgba(90,76,224,0.65)]"
                  : "border border-border bg-white/70 shadow-[0_24px_48px_-32px_rgba(34,31,27,0.35)] hover:shadow-[0_30px_56px_-32px_rgba(34,31,27,0.45)]"
              }`}
            >
              {featured && (
                <>
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-[28px]">
                    <DotPattern className="fill-action/15" />
                  </div>
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-action px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_-6px_rgba(90,76,224,0.7)]">
                    <Sparkles size={12} /> Most popular
                  </span>
                </>
              )}

              {/* name + tagline */}
              <h3 className="text-3xl font-bold -tracking-[0.03em] text-ink">
                {name}
              </h3>
              <p className="mt-1.5 text-sm text-secondary">{plan.tagline}</p>

              {/* price */}
              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-5xl font-bold leading-none -tracking-[0.04em] text-ink">
                  ${price}
                </span>
                <span className="pb-1.5 text-sm text-secondary">/month</span>
              </div>

              {/* growth estimate */}
              <div
                className={`mt-6 flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                  featured
                    ? "border-action/25 bg-action-tint-bg"
                    : "border-border bg-subtle-bg"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    featured ? "bg-action text-white" : "bg-white text-action"
                  }`}
                >
                  <TrendingUp size={17} />
                </span>
                <div className="leading-tight">
                  <p className="font-bold text-ink">{plan.followers}</p>
                  <p className="text-xs text-secondary">
                    Estimated monthly growth
                  </p>
                </div>
              </div>

              {/* features */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    data-plan-item
                    className="flex items-start gap-3 text-sm text-ink"
                  >
                    <span
                      className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        featured
                          ? "bg-action text-white"
                          : "bg-action-tint-bg text-action"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>
                      {feature.text}
                      {feature.note && (
                        <span className="mt-0.5 block text-xs text-secondary">
                          {feature.note}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto pt-8">
                <Link
                  href={`/signup?plan=${plan.slug}`}
                  className={`group/cta flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${
                    featured
                      ? "bg-action text-white hover:bg-action-hover"
                      : "border border-ink/15 bg-white text-ink hover:border-action/40 hover:text-action"
                  }`}
                >
                  Start with {name}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/cta:translate-x-0.5"
                  />
                </Link>
                <p className="mt-3 text-center text-xs text-muted">
                  7 days free, then ${price}/month{" "}
                  <span className="mx-1">·</span> Cancel anytime
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* guarantee */}
      <div className="mx-auto mt-14 flex max-w-4xl flex-col items-start gap-5 rounded-3xl border border-border bg-white/70 p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-action-tint-bg text-action">
          <RotateCcw size={24} strokeWidth={1.9} />
        </span>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-action">
            Our money-back promise
          </p>
          <p className="mt-2 text-2xl font-bold -tracking-[0.04em] text-ink sm:text-3xl">
            Your next month is ours to earn.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary sm:text-base">
            We want you to stay because you value the work. If you decide to
            leave, cancel anytime and we&rsquo;ll automatically refund your most
            recent payment.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-base">
            This applies during your first paid month and every month after. No
            refund request. No explanation needed.
          </p>
        </div>
      </div>

      {/* track record */}
      <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-8">
        {TRACK_RECORD.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center">
            <p className="font-heading text-4xl font-[700] -tracking-[0.07em] text-ink sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1 max-w-[200px] text-center text-xs text-secondary sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
