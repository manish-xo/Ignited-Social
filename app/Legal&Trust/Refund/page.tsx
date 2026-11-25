import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
} from "../_components/LegalPage";

export const metadata: Metadata = publicPage({
  title: "Refund & Cancellation Policy",
  description:
    "Cancel your Ignited Social plan or add-on anytime and get your most recent payment back. What is covered and how it works.",
  path: "/Legal&Trust/Refund",
});

const Email = () => (
  <LegalLink href="mailto:hello@ignited.social">hello@ignited.social</LegalLink>
);

const Refund = () => {
  return (
    <LegalPage
      label="Refunds"
      title="Refund & Cancellation Policy"
      intro={
        <>
          <p className="text-ink">Your next month is ours to earn.</p>
          <p className="mt-3">
            Cancel anytime, and we’ll automatically refund your most recent
            payment in full. This applies to your first paid month and every
            month after that. No separate refund request. No explanation needed.
          </p>
        </>
      }
    >
      <LegalSection title="What is covered?">
        <p>
          Our refund promise covers Grow, Scale and any add-on you cancel. We
          refund the most recent payment for the plan or add-on being cancelled.
        </p>
      </LegalSection>

      <LegalSection title="How to cancel">
        <p>You can cancel your plan or an add-on in either of these ways:</p>
        <LegalList>
          <li>Through your Ignited dashboard.</li>
          <li>
            By contacting your Brand Manager or emailing <Email />.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="What happens after you cancel?">
        <p>
          Your cancelled plan or add-on stays active until the end of its
          current billing period, and you won’t be charged for it again. You
          still receive the full refund of your most recent payment.
        </p>
        <p>
          If you’d like the service to stop sooner, contact your Brand Manager
          and ask them to stop it right away.
        </p>
      </LegalSection>

      <LegalSection title="Cancelling during your free trial">
        <p>
          Cancel before your 7-day free trial ends, and you won’t be charged.
        </p>
      </LegalSection>

      <LegalSection title="Where does the refund go, and how long does it take?">
        <p>
          We issue refunds through PayPal to your original payment method. If
          PayPal cannot return the money to that method, it may credit your
          PayPal balance under its refund rules.
        </p>
        <p>
          The time it takes for the money to reach you depends on PayPal, your
          payment method and your bank or card issuer. An automatic refund does
          not mean the money will appear in your account immediately.
        </p>
        <p>
          See{" "}
          <LegalLink href="https://www.paypal.com/us/cshelp/article/where-is-my-refund-help130">
            PayPal’s refund guidance
          </LegalLink>{" "}
          for processing times and how to check your refund’s status.
        </p>
      </LegalSection>

      <LegalSection title="Need help?">
        <p>
          Contact your Brand Manager or email <Email /> for help with a
          cancellation or refund.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default Refund;
