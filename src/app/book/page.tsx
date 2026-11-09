import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Booking } from "@/components/booking";

export const metadata: Metadata = { title: "Book a session", description: "Pick a time that works for you." };

export default async function BookPage({ searchParams }: { searchParams: Promise<{ session?: string }> }) {
  const { session } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Booking" title="Book a session" description="Choose a session, pick a time in your timezone, and you're done." />
      <Container className="mt-12"><Booking initialSession={session} /></Container>
    </>
  );
}
