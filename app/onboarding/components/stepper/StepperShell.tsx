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

export const StepperShell = ({
  steps,
  onComplete,
  logo,
}: StepperShellProps) => {
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
};

const StepperCard = ({ steps }: { steps: StepDefinition[] }) => {
  const {
    currentStep,
    totalSteps,
    direction,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,
    goNext,
    goBack,
  } = useStepper();
  const trackRef = useRef<HTMLDivElement>(null);

  const [displayStep, setDisplayStep] = useState(currentStep);
  const isFirstRender = useRef(true);

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
  }, [currentStep]);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el || isFirstRender.current) return;

    const dir = direction === "forward" ? 1 : -1;
    gsap.fromTo(
      el,
      { xPercent: dir * 15, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
    );
  }, [displayStep]);

  const StepComponent = steps[displayStep]?.Component;
  const percent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
      {/* progress */}
      <div className="mb-2 flex items-center justify-between text-[11px] font-[500] uppercase tracking-wide text-muted">
        <span className="tracking-[0.1rem]">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="tracking-[0.1rem]">{percent}%</span>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full bg-action transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* animated step content */}
      <div className="overflow-hidden">
        <div ref={trackRef}>{StepComponent && <StepComponent />}</div>
      </div>

      {/* nav */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={isFirstStep}
          className="h-12 flex-1 rounded-xl border border-border text-md font-[500] text-ink transition-colors hover:bg-border/20 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!isCurrentStepValid}
          className="h-12 flex-[2] rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-40"
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
