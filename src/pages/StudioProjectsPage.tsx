import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import StudioProjectCard from "@/components/StudioProjectCard";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import "@/studio-site.css";

type Filter = "ALL" | Project["status"];

const copy = {
  de: {
    eyebrow: "Gesamtes Projektportfolio",
    title: "Gebaut, getestet, gelernt.",
    intro: "Eigene Produkte, Prototypen und Experimente – vollständig gezeigt und klar nach Status bezeichnet. Nicht jeder Build ist ein Kundenprojekt. Jeder Build ist ein dokumentierter Realitätscheck.",
    legend: "STATUS IST TEIL DER GESCHICHTE",
    live: "LIVE ist öffentlich nutzbar. BETA wird aktiv erprobt. ARCHIVED bleibt als dokumentierter Lernschritt sichtbar.",
    count: "Projekte sichtbar",
    ctaLabel: "Ein Portfolio ist kein Selbstzweck.",
    ctaTitle: "Welches dieser Prinzipien könnte Ihre Arbeit voranbringen?",
    cta: "Über ein Vorhaben sprechen",
  },
  en: {
    eyebrow: "Complete project portfolio",
    title: "Built, tested, learned from.",
    intro: "Products, prototypes and experiments of our own — shown in full and labelled clearly by status. Not every build is a client project. Every build is a documented reality check.",
    legend: "STATUS IS PART OF THE STORY",
    live: "LIVE is publicly usable. BETA is actively being tested. ARCHIVED remains visible as a documented learning step.",
    count: "projects visible",
    ctaLabel: "A portfolio is not an end in itself.",
    ctaTitle: "Which of these principles could move your work forward?",
    cta: "Discuss a project",
  },
} as const;

export default function StudioProjectsPage() {
  const { language, setLanguage } = useStudioLanguage();
  const [filter, setFilter] = useState<Filter>("ALL");
  const t = copy[language];
  const visibleProjects = filter === "ALL" ? PROJECTS : PROJECTS.filter((project) => project.status === filter);

  return (
    <div className="ss-site">
      <Helmet><title>{language === "de" ? "Projekte" : "Projects"} — ShapeNeural</title><meta name="description" content={t.intro} /></Helmet>
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main>
        <section className="ss-page-hero ss-page-hero--projects"><p className="ss-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><div className="ss-project-legend"><strong>{t.legend}</strong><span>{t.live}</span></div></section>
        <section className="ss-portfolio ss-section">
          <header><div className="ss-filters">{(["ALL", "LIVE", "BETA", "ARCHIVED"] as Filter[]).map((item) => <button type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><p><strong>{visibleProjects.length}</strong> {t.count}</p></header>
          <div className="ss-portfolio__grid">{visibleProjects.map((project, index) => <StudioProjectCard featured={filter === "ALL" && index === 0} project={project} language={language} key={project.slug} />)}</div>
        </section>
        <section className="ss-final-cta ss-section"><p className="ss-eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><a className="ss-button ss-button--dark" href="mailto:signal@shapeneural.com?subject=Projektanfrage">{t.cta}<ArrowRight size={18} /></a></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
