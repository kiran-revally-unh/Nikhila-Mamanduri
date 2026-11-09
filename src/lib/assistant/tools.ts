// Tools the assistant can call. Each returns plain data the chat widget renders as
// an interactive card (tool parts arrive on the client as `tool-<name>`).
import { tool } from "ai";
import { z } from "zod";
import { profile, projects, sessionTypes } from "@/content/profile";

export function bookingOptions() {
  return { sessions: sessionTypes.map((s) => ({ id: s.id, title: s.title, minutes: s.minutes, price: s.price, description: s.description })) };
}

export function contactCard() {
  return {
    name: profile.legalName,
    role: `${profile.headline} · ${profile.credentials}`,
    email: profile.email,
    phone: profile.phoneDisplay,
    tel: profile.phone,
    linkedin: profile.linkedin,
    whatsapp: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : null,
    vcard: "/contact.vcf",
  };
}

export function caseStudy(slug: string) {
  const p = projects.find((x) => x.slug === slug) ?? projects[0];
  return { slug: p.slug, title: p.title, category: p.category, year: p.year, summary: p.summary, metrics: p.metrics.slice(0, 2), image: p.image ?? null };
}

export function handoff(topic?: string) {
  const text = `Hi Nikki! I found you through your website${topic ? ` — ${topic}` : ""}.`;
  return {
    whatsapp: profile.whatsapp ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}` : null,
    email: `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your website")}&body=${encodeURIComponent(text)}`,
    book: "/book",
    linkedin: profile.linkedin,
  };
}

export const assistantTools = {
  showBookingOptions: tool({
    description: "Show bookable session options (intro call, mentoring chat, working session) as a card.",
    inputSchema: z.object({}),
    execute: async () => bookingOptions(),
  }),
  showContactCard: tool({
    description: "Show Nikki's contact card: email, phone, LinkedIn, WhatsApp and a save-to-phone button.",
    inputSchema: z.object({}),
    execute: async () => contactCard(),
  }),
  showCaseStudy: tool({
    description: "Show a case study card for one of Nikki's projects.",
    inputSchema: z.object({
      slug: z.enum(projects.map((p) => p.slug) as [string, ...string[]]).describe("Project slug"),
    }),
    execute: async ({ slug }) => caseStudy(slug),
  }),
  connectWithNikki: tool({
    description: "Offer ways to reach Nikki personally (WhatsApp, email, book a call) — for live/human requests or questions you can't answer.",
    inputSchema: z.object({ topic: z.string().max(120).optional().describe("Short summary of what the visitor wants") }),
    execute: async ({ topic }) => handoff(topic),
  }),
};
