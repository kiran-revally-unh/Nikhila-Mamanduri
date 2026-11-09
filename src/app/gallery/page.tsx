import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments" description="Portraits, events and the people along the way." />
      <Container className="mt-12"><GalleryGrid /></Container>
    </>
  );
}
