import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <Container className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
        <p>When you book a session, send a message or subscribe, the details you enter (name, email, company and message) are sent to {profile.name} by email so they can reply. They are not sold or shared with third parties.</p>
        <p>To have your data removed, email <a className="text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
      </Container>
    </>
  );
}
