import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JIMVIO – Global Creator-Commerce Ecosystem",
    template: "%s | JIMVIO",
  },
  description:
    "Buy, sell, affiliate, influence, and build communities. JIMVIO is the global creator-commerce platform built for Africa and beyond.",
  keywords: ["marketplace", "ecommerce", "affiliate", "influencer", "community", "Rwanda", "Africa"],
  authors: [{ name: "JIMVIO" }],
  creator: "JIMVIO",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jimvio.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jimvio.com",
    title: "JIMVIO – Global Creator-Commerce Ecosystem",
    description: "The all-in-one platform for buyers, vendors, affiliates, influencers, and communities.",
    siteName: "JIMVIO",
  },
  twitter: {
    card: "summary_large_image",
    title: "JIMVIO – Global Creator-Commerce Ecosystem",
    description: "The all-in-one platform for buyers, vendors, affiliates, influencers, and communities.",
    creator: "@jimvio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
