import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { themeScript } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s · ${profile.name}` },
  description: profile.tagline,
  openGraph: { type: "website", title: profile.name, description: profile.tagline, url: siteUrl },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.tagline },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: profile.headline,
  honorificSuffix: profile.credentials,
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of New Haven" },
  address: { "@type": "PostalAddress", addressLocality: "Thousand Oaks", addressRegion: "CA", addressCountry: "US" },
  url: siteUrl,
  sameAs: [profile.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
