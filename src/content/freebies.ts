// Nikki's free guides (PDFs built by scripts/freebies/build.py into public/freebies).
export type Audience = "clinic" | "career";

export type Freebie = {
  slug: string;
  title: string;
  blurb: string;
  audience: Audience;
  pages: number;
};

export const audiences: Record<Audience, { label: string; short: string; description: string }> = {
  clinic: { label: "I run or manage a clinic", short: "For clinics", description: "Checklists, playbooks and templates to run a calmer, more profitable practice." },
  career: { label: "I'm building my healthcare career", short: "For your career", description: "Roadmaps and templates for students and early-career professionals." },
};

export const freebies: Freebie[] = [
  { slug: "clinic-front-desk-fix", title: "The Clinic Front-Desk Fix", blurb: "A 25-point checklist to cut no-shows and claim denials, plus 6 KPIs and a 30-day plan.", audience: "clinic", pages: 6 },
  { slug: "prior-auth-denial-playbook", title: "Prior Auth & Claim Denial Playbook", blurb: "A six-stage workflow, a denial prevention table, a tracker and appeal templates.", audience: "clinic", pages: 5 },
  { slug: "patient-experience-scorecard", title: "Patient Experience Audit Scorecard", blurb: "Score six patient touchpoints and turn the lowest scores into an action plan.", audience: "clinic", pages: 5 },
  { slug: "clinic-sop-starter-pack", title: "The Clinic SOP Starter Pack", blurb: "A one-page SOP format plus intake, scheduling, daily huddle and escalation templates.", audience: "clinic", pages: 5 },
  { slug: "international-student-career-roadmap", title: "From International Student to Healthcare Operations", blurb: "Nikki's roadmap for before, during and after your MHA — and the job search.", audience: "career", pages: 5 },
  { slug: "healthcare-admin-resume-kit", title: "Healthcare Admin Resume & LinkedIn Kit", blurb: "A bullet formula with real examples, keywords, a LinkedIn checklist and message templates.", audience: "career", pages: 5 },
];

export const freebieFile = (slug: string) => `/freebies/${slug}.pdf`;
export const freebieCover = (slug: string) => `/freebies/covers/${slug}.png`;
