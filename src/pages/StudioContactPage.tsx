import { FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Mail } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import StudioMeta from "@/components/StudioMeta";
import { useStudioLanguage } from "@/hooks/use-studio-language";
import "@/studio-site.css";

type SubmitState = "idle" | "sending" | "success" | "error";

const options = {
  de: [
    ["unsure", "Noch unklar – passenden Einstieg finden"],
    ["focus-day", "Focus Day"],
    ["augment", "AI Workspace Setup"],
    ["transform", "AI Workflow Build"],
    ["create", "AI Product Sprint"],
    ["similar-system", "Ein ähnliches System wie ein Portfolio-Projekt"],
  ],
  en: [
    ["unsure", "Not sure yet — find the right entry point"],
    ["focus-day", "Focus Day"],
    ["augment", "AI Workspace Setup"],
    ["transform", "AI Workflow Build"],
    ["create", "AI Product Sprint"],
    ["similar-system", "A system similar to a portfolio project"],
  ],
} as const;

const copy = {
  de: {
    title: "In wenigen Sätzen prüfen, ob es passt.",
    intro: "Beschreiben Sie kurz, welche Arbeit, welcher Ablauf oder welche Produktidee besser werden soll. Sie erhalten in der Regel innerhalb von zwei Werktagen eine klare Rückmeldung zum sinnvollsten nächsten Schritt.",
    label: "15-Minuten-Fit-Check",
    expectations: ["Keine Verkaufsschleife", "Klare Einschätzung zu Fit und nächstem Schritt", "Ausschließlich für Unternehmen und beruflich Selbstständige"],
    name: "Name",
    company: "Unternehmen / Tätigkeit (optional)",
    email: "E-Mail",
    path: "Worum geht es?",
    message: "Was soll sich konkret verändern?",
    placeholder: "Zum Beispiel: Wir recherchieren und bewerten wöchentlich viele Anfragen. Der Ablauf ist langsam und schwer nachvollziehbar …",
    privacy: "Ich habe die Datenschutzhinweise zur Verarbeitung meiner Anfrage gelesen.",
    submit: "Anfrage senden",
    sending: "Wird gesendet …",
    success: "Danke. Ihre Anfrage ist angekommen. Sie erhalten in der Regel innerhalb von zwei Werktagen eine Antwort.",
    error: "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt per E-Mail.",
    alternative: "Lieber direkt schreiben?",
    referenceProject: "Referenzprojekt",
    back: "Leistungen und Rahmen ansehen",
    description: "Kurzer Fit-Check für KI-Workspace, Workflow und Produktvorhaben mit ShapeNeural.",
  },
  en: {
    title: "Find out if the fit is right in a few sentences.",
    intro: "Briefly describe the work, workflow or product idea you want to improve. You will usually receive a clear response on the most useful next step within two working days.",
    label: "15-minute fit check",
    expectations: ["No sales sequence", "A clear assessment of fit and next step", "For businesses and independent professionals acting in a business capacity"],
    name: "Name",
    company: "Company / professional activity (optional)",
    email: "Email",
    path: "What is this about?",
    message: "What should change in concrete terms?",
    placeholder: "For example: We research and assess a large number of requests every week. The workflow is slow and difficult to inspect …",
    privacy: "I have read the privacy notice explaining how this enquiry is processed.",
    submit: "Send enquiry",
    sending: "Sending …",
    success: "Thank you. Your enquiry has arrived. You will usually receive a reply within two working days.",
    error: "The enquiry could not be sent. Please try again or email us directly.",
    alternative: "Prefer email?",
    referenceProject: "Reference project",
    back: "Review services and scope",
    description: "A short fit check for AI workspace, workflow and product initiatives with ShapeNeural.",
  },
} as const;

export default function StudioContactPage() {
  const { language, setLanguage } = useStudioLanguage();
  const [searchParams] = useSearchParams();
  const requestedOffer = searchParams.get("offer") ?? "unsure";
  const referencedProject = (searchParams.get("project") ?? "").slice(0, 80);
  const initialOffer = useMemo(
    () => options[language].some((option) => option[0] === requestedOffer) ? requestedOffer : "unsure",
    [language, requestedOffer],
  );
  const [status, setStatus] = useState<SubmitState>("idle");
  const t = copy[language];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, language }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const emailSubject = language === "de" ? "ShapeNeural Projektanfrage" : "ShapeNeural project enquiry";

  return (
    <div className="ss-site ss-site--contact">
      <StudioMeta title={language === "de" ? "Kontakt und Fit-Check" : "Contact and fit check"} description={t.description} path="/kontakt" language={language} />
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main className="ss-contact ss-section">
        <section className="ss-contact__intro">
          <p className="ss-eyebrow">{t.label}</p>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <ul>{t.expectations.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
          <Link className="ss-text-link" to="/studio/leistungen">{t.back}<ArrowRight size={16} /></Link>
        </section>
        <section className="ss-contact__form-wrap" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="ss-visually-hidden">{t.label}</h2>
          {status === "success" ? (
            <div className="ss-contact__success" role="status"><Check size={30} /><p>{t.success}</p></div>
          ) : (
            <form className="ss-contact__form" onSubmit={handleSubmit}>
              {referencedProject ? <p className="ss-contact__reference"><span>{t.referenceProject}</span><strong>{referencedProject.replaceAll("-", " ")}</strong></p> : null}
              <input type="hidden" name="project" value={referencedProject} />
              <label><span>{t.name}</span><input name="name" required autoComplete="name" maxLength={120} /></label>
              <label><span>{t.company}</span><input name="company" autoComplete="organization" maxLength={160} /></label>
              <label><span>{t.email}</span><input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
              <label><span>{t.path}</span><select name="offer" defaultValue={initialOffer}>{options[language].map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
              <label className="ss-contact__message"><span>{t.message}</span><textarea name="message" required minLength={20} maxLength={3000} rows={7} placeholder={t.placeholder} /></label>
              <label className="ss-contact__honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
              <label className="ss-contact__consent"><input name="consent" type="checkbox" required value="yes" /><span>{t.privacy} <Link to="/datenschutz">{language === "de" ? "Datenschutz" : "Privacy"}</Link></span></label>
              {status === "error" ? <p className="ss-contact__error" role="alert">{t.error}</p> : null}
              <button className="ss-button ss-button--lime" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit}<ArrowRight size={18} /></button>
            </form>
          )}
          <div className="ss-contact__alternative"><span>{t.alternative}</span><a href={`mailto:signal@shapeneural.com?subject=${encodeURIComponent(emailSubject)}`}><Mail size={16} />signal@shapeneural.com</a></div>
        </section>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
