import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, Languages, Menu, Sparkles, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import problaimImg from "@/assets/problaim-screenshot.png";
import sapientshiftImg from "@/assets/sapientshift-screenshot.png";
import humancryptoImg from "@/assets/humancrypto-screenshot.png";
import "@/design-directions.css";

type Direction = "precision" | "systems" | "independent";
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
      ["Ein Problem verstehen", "Klarheit in einem fokussierten Sparring oder Discovery Sprint."],
      ["Etwas Echtes bauen", "Ein Prototyp, Produkt oder Workflow, den Menschen wirklich nutzen können."],
      ["KI dauerhaft einsetzen", "Ein verlässliches System – inklusive Betrieb, Kontrolle und Übergabe."],
    ],
    proof: "Gebaut bei ShapeNeural",
    notePrecision: "Maximale Glaubwürdigkeit · hochwertige Beratung · klare Produktbeweise",
    noteSystems: "Stärkste Technologiepositionierung · agentisch · ambitioniert",
    noteIndependent: "Zugänglichste Richtung · eigenständig · nahbar und unverwechselbar",
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
      ["Understand a problem", "Clarity through focused sparring or a discovery sprint."],
      ["Build something real", "A prototype, product or workflow people can actually use."],
      ["Put AI to work", "A reliable system — including operations, control and handover."],
    ],
    proof: "Built at ShapeNeural",
    notePrecision: "Maximum credibility · premium advisory · clear product proof",
    noteSystems: "Strongest technology position · agentic · ambitious",
    noteIndependent: "Most accessible direction · independent · human and distinctive",
  },
} as const;

const directionLabels: Record<Direction, { index: string; title: string; short: string }> = {
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

function IndependentDirection({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <main className="dd-page dd-independent">
      <SiteHeader language={language} />
      <section className="independent-hero">
        <div className="independent-hero__main">
          <p className="dd-eyebrow">{t.independentLabel}</p>
          <h1>{t.independentHeadline}</h1>
          <p>{t.independentBody}</p>
          <a href="mailto:signal@shapeneural.com">{t.talk}<ArrowRight size={18} /></a>
        </div>
        <div className="independent-hero__aside">
          <div className="independent-stamp"><span>SHAPE</span><strong>NEURAL</strong><small>AI STUDIO / FFM</small></div>
          <p>{t.accessible}</p>
        </div>
        <div className="independent-ribbon" aria-hidden="true"><span>THINK / BUILD / RUN / TEACH /</span><span>THINK / BUILD / RUN / TEACH /</span></div>
      </section>

      <section className="independent-services" id="services">
        <header><p className="dd-section-label">{t.serviceLabel}</p><h2>{t.independentWork}</h2></header>
        <div>
          {t.independentCards.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p><button type="button" aria-label={`${title} — details`}><ArrowRight /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="independent-work">
        <header><span>{t.proof}</span><h2>{t.workTitle}</h2><p>{t.workBody}</p></header>
        <div className="independent-projects">
          {t.projects.map(([title, category, body], index) => {
            const images = [problaimImg, sapientshiftImg, humancryptoImg];
            return (
              <article key={title}>
                <div className="independent-projects__image"><img src={images[index]} alt={`${title} project preview`} /><span>0{index + 1}</span></div>
                <small>{category}</small><h3>{title}</h3><p>{body}</p>
              </article>
            );
          })}
        </div>
      </section>
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
  const [direction, setDirection] = useState<Direction>("precision");
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [direction]);

  return (
    <div className="dd-shell">
      <Helmet>
        <title>ShapeNeural — Design Directions</title>
        <meta name="description" content="Three strategic design directions for the future ShapeNeural studio." />
      </Helmet>
      <ReviewBar
        direction={direction}
        setDirection={setDirection}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="dd-preview" key={direction}>
        {direction === "precision" && <PrecisionDirection language={language} />}
        {direction === "systems" && <SystemsDirection language={language} />}
        {direction === "independent" && <IndependentDirection language={language} />}
      </div>
    </div>
  );
}
