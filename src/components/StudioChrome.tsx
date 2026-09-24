import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Languages, Menu, X } from "lucide-react";
import BindruneLogo from "@/components/BindruneLogo";
import type { StudioLanguage } from "@/hooks/use-studio-language";

const nav = {
  de: [
    ["Leistungen", "/studio/leistungen"],
    ["Projekte", "/studio/projekte"],
    ["Lab", "/studio/lab"],
  ],
  en: [
    ["Services", "/studio/leistungen"],
    ["Projects", "/studio/projekte"],
    ["Lab", "/studio/lab"],
  ],
} as const;

export function StudioHeader({ language, onLanguage }: { language: StudioLanguage; onLanguage: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="ss-header">
      <Link className="ss-brand" to="/studio" aria-label="ShapeNeural home">
        <BindruneLogo size={30} onDark />
        <span>SHAPENEURAL®</span>
      </Link>
      <nav className={menuOpen ? "is-open" : ""} aria-label={language === "de" ? "Hauptnavigation" : "Main navigation"}>
        {nav[language].map(([label, path]) => (
          <Link className={location.pathname === path ? "is-active" : ""} to={path} key={path}>{label}</Link>
        ))}
        <a className="ss-header__cta" href="mailto:signal@shapeneural.com?subject=Projektanfrage">
          {language === "de" ? "Vorhaben besprechen" : "Discuss a project"}<ArrowRight size={15} />
        </a>
      </nav>
      <div className="ss-header__tools">
        <button type="button" onClick={onLanguage} aria-label={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
          <Languages size={15} />{language.toUpperCase()}
        </button>
        <button
          type="button"
          className="ss-header__menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen
            ? (language === "de" ? "Menü schließen" : "Close menu")
            : (language === "de" ? "Menü öffnen" : "Open menu")}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

export function StudioFooter({ language }: { language: StudioLanguage }) {
  return (
    <footer className="ss-footer">
      <div className="ss-footer__brand"><BindruneLogo size={38} onDark /><span>SHAPENEURAL®</span></div>
      <p>{language === "de" ? "Unabhängiges KI-Produktstudio · Frankfurt / Remote" : "Independent applied AI studio · Frankfurt / Remote"}</p>
      <div><Link to="/studio/leistungen">{language === "de" ? "Leistungen" : "Services"}</Link><Link to="/studio/projekte">{language === "de" ? "Projekte" : "Projects"}</Link><Link to="/studio/lab">Lab</Link><a href="mailto:signal@shapeneural.com">signal@shapeneural.com</a></div>
    </footer>
  );
}
