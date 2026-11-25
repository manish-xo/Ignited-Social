import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
  Term,
} from "../_components/LegalPage";

export const metadata: Metadata = publicPage({
  title: "Privacy Policy",
  description:
    "How Ignited Social collects, uses and shares your personal information when you visit or make a purchase from our site.",
  path: "/Legal&Trust/Privacy",
});

const Privacy = () => {
  return (
    <LegalPage
      label="Privacy"
      title="Ignited Social Privacy Policy"
      intro={
        <p>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from{" "}
          <LegalLink href="https://www.ignited.social">
            www.ignited.social
          </LegalLink>{" "}
          (the “Site”).
        </p>
      }
    >
      <LegalSection title="Personal Information">
        <p>
          This website is operated by Social Three Sixty Consulting Private
          Limited. Throughout the site, the terms “we”, “us” and “our” refer to
          Social Three Sixty Consulting Private Limited. This privacy policy is
          intended to inform you about how we handle your personal information.
        </p>
        <p>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as{" "}
          <Term>“Device Information.”</Term>
        </p>
        <p>We collect Device Information using the following technologies:</p>
        <LegalList>
          <li>
            <Term>“Cookies”</Term> are data files that are placed on your device
            or computer and often include an anonymous unique identifier. For
            more information about cookies, and how to disable cookies, visit{" "}
            <LegalLink href="http://www.allaboutcookies.org">
              http://www.allaboutcookies.org
            </LegalLink>
            .
          </li>
          <li>
            <Term>“Log files”</Term> track actions occurring on the Site, and
            collect data including your IP address, browser type, Internet
            service provider, referring/exit pages, and date/time stamps.
          </li>
          <li>
            <Term>“Web beacons,” “tags,” and “pixels”</Term> are electronic
            files used to record information about how you browse the Site.
          </li>
        </LegalList>
        <p>
          Additionally when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers), email address, and phone number. We
          refer to this information as <Term>“Order Information.”</Term>
        </p>
        <p>
          When we talk about <Term>“Personal Information”</Term> in this Privacy
          Policy, we are talking both about Device Information and Order
          Information.
        </p>
      </LegalSection>

      <LegalSection title="How do we use your information?">
        <p>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
        </p>
        <LegalList>
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>
            When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
        </LegalList>
        <p>
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
      </LegalSection>

      <LegalSection title="Sharing your Information">
        <p>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. We use Google Analytics
          to help us understand how our customers use the Site--you can read
          more about how Google uses your Personal Information here:{" "}
          <LegalLink href="https://www.google.com/intl/en/policies/privacy/">
            https://www.google.com/intl/en/policies/privacy/
          </LegalLink>
          . You can also opt-out of Google Analytics here:{" "}
          <LegalLink href="https://tools.google.com/dlpage/gaoptout">
            https://tools.google.com/dlpage/gaoptout
          </LegalLink>
          .
        </p>
        <p>
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>
      </LegalSection>

      <LegalSection title="Behavioral Advertising">
        <p>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at{" "}
          <LegalLink href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
          </LegalLink>
          .
        </p>
        <p>You can opt out of targeted advertising by:</p>
        <LegalList>
          <li>
            <LegalLink href="https://myadcenter.google.com/">Google</LegalLink>
          </li>
          <li>
            <LegalLink href="https://www.facebook.com/settings/?tab=ads">
              Facebook
            </LegalLink>
          </li>
          <li>
            <LegalLink href="https://account.microsoft.com/privacy/ad-settings">
              Bing
            </LegalLink>
          </li>
        </LegalList>
        <p>
          Additionally, you can opt out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at:{" "}
          <LegalLink href="https://optout.aboutads.info/">OptOut</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="Do Not Track">
        <p>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          If you are a European resident, you have the right to access personal
          information we hold about you and to ask that your personal
          information be corrected, updated, or deleted. If you would like to
          exercise this right, please contact us through the contact information
          below.
        </p>
        <p>
          Additionally, if you are a European resident we note that we are
          processing your information in order to fulfill contracts we might
          have with you (for example if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information will be transferred
          outside of Europe, including to India, the United Arab Emirates and
          the United States.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </p>
      </LegalSection>

      <LegalSection title="Minors">
        <p>The Site is not intended for individuals under the age of 18.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at{" "}
          <LegalLink href="mailto:hello@ignited.social">
            hello@ignited.social
          </LegalLink>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default Privacy;
