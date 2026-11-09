import type { Metadata } from "next";
import Link from "next/link";
import { Award, CalendarCheck, ContactRound, GraduationCap, Languages, MapPin } from "lucide-react";
import { certifications, education, experience, languages, profile, skillGroups } from "@/content/profile";
import { Container, Tag } from "@/components/ui";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/tilt";
import { LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = { title: "About" };

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "experience", label: "Work experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills & certifications" },
];

export default function About() {
  return (
    <>
      <Container className="grid gap-12 pt-14 lg:grid-cols-[300px_1fr] lg:gap-20">
        {/* Sticky profile column */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Tilt className="mx-auto max-w-[300px] rounded-[2rem]">
            <img
              src={profile.photoAlt}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full rounded-[2rem] border border-border object-cover shadow-xl shadow-accent/10"
            />
          </Tilt>
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-accent" /> {profile.location}</p>
            <p className="flex items-center gap-2"><Languages className="size-4 text-accent" /> {languages.join(", ")}</p>
          </div>
          <div className="mt-6 grid gap-2">
            <Link href="/book" className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
              <CalendarCheck className="size-4" /> Schedule a call
            </Link>
            <a href="/contact.vcf" download="nikki-mamanduri.vcf" className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              <ContactRound className="size-4" /> Save contact
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
          <nav aria-label="On this page" className="mt-10 hidden lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">On this page</p>
            <ul className="space-y-2 border-l border-border">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted-foreground transition hover:border-accent hover:text-foreground">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <section id="intro" className="scroll-mt-24">
            <p className="font-serif text-xl italic text-accent">{profile.kicker}</p>
            <h1 className="mt-2 text-5xl leading-none sm:text-7xl">{profile.legalName}</h1>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-coral">{profile.credentials.replace(", ", " · ")}</p>
            <p className="mt-3 text-2xl font-semibold">{profile.headline}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-muted-foreground">
              {profile.about.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <blockquote className="mt-10 border-l-2 border-coral-bright pl-6 font-serif text-2xl italic leading-snug text-accent sm:text-3xl">
              {profile.manifesto.join(" ")}
            </blockquote>
          </section>

          <section id="experience" className="mt-24 scroll-mt-24">
            <h2 className="text-4xl">Work experience</h2>
            <div className="mt-8 divide-y divide-border">
              {experience.map((e, i) => (
                <Reveal key={i} className="grid gap-3 py-8 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-xl font-semibold">{e.company}</h3>
                    <p className="text-accent">{e.role}</p>
                    <p className="mt-3 text-muted-foreground">{e.summary}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-bright" />{h}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right">
                    {e.start} — {e.end}
                    <span className="block">{e.location}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="education" className="mt-24 scroll-mt-24">
            <h2 className="text-4xl">Education</h2>
            <div className="mt-8 space-y-4">
              {education.map((e) => (
                <div key={e.school} className="flex gap-4 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur">
                  <GraduationCap className="size-6 shrink-0 text-accent" />
                  <div>
                    <p className="text-lg font-semibold">{e.school}</p>
                    <p className="text-muted-foreground">{e.degree} · {e.start ? `${e.start} — ` : "Class of "}{e.end}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="mt-24 scroll-mt-24">
            <h2 className="text-4xl">Skills & certifications</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <p className="mb-3 font-semibold">{g.title}</p>
                  <div className="flex flex-wrap gap-2">{g.items.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              {certifications.map((c) => (
                <div key={c.name} className="flex items-center gap-4 rounded-3xl border border-border bg-surface/80 p-5 backdrop-blur">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Award className="size-5" /></span>
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
      <CTA />
    </>
  );
}
