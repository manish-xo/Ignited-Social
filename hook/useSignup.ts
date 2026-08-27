"use client";
import { useDispatch, UseDispatch } from "react-redux";
import { supabase } from "@/libs/supabase";
import { setSignup, setStatus, setError } from "@/libs/dataslice";
import { profile } from "console";

interface SignupPayload {
  username: string;
  profilePicUrl?: string;
  email: string;
  plan: "grow" | "scale";
}

export const useSignup = () => {
  const dispatch = useDispatch();

  const signup = async (values: SignupPayload) => {
    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    try {
      const uid = crypto.randomUUID();

      const signupData = {
        uid,
        instagram_username: values.username,
        instagram_profile_pic: values.profilePicUrl || null,
        email: values.email.trim().toLowerCase(),
        plan: values.plan,
      };

      const { error } = await supabase.from("Signup").insert(signupData);
      if (error) throw error;

      const reduxSignupData = {
        signupId: uid,
        username: values.username,
        profilePicUrl: values.profilePicUrl || "",
        email: values.email.trim().toLowerCase(),
        plan: values.plan,
      };

      dispatch(setSignup(reduxSignupData));
      dispatch(setStatus("success"));

      return { success: true, data: reduxSignupData };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      console.error("Signup error:", error);

      dispatch(setStatus("error"));
      dispatch(setError(message));

      return { success: false, error: message };
    }
  };
  return { signup };
};
