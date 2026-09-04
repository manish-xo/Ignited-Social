"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";
import Accordion from "../components/ui/Accordion";
import TagInput from "../components/ui/TagInput";

type Scope = "local" | "local-plus-national";

export default function LocationTargetingStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const locations = (formData.locations as string[]) ?? [];
  const [scope, setScope] = useState<Scope>(
    (formData.locationScope as Scope) ?? "local-plus-national",
  );

  useEffect(() => {
    setStepValid(locations.length > 0);
    updateFormData({ locations, locationScope: scope });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, scope]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Location Targeting
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Add the locations you want us to focus on.
      </p>

      <div className="mt-6">
        <TagInput
          values={locations}
          onChange={(v) => updateFormData({ locations: v })}
          max={20}
          placeholder="Search for a city, state, or country"
          icon={<MapPin size={15} />}
        />
      </div>

      <div className="mt-5">
        <Accordion label="How location targeting works">
          <p>
            We prioritize discovery and engagement from accounts based in the
            locations you add here, so the followers you gain are more likely to
            match your actual customer base.
          </p>
        </Accordion>
      </div>

      <div className="mt-5 rounded-2xl bg-[#efe9df] p-5">
        <p className="text-sm font-bold text-ink">
          Expand your reach for faster growth
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-secondary">
          We can focus on local followers in your target areas, or widen the net
          to a national audience for more reach and engagement.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setScope("local")}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              scope === "local"
                ? "border-success bg-white text-ink"
                : "border-border bg-white text-ink hover:border-action/40"
            }`}
          >
            Local Only
          </button>
          <button
            type="button"
            onClick={() => setScope("local-plus-national")}
            className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              scope === "local-plus-national"
                ? "border-success bg-white text-ink"
                : "border-border bg-white text-ink hover:border-action/40"
            }`}
          >
            Local + National
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success">
              Recommended
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
