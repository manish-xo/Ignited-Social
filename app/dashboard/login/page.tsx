"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
// import { loginSchema, LoginFormValues } from "@/schema/login.schema";
import { loginSchema, LoginFormValues } from "@/schema/login.schema";
import { createClient } from "@/lib/supabaseClient";
import Logo from "@/components/Logo/Logo";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    setServerError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      setServerError("That email or password doesn't match our records.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 font-heading text-lg font-bold text-ink">
          <Logo />
        </div>

        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-action">
            Dashboard login
          </p>
          <h1 className="mt-3 text-center text-4xl font-[700] tracking-tighter text-ink">
            Sign in to your account
          </h1>
          <p className="text-md mt-3 text-center text-secondary">
            Check in on your campaign progress and manage your subscription.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 text-left">
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="login-email">Email address</FieldLabel>
                <input
                  id="login-email"
                  type="email"
                  data-invalid={!!errors.email}
                  className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 data-[invalid=true]:border-danger data-[invalid=true]:focus:ring-danger/30"
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Link
                    href="/dashboard/forgot-password"
                    className="text-sm font-medium text-action underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    data-invalid={!!errors.password}
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-3 pr-11 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 data-[invalid=true]:border-danger data-[invalid=true]:focus:ring-danger/30"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              <button
                type="submit"
                disabled={submitting || !isValid}
                className="h-12 w-full rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
