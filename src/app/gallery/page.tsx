import type { Metadata } from "next";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { GalleryGrid } from "./gallery-grid";
import { ZoomParallax } from "@/components/scroll/zoom-parallax";
import { gallery, linkedinGallery } from "@/content/profile";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const featured = gallery.slice(0, gallery.length - linkedinGallery.length);
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments" description="Portraits, events, milestones and the people along the way." />
      <ZoomParallax images={[featured[0], featured[1], featured[3], featured[2]]} />
      <Container className="mt-12">
        <SectionHeading eyebrow="Featured" title="Portraits & highlights" />
        <GalleryGrid items={featured} />
      </Container>
      <Container className="mt-24">
        <SectionHeading
          eyebrow="From LinkedIn"
          title="Milestones in photos"
          description={`${linkedinGallery.length} photos from Nikki's LinkedIn posts — tap any photo to open it and jump to the post.`}
        />
        <GalleryGrid items={linkedinGallery} />
      </Container>
    </>
  );
}
