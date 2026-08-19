import { NextRequest, NextResponse } from "next/server";
import { instagramService } from "@/service/instagram.service";
import { type InstagramProfile } from "@/service/types";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.trim();

  if (!username || username.length < 2) {
    return NextResponse.json({
      success: true,
      data: { data: [] },
    });
  }

  try {
    const result = await instagramService.suggestInstagramUsername(username);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Could not verify this username" },
      { status: 200 },
    );
  }
}
