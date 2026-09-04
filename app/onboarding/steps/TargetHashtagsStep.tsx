"use client";

import { useEffect } from "react";
import { useStepper } from "../components/stepper/StepperContext";
import Accordion from "../components/ui/Accordion";
import TagInput from "../components/ui/TagInput";

export default function TargetHashtagsStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const hashtags = (formData.targetHashtags as string[]) ?? [];

  useEffect(() => {
    setStepValid(hashtags.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtags]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Target Hashtags
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Add hashtags connected to your niche and ideal audience.
      </p>

      <div className="mt-6">
        <TagInput
          values={hashtags}
          onChange={(v) => updateFormData({ targetHashtags: v })}
          max={50}
          placeholder="E.g. fitnessmotivation"
          prefix="#"
        />
      </div>

      <div className="mt-5">
        <Accordion label="How hashtags help your growth">
          <p>
            Hashtags put your content in front of people actively browsing your
            niche. A mix of broad and specific tags tends to work best — broad
            ones for reach, specific ones for relevance.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
