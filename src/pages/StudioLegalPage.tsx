import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { StudioFooter, StudioHeader } from "@/components/StudioChrome";
import { useStudioLanguage, type StudioLanguage } from "@/hooks/use-studio-language";
import StudioMeta from "@/components/StudioMeta";
import "@/studio-site.css";

export type StudioLegalPageKind = "imprint" | "privacy" | "terms";

type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

const routes: Record<StudioLegalPageKind, string> = {
  imprint: "/impressum",
  privacy: "/datenschutz",
  terms: "/agb",
};
const legalPages = Object.keys(routes) as StudioLegalPageKind[];

const pageLabels = {
  de: { imprint: "Impressum", privacy: "Datenschutz", terms: "AGB" },
  en: { imprint: "Legal notice", privacy: "Privacy", terms: "Terms" },
} as const;

const pageIntroductions = {
  de: {
    imprint: "Anbieterkennzeichnung und Kontaktangaben für ShapeNeural.",
    privacy: "Welche Daten beim Besuch und bei der Nutzung dieser Website verarbeitet werden.",
    terms: "Vertragsgrundlage für Beratungs-, Design-, Entwicklungs- und Enablement-Leistungen im B2B-Bereich.",
  },
  en: {
    imprint: "Provider identification and contact details for ShapeNeural.",
    privacy: "How data is processed when you visit and use this website.",
    terms: "The contractual basis for consulting, design, development and enablement services in a B2B context.",
  },
} as const;

function privacySections(language: StudioLanguage): LegalSection[] {
  const de = language === "de";

  return [
    {
      id: "controller",
      title: de ? "1. Verantwortlicher" : "1. Controller",
      paragraphs: [de
        ? "Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist der im Impressum bezeichnete Anbieter von ShapeNeural. Die vollständigen Kontaktdaten stehen im Impressum; Datenschutzanfragen können an signal@shapeneural.com gerichtet werden."
        : "The controller within the meaning of the General Data Protection Regulation (GDPR) is the ShapeNeural provider identified in the legal notice. Full contact details are provided there; privacy requests can be sent to signal@shapeneural.com."],
    },
    {
      id: "hosting",
      title: de ? "2. Hosting und Server-Protokolle" : "2. Hosting and server logs",
      paragraphs: [de
        ? "Die Website wird über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, bereitgestellt. Bei einem Seitenaufruf verarbeitet die Hosting-Infrastruktur technisch erforderliche Daten, insbesondere IP-Adresse, Zeitpunkt, angeforderte Ressource, Referrer, Browser-, Geräte- und Systeminformationen sowie Fehler- und Sicherheitsdaten."
        : "This website is delivered through Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When a page is requested, the hosting infrastructure processes technically necessary data, in particular the IP address, time, requested resource, referrer, browser, device and system information as well as error and security data.",
        de
          ? "Die Verarbeitung dient der sicheren, stabilen und missbrauchsfreien Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren technischen Betrieb. Soweit Daten in die USA übertragen werden, stützt Vercel Übermittlungen nach eigener Dokumentation unter anderem auf die EU-Standardvertragsklauseln."
          : "Processing is necessary to provide the website securely, reliably and without abuse. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is the secure technical operation of the site. Where data is transferred to the United States, Vercel states that it relies, among other safeguards, on the EU Standard Contractual Clauses.",
      ],
      links: [
        { label: de ? "Datenschutzhinweise von Vercel" : "Vercel Privacy Notice", href: "https://vercel.com/legal/privacy-notice" },
        { label: de ? "Vercel Data Processing Addendum" : "Vercel Data Processing Addendum", href: "https://vercel.com/legal/dpa" },
      ],
    },
    {
      id: "storage",
      title: de ? "3. Lokale Speicherung und Reichweitenmessung" : "3. Local storage and analytics",
      paragraphs: [de
        ? "ShapeNeural setzt auf den Studio-Seiten keine Analyse-, Werbe- oder Profiling-Cookies ein. Die gewählte Sprache wird unter dem Schlüssel „sn-studio-language“ lokal im Browser gespeichert. Diese Speicherung ist erforderlich, um die ausdrücklich gewählte Sprachversion dauerhaft bereitzustellen (§ 25 Abs. 2 Nr. 2 TDDDG)."
        : "ShapeNeural does not use analytics, advertising or profiling cookies on the studio pages. Your selected language is stored locally in your browser under the key ‘sn-studio-language’. This storage is necessary to persist the language version you explicitly requested (Section 25(2)(2) TDDDG).",
        de
          ? "Die auf dieser Website verwendeten Schriften werden lokal ausgeliefert. Beim Laden der Studio-Seiten wird deshalb keine Verbindung zu Google Fonts aufgebaut."
          : "The fonts used on this website are served locally. Loading the studio pages therefore does not initiate a connection to Google Fonts.",
      ],
    },
    {
      id: "contact",
      title: de ? "4. Kontaktaufnahme" : "4. Contact",
      paragraphs: [de
        ? "Wenn Sie über das Kontaktformular oder per E-Mail Kontakt aufnehmen, verarbeiten wir die von Ihnen übermittelten Angaben – insbesondere Name, E-Mail-Adresse, optionale Unternehmensangabe, gewählten Einstieg und Nachricht –, um Ihre Anfrage zu beantworten, ein Vorhaben anzubahnen oder die anschließende Geschäftsbeziehung zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglicher oder vertraglicher Kommunikation, ansonsten Art. 6 Abs. 1 lit. f DSGVO."
        : "When you contact us through the form or by email, we process the details you provide — in particular your name, email address, optional company, selected entry point and message — to answer your request, prepare a potential engagement or manage the subsequent business relationship. The legal basis is Art. 6(1)(b) GDPR for pre-contractual or contractual communication and otherwise Art. 6(1)(f) GDPR.",
        de
          ? "Für die E-Mail-Infrastruktur wird Private Email von Namecheap eingesetzt. Nachrichten werden gelöscht, sobald sie für den jeweiligen Zweck nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Interessen an einer längeren Speicherung bestehen."
          : "The email infrastructure uses Namecheap Private Email. Messages are deleted once they are no longer required for their purpose, unless statutory retention obligations or legitimate interests require a longer retention period.",
      ],
      links: [{ label: de ? "Datenschutzhinweise von Namecheap" : "Namecheap Privacy Policy", href: "https://www.namecheap.com/legal/general/privacy-policy/" }],
    },
    {
      id: "ai-tools",
      title: de ? "5. Optionale KI- und Lab-Funktionen" : "5. Optional AI and Lab features",
      paragraphs: [de
        ? "Einzelne experimentelle Lab-Funktionen können erst nach einer aktiven Eingabe Texte, Prompts oder Audio verarbeiten. Abhängig von der gewählten Funktion werden diese Inhalte an OpenAI Ireland Ltd. oder Nanonoble Pte. Ltd. (MiniMax) übermittelt, um eine Antwort, Transkription, Sprachausgabe oder generierten Inhalt bereitzustellen. Die Verarbeitung erfolgt nur, wenn die jeweilige Funktion bewusst gestartet wird."
        : "Some experimental Lab features process text, prompts or audio only after you actively provide input. Depending on the selected feature, this content is sent to OpenAI Ireland Ltd. or Nanonoble Pte. Ltd. (MiniMax) to provide a response, transcription, speech output or generated content. Processing only occurs when the relevant feature is deliberately started.",
        de
          ? "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bereitstellung der angeforderten Funktion erforderlich ist; bei einer gesondert erteilten Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Bitte übermitteln Sie über experimentelle Funktionen keine vertraulichen, besonderen oder fremden personenbezogenen Daten. KI-Ausgaben können unzutreffend sein und müssen vor einer Nutzung geprüft werden."
          : "The legal basis is Art. 6(1)(b) GDPR where processing is necessary to provide the requested feature, or Art. 6(1)(a) GDPR where separate consent is obtained. Do not enter confidential, sensitive or third-party personal data into experimental features. AI output may be inaccurate and must be reviewed before use.",
      ],
      links: [
        { label: de ? "Datenschutz und Auftragsverarbeitung bei OpenAI" : "OpenAI Data Processing Addendum", href: "https://openai.com/policies/data-processing-addendum/" },
        { label: de ? "Datenschutzhinweise von MiniMax" : "MiniMax Privacy Policy", href: "https://www.minimax.io/privacy-policy-v2.html" },
      ],
    },
    {
      id: "recipients",
      title: de ? "6. Empfänger und Drittlandübermittlungen" : "6. Recipients and international transfers",
      paragraphs: [de
        ? "Personenbezogene Daten erhalten nur die Dienstleister, die für Hosting, E-Mail-Kommunikation oder eine bewusst aufgerufene KI-Funktion erforderlich sind. Eine darüber hinausgehende Weitergabe erfolgt nur mit Einwilligung, zur Vertragserfüllung oder aufgrund einer gesetzlichen Pflicht. Bei Empfängern außerhalb des Europäischen Wirtschaftsraums werden – soweit erforderlich – geeignete Garantien wie Angemessenheitsbeschlüsse oder EU-Standardvertragsklauseln eingesetzt."
        : "Personal data is disclosed only to service providers required for hosting, email communication or an AI feature you deliberately invoke. Any further disclosure takes place only with consent, for contract performance or where required by law. For recipients outside the European Economic Area, appropriate safeguards such as adequacy decisions or EU Standard Contractual Clauses are used where required."],
    },
    {
      id: "retention",
      title: de ? "7. Speicherdauer" : "7. Retention",
      paragraphs: [de
        ? "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Danach werden die Daten gelöscht oder gesperrt, sofern handels- oder steuerrechtliche Aufbewahrungsfristen, die Sicherung rechtlicher Ansprüche oder andere gesetzliche Pflichten entgegenstehen. Technische Protokolldaten werden entsprechend den Sicherheits- und Aufbewahrungseinstellungen des Hosting-Anbieters begrenzt vorgehalten."
        : "We retain personal data only for as long as necessary for the relevant purpose. It is then deleted or restricted unless commercial or tax retention duties, the establishment of legal claims or other legal obligations require continued storage. Technical logs are retained for a limited period in accordance with the hosting provider's security and retention settings."],
    },
    {
      id: "rights",
      title: de ? "8. Ihre Rechte" : "8. Your rights",
      paragraphs: [de
        ? "Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Anfragen richten Sie bitte an signal@shapeneural.com."
        : "Subject to the applicable legal requirements, you have rights of access, rectification, erasure, restriction of processing, data portability and objection. Consent can be withdrawn at any time with effect for the future. Please send requests to signal@shapeneural.com.",
        de
          ? "Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren. Zuständig ist insbesondere der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Postfach 3163, 65021 Wiesbaden."
          : "You may also lodge a complaint with a data protection supervisory authority. The competent authority is, in particular, the Hessian Commissioner for Data Protection and Freedom of Information, Postfach 3163, 65021 Wiesbaden, Germany.",
      ],
      links: [{ label: de ? "Beschwerdeportal der hessischen Aufsicht" : "Hessian supervisory authority complaint portal", href: "https://datenschutz.hessen.de/service/beschwerde-uebermitteln" }],
    },
    {
      id: "automation",
      title: de ? "9. Automatisierte Entscheidungen" : "9. Automated decision-making",
      paragraphs: [de
        ? "Beim Besuch dieser Website findet keine ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung und kein personenbezogenes Profiling statt."
        : "Visiting this website does not involve solely automated decision-making with legal or similarly significant effects, nor personal profiling."],
    },
    {
      id: "changes",
      title: de ? "10. Änderungen dieser Erklärung" : "10. Changes to this notice",
      paragraphs: [de
        ? "Diese Datenschutzerklärung wird angepasst, wenn sich Funktionen, Dienstleister oder rechtliche Anforderungen ändern. Maßgeblich ist die auf dieser Seite veröffentlichte Fassung. Stand: 24. September 2026."
        : "This privacy notice will be updated when features, service providers or legal requirements change. The version published on this page is the current version. Last updated: 24 September 2026."],
    },
  ];
}

function termsSections(language: StudioLanguage): LegalSection[] {
  const de = language === "de";

  return [
    {
      id: "scope",
      title: de ? "1. Geltungsbereich" : "1. Scope",
      paragraphs: [de
        ? "Diese Allgemeinen Geschäftsbedingungen gelten für Verträge zwischen dem im Impressum bezeichneten Anbieter von ShapeNeural und Kunden, die bei Vertragsschluss als Unternehmer im Sinne des § 14 BGB, als juristische Person des öffentlichen Rechts oder als öffentlich-rechtliches Sondervermögen handeln. Verträge mit Verbrauchern werden auf dieser Grundlage nicht geschlossen."
        : "These terms apply to contracts between the ShapeNeural provider identified in the legal notice and customers acting as entrepreneurs within the meaning of Section 14 BGB, legal entities under public law or special funds under public law. Consumer contracts are not concluded on the basis of these terms.",
        de
          ? "Individuelle Angebote, Leistungsbeschreibungen und ausdrücklich vereinbarte Regelungen gehen diesen AGB vor. Entgegenstehende Bedingungen des Kunden gelten nur, wenn ShapeNeural ihnen ausdrücklich zugestimmt hat."
          : "Individual proposals, statements of work and expressly agreed provisions take precedence over these terms. Conflicting customer terms apply only where ShapeNeural has expressly accepted them.",
      ],
    },
    {
      id: "contract",
      title: de ? "2. Angebot und Vertragsschluss" : "2. Proposal and contract formation",
      paragraphs: [de
        ? "Darstellungen auf der Website sind unverbindlich. Ein Vertrag kommt durch die Annahme eines individuellen Angebots in Textform, eine Auftragsbestätigung oder den einvernehmlichen Beginn der Leistung zustande. Umfang, Ergebnis, Zeitplan und Vergütung ergeben sich aus dem jeweiligen Angebot."
        : "Content on the website is non-binding. A contract is formed by acceptance of an individual proposal in text form, an order confirmation or the mutually agreed start of services. Scope, deliverables, schedule and fees are set out in the relevant proposal."],
    },
    {
      id: "services",
      title: de ? "3. Leistungen und Arbeitsweise" : "3. Services and working method",
      paragraphs: [de
        ? "ShapeNeural erbringt insbesondere Beratungs-, Research-, Experience-Design-, Entwicklungs-, Prototyping-, Integrations-, Betriebs- und Enablement-Leistungen. Soweit kein bestimmter Erfolg ausdrücklich als Werk vereinbart ist, werden die Leistungen als Dienstleistungen erbracht. Methoden, technische Entscheidungen und der Einsatz geeigneter Werkzeuge liegen im fachlichen Ermessen von ShapeNeural innerhalb des vereinbarten Rahmens."
        : "ShapeNeural provides consulting, research, experience design, development, prototyping, integration, operations and enablement services. Unless a specific result is expressly agreed as a work product, services are provided on a time-and-effort basis. Methods, technical decisions and suitable tools remain within ShapeNeural's professional discretion and the agreed scope."],
    },
    {
      id: "cooperation",
      title: de ? "4. Mitwirkung des Kunden" : "4. Customer cooperation",
      paragraphs: [de
        ? "Der Kunde stellt rechtzeitig die erforderlichen Ansprechpartner, Informationen, Inhalte, Zugänge, Daten und Entscheidungen bereit und sichert zu, dass deren Nutzung rechtlich zulässig ist. Verzögerungen oder Mehraufwand aufgrund verspäteter, unvollständiger oder fehlerhafter Mitwirkung können Termine verschieben und nach dem vereinbarten Satz zusätzlich berechnet werden."
        : "The customer provides the necessary contacts, information, content, access, data and decisions in due time and warrants that their use is lawful. Delayed, incomplete or incorrect cooperation may shift deadlines and result in additional effort charged at the agreed rate."],
    },
    {
      id: "changes",
      title: de ? "5. Änderungen des Umfangs" : "5. Scope changes",
      paragraphs: [de
        ? "Änderungswünsche außerhalb des vereinbarten Umfangs werden vor der Umsetzung hinsichtlich Auswirkung, Aufwand, Kosten und Zeitplan abgestimmt. ShapeNeural ist nicht verpflichtet, zusätzliche Leistungen ohne entsprechende Vereinbarung zu erbringen."
        : "Changes outside the agreed scope are assessed for impact, effort, cost and schedule before implementation. ShapeNeural is not required to provide additional services without a corresponding agreement."],
    },
    {
      id: "fees",
      title: de ? "6. Vergütung und Zahlung" : "6. Fees and payment",
      paragraphs: [de
        ? "Es gilt die im Angebot vereinbarte Vergütung zuzüglich gesetzlicher Umsatzsteuer, soweit diese anfällt. Rechnungen sind, sofern im Angebot nichts anderes geregelt ist, innerhalb von 14 Kalendertagen ohne Abzug fällig. Vereinbarte Fremdkosten, Lizenzen, Reisen oder sonstige Auslagen werden nur im abgestimmten Umfang zusätzlich berechnet."
        : "The fees agreed in the proposal apply plus statutory VAT where applicable. Unless the proposal states otherwise, invoices are due within 14 calendar days without deduction. Agreed third-party costs, licences, travel or other expenses are charged additionally only within the agreed scope."],
    },
    {
      id: "delivery",
      title: de ? "7. Termine, Übergabe und Abnahme" : "7. Schedule, delivery and acceptance",
      paragraphs: [de
        ? "Termine sind nur verbindlich, wenn sie ausdrücklich als verbindlich vereinbart wurden. Soweit eine Werkleistung vereinbart ist, prüft der Kunde das bereitgestellte Ergebnis zeitnah und erklärt die Abnahme, wenn es im Wesentlichen vertragsgemäß ist. Wesentliche Mängel sind nachvollziehbar zu beschreiben; ShapeNeural erhält eine angemessene Gelegenheit zur Nachbesserung. Gesetzliche Abnahmeregeln bleiben unberührt."
        : "Dates are binding only when expressly agreed as binding. Where a work product has been agreed, the customer reviews the delivered result promptly and accepts it if it materially conforms to the contract. Material defects must be described in a reproducible manner; ShapeNeural is given a reasonable opportunity to remedy them. Statutory acceptance rules remain unaffected."],
    },
    {
      id: "rights",
      title: de ? "8. Nutzungsrechte" : "8. Usage rights",
      paragraphs: [de
        ? "Nach vollständiger Zahlung erhält der Kunde die im Angebot vereinbarten Nutzungsrechte an den individuell erstellten Ergebnissen. Vorbestehende Methoden, Frameworks, Bibliotheken, generische Komponenten, Know-how und Werkzeuge von ShapeNeural bleiben bei ShapeNeural; der Kunde erhält daran die für die vereinbarte Nutzung erforderlichen Rechte. Für Open-Source-Software und Leistungen Dritter gelten deren jeweilige Lizenzbedingungen."
        : "After full payment, the customer receives the usage rights agreed in the proposal for individually created deliverables. ShapeNeural's pre-existing methods, frameworks, libraries, generic components, know-how and tools remain with ShapeNeural; the customer receives the rights required for the agreed use. Open-source software and third-party services remain subject to their respective licence terms.",
        de
          ? "Eine Veröffentlichung des Kundennamens oder Projekts als Referenz erfolgt nur auf Grundlage einer gesonderten Abstimmung."
          : "The customer's name or project is published as a reference only following separate approval.",
      ],
    },
    {
      id: "ai",
      title: de ? "9. KI-Systeme und Drittanbieter" : "9. AI systems and third-party services",
      paragraphs: [de
        ? "KI-Modelle erzeugen probabilistische Ergebnisse. ShapeNeural schuldet ohne ausdrückliche Vereinbarung keine Fehlerfreiheit, Vollständigkeit oder rechtliche Verwendbarkeit einzelner KI-Ausgaben. Ergebnisse sind vor produktiver Nutzung risikogerecht durch Menschen zu prüfen. Der Kunde bleibt für fachliche Entscheidungen, Freigaben und den rechtmäßigen Einsatz in seinem Verantwortungsbereich verantwortlich."
        : "AI models produce probabilistic output. Unless expressly agreed, ShapeNeural does not warrant that individual AI outputs are error-free, complete or legally usable. Results must receive risk-appropriate human review before production use. The customer remains responsible for domain decisions, approvals and lawful use within its area of responsibility.",
        de
          ? "Soweit für ein Projekt Drittanbieter, Modelle oder Cloud-Dienste erforderlich sind, werden Auswahl, Kosten, Datenverarbeitung und wesentliche Abhängigkeiten im Angebot oder Projektverlauf transparent gemacht."
          : "Where a project requires third-party providers, models or cloud services, their selection, cost, data processing and material dependencies are made transparent in the proposal or during the project."],
    },
    {
      id: "confidentiality",
      title: de ? "10. Vertraulichkeit und Datenschutz" : "10. Confidentiality and data protection",
      paragraphs: [de
        ? "Beide Parteien behandeln nicht öffentliche geschäftliche, technische und organisatorische Informationen vertraulich und verwenden sie nur für die Vertragsdurchführung. Gesetzliche Offenlegungspflichten bleiben unberührt. Soweit ShapeNeural personenbezogene Daten im Auftrag verarbeitet, schließen die Parteien vor Beginn der Verarbeitung eine erforderliche Vereinbarung zur Auftragsverarbeitung."
        : "Both parties treat non-public business, technical and organisational information as confidential and use it only to perform the contract. Statutory disclosure obligations remain unaffected. Where ShapeNeural processes personal data on the customer's behalf, the parties enter into any required data processing agreement before processing begins."],
    },
    {
      id: "liability",
      title: de ? "11. Gewährleistung und Haftung" : "11. Warranty and liability",
      paragraphs: [de
        ? "ShapeNeural haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz sowie im Umfang ausdrücklich übernommener Garantien. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen."
        : "ShapeNeural has unlimited liability for intent and gross negligence, injury to life, body or health, under the German Product Liability Act and within the scope of expressly assumed guarantees. For a slightly negligent breach of essential contractual obligations, liability is limited to the foreseeable, typical contractual damage at the time the contract was concluded. Liability for other cases of slight negligence is excluded."],
    },
    {
      id: "term",
      title: de ? "12. Laufzeit und Beendigung" : "12. Term and termination",
      paragraphs: [de
        ? "Laufzeit und ordentliche Kündigung richten sich nach dem jeweiligen Angebot. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt bestehen. Bis zum Wirksamwerden der Beendigung erbrachte Leistungen, fest beauftragte Fremdkosten und ordnungsgemäße Übergabeaufwände werden vergütet."
        : "The term and ordinary termination rights are set out in the relevant proposal. The right to terminate for cause remains unaffected. Services performed, firmly committed third-party costs and proper handover effort incurred up to the effective date of termination remain payable."],
    },
    {
      id: "final",
      title: de ? "13. Schlussbestimmungen" : "13. Final provisions",
      paragraphs: [de
        ? "Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist – soweit gesetzlich zulässig – Frankfurt am Main Gerichtsstand. Änderungen und Ergänzungen sollen in Textform dokumentiert werden. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt; an die Stelle der unwirksamen Regelung tritt das Gesetz. Stand: 24. September 2026."
        : "German law applies to the exclusion of the UN Convention on Contracts for the International Sale of Goods. Where the customer is a merchant, legal entity under public law or special fund under public law, Frankfurt am Main is the venue to the extent permitted by law. Amendments and additions should be documented in text form. If any provision is invalid, the remaining provisions remain effective and the statutory rule applies in place of the invalid provision. Last updated: 24 September 2026."],
    },
  ];
}

function LegalNavigation({ current, language }: { current: StudioLegalPageKind; language: StudioLanguage }) {
  return (
    <nav className="ss-legal__tabs" aria-label={language === "de" ? "Rechtliche Seiten" : "Legal pages"}>
      {legalPages.map((key, index) => (
        <Link key={key} to={routes[key]} aria-current={current === key ? "page" : undefined}>
          <span>0{index + 1}</span>
          {pageLabels[language][key]}
          <ArrowRight size={15} />
        </Link>
      ))}
    </nav>
  );
}

function ImprintContent({ language }: { language: StudioLanguage }) {
  const de = language === "de";

  return (
    <>
      <section className="ss-legal__section" aria-labelledby="provider-title">
        <p className="ss-legal__number">01</p>
        <div>
          <h2 id="provider-title">{de ? "Angaben gemäß § 5 DDG" : "Information under Section 5 DDG"}</h2>
          <address className="ss-legal__address">
            <strong>ShapeNeural</strong>
            <span>Aeron Avci</span>
            <span>Wasserhofstraße 47</span>
            <span>60529 Frankfurt am Main</span>
            <span>{de ? "Deutschland" : "Germany"}</span>
          </address>
        </div>
      </section>
      <section className="ss-legal__section" aria-labelledby="contact-title">
        <p className="ss-legal__number">02</p>
        <div>
          <h2 id="contact-title">{de ? "Kontakt" : "Contact"}</h2>
          <p>{de ? "E-Mail" : "Email"}: <a href="mailto:signal@shapeneural.com">signal@shapeneural.com</a></p>
          <p>{de
            ? "ShapeNeural bietet Beratung, Design, Entwicklung, Betrieb und Enablement für angewandte KI-Systeme an. Die Angebote richten sich an Unternehmen und selbstständig beruflich Tätige."
            : "ShapeNeural provides consulting, design, development, operations and enablement for applied AI systems. Services are offered to businesses and self-employed professionals."}</p>
        </div>
      </section>
      <section className="ss-legal__section" aria-labelledby="editorial-title">
        <p className="ss-legal__number">03</p>
        <div>
          <h2 id="editorial-title">{de ? "Redaktionelle Verantwortung" : "Editorial responsibility"}</h2>
          <p>{de
            ? "Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV: Aeron Avci, Anschrift wie oben."
            : "Responsible for journalistic and editorial content under Section 18(2) MStV: Aeron Avci, address as above."}</p>
        </div>
      </section>
      <section className="ss-legal__section" aria-labelledby="copyright-title">
        <p className="ss-legal__number">04</p>
        <div>
          <h2 id="copyright-title">{de ? "Urheberrecht" : "Copyright"}</h2>
          <p>{de
            ? "Die von ShapeNeural erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Inhalte Dritter sind als solche gekennzeichnet oder werden auf Grundlage entsprechender Nutzungsrechte verwendet."
            : "Content and works created by ShapeNeural on this website are subject to German copyright law. Third-party content is identified as such or used under the relevant usage rights."}</p>
          <p>{de ? "Stand: 24. September 2026." : "Last updated: 24 September 2026."}</p>
        </div>
      </section>
    </>
  );
}

function SectionList({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section className="ss-legal__section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
          <p className="ss-legal__number">{section.title.split(".")[0].padStart(2, "0")}</p>
          <div>
            <h2 id={`${section.id}-title`}>{section.title.replace(/^\d+\.\s*/, "")}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            {section.links ? (
              <div className="ss-legal__links">
                {section.links.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.label}<ExternalLink size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}

export default function StudioLegalPage({ page }: { page: StudioLegalPageKind }) {
  const { language, setLanguage } = useStudioLanguage();
  const title = pageLabels[language][page];
  const description = pageIntroductions[language][page];
  return (
    <div className="ss-site ss-site--legal">
      <StudioMeta title={title} description={description} path={routes[page]} language={language} />
      <StudioHeader language={language} onLanguage={() => setLanguage(language === "de" ? "en" : "de")} />
      <main>
        <header className="ss-legal__hero ss-section">
          <p className="ss-eyebrow">ShapeNeural / Legal</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <LegalNavigation current={page} language={language} />
        </header>
        <div className="ss-legal__body ss-section">
          <aside>
            <span>{language === "de" ? "Stand" : "Updated"}</span>
            <strong>24 / 09 / 2026</strong>
            <p>{language === "de"
              ? "Klar lesbar, direkt erreichbar und getrennt nach Zweck."
              : "Readable, directly accessible and separated by purpose."}</p>
            <a href="mailto:signal@shapeneural.com">
              signal@shapeneural.com<ArrowRight size={15} />
            </a>
          </aside>
          <article>
            {page === "imprint" ? <ImprintContent language={language} /> : null}
            {page === "privacy" ? <SectionList sections={privacySections(language)} /> : null}
            {page === "terms" ? <SectionList sections={termsSections(language)} /> : null}
          </article>
        </div>
      </main>
      <StudioFooter language={language} />
    </div>
  );
}
