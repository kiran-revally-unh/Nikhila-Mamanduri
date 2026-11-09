import type { MetadataRoute } from "next";
import { posts, projects } from "@/content/profile";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/experience", "/services", "/work", "/gallery", "/skills", "/book", "/testimonials", "/blog", "/resources", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}
