// "Bold colour" footer: a light contact line, then a dark rounded card with the
// animated nikki* wordmark, quick links and the legal line.
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { Wordmark } from "./home/bold-home";
import { LocalTime } from "./local-time";

const links = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="mt-20 sm:mt-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="font-display text-[28px] font-light leading-tight sm:text-5xl">
          Have a clinic in mind? <i className="text-accent">Let&apos;s talk.</i>
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-3 inline-flex max-w-full items-center gap-1.5 break-all border-b-[1.5px] border-foreground pb-0.5 text-sm transition hover:border-accent hover:text-accent sm:text-lg"
        >
          {profile.email}
          <ArrowUpRight className="size-4 shrink-0 transition group-hover:rotate-45" />
        </a>
      </div>

      <div className="mx-2.5 mb-2.5 mt-8 rounded-[34px] bg-[#102a33] px-6 py-8 text-white sm:mx-auto sm:max-w-5xl sm:px-10 sm:py-12">
        <Wordmark />
        <div className="mt-6 flex justify-between gap-4 text-sm font-bold sm:justify-start sm:gap-10">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#f0937e]">LinkedIn ↗</a>
          <a href={`mailto:${profile.email}`} className="hover:text-[#f0937e]">Email ↗</a>
          <Link href="/book" className="hover:text-[#f0937e]">Book ↗</Link>
        </div>
        <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/65">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-1 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.legalName} · {profile.credentials}</p>
          <LocalTime />
        </div>
      </div>
    </footer>
  );
}
