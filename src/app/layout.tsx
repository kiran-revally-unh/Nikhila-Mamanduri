import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Ambient } from "@/components/ambient";
import { SmoothScroll } from "@/components/scroll/smooth-scroll";
import { ScrollProgress } from "@/components/scroll/scroll-progress";
import { themeScript } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/newsreader/500.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s · ${profile.name}` },
  description: profile.tagline,
  openGraph: { type: "website", title: profile.name, description: profile.tagline, url: siteUrl, images: [{ url: "/images/nikki-card.png", width: 2100, height: 1200 }] },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.tagline, images: ["/images/nikki-card.png"] },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.legalName,
  alternateName: profile.name,
  email: profile.email,
  telephone: profile.phone,
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
        <Ambient />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
