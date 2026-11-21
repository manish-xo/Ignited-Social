"use client";
import { useDispatch } from "react-redux";
import { setSignup, setStatus, setError } from "@/libs/dataslice";

interface SignupPayload {
  username: string;
  profilePicUrl?: string;
  email: string;
  plan: "grow" | "scale";
}

type SignupResult =
  | {
      success: true;
      /** Where to go next (the payment page). */
      next: string;
      data: {
        signupId: string;
        username: string;
        profilePicUrl: string;
        email: string;
        plan: "grow" | "scale";
      };
    }
  | { success: false; error: string; code?: "already_registered" };

/**
 * Signs the user up with a single request to /api/signup, which checks the
 * email / username, saves the signup and unlocks the payment page.
 */
export const useSignup = () => {
  const dispatch = useDispatch();

  const signup = async (values: SignupPayload): Promise<SignupResult> => {
    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    const fail = (error: string, code?: "already_registered") => {
      dispatch(setStatus("error"));
      dispatch(setError(error));
      return { success: false as const, error, code };
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        return fail(
          body.message || "Something went wrong. Please try again.",
          body.code === "already_registered" ? "already_registered" : undefined,
        );
      }

      // The payment and later steps read these from the store.
      const data = {
        signupId: body.signupId as string,
        username: values.username,
        profilePicUrl: values.profilePicUrl || "",
        email: values.email.trim().toLowerCase(),
        plan: values.plan,
      };
      dispatch(setSignup(data));
      dispatch(setStatus("success"));
      return { success: true, next: body.next as string, data };
    } catch {
      return fail(
        "We can't reach our servers right now. Please try again shortly.",
      );
    }
  };

  return { signup };
};
