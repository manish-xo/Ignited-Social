"use client";

import { useCallback } from "react";
import axios from "axios";

export interface InstagramSuggestion {
  username: string;
  fullName?: string;
  profilePicUrl?: string;
  isVerified?: boolean;
  id?: string;
}

export function useInstagramSuggestions() {
  const getSuggestions = useCallback(async (username: string) => {
    const query = username.trim().replace(/^@+/, "");

    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await axios.get(
        "https://api.socialboost.co/api/customer/instagram-suggestions",
        {
          params: {
            username: query,
          },
        },
      );

      const list = response.data?.data;

      if (!Array.isArray(list)) {
        return [];
      }

      return list.map(
        (user: any): InstagramSuggestion => ({
          id: String(user.id ?? user.pk ?? ""),
          username: user.username,
          fullName: user.full_name || undefined,
          profilePicUrl: user.profile_pic_url || undefined,
          isVerified: user.is_verified ?? false,
        }),
      );
    } catch (error) {
      console.error("Instagram suggestions error:", error);
      return [];
    }
  }, []);

  return {
    getSuggestions,
  };
}
