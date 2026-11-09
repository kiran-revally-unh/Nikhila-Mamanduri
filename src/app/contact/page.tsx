import type { Metadata } from "next";
import { CalendarCheck, Clock, ContactRound, Mail, MapPin, MessageCircle, Phone, QrCode } from "lucide-react";
import Link from "next/link";
import { faqs, profile } from "@/content/profile";
import { Card, Container, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const items = [
    { icon: <Phone className="size-5" />, label: "Phone", value: profile.phoneDisplay, href: `tel:${profile.phone}` },
    { icon: <Mail className="size-5" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <MessageCircle className="size-5" />, label: "WhatsApp", value: "Message on WhatsApp", href: `https://wa.me/${profile.whatsapp}` },
    { icon: <LinkedInIcon className="size-5" />, label: "LinkedIn", value: "nikki-mamanduri", href: profile.linkedin },
    { icon: <MapPin className="size-5" />, label: "Location", value: profile.location },
    { icon: <Clock className="size-5" />, label: "Timezone", value: profile.timezone },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" description="Send a message or book a time directly — whichever is easier." />
      <Container className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {items.map((it) => (
            <Card key={it.label} className="flex items-center gap-4 p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">{it.icon}</span>
              <div>
                <p className="text-xs text-muted-foreground">{it.label}</p>
                {it.href ? <a href={it.href} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">{it.value}</a> : <p className="font-medium">{it.value}</p>}
              </div>
            </Card>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="/contact.vcf" download="nikki-mamanduri.vcf" className="flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
              <ContactRound className="size-4" /> Save contact
            </a>
            <Link href="/book" className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground">
              <CalendarCheck className="size-4" /> Book a call
            </Link>
          </div>
          <Card className="flex items-center gap-5 p-5">
            <img src="/images/nikki-qr.png" alt="QR code for Nikki's digital business card" className="size-24 rounded-lg bg-white p-1.5" />
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"><QrCode className="size-3.5" /> Scan to connect</p>
              <p className="mt-1 font-serif text-xl">Digital business card</p>
              <a href={profile.digitalCard} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">setly.net/nikki ↗</a>
            </div>
          </Card>
        </div>
        <ContactForm />
      </Container>
      <Container className="mt-20 max-w-3xl">
        <h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="p-5">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
