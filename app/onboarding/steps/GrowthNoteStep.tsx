"use client";

import { useEffect, useState } from "react";
import { useStepper } from "../components/stepper/StepperContext";

export default function GrowthNoteStep() {
  const { formData, updateFormData, setStepValid, setNextLabel } = useStepper();
  const [acknowledged, setAcknowledged] = useState(
    (formData.acknowledgedGrowthNote as boolean) ?? false,
  );

  useEffect(() => {
    setStepValid(acknowledged);
    updateFormData({ acknowledgedGrowthNote: acknowledged });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acknowledged]);

  // This isn't the last step in the array (a couple of automatic
  // confirmation screens follow), but it is the last one the user
  // actively fills in — so the button reads "Finish" here rather than
  // waiting for the true final index.
  useEffect(() => {
    setNextLabel("Finish");
    return () => setNextLabel(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        A quick note on growth
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Growth tools work best paired with strong content and consistent
        posting.
      </p>

      <div className="mt-6 rounded-2xl bg-[#efe9df] p-5">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-success" />
          <p className="text-sm leading-relaxed text-ink">
            <strong>We can build real momentum for your account</strong>, but
            the accounts that see the biggest gains still put in the work on
            their end too — a clear profile, quality posts, and staying active.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAcknowledged((v) => !v)}
        className={`mt-4 flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
          acknowledged
            ? "border-action bg-action-tint-bg"
            : "border-border bg-white hover:border-action/40"
        }`}
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
            acknowledged ? "border-action bg-action" : "border-border"
          }`}
        >
          {acknowledged && <span className="h-2 w-2 rounded-sm bg-white" />}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">
            I understand — let's get started
          </span>
          <span className="mt-0.5 block text-xs text-secondary">
            Confirm you've read the note above to continue.
          </span>
        </span>
      </button>
    </div>
  );
}
