import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import MobileNewsEventsWrapper from "@/components/mobile-news-events-wrapper";
import NewsEventsTab from "@/components/NewsEventsTab";
import { siteConfig, organizationSchema, websiteSchema } from "@/lib/seo-config";

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: "Best School in Mysore | Mysore International School - Top CBSE & International School",
    template: "%s | Mysore International School",
  },
  description: "Mysore International School - Best International School in Mysore offering world-class CBSE education, state-of-the-art facilities, and holistic development. Top-ranked school in Mysore, Karnataka.",
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  openGraph: {
    ...siteConfig.openGraph,
    title: "Best School in Mysore | Mysore International School",
    description: "Top International School in Mysore offering excellence in CBSE education with world-class facilities and holistic development programs.",
  },
  twitter: {
    ...siteConfig.twitter,
    title: "Best School in Mysore | Mysore International School",
    description: "Top International School in Mysore offering excellence in CBSE education with world-class facilities.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: siteConfig.verification,
  alternates: {
    canonical: 'https://mysoreinternationalschool.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="canonical" href="https://mysoreinternationalschool.com" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <NewsEventsTab />
        <MobileNewsEventsWrapper />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
