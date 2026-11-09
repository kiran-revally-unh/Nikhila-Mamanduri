import Link from "next/link";
import { ArrowUpRight, CalendarCheck, ContactRound, MapPin } from "lucide-react";
import { experience, posts, profile, projects, services } from "@/content/profile";
import { ButtonLink, Card, Container, SectionHeading } from "@/components/ui";
import { Stats } from "@/components/stats";
import { ProjectCard } from "@/components/project-card";
import { TestimonialsMarquee } from "@/components/testimonials-marquee";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { LinkedInIcon } from "@/components/icons";

export default function Home() {
  const current = experience[0];
  return (
    <>
      {/* Hero follows Nikki's Setly digital card: serif name, coral credentials, teal manifesto. */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-accent-soft/80 dark:bg-accent-soft/40" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 size-[420px] rounded-full bg-coral-bright/10" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Medi-Weightloss® · Thousand Oaks
            </p>
            <p className="mt-6 font-serif text-xl italic text-accent">{profile.kicker}</p>
            <h1 className="mt-2 text-6xl leading-[0.95] text-balance sm:text-7xl lg:text-8xl">{profile.name}</h1>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.3em] text-coral">{profile.credentials.replace(", ", " · ")}</p>
            <p className="mt-5 text-2xl font-semibold">{profile.headline}</p>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground"><MapPin className="size-4" /> {profile.location}</p>
            <hr className="my-8 max-w-lg border-border" />
            <p className="font-serif text-2xl italic leading-snug text-accent sm:text-3xl">
              {profile.manifesto.map((line) => <span key={line} className="block">{line}</span>)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book a call</ButtonLink>
              <a href="/contact.vcf" download="nikki-mamanduri.vcf" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition hover:bg-muted">
                <ContactRound className="size-4" /> Save my contact
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <a href={`tel:${profile.phone}`} className="font-semibold text-foreground hover:text-accent">{profile.phoneDisplay}</a>
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-accent/20">
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-surface p-4 shadow-xl">
              <p className="text-xs text-muted-foreground">Currently</p>
              <p className="font-semibold">{current.role}</p>
              <p className="text-sm text-muted-foreground">{current.company}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container><Stats /></Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="About" title="A little about me" />
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-4 text-lg text-pretty text-muted-foreground">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
            <Link href="/about" className="inline-flex items-center gap-1 font-medium text-accent">Read my story <ArrowUpRight className="size-4" /></Link>
          </Reveal>
          <div className="grid gap-3">
            {profile.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Card className="p-5"><p className="font-semibold">{v.title}</p><p className="text-sm text-muted-foreground">{v.text}</p></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Services" title="How I can help" />
          <Link href="/services" className="mb-10 text-sm font-medium text-accent">All services →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Card className="h-full transition hover:border-accent">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                <Link href={`/book?session=${s.sessionId}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  <CalendarCheck className="size-4" /> Book this
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Selected work" title="Featured projects" />
          <Link href="/work" className="mb-10 text-sm font-medium text-accent">All projects →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </Container>

      <section className="mt-24">
        <Container><SectionHeading eyebrow="Testimonials" title="What people say" align="center" /></Container>
        <TestimonialsMarquee />
      </section>

      {posts.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Blog" title="Latest writing" />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <Card className="h-full transition group-hover:border-accent">
                  <p className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: "medium", timeZone: "UTC" })}</p>
                  <h3 className="mt-2 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <CTA />
    </>
  );
}
