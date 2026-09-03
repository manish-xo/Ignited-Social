"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

export type StepDirection = "forward" | "backward";

interface StepperContextValue {
  currentStep: number; // 0-indexed
  totalSteps: number;
  direction: StepDirection;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCurrentStepValid: boolean;
  formData: Record<string, unknown>;
  updateFormData: (patch: Record<string, unknown>) => void;
  setStepValid: (valid: boolean) => void;
  goNext: () => void;
  goBack: () => void;
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

export const StepperProvider = ({
  totalSteps,
  onComplete,
  children,
}: StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const [validityByStep, setValidityByStep] = useState<Record<number, boolean>>(
    {},
  );

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

  const goNext = useCallback(() => {
    setDirection("forward");
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps - 1);
      if (prev === totalSteps - 1) {
        onComplete(formData);
      }
      return next;
    });
  }, [totalSteps, onComplete, formData]);

  const goBack = useCallback(() => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

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
    ],
  );

  return (
    <StepperContext.Provider value={value}>
      {children(value)}
    </StepperContext.Provider>
  );
};
