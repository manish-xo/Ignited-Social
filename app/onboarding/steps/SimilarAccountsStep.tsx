"use client";

import { useEffect } from "react";
import { useStepper } from "../components/stepper/StepperContext";
import Accordion from "../components/ui/Accordion";
import TagInput from "../components/ui/TagInput";
import InstagramUsernameInput from "@/components/signup/InstagramUsernameInput";

export default function SimilarAccountsStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const accounts = (formData.similarAccounts as string[]) ?? [];

  useEffect(() => {
    setStepValid(accounts.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Similar Accounts
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Add Instagram handles whose audiences reflect similar interests to your
        target market.
      </p>

      <div className="mt-6">
        {/* <TagInput
          values={accounts}
          onChange={(v) => updateFormData({ similarAccounts: v })}
          max={50}
          placeholder="E.g. fitnesscreator"
          prefix="@"
        /> */}

        <InstagramUsernameInput
          mode="multiple"
          label="Similar accounts"
          placeholder="E.g. fitnesscreator"
          values={accounts}
          onValuesChange={(v) => updateFormData({ similarAccounts: v })}
          max={50}
        />
      </div>

      <div className="mt-5">
        <Accordion label="Tips for choosing the best accounts">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              Pick accounts your ideal follower already follows — not just your
              competitors.
            </li>
            <li>
              Mix a couple of larger accounts with a few smaller, niche-specific
              ones.
            </li>
            <li>
              Skip accounts that look inactive or have a mostly bot-heavy
              following.
            </li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
}
