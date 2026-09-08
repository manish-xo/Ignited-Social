import { NextRequest, NextResponse } from "next/server";
import { instagramService } from "@/service/instagram.service";

export async function GET(req: NextRequest) {
  console.log("🔥 INSTAGRAM LOOKUP GET HIT");

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
    console.error("Instagram username lookup failed:", error);

    return NextResponse.json(
      { success: false, message: "Could not fetch Instagram suggestions" },
      { status: 200 },
    );
  }
}
