"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createClient } from "@/lib/supabaseClient";
import { resetAll } from "@/libs/dataslice";
import { showErrorToast } from "@/components/custom/Toaster/ErrorToast";

export function useSignOut() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    const { error } = await createClient().auth.signOut();
    if (error) {
      setSigningOut(false);
      showErrorToast({
        title: "Couldn't log out",
        description: "Please try again in a moment.",
      });
      return;
    }
    // Saved signup details belong to this account; don't leave them behind.
    dispatch(resetAll());
    router.replace("/dashboard/login");
    router.refresh();
  };

  return { signOut, signingOut };
}
