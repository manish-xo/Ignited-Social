"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

const NICHE_OPTIONS = [
  "Health",
  "Fitness",
  "Tech",
  "Finance",
  "Real Estate",
  "Food",
  "Fashion",
  "Other",
];

export default function AudienceStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [niche, setNiche] = useState<string>((formData.niche as string) ?? "");
  const [customNiche, setCustomNiche] = useState<string>(
    (formData.customNiche as string) ?? "",
  );
  const [targetAudience, setTargetAudience] = useState<string>(
    (formData.targetAudience as string) ?? "",
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const needsCustomNiche = niche === "Other";

  useEffect(() => {
    const valid =
      niche.length > 0 &&
      (!needsCustomNiche || customNiche.trim().length > 0) &&
      targetAudience.trim().length > 0;
    setStepValid(valid);
    updateFormData({ niche, customNiche, targetAudience });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niche, customNiche, targetAudience]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-[700] tracking-tighter leading-8 text-ink sm:text-4xl">
        Tell us about your audience
      </h1>
      <p className="mt-2 text-md mt-3 text-secondary text-center">
        Share your niche and the people you want to attract on Instagram.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Niche
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3.5 py-3 text-left text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
            >
              <span className={niche ? "text-ink" : "text-placeholder"}>
                {niche || "Select your niche"}
              </span>
              <ChevronDown size={16} className="text-muted" />
            </button>

            {dropdownOpen && (
              <ul className="absolute z-10 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-border bg-white py-1.5 shadow-lg">
                {NICHE_OPTIONS.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => {
                        setNiche(opt);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-border/20 ${
                        opt === niche ? "font-semibold text-action" : "text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {needsCustomNiche && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Your niche
            </label>
            <input
              type="text"
              value={customNiche}
              onChange={(e) => setCustomNiche(e.target.value)}
              placeholder="e.g. Outdoors"
              className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Target audience
          </label>
          <textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            rows={3}
            placeholder="Women in the USA and Canada who are interested in fitness and a healthy diet"
            className="w-full resize-none rounded-xl border border-action/40 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
          />
        </div>
      </div>
    </div>
  );
}
