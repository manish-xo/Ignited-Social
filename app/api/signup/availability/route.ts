import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Is this email or Instagram username already registered?
// Checked server-side with the service role so it works whatever RLS allows
// the browser to read — and only yes/no comes back, never anyone's data.
const schema = z.object({
  email: z.string().email(),
  username: z.string().min(1).max(60),
});

// Escape LIKE wildcards so "_" in a handle/email only matches a literal "_".
const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

export const POST = async (req: NextRequest) => {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  // Instagram handles are case-insensitive; ignore a leading "@".
  const username = parsed.data.username.trim().replace(/^@/, "");

  try {
    const [byEmail, byUsername] = await Promise.all([
      supabaseAdmin
        .from("Signup")
        .select("id", { count: "exact", head: true })
        .ilike("email", escapeLike(email)),
      supabaseAdmin
        .from("Signup")
        .select("id", { count: "exact", head: true })
        .ilike("instagram_username", escapeLike(username)),
    ]);

    if (byEmail.error || byUsername.error) {
      console.error("signup availability error:", byEmail.error ?? byUsername.error);
      return NextResponse.json(
        { message: "Couldn't check your details. Please try again." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      emailTaken: (byEmail.count ?? 0) > 0,
      usernameTaken: (byUsername.count ?? 0) > 0,
    });
  } catch (err) {
    // e.g. the database can't be reached (paused Supabase project)
    console.error("signup availability failed:", err);
    return NextResponse.json(
      { message: "We can't reach our servers right now. Please try again shortly." },
      { status: 503 },
    );
  }
};
