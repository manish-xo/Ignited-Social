// // "use client";

// // import { useEffect, useMemo, useState, type FormEvent } from "react";
// // import { useRouter } from "next/navigation";
// // import axios from "axios";
// // import { Lock } from "lucide-react";
// // import type { PaymentRequest } from "@stripe/stripe-js";
// // import {
// //   CardCvcElement,
// //   CardExpiryElement,
// //   CardNumberElement,
// //   Elements,
// //   PaymentRequestButtonElement,
// //   useElements,
// //   useStripe,
// // } from "@stripe/react-stripe-js";
// // import { getStripe } from "@/lib/stripe";

// // const COUNTRIES = [
// //   { code: "US", name: "United States" },
// //   { code: "IN", name: "India" },
// //   { code: "GB", name: "United Kingdom" },
// //   { code: "CA", name: "Canada" },
// //   { code: "AU", name: "Australia" },
// //   { code: "DE", name: "Germany" },
// //   { code: "FR", name: "France" },
// //   { code: "AE", name: "United Arab Emirates" },
// // ];

// // const elementStyle = {
// //   style: {
// //     base: {
// //       fontSize: "14px",
// //       color: "#111114",
// //       fontFamily: "inherit",
// //       "::placeholder": { color: "#9ca3af" },
// //     },
// //     invalid: { color: "#dc2626" },
// //   },
// // };

// // interface PaymentFormProps {
// //   plan: "grow" | "scale";
// //   planName: string;
// //   price: number;
// //   username: string;
// //   nextChargeLabel: string;
// // }

// // // Public wrapper — mounts the Elements provider once per page.
// // export default function PaymentForm(props: PaymentFormProps) {
// //   const stripePromise = useMemo(() => getStripe(), []);
// //   return (
// //     <Elements stripe={stripePromise}>
// //       <PaymentFormInner {...props} />
// //     </Elements>
// //   );
// // }

// // function PaymentFormInner({
// //   plan,
// //   planName,
// //   price,
// //   username,
// //   nextChargeLabel,
// // }: PaymentFormProps) {
// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const router = useRouter();

// //   const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
// //     null,
// //   );
// //   const [email, setEmail] = useState("");
// //   const [cardholderName, setCardholderName] = useState("");
// //   const [country, setCountry] = useState("US");
// //   const [postalCode, setPostalCode] = useState("");
// //   const [couponOpen, setCouponOpen] = useState(false);
// //   const [couponInput, setCouponInput] = useState("");
// //   const [couponCode, setCouponCode] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // Set up the Apple Pay / Google Pay express-checkout button.
// //   useEffect(() => {
// //     if (!stripe) return;

// //     const pr = stripe.paymentRequest({
// //       country: "US",
// //       currency: "usd",
// //       total: { label: `${planName} plan`, amount: Math.round(price * 100) },
// //       requestPayerName: true,
// //       requestPayerEmail: true,
// //     });

// //     pr.canMakePayment().then((result) => {
// //       if (result) setPaymentRequest(pr);
// //     });

// //     pr.on("paymentmethod", async (ev) => {
// //       setSubmitting(true);
// //       setError(null);
// //       try {
// //         const { data } = await axios.post("/api/create-subscription", {
// //           paymentMethodId: ev.paymentMethod.id,
// //           plan,
// //           email: ev.payerEmail,
// //           cardholderName: ev.payerName,
// //           country,
// //           postalCode,
// //           instagramUsername: username,
// //           couponCode: couponCode || undefined,
// //         });

// //         if (data.status === "requires_action") {
// //           const { error: confirmError } = await stripe.confirmCardPayment(
// //             data.clientSecret,
// //           );
// //           if (confirmError) {
// //             ev.complete("fail");
// //             setError(confirmError.message ?? "Payment failed.");
// //             setSubmitting(false);
// //             return;
// //           }
// //         }

// //         ev.complete("success");
// //         router.push(`/payment/success?plan=${plan}`);
// //       } catch (err: any) {
// //         ev.complete("fail");
// //         setError(err.response?.data?.message ?? "Payment failed.");
// //         setSubmitting(false);
// //       }
// //     });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [stripe, plan, price, planName]);

// //   const applyCoupon = () => {
// //     setCouponCode(couponInput.trim());
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();
// //     if (!stripe || !elements) return;

// //     const cardNumberElement = elements.getElement(CardNumberElement);
// //     if (!cardNumberElement) return;

// //     setSubmitting(true);
// //     setError(null);

// //     try {
// //       const { error: pmError, paymentMethod } =
// //         await stripe.createPaymentMethod({
// //           type: "card",
// //           card: cardNumberElement,
// //           billing_details: {
// //             name: cardholderName,
// //             email,
// //             address: { country, postal_code: postalCode },
// //           },
// //         });

// //       if (pmError) {
// //         setError(pmError.message ?? "Your card details look invalid.");
// //         setSubmitting(false);
// //         return;
// //       }

// //       const { data } = await axios.post("/api/create-subscription", {
// //         paymentMethodId: paymentMethod.id,
// //         plan,
// //         email,
// //         cardholderName,
// //         country,
// //         postalCode,
// //         instagramUsername: username,
// //         couponCode: couponCode || undefined,
// //       });

// //       if (data.status === "requires_action") {
// //         const { error: confirmError } = await stripe.confirmCardPayment(
// //           data.clientSecret,
// //         );
// //         if (confirmError) {
// //           setError(confirmError.message ?? "Payment confirmation failed.");
// //           setSubmitting(false);
// //           return;
// //         }
// //       }

// //       router.push(`/payment/success?plan=${plan}`);
// //     } catch (err: any) {
// //       setError(
// //         err.response?.data?.message ??
// //           "Something went wrong. Please try again.",
// //       );
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
// //       {paymentRequest && (
// //         <div>
// //           <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
// //             Express checkout
// //           </p>
// //           <PaymentRequestButtonElement
// //             options={{
// //               paymentRequest,
// //               style: { paymentRequestButton: { height: "48px" } },
// //             }}
// //           />
// //           <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted">
// //             <span className="h-px flex-1 bg-border" />
// //             or pay by card
// //             <span className="h-px flex-1 bg-border" />
// //           </div>
// //         </div>
// //       )}

// //       <div>
// //         <label className="mb-2 block text-sm font-semibold text-ink">
// //           Card Information
// //         </label>
// //         <div className="rounded-xl border border-border bg-white p-3.5 transition-shadow focus-within:ring-2 focus-within:ring-action/30">
// //           <div className="py-1.5">
// //             <CardNumberElement options={elementStyle} />
// //           </div>
// //           <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
// //             <CardExpiryElement options={elementStyle} />
// //             <CardCvcElement options={elementStyle} />
// //           </div>
// //         </div>
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="cardholderName"
// //           className="mb-2 block text-sm font-semibold text-ink"
// //         >
// //           Cardholder name
// //         </label>
// //         <input
// //           id="cardholderName"
// //           type="text"
// //           required
// //           placeholder="Full name on card"
// //           value={cardholderName}
// //           onChange={(e) => setCardholderName(e.target.value)}
// //           className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
// //         />
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="payment-email"
// //           className="mb-2 block text-sm font-semibold text-ink"
// //         >
// //           Email{" "}
// //           <span className="font-normal text-muted-foreground">
// //             — for receipts &amp; updates
// //           </span>
// //         </label>
// //         <input
// //           id="payment-email"
// //           type="email"
// //           required
// //           placeholder="you@company.com"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
// //         />
// //       </div>

// //       <div>
// //         <label className="mb-2 block text-sm font-semibold text-ink">
// //           Billing address
// //         </label>
// //         <div className="overflow-hidden rounded-xl border border-border bg-white">
// //           <select
// //             value={country}
// //             onChange={(e) => setCountry(e.target.value)}
// //             className="w-full border-0 bg-transparent px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
// //           >
// //             {COUNTRIES.map((c) => (
// //               <option key={c.code} value={c.code}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="text"
// //             required
// //             placeholder="Postal code"
// //             value={postalCode}
// //             onChange={(e) => setPostalCode(e.target.value)}
// //             className="w-full border-0 border-t border-border bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
// //           />
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 text-sm">
// //         <div>
// //           <p className="font-medium text-ink">{planName} · billed monthly</p>
// //           <p className="text-xs text-muted">Next charge {nextChargeLabel}</p>
// //         </div>
// //         <p className="font-heading font-bold text-ink">${price.toFixed(2)}</p>
// //       </div>

// //       <div className="text-sm">
// //         {!couponOpen ? (
// //           <button
// //             type="button"
// //             onClick={() => setCouponOpen(true)}
// //             className="text-action underline underline-offset-2"
// //           >
// //             Have a coupon? Add code
// //           </button>
// //         ) : (
// //           <div className="flex gap-2">
// //             <input
// //               type="text"
// //               value={couponInput}
// //               onChange={(e) => setCouponInput(e.target.value)}
// //               placeholder="Coupon code"
// //               className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
// //             />
// //             <button
// //               type="button"
// //               onClick={applyCoupon}
// //               className="rounded-xl border border-border px-4 text-sm font-medium text-ink hover:bg-border/30"
// //             >
// //               Apply
// //             </button>
// //           </div>
// //         )}
// //         {couponCode && (
// //           <p className="mt-1 text-xs text-success">
// //             Coupon &ldquo;{couponCode}&rdquo; will be applied at checkout.
// //           </p>
// //         )}
// //       </div>

// //       {error && (
// //         <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
// //           {error}
// //         </p>
// //       )}

// //       <button
// //         type="submit"
// //         disabled={!stripe || submitting}
// //         className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-action text-sm font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-60"
// //       >
// //         <Lock size={14} />
// //         {submitting ? "Processing..." : "Subscribe & start growing"}
// //       </button>
// //     </form>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Lock } from "lucide-react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { usePayment } from "@/hook/usePayment";

// const COUNTRIES = [
//   { code: "US", name: "United States" },
//   { code: "IN", name: "India" },
//   { code: "GB", name: "United Kingdom" },
//   { code: "CA", name: "Canada" },
//   { code: "AU", name: "Australia" },
//   { code: "DE", name: "Germany" },
//   { code: "FR", name: "France" },
//   { code: "AE", name: "United Arab Emirates" },
// ];

// // ASSUMPTION — these must exist as real Billing Plans in your PayPal
// // dashboard (Developer Dashboard → Products & Plans) before this works.
// // Set the real plan IDs as env vars, matching each plan's price exactly.
// const PAYPAL_PLAN_IDS: Record<"grow" | "scale", string | undefined> = {
//   grow: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GROW,
//   scale: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SCALE,
// };

// interface PaymentFormProps {
//   plan: "grow" | "scale";
//   planName: string;
//   price: number;
//   username: string;
//   nextChargeLabel: string;
// }

// export default function PaymentForm(props: PaymentFormProps) {
//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
//         currency: "USD",
//         intent: "subscription",
//         vault: true, // required for recurring subscriptions
//       }}
//     >
//       <PaymentFormInner {...props} />
//     </PayPalScriptProvider>
//   );
// }

// function PaymentFormInner({
//   plan,
//   planName,
//   price,
//   username,
//   nextChargeLabel,
// }: PaymentFormProps) {
//   const router = useRouter();
//   const { recordPayment } = usePayment();

//   const [email, setEmail] = useState("");
//   const [cardholderName, setCardholderName] = useState("");
//   const [country, setCountry] = useState("US");
//   const [postalCode, setPostalCode] = useState("");
//   const [couponOpen, setCouponOpen] = useState(false);
//   const [couponInput, setCouponInput] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const planId = PAYPAL_PLAN_IDS[plan];

//   const applyCoupon = () => setCouponCode(couponInput.trim());

//   const handleApprove = async (subscriptionId: string) => {
//     setSubmitting(true);
//     setError(null);
//     try {
//       await recordPayment({
//         username,
//         email,
//         plan,
//         amount: price,
//         paymentMethod: "paypal",
//         paymentReference: subscriptionId,
//       });

//       router.push(`/payment/success?plan=${plan}`);
//     } catch (err) {
//       setError(
//         "Something went wrong recording your subscription. Please contact support.",
//       );
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       {!planId && (
//         <p className="rounded-lg bg-warning/10 px-3 py-2.5 text-xs text-warning-ink">
//           Missing PayPal plan ID for this plan — set NEXT_PUBLIC_PAYPAL_PLAN_ID_
//           {plan.toUpperCase()} in your environment variables.
//         </p>
//       )}

//       <div>
//         <label
//           htmlFor="cardholderName"
//           className="mb-2 block text-sm font-semibold text-ink"
//         >
//           Full name
//         </label>
//         <input
//           id="cardholderName"
//           type="text"
//           required
//           placeholder="Your full name"
//           value={cardholderName}
//           onChange={(e) => setCardholderName(e.target.value)}
//           className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
//         />
//       </div>

//       <div>
//         <label
//           htmlFor="payment-email"
//           className="mb-2 block text-sm font-semibold text-ink"
//         >
//           Email{" "}
//           <span className="font-normal text-muted-foreground">
//             — for receipts &amp; updates
//           </span>
//         </label>
//         <input
//           id="payment-email"
//           type="email"
//           required
//           placeholder="you@company.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
//         />
//       </div>

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-ink">
//           Billing address
//         </label>
//         <div className="overflow-hidden rounded-xl border border-border bg-white">
//           <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full border-0 bg-transparent px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
//           >
//             {COUNTRIES.map((c) => (
//               <option key={c.code} value={c.code}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             required
//             placeholder="Postal code"
//             value={postalCode}
//             onChange={(e) => setPostalCode(e.target.value)}
//             className="w-full border-0 border-t border-border bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 text-sm">
//         <div>
//           <p className="font-medium text-ink">{planName} · billed monthly</p>
//           <p className="text-xs text-muted">Next charge {nextChargeLabel}</p>
//         </div>
//         <p className="font-heading font-bold text-ink">${price.toFixed(2)}</p>
//       </div>

//       <div className="text-sm">
//         {!couponOpen ? (
//           <button
//             type="button"
//             onClick={() => setCouponOpen(true)}
//             className="text-action underline underline-offset-2"
//           >
//             Have a coupon? Add code
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={couponInput}
//               onChange={(e) => setCouponInput(e.target.value)}
//               placeholder="Coupon code"
//               className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
//             />
//             <button
//               type="button"
//               onClick={applyCoupon}
//               className="rounded-xl border border-border px-4 text-sm font-medium text-ink hover:bg-border/30"
//             >
//               Apply
//             </button>
//           </div>
//         )}
//         {couponCode && (
//           <p className="mt-1 text-xs text-success">
//             Coupon &ldquo;{couponCode}&rdquo; will be applied at checkout.
//           </p>
//         )}
//       </div>

//       {error && (
//         <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
//           {error}
//         </p>
//       )}

//       {/* PayPal handles the actual payment UI — including its own
//           PCI-compliant card entry for guest checkout without a PayPal
//           account, shown automatically as a second button when eligible. */}
//       <div>
//         <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
//           <Lock size={12} /> Secure checkout via PayPal
//         </p>
//         <PayPalButtons
//           disabled={
//             submitting || !planId || !email || !cardholderName || !postalCode
//           }
//           style={{ layout: "vertical", height: 48 }}
//           createSubscription={(_, actions) => {
//             return actions.subscription.create({
//               plan_id: planId!,
//               subscriber: {
//                 name: { given_name: cardholderName },
//                 email_address: email,
//               },
//             });
//           }}
//           onApprove={async (data) => {
//             if (data.subscriptionID) {
//               await handleApprove(data.subscriptionID);
//             }
//           }}
//           onError={() => setError("PayPal payment failed. Please try again.")}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaymentFormProps {
  plan: "grow" | "scale";
  planName: string;
  price: number;
  username: string;
  nextChargeLabel: string;
  paypalPlanId: string;
}

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AE", name: "United Arab Emirates" },
];

export default function PaymentForm({
  plan,
  planName,
  price,
  username,
  nextChargeLabel,
  paypalPlanId,
}: PaymentFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [postalCode, setPostalCode] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid =
    emailValid && fullName.trim().length > 0 && postalCode.trim().length > 0;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
        />
      </div>

      <div>
        <label
          htmlFor="payment-email"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Email{" "}
          <span className="font-normal text-muted-foreground">
            — for receipts &amp; updates
          </span>
        </label>
        <input
          id="payment-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Billing address
        </label>
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border-0 bg-transparent px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border-0 border-t border-border bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 text-sm">
        <div>
          <p className="font-medium text-ink">{planName} · billed monthly</p>
          <p className="text-xs text-muted">Next charge {nextChargeLabel}</p>
        </div>
        <p className="font-heading font-bold text-ink">${price.toFixed(2)}</p>
      </div>

      <div className="text-sm">
        {!couponOpen ? (
          <button
            type="button"
            onClick={() => setCouponOpen(true)}
            className="text-action underline underline-offset-2"
          >
            Have a coupon? Add code
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30"
            />
            <button
              type="button"
              onClick={() => setCouponCode(couponInput.trim())}
              className="rounded-xl border border-border px-4 text-sm font-medium text-ink hover:bg-border/30"
            >
              Apply
            </button>
          </div>
        )}
        {couponCode && (
          <p className="mt-1 text-xs text-muted">
            Coupon &ldquo;{couponCode}&rdquo; noted — not yet applied to price.
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      {!formValid && (
        <p className="text-center text-xs text-muted">
          Fill in your name, email, and postal code above to continue.
        </p>
      )}

      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Secure checkout via PayPal
        </p>
        <div
          className={
            !formValid || submitting ? "pointer-events-none opacity-40" : ""
          }
        >
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              vault: true,
              intent: "subscription",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", shape: "pill", label: "subscribe" }}
              createSubscription={(_data, actions) => {
                const [given, ...rest] = fullName.trim().split(" ");

                console.log("========== PAYPAL SUBSCRIPTION ==========");
                console.log("PayPal plan_id being used:", paypalPlanId);
                console.log(
                  "Client ID:",
                  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                );
                console.log("Plan:", plan);
                console.log("Email:", email);
                console.log("==========================================");

                // IMPORTANT: no shipping_address here. PayPal's schema
                // requires shipping_address to include its own
                // name.full_name field (separate from subscriber.name,
                // which uses given_name/surname) — omitting it caused
                // INVALID_SUBSCRIBER_SHIPPING_INFO_NAME. We don't ship
                // anything, so it's just left out entirely rather than
                // fighting that schema. Country/postal code are still
                // collected above and sent to /api/create-subscription
                // for the Supabase record — just not to PayPal itself.
                return actions.subscription.create({
                  plan_id: paypalPlanId,
                  subscriber: {
                    email_address: email,
                    name: {
                      given_name: given || fullName,
                      surname: rest.join(" ") || "-",
                    },
                  },
                });
              }}
              onApprove={async (data) => {
                setSubmitting(true);
                setError(null);
                try {
                  const { data: res } = await axios.post(
                    "/api/create-subscription",
                    {
                      subscriptionID: data.subscriptionID,
                      plan,
                      email,
                      fullName,
                      country,
                      postalCode,
                      instagramUsername: username,
                      couponCode: couponCode || undefined,
                    },
                  );

                  const params = new URLSearchParams({
                    plan,
                    customer: res.customerId,
                    username,
                  });
                  router.push(`/payment/success?${params.toString()}`);
                } catch (err: any) {
                  console.error(
                    "create-subscription failed:",
                    err.response?.data ?? err,
                  );
                  setError(
                    err.response?.data?.message ??
                      "Something went wrong confirming your subscription.",
                  );
                  setSubmitting(false);
                }
              }}
              // onError={(err) => {
              //   console.error("PayPal SDK error:", err);
              //   setError("PayPal couldn't complete that. Please try again.");
              // }}
              onError={(err) => {
                console.error("========== PAYPAL ERROR ==========");
                console.error(err);
                console.error("Plan ID:", paypalPlanId);
                console.error(
                  "Client ID:",
                  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                );
                console.error("==================================");

                setError(
                  "PayPal couldn't complete that. Check the browser console.",
                );
              }}
              onCancel={(data) => {
                console.warn("PayPal checkout cancelled:", data);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}
