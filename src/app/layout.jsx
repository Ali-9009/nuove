import "@/styles/globals.css";
import "remixicon/fonts/remixicon.css";

import { Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/V3Footer";
import AnnouncementPill from "@/components/AnnouncementPill";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: {
    default: "NUOVÉ | Elevated Skincare",
    template: "%s | NUOVÉ",
  },
  description:
    "Discover NUOVÉ, an elevated approach to everyday skincare with peptide-focused formulations and thoughtfully curated routines.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="text-text bg-white font-sans antialiased">
        <Header />
          <AnnouncementPill />
        {/* <div className="h-[108px] lg:h-20" aria-hidden="true" /> */}

        {children}
        <Footer />
      </body>
    </html>
  );
}
