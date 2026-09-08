"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Link2, ShieldCheck, TriangleAlert } from "lucide-react";
import axios from "axios";
// import { useStepper } from "../StepperContext";
import { useStepper } from "../components/stepper/StepperContext";
import { createClient } from "@/lib/supabaseClient";

export default function ConnectInstagramStep() {
  const { formData, updateFormData, setStepValid, registerBeforeNext, goNext } =
    useStepper();

  const [password, setPassword] = useState(
    (formData.instagramPassword as string) ?? "",
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [useTwoFactor, setUseTwoFactor] = useState(
    (formData.useTwoFactor as boolean) ?? false,
  );
  const [backupCodes, setBackupCodes] = useState(
    (formData.backupCodes as string) ?? "",
  );

  const [warningVisible, setWarningVisible] = useState(false);
  const confirmedSamePassword = useRef(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const username = (formData.username as string) ?? "your account";

  // Reveal the confirm-password field once the user signals they're done
  // typing the first one — either by pressing Enter or by tabbing/clicking
  // away with something typed in.
  const revealConfirm = () => {
    if (password.length > 0) setShowConfirm(true);
  };

  // Any edit to the password invalidates a previous "yes, it's the same"
  // confirmation, so we re-check next time Next is pressed.
  useEffect(() => {
    confirmedSamePassword.current = false;
  }, [password]);

  useEffect(() => {
    const passwordsMatch =
      showConfirm && password.length >= 6 && password === confirmPassword;
    const twoFactorSatisfied = !useTwoFactor || backupCodes.trim().length > 0;
    setStepValid(passwordsMatch && twoFactorSatisfied);
    updateFormData({
      instagramPassword: password,
      useTwoFactor,
      backupCodes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPassword, showConfirm, useTwoFactor, backupCodes]);

  // Intercept the Next click: check whether this password matches the
  // dashboard login password before actually advancing.
  useEffect(() => {
    registerBeforeNext(async () => {
      if (confirmedSamePassword.current) return true;

      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.email) return true; // no session to compare against — don't block

        const { data } = await axios.post("/api/account/verify-password", {
          email: user.email,
          password,
        });

        if (data.matches) {
          setWarningVisible(true);
          return false; // hold here until the user confirms
        }
        return true;
      } catch {
        return true; // fail open — don't trap the user over a check that errored
      }
    });

    return () => registerBeforeNext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <div>
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        Connect Your Instagram
      </h1>
      <p className="text-md mt-3 text-center text-secondary">
        Enter the password for the account we'll be growing. Your growth manager
        will use it to securely log in and begin your campaign.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-ink">
              {username.replace(/^@/, "")[0]?.toUpperCase() ?? "?"}
            </div>
          </div>
          <p className="mt-1.5 text-xs font-medium text-secondary">
            @{username.replace(/^@/, "")}
          </p>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-action text-white">
          <Link2 size={15} />
        </span>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-action text-lg font-bold text-white">
            Y
          </div>
          <p className="mt-1.5 text-xs font-medium text-secondary">YourBrand</p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Your credentials are protected with 256-bit encryption and are only used
        by your dedicated growth manager. We never share your login with third
        parties.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Instagram password
          </label>
          <div className="relative">
            <input
              ref={passwordInputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  revealConfirm();
                }
              }}
              onBlur={revealConfirm}
              placeholder="Enter your Instagram password"
              className="w-full rounded-xl border border-border bg-white px-3.5 py-3 pr-11 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {showConfirm && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your Instagram password"
                className="w-full rounded-xl border border-border bg-white px-3.5 py-3 pr-11 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-white p-4">
          <button
            type="button"
            onClick={() => setUseTwoFactor((v) => !v)}
            className="flex w-full items-start gap-3 text-left"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
              <ShieldCheck size={16} />
            </span>
            <span className="flex-1">
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">
                  Two-factor authentication
                </span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success">
                  Recommended
                </span>
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-secondary">
                Turning 2FA on is one of the best ways to keep your account safe
                from takeover attempts. If you already have it on, check the box
                below and share your backup codes so we can connect securely.
              </span>
            </span>
            <span
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                useTwoFactor ? "border-action bg-action" : "border-border"
              }`}
            >
              {useTwoFactor && <span className="h-2 w-2 rounded-sm bg-white" />}
            </span>
          </button>

          {useTwoFactor && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs leading-relaxed text-secondary">
                Open the Instagram app and go to{" "}
                <strong className="text-ink">
                  Settings &amp; Privacy → Accounts Center → Password and
                  Security → Two-Factor Authentication → Additional Method
                </strong>
                , then paste the codes here.
              </p>
              <textarea
                value={backupCodes}
                onChange={(e) => setBackupCodes(e.target.value)}
                rows={3}
                placeholder="Enter your 8-digit backup codes"
                className="mt-3 w-full resize-none rounded-xl border border-action/40 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
              />
            </div>
          )}
        </div>

        {warningVisible && (
          <div className="rounded-2xl bg-[#efe9df] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-amber-600">
                <TriangleAlert size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">
                  Same password detected
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  This looks like the same password you set up for your
                  dashboard login. Just confirming that's intentional before we
                  continue.
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setWarningVisible(false);
                  passwordInputRef.current?.focus();
                }}
                className="h-10 flex-1 rounded-xl border border-border bg-white text-sm font-semibold text-ink hover:bg-border/20"
              >
                Edit Password
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmedSamePassword.current = true;
                  setWarningVisible(false);
                  goNext();
                }}
                className="h-10 flex-1 rounded-xl bg-action text-sm font-semibold text-white hover:bg-action-hover"
              >
                Yes
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted">
          Questions about account security?{" "}
          <a href="#" className="font-medium text-action underline">
            Speak with us
          </a>
        </p>
      </div>
    </div>
  );
}
