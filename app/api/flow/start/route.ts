import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stageUrl, writeFlow, type FlowState } from "@/lib/flow/session";

const schema = z.object({ signupId: z.string().uuid() });

// Signup inserts straight from the browser, so the server confirms the row
// really exists (and is fresh) before handing out the pass to /payment.
const MAX_SIGNUP_AGE_MS = 2 * 60 * 60 * 1000;

export const POST = async (req: NextRequest) => {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { data: signup, error } = await supabaseAdmin
    .from("Signup")
    .select("id, email, instagram_username, plan, created_at")
    .eq("id", parsed.data.signupId)
    .maybeSingle();

  if (error) {
    console.error("flow/start signup lookup error:", error);
    return NextResponse.json(
      { message: "Couldn't verify your signup. Please try again." },
      { status: 500 },
    );
  }

  const tooOld =
    signup &&
    Date.now() - new Date(signup.created_at).getTime() > MAX_SIGNUP_AGE_MS;

  if (!signup || tooOld) {
    return NextResponse.json(
      { message: "Signup not found. Please sign up again." },
      { status: 403 },
    );
  }

  const state: FlowState = {
    stage: "signed_up",
    signupId: signup.id,
    email: signup.email,
    username: signup.instagram_username,
    plan: signup.plan,
  };

  return writeFlow(NextResponse.json({ next: stageUrl(state) }), state);
};
