import Link from "next/link";
import { ArrowUpRight, CalendarCheck, ContactRound, MapPin, Sparkles } from "lucide-react";
import { experience, postDate, posts, profile, projects, services } from "@/content/profile";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Stats } from "@/components/stats";
import { TestimonialsMarquee } from "@/components/testimonials-marquee";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { MarqueeStrip } from "@/components/marquee-strip";
import { ScrollExpansion } from "@/components/scroll/scroll-expansion";
import { TextReveal } from "@/components/scroll/text-reveal";
import { StickyReveal, type Chapter } from "@/components/scroll/sticky-reveal";
import { ContainerScroll } from "@/components/scroll/container-scroll";
import { CardsStack } from "@/components/scroll/cards-stack";
import { ImpactRing, type Impact } from "@/components/scroll/impact-ring";
import { LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const serviceTones = [
  "bg-[#216f70] text-white",
  "bg-[#102a33] text-white",
  "bg-[#e97860] text-[#102a33]",
];

const orgs = ["Medi-Weightloss®", "Tufts Medicine", "U.S. Renal Care", "Yale New Haven Health", "University of New Haven"];

// Real results from Nikki's LinkedIn experience.
const impacts: Impact[] = [
  { value: "25%", label: "Higher patient throughput", org: "Tufts Medicine" },
  { value: "20%", label: "Fewer claim denials", org: "Tufts Medicine" },
  { value: "28%", label: "Fewer administrative bottlenecks", org: "Tufts Medicine" },
  { value: "25%", label: "Fewer equipment shortages", org: "Tufts Medicine" },
  { value: "15%", label: "Fewer scheduling conflicts", org: "Tufts Medicine" },
  { value: "24→10%", label: "Catheter usage reduced", org: "U.S. Renal Care" },
  { value: "18.9%", label: "Fewer missed treatments", org: "U.S. Renal Care" },
  { value: "14%", label: "Lower staff turnover", org: "U.S. Renal Care" },
];

const journey: Chapter[] = [
  {
    period: "2026 — Now",
    title: "Operations Manager",
    org: "Medi-Weightloss® · Los Angeles area",
    text: "Leading the launch of a physician-supervised weight-management clinic — patient journeys, SOPs, dashboards and GLP-1 workflows built for scale.",
    image: "/images/profile.jpg",
    gradient: "from-[#216f70] to-[#102a33]",
    label: "Operations, made human.",
  },
  {
    period: "2025 — 2026",
    title: "Lead Admin Coordinator",
    org: "Tufts Medicine · Boston",
    text: "Ran scheduling, prior authorizations and billing workflows in Epic and Meditech — throughput up 25%, claim denials down 20%.",
    gradient: "from-[#102a33] to-[#216f70]",
    label: "Coordination at scale.",
  },
  {
    period: "2023 — 2024",
    title: "Director of Community Relations",
    org: "SOHA · University of New Haven",
    text: "Connected MHA students with alumni, faculty and industry leaders, and wrote about it for the Charger Blog.",
    image: "/images/soha-kickoff.jpg",
    gradient: "from-[#e97860] to-[#216f70]",
    label: "Community first.",
  },
  {
    period: "Class of 2024",
    title: "Master of Healthcare Administration",
    org: "University of New Haven · plus CAPM®",
    text: "An MHA grounded in healthcare leadership, paired with PMI's Certified Associate in Project Management.",
    gradient: "from-[#216f70] via-[#3b8f8a] to-[#e97860]",
    label: "MHA · CAPM",
  },
];

export default function Home() {
  const current = experience[0];
  const featured = projects[0];
  const latest = posts.find((p) => p.source !== "linkedin");
  const newestPost = posts.find((p) => p.source === "linkedin" && p.images?.length);
  const morePosts = posts.filter((p) => p !== newestPost);
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
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Experience at</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-serif text-lg text-foreground/60 sm:text-xl">
                {orgs.map((o) => (
                  <li key={o} className="transition hover:text-foreground">{o}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
            {/* Cutout portrait on brand shapes */}
            <div className="relative aspect-square">
              <div className="absolute bottom-0 left-[4%] aspect-square w-[92%] rounded-full bg-gradient-to-br from-accent via-[#2b8584] to-[#102a33] shadow-2xl shadow-accent/30" />
              <div className="absolute bottom-[3%] left-[7%] aspect-square w-[86%] rounded-full border border-white/25" />
              <div className="absolute -right-2 top-[18%] size-24 rounded-full bg-coral-bright/30 blur-2xl" />
              <div className="absolute bottom-0 left-[4%] h-full w-[92%] overflow-hidden rounded-b-full">
                <img
                  src="/images/profile-cutout.webp"
                  alt={`Portrait of ${profile.name}`}
                  className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 drop-shadow-2xl"
                />
              </div>
              <span className="animate-float absolute right-0 top-[22%] rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-bold tracking-[0.2em] text-coral shadow-lg backdrop-blur">
                MHA
              </span>
              <span className="animate-float absolute left-0 top-[40%] rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-bold tracking-[0.2em] text-accent shadow-lg backdrop-blur [animation-delay:1.5s]">
                CAPM
              </span>
            </div>
            <div className="absolute -bottom-6 right-0 rounded-2xl border border-border bg-surface/90 p-4 shadow-xl backdrop-blur sm:-right-6">
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

      {/* Latest from LinkedIn: newest post with a photo, right under the hero */}
      {newestPost && (
        <Container className="mt-20 sm:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Latest from LinkedIn" title="What I'm sharing now" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <LinkedInIcon /> Follow on LinkedIn
            </a>
          </div>
          <Reveal>
            <Link
              href={`/blog/${newestPost.slug}`}
              className="group grid overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_24px_60px_-32px_rgb(16_42_51/0.35)] transition hover:-translate-y-1 md:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-[380px]">
                <img src={newestPost.images![0]} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                {newestPost.images!.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                    +{newestPost.images!.length - 1} photos
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium"><LinkedInIcon /> LinkedIn</span>
                  {postDate(newestPost, "long")}
                </p>
                <h3 className="font-serif text-3xl leading-tight text-balance transition group-hover:text-accent sm:text-4xl">{newestPost.title}</h3>
                <p className="line-clamp-4 text-muted-foreground">{newestPost.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read the post <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      )}

      <div className="mt-20 sm:mt-28"><MarqueeStrip /></div>

      {/* Scroll expansion: portrait grows to full-bleed, manifesto fades in */}
      <ScrollExpansion
        image="/images/profile-studio.jpg"
        alt={`Portrait of ${profile.name}`}
        eyebrow="My philosophy"
        lines={profile.manifesto}
      />

      {/* Text reveal about statement */}
      <Container className="mt-10">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-coral">About</p>
        <TextReveal
          className="max-w-5xl font-serif text-3xl leading-snug sm:text-5xl"
          text="I'm Nikki — a Healthcare Operations Manager with an MHA and CAPM. I build better systems so care teams are stronger and every patient has a better experience."
        />
        <Link href="/about" className="mt-8 inline-flex items-center gap-1 font-semibold text-accent">
          More about me <ArrowUpRight className="size-4" />
        </Link>
      </Container>

      <Container className="mt-24"><Stats /></Container>

      {/* Impact: 3D ring that turns on scroll */}
      <section className="mt-16">
        <ImpactRing items={impacts} />
      </section>

      {/* Journey: sticky scroll reveal */}
      <Container className="mt-28">
        <SectionHeading eyebrow="Journey" title="Where I've made an impact" />
        <StickyReveal chapters={journey} />
      </Container>

      {/* Featured project: container scroll */}
      <Container className="mt-28">
        <ContainerScroll
          header={
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Selected work" title="Featured project" />
              <Link href="/work" className="mb-10 text-sm font-semibold text-accent">All work →</Link>
            </div>
          }
        >
          <Link href={`/work/${featured.slug}`} className="group block">
            <div className="grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-2xl shadow-accent/10 lg:grid-cols-[1.4fr_1fr]">
              <div className={cn("relative aspect-[16/10] overflow-hidden bg-gradient-to-br lg:aspect-auto lg:min-h-[460px]", featured.gradient)}>
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
          </Link>
        </ContainerScroll>
      </Container>

      {/* Services: stacking cards */}
      <Container className="mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Services" title="How I can help" />
          <Link href="/services" className="mb-10 text-sm font-semibold text-accent">All services →</Link>
        </div>
        <CardsStack
          items={services.map((s, i) => (
            <div
              key={s.slug}
              className={cn(
                "grid min-h-[380px] gap-8 overflow-hidden rounded-[2rem] border border-border p-8 shadow-xl sm:p-12 md:grid-cols-[1fr_1.2fr]",
                serviceTones[i % serviceTones.length],
              )}
            >
              <div className="flex flex-col justify-between gap-6">
                <p className="font-serif text-7xl opacity-40">0{i + 1}</p>
                <Link
                  href={`/book?session=${s.sessionId}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#102a33] transition hover:bg-white"
                >
                  <CalendarCheck className="size-4" /> Book this
                </Link>
              </div>
              <div>
                <h3 className="font-serif text-4xl sm:text-5xl">{s.title}</h3>
                <p className="mt-4 text-lg opacity-85">{s.summary}</p>
                <ul className="mt-6 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 opacity-90"><Sparkles className="size-4" /> {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        />
      </Container>

      <section className="mt-28">
        <Container><SectionHeading eyebrow="Testimonials" title="What people say" align="center" /></Container>
        <TestimonialsMarquee />
      </section>

      {posts.length > 0 && (
        <Container className="mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Writing & LinkedIn" title="Latest posts" />
            <Link href="/blog" className="mb-10 text-sm font-semibold text-accent">All {posts.length} posts →</Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {morePosts.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid gap-4 py-7 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-8">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt="" loading="lazy" className="aspect-square w-24 rounded-2xl border border-border object-cover sm:w-full" />
                ) : (
                  <span className="hidden sm:block" />
                )}
                <div>
                  <h3 className="font-serif text-2xl leading-snug transition group-hover:text-accent">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{postDate(p)}{p.publication ? ` · ${p.publication}` : ""}</p>
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
