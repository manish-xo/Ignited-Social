"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

const LIMIT_OPTIONS = [
  "1000",
  "2000",
  "3000",
  "4000",
  "5000",
  "6000",
  "7000",
  "8000",
  "No limit",
];

export default function FollowingLimitStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [limit, setLimit] = useState<string>(
    (formData.followingLimit as string) ?? "6000",
  );

  useEffect(() => {
    // A value is always selected by default, so this step is never blocking.
    setStepValid(true);
    updateFormData({ followingLimit: limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Choose your following limit
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Set the maximum number of accounts you want to follow at any one time.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-ink">
          Following limit
        </label>
        <div className="relative">
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full appearance-none rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
          >
            {LIMIT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          A lower cap keeps your following count tighter. Choosing "No limit"
          lets your growth manager prioritize faster growth.
        </p>
      </div>
    </div>
  );
}
