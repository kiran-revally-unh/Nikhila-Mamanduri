import type { Metadata } from "next";
import { Award, ExternalLink } from "lucide-react";
import { certifications, skillGroups } from "@/content/profile";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "Skills & Certifications" };

export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skills" title="Skills & certifications" description="What I bring to the table." />
      <Container className="mt-16 grid gap-6 md:grid-cols-3">
        {skillGroups.map((g) => (
          <Card key={g.title}>
            <h2 className="font-semibold">{g.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm">{s}</span>
              ))}
            </div>
          </Card>
        ))}
      </Container>
      <Container className="mt-24">
        <SectionHeading eyebrow="Certifications" title="Licenses & certifications" />
        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Card key={i} className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><Award className="size-6" /></span>
              <div className="flex-1">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
              </div>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
                  Verify <ExternalLink className="inline size-3.5" />
                </a>
              )}
            </Card>
          ))}
        </div>
      </Container>
      <CTA />
    </>
  );
}
