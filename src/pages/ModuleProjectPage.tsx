import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, ExternalLink, Languages, Mail } from "lucide-react";
import BindruneLogo from "@/components/BindruneLogo";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import { findProjectBySlug, PROJECTS } from "@/data/projects";
import { PROJECT_DETAILS, type ProjectMedia } from "@/data/project-details";
import "@/module-library.css";

function DeviceVisual({ media, alt }: { media: ProjectMedia; alt: string }) {
  if (media.device === "plain") {
    return <div className="mp-media-plain"><img src={media.src} alt={alt} /></div>;
  }

  return (
    <div className={`mp-device mp-device--${media.device}`}>
      {media.device === "laptop" && <div className="mp-device__top"><i /><i /><i /></div>}
      {media.device === "phone" && <i className="mp-device__speaker" />}
      <img src={media.src} alt={alt} />
      {media.device === "phone" && <i className="mp-device__home" />}
    </div>
  );
}

export default function ModuleProjectPage() {
  const { language, setLanguage } = useStudioLanguage();
  const location = useLocation();
  const { slug = "" } = useParams();
  const project = findProjectBySlug(slug);
  const detail = PROJECT_DETAILS[slug];
  const studioMode = location.pathname.startsWith("/studio/");
  const projectsBase = studioMode ? "/studio/projekte" : "/modules/projects";

  if (!project || !detail) return <Navigate to={studioMode ? "/studio/projekte" : "/modules"} replace />;

  const copy = detail.narrative[language];
  const projectIndex = PROJECTS.findIndex((item) => item.slug === slug);
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const contactSubject = encodeURIComponent(`${project.title.replaceAll("_", " ")} — Projektgespräch`);

  return (
    <div className={`mp-shell ${studioMode ? "mp-shell--studio" : ""}`}>
      <Helmet>
        <title>{project.title.replaceAll("_", " ")} — ShapeNeural Project</title>
        <meta name="description" content={copy.summary} />
      </Helmet>

      <header className="mp-header">
        <Link to={studioMode ? "/studio/projekte" : "/modules#module-10"}><ArrowLeft size={15} />{studioMode ? (language === "de" ? "Alle Projekte" : "All projects") : "Module Library"}</Link>
        <Link className="mp-header__brand" to={studioMode ? "/studio" : "/"}><BindruneLogo size={28} onDark /><span>SHAPENEURAL® / PROJECT SYSTEM</span></Link>
        <div className="mp-header__tools"><span>{project.id} / {project.status}</span><button type="button" onClick={() => setLanguage(language === "de" ? "en" : "de")}><Languages size={14} />{language.toUpperCase()}</button></div>
      </header>

      <main>
        <section className="mp-hero">
          <div className="mp-hero__copy">
            <p>{project.category.replaceAll("_", " ")} / {project.year}</p>
            <h1>{project.title.replaceAll("_", " ")}</h1>
            <blockquote>{copy.question}</blockquote>
          </div>
          <div className="mp-hero__visual">
            <DeviceVisual media={detail.media[0]} alt={`${project.title} — ${copy.mediaCaptions[0]}`} />
            <span>{project.status}</span>
          </div>
        </section>

        <section className="mp-facts" aria-label={language === "de" ? "Projektkennzahlen" : "Project facts"}>
          {copy.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </section>

        <section className="mp-overview">
          <div><small>01 / {language === "de" ? "KONTEXT" : "CONTEXT"}</small><h2>{copy.summary}</h2></div>
          <aside><span>COLLABORATION</span><strong>{project.collaboration}</strong><span>STATUS</span><strong>{project.status}</strong><span>YEAR</span><strong>{project.year}</strong></aside>
        </section>

        <section className="mp-challenge">
          <p><small>02 / {language === "de" ? "AUFGABE" : "CHALLENGE"}</small></p>
          <div><h2>{copy.challengeTitle}</h2><p>{copy.challengeBody}</p></div>
        </section>

        <section className="mp-system">
          <div className="mp-section-title"><small>03 / SYSTEM</small><h2>{copy.systemTitle}</h2></div>
          <div className="mp-capabilities">
            {copy.capabilities.map((capability, index) => <article key={capability.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{capability.title}</h3><p>{capability.body}</p></article>)}
          </div>
        </section>

        {detail.media.length > 1 && (
          <section className="mp-gallery">
            <header><small>04 / {language === "de" ? "PRODUKTANSICHTEN" : "PRODUCT VIEWS"}</small><h2>{language === "de" ? "Das System wird an echten Oberflächen sichtbar." : "The system becomes tangible through real product surfaces."}</h2></header>
            <div className="mp-gallery__grid">
              {detail.media.slice(1).map((media, index) => (
                <figure className={`mp-gallery__item mp-gallery__item--${media.device}`} key={`${media.src}-${index}`}>
                  <DeviceVisual media={media} alt={`${project.title} — ${copy.mediaCaptions[index + 1]}`} />
                  <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{copy.mediaCaptions[index + 1]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="mp-transfer">
          <header><small>05 / {language === "de" ? "ÜBERTRAGBARKEIT" : "TRANSFER"}</small><h2>{copy.transferTitle}</h2><p>{copy.transferIntro}</p></header>
          <div>{copy.transfers.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="mp-value">
          <div><small>06 / VALUE</small><h2>{copy.value}</h2></div>
          <div><small>07 / LEARNING</small><h2>{copy.learning}</h2></div>
        </section>

        <section className="mp-stack">
          <div className="mp-section-title"><small>08 / ARCHITECTURE</small><h2>{language === "de" ? "Gebaut mit einem nachvollziehbaren System." : "Built as an inspectable system."}</h2></div>
          <div>{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>

        <section className="mp-actions">
          <div className="mp-actions__primary">
            <a href={`mailto:signal@shapeneural.com?subject=${contactSubject}`}><Mail size={17} />{language === "de" ? "Über ein ähnliches System sprechen" : "Discuss a similar system"}</a>
            {project.url && <a href={project.url} target="_blank" rel="noreferrer">{language === "de" ? "Live-Projekt öffnen" : "Open live project"}<ExternalLink size={17} /></a>}
          </div>
          <Link to={`${projectsBase}/${next.slug}`}><span>{language === "de" ? "NÄCHSTES PROJEKT" : "NEXT PROJECT"}</span><strong>{next.title.replaceAll("_", " ")}</strong><ArrowRight /></Link>
        </section>
      </main>
    </div>
  );
}
