import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-gradient-to-br", project.gradient)}>
        {project.image ? (
          <img src={project.image} alt="" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="bg-grid absolute inset-0 opacity-40" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-black transition group-hover:rotate-45">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
      </div>
    </Link>
  );
}
