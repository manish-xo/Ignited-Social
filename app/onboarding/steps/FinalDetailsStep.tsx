"use client";

import { useEffect, useState } from "react";
// import { useStepper } from "../StepperContext";
import { useStepper } from "../components/stepper/StepperContext";

const COUNTRIES = [
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
];

export default function FinalDetailsStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  const [countryCode, setCountryCode] = useState<string>(
    (formData.phoneCountry as string) ?? "IN",
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    (formData.phoneNumber as string) ?? "",
  );
  const [additionalDetails, setAdditionalDetails] = useState<string>(
    (formData.additionalDetails as string) ?? "",
  );

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  useEffect(() => {
    const digits = phoneNumber.replace(/\D/g, "");
    setStepValid(digits.length >= 7);
    updateFormData({
      phoneCountry: countryCode,
      phoneNumber,
      phone: `${country.dial}${phoneNumber}`,
      additionalDetails,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, phoneNumber, additionalDetails]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Final details
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Share your phone number so your growth manager can reach you if needed,
        along with any other details about your goals.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Phone number
          </label>
          <div className="flex items-center rounded-xl border border-border bg-white focus-within:ring-2 focus-within:ring-action/30">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="appearance-none rounded-l-xl border-r border-border bg-transparent py-3 pl-3.5 pr-2 text-sm text-ink focus:outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.dial}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="w-full rounded-r-xl bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Additional details
          </label>
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            rows={4}
            placeholder="Share any additional details about your account, audience, or growth preferences..."
            className="w-full resize-none rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
          />
        </div>
      </div>
    </div>
  );
}
