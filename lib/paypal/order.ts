import { paypalFetch } from "./client";

export async function createPayPalOrder(amount: number, currency = "USD") {
  return paypalFetch("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        { amount: { currency_code: currency, value: amount.toFixed(2) } },
      ],
    }),
  });
}

export async function capturePayPalOrder(orderId: string) {
  return paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
  });
}
