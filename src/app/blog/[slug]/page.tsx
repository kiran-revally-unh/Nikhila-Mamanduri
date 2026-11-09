import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, profile } from "@/content/profile";
import { Container } from "@/components/ui";
import { CTA } from "@/components/cta";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Container className="max-w-3xl pt-10">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All posts</Link>
        <p className="mt-8 text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: "long", timeZone: "UTC" })} · {p.publication ?? profile.name}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{p.title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty">{p.body.map((para, i) => <p key={i}>{para}</p>)}</div>
        {p.externalUrl && (
          <a href={p.externalUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
            Read the full article ↗
          </a>
        )}
      </Container>
      <CTA />
    </>
  );
}
