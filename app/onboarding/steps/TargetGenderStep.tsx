"use client";

import { useEffect, useState } from "react";
// import { useStepper } from "../StepperContext";
import { useStepper } from "../components/stepper/StepperContext";

const OPTIONS = ["All", "Male", "Female"];

export default function TargetGenderStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [gender, setGender] = useState<string>(
    (formData.targetGender as string) ?? "",
  );

  useEffect(() => {
    setStepValid(gender.length > 0);
    updateFormData({ targetGender: gender });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Select your target gender
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Choose the audience mix you want us to focus on.
      </p>

      <div className="mt-6 space-y-2.5">
        {OPTIONS.map((opt) => {
          const isSelected = gender === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setGender(opt)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-colors ${
                isSelected
                  ? "border-action bg-action-tint-bg text-ink"
                  : "border-border bg-white text-ink hover:border-action/40"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-action" : "border-border"
                }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-action" />
                )}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
