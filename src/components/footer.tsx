import Link from "next/link";
import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedInIcon } from "./icons";
import { Newsletter } from "./newsletter";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/experience", label: "Experience" },
      { href: "/skills", label: "Skills" },
      { href: "/work", label: "Work" },
    ],
  },
  {
    title: "Work with me",
    links: [
      { href: "/services", label: "Services" },
      { href: "/book", label: "Book a session" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="max-w-xs text-sm text-muted-foreground">{profile.headline}</p>
          <Newsletter />
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground">
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
