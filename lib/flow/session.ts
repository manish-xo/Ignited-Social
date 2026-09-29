// Signed "flow pass" cookie: records how far a visitor has got through the
// signup → payment → upsell → add-ons → account funnel, so proxy.ts can stop
// people jumping ahead by URL or going back to forms they've already finished.
//
// Only server code (API routes, proxy) can issue it: it's HMAC-signed with
// FLOW_COOKIE_SECRET and httpOnly, so it can't be forged or edited in the
// browser. Uses Web Crypto so it works in both the proxy and route handlers.

import type { NextRequest, NextResponse } from "next/server";

export const FLOW_COOKIE = "sts_flow";
const MAX_AGE_SECONDS = 60 * 60 * 24; // finish the funnel within a day

export const FLOW_STAGES = [
  "signed_up", // → /payment
  "paid", // → upsell
  "upsell_done", // → add-ons
  "addons_done", // → setup complete + create password
  "account_created", // → onboarding (then Supabase login takes over)
] as const;

export type FlowStage = (typeof FLOW_STAGES)[number];

export interface FlowState {
  stage: FlowStage;
  signupId: string;
  email: string;
  username: string;
  plan: string;
  subscriptionId?: string; // main PayPal subscription
  addons?: string[];
}

export const stageIndex = (stage: FlowStage) => FLOW_STAGES.indexOf(stage);

// Where each stage lives, with the query params those pages read.
export function stageUrl(state: FlowState | null): string {
  if (!state) return "/signup";
  const base = { plan: state.plan, username: state.username };
  switch (state.stage) {
    case "signed_up":
      return `/payment?${new URLSearchParams(base)}`;
    case "paid":
      return `/upsell/payment/success?${new URLSearchParams({
        ...base,
        customer: state.subscriptionId ?? "",
      })}`;
    case "upsell_done":
      return `/Addons/payment/addons?${new URLSearchParams({
        ...base,
        customer: state.subscriptionId ?? "",
      })}`;
    case "addons_done":
      return `/Addons/payment/complete?${new URLSearchParams({
        ...base,
        ...(state.addons?.length ? { addons: state.addons.join(",") } : {}),
      })}`;
    case "account_created":
      return "/onboarding";
  }
}

// ── signing ──────────────────────────────────────────────────────────────

const encoder = new TextEncoder();

function secret() {
  const value = process.env.FLOW_COOKIE_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "FLOW_COOKIE_SECRET is missing or too short — add a random 32+ char value to .env.local",
    );
  }
  return value;
}

let keyPromise: Promise<CryptoKey> | null = null;
const hmacKey = () =>
  (keyPromise ??= crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  ));

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const fromBase64Url = (value: string) => {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function sign(state: FlowState): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        ...state,
        exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
      }),
    ),
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(payload)),
  );
  return `${payload}.${toBase64Url(signature)}`;
}

async function verify(token: string): Promise<FlowState | null> {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      fromBase64Url(signature),
      encoder.encode(payload),
    );
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) {
      return null;
    }
    if (!FLOW_STAGES.includes(data.stage)) return null;
    delete data.exp;
    return data as FlowState;
  } catch {
    return null;
  }
}

// ── request / response helpers ───────────────────────────────────────────

export async function readFlow(req: NextRequest): Promise<FlowState | null> {
  const token = req.cookies.get(FLOW_COOKIE)?.value;
  return token ? verify(token) : null;
}

export async function writeFlow(res: NextResponse, state: FlowState) {
  res.cookies.set(FLOW_COOKIE, await sign(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return res;
}
