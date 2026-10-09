import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { encryptSecret } from "@/lib/crypto/credentials";

// Saves every onboarding answer for the logged-in customer, then marks
// onboarding finished so proxy.ts stops letting them back into /onboarding.
//
// Called from step 13 (Launch call, shows a spinner while it saves) and again
// when the wizard finishes — it's an upsert, so repeating it is harmless.

// Answers are plain JSON from the wizard; cap the size so nobody can stuff the
// table with megabytes of junk.
const MAX_BODY_BYTES = 50_000;

// Kept out of `answers` (which the dashboard reads) and stored encrypted in
// their own table instead.
const SECRET_KEYS = ["instagramPassword", "backupCodes"] as const;

export const POST = async (req: NextRequest) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: () => {},
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Please log in." }, { status: 401 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Too much data." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw || "{}");
    if (!body || typeof body !== "object" || Array.isArray(body)) throw 0;
  } catch {
    return NextResponse.json({ message: "Invalid data." }, { status: 400 });
  }

  const password =
    typeof body.instagramPassword === "string" ? body.instagramPassword : "";
  const backupCodes =
    typeof body.backupCodes === "string" ? body.backupCodes.trim() : "";

  const answers = { ...body };
  for (const key of SECRET_KEYS) delete answers[key];

  const signupId = (user.user_metadata?.signup_id as string) ?? null;
  const now = new Date().toISOString();

  const { error: answersError } = await supabaseAdmin
    .from("onboarding_responses")
    .upsert(
      {
        user_id: user.id,
        signup_id: signupId,
        answers,
        completed_at: now,
        updated_at: now,
      },
      { onConflict: "user_id" },
    );

  if (answersError) {
    console.error("onboarding_responses upsert error:", answersError);
    return NextResponse.json(
      { message: "Couldn't save your answers. Please try again." },
      { status: 500 },
    );
  }

  if (password) {
    const { error: credentialsError } = await supabaseAdmin
      .from("instagram_credentials")
      .upsert(
        {
          user_id: user.id,
          instagram_username:
            (user.user_metadata?.instagram_username as string) ?? null,
          password_encrypted: encryptSecret(password),
          uses_two_factor: body.useTwoFactor === true,
          backup_codes_encrypted: backupCodes
            ? encryptSecret(backupCodes)
            : null,
          updated_at: now,
        },
        { onConflict: "user_id" },
      );

    if (credentialsError) {
      console.error("instagram_credentials upsert error:", credentialsError);
      return NextResponse.json(
        { message: "Couldn't save your Instagram login. Please try again." },
        { status: 500 },
      );
    }
  }

  // Only lock onboarding once everything above is safely stored.
  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.app_metadata,
      onboarding_completed: true,
      onboarding_completed_at: now,
    },
  });

  if (error) {
    console.error("onboarding/complete update error:", error);
    return NextResponse.json(
      { message: "Couldn't save your progress. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ next: "/dashboard/billing" });
};
