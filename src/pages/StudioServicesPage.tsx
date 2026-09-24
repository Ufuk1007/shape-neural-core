import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import { STUDIO_OFFERS } from "@/data/studio";
import StudioMeta from "@/components/StudioMeta";
import workshopImage from "@/assets/module-workshop.webp";
import workflowImage from "@/assets/stage-clarity.webp";
import productImage from "@/assets/stage-system.webp";
import "@/studio-site.css";

const OFFER_IMAGES = {
  augment: workshopImage,
  transform: workflowImage,
  create: productImage,
} as const;

const copy = {
  de: {
    eyebrow: "Leistungen",
    title: "KI einrichten. Arbeit neu gestalten. Produktideen real testen.",
    intro: "Der richtige Auftrag hängt nicht vom neuesten Werkzeug ab, sondern von Ihrer Ausgangslage. Jedes Angebot löst ein anderes Problem und endet mit einem konkret nutzbaren Ergebnis.",
    path: "Ihre Ausgangslage",
    choose: "Zum Angebot",
    result: "Konkretes Ergebnis",
    duration: "Typische Dauer",
    price: "Preisorientierung",
    prerequisites: "Damit wir starten können",
    includes: "Was enthalten ist",
    phases: "Typischer Ablauf",
    limits: "Bewusst nicht enthalten",
    proofExample: "LEISTUNGSMODELL / BEISPIEL-SETUP",
    proofPortfolio: "BELEGT DURCH EIGENES PRODUKTPORTFOLIO",
    honestTitle: "Proof, ohne größer zu wirken als wir sind.",
    honestBody: "Create ist durch eigene Produkte und reale Builds belegt. Für Augment und Transform zeigen wir zunächst nachvollziehbare Setups, Methoden und Demonstratoren. Externe Kundencases werden erst dann als solche bezeichnet, wenn sie existieren und gezeigt werden dürfen.",
    pricingLabel: "Preislogik",
    pricingTitle: "Klarer Umfang. Verbindlicher Preis. Keine endlose Agentur-Retainerlogik.",
    pricingBody: "Die Bandbreiten geben kleinen Unternehmen und selbstständig Tätigen eine belastbare erste Orientierung. Der verbindliche Festpreis folgt nach der Bestandsaufnahme und berücksichtigt Werkzeuge, Datenlage, Integrationen und Risiko.",
    pricing: [
      ["AI Workspace Setup", "1–2 Wochen", "2.900–6.500 € netto", "Ein abgegrenztes Setup mit 2–5 direkt nutzbaren Anwendungen."],
      ["AI Workflow Build", "3–6 Wochen", "7.500–18.000 € netto", "Ein implementierter Workflow mit Kontrollen, Evaluation und Übergabe."],
      ["AI Product Sprint", "3–5 Wochen", "9.500–22.000 € netto", "Ein funktionaler Prototyp mit realer Validierung und Entscheidung."],
    ],
    focusLabel: "Der kleinste bezahlte Einstieg",
    focusTitle: "Focus Day",
    focusPrice: "950 € netto · ein fokussierter Arbeitstag plus Vorbereitung",
    focusBody: "Noch unklar, womit Sie beginnen sollen? Wir priorisieren ein reales Problem, prüfen Daten und Werkzeuge und verdichten den sinnvollsten nächsten Schritt. Sie erhalten eine Opportunity Map und eine klare Empfehlung – auch wenn daraus kein Folgeprojekt entsteht.",
    focusCta: "Focus Day anfragen",
    methodLabel: "Die Arbeitsmethode",
    methodTitle: "Das Angebot bestimmt das Was. Fünf Phasen sichern das Wie.",
    method: [
      ["01", "Understand", "Ausgangslage, Menschen, Daten, Werkzeuge und Grenzen verstehen."],
      ["02", "Design", "Die kleinste sinnvolle Veränderung und ihre Kontrollpunkte entwerfen."],
      ["03", "Implement", "Workspace, Workflow oder Produktprototyp tatsächlich bauen."],
      ["04", "Validate", "Nutzen, Qualität, Fehlerfälle, Kosten und menschliche Eingriffe testen."],
      ["05", "Transfer", "Wissen, Dokumentation und Verantwortung nachvollziehbar übergeben."],
    ],
    imageCaptions: {
      augment: "Bestehende Arbeit verstehen, bevor Werkzeuge ausgewählt und eingerichtet werden.",
      transform: "Abläufe als überprüfbare Systeme aus KI, Automation und menschlicher Freigabe gestalten.",
      create: "Produktideen so weit bauen, dass echte Nutzung eine belastbare Entscheidung ermöglicht.",
    },
    faqLabel: "Häufige Fragen",
    faq: [
      ["Für wen ist das gedacht?", "Für kleine Unternehmen, kompakte Teams und Selbstständige, die KI praktisch einsetzen wollen. Nicht für große Kernsystemmigrationen oder unternehmenskritischen 24/7-Betrieb."],
      ["Muss ich mich bereits für ein KI-Tool entschieden haben?", "Nein. Die Werkzeugwahl folgt aus Arbeit, Daten, Risiko und Budget – nicht aus einer bevorzugten Plattform."],
      ["Was passiert mit sensiblen Daten?", "Datenflüsse und Anbieter werden vor der Umsetzung sichtbar gemacht. Wenn ein Vorhaben besondere rechtliche oder sicherheitskritische Anforderungen hat, wird das früh benannt und gegebenenfalls mit Spezialisten ergänzt."],
      ["Was passiert nach dem Projekt?", "Sie erhalten ein nutzbares System, Dokumentation und eine Übergabe. Ein klar begrenztes Care-Modell kann bei Bedarf separat vereinbart werden; ein 24/7 Managed Service ist nicht Teil des Kernangebots."],
      ["Sind die genannten Preise verbindlich?", "Die Bandbreiten sind eine ehrliche Orientierung für typische Vorhaben. Nach einer kurzen Bestandsaufnahme erhalten Sie einen klar abgegrenzten Umfang und einen verbindlichen Festpreis. Lizenzen oder ausdrücklich vereinbarte Fremdkosten werden separat ausgewiesen."],
    ],
    ctaLabel: "Ein guter Einstieg ist klein genug, um ihn wirklich zu beginnen.",
    ctaTitle: "Welche Arbeit soll durch KI besser werden?",
    cta: "Vorhaben beschreiben",
  },
  en: {
    eyebrow: "Services & pricing",
    title: "Set up AI. Redesign the work. Test product ideas in the real world.",
    intro: "The right engagement is defined by your starting point, not by the newest tool. Each offer solves a different problem and ends in a concrete, usable outcome.",
    path: "Your starting point",
    choose: "Explore offer",
    result: "Concrete outcome",
    duration: "Typical duration",
    price: "Price guide",
    prerequisites: "What we need to begin",
    includes: "What is included",
    phases: "Typical flow",
    limits: "Deliberately not included",
    proofExample: "SERVICE MODEL / EXAMPLE SETUP",
    proofPortfolio: "SUPPORTED BY OUR OWN PRODUCT PORTFOLIO",
    honestTitle: "Proof without pretending to be larger than we are.",
    honestBody: "Create is supported by products and real builds of our own. For Augment and Transform, we initially show inspectable setups, methods and demonstrators. External client cases will only be labelled as such once they exist and can be shared.",
    pricingLabel: "Pricing logic",
    pricingTitle: "Clear scope. Committed price. No endless agency retainer.",
    pricingBody: "The ranges give small organisations and independent professionals a reliable first guide. A committed fixed price follows the assessment and reflects tools, data, integrations and risk.",
    pricing: [
      ["AI Workspace Setup", "1–2 weeks", "€2,900–€6,500 excl. VAT", "A bounded setup with 2–5 applications ready for use."],
      ["AI Workflow Build", "3–6 weeks", "€7,500–€18,000 excl. VAT", "An implemented workflow with controls, evaluation and handover."],
      ["AI Product Sprint", "3–5 weeks", "€9,500–€22,000 excl. VAT", "A functional prototype with real validation and a decision."],
    ],
    focusLabel: "The smallest paid entry point",
    focusTitle: "Focus Day",
    focusPrice: "€950 excl. VAT · one focused working day plus preparation",
    focusBody: "Not sure where to begin? We prioritise one real problem, assess the data and tools and define the most useful next step. You receive an opportunity map and a clear recommendation — even if no follow-on project is needed.",
    focusCta: "Request a Focus Day",
    methodLabel: "The working method",
    methodTitle: "The offer defines the what. Five phases protect the how.",
    method: [
      ["01", "Understand", "Understand the situation, people, data, tools and constraints."],
      ["02", "Design", "Design the smallest meaningful change and its control points."],
      ["03", "Implement", "Actually build the workspace, workflow or product prototype."],
      ["04", "Validate", "Test value, quality, failure cases, cost and human intervention."],
      ["05", "Transfer", "Hand over knowledge, documentation and accountability clearly."],
    ],
    imageCaptions: {
      augment: "Understand the work before selecting and configuring the tools.",
      transform: "Design workflows as inspectable systems of AI, automation and human approval.",
      create: "Build product ideas far enough for real use to support a confident decision.",
    },
    faqLabel: "Frequently asked questions",
    faq: [
      ["Who is this for?", "Small businesses, compact teams and independent professionals who want to use AI in practice. It is not designed for core-system migrations or production-critical 24/7 operations."],
      ["Do I need to have selected an AI tool?", "No. Tool selection follows the work, data, risk and budget — not a preferred platform."],
      ["What happens to sensitive data?", "Data flows and providers are made visible before implementation. If the work has exceptional legal or security requirements, that is raised early and specialist partners may be recommended."],
      ["What happens after the project?", "You receive a usable system, documentation and handover. A bounded care model can be agreed separately; a 24/7 managed service is not part of the core offer."],
      ["Are the prices binding?", "The ranges are an honest guide for typical engagements. After a short assessment, you receive a clearly bounded scope and a committed fixed price. Licences or explicitly agreed third-party costs are shown separately."],
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
      <StudioMeta title={language === "de" ? "Leistungen" : "Services"} description={t.intro} path="/studio/leistungen" language={language} />
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
              <figure className="ss-offer__media"><img src={OFFER_IMAGES[offer.id]} alt="" loading="lazy" decoding="async" /><figcaption><span>{offer.number} / {offer.label}</span><p>{t.imageCaptions[offer.id]}</p></figcaption></figure>
              <div className="ss-offer__result"><small>{t.result}</small><h3>{offer.outcome[language]}</h3><div className="ss-offer__commercial"><span><small>{t.duration}</small><strong>{offer.duration[language]}</strong></span><span><small>{t.price}</small><strong>{offer.price[language]}</strong></span><span><small>{t.prerequisites}</small><strong>{offer.prerequisites[language]}</strong></span></div></div>
              <div className="ss-offer__details">
                <div><h4>{t.includes}</h4><ul>{offer.deliverables[language].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
                <div><h4>{t.phases}</h4><ol>{offer.phases[language].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
                <div><h4>{t.limits}</h4><ul>{offer.boundaries[language].map((item) => <li key={item}><Minus size={15} />{item}</li>)}</ul></div>
              </div>
              <Link className="ss-text-link" to={`/kontakt?offer=${offer.id}`}>{t.choose}<ArrowRight size={16} /></Link>
            </section>
          ))}
        </div>

        <section className="ss-proof-note ss-section"><p className="ss-eyebrow">Honest proof</p><h2>{t.honestTitle}</h2><p>{t.honestBody}</p><Link to="/studio/projekte">{language === "de" ? "Portfolio und Status ansehen" : "Explore portfolio and status"}<ArrowRight size={16} /></Link></section>

        <section className="ss-pricing ss-section">
          <header><p className="ss-eyebrow">{t.pricingLabel}</p><h2>{t.pricingTitle}</h2><p>{t.pricingBody}</p></header>
          <div>{t.pricing.map(([name, duration, range, note], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><strong>{duration}</strong><b>{range}</b><p>{note}</p></article>)}</div>
          <aside className="ss-focus-day"><div><small>{t.focusLabel}</small><h3>{t.focusTitle}</h3><strong>{t.focusPrice}</strong><p>{t.focusBody}</p></div><Link className="ss-button ss-button--dark" to="/kontakt?offer=focus-day">{t.focusCta}<ArrowRight size={18} /></Link></aside>
        </section>

        <section className="ss-method ss-method--light ss-section">
          <header><p className="ss-eyebrow">{t.methodLabel}</p><h2>{t.methodTitle}</h2></header>
          <div className="ss-method__track">{t.method.map(([number, title, body]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="ss-faq ss-section"><header><p className="ss-eyebrow">{t.faqLabel}</p></header><div>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

        <section className="ss-final-cta ss-section"><p className="ss-eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><Link className="ss-button ss-button--dark" to="/kontakt">{t.cta}<ArrowRight size={18} /></Link></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
