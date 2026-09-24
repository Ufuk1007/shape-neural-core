import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Languages,
  Minus,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import BindruneLogo from "@/components/BindruneLogo";
import { PROJECTS } from "@/data/projects";
import stageFriction from "@/assets/stage-friction.webp";
import stageClarity from "@/assets/stage-clarity.webp";
import stageSystem from "@/assets/stage-system.webp";
import workshopImage from "@/assets/module-workshop.webp";
import operationsImage from "@/assets/module-operations.webp";
import profilePortrait from "@/assets/profile-portrait.png";
import "@/module-library.css";

type Language = "de" | "en";
type MotionMode = "sequence" | "signal" | "still";
type Category = "all" | "narrative" | "services" | "proof" | "trust";

const serviceCopy = {
  de: [
    {
      number: "01",
      title: "Klarheit schaffen",
      text: "Wir priorisieren den KI-Hebel, der für Ihr Geschäft wirklich zählt.",
      outcome: "Entscheidungsgrundlage",
      format: "Focus Day / AI Opportunity Map",
      detail: "Für diffuse Ideen, zu viele Optionen oder eine Entscheidung, die belastbar werden muss. Wir verbinden Geschäftslogik, Nutzerbedürfnisse und technische Realität in einer klaren Priorität.",
      duration: "1 Tag + Verdichtung",
    },
    {
      number: "02",
      title: "Etwas Echtes bauen",
      text: "Wir übersetzen die Entscheidung in einen testbaren Workflow, Agenten oder ein digitales Produkt.",
      outcome: "Nutzbares Produkt",
      format: "Prototype / Product Sprint",
      detail: "Wir gehen bewusst über Folien hinaus. Ein fokussierter Sprint verbindet Experience, Engineering und reale Tests zu etwas, das Menschen benutzen und bewerten können.",
      duration: "2–6 Wochen",
    },
    {
      number: "03",
      title: "Zuverlässig betreiben",
      text: "Wir überwachen, pflegen und verbessern Systeme, wenn sie Teil des Alltags werden.",
      outcome: "Verlässlicher Betrieb",
      format: "Embedded AI Operations",
      detail: "Wenn ein System produktiv wird, beginnen die entscheidenden Fragen: Qualität, Kosten, Ausnahmen und Verhalten. Wir betreiben diese Lernschleife mit klarer menschlicher Verantwortung.",
      duration: "Monatlich / fortlaufend",
    },
    {
      number: "04",
      title: "Menschen befähigen",
      text: "Wir verankern Wissen, Werkzeuge und Verantwortung so, dass Ihr Team selbständig weiterkommt.",
      outcome: "Eigene Handlungsfähigkeit",
      format: "Enablement / Handover",
      detail: "Keine Black Box und keine künstliche Abhängigkeit. Dokumentation, Entscheidungslogik, Schulung und Routinen werden von Anfang an als Teil des Produkts behandelt.",
      duration: "Im Projekt oder separat",
    },
  ],
  en: [
    {
      number: "01",
      title: "Create clarity",
      text: "We prioritise the AI opportunity that genuinely matters to your business.",
      outcome: "A basis for decision-making",
      format: "Focus Day / AI Opportunity Map",
      detail: "For diffuse ideas, too many options or a decision that needs substance. We connect business logic, human needs and technical reality in one clear priority.",
      duration: "1 day + synthesis",
    },
    {
      number: "02",
      title: "Build something real",
      text: "We turn the decision into a testable workflow, agent or digital product.",
      outcome: "A usable product",
      format: "Prototype / Product Sprint",
      detail: "We deliberately move beyond decks. A focused sprint combines experience, engineering and real tests into something people can use and judge.",
      duration: "2–6 weeks",
    },
    {
      number: "03",
      title: "Operate reliably",
      text: "We monitor, maintain and improve systems once they become part of daily work.",
      outcome: "Reliable operations",
      format: "Embedded AI Operations",
      detail: "Once a system is live, the important questions begin: quality, cost, exceptions and behaviour. We run that learning loop with explicit human accountability.",
      duration: "Monthly / ongoing",
    },
    {
      number: "04",
      title: "Enable people",
      text: "We anchor knowledge, tools and accountability so your team can keep moving independently.",
      outcome: "Independent capability",
      format: "Enablement / Handover",
      detail: "No black box and no artificial dependency. Documentation, decision logic, training and routines are treated as part of the product from day one.",
      duration: "Within a project or standalone",
    },
  ],
};

const processCopy = {
  de: [
    ["01", "Verstehen", "Problem, Menschen, Daten und Grenzen sichtbar machen."],
    ["02", "Beweisen", "Die kleinste sinnvolle Lösung mit realen Nutzern testen."],
    ["03", "Produzieren", "Experience, Engineering und Governance zusammenführen."],
    ["04", "Betreiben", "Qualität, Kosten und Verhalten im Alltag beobachten."],
    ["05", "Übergeben", "Wissen, Dokumentation und Entscheidungsfähigkeit verankern."],
  ],
  en: [
    ["01", "Understand", "Make the problem, people, data and constraints visible."],
    ["02", "Prove", "Test the smallest meaningful solution with real users."],
    ["03", "Produce", "Bring experience, engineering and governance together."],
    ["04", "Operate", "Observe quality, cost and behaviour in daily use."],
    ["05", "Transfer", "Anchor knowledge, documentation and decision capability."],
  ],
};

const projectGerman: Record<string, { line: string; question: string }> = {
  sapientblock: {
    line: "Bewertet Blockchain-Relevanz für den deutschen Mittelstand anhand validierter Anwendungsfälle.",
    question: "Wo schafft Blockchain echten Geschäftswert – und wo nicht?",
  },
  melodeye: {
    line: "Übersetzt multimodale Emotionssignale datenschutzbewusst in adaptive Musik.",
    question: "Kann Technologie auf erlebte statt nur gezeigte Emotion reagieren?",
  },
  problaim: {
    line: "Zerlegt komplexe Probleme mit einer autonomen Multi-LLM-Pipeline in belastbare Perspektiven.",
    question: "Wie entsteht aus Komplexität fortlaufend bessere Klarheit?",
  },
  humancrypto: {
    line: "Macht Kryptowährungen über Archetypen, Emotion und KI-generierte Figuren verständlich.",
    question: "Wie wird abstrakte Technologie erinnerbar und menschlich?",
  },
  sapientshift: {
    line: "Übersetzt KI-Potenziale für Unternehmen, Mitarbeitende und Einzelpersonen in nächste Schritte.",
    question: "Welche KI-Chance passt wirklich zu diesem Kontext?",
  },
  "bitcoin-soundscape": {
    line: "Verwandelt fünf Zeitebenen des Bitcoin-Markts in einen kontinuierlichen KI-Soundscape.",
    question: "Was wird hörbar, wenn Marktdaten zu einem zweiten Sinneskanal werden?",
  },
};

const labels = {
  de: {
    library: "Module Library / Arbeitsstand",
    intro: "18 Module. Noch keine finale Seite.",
    introBody: "Eine getrennte Auswahlfläche für Narrative, Leistungen, Proof und Vertrauen. Module markieren, vergleichen und später gezielt in die bestehende Seite übernehmen.",
    current: "Aktuelle Seite öffnen",
    selected: "ausgewählt",
    filters: ["Alle", "Narrativ", "Leistungen", "Proof", "Vertrauen"],
    select: "Modul wählen",
    chosen: "Ausgewählt",
    why: "Rolle im System",
    motion: "Bewegung",
    modes: ["Bildsequenz", "Signalbewegung", "Statisch"],
    stageTitle: "Wir machen KI zu einem funktionierenden Teil Ihres Geschäfts.",
    stageBody: "ShapeNeural klärt, baut und betreibt KI-Produkte und agentische Workflows – vom fokussierten Einstieg bis zur langfristigen Partnerschaft.",
    stageCta: "Projekt besprechen",
  },
  en: {
    library: "Module Library / Working draft",
    intro: "18 modules. Not a final website yet.",
    introBody: "A separate selection space for narrative, services, proof and trust. Mark and compare modules, then deliberately move the strongest into the existing site.",
    current: "Open current page",
    selected: "selected",
    filters: ["All", "Narrative", "Services", "Proof", "Trust"],
    select: "Select module",
    chosen: "Selected",
    why: "Role in the system",
    motion: "Motion",
    modes: ["Image sequence", "Signal motion", "Still"],
    stageTitle: "We make AI a working part of your business.",
    stageBody: "ShapeNeural clarifies, builds and operates AI products and agentic workflows — from a focused first step to a long-term partnership.",
    stageCta: "Discuss a project",
  },
};

const moduleMeta = [
  ["01", "narrative", "Stage / Core promise", "Der Einstieg setzt Nutzen, Haltung und Maßstab – ohne die ganze Seite vorwegzunehmen."],
  ["02", "narrative", "Positioning / One sentence", "Eine merkfähige Definition verhindert, dass ShapeNeural wie eine beliebige KI-Beratung klingt."],
  ["03", "narrative", "Audience / Accessible entry", "Zeigt kleinen Unternehmen und Selbstständigen konkret, dass sie gemeint sind."],
  ["04", "services", "Engagements / Overview", "Vier kaufbare Einstiege beantworten: Was kann ich hier konkret beauftragen?"],
  ["05", "services", "Engagement / Deep dive", "Die fehlende Vertiefung: Anlass, Ergebnis, Format, Dauer und Anschluss."],
  ["06", "services", "Service × process map", "Löst die Doppelung auf: Leistung ist das Was, Arbeitsweise ist das Wie."],
  ["07", "services", "Operating method", "Ein wiederholbarer Prozess schafft Sicherheit, ohne Standardlösungen vorzutäuschen."],
  ["08", "services", "Deliverables / What remains", "Macht unsichtbare Beratungsarbeit als konkrete Artefakte greifbar."],
  ["09", "trust", "Human oversight", "Agentisch arbeiten und menschlich verantwortlich bleiben wird als echtes Betriebsmodell sichtbar."],
  ["10", "proof", "All projects / Universe", "Alle sechs Projekte werden sichtbar, filterbar und mit einer eigenen Detailseite verbunden."],
  ["11", "proof", "Featured case / Editorial", "Ein Projekt bekommt die Tiefe und visuelle Wertigkeit eines Hero-Case."],
  ["12", "proof", "Product library", "Eigene Produkte stehen nicht als Spielerei, sondern als Kompetenzbeweis im System."],
  ["13", "proof", "Project detail blueprint", "Definiert die wiederholbare Dramaturgie jeder einzelnen Projektseite."],
  ["14", "proof", "Evidence / No invented metrics", "Schafft Glaubwürdigkeit über nachprüfbare Evidenz statt erfundener Erfolgszahlen."],
  ["15", "trust", "Founder / Senior access", "Die direkte Zusammenarbeit mit einem verantwortlichen Partner wird zum Vorteil der Studiogröße."],
  ["16", "narrative", "Signals / Research layer", "Das Lab lebt als kuratierte Denkoberfläche weiter, ohne die Agenturseite zu dominieren."],
  ["17", "trust", "Principles / Guardrails", "Klare Leitplanken beantworten Sicherheit, Verantwortung und Übergabe frühzeitig."],
  ["18", "trust", "CTA / Three entry paths", "Ein konkreter, risikoarmer nächster Schritt ersetzt den generischen Kontaktaufruf."],
] as const;

function ModuleFrame({
  meta,
  selected,
  toggle,
  language,
  children,
}: {
  meta: (typeof moduleMeta)[number];
  selected: boolean;
  toggle: () => void;
  language: Language;
  children: React.ReactNode;
}) {
  const t = labels[language];
  return (
    <article className={`ml-module ${selected ? "is-selected" : ""}`} id={`module-${meta[0]}`} data-category={meta[1]}>
      <div className="ml-module__bar">
        <div><span>{meta[0]}</span><strong>{meta[2]}</strong></div>
        <button onClick={toggle} aria-pressed={selected}>
          {selected ? <Check size={15} /> : <Plus size={15} />}
          {selected ? t.chosen : t.select}
        </button>
      </div>
      <div className="ml-module__canvas">{children}</div>
      <div className="ml-module__note"><span>{t.why}</span><p>{meta[3]}</p></div>
    </article>
  );
}

function ModuleLibrary() {
  const [language, setLanguage] = useState<Language>("de");
  const [motion, setMotion] = useState<MotionMode>("sequence");
  const [filter, setFilter] = useState<Category>("all");
  const [selected, setSelected] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem("sn-module-selection-v1");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  });
  const [activeService, setActiveService] = useState(0);
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [stageIndex, setStageIndex] = useState(0);
  const t = labels[language];
  const services = serviceCopy[language];
  const process = processCopy[language];
  const stageImages = [stageFriction, stageClarity, stageSystem];

  useEffect(() => {
    if (motion !== "sequence") return;
    const id = window.setInterval(() => setStageIndex((value) => (value + 1) % stageImages.length), 2800);
    return () => window.clearInterval(id);
  }, [motion, stageImages.length]);

  useEffect(() => {
    window.localStorage.setItem("sn-module-selection-v1", JSON.stringify(selected));
  }, [selected]);

  const categories = useMemo(() => ["all", "narrative", "services", "proof", "trust"] as Category[], []);
  const projectCategories = ["ALL", ...Array.from(new Set(PROJECTS.map((project) => project.category)))];
  const visibleProjects = projectFilter === "ALL" ? PROJECTS : PROJECTS.filter((project) => project.category === projectFilter);
  const visibleMeta = moduleMeta.filter((meta) => filter === "all" || meta[1] === filter);

  const toggleSelected = (id: string) => {
    setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const renderFrame = (index: number, children: React.ReactNode) => {
    const meta = moduleMeta[index];
    if (!visibleMeta.includes(meta)) return null;
    return <ModuleFrame key={meta[0]} meta={meta} selected={selected.includes(meta[0])} toggle={() => toggleSelected(meta[0])} language={language}>{children}</ModuleFrame>;
  };

  return (
    <div className={`ml-shell motion-${motion}`}>
      <Helmet>
        <title>ShapeNeural — Module Library</title>
        <meta name="description" content="A separate selection library for the next ShapeNeural studio website." />
      </Helmet>

      <header className="ml-reviewbar">
        <div className="ml-reviewbar__brand"><BindruneLogo size={25} onDark /><span>{t.library}</span></div>
        <div className="ml-reviewbar__tools">
          <span className="ml-selected-count"><b>{selected.length}</b> / 18 {t.selected}</span>
          <Link to="/directions"><ArrowLeft size={14} />{t.current}</Link>
          <button onClick={() => setLanguage(language === "de" ? "en" : "de")}><Languages size={15} />{language.toUpperCase()}</button>
        </div>
      </header>

      <section className="ml-intro">
        <div className="ml-kicker"><span>SN / 2026</span><span>SELECTION SPACE</span></div>
        <h1>{t.intro}</h1>
        <p>{t.introBody}</p>
        <div className="ml-intro__controls">
          <div className="ml-filter" aria-label="Module filtern">
            {categories.map((category, index) => (
              <button className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)} key={category}>{t.filters[index]}</button>
            ))}
          </div>
          <div className="ml-motion">
            <span>{t.motion}</span>
            {(["sequence", "signal", "still"] as MotionMode[]).map((mode, index) => (
              <button className={motion === mode ? "is-active" : ""} onClick={() => setMotion(mode)} key={mode}>
                {mode === "still" ? <Pause size={12} /> : <Play size={12} />}{t.modes[index]}
              </button>
            ))}
          </div>
        </div>
        <ArrowDown className="ml-intro__arrow" />
      </section>

      <main className="ml-list">
        {renderFrame(0,
          <section className="candidate-hero">
            <div className="candidate-hero__media">
              {stageImages.map((image, index) => <img key={image} src={image} alt="" className={stageIndex === index ? "is-active" : ""} />)}
              <div className="candidate-hero__signal"><i /><i /><i /><span>HUMAN-LED / AGENT-AMPLIFIED</span></div>
            </div>
            <div className="candidate-hero__copy">
              <div className="candidate-nav"><span>SHAPENEURAL®</span><span>FRANKFURT / REMOTE</span></div>
              <p>INDEPENDENT AI STUDIO</p>
              <h2>{t.stageTitle}</h2>
              <div className="candidate-hero__bottom"><p>{t.stageBody}</p><a href="mailto:signal@shapeneural.com">{t.stageCta}<ArrowRight size={18} /></a></div>
            </div>
          </section>
        )}

        {renderFrame(1,
          <section className="candidate-positioning">
            <p>{language === "de" ? "EINE KLARE DEFINITION" : "ONE CLEAR DEFINITION"}</p>
            <h2>{language === "de" ? "ShapeNeural ist das unabhängige KI-Studio, das Entscheidungen in Produkte – und Produkte in verlässlichen Betrieb übersetzt." : "ShapeNeural is the independent AI studio that turns decisions into products — and products into reliable operations."}</h2>
            <div className="candidate-positioning__line"><span>ADVISORY</span><ArrowRight /><span>BUILD</span><ArrowRight /><span>OPERATE</span><ArrowRight /><span>ENABLE</span></div>
          </section>
        )}

        {renderFrame(2,
          <section className="candidate-audience">
            <img src={workshopImage} alt="Focused collaboration in a small studio" />
            <div className="candidate-audience__copy">
              <p>{language === "de" ? "GROSS GENUG FÜR SUBSTANZ. KLEIN GENUG FÜR DIREKTE ZUSAMMENARBEIT." : "LARGE ENOUGH FOR SUBSTANCE. SMALL ENOUGH FOR DIRECT COLLABORATION."}</p>
              <h2>{language === "de" ? "Der Einstieg richtet sich nach Ihrem Problem – nicht nach Ihrer Unternehmensgröße." : "The entry point follows your problem — not the size of your company."}</h2>
              <div className="audience-row"><span>01</span><strong>{language === "de" ? "Selbstständig" : "Independent"}</strong><em>Focus Day</em></div>
              <div className="audience-row"><span>02</span><strong>{language === "de" ? "Kleines Unternehmen" : "Small business"}</strong><em>Prototype Sprint</em></div>
              <div className="audience-row"><span>03</span><strong>{language === "de" ? "Wachsendes Team" : "Growing team"}</strong><em>Embedded Studio</em></div>
            </div>
          </section>
        )}

        {renderFrame(3,
          <section className="candidate-services">
            <header><p>{language === "de" ? "VIER WEGE ZUR ZUSAMMENARBEIT" : "FOUR WAYS TO WORK TOGETHER"}</p><h2>{language === "de" ? "Was Sie konkret beauftragen können." : "What you can actually engage us for."}</h2></header>
            <div className="candidate-services__grid">
              {services.map((service) => <div className="service-card" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><dl><div><dt>ERGEBNIS</dt><dd>{service.outcome}</dd></div><div><dt>FORMAT</dt><dd>{service.format}</dd></div></dl></div>)}
            </div>
          </section>
        )}

        {renderFrame(4,
          <section className="candidate-deepdive">
            <div className="candidate-deepdive__index">
              <p>{language === "de" ? "LEISTUNG VERTIEFEN" : "EXPLORE THE ENGAGEMENT"}</p>
              {services.map((service, index) => <button key={service.number} onClick={() => setActiveService(index)} className={activeService === index ? "is-active" : ""}><span>{service.number}</span>{service.title}<ChevronDown size={16} /></button>)}
            </div>
            <div className="candidate-deepdive__content">
              <span>{services[activeService].format}</span>
              <h2>{services[activeService].title}</h2>
              <p>{services[activeService].detail}</p>
              <div className="deep-facts"><div><small>{language === "de" ? "ERGEBNIS" : "OUTCOME"}</small><strong>{services[activeService].outcome}</strong></div><div><small>{language === "de" ? "TYPISCHER RAHMEN" : "TYPICAL FRAME"}</small><strong>{services[activeService].duration}</strong></div><div><small>{language === "de" ? "ANSCHLUSS" : "NEXT"}</small><strong>{activeService === 3 ? (language === "de" ? "Eigenständig weiterarbeiten" : "Continue independently") : services[Math.min(activeService + 1, 3)].format}</strong></div></div>
            </div>
          </section>
        )}

        {renderFrame(5,
          <section className="candidate-map">
            <header><p>WHAT × HOW</p><h2>{language === "de" ? "Leistungen und Arbeitsweise erfüllen zwei verschiedene Aufgaben." : "Engagements and process do two different jobs."}</h2></header>
            <div className="candidate-map__legend"><span><i className="is-dark" />{language === "de" ? "Kernphase" : "Core phase"}</span><span><i />{language === "de" ? "Teil der Leistung" : "Part of engagement"}</span></div>
            <div className="map-table">
              <div className="map-table__head"><span>{language === "de" ? "WAS KUNDEN BEAUFTRAGEN" : "WHAT CLIENTS ENGAGE"}</span>{process.map((step) => <b key={step[0]}>{step[1]}</b>)}</div>
              {services.map((service, row) => <div className="map-table__row" key={service.number}><strong>{service.title}<small>{service.format}</small></strong>{process.map((step, col) => <i key={step[0]} className={col === Math.min(row, 3) || (row === 3 && col === 4) ? "is-core" : col <= Math.min(row + 1, 4) ? "is-used" : ""} />)}</div>)}
            </div>
            <p className="candidate-map__explain">{language === "de" ? "Die Leistung bestimmt Ziel, Umfang und Ergebnis. Die fünf Phasen beschreiben die Qualitätslogik, die je nach Auftrag unterschiedlich tief durchlaufen wird." : "The engagement defines intent, scope and outcome. The five phases describe the quality logic, used at different depths depending on the work."}</p>
          </section>
        )}

        {renderFrame(6,
          <section className="candidate-process">
            <header><p>{language === "de" ? "WIE WIR ARBEITEN" : "HOW WE WORK"}</p><h2>{language === "de" ? "Von einer guten Frage zu einem System, das im Alltag besteht." : "From a good question to a system that holds up in daily work."}</h2></header>
            <div className="process-track">
              {process.map((step) => <div key={step[0]}><span>{step[0]}</span><i /><h3>{step[1]}</h3><p>{step[2]}</p></div>)}
            </div>
            <div className="process-ribbon"><span>HUMAN DECISION</span><span>AGENT LEVERAGE</span><span>REAL-WORLD FEEDBACK</span><span>TRANSFER</span></div>
          </section>
        )}

        {renderFrame(7,
          <section className="candidate-deliverables">
            <div><p>{language === "de" ? "WAS BLEIBT" : "WHAT REMAINS"}</p><h2>{language === "de" ? "Nicht nur Empfehlungen. Verwendbare Artefakte." : "Not just recommendations. Usable artefacts."}</h2></div>
            <div className="deliverable-stack">
              {["AI Opportunity Map", "Decision brief", "Prototype / Product", "Evaluation suite", "Runbook + monitoring", "Handover kit"].map((item, index) => <div key={item} style={{ "--i": index } as React.CSSProperties}><span>0{index + 1}</span><strong>{item}</strong><em>{index < 2 ? "THINK" : index < 4 ? "BUILD" : "RUN"}</em></div>)}
            </div>
          </section>
        )}

        {renderFrame(8,
          <section className="candidate-oversight">
            <img src={operationsImage} alt="Human operator reviewing an agent workflow" />
            <div className="candidate-oversight__overlay">
              <p>HUMAN-LED / AGENT-AMPLIFIED</p>
              <h2>{language === "de" ? "Autonomie braucht sichtbare Verantwortung." : "Autonomy needs visible accountability."}</h2>
              <div className="oversight-flow"><span>{language === "de" ? "ZIEL" : "INTENT"}</span><ArrowRight /><span>AGENTS</span><ArrowRight /><span>{language === "de" ? "PRÜFUNG" : "REVIEW"}</span><ArrowRight /><span>RELEASE</span></div>
              <p className="oversight-copy">{language === "de" ? "Agenten recherchieren, produzieren und überwachen. Menschen setzen Ziele, entscheiden in Ausnahmen und tragen die Verantwortung für das Ergebnis." : "Agents research, produce and monitor. Humans set intent, decide on exceptions and remain accountable for the outcome."}</p>
            </div>
          </section>
        )}

        {renderFrame(9,
          <section className="candidate-projects">
            <header><p>{language === "de" ? "ALLE PROJEKTE" : "ALL PROJECTS"}</p><h2>{language === "de" ? "Gebaut, getestet, gelernt." : "Built, tested, learned from."}</h2></header>
            <div className="project-filters">{projectCategories.map((category) => <button className={projectFilter === category ? "is-active" : ""} onClick={() => setProjectFilter(category)} key={category}>{category.replaceAll("_", " ")}</button>)}</div>
            <div className="project-universe">
              {visibleProjects.map((project, index) => <Link to={`/modules/projects/${project.slug}`} className={`project-tile project-tile--${index % 3}`} key={project.slug}>
                <div className="project-tile__visual">{project.image && !project.image.startsWith("/__l5e") ? <img src={project.image} alt="" /> : <div className="project-tile__fallback"><i /><i /><i /><b>{project.title.slice(0, 2)}</b></div>}<span>{project.status}</span></div>
                <div className="project-tile__copy"><small>{project.category.replaceAll("_", " ")} / {project.year}</small><h3>{project.title.replaceAll("_", " ")}</h3><p>{language === "de" ? projectGerman[project.slug]?.line : project.brief}</p><strong>{language === "de" ? "Projekt öffnen" : "Open project"}<ArrowRight size={15} /></strong></div>
              </Link>)}
            </div>
          </section>
        )}

        {renderFrame(10,
          <section className="candidate-featured">
            <div className="candidate-featured__media"><img src={PROJECTS.find((project) => project.slug === "problaim")?.image} alt="PROBLAIM interface" /><span>CASE / 01</span></div>
            <div className="candidate-featured__copy"><p>DECISION INTELLIGENCE</p><h2>PROBLAIM</h2><blockquote>{language === "de" ? "Was wäre, wenn ein komplexes Problem nicht in einem Workshop endet – sondern jeden Tag klüger analysiert wird?" : "What if a complex problem did not end in a workshop — but became more intelligently analysed every day?"}</blockquote><dl><div><dt>PROBLEM</dt><dd>{language === "de" ? "Komplexe Entscheidungen verlieren Perspektiven, sobald Zeit und Aufmerksamkeit knapp werden." : "Complex decisions lose perspectives as time and attention become scarce."}</dd></div><div><dt>SYSTEM</dt><dd>{language === "de" ? "Eine autonome Multi-LLM-Pipeline zerlegt, recherchiert und vertieft das Problem fortlaufend." : "An autonomous multi-LLM pipeline decomposes, researches and deepens the problem continuously."}</dd></div></dl><Link to="/modules/projects/problaim">{language === "de" ? "Case vertiefen" : "Explore case"}<ArrowRight size={17} /></Link></div>
          </section>
        )}

        {renderFrame(11,
          <section className="candidate-products">
            <header><p>{language === "de" ? "PRODUCT LIBRARY" : "PRODUCT LIBRARY"}</p><h2>{language === "de" ? "Eigene Produkte sind unser Realitätscheck." : "Our own products are our reality check."}</h2><span>{language === "de" ? "Sie zwingen uns, dieselben Fragen zu beantworten wie unsere Kunden: Nutzen, Adoption, Qualität, Kosten und Betrieb." : "They force us to answer the same questions as our clients: value, adoption, quality, cost and operations."}</span></header>
            <div className="product-shelf">
              {PROJECTS.slice(0, 3).map((project, index) => <Link to={`/modules/projects/${project.slug}`} key={project.slug}><span>0{index + 1}</span><small>{project.status}</small><h3>{project.title}</h3><p>{project.tags.slice(0, 2).join(" / ").replaceAll("_", " ")}</p><ArrowRight /></Link>)}
            </div>
          </section>
        )}

        {renderFrame(12,
          <section className="candidate-blueprint">
            <div className="blueprint-nav"><span>PROJECT DETAIL / BLUEPRINT</span><span>REPEATABLE, NOT GENERIC</span></div>
            <div className="blueprint-diagram">
              {["01 / QUESTION", "02 / CONTEXT", "03 / INTERVENTION", "04 / SYSTEM", "05 / EVIDENCE", "06 / LEARNINGS", "07 / NEXT"].map((item, index) => <div key={item}><span>{item}</span><i style={{ width: `${44 + index * 7}%` }} /></div>)}
            </div>
            <div className="blueprint-copy"><h2>{language === "de" ? "Jede Projektseite erzählt nicht nur, was gebaut wurde – sondern warum, wie und was daraus gelernt wurde." : "Every project page explains not only what was built — but why, how and what was learned."}</h2><p>{language === "de" ? "Alle sechs Projekte sind bereits über dieses Seitensystem erreichbar. Inhalte können später pro Case erweitert werden, ohne die Dramaturgie neu zu erfinden." : "All six projects are already accessible through this page system. Each case can gain depth later without reinventing the narrative."}</p></div>
          </section>
        )}

        {renderFrame(13,
          <section className="candidate-evidence">
            <header><p>{language === "de" ? "EVIDENZ VOR SUPERLATIVEN" : "EVIDENCE BEFORE SUPERLATIVES"}</p><h2>{language === "de" ? "Proof heißt: zeigen, was tatsächlich geprüft werden kann." : "Proof means showing what can actually be verified."}</h2></header>
            <div className="evidence-grid">
              {[
                ["WORKING", language === "de" ? "Nutzbare Systeme" : "Usable systems", "Live product / prototype"],
                ["DEPTH", language === "de" ? "Technische Substanz" : "Technical substance", "Architecture / stack / decisions"],
                ["LEARNING", language === "de" ? "Offene Erkenntnisse" : "Open learnings", "Signals / failures / iterations"],
                ["OUTCOME", language === "de" ? "Messbare Wirkung" : "Measurable impact", language === "de" ? "Nur wenn belastbar belegt" : "Only when robustly evidenced"],
              ].map((item, index) => <div key={item[0]}><span>0{index + 1}</span><small>{item[0]}</small><h3>{item[1]}</h3><p>{item[2]}</p></div>)}
            </div>
          </section>
        )}

        {renderFrame(14,
          <section className="candidate-founder">
            <div className="candidate-founder__portrait"><img src={profilePortrait} alt="ShapeNeural Studio" /><span>STUDIO / OPERATOR</span></div>
            <div className="candidate-founder__copy"><p>{language === "de" ? "DIREKTER SENIOR-ZUGANG" : "DIRECT SENIOR ACCESS"}</p><h2>{language === "de" ? "Die Verantwortung bleibt von der Beratung bis zur Umsetzung durchgängig." : "Accountability remains continuous from advisory through implementation."}</h2><blockquote>{language === "de" ? "ShapeNeural verbindet Experience- und Transformationsarbeit mit einem agentisch verstärkten Produktstudio." : "ShapeNeural combines experience and transformation work with an agent-amplified product studio."}</blockquote><div><strong>ShapeNeural Studio</strong><span>AI & CX Strategy / Product / Venture Building</span><span>Frankfurt / Remote</span></div></div>
          </section>
        )}

        {renderFrame(15,
          <section className="candidate-signals">
            <div className="signal-orbit"><i /><i /><i /><i /><b>SN</b><span>LIVE SIGNALS</span></div>
            <div className="candidate-signals__copy"><p>RESEARCH LAYER</p><h2>{language === "de" ? "Das Lab bleibt die ungezähmte Seite des Studios." : "The Lab remains the untamed side of the studio."}</h2><p>{language === "de" ? "Die Cloud wird nicht als zweites Portfolio wiederholt. Sie zeigt Signale, Beobachtungen und offene Fragen – eine lebende Forschungsoberfläche, die belegt, wie ShapeNeural denkt." : "The cloud does not repeat the portfolio. It shows signals, observations and open questions — a living research surface that demonstrates how ShapeNeural thinks."}</p><Link to="/signals">{language === "de" ? "Signals Cloud öffnen" : "Open Signals Cloud"}<ExternalLink size={15} /></Link></div>
          </section>
        )}

        {renderFrame(16,
          <section className="candidate-principles">
            <header><p>{language === "de" ? "LEITPLANKEN" : "GUARDRAILS"}</p><h2>{language === "de" ? "Damit intelligente Systeme auch verantwortbare Systeme werden." : "So intelligent systems become accountable systems."}</h2></header>
            <div className="principle-list">
              {[
                ["01", language === "de" ? "Menschen entscheiden" : "Humans decide", language === "de" ? "Ziele, Freigaben und Ausnahmen haben eindeutige Verantwortliche." : "Intent, approvals and exceptions have explicit owners."],
                ["02", language === "de" ? "Systeme sind beobachtbar" : "Systems are observable", language === "de" ? "Qualität, Kosten und Verhalten werden nicht dem Bauchgefühl überlassen." : "Quality, cost and behaviour are not left to intuition."],
                ["03", language === "de" ? "Daten werden begrenzt" : "Data is bounded", language === "de" ? "Nur notwendige Daten, klare Zugriffe und passende technische Grenzen." : "Only necessary data, clear access and fitting technical boundaries."],
                ["04", language === "de" ? "Wissen wird übergeben" : "Knowledge is transferred", language === "de" ? "Dokumentation und Kompetenz gehören zum Ergebnis, nicht zum Nachtrag." : "Documentation and capability are part of the outcome, not an afterthought."],
              ].map((item) => <div key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><Minus /></div>)}
            </div>
          </section>
        )}

        {renderFrame(17,
          <section className="candidate-cta">
            <p>{language === "de" ? "KLEIN ANFANGEN. SUBSTANZIELL WEITERBAUEN." : "START SMALL. BUILD SOMETHING SUBSTANTIAL."}</p>
            <h2>{language === "de" ? "Womit sollen wir beginnen?" : "Where should we begin?"}</h2>
            <div className="cta-paths"><a href="mailto:signal@shapeneural.com?subject=Focus%20Day"><span>01</span><strong>Focus Day</strong><small>{language === "de" ? "Eine wichtige Entscheidung klären" : "Clarify one important decision"}</small><ArrowRight /></a><a href="mailto:signal@shapeneural.com?subject=Prototype%20Sprint"><span>02</span><strong>Prototype Sprint</strong><small>{language === "de" ? "Etwas Reales testbar machen" : "Make something real and testable"}</small><ArrowRight /></a><a href="mailto:signal@shapeneural.com?subject=Embedded%20Studio"><span>03</span><strong>Embedded Studio</strong><small>{language === "de" ? "KI verlässlich in Betrieb bringen" : "Put AI into reliable operation"}</small><ArrowRight /></a></div>
            <footer><BindruneLogo size={36} onDark /><span>SHAPENEURAL® / FRANKFURT / REMOTE</span><a href="mailto:signal@shapeneural.com">signal@shapeneural.com</a></footer>
          </section>
        )}
      </main>

      <aside className="ml-selection-dock" aria-live="polite"><span>{selected.length}</span><p>{language === "de" ? "Module für die nächste Runde markiert" : "modules marked for the next round"}</p>{selected.length > 0 && <div>{[...selected].sort().map((item) => <a href={`#module-${item}`} key={item}>{item}</a>)}</div>}</aside>
    </div>
  );
}

export default ModuleLibrary;
