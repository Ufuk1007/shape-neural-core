import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Languages, Mail } from "lucide-react";
import BindruneLogo from "@/components/BindruneLogo";
import StudioMeta from "@/components/StudioMeta";
import NotFound from "@/pages/NotFound";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import { findProjectBySlug, PROJECTS } from "@/data/projects";
import { PROJECT_DETAILS, type ProjectMedia } from "@/data/project-details";
import "@/module-library.css";

const kindLabels = {
  de: { OWN_PRODUCT: "Eigenes Produkt", EXPERIMENT: "Experiment", PARTNER_PROJECT: "Partnerprojekt", CLIENT_PROJECT: "Kundenprojekt" },
  en: { OWN_PRODUCT: "Own product", EXPERIMENT: "Experiment", PARTNER_PROJECT: "Partner project", CLIENT_PROJECT: "Client project" },
} as const;

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
  const { slug = "" } = useParams();
  const project = findProjectBySlug(slug);
  const detail = PROJECT_DETAILS[slug];
  const projectsBase = "/studio/projekte";

  if (!project || !detail) return <NotFound />;

  const copy = detail.narrative[language];
  const projectIndex = PROJECTS.findIndex((item) => item.slug === slug);
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const sectionNumbers = copy.evidence
    ? { gallery: "07", transfer: "08", value: "09", learning: "10", architecture: "11" }
    : { gallery: "04", transfer: "05", value: "06", learning: "07", architecture: "08" };

  return (
    <div className="mp-shell mp-shell--studio">
      <StudioMeta
        title={`${project.title.replaceAll("_", " ")} — ShapeNeural Project`}
        description={copy.summary}
        path={`/studio/projekte/${project.slug}`}
        language={language}
        image={`/api/og-image?type=project&slug=${project.slug}`}
      />

      <header className="mp-header">
        <Link to="/studio/projekte"><ArrowLeft size={15} />{language === "de" ? "Alle Projekte" : "All projects"}</Link>
        <Link className="mp-header__brand" to="/"><BindruneLogo size={28} onDark /><span>SHAPENEURAL® / PROJECT SYSTEM</span></Link>
        <div className="mp-header__tools"><span>{project.id} / {project.status}</span><button type="button" onClick={() => setLanguage(language === "de" ? "en" : "de")}><Languages size={14} />{language.toUpperCase()}</button></div>
      </header>

      <main>
        <section className="mp-hero">
          <div className="mp-hero__copy">
            <p>{kindLabels[language][project.kind]} / {project.category.replaceAll("_", " ")} / {project.year}</p>
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
          <aside><span>{language === "de" ? "PROJEKTTYP" : "PROJECT TYPE"}</span><strong>{kindLabels[language][project.kind]}</strong><span>COLLABORATION</span><strong>{project.collaboration}</strong><span>STATUS</span><strong>{project.status}</strong><span>YEAR</span><strong>{project.year}</strong></aside>
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

        {copy.evidence ? (
          <section className="mp-evidence">
            <article><small>04 / BUILD</small><h2>{copy.evidence.builtTitle}</h2><p>{copy.evidence.builtBody}</p><ul>{copy.evidence.builtItems.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>
            <article><small>05 / VALIDATION</small><h2>{copy.evidence.validationTitle}</h2><p>{copy.evidence.validationBody}</p><ul>{copy.evidence.validationItems.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>
            <article><small>06 / USAGE</small><h2>{copy.evidence.usageTitle}</h2><p>{copy.evidence.usageBody}</p><ul>{copy.evidence.usageItems.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>
          </section>
        ) : null}

        {detail.media.length > 1 && (
          <section className="mp-gallery">
            <header><small>{sectionNumbers.gallery} / {language === "de" ? "PRODUKTANSICHTEN" : "PRODUCT VIEWS"}</small><h2>{language === "de" ? "Das System wird an echten Oberflächen sichtbar." : "The system becomes tangible through real product surfaces."}</h2></header>
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
          <header><small>{sectionNumbers.transfer} / {language === "de" ? "ÜBERTRAGBARKEIT" : "TRANSFER"}</small><h2>{copy.transferTitle}</h2><p>{copy.transferIntro}</p></header>
          <div>{copy.transfers.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="mp-value">
          <div><small>{sectionNumbers.value} / VALUE</small><h2>{copy.value}</h2></div>
          <div><small>{sectionNumbers.learning} / LEARNING</small><h2>{copy.learning}</h2></div>
        </section>

        <section className="mp-stack">
          <div className="mp-section-title"><small>{sectionNumbers.architecture} / ARCHITECTURE</small><h2>{language === "de" ? "Gebaut mit einem nachvollziehbaren System." : "Built as an inspectable system."}</h2></div>
          <div>{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>

        <section className="mp-actions">
          <div className="mp-actions__primary">
            <Link to={`/kontakt?offer=similar-system&project=${project.slug}`}><Mail size={17} />{language === "de" ? "Ähnliches System besprechen" : "Discuss a similar system"}</Link>
            {project.url && <a href={project.url} target="_blank" rel="noreferrer">{language === "de" ? "Live-Projekt öffnen" : "Open live project"}<ExternalLink size={17} /></a>}
          </div>
          <Link to={`${projectsBase}/${next.slug}`}><span>{language === "de" ? "NÄCHSTES PROJEKT" : "NEXT PROJECT"}</span><strong>{next.title.replaceAll("_", " ")}</strong><ArrowRight /></Link>
        </section>
      </main>
    </div>
  );
}
