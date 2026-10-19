"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDashboardUser } from "../lib/session";

export async function rateManager(rating: number) {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false as const };
  }
  const { user } = await getDashboardUser();

  const { error } = await supabaseAdmin.from("manager_ratings").upsert({
    user_id: user.id,
    rating,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error(`Saving manager rating failed: ${error.code} ${error.message}`);
    return { ok: false as const };
  }
  return { ok: true as const };
}
