"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Popover } from "radix-ui";
import { useStepper } from "../components/stepper/StepperContext";

const NICHE_OPTIONS = [
  "Finance",
  "Fitness",
  "Food",
  "Health",
  "Real Estate",
  "Music",
  "Entrepreneurship",
  "Tech",
  "Art",
  "Photography",
  "Skincare",
  "Fashion",
  "Beauty",
  "Other",
];

export default function AudienceStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [niche, setNiche] = useState<string>((formData.niche as string) ?? "");
  const [targetAudience, setTargetAudience] = useState<string>(
    (formData.targetAudience as string) ?? "",
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const valid = niche.length > 0 && targetAudience.trim().length > 0;
    setStepValid(valid);
    updateFormData({ niche, targetAudience });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niche, targetAudience]);

  return (
    <div>
      <h1 className="text-4xl text-center font-[700] tracking-tighter leading-8 text-ink sm:text-4xl">
        Tell us about your audience
      </h1>
      <p className="text-md mt-3 text-secondary text-center">
        Share your niche and the people you want to attract on Instagram.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Niche
          </label>
          {/* The list renders in a portal so the stepper card's
              overflow-hidden can't clip it; it flips above the button when
              there isn't room below. */}
          <Popover.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3.5 py-3 text-left text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
              >
                <span className={niche ? "text-ink" : "text-placeholder"}>
                  {niche || "Select your niche"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                side="bottom"
                align="start"
                sideOffset={6}
                collisionPadding={12}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="z-50 w-(--radix-popover-trigger-width) rounded-xl border border-border bg-white p-1.5 shadow-lg"
              >
                {/* Plain native scrolling with an always-visible scrollbar.
                    data-lenis-prevent stops the site-wide Lenis smooth
                    scroll from swallowing the wheel events meant for this
                    list. */}
                <div
                  data-lenis-prevent
                  role="listbox"
                  className="max-h-[min(15rem,calc(var(--radix-popover-content-available-height)-1rem))] overflow-y-scroll overscroll-contain pr-1 [scrollbar-color:#d6d0c4_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d0c4] [&::-webkit-scrollbar-track]:bg-transparent"
                >
                  {NICHE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      role="option"
                      aria-selected={opt === niche}
                      onClick={() => {
                        setNiche(opt);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-border/20 focus:bg-border/20 focus:outline-none ${
                        opt === niche ? "font-semibold text-action" : "text-ink"
                      }`}
                    >
                      {opt}
                      {opt === niche && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

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
