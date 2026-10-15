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

interface PlanCard {
  slug: "grow" | "scale";
  tagline: string;
  followers: string;
  features: string[];
  featured?: boolean;
}

// Price + name come from lib/plans.ts (same source as signup/payment), so the
// page can never show a different price from checkout.
const PLANS: PlanCard[] = [
  {
    slug: "grow",
    tagline: "Steady audience growth. Practical content advice.",
    followers: "150–500+ followers",
    features: [
      "Your personal Brand Manager",
      "Daily outreach and core targeting",
      "Basic content reviews",
      "Email, phone and video support",
    ],
  },
  {
    slug: "scale",
    tagline: "More growth. A closer look at content and sales.",
    followers: "250–800+ followers",
    featured: true,
    features: [
      "Your personal Senior Brand Manager",
      "Higher-volume outreach and advanced targeting",
      "Monthly content plan and weekly reviews",
      "Offer and conversion funnel review",
      "Email, phone and video support",
    ],
  },
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
                <span className="pb-1.5 text-sm text-secondary">/ month</span>
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
                    key={feature}
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
                    {feature}
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
                  7 days free <span className="mx-1">•</span> Billed monthly{" "}
                  <span className="mx-1">•</span> Cancel anytime
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
          <p className="text-2xl font-bold -tracking-[0.04em] text-ink sm:text-3xl">
            If you leave, your last payment comes back.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary sm:text-base">
            Cancel anytime. We automatically refund your last payment. No claim
            to file. No explanation needed.
          </p>
        </div>
      </div>
    </div>
  );
}
