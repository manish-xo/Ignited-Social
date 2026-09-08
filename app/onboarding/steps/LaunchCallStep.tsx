"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Loader2, MapPin } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

export default function LaunchCallStep() {
  const { formData, setHideNav, goNext } = useStepper();
  const [phase, setPhase] = useState<"submitting" | "ready">("submitting");

  const username = (formData.username as string) ?? "your account";

  useEffect(() => {
    setHideNav(true);
    return () => setHideNav(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This is the step actually labeled "submitting", so this is where the
  // real save happens. If it fails, we log it for debugging but still move
  // the user forward — a stalled wizard over a background save hiccup is
  // worse than a silently-retried save. Wire up a retry/webhook later if
  // this needs to be bulletproof.
  useEffect(() => {
    let cancelled = false;

    axios
      .post("/api/onboarding/complete", formData)
      .catch((err) => {
        console.error("Failed to save onboarding answers:", err);
      })
      .finally(() => {
        if (!cancelled) setPhase("ready");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "submitting") {
    return (
      <div>
        <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
          Submitting your growth preferences
        </h1>
        <p className="text-md mt-3 text-center text-secondary">
          We're saving everything you've told us so far.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#efe9df] p-5">
          <Loader2 size={18} className="animate-spin text-success" />
          <p className="text-sm font-medium text-ink">
            Submitting your growth preferences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Book your launch call
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Your growth manager will walk you through your strategy and get your
        campaign started.
      </p>

      <div className="mt-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-lg font-bold text-ink">
            {username.replace(/^@/, "")[0]?.toUpperCase() ?? "?"}
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold text-ink">
          @{username.replace(/^@/, "")}
        </p>
      </div>

      <p className="mt-4 text-center text-sm text-secondary">
        Your growth preferences are saved. Book a quick call with your growth
        manager to lock in your strategy and get your campaign moving.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-action text-white">
              <Bell size={15} />
            </span>
            <p className="text-sm font-bold text-ink">
              Expect a heads-up from Instagram
            </p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-secondary">
            Your manager signs in from a real device, so Instagram may send a
            one-time security alert the first time. Confirming{" "}
            <strong className="text-ink">it was you</strong> keeps your account
            from getting locked right as your campaign starts.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-[#f6f4ee] p-4">
          <p className="mb-2 text-[11px] font-semibold text-muted">Instagram</p>
          <div className="flex h-20 items-center justify-center rounded-lg bg-border/30 text-muted">
            <MapPin size={22} />
          </div>
          <p className="mt-2 text-xs font-semibold text-ink">
            Unusual login attempt
          </p>
          <p className="text-[11px] text-secondary">
            Let us know if this was you.
          </p>
          <div className="mt-2 rounded-md bg-action py-1.5 text-center text-[11px] font-semibold text-white">
            This Was Me
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={goNext}
          className="h-12 w-full rounded-xl bg-action text-sm font-semibold text-white hover:bg-action-hover"
        >
          Book a call
        </button>
        <button
          type="button"
          onClick={goNext}
          className="w-full text-center text-sm font-medium text-secondary underline underline-offset-2 hover:text-ink"
        >
          I'll do it later
        </button>
        <p className="text-center text-xs text-muted">
          Need help booking?{" "}
          <a href="#" className="font-medium text-action underline">
            Chat with support
          </a>
        </p>
      </div>
    </div>
  );
}
