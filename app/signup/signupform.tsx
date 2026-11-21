"use client";

import { useEffect, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import InstagramUsernameInput from "@/components/signup/InstagramUsernameInput";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { signupSchema, SignupFormValues } from "@/schema/signup.schema";
import { useSignup } from "@/hook/useSignup";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { showErrorToast } from "@/components/custom/Toaster/ErrorToast";

interface SignupFormProps {
  plan: "grow" | "scale";
}

const Signupform = ({ plan }: SignupFormProps) => {
  const router = useRouter();
  // True while the payment page is loading after a successful signup.
  const [redirecting, startRedirect] = useTransition();
  const status = useSelector((state: RootState) => state.dataSlice.status);
  const error = useSelector((state: RootState) => state.dataSlice.error);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      profilePicUrl: "",
      email: "",
    },
  });

  const { signup } = useSignup();

  // Start loading the payment page's code while the user fills in the form.
  useEffect(() => {
    router.prefetch("/payment");
  }, [router]);

  const onSubmit = async (values: SignupFormValues) => {
    const result = await signup({
      username: values.username,
      profilePicUrl: values.profilePicUrl,
      email: values.email,
      plan,
    });

    if (result.success) {
      // Straight to payment (the server already unlocked it). replace, not
      // push: Back shouldn't return to a submitted signup form.
      startRedirect(() => router.replace(result.next));
    } else if (result.code === "already_registered") {
      showErrorToast({
        title: "Already registered",
        description: `${result.error} Try a different one, or log in if it's yours.`,
      });
    } else {
      showErrorToast({
        title: "Signup failed",
        description: result.error || "Something went wrong. Please try again.",
      });
    }
  };

  // Saving, or already on the way to the payment page.
  const busy = status === "submitting" || redirecting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <FieldGroup>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Field data-invalid={!!errors.username}>
              <InstagramUsernameInput
                invalid={!!errors.username}
                onSelect={(selectedUsername, suggestion) => {
                  // The input reports "nothing selected" as soon as it loads
                  // (and while typing). Only tell the form when the choice
                  // really changes, so no error shows before the user acts.
                  if (selectedUsername === field.value) return;
                  field.onChange(selectedUsername);
                  setValue("profilePicUrl", suggestion?.profilePicUrl ?? "");
                }}
              />
              <FieldError errors={[errors.username]} />
            </Field>
          )}
        />

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">
            Email{" "}
            <span className="font-normal text-muted-foreground">
              — for receipts &amp; updates
            </span>
          </FieldLabel>
          <input
            type="email"
            id="email"
            data-invalid={!!errors.email}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 data-[invalid=true]:border-danger data-[invalid=true]:focus:ring-danger/30"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <button
            type="submit"
            disabled={busy || !isValid}
            className="flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
          >
            {busy ? "Continuing…" : "Continue to payment"}
            {!busy && <ArrowRight size={15} />}
          </button>
          {status === "error" && error && (
            <FieldDescription className="text-center text-danger">
              {error}
            </FieldDescription>
          )}
        </Field>

        <FieldDescription className="text-center">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-action underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-action underline">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default Signupform;
