"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal/order";

export const createOrder = async (): Promise<{ id: string }> => {
  const orderId = await createPayPalOrder("9.99");

  return {
    id: orderId,
  };
};

export const captureOrder = async (orderId: string) => {
  return capturePayPalOrder(orderId);
};
