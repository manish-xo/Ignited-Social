"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { type StepDefinition } from "./components/stepper/StepperShell";
import StepperShell from "./components/stepper/StepperShell";
import { PlaceholderStep } from "./steps/PlaceholderStep";
import InstagramGoalsStep from "./steps/InstagramGoalsStep";
import AudienceStep from "./steps/AudienceStep";
import LocationTargetingStep from "./steps/LocationTargetingStep";
import SimilarAccountsStep from "./steps/SimilarAccountsStep";
import TargetHashtagsStep from "./steps/TargetHashtagsStep";
import TargetGenderStep from "./steps/TargetGenderStep";
import FollowingLimitStep from "./steps/FollowingLimitStep";
import GrowthActivityStep from "./steps/GrowthActivityStep";
import FinalDetailsStep from "./steps/FinalDetailsStep";
import ConnectInstagramStep from "./steps/ConnectInstagramStep";
import HowHeardStep from "./steps/HowHeardStep";
import GrowthNoteStep from "./steps/GrowthNoteStep";
import LaunchCallStep from "./steps/LaunchCallStep";
import RedirectStep from "./steps/RedirectStep";
import Logo from "@/components/Logo/Logo";
import { showErrorToast } from "@/components/custom/Toaster/ErrorToast";

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
  { id: "step-3", Component: SimilarAccountsStep },
  { id: "step-4", Component: TargetHashtagsStep },
  { id: "step-5", Component: LocationTargetingStep },
  { id: "step-6", Component: TargetGenderStep },
  { id: "step-7", Component: FollowingLimitStep },
  { id: "step-8", Component: GrowthActivityStep },
  { id: "step-9", Component: FinalDetailsStep },
  { id: "step-10", Component: ConnectInstagramStep },
  { id: "step-11", Component: HowHeardStep },
  { id: "step-12", Component: GrowthNoteStep },
  { id: "step-13", Component: LaunchCallStep },
  { id: "step-14", Component: RedirectStep },
];
// ─────────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = async (formData: Record<string, unknown>) => {
    // Marks onboarding finished on the account — proxy.ts then keeps
    // /onboarding closed and opens the dashboard. (Answers aren't stored yet.)
    try {
      const { data } = await axios.post("/api/onboarding/complete", formData);
      // replace: Back from the dashboard shouldn't reopen the finished wizard.
      router.replace(data.next ?? "/dashboard/billing");
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      // The dashboard stays locked until this succeeds, so let them retry.
      showErrorToast({
        title: "Couldn't finish onboarding",
        description: "Please check your connection and try again.",
      });
    }
  };

  return (
    <StepperShell
      steps={STEPS}
      onComplete={handleComplete}
      logo={
        <div className="flex items-center gap-2 font-heading text-lg font-bold text-ink">
          <Logo
            className=""
            mainLogoTxt="#faf9f6"
            outerTxt="#221f1b"
            circleStroke="#faf9f6"
          />
        </div>
      }
    />
  );
}
