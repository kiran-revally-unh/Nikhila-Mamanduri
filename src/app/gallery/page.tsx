import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { GalleryGrid } from "./gallery-grid";
import { ZoomParallax } from "@/components/scroll/zoom-parallax";
import { gallery } from "@/content/profile";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments" description="Portraits, events and the people along the way." />
      <ZoomParallax images={[gallery[0], gallery[1], gallery[3], gallery[2]]} />
      <Container className="mt-12"><GalleryGrid /></Container>
    </>
  );
}
