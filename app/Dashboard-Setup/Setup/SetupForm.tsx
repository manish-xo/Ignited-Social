"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
// import { setupSchema, SetupFormValues } from "@/schema/setup.schema";
import { setupSchema, SetupFormValues } from "@/schema/setup.schema";

interface SetupFormProps {
  plan: string;
  username: string;
  addons: string;
}

export default function SetupForm({ plan, username, addons }: SetupFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SetupFormValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      await axios.post("/api/account/create", {
        email: values.email,
        password: values.password,
        instagramUsername: username,
        plan,
        addons,
      });

      router.push(
        `/dashboard?${new URLSearchParams({ plan, username }).toString()}`,
      );
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ??
          "Couldn't create your account. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 text-left">
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="setup-email">Email</FieldLabel>
          <input
            id="setup-email"
            type="email"
            placeholder="Enter your email"
            data-invalid={!!errors.email}
            className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 data-[invalid=true]:border-danger data-[invalid=true]:focus:ring-danger/30"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="setup-password">Create password</FieldLabel>
          <div className="relative">
            <input
              id="setup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              data-invalid={!!errors.password}
              className="w-full rounded-xl border border-border bg-white px-3.5 py-3 pr-11 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 data-[invalid=true]:border-danger data-[invalid=true]:focus:ring-danger/30"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <FieldError errors={[errors.password]} />
        </Field>

        {serverError && (
          <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
            {serverError}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 flex-1 rounded-xl border border-border text-sm font-semibold text-ink transition-colors hover:bg-border/20"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={submitting || !isValid}
            className="h-12 flex-[2] rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Account"}
          </button>
        </div>
      </FieldGroup>
    </form>
  );
}
