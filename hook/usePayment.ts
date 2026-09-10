"use client";

import { useDispatch, UseDispatch } from "react-redux";
import { supabase } from "@/libs/supabase";
import { setPayment, setStatus, setError } from "@/libs/dataslice";

interface PaymentPayload {
  username: string;
  email: string;
  plan: "grow" | "scale";
  amount: number;
  paymentMethod: "stripe" | "paypal";
  paymentReference: string; // Stripe subscription id, or PayPal order id
}

export const usePayment = () => {
  const dispatch = useDispatch();

  const recordPayment = async (values: PaymentPayload) => {
    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    try {
      const paymentData = {
        instagram_username: values.username,
        email: values.email.trim().toLowerCase(),
        plan: values.plan,
        amount: values.amount,
        currency: "usd",
        payment_method: values.paymentMethod,
        payment_reference: values.paymentReference,
        status: "active",
      };
      const { data, error } = await supabase
        .from("Payments")
        .insert(paymentData)
        .select()
        .single();

      if (error) throw error;

      const reduxPaymentData = {
        paymentId: data.id,
        username: values.username,
        email: values.email.trim().toLowerCase(),
        plan: values.plan,
        amount: values.amount,
        paymentMethod: values.paymentMethod,
        status: "active" as const,
      };

      dispatch(setPayment(reduxPaymentData));
      dispatch(setStatus("success"));

      return { success: true, data: reduxPaymentData };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      console.error("Payment record error:", error);
      dispatch(setStatus("error"));
      dispatch(setError(message));

      return { success: false, error: message };
    }
  };
  return { recordPayment };
};
