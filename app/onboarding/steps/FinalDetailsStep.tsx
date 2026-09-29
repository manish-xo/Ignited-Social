"use client";

import { useEffect, useState } from "react";
import {
  isSupportedCountry,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
  type CountryCode,
} from "libphonenumber-js";
import { useStepper } from "../components/stepper/StepperContext";
import PhoneInput from "../components/ui/PhoneInput";
import { useAppSelector } from "@/libs/store";

export default function FinalDetailsStep() {
  const { formData, updateFormData, setStepValid } = useStepper();
  // Start on the billing country from the payment step, else India.
  const billingCountry = useAppSelector(
    (state) => state.dataSlice.payment?.country,
  );
  const [countryCode, setCountryCode] = useState<CountryCode>(() => {
    const saved = (formData.phoneCountry as string) ?? billingCountry;
    return saved && isSupportedCountry(saved) ? saved : "IN";
  });
  const [phoneNumber, setPhoneNumber] = useState<string>(
    (formData.phoneNumber as string) ?? "",
  );
  const [touched, setTouched] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState<string>(
    (formData.additionalDetails as string) ?? "",
  );

  const digits = phoneNumber.replace(/\D/g, "");
  // Checks length and number ranges for the selected country.
  const phoneValid = digits.length > 0 && isValidPhoneNumber(digits, countryCode);
  const showPhoneError = touched && digits.length > 0 && !phoneValid;

  useEffect(() => {
    setStepValid(phoneValid);
    updateFormData({
      phoneCountry: countryCode,
      phoneNumber,
      // Full international format, e.g. "+919876543210" — ready for SMS/WhatsApp.
      phone: phoneValid
        ? parsePhoneNumberWithError(digits, countryCode).number
        : "",
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
          <PhoneInput
            country={countryCode}
            onCountryChange={setCountryCode}
            value={phoneNumber}
            onChange={setPhoneNumber}
            onBlur={() => setTouched(true)}
            invalid={showPhoneError}
          />
          {showPhoneError && (
            <p className="mt-1.5 text-xs text-danger">
              That doesn&apos;t look like a valid number for this country.
            </p>
          )}
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
