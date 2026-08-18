import { NextRequest, NextResponse } from "next/server";
import { instagramService } from "@/service/instagram.service";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const profile = await instagramService.getProfile(username);
    return NextResponse.json({ ok: true, profile });
  } catch (error) {
    // Never let scraper failures look like a hard error to the client —
    // this is a nice-to-have preview, not a blocking dependency.
    return NextResponse.json(
      { ok: false, error: "Could not verify this username" },
      { status: 200 },
    );
  }
}
