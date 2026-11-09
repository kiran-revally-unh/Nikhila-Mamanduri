// Hero inspired by 21st.dev "portfolio-hero" / "featured-project-hero".
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, MapPin } from "lucide-react";
import { experience, posts, profile, projects, services } from "@/content/profile";
import { ButtonLink, Card, Container, Eyebrow, SectionHeading } from "@/components/ui";
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
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <Eyebrow>Available for new projects</Eyebrow>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Hi, I&apos;m {profile.shortName}.
              <span className="block bg-gradient-to-r from-accent to-emerald-600 bg-clip-text dark:to-emerald-400 text-transparent">{profile.headline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book a call</ButtonLink>
              <ButtonLink href="/work" variant="secondary">View my work</ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{profile.name}, {profile.credentials}</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {profile.location}</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-gradient-to-br from-accent/40 to-emerald-500/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-2 shadow-2xl">
              <img src={profile.photo} alt={profile.name} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/40 p-4 text-white backdrop-blur-md">
                <p className="text-xs opacity-75">Currently</p>
                <p className="font-semibold">{current.role}</p>
                <p className="text-sm opacity-80">{current.company}</p>
              </div>
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
