import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "monospace"],
});

export const metadata: Metadata = {
  title: "Sushil | Computer Engineer & Software Developer",
  description:
    "Computer Engineering graduate specializing in Full Stack Development, Cybersecurity, and Cloud Computing. Building modern, scalable web applications.",
  keywords: [
    "Sushil",
    "Computer Engineer",
    "Software Developer",
    "Full Stack",
    "React",
    "Next.js",
    "Cybersecurity",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: "Sushil" }],
  creator: "Sushil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sushil.dev",
    title: "Sushil | Computer Engineer & Software Developer",
    description:
      "Computer Engineering graduate specializing in Full Stack Development, Cybersecurity, and Cloud Computing.",
    siteName: "Sushil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushil | Computer Engineer & Software Developer",
    description:
      "Computer Engineering graduate specializing in Full Stack Development, Cybersecurity, and Cloud Computing.",
    creator: "@sushil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#03030a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#09090b] text-[#0F172A] dark:text-zinc-100">
        {children}

        {/* Vercel Analytics    */}

        <Analytics />  

        {/* Speed insights using vercel */}

        <SpeedInsights/>       


        



      </body>
    </html>
  );
}
