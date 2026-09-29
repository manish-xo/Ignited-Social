"use client";

import { useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover } from "radix-ui";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";
import mobileExamples from "libphonenumber-js/mobile/examples";

interface PhoneInputProps {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  /** National number as typed, e.g. "98765 43210". */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
}

interface CountryOption {
  code: CountryCode;
  name: string;
  dial: string; // "+91"
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

// Every country libphonenumber knows (245), sorted by name.
const COUNTRY_OPTIONS: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
    dial: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Windows doesn't render flag emojis (they show as "IN", "US"), so use images.
function Flag({ code }: { code: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
    />
  );
}

/** Formats digits the way people write numbers in that country. */
export function formatNational(digits: string, country: CountryCode) {
  return new AsYouType(country).input(digits);
}

export default function PhoneInput({
  country,
  onCountryChange,
  value,
  onChange,
  onBlur,
  invalid,
}: PhoneInputProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selected =
    COUNTRY_OPTIONS.find((c) => c.code === country) ?? COUNTRY_OPTIONS[0];

  // A real example number for the country, e.g. "081234 56789" for India.
  const placeholder = useMemo(
    () => getExampleNumber(country, mobileExamples)?.formatNational() ?? "",
    [country],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase() === q ||
        c.dial.slice(1).startsWith(q),
    );
  }, [search]);

  const handleInput = (raw: string) => {
    // Pasted/typed an international number ("+44 7400 123456"): switch to
    // that country and keep just the national part.
    if (raw.trim().startsWith("+")) {
      const typer = new AsYouType();
      typer.input(raw);
      const detected = typer.getCountry();
      const national = typer.getNationalNumber();
      if (detected && national) {
        onCountryChange(detected);
        onChange(formatNational(national, detected));
        return;
      }
    }

    const digits = raw.replace(/\D/g, "");
    // Stop typing once the number is longer than any valid one for the country.
    if (digits && validatePhoneNumberLength(digits, country) === "TOO_LONG") {
      return;
    }
    onChange(formatNational(digits, country));
  };

  const chooseCountry = (code: CountryCode) => {
    onCountryChange(code);
    // Re-format what's already typed for the new country.
    onChange(formatNational(value.replace(/\D/g, ""), code));
    setPickerOpen(false);
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex items-center rounded-xl border bg-white focus-within:ring-2 ${
        invalid
          ? "border-danger focus-within:ring-danger/30"
          : "border-border focus-within:ring-action/30"
      }`}
    >
      <Popover.Root open={pickerOpen} onOpenChange={setPickerOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={`Country: ${selected.name} (${selected.dial})`}
            className="flex shrink-0 items-center gap-1.5 rounded-l-xl border-r border-border py-3 pl-3.5 pr-2.5 text-sm text-ink hover:bg-border/15 focus:outline-none"
          >
            <Flag code={selected.code} />
            <span className="tabular-nums">{selected.dial}</span>
            <ChevronDown
              size={14}
              className={`text-muted transition-transform ${
                pickerOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          {/* Portalled so the stepper card's overflow-hidden can't clip it. */}
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={6}
            collisionPadding={12}
            className="z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-border bg-white p-1.5 shadow-lg"
          >
            <div className="relative mb-1.5">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    e.preventDefault();
                    chooseCountry(filtered[0].code);
                  }
                }}
                placeholder="Search country or code"
                className="w-full rounded-lg border border-border bg-white py-2 pl-8 pr-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
              />
            </div>

            <div
              // Lenis (site-wide smooth scroll) otherwise swallows the wheel.
              data-lenis-prevent
              role="listbox"
              className="max-h-[min(16rem,calc(var(--radix-popover-content-available-height)-3.5rem))] overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#d6d0c4_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d0c4] [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-sm text-muted">No countries found.</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={c.code === country}
                    onClick={() => chooseCountry(c.code)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-border/20 focus:bg-border/20 focus:outline-none ${
                      c.code === country ? "font-semibold text-action" : "text-ink"
                    }`}
                  >
                    <Flag code={c.code} />
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 tabular-nums text-muted">
                      {c.dial}
                    </span>
                    {c.code === country && <Check size={14} />}
                  </button>
                ))
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <input
        ref={inputRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={invalid}
        className="w-full min-w-0 rounded-r-xl bg-transparent px-3.5 py-3 text-sm tabular-nums text-ink placeholder:text-placeholder focus:outline-none"
      />
    </div>
  );
}
