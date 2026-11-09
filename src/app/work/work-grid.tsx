"use client";

import { useState } from "react";
import { projects } from "@/content/profile";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition",
              active === c ? "border-accent bg-accent text-accent-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </>
  );
}
