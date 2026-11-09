/**
 * Single source of truth for every page on the site.
 *
 * Everything marked `SAMPLE` is placeholder copy: LinkedIn could not be read
 * from the build environment. Replace it with the data from the LinkedIn
 * "Save to PDF" export or the full data export (Settings → Data privacy →
 * Get a copy of your data), and drop the profile photo at
 * /public/images/profile.jpg.
 */

export const profile = {
  name: "Nikhila Mamanduri",
  shortName: "Nikki",
  initials: "NM",
  // SAMPLE — replace with the LinkedIn headline
  headline: "Professional headline from LinkedIn",
  // SAMPLE — one-line value proposition for the hero
  tagline:
    "I help teams turn ideas into results. Let's talk about what you're building.",
  location: "Location",
  timezone: "Asia/Kolkata",
  email: "hello@example.com", // SAMPLE
  linkedin: "https://www.linkedin.com/in/nikki-mamanduri",
  whatsapp: "", // e.g. "919999999999" — leave empty to hide the button
  photo: "/images/profile.svg", // replace with /images/profile.jpg
  resumePdf: "", // e.g. "/Nikhila-Mamanduri-Resume.pdf"
  // SAMPLE — LinkedIn "About" section, one paragraph per entry
  about: [
    "This is where the LinkedIn About section goes. Tell visitors who you are, what you care about, and the kind of problems you love to solve.",
    "Use a second paragraph for how you work: your approach, the teams you've been part of, and what people can expect when they work with you.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years of experience" }, // SAMPLE
    { value: 20, suffix: "+", label: "Projects delivered" }, // SAMPLE
    { value: 10, suffix: "+", label: "Happy clients" }, // SAMPLE
    { value: 3, suffix: "", label: "Certifications" }, // SAMPLE
  ],
  values: [
    { title: "Clarity first", text: "Simple plans, clear updates, no surprises." },
    { title: "Outcome driven", text: "Every task ties back to a measurable result." },
    { title: "Kind & candid", text: "Honest feedback delivered with care." },
  ],
};

export type Experience = {
  role: string;
  company: string;
  type?: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
};

// SAMPLE — replace with every LinkedIn Experience entry, newest first
export const experience: Experience[] = [
  {
    role: "Current Role",
    company: "Company Name",
    type: "Full-time",
    start: "2023",
    end: "Present",
    location: "City, Country",
    summary: "One-line description of the role and team.",
    highlights: [
      "Key achievement with a number (e.g. improved X by 30%).",
      "Project you led and its impact.",
      "Something you built, launched or improved.",
    ],
    skills: ["Skill A", "Skill B", "Skill C"],
  },
  {
    role: "Previous Role",
    company: "Company Name",
    type: "Full-time",
    start: "2021",
    end: "2023",
    location: "City, Country",
    summary: "One-line description of the role and team.",
    highlights: [
      "Key achievement with a number.",
      "Cross-team initiative you were part of.",
    ],
    skills: ["Skill B", "Skill D"],
  },
  {
    role: "First Role / Internship",
    company: "Company Name",
    type: "Internship",
    start: "2020",
    end: "2021",
    location: "City, Country",
    summary: "Where it all started.",
    highlights: ["What you learned and delivered."],
    skills: ["Skill A"],
  },
];

// SAMPLE — replace with LinkedIn Education
export const education = [
  {
    school: "University Name",
    degree: "Degree, Field of study",
    start: "2016",
    end: "2020",
    note: "Activities, societies or honours.",
  },
];

// SAMPLE — replace with LinkedIn Skills (grouped)
export const skillGroups = [
  { title: "Core skills", items: ["Skill A", "Skill B", "Skill C", "Skill D"] },
  { title: "Tools", items: ["Tool A", "Tool B", "Tool C"] },
  { title: "Soft skills", items: ["Communication", "Leadership", "Problem solving"] },
];

// SAMPLE — replace with LinkedIn Licenses & certifications
export const certifications = [
  { name: "Certification Name", issuer: "Issuer", year: "2024", url: "" },
  { name: "Certification Name", issuer: "Issuer", year: "2023", url: "" },
];

export const languages = ["English", "Telugu", "Hindi"]; // SAMPLE

export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
  price: string;
  sessionId: string;
};

// SAMPLE — what Nikki offers; each card links into the booking flow
export const services: Service[] = [
  {
    slug: "consulting",
    title: "1:1 Consulting",
    summary: "A focused session to unblock a problem, review a plan or get a second opinion.",
    deliverables: ["60-minute video call", "Written summary & next steps", "Follow-up by email"],
    price: "On request",
    sessionId: "deep-dive",
  },
  {
    slug: "projects",
    title: "Project Engagements",
    summary: "Hands-on help to plan, build and ship a project end to end.",
    deliverables: ["Scoping workshop", "Weekly progress check-ins", "Final handover"],
    price: "Custom quote",
    sessionId: "intro",
  },
  {
    slug: "mentoring",
    title: "Mentoring",
    summary: "Career guidance, interview prep and portfolio reviews for people starting out.",
    deliverables: ["Monthly sessions", "Resume & LinkedIn review", "Goal tracking"],
    price: "On request",
    sessionId: "consult",
  },
];

export type SessionType = {
  id: string;
  title: string;
  minutes: number;
  description: string;
  price: string;
};

export const sessionTypes: SessionType[] = [
  { id: "intro", title: "Intro call", minutes: 15, description: "Say hello and see if we're a fit.", price: "Free" },
  { id: "consult", title: "Consultation", minutes: 30, description: "Talk through a specific question or idea.", price: "Free" },
  { id: "deep-dive", title: "Deep dive", minutes: 60, description: "A working session on your project or career.", price: "On request" },
];

/** Weekly availability in the profile timezone (24h clock). */
export const availability = {
  days: [1, 2, 3, 4, 5], // Mon–Fri
  startHour: 10,
  endHour: 18,
  bookAheadDays: 30,
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  metrics: { value: string; label: string }[];
  tools: string[];
  gradient: string;
};

// SAMPLE — replace with LinkedIn Projects / Featured
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "Strategy",
    year: "2025",
    summary: "Short description of the project and why it mattered.",
    problem: "What problem did the team or client have?",
    approach: "What did you do, and how?",
    result: "What changed because of it?",
    metrics: [
      { value: "30%", label: "Metric improved" },
      { value: "3 mo", label: "Delivered in" },
    ],
    tools: ["Tool A", "Tool B"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Delivery",
    year: "2024",
    summary: "Short description of the project and why it mattered.",
    problem: "What problem did the team or client have?",
    approach: "What did you do, and how?",
    result: "What changed because of it?",
    metrics: [
      { value: "2x", label: "Faster" },
      { value: "100+", label: "Users" },
    ],
    tools: ["Tool C"],
    gradient: "from-sky-500 via-cyan-500 to-emerald-500",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Research",
    year: "2023",
    summary: "Short description of the project and why it mattered.",
    problem: "What problem did the team or client have?",
    approach: "What did you do, and how?",
    result: "What changed because of it?",
    metrics: [{ value: "5", label: "Teams involved" }],
    tools: ["Tool A", "Tool D"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
];

// SAMPLE — replace with LinkedIn Recommendations
export const testimonials = [
  { quote: "Paste a LinkedIn recommendation here. Keep it to two or three sentences.", name: "Colleague Name", role: "Title, Company" },
  { quote: "Another recommendation that shows how Nikki works with people.", name: "Manager Name", role: "Title, Company" },
  { quote: "A client quote about results delivered.", name: "Client Name", role: "Title, Company" },
  { quote: "A mentee or teammate on what they learned.", name: "Teammate Name", role: "Title, Company" },
];

export type Post = { slug: string; title: string; date: string; excerpt: string; body: string[] };

// SAMPLE — LinkedIn posts / articles reposted as long-form
export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Why I built this site",
    date: "2026-11-09",
    excerpt: "A short note on what you'll find here and how to work with me.",
    body: [
      "Replace this with a real article or a LinkedIn post expanded into long form.",
      "Each post gets its own page, so it can be shared on LinkedIn with a proper preview.",
    ],
  },
];

export const faqs = [
  { q: "How do I book a session?", a: "Pick a session on the Book page, choose a time that suits you, and you'll get a confirmation by email." },
  { q: "Which timezone are slots in?", a: "Slots are shown in your own timezone automatically." },
  { q: "Can we meet in person?", a: "Most sessions are on video. Reach out via the contact form for in-person requests." },
];
