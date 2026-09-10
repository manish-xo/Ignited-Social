"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal/order";

export const createOrder = async (): Promise<{ id: string }> => {
  try {
    const orderId = await createPayPalOrder("9.99");
    return {
      id: orderId,
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
