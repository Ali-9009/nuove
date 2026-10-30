import "@/styles/globals.css";

import { Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/Header";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "NUOVE | Luxury Skincare",
  description: "Discover NUOVE — a refined skincare experience.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="text-text bg-white font-sans antialiased">
        <Header />

        <div className="h-[108px] lg:h-[124px]" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
