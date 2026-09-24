import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Check, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { STUDIO_OFFERS } from "@/data/studio";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import StudioProjectCard from "@/components/StudioProjectCard";
import BindruneLogo from "@/components/BindruneLogo";
import stageFriction from "@/assets/stage-friction.webp";
import stageClarity from "@/assets/stage-clarity.webp";
import stageSystem from "@/assets/stage-system.webp";
import workshopImage from "@/assets/module-workshop.webp";
import operationsImage from "@/assets/module-operations.webp";
import profilePortrait from "@/assets/profile-portrait.png";
import "@/studio-site.css";

const HERO_FRAMES = [stageFriction, stageClarity, stageSystem];

const copy = {
  de: {
    meta: "Unabhängiges Applied-AI-Studio · Frankfurt / Remote",
    hero: "Von Ihrer Arbeit zu einem KI-System, das wirklich hilft.",
    heroBody: "ShapeNeural richtet KI praktisch ein, gestaltet Arbeitsabläufe neu und macht neue Produktideen testbar – für kleine Unternehmen, Teams und Selbstständige.",
    primary: "Passenden Einstieg finden",
    secondary: "Arbeit ansehen",
    definitionLabel: "Eine klare Definition",
    definition: "ShapeNeural ist das unabhängige Applied-AI-Studio, das bestehende Arbeit verbessert, Workflows neu gestaltet und neue Ideen real testbar macht.",
    smallLabel: "Small by design",
    smallTitle: "Direkte Zusammenarbeit. Klar begrenzte Vorhaben. Etwas, das danach existiert.",
    smallBody: "Keine Übergabe zwischen Sales, Beratung und Entwicklung. Die Person, mit der Sie sprechen, strukturiert, konzipiert und baut auch – unterstützt durch ein agentisches Studio-Setup.",
    pathLabel: "Welcher Weg passt zu Ihnen?",
    pathTitle: "Drei Bewegungen. Ein praktischer nächster Schritt.",
    explore: "Leistung vertiefen",
    materialLabel: "Nicht nur Beratung",
    materialTitle: "Was nach der Zusammenarbeit tatsächlich bleibt.",
    materialBody: "Kleine Unternehmen brauchen keine abstrakte Transformationserzählung. Sie brauchen ein einsatzbereites Setup, einen funktionierenden Workflow oder einen Prototyp, über den entschieden werden kann.",
    material: [
      ["AUGMENT", "AI Workspace", "Assistenten, Anweisungen, Wissensquellen und konkrete Use Cases"],
      ["TRANSFORM", "Working Workflow", "Blueprint, Automationen, Kontrollpunkte, Evaluation und Runbook"],
      ["CREATE", "Testable Product", "Produktkonzept, funktionaler Prototyp, Validierung und Roadmap"],
    ],
    proofLabel: "Proof through building",
    proofTitle: "Create ist bereits gelebte Praxis.",
    proofBody: "Eigene Produkte und Experimente sind unser Realitätscheck: Sie zwingen uns, Nutzen, Interaktion, Modellqualität, Kosten und Betrieb nicht nur zu beschreiben, sondern auszuprobieren.",
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
    labLabel: "ShapeNeural Lab",
    labTitle: "Beobachten, bevor etwas offensichtlich wird.",
    labBody: "Das Lab ist keine zweite Projektgalerie. Es sammelt Signale, verbindet Entwicklungen und hält offene Fragen sichtbar – als eigenständige Forschungsoberfläche des Studios.",
    openLab: "Lab betreten",
    founderLabel: "Direkter Senior-Zugang",
    founderTitle: "Die Person im Gespräch bleibt auch im Projekt verantwortlich.",
    founderBody: "Mehr als 20 Jahre Experience- und Transformationsarbeit treffen auf angewandte KI und schnelles Produktbauen. Klein genug für direkte Zusammenarbeit – strukturiert genug für anspruchsvolle Vorhaben.",
    founderMeta: "Ufuk Avci · AI & CX Strategy / Product / Venture Building",
    ctaLabel: "Klein anfangen. Substanziell weiterbauen.",
    ctaTitle: "Was soll durch KI besser werden?",
    cta: "Vorhaben besprechen",
  },
  en: {
    meta: "Independent applied AI studio · Frankfurt / Remote",
    hero: "From the way you work to an AI system that genuinely helps.",
    heroBody: "ShapeNeural configures AI for real use, redesigns workflows and makes new product ideas testable — for small businesses, teams and independent professionals.",
    primary: "Find the right entry point",
    secondary: "Explore the work",
    definitionLabel: "One clear definition",
    definition: "ShapeNeural is the independent applied AI studio that improves existing work, redesigns workflows and makes new ideas tangible enough to test.",
    smallLabel: "Small by design",
    smallTitle: "Direct collaboration. Bounded projects. Something that exists afterwards.",
    smallBody: "No handover between sales, consultants and developers. The person you speak with structures, designs and builds the work — supported by an agentic studio setup.",
    pathLabel: "Which path fits you?",
    pathTitle: "Three movements. One practical next step.",
    explore: "Explore service",
    materialLabel: "Beyond advice",
    materialTitle: "What actually remains after the work.",
    materialBody: "Small organisations do not need an abstract transformation story. They need a ready-to-use setup, a functioning workflow or a prototype that enables a real decision.",
    material: [
      ["AUGMENT", "AI Workspace", "Assistants, instructions, knowledge sources and concrete use cases"],
      ["TRANSFORM", "Working Workflow", "Blueprint, automations, checkpoints, evaluation and runbook"],
      ["CREATE", "Testable Product", "Product concept, functional prototype, validation and roadmap"],
    ],
    proofLabel: "Proof through building",
    proofTitle: "Create is already proven practice.",
    proofBody: "Our products and experiments are a reality check. They force us to work through value, interaction, model quality, cost and operations rather than merely describe them.",
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
    labLabel: "ShapeNeural Lab",
    labTitle: "Observe before something becomes obvious.",
    labBody: "The Lab is not a second project gallery. It collects signals, connects developments and keeps open questions visible — as the studio’s independent research surface.",
    openLab: "Enter the Lab",
    founderLabel: "Direct senior access",
    founderTitle: "The person in the conversation remains accountable in the work.",
    founderBody: "More than 20 years of experience and transformation work meet applied AI and rapid product building. Small enough for direct collaboration — structured enough for ambitious work.",
    founderMeta: "Ufuk Avci · AI & CX Strategy / Product / Venture Building",
    ctaLabel: "Start small. Build something substantial.",
    ctaTitle: "What should AI make better?",
    cta: "Discuss a project",
  },
} as const;

export default function StudioHomePage() {
  const { language, setLanguage } = useStudioLanguage();
  const [frame, setFrame] = useState(0);
  const t = copy[language];
  const featured = PROJECTS.find((project) => project.slug === "problaim")!;
  const previewProjects = ["sapientblock", "sapientshift", "melodeye"].map((slug) => PROJECTS.find((project) => project.slug === slug)!);

  useEffect(() => {
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % HERO_FRAMES.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ss-site">
      <Helmet><title>ShapeNeural — Applied AI Studio</title><meta name="description" content={t.heroBody} /></Helmet>
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
          <div><p className="ss-eyebrow">{t.smallLabel}</p><h2>{t.smallTitle}</h2><p>{t.smallBody}</p><ul><li><Check />{language === "de" ? "Ein direkter Ansprechpartner" : "One direct partner"}</li><li><Check />{language === "de" ? "Klarer Umfang statt offener Programme" : "Clear scope rather than open programmes"}</li><li><Check />{language === "de" ? "Umsetzung statt Folienübergabe" : "Implementation rather than a deck handover"}</li></ul></div>
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
          <div className="ss-proof__media">{featured.image && <img src={featured.image} alt="PROBLAIM interface" />}<span>FEATURED BUILD / CREATE</span></div>
          <div className="ss-proof__copy"><p className="ss-eyebrow">{t.proofLabel}</p><h2>{t.proofTitle}</h2><p>{t.proofBody}</p><blockquote>{language === "de" ? "Was wäre, wenn ein komplexes Problem nicht in einem Workshop endet, sondern jeden Tag klüger analysiert wird?" : "What if a complex problem did not end in a workshop, but became more intelligently analysed every day?"}</blockquote><Link className="ss-text-link" to="/studio/projekte/problaim">PROBLAIM {language === "de" ? "vertiefen" : "case"}<ArrowRight size={16} /></Link></div>
        </section>

        <section className="ss-project-preview ss-section">
          <header><p className="ss-eyebrow">{language === "de" ? "Aus dem Portfolio" : "From the portfolio"}</p><h2>{language === "de" ? "Gebaut, getestet, gelernt." : "Built, tested, learned from."}</h2><Link to="/studio/projekte">{t.allProjects}<ArrowRight size={16} /></Link></header>
          <div>{previewProjects.map((project) => <StudioProjectCard project={project} language={language} key={project.slug} />)}</div>
        </section>

        <section className="ss-method ss-section">
          <header><p className="ss-eyebrow">{t.methodLabel}</p><h2>{t.methodTitle}</h2></header>
          <div className="ss-method__track">{t.method.map(([number, title, body]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="ss-responsibility ss-section">
          <img src={operationsImage} alt="Human review of an agent workflow" />
          <div><p className="ss-eyebrow">{t.responsibilityLabel}</p><h2>{t.responsibilityTitle}</h2><p>{t.responsibilityBody}</p><div className="ss-control-flow"><span>INTENT</span><ArrowRight /><span>AI ACTION</span><ArrowRight /><span>HUMAN CHECK</span><ArrowRight /><span>RELEASE</span></div></div>
        </section>

        <section className="ss-lab-portal ss-section">
          <div className="ss-signal-orbit"><i /><i /><i /><b>SN</b><span>LIVE SIGNALS</span></div>
          <div><p className="ss-eyebrow">{t.labLabel}</p><h2>{t.labTitle}</h2><p>{t.labBody}</p><Link className="ss-button ss-button--dark" to="/studio/lab">{t.openLab}<ExternalLink size={16} /></Link></div>
        </section>

        <section className="ss-founder ss-section">
          <div className="ss-founder__portrait"><img src={profilePortrait} alt="Ufuk Avci" /><span>FOUNDER / OPERATOR</span></div>
          <div><p className="ss-eyebrow">{t.founderLabel}</p><h2>{t.founderTitle}</h2><p>{t.founderBody}</p><strong>{t.founderMeta}</strong></div>
        </section>

        <section className="ss-final-cta ss-section"><p className="ss-eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><a className="ss-button ss-button--dark" href="mailto:hello@shapeneural.com?subject=Projektanfrage">{t.cta}<ArrowRight size={18} /></a><BindruneLogo size={50} onDark={false} /></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
