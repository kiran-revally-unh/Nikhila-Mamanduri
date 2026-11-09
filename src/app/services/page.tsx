import type { Metadata } from "next";
import { CalendarCheck, Check } from "lucide-react";
import Link from "next/link";
import { faqs, services } from "@/content/profile";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "Services" };

const serviceIcons = ["/images/3d/target.webp", "/images/3d/rocket.webp", "/images/3d/megaphone.webp"];

const process = [
  { title: "Book a call", text: "Pick a free intro slot that suits you." },
  { title: "Plan together", text: "We agree on goals, scope and timeline." },
  { title: "Do the work", text: "Regular check-ins so you always know where things stand." },
  { title: "Wrap up", text: "Handover, next steps and a follow-up." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Ways we can work together" description="Pick what fits — every service starts with a free intro call." />
      <Container className="mt-16 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Card key={s.slug} className="group flex flex-col">
            <img
              src={serviceIcons[i % serviceIcons.length]}
              alt=""
              aria-hidden
              className="-mt-2 mb-4 size-24 drop-shadow-xl transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
            />
            <h2 className="text-2xl">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" /> {d}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">Pricing: <span className="font-semibold text-foreground">{s.price}</span></p>
            <Link href={`/book?session=${s.sessionId}`} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
              <CalendarCheck className="size-4" /> Book this
            </Link>
          </Card>
        ))}
      </Container>
      <Container className="mt-24">
        <SectionHeading eyebrow="Process" title="How it works" />
        <ol className="grid gap-6 md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="text-4xl font-semibold text-accent/30">0{i + 1}</span>
              <p className="mt-2 font-semibold">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </Container>
      <Container className="mt-24 max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions" align="center" />
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {f.q}<span className="text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
      <CTA />
    </>
  );
}
