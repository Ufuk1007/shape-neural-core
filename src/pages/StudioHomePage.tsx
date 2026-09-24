import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PROJECT_DETAILS } from "@/data/project-details";
import { STUDIO_OFFERS } from "@/data/studio";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import StudioProjectCard from "@/components/StudioProjectCard";
import BindruneLogo from "@/components/BindruneLogo";
import stageFriction from "@/assets/stage-friction.webp";
import stageClarity from "@/assets/stage-clarity.webp";
import stageSystem from "@/assets/stage-system.webp";
import workshopImage from "@/assets/module-workshop.webp";
import accountabilityImage from "@/assets/module-accountability.webp";
import "@/studio-site.css";

const HERO_FRAMES = [stageFriction, stageClarity, stageSystem];

const copy = {
  de: {
    meta: "Designed Intelligence · Unabhängiges KI-Produktstudio",
    hero: "Von Ihrer Arbeit zu einem KI-System, das wirklich hilft.",
    heroBody: "KI-Systeme, die Menschen bewegen – nicht nur Daten. ShapeNeural richtet KI praktisch ein, gestaltet Arbeitsabläufe neu und macht neue Produktideen testbar.",
    primary: "Passenden Einstieg finden",
    secondary: "Arbeit ansehen",
    definitionLabel: "Hello World",
    definition: "ShapeNeural ist ein unabhängiges Studio für angewandte KI. Wir verbessern bestehende Arbeit, gestalten Abläufe neu und machen neue Produktideen real testbar.",
    smallLabel: "Small by design",
    smallTitle: "Direkte Zusammenarbeit. Klar begrenzte Vorhaben. Etwas, das danach existiert.",
    smallBody: "Konzeption, Umsetzung und Betrieb bleiben in einem kleinen verantwortlichen Setup verbunden – unterstützt durch spezialisierte KI-Agenten.",
    pathLabel: "Drei Ausgangslagen",
    pathTitle: "Nicht jede KI-Frage braucht dasselbe Projekt.",
    explore: "Leistung vertiefen",
    materialLabel: "Nicht nur Beratung",
    materialTitle: "Was nach der Zusammenarbeit tatsächlich bleibt.",
    materialBody: "Kleine Unternehmen brauchen keine abstrakte Transformationserzählung. Sie brauchen ein einsatzbereites Setup, einen funktionierenden Workflow oder einen Prototyp, über den entschieden werden kann.",
    material: [
      ["AUGMENT", "AI Workspace", "Assistenten, Anweisungen, Wissensquellen und konkrete Use Cases"],
      ["TRANSFORM", "Working Workflow", "Blueprint, Automationen, Kontrollpunkte, Evaluation und Runbook"],
      ["CREATE", "Testable Product", "Produktkonzept, funktionaler Prototyp, Validierung und Roadmap"],
    ],
    proofLabel: "Produktbeispiel / von Analyse bis Veröffentlichung",
    proofTitle: "SAPIENTBLOCK zeigt, wie aus Daten ein durchgängiger KI-Arbeitsprozess wird.",
    proofBody: "Die Plattform analysiert Unternehmen, findet passende Anwendungen, entwickelt daraus neue Ideen und bereitet veröffentlichbare Inhalte vor. Für Kunden zeigt das Prinzip, wie sich Recherche, Bewertung und Produktion in einem nachvollziehbaren System verbinden lassen.",
    allProjects: "Gesamtes Portfolio ansehen",
    methodLabel: "Wie ShapeNeural arbeitet",
    methodTitle: "Ein wiederholbarer Weg – ohne Standardlösung zu spielen.",
    method: [
      ["01", "Understand", "Problem, Menschen, Werkzeuge und Grenzen sichtbar machen."],
      ["02", "Design", "Die kleinste sinnvolle Veränderung oder Lösung entwerfen."],
      ["03", "Implement", "Workspace, Workflow oder Prototyp tatsächlich aufbauen."],
      ["04", "Validate", "Qualität, Nutzen, Fehlerfälle und menschliche Eingriffe prüfen."],
      ["05", "Transfer", "Wissen, Dokumentation und Verantwortung sauber übergeben."],
    ],
    responsibilityLabel: "Human-led / agent-amplified",
    responsibilityTitle: "KI darf handeln. Verantwortung bleibt sichtbar.",
    responsibilityBody: "Agenten können recherchieren, produzieren und Routine übernehmen. Ziele, Freigaben, sensible Entscheidungen und die Verantwortung für das Ergebnis bleiben bei Menschen.",
    ctaLabel: "Klein anfangen. Substanziell weiterbauen.",
    ctaTitle: "Was soll durch KI besser werden?",
    cta: "Vorhaben besprechen",
  },
  en: {
    meta: "Designed Intelligence · Independent applied AI studio",
    hero: "From the way you work to an AI system that genuinely helps.",
    heroBody: "AI systems that move people, not just data. ShapeNeural configures AI for real use, redesigns workflows and makes new product ideas testable.",
    primary: "Find the right entry point",
    secondary: "Explore the work",
    definitionLabel: "Hello World",
    definition: "ShapeNeural is the independent applied AI studio that improves existing work, redesigns workflows and makes new ideas tangible enough to test.",
    smallLabel: "Small by design",
    smallTitle: "Direct collaboration. Bounded projects. Something that exists afterwards.",
    smallBody: "Concept, implementation and operations stay connected in one small accountable setup — supported by specialised AI agents.",
    pathLabel: "Three starting points",
    pathTitle: "Different AI questions require different engagements.",
    explore: "Explore service",
    materialLabel: "Beyond advice",
    materialTitle: "What actually remains after the work.",
    materialBody: "Small organisations do not need an abstract transformation story. They need a ready-to-use setup, a functioning workflow or a prototype that enables a real decision.",
    material: [
      ["AUGMENT", "AI Workspace", "Assistants, instructions, knowledge sources and concrete use cases"],
      ["TRANSFORM", "Working Workflow", "Blueprint, automations, checkpoints, evaluation and runbook"],
      ["CREATE", "Testable Product", "Product concept, functional prototype, validation and roadmap"],
    ],
    proofLabel: "Product example / from analysis to publishing",
    proofTitle: "SAPIENTBLOCK shows how data becomes an end-to-end AI workflow.",
    proofBody: "The platform analyses companies, finds relevant applications, develops new ideas and prepares publishable content. For clients, the principle demonstrates how research, evaluation and production can be connected in one inspectable system.",
    allProjects: "Explore the complete portfolio",
    methodLabel: "How ShapeNeural works",
    methodTitle: "A repeatable path — without pretending every problem is the same.",
    method: [
      ["01", "Understand", "Make the problem, people, tools and constraints visible."],
      ["02", "Design", "Shape the smallest meaningful change or solution."],
      ["03", "Implement", "Actually build the workspace, workflow or prototype."],
      ["04", "Validate", "Test quality, value, failure cases and human intervention."],
      ["05", "Transfer", "Hand over knowledge, documentation and accountability."],
    ],
    responsibilityLabel: "Human-led / agent-amplified",
    responsibilityTitle: "AI may act. Accountability stays visible.",
    responsibilityBody: "Agents can research, produce and handle routine. Intent, approvals, sensitive decisions and accountability for the outcome remain human.",
    ctaLabel: "Start small. Build something substantial.",
    ctaTitle: "What should AI make better?",
    cta: "Discuss a project",
  },
} as const;

export default function StudioHomePage() {
  const { language, setLanguage } = useStudioLanguage();
  const [frame, setFrame] = useState(0);
  const t = copy[language];
  const featured = PROJECTS.find((project) => project.slug === "sapientblock")!;
  const featuredMedia = PROJECT_DETAILS.sapientblock.media;
  const previewProjects = ["sapientshift", "problaim", "veniora"].map((slug) => PROJECTS.find((project) => project.slug === slug)!);

  useEffect(() => {
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % HERO_FRAMES.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ss-site">
      <Helmet><title>{language === "de" ? "ShapeNeural — KI-Produktstudio" : "ShapeNeural — Applied AI Studio"}</title><meta name="description" content={t.heroBody} /></Helmet>
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main>
        <section className="ss-hero">
          <div className="ss-hero__media">{HERO_FRAMES.map((image, index) => <img className={frame === index ? "is-active" : ""} src={image} alt="" key={image} />)}<div className="ss-hero__veil" /></div>
          <div className="ss-hero__content">
            <p className="ss-kicker"><i />{t.meta}</p>
            <h1>{t.hero}</h1>
            <div className="ss-hero__bottom"><p>{t.heroBody}</p><div><Link className="ss-button ss-button--lime" to="/studio/leistungen">{t.primary}<ArrowRight size={17} /></Link><Link className="ss-text-link" to="/studio/projekte">{t.secondary}<ArrowDown size={15} /></Link></div></div>
            <div className="ss-hero__signals"><span>01 / AUGMENT</span><span>02 / TRANSFORM</span><span>03 / CREATE</span></div>
          </div>
        </section>

        <section className="ss-definition ss-section">
          <p className="ss-eyebrow">{t.definitionLabel}</p><h2>{t.definition}</h2>
          <div className="ss-definition__path"><span>AUGMENT</span><ArrowRight /><span>TRANSFORM</span><ArrowRight /><span>CREATE</span></div>
        </section>

        <section className="ss-small ss-section">
          <img src={workshopImage} alt="Focused direct collaboration" />
          <div><p className="ss-eyebrow">{t.smallLabel}</p><h2>{t.smallTitle}</h2><p>{t.smallBody}</p><ul><li><Check />{language === "de" ? "Ein verantwortlicher Projektkern" : "One accountable project core"}</li><li><Check />{language === "de" ? "Klarer Umfang statt offener Programme" : "Clear scope rather than open programmes"}</li><li><Check />{language === "de" ? "Umsetzung statt Folienübergabe" : "Implementation rather than a deck handover"}</li></ul></div>
        </section>

        <section className="ss-paths ss-section">
          <header><p className="ss-eyebrow">{t.pathLabel}</p><h2>{t.pathTitle}</h2></header>
          <div className="ss-paths__grid">{STUDIO_OFFERS.map((offer) => <article key={offer.id}><span>{offer.number}</span><small>{offer.label}</small><h3>{offer.question[language]}</h3><p>{offer.promise[language]}</p><strong>{offer.outcome[language]}</strong><Link to={`/studio/leistungen#${offer.id}`}>{t.explore}<ArrowRight size={16} /></Link></article>)}</div>
        </section>

        <section className="ss-material ss-section">
          <div><p className="ss-eyebrow">{t.materialLabel}</p><h2>{t.materialTitle}</h2><p>{t.materialBody}</p></div>
          <div className="ss-material__stack">{t.material.map(([label, title, body], index) => <article key={label}><span>0{index + 1}</span><small>{label}</small><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="ss-proof ss-section">
          <div className="ss-proof__media">
            <div className="ss-device ss-device--laptop"><div className="ss-device__top"><i /><i /><i /></div>{featured.image && <img src={featured.image} alt="SAPIENTBLOCK analysis interface" />}</div>
            <div className="ss-proof__covers">{featuredMedia.filter((item) => item.device === "plain").map((item, index) => <img src={item.src} alt={language === "de" ? `SAPIENTBLOCK Use-Case-Motiv ${index + 1}` : `SAPIENTBLOCK use-case visual ${index + 1}`} key={item.src} />)}</div>
            <span>{language === "de" ? "SAPIENTBLOCK / GEBAUTES PRODUKT" : "SAPIENTBLOCK / BUILT PRODUCT"}</span>
          </div>
          <div className="ss-proof__copy"><p className="ss-eyebrow">{t.proofLabel}</p><h2>{t.proofTitle}</h2><p>{t.proofBody}</p><div className="ss-proof__features"><span>{language === "de" ? "Unternehmensanalyse" : "Company analysis"}</span><span>RAG Matching</span><span>{language === "de" ? "Ideengenerator" : "Idea generator"}</span><span>Content Operations</span><span>LLM Readability</span></div><blockquote>{language === "de" ? "Übertragbar auf Prozesse, in denen Wissen recherchiert, bewertet, kombiniert und veröffentlicht werden muss." : "Transferable to processes where knowledge must be researched, evaluated, combined and published."}</blockquote><Link className="ss-text-link" to="/studio/projekte/sapientblock">SAPIENTBLOCK {language === "de" ? "vertiefen" : "case"}<ArrowRight size={16} /></Link></div>
        </section>

        <section className="ss-project-preview ss-section">
          <header><p className="ss-eyebrow">{language === "de" ? "Aus dem Portfolio" : "From the portfolio"}</p><h2>{language === "de" ? "Gebaut, getestet, gelernt." : "Built, tested, learned from."}</h2><Link to="/studio/projekte">{t.allProjects}<ArrowRight size={16} /></Link></header>
          <div>{previewProjects.map((project) => <StudioProjectCard project={project} language={language} key={project.slug} />)}</div>
        </section>

        <section className="ss-method ss-section">
          <header><p className="ss-eyebrow">{t.methodLabel}</p><h2>{t.methodTitle}</h2></header>
          <div className="ss-method__track">{t.method.map(([number, title, body]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="ss-responsibility ss-section" id="responsibility">
          <div className="ss-responsibility__media">
            <img src={accountabilityImage} alt={language === "de" ? "Team prüft einen KI-gestützten Arbeitsablauf vor der Freigabe" : "Team reviews an AI-assisted workflow before approval"} loading="lazy" decoding="async" />
            <div><span>HUMAN CHECK</span><b>{language === "de" ? "FREIGABE SICHTBAR" : "APPROVAL VISIBLE"}</b></div>
          </div>
          <div><p className="ss-eyebrow">{t.responsibilityLabel}</p><h2>{t.responsibilityTitle}</h2><p>{t.responsibilityBody}</p><div className="ss-control-flow"><span>INTENT</span><ArrowRight /><span>AI ACTION</span><ArrowRight /><span>HUMAN CHECK</span><ArrowRight /><span>RELEASE</span></div></div>
        </section>

        <section className="ss-final-cta ss-section"><p className="ss-eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><a className="ss-button ss-button--dark" href="mailto:signal@shapeneural.com?subject=Projektanfrage">{t.cta}<ArrowRight size={18} /></a><BindruneLogo size={50} onDark={false} /></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
