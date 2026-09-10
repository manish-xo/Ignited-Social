import { NextResponse, NextRequest } from "next/server";
import { createPayPalOrder } from "@/lib/paypal/paypal";

export const POST = async (req: NextRequest) => {
  try {
    const { amount } = await req.json();
    const order = await createPayPalOrder(amount);

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("PayPal create-order error:", error);

    return NextResponse.json(
      { message: "Could not create PayPal order" },
      { status: 500 },
    );
  }
};
