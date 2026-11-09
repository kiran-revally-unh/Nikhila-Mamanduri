// Clean typographic footer on white: contact call-out with a large email link,
// link columns, then the full name set large in ink above a slim bottom bar.
import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedInIcon } from "./icons";
import { Newsletter } from "./newsletter";
import { LocalTime } from "./local-time";

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
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Contact call-out */}
        <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-coral">Get in touch</p>
            <h2 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">
              Have a clinic or project in mind? <span className="italic text-accent">Let&apos;s talk.</span>
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex max-w-full items-center gap-2 break-all border-b-2 border-foreground/15 pb-1 font-serif text-xl transition hover:border-accent hover:text-accent sm:text-3xl"
            >
              {profile.email}
              <ArrowUpRight className="size-5 shrink-0 transition group-hover:rotate-45 sm:size-6" />
            </a>
          </div>
          <div className="space-y-3 lg:justify-self-end">
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              <CalendarCheck className="size-4" /> Book a free call
            </Link>
            <div className="flex gap-3">
              <a
                href={`tel:${profile.phone}`}
                className="flex-1 rounded-full border border-border px-5 py-3 text-center text-sm font-semibold transition hover:bg-muted"
              >
                {profile.phoneDisplay}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-[46px] place-items-center rounded-full border border-border transition hover:bg-muted"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Links + newsletter */}
        <div className="grid gap-10 border-t border-border py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <p className="font-semibold">Notes on healthcare operations</p>
            <p className="max-w-xs text-sm text-muted-foreground">Occasional updates on clinic workflows, patient experience and MHA life.</p>
            <Newsletter />
            <a href={profile.digitalCard} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-3 pt-2">
              <img src="/images/nikki-qr.png" alt="QR code for Nikki's digital card" className="size-16 rounded-xl border border-border bg-white p-1" />
              <span className="text-xs text-muted-foreground">Scan or tap to save
                <br />my digital card</span>
            </a>
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

        {/* Name */}
        <div className="border-t border-border pt-10">
          <p
            aria-hidden
            className="select-none font-serif leading-[0.9] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.75rem, 10.5vw, 9.5rem)" }}
          >
            {profile.legalName}
          </p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-coral">{profile.credentials.replace(", ", " · ")}</p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.legalName}. All rights reserved.</p>
          <LocalTime />
        </div>
      </div>
    </footer>
  );
}
