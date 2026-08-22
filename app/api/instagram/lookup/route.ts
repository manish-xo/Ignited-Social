import { NextRequest, NextResponse } from "next/server";
import { instagramService } from "@/service/instagram.service";
import { SCRAPE_DO_TOKEN } from "@/service/constants";

export async function GET(req: NextRequest) {
  console.log(
    "Token loaded:",
    SCRAPE_DO_TOKEN ? "yes, length " + SCRAPE_DO_TOKEN.length : "MISSING",
  );
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
