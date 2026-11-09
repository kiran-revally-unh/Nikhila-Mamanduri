import type { Metadata } from "next";
import { experience } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";
import { Timeline } from "@/components/timeline";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="My career so far" description="Roles, teams and the results along the way." />
      <Container className="mt-16"><Timeline items={experience} /></Container>
      <CTA title="Want to work together?" />
    </>
  );
}
