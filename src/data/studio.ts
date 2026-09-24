import type { StudioLanguage } from "@/hooks/use-studio-language";

export type Localized = Record<StudioLanguage, string>;

export interface StudioOffer {
  id: "augment" | "transform" | "create";
  number: string;
  label: string;
  title: Localized;
  promise: Localized;
  question: Localized;
  outcome: Localized;
  frame: Localized;
  description: Localized;
  deliverables: Record<StudioLanguage, string[]>;
  phases: Record<StudioLanguage, string[]>;
  boundaries: Record<StudioLanguage, string[]>;
  proof: "example" | "portfolio";
}

export const STUDIO_OFFERS: StudioOffer[] = [
  {
    id: "augment",
    number: "01",
    label: "AUGMENT",
    title: { de: "AI Workspace Setup", en: "AI Workspace Setup" },
    promise: { de: "KI in der bestehenden Arbeit sinnvoll nutzbar machen.", en: "Put AI to practical use in the work you already do." },
    question: { de: "KI ist da – aber noch kein verlässlicher Teil der Arbeit.", en: "AI is present — but not yet a reliable part of the work." },
    outcome: { de: "Eine eingerichtete Arbeitsumgebung mit 2–5 direkt nutzbaren Anwendungsfällen.", en: "A configured working environment with 2–5 ready-to-use applications." },
    frame: { de: "Klar begrenztes Setup · Festpreis nach Bestandsaufnahme", en: "Clearly scoped setup · fixed price after assessment" },
    description: { de: "Wir verstehen Ihre heutige Arbeit, wählen passende Werkzeuge aus und richten konkrete Assistenten, Wissensquellen und Routinen ein. Kein allgemeines KI-Training – nach dem Projekt ist etwas einsatzbereit.", en: "We understand your current work, select suitable tools and configure concrete assistants, knowledge sources and routines. No generic AI training — something is ready to use when the project ends." },
    deliverables: {
      de: ["AI Work Assessment", "Plattformempfehlung", "Eingerichteter AI Workspace", "2–5 implementierte Use Cases", "Prompt- und Instruction Library", "Handover Session"],
      en: ["AI work assessment", "Platform recommendation", "Configured AI workspace", "2–5 implemented use cases", "Prompt and instruction library", "Handover session"],
    },
    phases: { de: ["Verstehen", "Konfigurieren", "Implementieren", "Befähigen"], en: ["Understand", "Configure", "Implement", "Enable"] },
    boundaries: {
      de: ["Keine umfassende Prozessneugestaltung", "Keine individuellen Enterprise-Integrationen", "Keine dauerhafte Administration Ihrer IT"],
      en: ["No end-to-end process redesign", "No custom enterprise integrations", "No permanent administration of your IT"],
    },
    proof: "example",
  },
  {
    id: "transform",
    number: "02",
    label: "TRANSFORM",
    title: { de: "AI Workflow Build", en: "AI Workflow Build" },
    promise: { de: "Arbeit nicht nur beschleunigen, sondern neu gestalten.", en: "Redesign the work — not just accelerate it." },
    question: { de: "Ein wichtiger Ablauf kostet zu viel Zeit, Qualität oder Aufmerksamkeit.", en: "A critical workflow consumes too much time, quality or attention." },
    outcome: { de: "Ein implementierter, getesteter Workflow mit klaren menschlichen Kontrollpunkten.", en: "An implemented, tested workflow with explicit human checkpoints." },
    frame: { de: "Definierter Projektumfang · verbindlicher Projektpreis", en: "Defined project scope · committed project price" },
    description: { de: "Wir kartieren einen konkreten Ablauf und fragen: Wie würde er aussehen, wenn KI von Beginn an mitgedacht wäre? Daraus bauen wir einen leichten Workflow aus Assistenten, Agenten, Automationen und menschlichen Freigaben.", en: "We map one concrete process and ask how it would work if AI had been considered from the start. We then build a lightweight workflow combining assistants, agents, automation and human approvals." },
    deliverables: {
      de: ["Current Workflow Map", "AI Opportunity Map", "Future Workflow Blueprint", "Assistenten oder Agenten", "Leichte Automationen", "Evaluation Scorecard", "Runbook und Übergabe"],
      en: ["Current workflow map", "AI opportunity map", "Future workflow blueprint", "Assistants or agents", "Lightweight automations", "Evaluation scorecard", "Runbook and handover"],
    },
    phases: { de: ["Abbilden", "Neu gestalten", "Bauen", "Validieren", "Übergeben"], en: ["Map", "Redesign", "Build", "Validate", "Transfer"] },
    boundaries: {
      de: ["Ein klar abgegrenzter Workflow", "Keine ERP- oder Kernsystemmigration", "Keine produktionskritische 24/7-Verantwortung"],
      en: ["One clearly bounded workflow", "No ERP or core-system migration", "No production-critical 24/7 responsibility"],
    },
    proof: "example",
  },
  {
    id: "create",
    number: "03",
    label: "CREATE",
    title: { de: "AI Product Sprint", en: "AI Product Sprint" },
    promise: { de: "Eine neue KI-Idee real und entscheidbar machen.", en: "Make a new AI idea tangible and decidable." },
    question: { de: "Eine KI-Idee braucht einen realen Test statt weiterer Annahmen.", en: "An AI idea needs a real test rather than more assumptions." },
    outcome: { de: "Ein funktionaler Prototyp, reale Erkenntnisse und eine klare Go-, Change- oder Stop-Entscheidung.", en: "A functional prototype, real evidence and a clear go, change or stop decision." },
    frame: { de: "Fokussierter Sprint · verbindlicher Projektpreis", en: "Focused sprint · committed project price" },
    description: { de: "Wir übersetzen eine Idee in ein Produktkonzept, bauen die kleinste sinnvolle Version und testen, ob Problem, Interaktion und KI-Qualität tragen. Ziel ist nicht Enterprise-Software, sondern eine belastbare Entscheidung.", en: "We turn an idea into a product concept, build the smallest meaningful version and test whether the problem, interaction and AI quality hold up. The goal is not enterprise software, but an evidence-based decision." },
    deliverables: {
      de: ["Opportunity Brief", "AI Product Canvas", "Experience Concept", "Funktionaler Prototyp", "Validation Report", "Product Roadmap", "Build- oder Partnerempfehlung"],
      en: ["Opportunity brief", "AI product canvas", "Experience concept", "Functional prototype", "Validation report", "Product roadmap", "Build or partner recommendation"],
    },
    phases: { de: ["Entdecken", "Entwerfen", "Prototyp bauen", "Validieren", "Entscheiden"], en: ["Discover", "Design", "Prototype", "Validate", "Decide"] },
    boundaries: {
      de: ["Prototyp statt fertiger Enterprise-Plattform", "Keine unbegrenzte Feature-Entwicklung", "Produktionsreife wird separat entschieden"],
      en: ["Prototype rather than a finished enterprise platform", "No open-ended feature development", "Production readiness is decided separately"],
    },
    proof: "portfolio",
  },
];

export const PROJECT_SUMMARIES: Record<string, Localized> = {
  sapientblock: { de: "Verbindet Unternehmensanalyse, semantisches Matching, Ideenentwicklung und Content Operations in einer Intelligence-Plattform.", en: "Connects company analysis, semantic matching, idea generation and content operations in one intelligence platform." },
  melodeye: { de: "Übersetzt multimodale Emotionssignale datenschutzbewusst in adaptive Musik.", en: "Turns multimodal emotion signals into adaptive music while keeping biometrics in the browser." },
  problaim: { de: "Zerlegt komplexe Probleme mit einer autonomen Multi-LLM-Pipeline in belastbare Perspektiven.", en: "Decomposes complex problems into robust perspectives through an autonomous multi-LLM pipeline." },
  veniora: { de: "Verbindet regionale Beschäftigungsdaten und KI-Forschung zu nachvollziehbarer Evidenz für alle 401 deutschen Kreise.", en: "Connects regional employment data and AI research into inspectable evidence for all 401 German districts." },
  humancrypto: { de: "Macht Kryptowährungen über Archetypen, Emotion und KI-generierte Figuren verständlich.", en: "Makes cryptocurrencies approachable through archetypes, emotion and AI-generated characters." },
  sapientshift: { de: "Übersetzt KI-Potenziale für Unternehmen und Menschen in priorisierte nächste Schritte.", en: "Turns AI potential for organisations and people into prioritised next steps." },
  "bitcoin-soundscape": { de: "Verwandelt fünf Zeitebenen des Bitcoin-Markts in einen kontinuierlichen KI-Soundscape.", en: "Turns five time layers of the Bitcoin market into a continuous AI soundscape." },
};
