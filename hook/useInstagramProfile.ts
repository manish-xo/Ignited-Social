"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/libs/store";

export interface InstagramProfile {
  username: string | null;
  profilePicUrl: string | null;
}

/**
 * The visitor's own Instagram handle + profile picture from signup.
 * Redux first (instant, same browser), then /api/me/profile (new browser or
 * cleared storage) — that works for logged-in customers and mid-funnel
 * visitors alike.
 */
export function useInstagramProfile(): InstagramProfile {
  const signup = useAppSelector((state) => state.dataSlice.signup);
  const account = useAppSelector((state) => state.dataSlice.account);

  const fromRedux: InstagramProfile = {
    username: signup?.username || account?.username || null,
    profilePicUrl: signup?.profilePicUrl || null,
  };

  const [fromServer, setFromServer] = useState<InstagramProfile | null>(null);
  const needsServer = !fromRedux.username || !fromRedux.profilePicUrl;

  useEffect(() => {
    if (!needsServer) return;
    let cancelled = false;
    axios
      .get<InstagramProfile>("/api/me/profile")
      .then(({ data }) => !cancelled && setFromServer(data))
      .catch(() => {}); // not signed in — fall back to whatever we have
    return () => {
      cancelled = true;
    };
  }, [needsServer]);

  return {
    username: fromRedux.username ?? fromServer?.username ?? null,
    profilePicUrl: fromRedux.profilePicUrl ?? fromServer?.profilePicUrl ?? null,
  };
}
