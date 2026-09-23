import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Languages, Menu, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BindruneLogo from "@/components/BindruneLogo";
import NeuralCloud from "@/components/NeuralCloud";
import "@/signals-page.css";

type Language = "de" | "en";

const signalsCopy = {
  de: {
    title: "ShapeNeural Signals — Entwicklungen erkennen, bevor sie offensichtlich werden",
    description: "Ein kuratiertes, interaktives Feld für relevante Entwicklungen in KI, Experience, Strategie und Kultur.",
    nav: [
      ["Leistungen", "/directions#proof-services"],
      ["Arbeit", "/directions#proof-work"],
      ["Signals", "#cloud"],
      ["Studio", "/directions#proof-studio"],
    ],
    contact: "Vorhaben besprechen",
    eyebrow: "SHAPENEURAL / SIGNALS",
    headline: <>Was sich verändert, bevor es <em>offensichtlich</em> wird.</>,
    body: "Ein lebendes Feld aus Entwicklungen in KI, Experience, Strategie und Kultur. Jeder Punkt ist kuratiert, gewichtet und mit seiner Quelle verbunden.",
    primary: "Signalraum öffnen",
    secondary: "Zur Agentur",
    indexLabel: "VIER PERSPEKTIVEN",
    indexHint: "Farbe zeigt die Perspektive. Nähe zum Kern zeigt Relevanz.",
    categories: [
      ["STR / ART", "Strategie & kreative Praxis"],
      ["CX / UX", "Experience & Interaktion"],
      ["SONIC", "Sound & multimodale Medien"],
      ["META", "Gesellschaft & Verantwortung"],
    ],
    rail: ["KURATIERT", "GEWICHTET", "QUELLENVERKNÜPFT"],
    footer: "Ein unabhängiges KI-Produktstudio aus Frankfurt.",
    back: "Zur Agenturseite",
  },
  en: {
    title: "ShapeNeural Signals — See change before it becomes obvious",
    description: "A curated, interactive field for relevant developments across AI, experience, strategy and culture.",
    nav: [
      ["Services", "/directions#proof-services"],
      ["Work", "/directions#proof-work"],
      ["Signals", "#cloud"],
      ["Studio", "/directions#proof-studio"],
    ],
    contact: "Discuss a project",
    eyebrow: "SHAPENEURAL / SIGNALS",
    headline: <>What changes before it becomes <em>obvious.</em></>,
    body: "A living field of developments across AI, experience, strategy and culture. Every point is curated, weighted and connected to its source.",
    primary: "Open the signal field",
    secondary: "Back to the studio",
    indexLabel: "FOUR PERSPECTIVES",
    indexHint: "Colour shows perspective. Distance to the core shows relevance.",
    categories: [
      ["STR / ART", "Strategy & creative practice"],
      ["CX / UX", "Experience & interaction"],
      ["SONIC", "Sound & multimodal media"],
      ["META", "Society & accountability"],
    ],
    rail: ["CURATED", "WEIGHTED", "SOURCE-LINKED"],
    footer: "An independent AI product studio from Frankfurt.",
    back: "Back to the studio",
  },
} as const;

const SignalsPage = () => {
  const [language, setLanguage] = useState<Language>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = signalsCopy[language];

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = language;
    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [language]);

  return (
    <main className="signals-page">
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <header className="signals-header">
        <Link className="signals-brand" to="/directions" aria-label={language === "de" ? "ShapeNeural Startseite" : "ShapeNeural home"}>
          <BindruneLogo size={34} onDark showRed />
          <span>SHAPE<br />NEURAL</span>
        </Link>

        <nav className={menuOpen ? "is-open" : ""} aria-label={language === "de" ? "Hauptnavigation" : "Primary navigation"}>
          {t.nav.map(([label, href]) => (
            <a className={label === "Signals" ? "is-active" : ""} href={href} key={href} onClick={() => setMenuOpen(false)} aria-current={label === "Signals" ? "page" : undefined}>
              {label}
            </a>
          ))}
          <a className="signals-header__cta" href="mailto:signal@shapeneural.com" onClick={() => setMenuOpen(false)}>
            {t.contact}<ArrowRight size={15} />
          </a>
        </nav>

        <div className="signals-header__controls">
          <button type="button" className="signals-language" onClick={() => setLanguage((current) => current === "de" ? "en" : "de")} aria-label={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
            <Languages size={15} /><span>{language === "de" ? "EN" : "DE"}</span>
          </button>
          <button type="button" className="signals-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? (language === "de" ? "Menü schließen" : "Close menu") : "Menu"}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="signals-stage">
        <div className="signals-stage__copy">
          <p className="signals-kicker"><i />{t.eyebrow}</p>
          <h1>{t.headline}</h1>
          <p className="signals-stage__body">{t.body}</p>
          <div className="signals-stage__actions">
            <a href="#cloud">{t.primary}<ArrowDown size={17} /></a>
            <Link to="/directions">{t.secondary}<ArrowRight size={16} /></Link>
          </div>
        </div>

        <aside className="signals-stage__index" aria-label={t.indexLabel}>
          <header><span>{t.indexLabel}</span><span>04 / LIVE</span></header>
          <p>{t.indexHint}</p>
          <ol>
            {t.categories.map(([code, description], index) => (
              <li key={code} className={`is-${index + 1}`}>
                <span>0{index + 1}</span><strong>{code}</strong><small>{description}</small><i />
              </li>
            ))}
          </ol>
        </aside>

        <div className="signals-stage__rail" aria-hidden="true">
          {t.rail.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <NeuralCloud variant="studio" language={language} />

      <footer className="signals-footer">
        <div className="signals-brand signals-brand--footer"><BindruneLogo size={28} onDark showRed /><span>SHAPE<br />NEURAL</span></div>
        <span>{t.footer}</span>
        <Link to="/directions">{t.back}<ArrowRight size={14} /></Link>
      </footer>
    </main>
  );
};

export default SignalsPage;
