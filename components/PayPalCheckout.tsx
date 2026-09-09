"use client";

import { useState } from "react";
import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
  OnApproveDataOneTimePayments,
} from "@paypal/react-paypal-js/sdk-v6";

import { createOrder, captureOrder } from "@/app/action";

const PayPalCheckout = () => {
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return (
      <div className="rounded-lg border border-green-500 bg-green-50 px-5 py-4 font-medium text-green-700">
        ✓ Payment successfull!
      </div>
    );
  }

  return (
    <PayPalProvider
      clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!}
      environment={
        (process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT as
          | "sandbox"
          | "production") ?? "sandbox"
      }
      components={["paypal-payments"]}
      pageType="checkout"
    >
      <PayPalOneTimePaymentButton
        createOrder={async () => {
          const { id } = await createOrder();

          console.log("PayPal order ID:", id);

          return {
            orderId: id,
          };
        }}
        onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
          console.log("PayPal Approved:", orderId);

          await captureOrder(orderId);
          setOrderComplete(true);
        }}
        onError={(error) => {
          console.error("PAYPAL CHECKOUT ERROR:", error);
        }}
        presentationMode="auto"
      />
    </PayPalProvider>
  );
};

export default PayPalCheckout;
