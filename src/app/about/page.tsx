import type { Metadata } from "next";
import { GraduationCap, Languages } from "lucide-react";
import { education, languages, profile } from "@/content/profile";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title={`I'm ${profile.name}`} description={profile.headline} />
      <Container className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <img src={profile.photo} alt={profile.name} className="aspect-[4/5] w-full rounded-3xl border border-border object-cover" />
        <div className="space-y-5 text-lg text-pretty text-muted-foreground">
          {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {profile.values.map((v) => (
              <Card key={v.title} className="p-4">
                <p className="text-base font-semibold text-foreground">{v.title}</p>
                <p className="text-sm">{v.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      <Container className="mt-16"><Stats /></Container>
      <Container className="mt-24 grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Education" title="Where I studied" />
          <div className="space-y-4">
            {education.map((e) => (
              <Card key={e.school} className="flex gap-4">
                <GraduationCap className="size-6 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{e.school}</p>
                  <p className="text-sm text-muted-foreground">{e.degree} · {e.start} — {e.end}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Languages" title="I speak" />
          <Card className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <span key={l} className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                <Languages className="size-4 text-accent" /> {l}
              </span>
            ))}
          </Card>
        </div>
      </Container>
      <CTA />
    </>
  );
}
