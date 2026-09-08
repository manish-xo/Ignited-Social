"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type StepDirection = "forward" | "backward";

/** A step can register one of these to intercept the Next button click —
 *  return `false` to block the advance (e.g. to show an inline warning
 *  first), or `true`/`void` to let it through. Can be async. */
export type BeforeNextHook = () => boolean | Promise<boolean>;

interface StepperContextValue {
  currentStep: number; // 0-indexed
  totalSteps: number;
  direction: StepDirection;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCurrentStepValid: boolean;
  /** Shared bag of answers every step reads/writes into. */
  formData: Record<string, unknown>;
  /** Merge new values into the shared form data. */
  updateFormData: (patch: Record<string, unknown>) => void;
  /** Each step calls this (usually from a useEffect) to say whether its
   *  own required fields are filled in. Gates the Next button. */
  setStepValid: (valid: boolean) => void;
  goNext: () => void;
  goBack: () => void;
  /** Step-local overrides — all reset automatically whenever the step
   *  changes, so a step never has to clean up after itself. */
  registerBeforeNext: (hook: BeforeNextHook | null) => void;
  setNextLabel: (label: string | null) => void;
  setHideNav: (hidden: boolean) => void;
  nextLabel: string | null;
  hideNav: boolean;
  isAdvancing: boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepper() {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("useStepper must be used inside <StepperProvider>");
  }
  return ctx;
}

interface StepperProviderProps {
  totalSteps: number;
  onComplete: (formData: Record<string, unknown>) => void;
  children: (value: StepperContextValue) => ReactNode;
}

export function StepperProvider({
  totalSteps,
  onComplete,
  children,
}: StepperProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [validityByStep, setValidityByStep] = useState<Record<number, boolean>>(
    {},
  );

  // Per-step overrides. Plain state (not refs) so the Shell re-renders
  // when a step sets them — but they get reset to defaults on every step
  // change so a step never has to remember to clean up after itself.
  const [beforeNextHook, setBeforeNextHook] = useState<BeforeNextHook | null>(
    null,
  );
  const [nextLabel, setNextLabelState] = useState<string | null>(null);
  const [hideNav, setHideNavState] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const updateFormData = useCallback((patch: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const setStepValid = useCallback(
    (valid: boolean) => {
      setValidityByStep((prev) => {
        if (prev[currentStep] === valid) return prev;
        return { ...prev, [currentStep]: valid };
      });
    },
    [currentStep],
  );

  const registerBeforeNext = useCallback((hook: BeforeNextHook | null) => {
    // Store as a factory so React doesn't try to call `hook` thinking it's
    // a state updater function.
    setBeforeNextHook(() => hook);
  }, []);

  const setNextLabel = useCallback((label: string | null) => {
    setNextLabelState(label);
  }, []);

  const setHideNav = useCallback((hidden: boolean) => {
    setHideNavState(hidden);
  }, []);

  const resetStepOverrides = useCallback(() => {
    setBeforeNextHook(null);
    setNextLabelState(null);
    setHideNavState(false);
  }, []);

  const goNextInternal = useCallback(
    (nextIndex: number, fromLastStep: boolean) => {
      setDirection("forward");
      resetStepOverrides();
      setCurrentStep(nextIndex);
      if (fromLastStep) onComplete(formData);
    },
    [onComplete, formData, resetStepOverrides],
  );

  const goNext = useCallback(async () => {
    if (beforeNextHook) {
      setIsAdvancing(true);
      let allowed = true;
      try {
        allowed = await beforeNextHook();
      } finally {
        setIsAdvancing(false);
      }
      if (!allowed) return;
    }
    const next = Math.min(currentStep + 1, totalSteps - 1);
    goNextInternal(next, currentStep === totalSteps - 1);
  }, [beforeNextHook, currentStep, totalSteps, goNextInternal]);

  const goBack = useCallback(() => {
    setDirection("backward");
    resetStepOverrides();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [resetStepOverrides]);

  const value = useMemo<StepperContextValue>(
    () => ({
      currentStep,
      totalSteps,
      direction,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === totalSteps - 1,
      isCurrentStepValid: validityByStep[currentStep] ?? false,
      formData,
      updateFormData,
      setStepValid,
      goNext,
      goBack,
      registerBeforeNext,
      setNextLabel,
      setHideNav,
      nextLabel,
      hideNav,
      isAdvancing,
    }),
    [
      currentStep,
      totalSteps,
      direction,
      validityByStep,
      formData,
      updateFormData,
      setStepValid,
      goNext,
      goBack,
      registerBeforeNext,
      setNextLabel,
      setHideNav,
      nextLabel,
      hideNav,
      isAdvancing,
    ],
  );

  return (
    <StepperContext.Provider value={value}>
      {children(value)}
    </StepperContext.Provider>
  );
}
