"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import InstagramUsernameInput from "@/components/signup/InstagramUsernameInput";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { setSignup, setStatus, setError } from "@/libs/dataslice";
import { RootState } from "@/libs/store";

interface SignupFormProps {
  plan: "grow" | "scale";
}

const signupform = ({ plan }: SignupFormProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const status = useSelector((state: RootState) => state.dataSlice.status);
  const error = useSelector((state: RootState) => state.dataSlice.error);

  return <div>signupform</div>;
};

export default signupform;
