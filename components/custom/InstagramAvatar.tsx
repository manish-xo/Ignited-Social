"use client";

import React, { useState } from "react";

interface InstagramAvatarProps {
  src?: string;
  username: string;
  size?: number;
  className?: string;
}

// Encodes the raw Instagram CDN URL to pass safely through our proxy route.
function getProxiedImageUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;
  return `/api/instagram/image?url=${encodeURIComponent(rawUrl)}`;
}

export default function InstagramAvatar({
  src,
  username,
  size = 36,
  className = "",
}: InstagramAvatarProps) {
  const [failed, setFailed] = useState(false);
  const proxiedSrc = getProxiedImageUrl(src);
  const showImage = proxiedSrc && !failed;

  return showImage ? (
    <img
      src={proxiedSrc}
      alt={username}
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-subtle-bg text-xs font-semibold text-muted ${className}`}
    >
      {username?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}
