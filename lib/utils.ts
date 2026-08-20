import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInstagramImageUrl = (url?: string) => {
  if (!url) return undefined;

  return `/api/instagram/image?url=${encodeURIComponent(url)}`;
};
