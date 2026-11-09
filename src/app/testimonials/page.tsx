import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { testimonials } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";
import { SampleNote, TestimonialCard } from "@/components/testimonials-marquee";
import { testimonialsAreSamples } from "@/content/profile";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  // Hidden until Nikki has real recommendations (set testimonialsAreSamples = false in profile.ts).
  if (testimonialsAreSamples) notFound();
  return (
    <>
      <PageHeader eyebrow="Testimonials" title="Kind words" description="Recommendations from colleagues, managers and clients." />
      <div className="mt-10">{testimonialsAreSamples && <SampleNote />}</div>
      <Container className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:w-full [&>*]:break-inside-avoid">
        {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </Container>
      <CTA />
    </>
  );
}
