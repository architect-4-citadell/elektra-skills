import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Elektra Skills — Responsible AI Engineering & Execution Automation | Citadel Agentic Labs",
  description:
    "A delivery-focused CLAUDE.md persona with governance hooks, RAI gates, and a 14-phase execution engine. Built across 66+ production sessions. 200+ PRs. Zero silent failures.",
  openGraph: {
    title: "Elektra Skills — Responsible AI Engineering & Execution Automation",
    description:
      "Governance skills for AI coding agents. 14-phase execution engine with design review gates. Built by Citadel Agentic Labs.",
    url: "https://citadellabs.ai/experiments/agent-skills",
    siteName: "Citadel Agentic Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elektra Skills — Responsible AI Engineering & Execution Automation",
    description:
      "A delivery-focused CLAUDE.md persona with RAI gates and a 14-phase execution engine. By Citadel Agentic Labs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${satoshi.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain">{children}<Analytics /></body>
    </html>
  );
}
