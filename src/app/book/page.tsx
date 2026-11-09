import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Booking } from "@/components/booking";
import { sessionTypes } from "@/content/profile";

// Optional Cal.com events (e.g. the 60-minute session) switch on as soon as they exist.
async function liveCalLinks() {
  const entries = await Promise.all(
    sessionTypes.map(async (s) => {
      if (!s.calLink) return [s.id, undefined] as const;
      if (!s.calOptional) return [s.id, s.calLink] as const;
      try {
        const res = await fetch(`https://cal.com/${s.calLink}`, { method: "HEAD", next: { revalidate: 600 } });
        return [s.id, res.ok ? s.calLink : undefined] as const;
      } catch {
        return [s.id, undefined] as const;
      }
    }),
  );
  return Object.fromEntries(entries) as Record<string, string | undefined>;
}

export const metadata: Metadata = { title: "Book a session", description: "Pick a time that works for you." };

export default async function BookPage({ searchParams }: { searchParams: Promise<{ session?: string }> }) {
  const { session } = await searchParams;
  const calLinks = await liveCalLinks();
  return (
    <>
      <PageHeader eyebrow="Booking" title="Book a session" description="Choose a session, pick a time in your timezone, and you're done." />
      <Container className="mt-12"><Booking initialSession={session} calLinks={calLinks} /></Container>
    </>
  );
}
