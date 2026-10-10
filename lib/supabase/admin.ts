import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key, which bypasses RLS — never
// import this from a "use client" file, and never prefix the key with
// NEXT_PUBLIC_.
//
// Created lazily on first use, not when the file is imported: `next build`
// imports every route to collect page data, and throwing at import time made
// the whole build fail whenever the key wasn't set in that environment.
let client: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — add them to .env.local (and to your hosting provider's environment variables)",
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return client;
}

// Same API as before (`supabaseAdmin.from(...)`, `supabaseAdmin.auth...`),
// but the real client is only built the first time it's actually used.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = getSupabaseAdmin();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
