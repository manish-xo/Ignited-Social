"use client";

import { useEffect } from "react";
import { useStepper } from "../components/stepper/StepperContext";

interface PlaceholderStepProps {
  title?: string;
}

export const PlaceholderStep = ({
  title = "Step coming soon",
}: PlaceholderStepProps) => {
  const { setStepValid } = useStepper();

  useEffect(() => {
    setStepValid(true);
  }, []);

  return (
    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted">
      {title}
    </div>
  );
};
