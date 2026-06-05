import type { Metadata, Viewport } from "next";
import "@/lib/env";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata();


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060609",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${script.variable} relative min-h-full antialiased overflow-x-hidden w-full max-w-[100vw] bg-background text-foreground`}
      >
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}