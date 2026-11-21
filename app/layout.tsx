import type { Metadata } from "next";
import { bricolage, jetbrainsMono, sfPro } from "./fonts";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { cn } from "@/lib/utils";
import "lenis/dist/lenis.css";
import Providers from "@/libs/ReduxProvider";
import { Toaster } from "sonner";
import { siteUrl } from "@/lib/site-url";

const SITE_NAME = "Ignited Social";
const DEFAULT_TITLE =
  "Ignited Social: Instagram growth with a dedicated Brand Manager";
const DEFAULT_DESCRIPTION =
  "Grow your Instagram with real, organic followers. A dedicated Brand Manager handles daily outreach to the people your work is for. No bots, ever.";

// Site-wide defaults. Each page sets its own `title` (shown as
// "<title> | Ignited Social") and `description`; anything a page leaves out
// falls back to these.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  // The preview card when the link is shared (WhatsApp, LinkedIn, X, iMessage…).
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        bricolage.variable,
        jetbrainsMono.variable,
        sfPro.className,
        "font-sans",
      )}
    >
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add
          attributes to <body> before React loads; don't flag those. */}
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* <Header /> */}

        <Providers>
          {/* <ProHeader /> */}
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
