import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { setupSchema } from "@/schema/setup.schema";
import { readFlow, writeFlow } from "@/lib/flow/session";

const accountCreateSchema = setupSchema.extend({
  instagramUsername: z.string().optional(),
  plan: z.string().optional(),
  addons: z.string().optional(),
});

// Older rows may have mixed-case emails, so match case-insensitively. Escape
// the LIKE wildcards so an "_" in an email only matches a literal "_".
const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

/**
 * A new purchase has its own onboarding (answers are stored per signup), so a
 * reused login starts the wizard again instead of skipping to the dashboard.
 */
const freshOnboarding = (appMetadata: Record<string, unknown> | undefined) => ({
  ...appMetadata,
  onboarding_completed: false,
  onboarding_completed_at: null,
});

/** The Supabase login for an email, if there is one. */
async function findAuthUserByEmail(email: string) {
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error) {
      console.error("listUsers error:", error);
      return null;
    }
    const match = data.users.find((u) => u.email?.toLowerCase() === email);
    if (match) return match;
    if (data.users.length < 1000) return null;
  }
  return null;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = accountCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }
    const { password, instagramUsername, plan, addons } = parsed.data;
    const email = parsed.data.email.trim().toLowerCase();

    // Only the email used at signup can get a dashboard login.
    const { data: signup, error: signupError } = await supabaseAdmin
      .from("Signup")
      .select("id, instagram_username, plan")
      .ilike("email", escapeLike(email))
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (signupError) {
      console.error("Signup lookup error:", signupError);
      return NextResponse.json(
        { message: "Couldn't check your signup. Please try again." },
        { status: 500 },
      );
    }

    if (!signup) {
      return NextResponse.json(
        { message: "Use the same email you signed up with." },
        { status: 403 },
      );
    }

    // ...and only once they've actually paid for a plan.
    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from("paypal_subscriptions")
      .select("paypal_subscription_id")
      .ilike("email", escapeLike(email))
      .in("status", ["ACTIVE", "APPROVED"])
      .limit(1)
      .maybeSingle();

    if (subscriptionError) {
      console.error("Subscription lookup error:", subscriptionError);
      return NextResponse.json(
        { message: "Couldn't check your subscription. Please try again." },
        { status: 500 },
      );
    }

    if (!subscription) {
      return NextResponse.json(
        { message: "We couldn't find a paid subscription for this email." },
        { status: 403 },
      );
    }

    // What the login points at: this signup and its paid subscription.
    const metadata = {
      signup_id: signup.id,
      instagram_username:
        signup.instagram_username || instagramUsername || null,
      plan: signup.plan || plan || null,
      addons: addons ? addons.split(",") : [],
      paypal_subscription_id: subscription.paypal_subscription_id,
    };

    // Account made (or picked up): the password form is done; onboarding
    // is behind login now.
    const finish = async (body: object, status: number) => {
      const response = NextResponse.json(body, { status });
      const flow = await readFlow(req);
      return flow
        ? writeFlow(response, { ...flow, stage: "account_created" })
        : response;
    };

    const { data: created, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        // They already proved the email by signing up and paying.
        email_confirm: true,
        user_metadata: metadata,
      });

    if (!createError) return finish({ userId: created.user.id }, 201);

    if (
      createError.code !== "email_exists" &&
      createError.code !== "user_already_exists"
    ) {
      console.error("createUser error:", createError);
      return NextResponse.json(
        { message: "Couldn't create your account. Please try again." },
        { status: 500 },
      );
    }

    // This email already has a login, e.g. a customer who cancelled and
    // bought again, or an old login whose signup was deleted.
    const existing = await findAuthUserByEmail(email);
    if (!existing) {
      return NextResponse.json(
        { message: "Couldn't create your account. Please try again." },
        { status: 500 },
      );
    }

    const oldSignupId = existing.user_metadata?.signup_id as string | undefined;
    const { data: oldSignup } = oldSignupId
      ? await supabaseAdmin
          .from("Signup")
          .select("id")
          .eq("id", oldSignupId)
          .maybeSingle()
      : { data: null };

    if (!oldSignup) {
      // Orphaned login: its signup no longer exists, so there's nothing on it
      // to protect. Reuse it with the new password and the new purchase.
      const { error } = await supabaseAdmin.auth.admin.updateUserById(
        existing.id,
        {
          password,
          email_confirm: true,
          user_metadata: { ...existing.user_metadata, ...metadata },
          app_metadata: freshOnboarding(existing.app_metadata),
        },
      );
      if (error) {
        console.error("reuse orphaned login error:", error);
        return NextResponse.json(
          { message: "Couldn't create your account. Please try again." },
          { status: 500 },
        );
      }
      return finish({ userId: existing.id }, 201);
    }

    // A real existing customer. Never change their password here (anyone can
    // type an email), but link the new purchase so their dashboard shows it,
    // and send them to log in.
    const { error: linkError } = await supabaseAdmin.auth.admin.updateUserById(
      existing.id,
      {
        user_metadata: { ...existing.user_metadata, ...metadata },
        app_metadata: freshOnboarding(existing.app_metadata),
      },
    );
    if (linkError) console.error("link purchase to login error:", linkError);
    return finish(
      {
        code: "account_exists",
        message:
          "You already have an account with this email. Log in with your existing password to see your new plan.",
      },
      409,
    );
  } catch (err) {
    console.error("account/create error:", err);

    return NextResponse.json(
      { message: "Couldn't create your account. Please try again." },
      { status: 500 },
    );
  }
};
