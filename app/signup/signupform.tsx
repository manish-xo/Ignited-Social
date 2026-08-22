"use client";

import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import InstagramUsernameInput from "@/components/signup/InstagramUsernameInput";
import { useDispatch, useSelector } from "react-redux";
import { setSignup, setStatus, setError } from "@/libs/dataslice";
import { RootState } from "@/libs/store";
import { signupSchema, SignupFormValues } from "@/schema/signup.schema";
import axios from "axios";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { isValid } from "zod/v3";

interface SignupFormProps {
  plan: "grow" | "scale";
}

const Signupform = ({ plan }: SignupFormProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const onSubmit = async (values: SignupFormValues) => {
    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    try {
      const res = await axios.post("/api/signup", {
        instagramUsername: values.username,
        instagramProfilePic: values.profilePicUrl,
        email: values.email,
        plan,
      });
      console.log(res);
      dispatch(setSignup(res.data.data));
      dispatch(setStatus("success"));

      router.push(`/payment?plan=${plan}`);
    } catch (err: any) {
      dispatch(setStatus("error"));

      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      dispatch(setError(message));
    }
  };

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
            disabled={status === "submitting" || !isValid}
            className="flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting..." : "Continue to payment"}
            {status !== "submitting" && <ArrowRight size={15} />}
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
