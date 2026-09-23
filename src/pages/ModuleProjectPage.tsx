import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, ExternalLink, Languages } from "lucide-react";
import BindruneLogo from "@/components/BindruneLogo";
import { findProjectBySlug, PROJECTS } from "@/data/projects";
import "@/module-library.css";

const detailCopy: Record<string, { question: string; summary: string; value: string; learning: string }> = {
  sapientblock: {
    question: "Wo schafft Blockchain für ein konkretes Unternehmen echten Wert – und wo nicht?",
    summary: "SAPIENTBLOCK verbindet Unternehmenskontext mit mehr als 250 validierten Anwendungsfällen aus 74 Branchen. Statt allgemeiner Technologieversprechen entsteht eine begründete Relevanzeinschätzung mit konkreten nächsten Schritten.",
    value: "Mittelständische Unternehmen erhalten eine verständliche Entscheidungsgrundlage, bevor sie Zeit und Budget in ein Blockchain-Vorhaben investieren.",
    learning: "Gute Technologiebewertung beginnt nicht mit der Technologie, sondern mit Kontext, Reifegrad und einem belastbaren Vergleichsraum.",
  },
  melodeye: {
    question: "Kann ein digitales System auf erlebte statt nur auf gezeigte Emotion reagieren?",
    summary: "MELODEYE kombiniert Gesichtsausdruck, Blickrichtung und Pupillendynamik direkt im Browser. Aus der Differenz zwischen sichtbarer und erlebter Emotion entsteht eine adaptive musikalische Reaktion.",
    value: "Das Projekt untersucht personalisierte Interaktion, ohne biometrische Rohdaten an einen Server zu übertragen.",
    learning: "Multimodale Signale sind aussagekräftiger als ein einzelner Klassifikator – erfordern aber klare Sicherheitslogik und eine bescheidene Interpretation.",
  },
  problaim: {
    question: "Wie entsteht aus einem komplexen Problem fortlaufend bessere Klarheit?",
    summary: "PROBLAIM behandelt Problemanalyse als lebenden Prozess. Eine Multi-LLM-Pipeline zerlegt Fragestellungen, beleuchtet sie aus zwölf archetypischen Perspektiven, ergänzt Recherche und vertieft die Analyse über Zeit.",
    value: "Entscheider erhalten keinen einmaligen Antworttext, sondern eine strukturierte Denkoberfläche, die Widersprüche und neue Evidenz aufnehmen kann.",
    learning: "Die Qualität autonomer Analyse hängt weniger von einem einzelnen Modell ab als von Orchestrierung, Perspektivenvielfalt und überprüfbaren Zwischenschritten.",
  },
  humancrypto: {
    question: "Wie wird abstrakte Technologie erinnerbar und menschlich?",
    summary: "HUMANCRYP.TO übersetzt Kryptowährungen in Figuren. Jung'sche Archetypen, ein Emotionsmodell und eine automatisierte Bild-, Sprach- und Videopipeline machen technische Unterschiede als Charaktere erlebbar.",
    value: "Komplexe Konzepte werden nicht vereinfacht, sondern über Narrativ, Emotion und Wiedererkennbarkeit zugänglicher gemacht.",
    learning: "Storytelling kann technisches Lernen tragen, wenn Metapher und zugrunde liegende Fakten klar voneinander getrennt bleiben.",
  },
  sapientshift: {
    question: "Welche KI-Chance passt wirklich zu diesem Unternehmen, Team oder Menschen?",
    summary: "SAPIENTSHIFT übersetzt das abstrakte Versprechen von KI in personalisierte Potenziale. Drei Analysepfade, 318 kuratierte Anwendungsfälle und eine agentische Creative Guild erzeugen kontextbezogene Empfehlungen und Inhalte.",
    value: "Unterschiedliche Zielgruppen erhalten keine generische Trendübersicht, sondern einen priorisierten Ausgangspunkt für eigene Entscheidungen.",
    learning: "Personalisierung wird dann nützlich, wenn sie nicht nur Inhalte variiert, sondern Ausgangslage, Bereitschaft und Handlungsraum berücksichtigt.",
  },
  "bitcoin-soundscape": {
    question: "Was wird hörbar, wenn Marktdaten zu einem zweiten Sinneskanal werden?",
    summary: "BITCOIN_SOUNDSCAPE zerlegt Marktdaten in fünf Zeitebenen und ordnet jeder Ebene eine musikalische Dimension zu. Daraus entsteht ein kontinuierlicher KI-generierter Audiostream, der sich mit dem Markt verändert.",
    value: "Das Projekt erforscht Sonifikation nicht als Effekt, sondern als informationsdichte Ergänzung zu visuellen Dashboards.",
    learning: "Daten werden nicht automatisch verständlich, wenn man sie vertont. Erst eine klare semantische Zuordnung und musikalische Kohärenz schaffen einen brauchbaren zweiten Kanal.",
  },
};

const detailCopyEn: typeof detailCopy = {
  sapientblock: {
    question: "Where does blockchain create real value for a specific company — and where does it not?",
    summary: "SAPIENTBLOCK connects company context with more than 250 validated use cases across 74 industries. Instead of broad technology promises, it creates an evidence-based relevance assessment and concrete next steps.",
    value: "Small and medium-sized companies gain a clear basis for decision-making before committing time and budget to a blockchain initiative.",
    learning: "Good technology assessment starts with context, maturity and a robust comparison space — not with the technology itself.",
  },
  melodeye: {
    question: "Can a digital system respond to felt emotion rather than only displayed emotion?",
    summary: "MELODEYE combines facial expression, gaze and pupil dynamics directly in the browser. The gap between visible and experienced emotion becomes the input for an adaptive musical response.",
    value: "The project explores personalised interaction without sending raw biometric data to a server.",
    learning: "Multimodal signals offer more context than one classifier, but require explicit safety logic and restrained interpretation.",
  },
  problaim: {
    question: "How can a complex problem produce better clarity over time?",
    summary: "PROBLAIM treats problem analysis as a living process. A multi-LLM pipeline decomposes questions, examines them through twelve archetypal perspectives, adds research and deepens the analysis over time.",
    value: "Decision-makers gain a structured thinking surface that can absorb contradictions and new evidence — not a one-off answer.",
    learning: "The quality of autonomous analysis depends less on one model than on orchestration, diversity of perspectives and inspectable intermediate steps.",
  },
  humancrypto: {
    question: "How does abstract technology become memorable and human?",
    summary: "HUMANCRYP.TO turns cryptocurrencies into characters. Jungian archetypes, an emotion model and an automated image, voice and video pipeline make technical differences tangible as personalities.",
    value: "Complex concepts become approachable through narrative, emotion and recognition without reducing them to empty simplifications.",
    learning: "Storytelling can carry technical learning when metaphor and underlying fact remain clearly separated.",
  },
  sapientshift: {
    question: "Which AI opportunity genuinely fits this company, team or person?",
    summary: "SAPIENTSHIFT translates the abstract promise of AI into personalised potential. Three analysis paths, 318 curated use cases and an agentic Creative Guild generate contextual recommendations and content.",
    value: "Different audiences receive a prioritised starting point for their own decisions rather than another generic trend overview.",
    learning: "Personalisation becomes useful when it adapts not only content, but the starting point, readiness and room for action.",
  },
  "bitcoin-soundscape": {
    question: "What becomes audible when market data turns into a second sensory channel?",
    summary: "BITCOIN_SOUNDSCAPE separates market data into five time layers and maps each layer to a musical dimension. The result is a continuous AI-generated audio stream that changes with the market.",
    value: "The project explores sonification as an information-rich complement to visual dashboards rather than a decorative effect.",
    learning: "Data does not become understandable simply by turning it into sound. Clear semantic mapping and musical coherence create a useful second channel.",
  },
};

function ModuleProjectPage() {
  const [language, setLanguage] = useState<"de" | "en">("de");
  const { slug = "" } = useParams();
  const project = findProjectBySlug(slug);
  if (!project) return <Navigate to="/modules" replace />;
  const copy = language === "de" ? detailCopy[slug] : detailCopyEn[slug];
  const nextIndex = (PROJECTS.findIndex((item) => item.slug === slug) + 1) % PROJECTS.length;
  const next = PROJECTS[nextIndex];
  const localImage = project.image && !project.image.startsWith("/__l5e");

  return (
    <div className="mp-shell">
      <Helmet>
        <title>{project.title.replaceAll("_", " ")} — ShapeNeural Project</title>
        <meta name="description" content={copy.summary} />
      </Helmet>
      <header className="mp-header">
        <Link to="/modules#module-10"><ArrowLeft size={15} />Module Library</Link>
        <div><BindruneLogo size={28} onDark /><span>SHAPENEURAL® / PROJECT SYSTEM</span></div>
        <div className="mp-header__tools"><span>{project.id} / {project.status}</span><button onClick={() => setLanguage(language === "de" ? "en" : "de")}><Languages size={14} />{language.toUpperCase()}</button></div>
      </header>

      <main>
        <section className="mp-hero">
          <div className="mp-hero__copy">
            <p>{project.category.replaceAll("_", " ")} / {project.year}</p>
            <h1>{project.title.replaceAll("_", " ")}</h1>
            <blockquote>{copy.question}</blockquote>
          </div>
          <div className="mp-hero__visual">
            {localImage ? <img src={project.image} alt={`${project.title} product view`} /> : <div className="mp-fallback"><i /><i /><i /><b>{project.title.slice(0, 2)}</b></div>}
            <span>{project.status}</span>
          </div>
        </section>

        <section className="mp-overview">
          <div><small>01 / CONTEXT</small><h2>{copy.summary}</h2></div>
          <aside><span>COLLABORATION</span><strong>{project.collaboration}</strong><span>STATUS</span><strong>{project.status}</strong><span>YEAR</span><strong>{project.year}</strong></aside>
        </section>

        <section className="mp-system">
          <div className="mp-section-title"><small>02 / SYSTEM</small><h2>{language === "de" ? "Was das Projekt konkret leistet." : "What the project actually does."}</h2></div>
          <div className="mp-signals">
            {project.signalTags.map((signal, index) => <div key={signal}><span>0{index + 1}</span><strong>{signal.replaceAll("_", " ")}</strong></div>)}
          </div>
        </section>

        <section className="mp-value">
          <div><small>03 / VALUE</small><h2>{copy.value}</h2></div>
          <div><small>04 / LEARNING</small><h2>{copy.learning}</h2></div>
        </section>

        <section className="mp-stack">
          <div className="mp-section-title"><small>05 / ARCHITECTURE</small><h2>{language === "de" ? "Gebaut mit einem nachvollziehbaren System." : "Built as an inspectable system."}</h2></div>
          <div>{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>

        <section className="mp-actions">
          {project.url && <a href={project.url} target="_blank" rel="noreferrer">{language === "de" ? "Live-Projekt öffnen" : "Open live project"}<ExternalLink size={17} /></a>}
          <Link to={`/modules/projects/${next.slug}`}><span>{language === "de" ? "NÄCHSTES PROJEKT" : "NEXT PROJECT"}</span><strong>{next.title.replaceAll("_", " ")}</strong><ArrowRight /></Link>
        </section>
      </main>
    </div>
  );
}

export default ModuleProjectPage;
