"use client";

import InstagramAvatar from "./InstagramAvatar";
import { useInstagramProfile } from "@/hook/useInstagramProfile";

interface CurrentUserAvatarProps {
  /** Outer size in px, including the Instagram-style gradient ring. */
  size: number;
  /** Shown until the real handle loads (e.g. from the URL). */
  fallbackUsername?: string;
  /** Instagram-style gradient ring around the picture. */
  ring?: boolean;
  showHandle?: boolean;
  handleClassName?: string;
  letterClassName?: string;
}

/** The signed-up visitor's own Instagram picture in a gradient ring. */
export default function CurrentUserAvatar({
  size,
  fallbackUsername = "",
  ring = true,
  showHandle = false,
  handleClassName = "mt-1.5 text-xs font-medium text-secondary",
  letterClassName = "bg-white text-sm font-bold text-ink",
}: CurrentUserAvatarProps) {
  const profile = useInstagramProfile();
  const username = (profile.username || fallbackUsername).replace(/^@/, "");

  const avatar = (
    <InstagramAvatar
      src={profile.profilePicUrl}
      username={username || "?"}
      size={ring ? size - 4 : size}
      className={ring ? "border-2 border-white" : "mx-auto"}
      fallbackClassName={letterClassName}
    />
  );

  return (
    <>
      {ring ? (
        <div
          style={{ width: size, height: size }}
          className="mx-auto rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px]"
        >
          {avatar}
        </div>
      ) : (
        avatar
      )}
      {showHandle && username && (
        <p className={handleClassName}>@{username}</p>
      )}
    </>
  );
}
