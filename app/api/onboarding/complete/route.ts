import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Marks the logged-in user's onboarding as finished so proxy.ts stops letting
// them back into /onboarding. Stored in app_metadata, which only the server
// (service role) can change — user_metadata is editable by the user.
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

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.app_metadata,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
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
