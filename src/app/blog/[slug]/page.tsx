import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { postDate, posts, profile } from "@/content/profile";
import { Container } from "@/components/ui";
import { CTA } from "@/components/cta";
import { LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: p.images?.[0] ? { images: [p.images[0]] } : undefined } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = posts.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = posts[index];
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const images = p.images ?? [];

  return (
    <>
      <Container className="max-w-3xl pt-10">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All posts
        </Link>
        <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {p.source === "linkedin" && <LinkedInIcon />}
          {postDate(p, "long")} · {p.publication ?? profile.name}
        </p>
        <h1 className="mt-2 text-4xl leading-tight text-balance sm:text-5xl">{p.title}</h1>

        {images.length > 0 && (
          <div className={cn("mt-8 grid gap-3", images.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
            {images.map((src, i) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "overflow-hidden rounded-2xl border border-border bg-muted",
                  images.length === 3 && i === 0 && "col-span-2",
                )}
              >
                <img src={src} alt={`Photo ${i + 1} from the post`} loading={i > 1 ? "lazy" : undefined} className="size-full max-h-[560px] object-cover" />
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {p.linkedinUrl && (
            <a href={p.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
              <LinkedInIcon /> View on LinkedIn
            </a>
          )}
          {p.externalUrl && (
            <a href={p.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
              Read the full article <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {newer ? (
            <Link href={`/blog/${newer.slug}`} className="group rounded-2xl border border-border p-5 hover:border-accent">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Newer</p>
              <p className="mt-2 line-clamp-2 font-serif text-lg group-hover:text-accent">{newer.title}</p>
            </Link>
          ) : <span />}
          {older && (
            <Link href={`/blog/${older.slug}`} className="group rounded-2xl border border-border p-5 text-right hover:border-accent">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Older</p>
              <p className="mt-2 line-clamp-2 font-serif text-lg group-hover:text-accent">{older.title}</p>
            </Link>
          )}
        </nav>
      </Container>
      <CTA />
    </>
  );
}
