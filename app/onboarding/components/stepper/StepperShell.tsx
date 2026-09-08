"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { StepperProvider, useStepper } from "./StepperContext";

export interface StepDefinition {
  id: string;
  Component: ComponentType;
}

interface StepperShellProps {
  steps: StepDefinition[];
  onComplete: (formData: Record<string, unknown>) => void;
  logo?: ReactNode;
}

export default function StepperShell({
  steps,
  onComplete,
  logo,
}: StepperShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-xl">
        {logo && <div className="mb-6 flex justify-center">{logo}</div>}
        <StepperProvider totalSteps={steps.length} onComplete={onComplete}>
          {() => <StepperCard steps={steps} />}
        </StepperProvider>
      </div>
    </div>
  );
}

function StepperCard({ steps }: { steps: StepDefinition[] }) {
  const {
    currentStep,
    totalSteps,
    direction,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,
    goNext,
    goBack,
    hideNav,
    nextLabel,
    isAdvancing,
  } = useStepper();

  const trackRef = useRef<HTMLDivElement>(null);
  // The step actually rendered in the DOM. It lags one tick behind
  // `currentStep` while the exit animation plays, then snaps forward right
  // before the enter animation — so we only ever animate one step's DOM
  // node at a time instead of cross-fading two mounted steps.
  const [displayStep, setDisplayStep] = useState(currentStep);
  const isFirstRender = useRef(true);

  // Exit animation: slide the current content out, then swap in the new
  // step's content (which triggers the enter effect below).
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (displayStep === currentStep) return;

    const dir = direction === "forward" ? 1 : -1;

    gsap.to(el, {
      xPercent: -dir * 15,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setDisplayStep(currentStep),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Enter animation: runs whenever the displayed step content actually
  // changes (right after the exit animation swaps it in).
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el || isFirstRender.current) return;

    const dir = direction === "forward" ? 1 : -1;
    gsap.fromTo(
      el,
      { xPercent: dir * 15, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayStep]);

  const StepComponent = steps[displayStep]?.Component;
  const percent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
      {/* progress */}
      <div className="mb-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-muted">
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full bg-action transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* animated step content — no overflow-hidden here on purpose: it
          was clipping absolutely-positioned content (like this step's
          niche dropdown) that renders outside the card's padded bounds.
          The GSAP slide only shifts 15% (~tens of px) so there's no
          visible overflow glitch from leaving this unclipped. */}
      <div ref={trackRef}>{StepComponent && <StepComponent />}</div>

      {/* nav — a step can hide this entirely (setHideNav(true)) when it
          renders its own action buttons instead, e.g. an auto-advancing
          loading screen or a step with a custom confirmation flow. */}
      {!hideNav && (
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={isFirstStep}
            className="h-12 flex-1 rounded-xl border border-border text-sm font-semibold text-ink transition-colors hover:bg-border/20 disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!isCurrentStepValid || isAdvancing}
            className="h-12 flex-[2] rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-40"
          >
            {isAdvancing
              ? "Checking..."
              : (nextLabel ?? (isLastStep ? "Finish" : "Next"))}
          </button>
        </div>
      )}
    </div>
  );
}
