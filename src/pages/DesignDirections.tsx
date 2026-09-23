import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, ExternalLink, Languages, Menu, Sparkles, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import BindruneLogo from "@/components/BindruneLogo";
import problaimImg from "@/assets/problaim-screenshot.png";
import sapientshiftImg from "@/assets/sapientshift-screenshot.png";
import humancryptoImg from "@/assets/humancrypto-screenshot.png";
import profilePortrait from "@/assets/profile-portrait.png";
import "@/design-directions.css";

type Direction = "hybrid" | "precision" | "systems" | "independent";
type Language = "de" | "en";

const copy = {
  de: {
    review: "Design-Review",
    preview: "Konzeptvorschau",
    language: "Sprache wechseln",
    menu: "Menü",
    close: "Menü schließen",
    nav: ["Leistungen", "Produkte", "Arbeitsweise", "Studio"],
    talk: "Projekt besprechen",
    eyebrow: "KI-Venture- & Transformationsstudio · Frankfurt",
    precisionHeadline: "Wir bauen KI-Systeme, die aus Möglichkeiten Fortschritt machen.",
    precisionBody: "ShapeNeural verbindet Strategie, Produktentwicklung und laufenden Betrieb. Für kleine Unternehmen, Selbstständige und Teams, die KI nicht nur diskutieren, sondern sinnvoll einsetzen wollen.",
    systemsHeadline: "From intent to autonomous operation.",
    systemsBody: "Wir entwerfen, bauen und betreiben agentische Systeme – mit klarer menschlicher Verantwortung, messbaren Ergebnissen und echtem Wissenstransfer.",
    independentHeadline: "Große KI-Wirkung. Ohne großes Theater.",
    independentBody: "Ein unabhängiges KI-Studio für Menschen und Unternehmen, die eine klare Antwort, einen funktionierenden Prototyp oder einen langfristigen Umsetzungspartner brauchen.",
    explore: "Arbeiten ansehen",
    status: "Studio online",
    mode: "Human-led · Agent-operated",
    serviceLabel: "Vier Wege zur Zusammenarbeit",
    services: [
      ["01", "Klären", "Wir finden den KI-Hebel, der für Ihr Geschäft tatsächlich zählt."],
      ["02", "Bauen", "Vom ersten Prototyp bis zum belastbaren digitalen Produkt."],
      ["03", "Betreiben", "Agentische Workflows, überwacht und kontinuierlich verbessert."],
      ["04", "Befähigen", "Wissen, Systeme und Routinen, die in Ihrem Team bleiben."],
    ],
    workLabel: "Aus dem Studio",
    workTitle: "Produkte statt PowerPoints.",
    workBody: "Eigene Produkte sind unser Testfeld – und der Beweis, dass wir Strategie in funktionierende Systeme übersetzen.",
    projects: [
      ["PROBLAIM", "Decision Intelligence", "Komplexe Probleme systematisch zerlegen und weiterdenken."],
      ["SAPIENTSHIFT", "AI Potential", "KI-Potenziale für Unternehmen und Menschen konkret machen."],
      ["HUMANCRYP.TO", "Exploration / Archive", "Komplexe Technologie durch Figuren und Geschichten erklären."],
    ],
    systemLabel: "SHAPENEURAL / OPERATING SYSTEM",
    systemSteps: ["UNDERSTAND", "DESIGN", "BUILD", "OPERATE", "TRANSFER"],
    systemCopy: "Ein Studio, das selbst mit Agenten arbeitet – und Verantwortung nicht an sie abgibt.",
    systemsServices: [
      ["ADVISORY", "Von diffuser Idee zu einer belastbaren KI-Roadmap."],
      ["BUILD", "Produkt, Workflow oder Agentensystem in die Realität bringen."],
      ["OPERATE", "Systeme zuverlässig betreiben und mit der Nutzung verbessern."],
      ["ENABLE", "Teams befähigen, mit KI selbständig weiterzuarbeiten."],
    ],
    accessible: "Einstieg ab einem fokussierten Arbeitstag",
    independentLabel: "Strategie · Produkte · Systeme",
    independentWork: "Was können wir für Sie möglich machen?",
    independentCards: [
      ["Ein Problem verstehen", "Klarheit über den sinnvollsten KI-Hebel und den nächsten belastbaren Schritt.", "Sparring / Discovery"],
      ["Etwas Echtes bauen", "Ein Prototyp, Produkt oder Workflow, den Menschen wirklich nutzen können.", "Prototype Sprint"],
      ["KI dauerhaft einsetzen", "Ein verlässliches System – inklusive Betrieb, Kontrolle und Verbesserung.", "Embedded Studio"],
      ["Selbständig weiterkommen", "Wissen, Werkzeuge und Routinen, die nach der Zusammenarbeit im Team bleiben.", "Enablement / Übergabe"],
    ],
    proof: "Gebaut bei ShapeNeural",
    notePrecision: "Maximale Glaubwürdigkeit · hochwertige Beratung · klare Produktbeweise",
    noteSystems: "Stärkste Technologiepositionierung · agentisch · ambitioniert",
    noteIndependent: "Zugänglichste Richtung · eigenständig · nahbar und unverwechselbar",
    independentMethodLabel: "So wird aus einer Idee ein funktionierendes System",
    independentMethodTitle: "Menschen geben Richtung. Agenten geben Hebel.",
    independentMethodBody: "Wir nutzen Agenten für Recherche, Produktion und Routine – aber nicht als Ausrede. Ziele, Entscheidungen, Qualitätskontrolle und Verantwortung bleiben klar menschlich.",
    independentSteps: [
      ["UNDERSTAND", "Ziel, Kontext und Grenzen klären", "Recherche und Muster verdichten"],
      ["DESIGN", "Entscheidungen und Erfahrung formen", "Varianten und Risiken simulieren"],
      ["BUILD", "Prioritäten und Qualität führen", "Code, Inhalte und Tests beschleunigen"],
      ["OPERATE", "Freigaben und Verantwortung halten", "Routine überwachen und verbessern"],
      ["TRANSFER", "Kompetenz im Team verankern", "Wissen strukturiert übergeben"],
    ],
    independentStudioTitle: "Unabhängig im Denken. Verbindlich in der Umsetzung.",
    independentStudioBody: "ShapeNeural verbindet Design, Strategie, Produktdenken und angewandte KI. Klein genug für direkte Zusammenarbeit – systemisch genug, um komplexe Vorhaben zu tragen.",
    independentStudioMeta: "Ufuk Avci · Founder / AI & CX Strategy · Frankfurt",
    independentLabTitle: "Die ungezähmte Seite von ShapeNeural.",
    independentLabBody: "Im Lab werden Signale gesammelt, Ideen befragt und Experimente öffentlich gemacht. Wolke, Insights und Oracle bleiben als eigenständiges Erlebnis erhalten – jetzt in derselben Coral-, Neon- und Cobalt-Farbwelt.",
    independentLabCta: "Lab betreten",
    independentContactTitle: "Vielleicht beginnt es mit einer einzigen guten Frage.",
    independentContactBody: "Kein großes Transformationsprogramm nötig. Wir können mit einem fokussierten Arbeitstag starten und nur dann weiterbauen, wenn es Substanz gibt.",
    independentRibbon: "DENKEN / BAUEN / BETREIBEN / BEFÄHIGEN /",
    independentPrinciples: ["UNABHÄNGIG / MENSCHLICH GEFÜHRT", "PRODUKTE IM EIGENEN STUDIO", "FRANKFURT / REMOTE"],
    independentOperatingModel: "SN / BETRIEBSMODELL",
    independentOversight: "MENSCHLICHE KONTROLLE",
    independentHuman: "MENSCH",
    independentAgent: "AGENT",
    independentFounder: "GRÜNDER / OPERATOR",
    independentContactLabel: "GESPRÄCH BEGINNEN",
    independentFooter: "UNABHÄNGIGES KI-STUDIO · FRANKFURT",
    hybridHeadline: "Wir machen aus KI einen funktionierenden Teil Ihres Geschäfts.",
    hybridBody: "ShapeNeural klärt, baut und betreibt KI-Produkte und agentische Workflows – vom fokussierten Einstieg bis zur langfristigen Partnerschaft.",
    hybridProof: "Strategie, Umsetzung und Betrieb aus einem Studio.",
    hybridAudience: "Für kleine Unternehmen, Selbstständige und Teams im Wandel.",
    hybridNav: ["Leistungen", "Projekte", "Arbeitsweise", "Studio"],
    hybridMethod: "Unser Betriebssystem",
    hybridMethodTitle: "Menschlich geführt. Agentisch verstärkt.",
    hybridMethodBody: "Agenten übernehmen Recherche, Produktion und Routine. Entscheidungen, Qualitätskontrolle und Verantwortung bleiben klar beim Menschen.",
    hybridWorkTitle: "Was wir selbst bauen, prägt wie wir für andere arbeiten.",
    labEyebrow: "SHAPENEURAL / LAB",
    labTitle: "Der explorative Kern bleibt unangetastet.",
    labBody: "Wolke, Insights und Interrogation bekommen eine eigene Adresse und behalten ihre radikale CRT-Identität. Das Lab ist kein Nebenraum: Es zeigt, wie wir denken, forschen und neue Möglichkeiten testen.",
    labCta: "Aktuelles Lab öffnen",
    labPreserved: "WOLKE + INSIGHTS + ORACLE / 1:1 ERHALTEN",
    engagement: "Klein anfangen. Substanziell weiterbauen.",
    engagementBody: "Ein Arbeitstag für Klarheit, ein Sprint für einen Prototyp oder ein dauerhaftes Studio-Setup – der Einstieg richtet sich nach dem Problem, nicht nach der Unternehmensgröße.",
    noteHybrid: "Empfehlung · glaubwürdig + agentisch + zugänglich · Lab als eigenständige Welt",
  },
  en: {
    review: "Design review",
    preview: "Concept preview",
    language: "Change language",
    menu: "Menu",
    close: "Close menu",
    nav: ["Services", "Products", "How we work", "Studio"],
    talk: "Discuss a project",
    eyebrow: "AI venture & transformation studio · Frankfurt",
    precisionHeadline: "We build AI systems that turn possibility into progress.",
    precisionBody: "ShapeNeural combines strategy, product development and ongoing operations. For small businesses, independents and teams that want to put AI to meaningful work.",
    systemsHeadline: "From intent to autonomous operation.",
    systemsBody: "We design, build and operate agentic systems — with clear human accountability, measurable outcomes and real knowledge transfer.",
    independentHeadline: "Serious AI impact. Without the theatre.",
    independentBody: "An independent AI studio for people and companies that need a clear answer, a working prototype or a long-term implementation partner.",
    explore: "Explore our work",
    status: "Studio online",
    mode: "Human-led · Agent-operated",
    serviceLabel: "Four ways to work together",
    services: [
      ["01", "Clarify", "Find the AI leverage that genuinely matters to your business."],
      ["02", "Build", "From first prototype to a robust digital product."],
      ["03", "Operate", "Agentic workflows, supervised and continuously improved."],
      ["04", "Enable", "Knowledge, systems and routines that stay with your team."],
    ],
    workLabel: "From the studio",
    workTitle: "Products, not PowerPoints.",
    workBody: "Our own products are our testing ground — and proof that we translate strategy into working systems.",
    projects: [
      ["PROBLAIM", "Decision Intelligence", "Decompose complex problems and move the thinking forward."],
      ["SAPIENTSHIFT", "AI Potential", "Make AI potential concrete for companies and people."],
      ["HUMANCRYP.TO", "Exploration / Archive", "Explain complex technology through characters and stories."],
    ],
    systemLabel: "SHAPENEURAL / OPERATING SYSTEM",
    systemSteps: ["UNDERSTAND", "DESIGN", "BUILD", "OPERATE", "TRANSFER"],
    systemCopy: "A studio that works with agents — without handing responsibility over to them.",
    systemsServices: [
      ["ADVISORY", "Turn a diffuse idea into a viable AI roadmap."],
      ["BUILD", "Bring a product, workflow or agent system into reality."],
      ["OPERATE", "Run systems reliably and improve them through use."],
      ["ENABLE", "Enable teams to keep working with AI independently."],
    ],
    accessible: "Start with one focused working day",
    independentLabel: "Strategy · Products · Systems",
    independentWork: "What can we make possible for you?",
    independentCards: [
      ["Understand a problem", "Clarity on the AI leverage that matters and the next viable move.", "Sparring / Discovery"],
      ["Build something real", "A prototype, product or workflow people can actually use.", "Prototype sprint"],
      ["Put AI to work", "A reliable system — including operations, control and improvement.", "Embedded studio"],
      ["Keep moving independently", "Knowledge, tools and routines that stay with your team after the engagement.", "Enablement / Handover"],
    ],
    proof: "Built at ShapeNeural",
    notePrecision: "Maximum credibility · premium advisory · clear product proof",
    noteSystems: "Strongest technology position · agentic · ambitious",
    noteIndependent: "Most accessible direction · independent · human and distinctive",
    independentMethodLabel: "How an idea becomes a working system",
    independentMethodTitle: "Humans set direction. Agents create leverage.",
    independentMethodBody: "We use agents for research, production and routine — never as an excuse. Goals, decisions, quality control and accountability remain clearly human.",
    independentSteps: [
      ["UNDERSTAND", "Clarify intent, context and boundaries", "Condense research and patterns"],
      ["DESIGN", "Shape decisions and experience", "Simulate variants and risks"],
      ["BUILD", "Lead priorities and quality", "Accelerate code, content and tests"],
      ["OPERATE", "Hold approvals and accountability", "Monitor and improve routine"],
      ["TRANSFER", "Anchor capability in the team", "Hand knowledge over systematically"],
    ],
    independentStudioTitle: "Independent in thought. Accountable in delivery.",
    independentStudioBody: "ShapeNeural combines design, strategy, product thinking and applied AI. Small enough for direct collaboration — systemic enough to carry complex work.",
    independentStudioMeta: "Ufuk Avci · Founder / AI & CX Strategy · Frankfurt",
    independentLabTitle: "The untamed side of ShapeNeural.",
    independentLabBody: "The Lab collects signals, interrogates ideas and makes experiments public. Cloud, insights and Oracle remain their own experience — now in the same coral, neon and cobalt colour world.",
    independentLabCta: "Enter the Lab",
    independentContactTitle: "Maybe it starts with one good question.",
    independentContactBody: "No grand transformation programme required. We can begin with one focused working day and only keep building when there is real substance.",
    independentRibbon: "THINK / BUILD / RUN / TEACH /",
    independentPrinciples: ["INDEPENDENT / HUMAN-LED", "PRODUCTS BUILT IN-HOUSE", "FRANKFURT / REMOTE"],
    independentOperatingModel: "SN / OPERATING MODEL",
    independentOversight: "HUMAN OVERSIGHT",
    independentHuman: "HUMAN",
    independentAgent: "AGENT",
    independentFounder: "FOUNDER / OPERATOR",
    independentContactLabel: "START A CONVERSATION",
    independentFooter: "INDEPENDENT AI STUDIO · FRANKFURT",
    hybridHeadline: "We make AI a working part of your business.",
    hybridBody: "ShapeNeural clarifies, builds and operates AI products and agentic workflows — from a focused first step to a long-term partnership.",
    hybridProof: "Strategy, delivery and operations from one studio.",
    hybridAudience: "For small businesses, independents and teams in transition.",
    hybridNav: ["Services", "Work", "How we work", "Studio"],
    hybridMethod: "Our operating system",
    hybridMethodTitle: "Human-led. Agent-amplified.",
    hybridMethodBody: "Agents handle research, production and routine. Decisions, quality control and accountability remain clearly human.",
    hybridWorkTitle: "What we build for ourselves shapes how we work for others.",
    labEyebrow: "SHAPENEURAL / LAB",
    labTitle: "The exploratory core stays intact.",
    labBody: "Cloud, insights and interrogation get their own address and retain their radical CRT identity. The Lab is not a side room: it shows how we think, research and test new possibilities.",
    labCta: "Open the current Lab",
    labPreserved: "CLOUD + INSIGHTS + ORACLE / PRESERVED 1:1",
    engagement: "Start small. Build something substantial.",
    engagementBody: "One working day for clarity, a sprint for a prototype or an ongoing studio setup — the entry point follows the problem, not the size of the company.",
    noteHybrid: "Recommendation · credible + agentic + accessible · Lab as its own world",
  },
} as const;

const directionLabels: Record<Direction, { index: string; title: string; short: string }> = {
  hybrid: { index: "00", title: "Recommended Hybrid", short: "Hybrid" },
  precision: { index: "01", title: "Precision Studio", short: "Precision" },
  systems: { index: "02", title: "Autonomous Systems", short: "Systems" },
  independent: { index: "03", title: "Independent Intelligence", short: "Independent" },
};

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`dd-brand ${inverse ? "dd-brand--inverse" : ""}`} aria-label="ShapeNeural">
      <span className="dd-brand__glyph" aria-hidden="true">S/N</span>
      <span>SHAPE<br />NEURAL</span>
    </div>
  );
}

function HybridHeader({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  return (
    <header className="hybrid-header">
      <a className="hybrid-logo" href="#hybrid-top" aria-label="ShapeNeural home">
        <BindruneLogo size={34} onDark={false} />
        <span>SHAPE<br />NEURAL</span>
      </a>
      <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
        {t.hybridNav.map((item, index) => (
          <a href={index === 0 ? "#hybrid-services" : index === 1 ? "#hybrid-work" : "#hybrid-method"} key={item}>{item}</a>
        ))}
        <a className="hybrid-lab-link" href="#hybrid-lab">LAB <span>↘</span></a>
        <a className="hybrid-header-cta" href="mailto:signal@shapeneural.com">{t.talk}<ArrowRight size={15} /></a>
      </nav>
      <button
        type="button"
        className="dd-menu hybrid-menu"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t.close : t.menu}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function HybridDirection({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <main className="dd-page dd-hybrid" id="hybrid-top">
      <HybridHeader language={language} />

      <section className="hybrid-hero">
        <div className="hybrid-hero__copy">
          <p className="dd-eyebrow"><i />{t.eyebrow}</p>
          <h1>{t.hybridHeadline}</h1>
          <div className="hybrid-hero__intro">
            <p>{t.hybridBody}</p>
            <div className="hybrid-actions">
              <a href="mailto:signal@shapeneural.com">{t.talk}<ArrowRight size={17} /></a>
              <a href="#hybrid-work">{t.explore}<ArrowDown size={16} /></a>
            </div>
          </div>
        </div>

        <aside className="hybrid-console" id="hybrid-system" aria-label="ShapeNeural operating system">
          <div className="hybrid-console__top"><span>SN / OPERATING SYSTEM</span><span><i />LIVE</span></div>
          <div className="hybrid-console__visual">
            <div className="hybrid-console__orbit orbit-a" />
            <div className="hybrid-console__orbit orbit-b" />
            <div className="hybrid-console__logo" aria-hidden="true"><BindruneLogo size={72} onDark /></div>
            <span className="hybrid-console__node node-a">STRATEGY</span>
            <span className="hybrid-console__node node-b">BUILD</span>
            <span className="hybrid-console__node node-c">OPERATE</span>
            <span className="hybrid-console__node node-d">ENABLE</span>
          </div>
          <div className="hybrid-console__foot"><span>HUMAN OVERSIGHT</span><strong>ACTIVE</strong></div>
        </aside>
      </section>

      <section className="hybrid-proofline">
        <span>{t.hybridProof}</span><span>{t.hybridAudience}</span><span>FRANKFURT / REMOTE</span>
      </section>

      <section className="hybrid-services" id="hybrid-services">
        <header><p className="dd-section-label">{t.serviceLabel}</p><h2>{t.engagement}</h2><p>{t.engagementBody}</p></header>
        <div className="hybrid-services__grid">
          {t.services.map(([number, title, body]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p><ArrowRight size={18} /></article>
          ))}
        </div>
      </section>

      <section className="hybrid-method" id="hybrid-method">
        <div className="hybrid-method__intro">
          <p className="dd-section-label">02 / {t.hybridMethod}</p>
          <h2>{t.hybridMethodTitle}</h2>
          <p>{t.hybridMethodBody}</p>
        </div>
        <div className="hybrid-method__flow" aria-label="ShapeNeural process">
          {t.systemSteps.map((step, index) => (
            <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < t.systemSteps.length - 1 && <i />}</div>
          ))}
        </div>
      </section>

      <section className="hybrid-work" id="hybrid-work">
        <header><p className="dd-section-label">03 / {t.workLabel}</p><h2>{t.hybridWorkTitle}</h2><p>{t.workBody}</p></header>
        <div className="hybrid-projects">
          {t.projects.slice(0, 2).map(([title, category, body], index) => {
            const images = [problaimImg, sapientshiftImg];
            return (
              <article key={title}>
                <div><img src={images[index]} alt={`${title} project preview`} /><span>0{index + 1}</span></div>
                <small>{category}</small><h3>{title}</h3><p>{body}</p><a href="#hybrid-work" aria-label={`${title} details`}><ArrowRight /></a>
              </article>
            );
          })}
          <aside className="hybrid-projects__index">
            <p>PRODUCT / RESEARCH / FIELDWORK</p>
            <ul><li>SAPIENTBLOCK <span>FLAGSHIP</span></li><li>VENIORA <span>PUBLIC AI</span></li><li>MELODEYE <span>LAB</span></li></ul>
          </aside>
        </div>
      </section>

      <section className="hybrid-lab" id="hybrid-lab">
        <div className="hybrid-lab__scan" aria-hidden="true" />
        <div className="hybrid-lab__copy">
          <p>{t.labEyebrow}</p>
          <h2>{t.labTitle}</h2>
          <p>{t.labBody}</p>
          <a href="/lab">{t.labCta}<ExternalLink size={16} /></a>
        </div>
        <div className="hybrid-lab__portal" aria-label="Preview of the ShapeNeural Lab">
          <div className="hybrid-lab__status"><span>SYS ● [SN_LAB]</span><span>ONLINE</span></div>
          <div className="hybrid-lab__cloud">
            <span className="cloud-a">HUMAN POTENTIAL</span><span className="cloud-b">DESIGNED INTELLIGENCE</span>
            <span className="cloud-c">AGENTIC SYSTEMS</span><span className="cloud-d">EMOTION</span>
            <span className="cloud-e">FUTURE OF WORK</span><span className="cloud-f">INTERROGATE →</span>
          </div>
          <div className="hybrid-lab__preserved">{t.labPreserved}</div>
        </div>
      </section>

      <ConceptNote label="00" text={t.noteHybrid} />
    </main>
  );
}

function ReviewBar({
  direction,
  setDirection,
  language,
  setLanguage,
}: {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  const t = copy[language];
  return (
    <aside className="dd-reviewbar" aria-label={t.review}>
      <div className="dd-reviewbar__title">
        <Sparkles size={15} aria-hidden="true" />
        <span>SHAPENEURAL / {t.review}</span>
      </div>
      <div className="dd-reviewbar__directions" role="tablist" aria-label={t.preview}>
        {(Object.keys(directionLabels) as Direction[]).map((key) => (
          <button
            type="button"
            role="tab"
            aria-selected={direction === key}
            className={direction === key ? "is-active" : ""}
            onClick={() => setDirection(key)}
            key={key}
          >
            <span>{directionLabels[key].index}</span>
            <b className="dd-direction-name">{directionLabels[key].title}</b>
            <b className="dd-direction-short">{directionLabels[key].short}</b>
          </button>
        ))}
      </div>
      <button
        className="dd-language"
        type="button"
        aria-label={t.language}
        onClick={() => setLanguage(language === "de" ? "en" : "de")}
      >
        <Languages size={15} aria-hidden="true" /> {language === "de" ? "EN" : "DE"}
      </button>
    </aside>
  );
}

function SiteHeader({ language, inverse = false }: { language: Language; inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  return (
    <header className={`dd-site-header ${inverse ? "dd-site-header--inverse" : ""}`}>
      <BrandMark inverse={inverse} />
      <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
        {t.nav.map((item) => <a href="#services" key={item}>{item}</a>)}
        <a className="dd-header-cta" href="mailto:signal@shapeneural.com">{t.talk}<ArrowRight size={15} /></a>
      </nav>
      <button
        type="button"
        className="dd-menu"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t.close : t.menu}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function PrecisionDirection({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <main className="dd-page dd-precision">
      <SiteHeader language={language} />
      <section className="precision-hero">
        <div className="precision-hero__copy">
          <p className="dd-eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.precisionHeadline}</h1>
          <div className="precision-hero__bottom">
            <p>{t.precisionBody}</p>
            <a href="#precision-services">{t.explore}<ArrowDown size={18} /></a>
          </div>
        </div>
        <div className="precision-hero__visual" aria-label="ShapeNeural working model">
          <div className="precision-orbit precision-orbit--one" />
          <div className="precision-orbit precision-orbit--two" />
          <div className="precision-core"><span>S/N</span><small>INTELLIGENCE<br />IN MOTION</small></div>
          <span className="precision-node precision-node--a">STRATEGY</span>
          <span className="precision-node precision-node--b">PRODUCT</span>
          <span className="precision-node precision-node--c">OPERATIONS</span>
        </div>
      </section>

      <section className="precision-trust" aria-label="Studio facts">
        <span><i />{t.status}</span><span>FRANKFURT / REMOTE</span><span>{t.mode}</span>
      </section>

      <section className="precision-services" id="precision-services">
        <p className="dd-section-label">{t.serviceLabel}</p>
        <div className="precision-services__grid">
          {t.services.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span><h2>{title}</h2><p>{body}</p><ArrowRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="precision-work">
        <div>
          <p className="dd-section-label">{t.workLabel}</p>
          <h2>{t.workTitle}</h2>
          <p>{t.workBody}</p>
        </div>
        <article>
          <img src={problaimImg} alt="PROBLAIM product interface" />
          <div><span>01 / PRODUCT</span><strong>PROBLAIM</strong><small>DECISION INTELLIGENCE</small></div>
        </article>
      </section>
      <ConceptNote label="01" text={t.notePrecision} />
    </main>
  );
}

function SystemsDirection({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <main className="dd-page dd-systems">
      <SiteHeader language={language} inverse />
      <section className="systems-hero">
        <div className="systems-signal-line"><span>{t.systemLabel}</span><span><i />{t.status.toUpperCase()}</span></div>
        <div className="systems-hero__copy">
          <p className="dd-eyebrow">{t.eyebrow}</p>
          <h1>{t.systemsHeadline}</h1>
          <p>{t.systemsBody}</p>
          <div className="systems-actions">
            <a href="mailto:signal@shapeneural.com">{t.talk}<ArrowRight size={17} /></a>
            <a href="#systems-model">{t.explore}</a>
          </div>
        </div>
        <div className="systems-map" aria-label="Agentic operating model visualization">
          <div className="systems-map__ring systems-map__ring--outer" />
          <div className="systems-map__ring systems-map__ring--inner" />
          <div className="systems-map__core"><strong>SN</strong><span>CONTROL<br />LAYER</span></div>
          {t.systemSteps.map((step, index) => <span className={`systems-map__node node-${index + 1}`} key={step}>{step}</span>)}
          <div className="systems-map__metric metric-a"><span>ACTIVE SYSTEMS</span><strong>07</strong></div>
          <div className="systems-map__metric metric-b"><span>HUMAN OVERSIGHT</span><strong>ON</strong></div>
        </div>
      </section>

      <section className="systems-model" id="systems-model">
        <header><span>01 / CAPABILITIES</span><h2>{t.systemCopy}</h2></header>
        <div className="systems-model__grid">
          {t.systemsServices.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p><small>→ MODULE AVAILABLE</small></article>
          ))}
        </div>
      </section>

      <section className="systems-work">
        <div className="systems-work__head"><span>02 / DEPLOYED THINKING</span><strong>{t.proof}</strong></div>
        <div className="systems-work__grid">
          <article><img src={problaimImg} alt="PROBLAIM product interface" /><div><b>PROBLAIM</b><span>DECISION SYSTEM / BETA</span></div></article>
          <article><img src={sapientshiftImg} alt="SapientShift product interface" /><div><b>SAPIENTSHIFT</b><span>POTENTIAL SYSTEM / BETA</span></div></article>
        </div>
      </section>
      <ConceptNote label="02" text={t.noteSystems} />
    </main>
  );
}

function IndependentHeader({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const items = [
    [t.nav[0], "#independent-services"],
    [t.nav[1], "#independent-work"],
    [t.nav[2], "#independent-method"],
    [t.nav[3], "#independent-studio"],
  ];

  return (
    <header className="independent-header">
      <a className="independent-logo" href="#independent-top" aria-label={language === "de" ? "ShapeNeural Startseite" : "ShapeNeural home"} onClick={() => setMenuOpen(false)}>
        <BindruneLogo size={34} onDark={false} />
        <span>SHAPE<br />NEURAL</span>
      </a>
      <nav className={menuOpen ? "is-open" : ""} aria-label={language === "de" ? "Hauptnavigation" : "Primary navigation"}>
        {items.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="independent-header__lab" href="#independent-lab" onClick={() => setMenuOpen(false)}>LAB <span>↘</span></a>
        <a className="independent-header__cta" href="#independent-contact" onClick={() => setMenuOpen(false)}>{t.talk}<ArrowRight size={15} /></a>
      </nav>
      <button
        type="button"
        className="dd-menu independent-menu"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t.close : t.menu}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function IndependentDirection({ language }: { language: Language }) {
  const t = copy[language];
  const projectImages = [problaimImg, sapientshiftImg, humancryptoImg];
  const projectUrls = ["https://problaim.com", "https://sapientshift.com", "https://humancryp.to"];
  const projectSignals = language === "de"
    ? ["MULTI-MODELL-ANALYSE / BETA", "318 KURATIERTE USE CASES / BETA", "STORY-LED EDUCATION / ARCHIV"]
    : ["MULTI-MODEL ANALYSIS / BETA", "318 CURATED USE CASES / BETA", "STORY-LED EDUCATION / ARCHIVE"];

  return (
    <main className="dd-page dd-independent" id="independent-top">
      <IndependentHeader language={language} />

      <section className="independent-hero">
        <div className="independent-hero__main">
          <p className="dd-eyebrow">{t.independentLabel}</p>
          <h1>{t.independentHeadline}</h1>
          <p>{t.independentBody}</p>
          <div className="independent-hero__actions">
            <a href="#independent-contact">{t.talk}<ArrowRight size={18} /></a>
            <a href="#independent-work">{t.explore}<ArrowDown size={17} /></a>
          </div>
        </div>
        <div className="independent-hero__aside">
          <div className="independent-stamp">
            <BindruneLogo size={100} onDark showRed />
            <small>INDEPENDENT AI STUDIO<br />FRANKFURT / REMOTE</small>
          </div>
          <p>{t.accessible}</p>
        </div>
        <div className="independent-ribbon" aria-hidden="true"><span>{t.independentRibbon}</span><span>{t.independentRibbon}</span></div>
      </section>

      <section className="independent-proof" aria-label={language === "de" ? "Studio-Prinzipien" : "Studio principles"}>
        {t.independentPrinciples.map((principle) => <span key={principle}>{principle}</span>)}
      </section>

      <section className="independent-services" id="independent-services">
        <header><p className="dd-section-label">01 / {t.serviceLabel}</p><h2>{t.independentWork}</h2></header>
        <div>
          {t.independentCards.map(([title, body, format], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><div><p>{body}</p><small>{format}</small></div><a href="#independent-contact" aria-label={`${title} — ${t.talk}`}><ArrowRight /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="independent-work" id="independent-work">
        <header><span>02 / {t.proof}</span><h2>{t.workTitle}</h2><p>{t.workBody}</p></header>
        <div className="independent-projects">
          {t.projects.map(([title, category, body], index) => (
            <article key={title} className={index === 0 ? "is-featured" : ""}>
              <a className="independent-projects__image" href={projectUrls[index]} target="_blank" rel="noreferrer">
                <img src={projectImages[index]} alt={language === "de" ? `${title} Projektvorschau` : `${title} project preview`} />
                <span>0{index + 1}</span>
              </a>
              <small>{category}</small><h3>{title}</h3><p>{body}</p>
              <div className="independent-projects__signal"><span>{projectSignals[index]}</span><a href={projectUrls[index]} target="_blank" rel="noreferrer" aria-label={`${title} Website`}><ExternalLink /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="independent-system" id="independent-method">
        <div className="independent-system__copy">
          <p className="dd-section-label">03 / {t.independentMethodLabel}</p>
          <h2>{t.independentMethodTitle}</h2>
          <p>{t.independentMethodBody}</p>
        </div>
        <div className="independent-system__panel">
          <div className="independent-system__panel-head"><span>{t.independentOperatingModel}</span><span><i />{t.independentOversight}</span></div>
          {t.independentSteps.map(([step, human, agent], index) => (
            <article key={step}>
              <span>0{index + 1}</span><h3>{step}</h3>
              <div><small>{t.independentHuman}</small><p>{human}</p></div>
              <div><small>{t.independentAgent}</small><p>{agent}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="independent-studio" id="independent-studio">
        <div className="independent-studio__portrait"><img src={profilePortrait} alt={language === "de" ? "Ufuk Avci, Gründer von ShapeNeural" : "Ufuk Avci, founder of ShapeNeural"} /><span>{t.independentFounder}</span></div>
        <div className="independent-studio__copy">
          <p className="dd-section-label">04 / SHAPENEURAL STUDIO</p>
          <h2>{t.independentStudioTitle}</h2>
          <p>{t.independentStudioBody}</p>
          <small>{t.independentStudioMeta}</small>
        </div>
      </section>

      <section className="independent-lab" id="independent-lab">
        <div className="independent-lab__scan" aria-hidden="true" />
        <div className="independent-lab__copy">
          <p>05 / SHAPENEURAL_LAB</p>
          <h2>{t.independentLabTitle}</h2>
          <p>{t.independentLabBody}</p>
          <a href="/lab">{t.independentLabCta}<ArrowRight size={17} /></a>
        </div>
        <div className="independent-lab__terminal" aria-hidden="true">
          <div className="independent-lab__status"><span>SYS ● [SN_LAB_V2]</span><span>LIVE</span></div>
          <div className="independent-lab__mark" aria-hidden="true"><BindruneLogo size={82} onDark showRed /></div>
          <div className="independent-lab__signals">
            <span className="signal-red">INTERROGATE</span><span className="signal-green">LIVE DATA CLOUD</span>
            <span className="signal-blue">DESIGNED INTELLIGENCE</span><span className="signal-purple">FUTURE OF WORK</span>
            <span className="signal-white">HUMAN POTENTIAL</span>
          </div>
          <div className="independent-lab__modes"><span>WOLKE</span><span>INSIGHTS</span><span>ORACLE</span></div>
        </div>
      </section>

      <section className="independent-contact" id="independent-contact">
        <p className="dd-section-label">06 / {t.independentContactLabel}</p>
        <h2>{t.independentContactTitle}</h2>
        <div><p>{t.independentContactBody}</p><a href="mailto:signal@shapeneural.com">signal@shapeneural.com<ArrowRight /></a></div>
      </section>

      <footer className="independent-footer">
        <div className="independent-logo independent-logo--footer"><BindruneLogo size={30} onDark /><span>SHAPE<br />NEURAL</span></div>
        <span>{t.independentFooter}</span><span>DE / EN</span>
      </footer>
      <ConceptNote label="03" text={t.noteIndependent} />
    </main>
  );
}

function ConceptNote({ label, text }: { label: string; text: string }) {
  return (
    <footer className="dd-concept-note">
      <span><Check size={15} /> DIRECTION {label}</span>
      <p>{text}</p>
    </footer>
  );
}

export default function DesignDirections() {
  const [direction, setDirection] = useState<Direction>("independent");
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [direction]);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = language;
    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [language]);

  return (
    <div className="dd-shell">
      <Helmet>
        <title>ShapeNeural — Design Directions</title>
        <meta name="description" content="Strategic design directions for the future ShapeNeural studio." />
      </Helmet>
      <ReviewBar
        direction={direction}
        setDirection={setDirection}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="dd-preview" key={direction}>
        {direction === "hybrid" && <HybridDirection language={language} />}
        {direction === "precision" && <PrecisionDirection language={language} />}
        {direction === "systems" && <SystemsDirection language={language} />}
        {direction === "independent" && <IndependentDirection language={language} />}
      </div>
    </div>
  );
}
