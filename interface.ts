export type Plan = "grow" | "scale";

export interface SignupData {
  username: string;
  profilePicUrl?: string; // Instagram CDN URL — expires after a few days
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
  fullName?: string;
  country?: string;
  postalCode?: string;
  couponCode?: string;
}

export interface UpsellDetails {
  upsellId: string; // PayPal subscription ID of the add-on
  parentSubscriptionId: string; // PayPal subscription ID of the main plan
  offer: "content-creation" | "content-creation-plus";
  offerName: string;
  firstMonthAmount: number;
  monthlyAmount: number;
  username: string;
  email: string;
  paymentMethod: "paypal";
  status: "active";
}

export interface AddonDetails {
  addonSubscriptionId: string; // PayPal subscription ID covering the add-ons
  parentSubscriptionId: string; // PayPal subscription ID of the main plan
  addons: ("targeted-comments" | "dm-new-followers")[];
  addonNames: string[];
  monthlyAmount: number;
  username: string;
  email: string;
  paymentMethod: "paypal";
  status: "active";
}

// Never put the password here — Redux is persisted to localStorage.
export interface AccountDetails {
  userId: string; // Supabase Auth user ID
  email: string;
  username: string;
  plan: string;
  addons: string[];
  createdAt: string; // ISO timestamp
}

export type RequestStatus = "idle" | "submitting" | "success" | "error";
