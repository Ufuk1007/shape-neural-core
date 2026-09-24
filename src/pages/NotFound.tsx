import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import StudioMeta from "@/components/StudioMeta";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import "@/studio-site.css";

export default function NotFound() {
  const { language, setLanguage } = useStudioLanguage();
  const location = useLocation();
  const de = language === "de";

  return (
    <div className="ss-site ss-site--not-found">
      <StudioMeta title="404" description={de ? "Die angeforderte Seite wurde nicht gefunden." : "The requested page could not be found."} path={location.pathname} language={language} noIndex />
      <StudioHeader language={language} onLanguage={() => setLanguage(de ? "en" : "de")} />
      <main className="ss-not-found ss-section">
        <p className="ss-eyebrow">404 / {de ? "Kein Signal" : "No signal"}</p>
        <h1>{de ? "Diese Seite existiert nicht." : "This page does not exist."}</h1>
        <p>{de ? "Der gesuchte Pfad gehört nicht zur aktuellen ShapeNeural Website." : "The requested path is not part of the current ShapeNeural website."}</p>
        <Link className="ss-button ss-button--lime" to="/">{de ? "Zur Startseite" : "Back home"}<ArrowRight size={18} /></Link>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
