"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import {
  StepperShell,
  type StepDefinition,
} from "./components/stepper/StepperShell";
import { PlaceholderStep } from "./steps/PlaceholderStep";
import InstagramGoalsStep from "./steps/InstagramGoalsStep";
import AudienceStep from "./steps/AudienceStep";
import Logo from "@/components/Logo/Logo";

// ── Add your steps here, in order. ──────────────────────────────────────
// Each entry needs a unique `id` (used as the React key) and a
// `Component` — any component that calls useStepper() to read/write
// formData and report its own validity. See InstagramGoalsStep.tsx and
// AudienceStep.tsx for the pattern to copy.
const STEPS: StepDefinition[] = [
  { id: "goals", Component: InstagramGoalsStep },
  { id: "audience", Component: AudienceStep },
  // Steps 3–14: replace these placeholders one at a time as you build
  // each real step component.
  { id: "step-3", Component: () => <PlaceholderStep title="Step 3" /> },
  { id: "step-4", Component: () => <PlaceholderStep title="Step 4" /> },
  { id: "step-5", Component: () => <PlaceholderStep title="Step 5" /> },
  { id: "step-6", Component: () => <PlaceholderStep title="Step 6" /> },
  { id: "step-7", Component: () => <PlaceholderStep title="Step 7" /> },
  { id: "step-8", Component: () => <PlaceholderStep title="Step 8" /> },
  { id: "step-9", Component: () => <PlaceholderStep title="Step 9" /> },
  { id: "step-10", Component: () => <PlaceholderStep title="Step 10" /> },
  { id: "step-11", Component: () => <PlaceholderStep title="Step 11" /> },
  { id: "step-12", Component: () => <PlaceholderStep title="Step 12" /> },
  { id: "step-13", Component: () => <PlaceholderStep title="Step 13" /> },
  { id: "step-14", Component: () => <PlaceholderStep title="Step 14" /> },
];
// ─────────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = async (formData: Record<string, unknown>) => {
    try {
      await axios.post("/api/onboarding/complete", formData);
    } catch (err) {
      console.error("Failed to save onboarding answers:", err);
      // Non-blocking on purpose — don't strand the user on a finished
      // wizard just because the save call failed. Swap this for whatever
      // error handling fits once the endpoint is real.
    }
    router.push("/dashboard");
  };

  return (
    <StepperShell
      steps={STEPS}
      onComplete={handleComplete}
      logo={
        <div className="flex items-center gap-2 font-heading text-lg font-bold text-ink">
          <Logo className="" />
        </div>
      }
    />
  );
}
