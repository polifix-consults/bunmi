import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WaitlistModalProvider } from "@/components/context/WaitlistModalContext";
import { NewsletterModalProvider } from "@/components/context/NewsletterModalContext";
import { SITE } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const metadataBaseUrl = (() => {
  try {
    return new URL(SITE.url);
  } catch {
    return new URL("https://olubunmiayantunji.com");
  }
})();

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: `${SITE.name} | Public Policy Analyst & Legislative Draftsman`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/images/media/pfp.png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Public Policy",
};

export const viewport: Viewport = {
  themeColor: "#F6F1E6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:rounded-[3px] focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-sm focus:text-paper-bright"
        >
          Skip to content
        </a>

        <NewsletterModalProvider>
          <WaitlistModalProvider>
            <Navbar />
            {children}
            <Footer />
          </WaitlistModalProvider>
        </NewsletterModalProvider>
      </body>
    </html>
  );
}
