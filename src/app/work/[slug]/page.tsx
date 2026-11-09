import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/content/profile";
import { Container, Tag } from "@/components/ui";
import { CTA } from "@/components/cta";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <Container className="pt-10">
        <Link href="/work" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Tag>{p.category}</Tag> {p.year}</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
        <div className={cn("relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl bg-gradient-to-br", p.gradient)}>
          {p.image ? (
            <img src={p.image} alt={p.title} className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className="bg-grid absolute inset-0 opacity-40" />
          )}
        </div>
      </Container>
      <Container className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          {[
            ["The problem", p.problem],
            ["My approach", p.approach],
            ["The result", p.result],
          ].map(([h, t]) => (
            <section key={h}>
              <h2 className="text-2xl font-semibold">{h}</h2>
              <p className="mt-3 text-lg text-pretty text-muted-foreground">{t}</p>
            </section>
          ))}
        </div>
        <aside className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-2xl font-semibold text-accent">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Tools</p>
            <div className="flex flex-wrap gap-2">{p.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
          {p.source && (
            <a href={p.source.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-border bg-surface p-4 text-sm font-medium text-accent transition hover:border-accent">
              {p.source.label} ↗
            </a>
          )}
          <Link href={`/work/${next.slug}`} className="block rounded-2xl border border-border bg-surface p-4 transition hover:border-accent">
            <p className="text-xs text-muted-foreground">Next project</p>
            <p className="font-semibold">{next.title} →</p>
          </Link>
        </aside>
      </Container>
      <CTA title="Have a similar project?" />
    </>
  );
}
