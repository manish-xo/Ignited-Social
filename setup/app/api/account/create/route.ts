import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password, instagramUsername, plan, addons } =
      (await req.json()) as {
        email?: string;
        password?: string;
        instagramUsername?: string;
        plan?: string;
        addons?: string;
      };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    // ── TODO: replace with your real DB lookup ──────────────────────────
    // const existing = await db.user.findUnique({ where: { email } });
    // if (existing) {
    //   return NextResponse.json(
    //     { message: "An account with this email already exists" },
    //     { status: 409 },
    //   );
    // }
    // ─────────────────────────────────────────────────────────────────────

    const passwordHash = await bcrypt.hash(password, 10);

    // ── TODO: replace with your real DB write ───────────────────────────
    // const user = await db.user.create({
    //   data: {
    //     email,
    //     passwordHash,
    //     instagramUsername,
    //     plan,
    //     addons: addons ? addons.split(",") : [],
    //   },
    // });
    const user = { id: "placeholder-user-id", email }; // remove once wired to a real DB
    // ─────────────────────────────────────────────────────────────────────

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" },
    );

    const response = NextResponse.json({ userId: user.id });
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("account create error:", err);
    return NextResponse.json(
      { message: "Couldn't create your account. Please try again." },
      { status: 500 },
    );
  }
}
