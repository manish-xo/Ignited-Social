import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { readFlow } from "@/lib/flow/session";

// The Instagram handle + profile picture the visitor signed up with. Used
// when Redux is empty (new browser, cleared storage). Works for logged-in
// customers (onboarding, dashboard) and mid-funnel visitors (flow pass).
export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signupId =
    (user?.user_metadata?.signup_id as string | undefined) ??
    (await readFlow(req))?.signupId;

  if (!user && !signupId) {
    return NextResponse.json({ message: "Not signed in." }, { status: 401 });
  }

  let signupQuery = supabaseAdmin
    .from("Signup")
    .select("instagram_username, instagram_profile_pic");
  signupQuery = signupId
    ? signupQuery.eq("id", signupId)
    : signupQuery.eq("email", user!.email!.toLowerCase());

  const { data: signup, error } = await signupQuery
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) console.error("me/profile signup lookup error:", error);

  return NextResponse.json(
    {
      username:
        signup?.instagram_username ??
        (user?.user_metadata?.instagram_username as string | undefined) ??
        null,
      profilePicUrl: signup?.instagram_profile_pic || null,
    },
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}
