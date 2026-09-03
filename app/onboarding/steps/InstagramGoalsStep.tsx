"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

const GOAL_OPTIONS = [
  "Grow my follower count",
  "Boost my engagement",
  "Drive sales for my products or services",
  "Expand my social media presence",
  "Build a loyal community",
  "Build social proof and credibility",
];

const MAX_SELECTIONS = 3;

export default function InstagramGoalsStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [selected, setSelected] = useState<string[]>(
    (formData.goals as string[]) ?? [],
  );

  useEffect(() => {
    setStepValid(selected.length > 0);
    updateFormData({ goals: selected });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const toggle = (goal: string) => {
    setSelected((prev) => {
      if (prev.includes(goal)) return prev.filter((g) => g !== goal);
      if (prev.length >= MAX_SELECTIONS) return prev; // cap at 3
      return [...prev, goal];
    });
  };

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-4xl text-center font-[700] tracking-tighter text-ink sm:text-4xl">
        Instagram Goals
      </h1>
      <p className="mt-2 text-md mt-3 text-secondary text-center">
        What's your account's goal on Instagram? Select up to {MAX_SELECTIONS}{" "}
        choices that best fit your goals.
      </p>

      <div className="mt-6 space-y-2.5">
        {GOAL_OPTIONS.map((goal) => {
          const isChecked = selected.includes(goal);
          const isDisabled = !isChecked && selected.length >= MAX_SELECTIONS;
          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggle(goal)}
              disabled={isDisabled}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-[500] cursor-pointer transition-colors ${
                isChecked
                  ? "border-action bg-action-tint-bg text-ink"
                  : isDisabled
                    ? "border-border bg-border/10 text-muted"
                    : "border-border bg-white text-ink hover:border-action/40"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                  isChecked
                    ? "border-action bg-action"
                    : "border-border bg-white"
                }`}
              >
                {isChecked && <Check size={11} className="text-white" />}
              </span>
              {goal}
            </button>
          );
        })}
      </div>
    </div>
  );
}
