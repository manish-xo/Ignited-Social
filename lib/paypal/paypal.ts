import axios from "axios";

const PAYPAL_API =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const getAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error("Failed to authenticate with PayPal");
  const data = await res.json();
  return data.access_token as string;
};

export const createPayPalOrder = async (amount: number, currency = "USD") => {
  const accessToken = await getAccessToken();

  const res = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        { amount: { currency_code: currency, value: amount.toFixed(2) } },
      ],
    }),
  });

  if (res.status !== 201) throw new Error("Failed to create PayPal order");
  return res.data;
};

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  try {
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch {
    throw new Error("Failed to capture PayPal order");
  }
}
