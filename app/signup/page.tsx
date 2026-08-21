import React from "react";
import {
  Check,
  ShieldCheck,
  Star,
  ArrowRight,
  Lock,
  Undo2,
  FileX,
} from "lucide-react";
import { getPlan } from "@/lib/plans";
import Link from "next/link";
import { instagramService } from "@/service/instagram.service";
import InstagramUsernameInput from "@/components/signup/InstagramUsernameInput";

interface SignupPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);
  const savingsPct = plan.originalPrice
    ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)
    : null;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ===== LEFT — dark plan summary panel ===== */}
      <div className="bg-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-xl mt-24 sm:mt-16">
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
            Your Plan
          </p>

          {/* plan switcher pills */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(["grow", "scale"] as const).map((slug) => {
              const p = getPlan(slug);
              const isActive = plan.slug === slug;
              console.log(isActive);
              return (
                <Link
                  key={slug}
                  href={`/signup?plan=${slug}`}
                  replace
                  className={`relative rounded-xl border p-3.5 transition-colors ${
                    isActive
                      ? "border-white bg-white text-ink"
                      : "border-white/15 bg-white/5 text-white hover:border-white/30"
                  }`}
                >
                  {p.originalPrice && (
                    <span className="absolute -top-2 right-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-white">
                      SAVE{" "}
                      {Math.round(
                        ((p.originalPrice - p.price) / p.originalPrice) * 100,
                      )}
                      %
                    </span>
                  )}
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p
                    className={`text-xs ${isActive ? "text-secondary" : "text-white/50"}`}
                  >
                    ${p.price}/mo
                  </p>
                </Link>
              );
            })}
          </div>

          {/* plan detail card */}
          <div className="mt-5 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-white/50">
              {plan.name.toUpperCase()} PLAN
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading text-4xl font-extrabold">
                ${plan.price}
              </span>
              {plan.originalPrice && (
                <span className="text-base text-white/40 line-through">
                  ${plan.originalPrice}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-white/50">
              per month · cancel anytime
            </p>

            <ul className="mt-5 space-y-3">
              {plan.features.map((f) => (
                <li key={f.text} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-success" />
                  <div>
                    <p className="text-sm text-white/90">{f.text}</p>
                    {f.note && (
                      <p className="text-xs text-white/40">{f.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* testimonial */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              &ldquo;{plan.testimonial.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-action-tint-bg text-[11px] font-bold text-action">
                {plan.testimonial.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold">{plan.testimonial.name}</p>
                <p className="text-[11px] text-white/40">
                  {plan.testimonial.handle}
                </p>
              </div>
            </div>
          </div>

          {/* trust stats */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
                Trustpilot
              </p>
              <p className="mt-1 font-heading text-xl font-bold">4.6 / 5</p>
              <p className="mt-1 text-[11px] text-white/40">328 reviews</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
                Active Clients
              </p>
              <p className="mt-1 font-heading text-xl font-bold">1,600+</p>
              <p className="mt-1 text-[11px] text-white/40">
                Brands, Creators &amp; Agencies
              </p>
            </div>
          </div>

          {/* guarantee */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-dashed border-success/30 bg-success/10 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-xs font-bold text-white">
              30
              <br />
              DAY
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                30-day money-back guarantee
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                Not happy with your growth? We&apos;ll refund every dollar. No
                contracts, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT — form ===== */}
      <div className="bg-canvas relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto sticky top-48 max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Your Details
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-ink">
            Let&apos;s start growing
          </h1>
          <p className="mt-2 text-sm text-secondary">
            Tell us which account you&apos;d like to grow, and how our team
            should contact you.
          </p>

          <form className="mt-8 space-y-5">
            <InstagramUsernameInput />

            <div>
              <label className="text-xs font-semibold text-ink">
                Email{" "}
                <span className="font-normal text-muted">
                  — for receipts &amp; updates
                </span>
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
              />
            </div>

            {/* hidden field carries the selected plan through to your backend/payment step */}
            <input type="hidden" name="plan" value={plan.slug} />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-action py-3.5 text-sm font-semibold text-white transition-colors hover:bg-action-hover"
            >
              Continue to payment <ArrowRight size={15} />
            </button>

            <p className="text-center text-xs text-muted">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-action underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-action underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Lock size={12} /> SSL secured
            </span>
            <span className="flex items-center gap-1">
              <Undo2 size={12} /> 30-day guarantee
            </span>
            <span className="flex items-center gap-1">
              <FileX size={12} /> No contracts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
