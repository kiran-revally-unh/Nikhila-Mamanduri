// Home — "Bold colour" design: name-behind-portrait hero, scroll-lit statement,
// colour-block stats, career log, honours rail, LinkedIn block and booking card.
import { experience, postDate, posts, profile, projects, sessionTypes } from "@/content/profile";
import {
  BoldHero,
  BookingCard,
  CareerLog,
  FeaturedWork,
  FreshLinkedIn,
  HonoursRail,
  PhotoWall,
  SaveContact,
  StatBlocks,
  Statement,
  type FreshPost,
  type Honour,
  type WallPhoto,
  type WorkCard,
} from "@/components/home/bold-home";

const orgs = ["Medi-Weightloss", "Tufts Medicine", "U.S. Renal Care", "University of New Haven", "Relisys Medical Devices"];

const stats = [
  { value: "6+", label: "years in healthcare" },
  { value: "3.79", label: "MHA GPA" },
  { value: "CAPM", label: "certified" },
  { value: "20%", label: "fewer claim denials" },
];

// LinkedIn posts behind each honour (title/caption written from the post).
const honourPosts: { slug: string; title: string; caption: string }[] = [
  { slug: "i-m-grateful-to-be-recognized-by", title: "Influential Women", caption: "Recognized as an Operations Manager" },
  { slug: "thousand-oaks-ranked-1-in-average-weight", title: "#1 clinic", caption: "Average weight loss per patient, Thousand Oaks" },
  { slug: "we-bagged-the-unh-graduate-club-of", title: "Graduate Club of the Year", caption: "SOHA, University of New Haven" },
  { slug: "a-few-weeks-ago-i-was-recognized", title: "Exceptional student", caption: "Healthcare Administration, University of New Haven" },
  { slug: "thrilled-to-announce-my-graduation-from-the", title: "MHA graduate", caption: "University of New Haven, 3.79 GPA" },
];

// Case studies in the order they appear on the home page.
const workOrder = ["tufts-scheduling-revenue", "renal-access-education", "gaylord-feasibility-study", "soha-spring-kickoff"];

// LinkedIn posts whose photos make up the photo wall (events, graduation, ACHE, the clinic).
const wallSlugs = [
  "a-wonderful-day-connecting-with-our-local",
  "thrilled-to-announce-my-graduation-from-the",
  "i-am-thrilled-to-share-my-recent",
  "thousand-oaks-ranked-1-in-average-weight",
  "it-s-incredibly-special-to-see-pawspitality",
  "we-bagged-the-unh-graduate-club-of",
  "i-m-excited-to-share-that-medi",
  "this-week-was-a-reminder-of-what",
  "hyderabad-gets-another-tricvalve-implant",
  "interacting-with-the-incoming-mha-and-mph",
  "today-marks-a-milestone-as-the-society",
  "4-months-in-and-i-m-still",
];

export default function Home() {
  const current = experience[0];

  const honours: Honour[] = honourPosts.flatMap((h) => {
    const p = posts.find((x) => x.slug === h.slug);
    return p?.images?.[0] ? [{ title: h.title, caption: h.caption, image: p.images[0], href: `/blog/${p.slug}` }] : [];
  });

  const fresh: FreshPost[] = posts
    .filter((p) => p.source === "linkedin" && p.images?.length)
    .slice(0, 3)
    .map((p) => ({ title: p.title, date: postDate(p), image: p.images![0], href: `/blog/${p.slug}` }));

  const work: WorkCard[] = workOrder.flatMap((slug) => {
    const p = projects.find((x) => x.slug === slug);
    return p ? [{ slug: p.slug, title: p.title, category: p.category, year: p.year, summary: p.summary, metrics: p.metrics, image: p.image }] : [];
  });

  const wall: WallPhoto[] = wallSlugs.flatMap((slug) => {
    const p = posts.find((x) => x.slug === slug);
    return p?.images?.[0] ? [{ image: p.images[0], href: `/blog/${p.slug}`, title: p.title }] : [];
  });

  const career = experience.map((e) => ({ role: e.role, company: e.company, period: `${e.start} – ${e.end}` }));

  return (
    <>
      <BoldHero role={current.role} company={current.company} orgs={orgs} />
      <Statement />
      <StatBlocks stats={stats} />
      <CareerLog items={career} />
      <FeaturedWork items={work} />
      <HonoursRail items={honours} />
      <FreshLinkedIn posts={fresh} profileUrl={profile.linkedin} />
      <PhotoWall photos={wall} />
      <BookingCard sessions={sessionTypes.map((s) => ({ title: s.title, minutes: s.minutes }))} />
      <SaveContact
        name={profile.legalName}
        role={`${current.role} · ${profile.credentials}`}
        phone={profile.phoneDisplay}
        email={profile.email}
        cardUrl={profile.digitalCard}
      />
    </>
  );
}
