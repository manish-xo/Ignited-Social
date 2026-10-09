"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal/order";

export const createOrder = async (): Promise<{ id: string }> => {
  try {
    // createPayPalOrder takes the amount as a number and returns the full
    // PayPal order object — the button only needs its id.
    const order = await createPayPalOrder(9.99);
    return {
      id: order.id,
    };
  } catch (error) {
    console.error("PAYPAL CREATE ERROR:", error);
    throw new Error("PayPal order creation failed");
  }
};

export const captureOrder = async (orderId: string) => {
  try {
    return await capturePayPalOrder(orderId);
  } catch (error) {
    console.error("PAYPAL CAPTURE ERROR:", error);
    throw new Error("PayPal capture failed");
  }
};
