"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface InstagramAvatarProps {
  src?: string | null;
  username: string;
  size?: number;
  className?: string;
  /** Classes for the letter shown when there's no picture. */
  fallbackClassName?: string;
}

// Encodes the raw Instagram CDN URL to pass safely through our proxy route.
function getProxiedImageUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;
  return `/api/instagram/image?url=${encodeURIComponent(rawUrl)}`;
}

// Instagram CDN links expire after a few days, so a picture saved at signup
// can 404 later. Look the account up again for a fresh link.
async function fetchFreshPicture(username: string): Promise<string | null> {
  try {
    const { data } = await axios.get("/api/instagram/search", {
      params: { type: "account", q: username },
    });
    const match = (data.data as { username: string; profilePicUrl: string }[])
      ?.find((a) => a.username.toLowerCase() === username.toLowerCase());
    return match?.profilePicUrl ?? null;
  } catch {
    return null;
  }
}

export default function InstagramAvatar({
  src,
  username,
  size = 36,
  className = "",
  fallbackClassName = "bg-subtle-bg text-xs font-semibold text-muted",
}: InstagramAvatarProps) {
  const handle = username.replace(/^@/, "");
  const [current, setCurrent] = useState(src ?? null);
  const [refreshed, setRefreshed] = useState(false);
  const [failed, setFailed] = useState(false);

  // A new src (e.g. once the profile finishes loading) gets a fresh attempt.
  useEffect(() => {
    setCurrent(src ?? null);
    setRefreshed(false);
    setFailed(false);
  }, [src]);

  const handleError = async () => {
    if (!refreshed && handle) {
      setRefreshed(true);
      const fresh = await fetchFreshPicture(handle);
      if (fresh && fresh !== current) return setCurrent(fresh);
    }
    setFailed(true);
  };

  const proxiedSrc = getProxiedImageUrl(current);
  const showImage = proxiedSrc && !failed;

  return showImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={proxiedSrc}
      alt={handle}
      onError={handleError}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full ${fallbackClassName} ${className}`}
    >
      {handle[0]?.toUpperCase() ?? "?"}
    </div>
  );
}
