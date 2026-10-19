"use client";

import { useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { CalendarDays, Mail, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { showSuccessToast } from "@/components/custom/Toaster/SuccessToast";
import { showErrorToast } from "@/components/custom/Toaster/ErrorToast";
import { rateManager } from "../../(app)/actions";
import { supportMailto } from "../../lib/support";
import type { GrowthManager } from "../../lib/types";
import { Eyebrow, GlassCard } from "../ui";

export default function ManagerCard({
  manager,
  rating: savedRating,
  username,
}: {
  manager: GrowthManager;
  rating: number | null;
  username: string | null;
}) {
  const [rating, setRating] = useState(savedRating ?? 0);
  const [hover, setHover] = useState(0);
  const [pending, startTransition] = useTransition();
  const starsRef = useRef<HTMLDivElement>(null);
  const shown = hover || rating;
  const who = username ? `Instagram: @${username}\n\n` : "";

  const rate = (value: number) => {
    const previous = rating;
    setRating(value);

    // Little pop on the stars up to the one clicked.
    const stars = starsRef.current?.querySelectorAll("[data-star]");
    if (stars) {
      gsap.fromTo(
        Array.from(stars).slice(0, value),
        { scale: 0.6 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.45)", stagger: 0.05 },
      );
    }

    startTransition(async () => {
      const res = await rateManager(value);
      if (res.ok) {
        showSuccessToast({
          title: "Thanks for the feedback",
          description: `You rated ${manager.name} ${value} out of 5.`,
        });
      } else {
        setRating(previous);
        showErrorToast({
          title: "Couldn't save your rating",
          description: "Please try again in a moment.",
        });
      }
    });
  };

  return (
    <GlassCard>
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-action-subtle to-action-shadow font-heading text-xl font-bold text-white shadow-[0_12px_24px_-12px_rgba(61,53,122,0.8)]">
            {manager.avatarInitial}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white">
            <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-success/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
          </span>
        </div>
        <div>
          <p className="font-heading text-lg font-bold leading-tight text-ink">
            {manager.name}
          </p>
          <p className="text-xs text-muted">Your Growth Manager</p>
        </div>
      </div>

      <Eyebrow className="mt-5">Campaign activity</Eyebrow>
      <p className="glass-inset mt-2 rounded-2xl p-4 text-sm leading-relaxed text-ink">
        {manager.activityNote}
      </p>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <a
          href={supportMailto(
            `Book a call with ${manager.name}`,
            `${who}Times that work for me:\n`,
          )}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-action text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(90,76,224,0.9)] transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-action-hover"
        >
          <CalendarDays size={15} />
          Book a call
        </a>
        <a
          href={supportMailto(`Message for ${manager.name}`, who)}
          aria-label={`Email ${manager.name}`}
          className="glass-inset flex h-11 w-11 items-center justify-center rounded-2xl text-ink transition-colors duration-300 hover:text-action"
        >
          <Mail size={16} />
        </a>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/5 pt-4">
        <span className="text-sm text-secondary">
          How&apos;s {manager.name} doing?
        </span>
        <div
          ref={starsRef}
          className="flex"
          onMouseLeave={() => setHover(0)}
          role="radiogroup"
          aria-label={`Rate ${manager.name}`}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              disabled={pending}
              onMouseEnter={() => setHover(n)}
              onClick={() => rate(n)}
              className="p-0.5 disabled:cursor-wait"
            >
              <Star
                data-star
                size={18}
                className={cn(
                  "transition-colors duration-200",
                  n <= shown
                    ? "fill-amber-400 text-amber-400"
                    : "text-border-strong",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
