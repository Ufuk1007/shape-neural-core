import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import NeuralCloud from "@/components/NeuralCloud";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import "@/studio-site.css";
import "@/signals-page.css";

const copy = {
  de: {
    eyebrow: "ShapeNeural Lab / Live Signals",
    title: "Beobachten, verbinden, bessere Fragen stellen.",
    intro: "Das Lab ist die Forschungsoberfläche von ShapeNeural. Es sammelt schwache Signale, verbindet Entwicklungen und macht sichtbar, welche Fragen hinter dem nächsten Produkt oder Kundenproblem liegen könnten.",
    open: "Zur Signal Cloud",
    roleLabel: "Eine klare Rolle im System",
    roleTitle: "Das Studio löst konkrete Aufgaben. Das Lab hält den Blick offen.",
    roleBody: "Hier gibt es bewusst keine zweite Projektgalerie und keine Wiederholung der Selbstdarstellung. Die Cloud behält ihre Funktion als explorative Oberfläche – visuell an das Studio angebunden, inhaltlich eigenständig.",
    modes: [
      ["01", "Observe", "Technologien, Verhaltensänderungen und neue Formen von Arbeit früh wahrnehmen."],
      ["02", "Connect", "Signale aus unterschiedlichen Feldern zu Mustern und Spannungen verbinden."],
      ["03", "Question", "Aus Mustern bessere Fragen ableiten, bevor vorschnell eine Lösung gebaut wird."],
    ],
    flowLabel: "Vom Signal zum Vorhaben",
    flowTitle: "Exploration ist erst wertvoll, wenn daraus eine bessere Entscheidung entsteht.",
    flow: [
      ["01", "Signal", "Eine beobachtbare Veränderung mit Quelle und Kontext festhalten."],
      ["02", "Muster", "Verbindungen, Spannungen und wiederkehrende Bewegungen sichtbar machen."],
      ["03", "Frage", "Eine konkrete Frage formulieren, die nicht schon die Lösung vorgibt."],
      ["04", "Probe", "Mit Research, Prototyp oder Experiment prüfen, ob die Annahme trägt."],
    ],
    principleLabel: "Research Protocol",
    principleTitle: "Kuratiert statt automatisch geglättet.",
    principleBody: "Die Cloud ist kein Newsfeed und kein Wahrheitsautomat. Jedes Signal bleibt mit seiner Quelle verbunden. Relevanz ist eine Arbeitshypothese, keine Gewissheit. Erst wenn ein Muster für ein reales Problem Bedeutung bekommt, wird daraus ein Studio-Vorhaben.",
    back: "Zur Studio-Website",
  },
  en: {
    eyebrow: "ShapeNeural Lab / Live Signals",
    title: "Observe, connect, ask better questions.",
    intro: "The Lab is ShapeNeural’s research surface. It collects weak signals, connects developments and makes visible which questions may sit behind the next product or client problem.",
    open: "Go to the Signals Cloud",
    roleLabel: "One clear role in the system",
    roleTitle: "The Studio solves concrete tasks. The Lab keeps the field of view open.",
    roleBody: "There is deliberately no second project gallery and no repeat of the founder story here. The cloud retains its function as an exploratory surface — visually connected to the Studio, editorially independent.",
    modes: [
      ["01", "Observe", "Notice technologies, behavioural shifts and new ways of working early."],
      ["02", "Connect", "Connect signals from different fields into patterns and tensions."],
      ["03", "Question", "Derive better questions from patterns before rushing to build a solution."],
    ],
    flowLabel: "From signal to initiative",
    flowTitle: "Exploration matters when it leads to a better decision.",
    flow: [
      ["01", "Signal", "Capture an observable change together with its source and context."],
      ["02", "Pattern", "Make connections, tensions and recurring movements visible."],
      ["03", "Question", "Formulate a concrete question without building the answer into it."],
      ["04", "Probe", "Use research, a prototype or an experiment to test whether the assumption holds."],
    ],
    principleLabel: "Research protocol",
    principleTitle: "Curated rather than automatically smoothed over.",
    principleBody: "The cloud is neither a news feed nor a truth machine. Every signal remains connected to its source. Relevance is a working hypothesis, not certainty. A pattern becomes a Studio initiative only when it matters to a real problem.",
    back: "Back to the Studio",
  },
} as const;

export default function StudioLabPage() {
  const { language, setLanguage } = useStudioLanguage();
  const t = copy[language];

  return (
    <div className="ss-site ss-site--lab">
      <Helmet><title>Lab — ShapeNeural</title><meta name="description" content={t.intro} /></Helmet>
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main>
        <section className="ss-lab-hero">
          <div className="ss-lab-hero__grid" />
          <div className="ss-lab-hero__orbit"><i /><i /><i /><b>SN</b><span>LIVE</span></div>
          <div className="ss-lab-hero__copy"><p className="ss-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><a className="ss-button ss-button--lime" href="#cloud">{t.open}<ArrowDown size={16} /></a></div>
        </section>
        <NeuralCloud variant="studio" language={language} />
        <section className="ss-lab-role ss-section"><div><p className="ss-eyebrow">{t.roleLabel}</p><h2>{t.roleTitle}</h2></div><p>{t.roleBody}</p></section>
        <section className="ss-lab-modes ss-section">{t.modes.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</section>
        <section className="ss-lab-flow ss-section"><header><p className="ss-eyebrow">{t.flowLabel}</p><h2>{t.flowTitle}</h2></header><div>{t.flow.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section className="ss-lab-principle ss-section"><p className="ss-eyebrow">{t.principleLabel}</p><div><h2>{t.principleTitle}</h2><p>{t.principleBody}</p><Link to="/signals">{language === "de" ? "Signalraum als eigene Seite öffnen" : "Open the signal field as its own page"}<ArrowRight size={16} /></Link></div></section>
        <section className="ss-lab-back ss-section"><Link to="/studio">{t.back}<ArrowRight size={17} /></Link></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
