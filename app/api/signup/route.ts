import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stageUrl, writeFlow, type FlowState } from "@/lib/flow/session";

/**
 * Signup in one round trip: check the email / Instagram username don't belong
 * to a paying customer, save the signup (or pick up an unpaid earlier one),
 * and hand out the pass for /payment (flow cookie).
 * Doing all three here, next to the database, is much faster than the
 * browser calling three separate endpoints one after another.
 */
const schema = z.object({
  username: z.string().trim().min(1).max(60),
  email: z.string().trim().email(),
  plan: z.enum(["grow", "scale"]),
  profilePicUrl: z.string().max(2000).optional(),
});

// Escape LIKE wildcards so "_" in a handle/email only matches a literal "_".
const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

/** Marker in the set returned below: the email itself has a paid plan. */
const EMAIL_PAID = "__email__";

/**
 * Which of these signups have a paid (active / approved) PayPal plan, plus
 * EMAIL_PAID if the email has one under any signup. null if the check failed.
 */
async function paidSignupIds(
  signupIds: string[],
  email: string,
): Promise<Set<string> | null> {
  const paid = ["ACTIVE", "APPROVED"];
  const [bySignup, byEmail] = await Promise.all([
    signupIds.length
      ? supabaseAdmin
          .from("paypal_subscriptions")
          .select("signup_id")
          .in("signup_id", signupIds)
          .in("status", paid)
      : Promise.resolve({ data: [], error: null }),
    supabaseAdmin
      .from("paypal_subscriptions")
      .select("id")
      .ilike("email", escapeLike(email))
      .in("status", paid)
      .limit(1),
  ]);
  if (bySignup.error || byEmail.error) {
    console.error("signup paid check error:", bySignup.error ?? byEmail.error);
    return null;
  }
  const ids = new Set<string>(
    (bySignup.data as { signup_id: string | null }[])
      .map((r) => r.signup_id)
      .filter((id): id is string => !!id),
  );
  if (byEmail.data.length) ids.add(EMAIL_PAID);
  return ids;
}

export const POST = async (req: NextRequest) => {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check your details and try again." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  // Instagram handles are case-insensitive; ignore a leading "@".
  const username = parsed.data.username.replace(/^@/, "");
  const { plan, profilePicUrl } = parsed.data;

  try {
    // Earlier signups with this email or Instagram username (both at once).
    const [byEmail, byUsername] = await Promise.all([
      supabaseAdmin
        .from("Signup")
        .select("id, email, created_at")
        .ilike("email", escapeLike(email))
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("Signup")
        .select("id, email")
        .ilike("instagram_username", escapeLike(username)),
    ]);

    if (byEmail.error || byUsername.error) {
      console.error("signup check error:", byEmail.error ?? byUsername.error);
      return NextResponse.json(
        { message: "Couldn't check your details. Please try again." },
        { status: 503 },
      );
    }

    // Only a signup that went on to pay counts as "already registered".
    // Someone who signed up and left before paying can simply carry on.
    const earlier = [...byEmail.data, ...byUsername.data];
    const paidIds = await paidSignupIds(
      earlier.map((s) => s.id),
      email,
    );
    if (paidIds === null) {
      return NextResponse.json(
        { message: "Couldn't check your details. Please try again." },
        { status: 503 },
      );
    }

    const emailPaid =
      paidIds.has(EMAIL_PAID) || byEmail.data.some((s) => paidIds.has(s.id));
    const usernamePaid = byUsername.data.some((s) => paidIds.has(s.id));
    if (emailPaid || usernamePaid) {
      const what =
        emailPaid && usernamePaid
          ? "This email and Instagram username are"
          : emailPaid
            ? "This email is"
            : "This Instagram username is";
      return NextResponse.json(
        { message: `${what} already registered.`, code: "already_registered" },
        { status: 409 },
      );
    }

    // Unpaid signup with this email: pick it up again (with any changes to the
    // account or plan) instead of making a second row.
    const unpaid = byEmail.data[0];
    const details = {
      instagram_username: username,
      instagram_profile_pic: profilePicUrl || "",
      email,
      plan,
    };
    const { data: signup, error } = unpaid
      ? await supabaseAdmin
          .from("Signup")
          .update(details)
          .eq("id", unpaid.id)
          .select("id")
          .single()
      : await supabaseAdmin
          .from("Signup")
          .insert(details)
          .select("id")
          .single();

    if (error) {
      // 23505 = unique violation, if two signups race for the same email.
      if (error.code === "23505") {
        return NextResponse.json(
          {
            message: "This email or Instagram username is already registered.",
            code: "already_registered",
          },
          { status: 409 },
        );
      }
      console.error("signup insert error:", error);
      return NextResponse.json(
        { message: "Couldn't save your signup. Please try again." },
        { status: 500 },
      );
    }

    const state: FlowState = {
      stage: "signed_up",
      signupId: signup.id,
      email,
      username,
      plan,
    };
    return writeFlow(
      NextResponse.json({ signupId: signup.id, next: stageUrl(state) }),
      state,
    );
  } catch (err) {
    // e.g. the database can't be reached
    console.error("signup failed:", err);
    return NextResponse.json(
      {
        message:
          "We can't reach our servers right now. Please try again shortly.",
      },
      { status: 503 },
    );
  }
};
