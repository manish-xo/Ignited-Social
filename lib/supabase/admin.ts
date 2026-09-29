import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key, which bypasses RLS — never
// import this from a "use client" file, and never prefix the key with
// NEXT_PUBLIC_.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY — add it to .env.local");
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
