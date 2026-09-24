import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import "@/studio-site.css";

const copy = {
  de: {
    eyebrow: "ShapeNeural Lab / Live Signals",
    title: "Beobachten, verbinden, bessere Fragen stellen.",
    intro: "Das Lab ist die Forschungsoberfläche von ShapeNeural. Es sammelt schwache Signale, verbindet Entwicklungen und macht sichtbar, welche Fragen hinter dem nächsten Produkt oder Kundenproblem liegen könnten.",
    open: "Signals Cloud öffnen",
    roleLabel: "Eine klare Rolle im System",
    roleTitle: "Das Studio löst konkrete Aufgaben. Das Lab hält den Blick offen.",
    roleBody: "Hier gibt es bewusst keine zweite Projektgalerie und keine Wiederholung der Selbstdarstellung. Die Cloud behält ihre Funktion als explorative Oberfläche – visuell an das Studio angebunden, inhaltlich eigenständig.",
    modes: [
      ["01", "Observe", "Technologien, Verhaltensänderungen und neue Formen von Arbeit früh wahrnehmen."],
      ["02", "Connect", "Signale aus unterschiedlichen Feldern zu Mustern und Spannungen verbinden."],
      ["03", "Question", "Aus Mustern bessere Fragen ableiten, bevor vorschnell eine Lösung gebaut wird."],
    ],
    cloudLabel: "Interaktive Forschungsoberfläche",
    cloudTitle: "Keine Liste. Ein bewegliches Feld aus Signalen.",
    cloudBody: "Die bestehende Cloud bleibt der Kern des Labs: navigierbar, verknüpft und offen für überraschende Wege. Sie wird als eigenständiges Untermenü geführt, statt die Agenturseite zu überladen.",
    back: "Zur Studio-Website",
  },
  en: {
    eyebrow: "ShapeNeural Lab / Live Signals",
    title: "Observe, connect, ask better questions.",
    intro: "The Lab is ShapeNeural’s research surface. It collects weak signals, connects developments and makes visible which questions may sit behind the next product or client problem.",
    open: "Open Signals Cloud",
    roleLabel: "One clear role in the system",
    roleTitle: "The Studio solves concrete tasks. The Lab keeps the field of view open.",
    roleBody: "There is deliberately no second project gallery and no repeat of the founder story here. The cloud retains its function as an exploratory surface — visually connected to the Studio, editorially independent.",
    modes: [
      ["01", "Observe", "Notice technologies, behavioural shifts and new ways of working early."],
      ["02", "Connect", "Connect signals from different fields into patterns and tensions."],
      ["03", "Question", "Derive better questions from patterns before rushing to build a solution."],
    ],
    cloudLabel: "Interactive research surface",
    cloudTitle: "Not a list. A moving field of signals.",
    cloudBody: "The existing cloud remains the core of the Lab: navigable, connected and open to surprising paths. It lives as its own submenu rather than overloading the agency site.",
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
          <div className="ss-lab-hero__copy"><p className="ss-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><Link className="ss-button ss-button--lime" to="/signals">{t.open}<ExternalLink size={16} /></Link></div>
        </section>
        <section className="ss-lab-role ss-section"><div><p className="ss-eyebrow">{t.roleLabel}</p><h2>{t.roleTitle}</h2></div><p>{t.roleBody}</p></section>
        <section className="ss-lab-modes ss-section">{t.modes.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</section>
        <section className="ss-cloud-portal ss-section"><div className="ss-cloud-portal__visual"><i /><i /><i /><i /><b>SIGNALS</b></div><div><p className="ss-eyebrow">{t.cloudLabel}</p><h2>{t.cloudTitle}</h2><p>{t.cloudBody}</p><Link className="ss-button ss-button--lime" to="/signals">{t.open}<ArrowRight size={17} /></Link></div></section>
        <section className="ss-lab-back ss-section"><Link to="/studio">{t.back}<ArrowRight size={17} /></Link></section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
