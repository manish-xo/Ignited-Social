"use client";

import { useEffect, useState } from "react";
import { useStepper } from "../components/stepper/StepperContext";
import Accordion from "../components/ui/Accordion";

const OPTIONS = [
  "I have not used any previous growth strategies on this account",
  "I have used other organic growth strategies on this account",
  "I may have used non-organic growth strategies on this account",
];

export default function GrowthActivityStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [activity, setActivity] = useState<string>(
    (formData.previousGrowthActivity as string) ?? "",
  );

  useEffect(() => {
    setStepValid(activity.length > 0);
    updateFormData({ previousGrowthActivity: activity });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Previous growth activity
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Tell us if you've used growth tactics on this Instagram account before.
      </p>

      <div className="mt-6 space-y-2.5">
        {OPTIONS.map((opt) => {
          const isSelected = activity === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setActivity(opt)}
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

      <div className="mt-5">
        <Accordion label="Learn more about growth strategies">
          <p>
            Our approach relies on real people and real devices only — never
            bots. Knowing your account's history helps your growth manager take
            the right precautions from day one.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Organic:</strong> engagement-based
            services, content-led growth, and community building.
          </p>
          <p className="mt-2">
            <strong className="text-ink">Non-organic:</strong> buying followers,
            bot-driven activity, "follower gain" apps, giveaway schemes, bulk DM
            outreach, or mass story-viewing tools.
          </p>
          <p className="mt-3 border-t border-black/5 pt-3">
            Whatever you select here won't affect your eligibility for our
            service.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
