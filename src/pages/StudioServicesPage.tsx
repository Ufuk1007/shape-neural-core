import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import { STUDIO_OFFERS } from "@/data/studio";
import "@/studio-site.css";

const copy = {
  de: {
    eyebrow: "Leistungen & Preise",
    title: "Drei Wege, KI praktisch voranzubringen.",
    intro: "Kein offenes Transformationsprogramm. Jedes Angebot beginnt mit einer konkreten Frage und endet mit etwas, das genutzt, getestet oder entschieden werden kann.",
    path: "Welcher Weg passt zu Ihnen?",
    choose: "Zum Angebot",
    result: "Konkretes Ergebnis",
    includes: "Was enthalten ist",
    phases: "Typischer Ablauf",
    limits: "Bewusst nicht enthalten",
    proofExample: "LEISTUNGSMODELL / BEISPIEL-SETUP",
    proofPortfolio: "BELEGT DURCH EIGENES PRODUKTPORTFOLIO",
    honestTitle: "Proof, ohne größer zu wirken als wir sind.",
    honestBody: "Create ist durch eigene Produkte und reale Builds belegt. Für Augment und Transform zeigen wir zunächst nachvollziehbare Setups, Methoden und Demonstratoren. Externe Kundencases werden erst dann als solche bezeichnet, wenn sie existieren und gezeigt werden dürfen.",
    pricingLabel: "Preislogik",
    pricingTitle: "Klarer Umfang. Verbindlicher Preis. Keine endlose Agentur-Retainerlogik.",
    pricingBody: "Der genaue Preis folgt nach einer kurzen Bestandsaufnahme, weil Werkzeuge, Datenlage und Integrationen den Aufwand bestimmen. Danach erhalten Sie einen klaren Projektumfang mit einem festen Preis und expliziten Grenzen.",
    pricing: [
      ["AI Workspace Setup", "Festpreis für ein abgegrenztes Setup", "Nach kurzer Sichtung Ihrer Arbeitsweise und vorhandenen Werkzeuge."],
      ["AI Workflow Build", "Projektpreis für einen Workflow", "Für einen klar definierten Ablauf mit vereinbarten Kontrollpunkten."],
      ["AI Product Sprint", "Sprintpreis für Prototyp + Validierung", "Für eine konkrete Produktfrage und einen entscheidungsfähigen Prototyp."],
    ],
    focus: "Ist der richtige Weg noch unklar? Ein bezahlter Focus Day kann Problem, Priorität und sinnvollsten Einstieg bestimmen.",
    methodLabel: "Die Arbeitsmethode",
    methodTitle: "Das Angebot bestimmt das Was. Fünf Phasen sichern das Wie.",
    method: [
      ["01", "Understand", "Ausgangslage, Menschen, Daten, Werkzeuge und Grenzen verstehen."],
      ["02", "Design", "Die kleinste sinnvolle Veränderung und ihre Kontrollpunkte entwerfen."],
      ["03", "Implement", "Workspace, Workflow oder Produktprototyp tatsächlich bauen."],
      ["04", "Validate", "Nutzen, Qualität, Fehlerfälle, Kosten und menschliche Eingriffe testen."],
      ["05", "Transfer", "Wissen, Dokumentation und Verantwortung nachvollziehbar übergeben."],
    ],
    faqLabel: "Häufige Fragen",
    faq: [
      ["Für wen ist das gedacht?", "Für kleine Unternehmen, kompakte Teams und Selbstständige, die KI praktisch einsetzen wollen. Nicht für große Kernsystemmigrationen oder unternehmenskritischen 24/7-Betrieb."],
      ["Muss ich mich bereits für ein KI-Tool entschieden haben?", "Nein. Die Werkzeugwahl folgt aus Arbeit, Daten, Risiko und Budget – nicht aus einer bevorzugten Plattform."],
      ["Was passiert mit sensiblen Daten?", "Datenflüsse und Anbieter werden vor der Umsetzung sichtbar gemacht. Wenn ein Vorhaben besondere rechtliche oder sicherheitskritische Anforderungen hat, wird das früh benannt und gegebenenfalls mit Spezialisten ergänzt."],
      ["Was passiert nach dem Projekt?", "Sie erhalten ein nutzbares System, Dokumentation und eine Übergabe. Ein klar begrenztes Care-Modell kann bei Bedarf separat vereinbart werden; ein 24/7 Managed Service ist nicht Teil des Kernangebots."],
      ["Warum stehen hier noch keine Zahlen?", "Weil ein belastbarer Festpreis erst nach der kurzen Bestandsaufnahme seriös ist. Die Preislogik ist transparent; konkrete Preispunkte werden finalisiert, sobald Umfang und wiederholbare Standards ausreichend validiert sind."],
    ],
    ctaLabel: "Ein guter Einstieg ist klein genug, um ihn wirklich zu beginnen.",
    ctaTitle: "Welche Arbeit soll durch KI besser werden?",
    cta: "Vorhaben beschreiben",
  },
  en: {
    eyebrow: "Services & pricing",
    title: "Three ways to move AI into practical work.",
    intro: "No open-ended transformation programme. Every offer starts with a concrete question and ends with something that can be used, tested or decided.",
    path: "Which path fits you?",
    choose: "Explore offer",
    result: "Concrete outcome",
    includes: "What is included",
    phases: "Typical flow",
    limits: "Deliberately not included",
    proofExample: "SERVICE MODEL / EXAMPLE SETUP",
    proofPortfolio: "SUPPORTED BY OUR OWN PRODUCT PORTFOLIO",
    honestTitle: "Proof without pretending to be larger than we are.",
    honestBody: "Create is supported by products and real builds of our own. For Augment and Transform, we initially show inspectable setups, methods and demonstrators. External client cases will only be labelled as such once they exist and can be shared.",
    pricingLabel: "Pricing logic",
    pricingTitle: "Clear scope. Committed price. No endless agency retainer.",
    pricingBody: "The exact price follows a short assessment because tools, data and integrations determine the effort. You then receive a clearly scoped project, a fixed price and explicit boundaries.",
    pricing: [
      ["AI Workspace Setup", "Fixed price for a bounded setup", "After a short review of your work and existing tools."],
      ["AI Workflow Build", "Project price for one workflow", "For one clearly defined process with agreed checkpoints."],
      ["AI Product Sprint", "Sprint price for prototype + validation", "For one product question and a prototype that enables a decision."],
    ],
    focus: "Not sure which path is right? A paid Focus Day can clarify the problem, priority and most useful entry point.",
    methodLabel: "The working method",
    methodTitle: "The offer defines the what. Five phases protect the how.",
    method: [
      ["01", "Understand", "Understand the situation, people, data, tools and constraints."],
      ["02", "Design", "Design the smallest meaningful change and its control points."],
      ["03", "Implement", "Actually build the workspace, workflow or product prototype."],
      ["04", "Validate", "Test value, quality, failure cases, cost and human intervention."],
      ["05", "Transfer", "Hand over knowledge, documentation and accountability clearly."],
    ],
    faqLabel: "Frequently asked questions",
    faq: [
      ["Who is this for?", "Small businesses, compact teams and independent professionals who want to use AI in practice. It is not designed for core-system migrations or production-critical 24/7 operations."],
      ["Do I need to have selected an AI tool?", "No. Tool selection follows the work, data, risk and budget — not a preferred platform."],
      ["What happens to sensitive data?", "Data flows and providers are made visible before implementation. If the work has exceptional legal or security requirements, that is raised early and specialist partners may be recommended."],
      ["What happens after the project?", "You receive a usable system, documentation and handover. A bounded care model can be agreed separately; a 24/7 managed service is not part of the core offer."],
      ["Why are there no numbers yet?", "Because a reliable fixed price is only responsible after a short assessment. The pricing logic is transparent; numerical price points will be published once scope and repeatable standards are sufficiently validated."],
    ],
    ctaLabel: "A good entry point is small enough to actually begin.",
    ctaTitle: "What work should AI make better?",
    cta: "Describe your project",
  },
} as const;

export default function StudioServicesPage() {
  const { language, setLanguage } = useStudioLanguage();
  const t = copy[language];

  return (
    <div className="ss-site">
      <Helmet><title>{language === "de" ? "Leistungen & Preise" : "Services & pricing"} — ShapeNeural</title><meta name="description" content={t.intro} /></Helmet>
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main>
        <section className="ss-page-hero ss-page-hero--services">
          <p className="ss-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p>
          <div className="ss-page-hero__index">{STUDIO_OFFERS.map((offer) => <a href={`#${offer.id}`} key={offer.id}><span>{offer.number}</span><strong>{offer.label}</strong><small>{offer.title[language]}</small><ArrowRight size={17} /></a>)}</div>
        </section>

        <section className="ss-route-picker ss-section">
          <p className="ss-eyebrow">{t.path}</p>
          {STUDIO_OFFERS.map((offer) => <a href={`#${offer.id}`} key={offer.id}><span>{offer.question[language]}</span><strong>{offer.label}</strong><ArrowRight size={18} /></a>)}
        </section>

        <div className="ss-offer-list">
          {STUDIO_OFFERS.map((offer) => (
            <section className={`ss-offer ss-offer--${offer.id} ss-section`} id={offer.id} key={offer.id}>
              <header><span>{offer.number}</span><small>{offer.label}</small><p>{offer.proof === "portfolio" ? t.proofPortfolio : t.proofExample}</p></header>
              <div className="ss-offer__intro"><div><p className="ss-eyebrow">{offer.title[language]}</p><h2>{offer.promise[language]}</h2></div><div><p>{offer.description[language]}</p><strong>{offer.frame[language]}</strong></div></div>
              <div className="ss-offer__result"><small>{t.result}</small><h3>{offer.outcome[language]}</h3></div>
              <div className="ss-offer__details">
                <div><h4>{t.includes}</h4><ul>{offer.deliverables[language].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
                <div><h4>{t.phases}</h4><ol>{offer.phases[language].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
                <div><h4>{t.limits}</h4><ul>{offer.boundaries[language].map((item) => <li key={item}><Minus size={15} />{item}</li>)}</ul></div>
              </div>
              <a className="ss-text-link" href={`mailto:signal@shapeneural.com?subject=${encodeURIComponent(offer.title[language])}`}>{t.choose}<ArrowRight size={16} /></a>
            </section>
          ))}
        </div>

        <section className="ss-proof-note ss-section"><p className="ss-eyebrow">Honest proof</p><h2>{t.honestTitle}</h2><p>{t.honestBody}</p><Link to="/studio/projekte">{language === "de" ? "Portfolio und Status ansehen" : "Explore portfolio and status"}<ArrowRight size={16} /></Link></section>

        <section className="ss-pricing ss-section">
          <header><p className="ss-eyebrow">{t.pricingLabel}</p><h2>{t.pricingTitle}</h2><p>{t.pricingBody}</p></header>
          <div>{t.pricing.map(([name, model, note], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><strong>{model}</strong><p>{note}</p></article>)}</div>
          <aside>{t.focus}</aside>
        </section>

        <section className="ss-method ss-method--light ss-section">
          <header><p className="ss-eyebrow">{t.methodLabel}</p><h2>{t.methodTitle}</h2></header>
          <div className="ss-method__track">{t.method.map(([number, title, body]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="ss-faq ss-section"><header><p className="ss-eyebrow">{t.faqLabel}</p></header><div>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

        <section className="ss-final-cta ss-section"><p className="ss-eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><a className="ss-button ss-button--dark" href="mailto:signal@shapeneural.com?subject=Projektanfrage">{t.cta}<ArrowRight size={18} /></a></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
