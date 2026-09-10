import {
  OrdersController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";
import { paypalClient } from "./client";

const ordersController = new OrdersController(paypalClient);

export async function createPayPalOrder(amount: string): Promise<string> {
  const { result } = await ordersController.createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,

      applicationContext: {
        returnUrl: "http://localhost:3000/payment/success",
        cancelUrl: "http://localhost:3000/payment",
      },

      purchaseUnits: [
        {
          amount: {
            currencyCode: "INR",
            value: "100",
          },
        },
      ],
    },
  });

  console.log("PAYPAL CREATE ORDER RESULT:", result);

  if (!result.id) {
    throw new Error("PayPal order creation failed");
  }

  return result.id;
}

export const capturePayPalOrder = async (orderId: string) => {
  const { result } = await ordersController.captureOrder({
    id: orderId,
  });

  return result;
};
