import type { Metadata } from "next";
import { testimonials } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";
import { TestimonialCard } from "@/components/testimonials-marquee";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader eyebrow="Testimonials" title="Kind words" description="Recommendations from colleagues, managers and clients." />
      <Container className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:w-full [&>*]:break-inside-avoid">
        {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </Container>
      <CTA />
    </>
  );
}
