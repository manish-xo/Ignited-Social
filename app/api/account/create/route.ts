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
    const { data: subscription, error: subscriptionError } =
      await supabaseAdmin
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

    const { data: created, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        // They already proved the email by signing up and paying.
        email_confirm: true,
        user_metadata: {
          signup_id: signup.id,
          instagram_username:
            signup.instagram_username || instagramUsername || null,
          plan: signup.plan || plan || null,
          addons: addons ? addons.split(",") : [],
          paypal_subscription_id: subscription.paypal_subscription_id,
        },
      });

    if (createError) {
      if (
        createError.code === "email_exists" ||
        createError.code === "user_already_exists"
      ) {
        return NextResponse.json(
          {
            message:
              "An account with this email already exists. Please log in instead.",
          },
          { status: 409 },
        );
      }
      console.error("createUser error:", createError);
      return NextResponse.json(
        { message: "Couldn't create your account. Please try again." },
        { status: 500 },
      );
    }

    const response = NextResponse.json(
      { userId: created.user.id },
      { status: 201 },
    );
    // Account made — the password form is done; onboarding is behind login now.
    const flow = await readFlow(req);
    return flow
      ? writeFlow(response, { ...flow, stage: "account_created" })
      : response;
  } catch (err) {
    console.error("account/create error:", err);

    return NextResponse.json(
      { message: "Couldn't create your account. Please try again." },
      { status: 500 },
    );
  }
};
