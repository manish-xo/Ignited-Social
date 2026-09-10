export type Plan = "grow" | "scale";

export interface SignupData {
  username: string;
  email: string;
  plan: Plan;
  signupId: string | null;
}

export interface PaymentDetails {
  paymentId: string;
  username: string;
  email: string;
  plan: "grow" | "scale";
  amount: number;
  paymentMethod: "stripe" | "paypal";
  status: "active";
}

export type RequestStatus = "idle" | "submitting" | "success" | "error";
