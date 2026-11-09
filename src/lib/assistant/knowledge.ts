// Everything the site assistant knows about Nikki, built from the same content the
// site renders (src/content). Used for the AI system prompt and the offline fallback.
import {
  certifications,
  education,
  experience,
  languages,
  posts,
  profile,
  projects,
  services,
  sessionTypes,
  skillGroups,
  volunteering,
} from "@/content/profile";

export const ASSISTANT_NAME = "Nikki's assistant";

export function buildInstructions() {
  const exp = experience
    .map((e) => `- ${e.role}, ${e.company} (${e.start} – ${e.end}, ${e.location}): ${e.summary} Highlights: ${e.highlights.join(" ")}`)
    .join("\n");
  const edu = education.map((e) => `- ${e.degree}, ${e.school} (${e.start}–${e.end}). ${e.note}`).join("\n");
  const work = projects
    .map((p) => `- [${p.slug}] ${p.title} (${p.category}, ${p.year}): ${p.summary} Result: ${p.result} Metrics: ${p.metrics.map((m) => `${m.value} ${m.label}`).join("; ")}`)
    .join("\n");
  const recent = posts
    .filter((p) => p.source === "linkedin")
    .slice(0, 12)
    .map((p) => `- ${p.title} (/blog/${p.slug})`)
    .join("\n");

  return `You are ${ASSISTANT_NAME}, a friendly, upbeat chat assistant on the personal website of ${profile.legalName} ("${profile.name}"), ${profile.headline}, ${profile.credentials}, based in ${profile.location}.

Your job: help visitors (recruiters, clinic owners, students, collaborators) learn about Nikki and take the next step — book a call, save her contact, read a case study, or reach her directly.

Style:
- Warm, confident and concise: 1–3 short sentences, or up to 4 short bullets. Plain text, no markdown headings or tables. You may use **bold** sparingly.
- Speak about Nikki in the third person ("Nikki led…"). You are her assistant, not Nikki.
- End most answers with a short, helpful next step or question.
- Only use the facts below. If you don't know, say so and offer to connect them with Nikki (use connectWithNikki). Never invent numbers, clients, prices or availability.
- Don't give medical, legal or financial advice. Politely steer off-topic requests back to Nikki's work.

Tools — use them whenever they fit, the website shows them as interactive cards:
- showBookingOptions: whenever someone wants to book, meet, talk, schedule, get mentoring or a consultation.
- showContactCard: when someone asks how to contact her, for her email/phone/LinkedIn, or to save her contact.
- showCaseStudy: when discussing a specific project; pass its slug.
- connectWithNikki: when someone wants a real person, a live chat, has a question you can't answer, or a hiring/partnership enquiry.
After a tool call, add one short sentence; don't repeat what the card shows.

FACTS
About: ${profile.about.join(" ")}
Tagline: ${profile.tagline}
Highlights: ${profile.stats.map((s) => `${s.value} — ${s.label}`).join("; ")}

Experience:
${exp}

Education:
${edu}

Certifications: ${certifications.map((c) => `${c.name} (${c.issuer}, ${c.year})`).join("; ")}
Skills: ${skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join(" | ")}
Languages: ${languages.join(", ")}
Volunteering: ${volunteering.map((v) => `${v.role}, ${v.org} (${v.period})`).join("; ")}
Recognition: Influential Women feature as Operations Manager at Medi-Weightloss; her Thousand Oaks clinic ranked #1 in average weight loss per patient (August performance report); SOHA won UNH Graduate Club of the Year while she was Director of Community Relations.

Case studies:
${work}

How she can help (services): ${services.map((s) => `${s.title} — ${s.summary} (${s.price})`).join("; ")}
Bookable sessions: ${sessionTypes.map((s) => `${s.title}, ${s.minutes} min, ${s.price}: ${s.description}`).join("; ")}

Recent LinkedIn posts:
${recent}

Free guides (PDF, free with email, at /resources): for clinics — The Clinic Front-Desk Fix (25-point checklist), Prior Auth & Claim Denial Playbook, Patient Experience Audit Scorecard, Clinic SOP Starter Pack; for careers — From International Student to Healthcare Operations (roadmap), Healthcare Admin Resume & LinkedIn Kit. Point people to /resources when relevant.

Site pages: /about, /experience, /work, /services, /book, /blog, /gallery, /resources, /contact.`;
}

// ---------------------------------------------------------------- Offline fallback
// Used when no AI key is configured: keyword intents with real answers + cards.
export type FallbackCard =
  | { tool: "showBookingOptions"; input: Record<string, never> }
  | { tool: "showContactCard"; input: Record<string, never> }
  | { tool: "showCaseStudy"; input: { slug: string } }
  | { tool: "connectWithNikki"; input: { topic?: string } };

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

export function fallbackAnswer(raw: string): { text: string; cards: FallbackCard[] } {
  const q = raw.toLowerCase();
  const current = experience[0];

  if (has(q, ["free guide", "guide", "checklist", "resource", "download", "template", "pdf", "playbook", "resume tip", "roadmap"])) {
    return { text: "Nikki has 6 free guides: for clinics, the Front-Desk Fix checklist, a Prior Auth & Denial Playbook, a Patient Experience Scorecard and an SOP Starter Pack; for careers, an International Student roadmap and a Resume & LinkedIn Kit. Grab any of them at /resources", cards: [] };
  }
  if (has(q, ["book", "call", "meet", "schedule", "appointment", "session", "consult", "mentor"])) {
    return { text: "Happy to set that up! Pick the session that fits — the intro call and mentoring chat are free.", cards: [{ tool: "showBookingOptions", input: {} }] };
  }
  if (has(q, ["human", "real person", "live", "talk to nikki", "speak", "hire", "hiring", "job", "role", "opportunit", "partner", "collab"])) {
    return { text: "I'll get you straight to Nikki — choose whichever is easiest for you.", cards: [{ tool: "connectWithNikki", input: { topic: raw.slice(0, 80) } }] };
  }
  if (has(q, ["contact", "email", "phone", "number", "reach", "linkedin", "save", "whatsapp"])) {
    return { text: "Here's how to reach Nikki — you can also save her contact straight to your phone.", cards: [{ tool: "showContactCard", input: {} }] };
  }
  if (has(q, ["tufts", "revenue", "scheduling", "claim", "denial"])) {
    return { text: "At Tufts Medicine, Nikki tightened scheduling, prior-auth and billing workflows — throughput rose 25% and claim denials fell 20%.", cards: [{ tool: "showCaseStudy", input: { slug: "tufts-scheduling-revenue" } }] };
  }
  if (has(q, ["renal", "dialysis", "catheter", "vascular"])) {
    return { text: "At U.S. Renal Care, her patient-education work cut catheter use from 24% to 10% and missed treatments by 18.9%.", cards: [{ tool: "showCaseStudy", input: { slug: "renal-access-education" } }] };
  }
  if (has(q, ["gaylord", "feasibility", "internship"])) {
    return { text: "For Gaylord Specialty Healthcare, Nikki led an MHA internship feasibility study for a new outpatient visit unit.", cards: [{ tool: "showCaseStudy", input: { slug: "gaylord-feasibility-study" } }] };
  }
  if (has(q, ["soha", "club", "student", "community", "kickoff"])) {
    return { text: "As SOHA's Director of Community Relations at the University of New Haven, Nikki connected MHA students with alumni and leaders — the club won Graduate Club of the Year.", cards: [{ tool: "showCaseStudy", input: { slug: "soha-spring-kickoff" } }] };
  }
  if (has(q, ["work", "project", "case stud", "portfolio", "result", "impact", "achiev"])) {
    return { text: "A few highlights: 25% higher throughput and 20% fewer claim denials at Tufts Medicine, and catheter use cut from 24% to 10% at U.S. Renal Care. Here's the Tufts story:", cards: [{ tool: "showCaseStudy", input: { slug: "tufts-scheduling-revenue" } }] };
  }
  if (has(q, ["educat", "degree", "mha", "study", "studied", "school", "university", "gpa", "capm", "certif"])) {
    return { text: `Nikki holds an MHA from the University of New Haven (3.79 GPA), a B.Tech in Biotechnology from Lovely Professional University, and is a PMI Certified Associate in Project Management (CAPM). She also completed an OSHA healthcare compliance course in 2026.`, cards: [] };
  }
  if (has(q, ["experience", "career", "background", "current", "now", "job history", "where does she"])) {
    return { text: `Nikki is currently ${current.role} at ${current.company}. Before that: Lead Admin Coordinator at Tufts Medicine, Administrative Assistant at U.S. Renal Care, Graduate Assistant at the University of New Haven, and Product Executive at Relisys Medical Devices — 6+ years in healthcare.`, cards: [] };
  }
  if (has(q, ["skill", "epic", "tool", "software", "good at", "strength", "ai"])) {
    return { text: "Her strengths: operational strategy, workflow design and SOPs, revenue cycle, HIPAA/OSHA compliance, and healthcare IT (Epic, Meditech, Kronos, Tableau, SQL) — plus AI-enabled operations and team leadership.", cards: [] };
  }
  if (has(q, ["service", "help", "offer", "price", "cost", "fee", "rate"])) {
    return { text: "Nikki can help with clinic operations support, healthcare project coordination, and MHA & career mentoring (free). Want to book a quick intro?", cards: [{ tool: "showBookingOptions", input: {} }] };
  }
  if (has(q, ["award", "recogni", "honou", "influential", "#1", "rank"])) {
    return { text: "Recent recognition: featured by Influential Women as an Operations Manager, her Thousand Oaks clinic ranked #1 in average weight loss per patient, and SOHA won UNH Graduate Club of the Year.", cards: [] };
  }
  if (has(q, ["language", "speak", "telugu", "hindi"])) {
    return { text: `Nikki speaks ${languages.join(", ")}.`, cards: [] };
  }
  if (has(q, ["where", "location", "based", "live", "city"])) {
    return { text: `Nikki is based in ${profile.location} and works with teams remotely too.`, cards: [] };
  }
  if (has(q, ["who", "about", "what does", "tell me", "introduc"])) {
    return { text: `${profile.name} is a ${profile.headline} (${profile.credentials}) in ${profile.location}. She builds better systems so care teams are stronger and every patient has a better experience — currently leading operations at Medi-Weightloss.`, cards: [] };
  }
  if (has(q, ["hi", "hello", "hey", "namaste", "good morning", "good evening"])) {
    return { text: "Hi there! 👋 I can tell you about Nikki's experience and work, book a call, or connect you with her directly. What would you like?", cards: [] };
  }
  if (has(q, ["thank", "thx", "great", "awesome"])) {
    return { text: "You're welcome! Anything else I can help with?", cards: [] };
  }
  return {
    text: "Good question — I'm not sure I can answer that one, but Nikki can. Want me to connect you, or ask about her experience, work or booking a call?",
    cards: [{ tool: "connectWithNikki", input: { topic: raw.slice(0, 80) } }],
  };
}
