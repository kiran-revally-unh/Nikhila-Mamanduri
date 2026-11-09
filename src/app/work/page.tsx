import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { WorkGrid } from "./work-grid";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Work" title="Projects & case studies" description="A selection of things I've planned, built and shipped." />
      <Container className="mt-12"><WorkGrid /></Container>
    </>
  );
}
