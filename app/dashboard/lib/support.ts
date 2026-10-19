// Contact details used by the dashboard buttons. One place to change them.
export const SUPPORT_EMAIL = "support@ignitedsocial.com";

export function supportMailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${SUPPORT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

// No manager assignment is stored yet, so every account shows this one.
export const DEFAULT_MANAGER = {
  name: "Maya",
  avatarInitial: "M",
};
