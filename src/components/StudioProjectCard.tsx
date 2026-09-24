import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import type { StudioLanguage } from "@/hooks/use-studio-language";
import { PROJECT_SUMMARIES } from "@/data/studio";

export function StudioProjectVisual({ project }: { project: Project }) {
  return (
    <div className="ss-project-visual">
      {project.image && <img src={project.image} alt={`${project.title.replaceAll("_", " ")} product interface`} />}
      <span className={`ss-status ss-status--${project.status.toLowerCase()}`}>{project.status}</span>
    </div>
  );
}

export default function StudioProjectCard({ project, language, featured = false }: { project: Project; language: StudioLanguage; featured?: boolean }) {
  return (
    <Link className={`ss-project-card ${featured ? "ss-project-card--featured" : ""}`} to={`/studio/projekte/${project.slug}`}>
      <StudioProjectVisual project={project} />
      <div className="ss-project-card__copy">
        <small>{project.category.replaceAll("_", " ")} / {project.year}</small>
        <h3>{project.title.replaceAll("_", " ")}</h3>
        <p>{PROJECT_SUMMARIES[project.slug]?.[language] ?? project.brief}</p>
        <strong>{language === "de" ? "Projekt ansehen" : "View project"}<ArrowRight size={16} /></strong>
      </div>
    </Link>
  );
}
