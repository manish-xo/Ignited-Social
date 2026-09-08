"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

export default function RedirectStep() {
  const { setHideNav, goNext } = useStepper();

  useEffect(() => {
    setHideNav(true);
    // Brief, purely visual pause — the real save already happened in the
    // previous step. Calling goNext() here (while already on the last
    // step) is what fires the stepper's onComplete callback.
    const timer = setTimeout(() => goNext(), 1200);
    return () => {
      clearTimeout(timer);
      setHideNav(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Redirecting you now
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Taking you into your dashboard.
      </p>

      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#efe9df] p-5">
        <Loader2 size={18} className="animate-spin text-success" />
        <div>
          <p className="text-sm font-semibold text-ink">
            Redirecting to your dashboard...
          </p>
          <p className="text-xs text-secondary">
            Your onboarding details are ready.
          </p>
        </div>
      </div>
    </div>
  );
}
