import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Variable font (weights 200–800) with the width axis loaded too, so headings
// can use the condensed cut via `font-heading-condensed` (wdth 75). Everything
// else stays at the default width (100), so existing headings look the same.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const sfPro = localFont({
  src: [
    {
      path: "../public/font/SF-Pro-Display-Ultralight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
  display: "swap",
});
