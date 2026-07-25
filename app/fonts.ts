import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
      path: "../public/font/SF-Pro-Display-Ultralight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/SF-Pro-Display-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
  display: "swap",
});
