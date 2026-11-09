import type { Metadata } from "next";
import { audiences, freebies, type Audience } from "@/content/freebies";
import { Container, PageHeader } from "@/components/ui";
import { ResourceCard } from "@/components/freebies/resource-card";

export const metadata: Metadata = {
  title: "Free guides",
  description: "Free checklists, playbooks and career guides from Nikki Mamanduri, Healthcare Operations Manager (MHA, CAPM).",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free resources"
        title="Free guides for clinics and careers"
        description="Six practical guides from Nikki's work in healthcare operations — checklists, playbooks, templates and roadmaps. Free and instant."
      />
      {(Object.keys(audiences) as Audience[]).map((a) => (
        <Container key={a} className="mt-16">
          <p className="font-mono text-xs tracking-wider text-coral">{audiences[a].short.toUpperCase()}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">{audiences[a].label}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{audiences[a].description}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {freebies
              .filter((f) => f.audience === a)
              .map((f, i) => (
                <ResourceCard key={f.slug} guide={f} index={i} />
              ))}
          </div>
        </Container>
      ))}
    </>
  );
}
