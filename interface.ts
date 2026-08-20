export type Plan = "grow" | "scale";

export interface SignupData {
  username: string;
  email: string;
  plan: Plan;
  signupId: string | null;
}

export type RequestStatus = "idle" | "submitting" | "success" | "error";
