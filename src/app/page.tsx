import Link from "next/link";
import { ArrowUpRight, CalendarCheck, ContactRound, MapPin, Sparkles } from "lucide-react";
import { experience, posts, profile, projects, services } from "@/content/profile";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Stats } from "@/components/stats";
import { TestimonialsMarquee } from "@/components/testimonials-marquee";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/tilt";
import { MarqueeStrip } from "@/components/marquee-strip";
import { LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function Home() {
  const current = experience[0];
  const featured = projects[0];
  const latest = posts[0];
  return (
    <>
      {/* Hero — follows Nikki's Setly digital card: serif name, coral credentials, teal manifesto. */}
      <section className="relative overflow-x-clip">
        <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            {latest?.externalUrl && (
              <Link
                href={`/blog/${latest.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3 text-xs font-medium shadow-sm backdrop-blur transition hover:border-accent"
              >
                <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">Featured</span>
                Charger Blog · University of New Haven
                <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
            <p className="mt-8 font-serif text-xl italic text-accent">{profile.kicker}</p>
            <h1 className="mt-2 text-6xl leading-[0.92] text-balance sm:text-7xl lg:text-[6.5rem]">{profile.name}</h1>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-coral">{profile.credentials.replace(", ", " · ")}</p>
            <p className="mt-4 text-2xl font-semibold">{profile.headline}</p>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" /> {profile.location}
            </p>
            <div className="hairline my-8 max-w-lg" />
            <p className="font-serif text-2xl italic leading-snug text-accent sm:text-3xl">
              {profile.manifesto.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book a call</ButtonLink>
              <a
                href="/contact.vcf"
                download="nikki-mamanduri.vcf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/80 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-muted"
              >
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
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-accent/25 via-transparent to-coral-bright/25 blur-2xl" />
            <Tilt className="rounded-[2.5rem]">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl shadow-accent/25">
                <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="aspect-[4/5] w-full object-cover" />
              </div>
            </Tilt>
            <div className="absolute -bottom-7 -left-7 rounded-2xl border border-border bg-surface/90 p-4 shadow-xl backdrop-blur">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Currently
              </p>
              <p className="font-semibold">{current.role}</p>
              <p className="text-sm text-muted-foreground">{current.company}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <MarqueeStrip />

      <Container className="mt-20"><Stats /></Container>

      {/* About teaser */}
      <Container className="mt-28 grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="About" title="Operations that feel human." />
          <div className="space-y-4 text-lg text-pretty text-muted-foreground">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent">
            More about me <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {profile.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5">
                <p className="font-serif text-4xl text-coral-bright">0{i + 1}</p>
                <p className="mt-2 text-lg font-semibold">{v.title}</p>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Featured project — large editorial card */}
      <Container className="mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Selected work" title="Featured project" />
          <Link href="/work" className="mb-10 text-sm font-semibold text-accent">All work →</Link>
        </div>
        <Reveal>
          <Link href={`/work/${featured.slug}`} className="group block">
            <Tilt className="rounded-[2rem]">
              <div className="grid overflow-hidden rounded-[2rem] border border-border bg-surface lg:grid-cols-[1.4fr_1fr]">
                <div className={cn("relative aspect-[16/10] overflow-hidden bg-gradient-to-br lg:aspect-auto lg:min-h-[420px]", featured.gradient)}>
                  {featured.image && (
                    <img src={featured.image} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                  )}
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{featured.category} · {featured.year}</p>
                    <h3 className="mt-3 font-serif text-4xl leading-tight">{featured.title}</h3>
                    <p className="mt-4 text-muted-foreground">{featured.summary}</p>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <div className="flex gap-8">
                      {featured.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-serif text-4xl text-accent">{m.value}</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-foreground text-background transition group-hover:rotate-45">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </Link>
        </Reveal>
      </Container>

      {/* Services */}
      <Container className="mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Services" title="How I can help" />
          <Link href="/services" className="mb-10 text-sm font-semibold text-accent">All services →</Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-surface p-8 transition hover:bg-accent-soft/40">
                <Sparkles className="size-5 text-coral-bright" />
                <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.summary}</p>
                <Link href={`/book?session=${s.sessionId}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <CalendarCheck className="size-4" /> Book this
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="mt-28">
        <Container><SectionHeading eyebrow="Testimonials" title="What people say" align="center" /></Container>
        <TestimonialsMarquee />
      </section>

      {posts.length > 0 && (
        <Container className="mt-28">
          <SectionHeading eyebrow="Writing" title="Latest writing" />
          <div className="divide-y divide-border border-y border-border">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-8">
                <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: "medium", timeZone: "UTC" })}</p>
                <div>
                  <h3 className="font-serif text-2xl leading-snug transition group-hover:text-accent">{p.title}</h3>
                  {p.publication && <p className="mt-1 text-sm text-muted-foreground">{p.publication}</p>}
                </div>
                <ArrowUpRight className="hidden size-6 text-muted-foreground transition group-hover:rotate-45 group-hover:text-accent sm:block" />
              </Link>
            ))}
          </div>
        </Container>
      )}

      <CTA />
    </>
  );
}
