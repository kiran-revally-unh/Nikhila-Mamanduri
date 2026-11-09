import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { postDate, posts } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";
import { LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const linkedinCount = posts.filter((p) => p.source === "linkedin").length;
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing & updates"
        description={`Articles and ${linkedinCount} posts from LinkedIn — healthcare operations, career milestones and the people along the way.`}
      />
      <Container className="mt-12 max-w-4xl divide-y divide-border">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid gap-5 py-8 sm:grid-cols-[1fr_180px] sm:items-center">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                {p.source === "linkedin" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium"><LinkedInIcon /> LinkedIn</span>
                ) : (
                  p.publication && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{p.publication}</span>
                )}
                {postDate(p, "long")}
              </p>
              <h2 className="mt-2 text-2xl leading-snug transition group-hover:text-accent">{p.title}</h2>
              <p className="mt-2 line-clamp-2 text-muted-foreground">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Read <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
              </span>
            </div>
            {p.images?.[0] && (
              <div className="relative order-first aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted sm:order-none">
                <img src={p.images[0]} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                {p.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">+{p.images.length - 1}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </Container>
    </>
  );
}
