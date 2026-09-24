export interface OGMeta {
  title: string;
  description: string;
  type: string;
  canonical?: string;
  image?: string;
  id?: string;
  status?: string;
  lens?: string;
  projectTitle?: string;
  projectId?: string;
  date?: string;
}

export const OG_META: Record<string, OGMeta> = {
  "/": {
    title: "KI-Agentur & KI-Produktstudio Frankfurt | ShapeNeural",
    description: "ShapeNeural richtet KI für kleine Unternehmen praktisch ein, automatisiert kontrollierbare Workflows und baut testbare KI-Produkte – in Frankfurt und remote.",
    type: "website",
  },
  "/studio/leistungen": {
    title: "KI-Beratung, Automatisierung & Prototypen | ShapeNeural",
    description: "KI-Workspace, kontrollierbare Workflow-Automatisierung und KI-Prototypen für kleine Unternehmen – mit Ergebnis, Dauer, Preisrahmen und klaren Grenzen.",
    type: "website",
  },
  "/studio/projekte": {
    title: "KI-Projekte & digitale Produkte | ShapeNeural Portfolio",
    description: "KI-Produkte, Experimente und Partnerprojekte von ShapeNeural – mit Systembeschreibung, Projektstatus, technischen Details und übertragbarem Kundennutzen.",
    type: "website",
  },
  "/studio/lab": {
    title: "Applied AI Research & Signal Cloud | ShapeNeural Lab",
    description: "Das ShapeNeural Lab sammelt belegte KI-Signale, verbindet technologische und gesellschaftliche Entwicklungen und leitet bessere Produktfragen ab.",
    type: "website",
  },
  "/kontakt": {
    title: "KI-Projekt besprechen | ShapeNeural Fit-Check",
    description: "Beschreiben Sie Ihren KI-Workspace, Workflow oder Ihre Produktidee. ShapeNeural antwortet mit einer klaren Einschätzung zu Fit und nächstem Schritt.",
    type: "website",
  },
  "/impressum": { title: "Impressum — ShapeNeural", description: "Anbieterkennzeichnung und Kontaktangaben für ShapeNeural.", type: "website" },
  "/datenschutz": { title: "Datenschutz — ShapeNeural", description: "Informationen zur Verarbeitung von Daten auf der ShapeNeural Website.", type: "website" },
  "/agb": { title: "AGB — ShapeNeural", description: "Vertragsgrundlage für ShapeNeural Leistungen im B2B-Bereich.", type: "website" },
  "/studio/projekte/sapientblock": {
    title: "SAPIENTBLOCK: KI-Intelligence-Plattform | ShapeNeural",
    description: "Eine Intelligence-Plattform, die Unternehmensanalyse, semantisches Matching, Ideenentwicklung und Content Operations verbindet.",
    type: "website", id: "MOD_01", status: "LIVE",
  },
  "/studio/projekte/melodeye": {
    title: "MELODEYE: Emotion AI & adaptive Musik | ShapeNeural",
    description: "Ein Experiment für lokale multimodale Emotionssignale und adaptive Musik mit datenschutzbewusster Verarbeitung im Browser.",
    type: "website", id: "MOD_02", status: "BETA",
  },
  "/studio/projekte/problaim": {
    title: "PROBLAIM: autonome Multi-LLM-Analyse | ShapeNeural",
    description: "Eine autonome Multi-LLM-Pipeline, die komplexe Probleme in überprüfbare Perspektiven und fortlaufende Analysen zerlegt.",
    type: "website", id: "MOD_03", status: "BETA",
  },
  "/studio/projekte/veniora": {
    title: "VENIORA: regionale KI-Evidenzplattform | ShapeNeural",
    description: "Eine regionale Evidenzplattform für Beschäftigungsdaten, KI-Forschung und nachvollziehbare Befunde für alle 401 deutschen Kreise.",
    type: "website", id: "MOD_04", status: "LIVE",
  },
  "/studio/projekte/humancrypto": {
    title: "HUMANCRYP.TO: KI-Storytelling-Experiment | ShapeNeural",
    description: "Ein archiviertes Storytelling-Experiment, das Kryptowährungen über Archetypen und generative Medien als Figuren vermittelt.",
    type: "website", id: "MOD_05", status: "ARCHIVED",
  },
  "/studio/projekte/sapientshift": {
    title: "SAPIENTSHIFT: KI-Potenzialanalyse-Plattform | ShapeNeural",
    description: "Eine Plattform, die KI-Potenziale für Unternehmen, Mitarbeitende und Einzelpersonen in priorisierte nächste Schritte übersetzt.",
    type: "website", id: "MOD_06", status: "BETA",
  },
  "/studio/projekte/bitcoin-soundscape": {
    title: "Bitcoin Soundscape: KI-Marktdaten als Musik | ShapeNeural",
    description: "Ein Experiment, das fünf Zeitebenen des Bitcoin-Markts in einen kontinuierlichen KI-generierten Soundscape übersetzt.",
    type: "website", id: "MOD_07", status: "LIVE",
  },
};
