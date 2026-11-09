import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/profile";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Writing & insights" description="Notes on work, learning and the things I'm building." />
      <Container className="mt-12 max-w-3xl divide-y divide-border">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block py-8">
            <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: "long", timeZone: "UTC" })}</p>
            <h2 className="mt-1 text-2xl font-semibold group-hover:text-accent">{p.title}</h2>
            <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
