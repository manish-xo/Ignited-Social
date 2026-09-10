// app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal/paypal";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    const capture = await capturePayPalOrder(orderId);
    return NextResponse.json(capture);
  } catch (error) {
    console.error("PayPal capture-order error:", error);
    return NextResponse.json(
      { message: "Could not capture PayPal order" },
      { status: 500 },
    );
  }
}
