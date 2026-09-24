import type { StudioLanguage } from "@/hooks/use-studio-language";
import sapientblockHome from "@/assets/project-media/sapientblock-home.jpg";
import sapientblockSystem from "@/assets/project-media/sapientblock-system.jpg";
import sapientblockDetail from "@/assets/project-media/sapientblock-detail.jpg";
import sapientblockBanking from "@/assets/project-media/sapientblock-usecase-banking.jpg";
import sapientblockMedia from "@/assets/project-media/sapientblock-usecase-media.jpg";
import sapientblockClimate from "@/assets/project-media/sapientblock-usecase-climate.jpg";
import melodeyeHome from "@/assets/project-media/melodeye-home.jpg";
import melodeyeSystem from "@/assets/project-media/melodeye-system.jpg";
import problaimHome from "@/assets/project-media/problaim-home.jpg";
import problaimSystem from "@/assets/project-media/problaim-system.jpg";
import humancryptoHome from "@/assets/project-media/humancrypto-home.jpg";
import humancryptoStory from "@/assets/project-media/humancrypto-story.jpg";
import sapientshiftHome from "@/assets/project-media/sapientshift-home.jpg";
import sapientshiftSystem from "@/assets/project-media/sapientshift-system.jpg";
import bitcoinSoundscape from "@/assets/btc-radio-screenshot.png";

export type ProjectMedia = {
  src: string;
  device: "laptop" | "phone" | "plain";
};

type ProjectNarrative = {
  question: string;
  summary: string;
  challengeTitle: string;
  challengeBody: string;
  systemTitle: string;
  capabilities: Array<{ title: string; body: string }>;
  transferTitle: string;
  transferIntro: string;
  transfers: Array<{ title: string; body: string }>;
  value: string;
  learning: string;
  mediaCaptions: string[];
  facts: Array<{ value: string; label: string }>;
};

export type ProjectDetail = {
  media: ProjectMedia[];
  narrative: Record<StudioLanguage, ProjectNarrative>;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  sapientblock: {
    media: [
      { src: sapientblockHome, device: "laptop" },
      { src: sapientblockSystem, device: "laptop" },
      { src: sapientblockDetail, device: "phone" },
      { src: sapientblockBanking, device: "plain" },
      { src: sapientblockMedia, device: "plain" },
      { src: sapientblockClimate, device: "plain" },
    ],
    narrative: {
      de: {
        question: "Wie wird aus einer abstrakten Technologiefrage ein belastbarer Entscheidungs- und Innovationsprozess?",
        summary: "SAPIENTBLOCK ist eine wachsende Intelligence-Plattform für Blockchain-Anwendungen. Sie analysiert den Kontext eines Unternehmens, gleicht ihn mit hunderten veröffentlichten Use Cases aus 74 Branchen ab und übersetzt das Ergebnis in relevante Beispiele, neue Ideen und nächste Schritte.",
        challengeTitle: "Nicht mehr Technologie erklären. Relevanz für ein konkretes Unternehmen beweisen.",
        challengeBody: "Mittelständische Unternehmen brauchen keine weitere Liste möglicher Blockchain-Anwendungen. Sie müssen erkennen, welche Muster zu ihrem Geschäft, ihren Prozessen und ihrem Reifegrad passen. SAPIENTBLOCK verbindet deshalb kuratierte Evidenz, Unternehmenskontext und mehrere KI-Funktionen zu einem durchgängigen Produktsystem.",
        systemTitle: "Sechs Bausteine arbeiten als ein System.",
        capabilities: [
          { title: "Unternehmensanalyse", body: "Website und Eingaben werden in ein strukturiertes Unternehmensprofil mit Branche, Wertschöpfung und Herausforderungen übersetzt." },
          { title: "Semantisches Matching", body: "Ein RAG-gestützter Abgleich priorisiert passende Anwendungen aus dem kuratierten Use-Case-Bestand – nachvollziehbar statt zufällig." },
          { title: "Ideengenerator", body: "Cross-Industry-Muster und passende Fälle werden zu neuen, unternehmensspezifischen Produkt- und Prozessideen kombiniert." },
          { title: "Insights & Benchmarks", body: "Der Bestand wird nach Branchen, Reifegraden und Mustern auswertbar. So entsteht aus einzelnen Cases ein strategischer Vergleichsraum." },
          { title: "Content Operations", body: "Eine redaktionelle Pipeline erzeugt aus strukturierten Daten neue Inhalte und bereitet deren Veröffentlichung für Website und Social Media vor." },
          { title: "LLM-Lesbarkeit", body: "Use Cases werden zusätzlich als Markdown, JSON-LD, llms.txt und statische Seiten publiziert, damit Suchmaschinen und KI-Systeme sie zuverlässig verstehen." },
        ],
        transferTitle: "Was ein Kunde daraus für sein eigenes Geschäft ableiten kann.",
        transferIntro: "SAPIENTBLOCK ist kein Template für Blockchain. Es zeigt ein übertragbares Muster für wissensintensive Produkte: Daten sammeln, Kontext verstehen, Relevanz berechnen, Inhalte erzeugen und laufend lernen.",
        transfers: [
          { title: "Verteiltes Wissen nutzbar machen", body: "Interne Dokumente, Cases oder Richtlinien können in eine kuratierte Wissensbasis mit kontextbezogener Suche und Empfehlungen übersetzt werden." },
          { title: "Leads qualifizieren", body: "Eine Website kann den Bedarf eines Besuchers erfassen und sofort passende Angebote, Beispiele oder nächste Schritte ausspielen." },
          { title: "Content skalieren", body: "Strukturierte Produkt- oder Fachdaten können automatisiert in hochwertige Web-, Social- und maschinenlesbare Inhalte überführt werden." },
        ],
        value: "Aus einer unübersichtlichen Technologielandschaft wird eine verständliche, individuelle Entscheidungsgrundlage – und aus statischem Content ein lernendes Produkt.",
        learning: "Die stärkste KI-Funktion ist nicht die einzelne Antwort. Entscheidend ist die Verbindung aus verlässlichen Daten, Kontext, nachvollziehbarem Matching und einem redaktionell kontrollierten Betrieb.",
        mediaCaptions: ["Frühe Analyseoberfläche: Eine Website wird zum Ausgangspunkt der Einordnung.", "Der Analysepfad verbindet Unternehmenskontext und konkrete Empfehlungen.", "Auch auf kleinen Screens bleibt der Einstieg fokussiert.", "Reale Use Cases bilden die Evidenzschicht des Systems.", "Redaktionell aufbereitete Beispiele machen komplexe Anwendungen zugänglich.", "Der Bestand verbindet wirtschaftliche, öffentliche und ökologische Kontexte."],
        facts: [{ value: "300+", label: "veröffentlichte Use Cases" }, { value: "74", label: "abgedeckte Branchen" }, { value: "6", label: "verknüpfte Systembausteine" }],
      },
      en: {
        question: "How can an abstract technology question become a robust decision and innovation process?",
        summary: "SAPIENTBLOCK is a growing intelligence platform for blockchain applications. It analyses a company’s context, matches it with hundreds of published use cases across 74 industries and translates the result into relevant examples, new ideas and concrete next steps.",
        challengeTitle: "Stop explaining technology. Prove its relevance to one specific company.",
        challengeBody: "SMEs do not need another list of possible blockchain applications. They need to understand which patterns fit their business, processes and maturity. SAPIENTBLOCK therefore connects curated evidence, company context and multiple AI capabilities in one coherent product system.",
        systemTitle: "Six capabilities operate as one system.",
        capabilities: [
          { title: "Company analysis", body: "A website and direct input become a structured company portrait covering industry, value creation and relevant challenges." },
          { title: "Semantic matching", body: "RAG-assisted retrieval prioritises applications from a curated use-case base — traceably rather than randomly." },
          { title: "Idea generator", body: "Cross-industry patterns and relevant cases are combined into company-specific product and process ideas." },
          { title: "Insights & benchmarks", body: "The collection becomes explorable by industry, maturity and patterns, turning individual cases into a strategic comparison space." },
          { title: "Content operations", body: "An editorial pipeline turns structured data into new content and prepares distribution across the website and social channels." },
          { title: "LLM readability", body: "Use cases are also published as Markdown, JSON-LD, llms.txt and static pages so search engines and AI systems can understand them reliably." },
        ],
        transferTitle: "What a client can take from this for their own business.",
        transferIntro: "SAPIENTBLOCK is not a blockchain template. It demonstrates a reusable pattern for knowledge-heavy products: collect evidence, understand context, calculate relevance, produce content and keep learning.",
        transfers: [
          { title: "Make distributed knowledge usable", body: "Internal documents, cases or policies can become a curated knowledge base with contextual search and recommendations." },
          { title: "Qualify demand", body: "A website can understand a visitor’s situation and immediately surface suitable offers, examples or next steps." },
          { title: "Scale content", body: "Structured product or expert data can be transformed into high-quality web, social and machine-readable content." },
        ],
        value: "A confusing technology landscape becomes a clear, individual basis for decision-making — while static content becomes a learning product.",
        learning: "The strongest AI capability is not a single answer. Value comes from connecting reliable evidence, context, traceable matching and editorially controlled operations.",
        mediaCaptions: ["Early analysis surface: a company website starts the assessment.", "The analysis path connects business context and concrete recommendations.", "The focused entry point remains legible on smaller screens.", "Real use cases form the system’s evidence layer.", "Editorial presentation makes complex applications approachable.", "The collection links commercial, public and environmental contexts."],
        facts: [{ value: "300+", label: "published use cases" }, { value: "74", label: "industries covered" }, { value: "6", label: "connected capabilities" }],
      },
    },
  },
  melodeye: {
    media: [{ src: melodeyeHome, device: "laptop" }, { src: melodeyeSystem, device: "phone" }],
    narrative: {
      de: {
        question: "Kann ein digitales System auf erlebte statt nur auf gezeigte Emotion reagieren?",
        summary: "MELODEYE kombiniert Gesichtsausdruck, Blickrichtung und Pupillendynamik direkt im Browser. Aus der Differenz zwischen sichtbarer und erlebter Emotion entsteht eine adaptive musikalische Reaktion.",
        challengeTitle: "Emotion ist kein einzelner Messwert.",
        challengeBody: "Ein Lächeln kann Freude, Anspannung oder soziale Anpassung bedeuten. Das Experiment untersucht deshalb nicht nur Ausdruck, sondern die Differenz zwischen mehreren Signalen – und hält biometrische Rohdaten auf dem Gerät.",
        systemTitle: "Von multimodalen Signalen zu einer vorsichtigen Reaktion.",
        capabilities: [{ title: "Lokale Wahrnehmung", body: "Gesicht, Blick und Pupillendynamik werden im Browser verarbeitet." }, { title: "Gap-aware interpretation", body: "Das System reagiert auf Abweichungen zwischen sichtbaren und abgeleiteten Signalen." }, { title: "Adaptive Musik", body: "Die ermittelte Situation steuert Auswahl und Generierung einer musikalischen Antwort." }],
        transferTitle: "Wo dieses Prinzip anschlussfähig ist.",
        transferIntro: "Der Case zeigt, wie sensible Signale lokal verarbeitet und in eine zurückhaltende, erklärbare Reaktion übersetzt werden können.",
        transfers: [{ title: "Adaptive Interfaces", body: "Digitale Produkte können ihre Dichte oder Unterstützung an Nutzungssignale anpassen." }, { title: "Wellbeing", body: "Reflexions- und Entspannungsangebote können kontextbezogener reagieren, ohne Rohdaten zentral zu speichern." }, { title: "Privacy by design", body: "Sensible Modelle können gezielt auf dem Gerät statt in der Cloud laufen." }],
        value: "Das Projekt untersucht personalisierte Interaktion, ohne biometrische Rohdaten an einen Server zu übertragen.",
        learning: "Multimodale Signale sind aussagekräftiger als ein einzelner Klassifikator – erfordern aber klare Sicherheitslogik und eine bescheidene Interpretation.",
        mediaCaptions: ["Der Experience-Start verbindet Modellwahl und musikalische Reaktion.", "Die reduzierte Oberfläche macht den experimentellen Charakter sichtbar."],
        facts: [{ value: "3", label: "kombinierte Signalschichten" }, { value: "LOCAL", label: "Verarbeitung biometrischer Daten" }, { value: "BETA", label: "aktiver Experimentstatus" }],
      },
      en: {
        question: "Can a digital system respond to felt emotion rather than only displayed emotion?",
        summary: "MELODEYE combines facial expression, gaze and pupil dynamics directly in the browser. The gap between visible and experienced emotion becomes the input for an adaptive musical response.",
        challengeTitle: "Emotion is not a single measurement.",
        challengeBody: "A smile may signal joy, tension or social adaptation. The experiment therefore explores the gap between several signals rather than treating one classifier as truth — while raw biometric data remains on-device.",
        systemTitle: "From multimodal signals to a restrained response.",
        capabilities: [{ title: "Local sensing", body: "Face, gaze and pupil dynamics are processed in the browser." }, { title: "Gap-aware interpretation", body: "The system responds to divergence between visible and inferred signals." }, { title: "Adaptive music", body: "The interpreted state guides the selection and generation of a musical response." }],
        transferTitle: "Where this principle can be applied.",
        transferIntro: "The case shows how sensitive signals can be processed locally and translated into a cautious, explainable response.",
        transfers: [{ title: "Adaptive interfaces", body: "Digital products can adapt density or support to signals from actual use." }, { title: "Wellbeing", body: "Reflection and relaxation experiences can react contextually without centralising raw data." }, { title: "Privacy by design", body: "Sensitive models can deliberately run on-device rather than in the cloud." }],
        value: "The project explores personalised interaction without sending raw biometric data to a server.",
        learning: "Multimodal signals offer more context than one classifier, but require explicit safety logic and restrained interpretation.",
        mediaCaptions: ["The experience start connects model choice and musical response.", "The restrained surface communicates the experimental nature of the work."],
        facts: [{ value: "3", label: "combined signal layers" }, { value: "LOCAL", label: "biometric processing" }, { value: "BETA", label: "active experiment" }],
      },
    },
  },
  problaim: {
    media: [{ src: problaimHome, device: "laptop" }, { src: problaimSystem, device: "laptop" }],
    narrative: {
      de: {
        question: "Wie entsteht aus einem komplexen Problem fortlaufend bessere Klarheit?",
        summary: "PROBLAIM behandelt Problemanalyse als lebenden Prozess. Eine Multi-LLM-Pipeline zerlegt Fragestellungen, beleuchtet sie aus zwölf Perspektiven, ergänzt Recherche und vertieft die Analyse über Zeit.",
        challengeTitle: "Komplexe Entscheidungen passen nicht in einen einmaligen Chat.",
        challengeBody: "Neue Evidenz, Widersprüche und Perspektiven verändern eine Fragestellung. PROBLAIM macht diese Entwicklung sichtbar und hält Ergebnisse als strukturierte Denkoberfläche zusammen.",
        systemTitle: "Orchestrierung statt einer einzigen Modellantwort.",
        capabilities: [{ title: "Problemzerlegung", body: "Aus einer offenen Frage entsteht eine prüfbare Struktur aus Teilproblemen." }, { title: "Perspektiven", body: "Zwölf archetypische Linsen decken blinde Flecken und Zielkonflikte auf." }, { title: "Fortlaufende Analyse", body: "Recherche und Modellläufe ergänzen die Analyse iterativ, statt sie nach einer Antwort zu beenden." }],
        transferTitle: "Was sich auf Kundenentscheidungen übertragen lässt.",
        transferIntro: "Der Case eignet sich als Muster für Entscheidungen, die mehrere Datenquellen, Rollen und Zeitpunkte verbinden müssen.",
        transfers: [{ title: "Strategische Fragen", body: "Optionen, Annahmen und Evidenz bleiben über mehrere Entscheidungsrunden nachvollziehbar." }, { title: "Research Operations", body: "Wiederkehrende Recherche kann aufgeteilt, bewertet und konsolidiert werden." }, { title: "Vorbereitung von Workshops", body: "Teams beginnen mit einer strukturierten Hypothesen- und Konfliktlandkarte statt mit einem leeren Whiteboard." }],
        value: "Entscheider erhalten keinen einmaligen Antworttext, sondern eine strukturierte Denkoberfläche, die Widersprüche und neue Evidenz aufnehmen kann.",
        learning: "Die Qualität autonomer Analyse hängt weniger von einem einzelnen Modell ab als von Orchestrierung, Perspektivenvielfalt und überprüfbaren Zwischenschritten.",
        mediaCaptions: ["Der Einstieg beginnt mit einer realen, offenen Problemstellung.", "Analysen werden als nachvollziehbare Struktur statt als Chatverlauf organisiert."],
        facts: [{ value: "12", label: "Perspektivlinsen" }, { value: "4", label: "Phasen der Analyse" }, { value: "MULTI", label: "Modell-Orchestrierung" }],
      },
      en: {
        question: "How can a complex problem produce better clarity over time?",
        summary: "PROBLAIM treats problem analysis as a living process. A multi-LLM pipeline decomposes questions, examines them through twelve perspectives, adds research and deepens the analysis over time.",
        challengeTitle: "Complex decisions do not fit into a one-off chat.",
        challengeBody: "New evidence, contradictions and perspectives change the question itself. PROBLAIM makes that development visible and keeps results together as a structured thinking surface.",
        systemTitle: "Orchestration instead of one model answer.",
        capabilities: [{ title: "Problem decomposition", body: "An open question becomes an inspectable structure of sub-problems." }, { title: "Perspectives", body: "Twelve archetypal lenses expose blind spots and competing goals." }, { title: "Continuous analysis", body: "Research and model runs enrich the analysis iteratively rather than ending it after one answer." }],
        transferTitle: "What can transfer to client decisions.",
        transferIntro: "The case is a pattern for decisions that need to connect multiple data sources, roles and moments in time.",
        transfers: [{ title: "Strategic questions", body: "Options, assumptions and evidence remain traceable across decision rounds." }, { title: "Research operations", body: "Recurring research can be divided, assessed and consolidated." }, { title: "Workshop preparation", body: "Teams start with a structured map of hypotheses and tensions rather than an empty whiteboard." }],
        value: "Decision-makers gain a structured thinking surface that can absorb contradictions and new evidence — not a one-off answer.",
        learning: "The quality of autonomous analysis depends less on one model than on orchestration, diversity of perspectives and inspectable intermediate steps.",
        mediaCaptions: ["The experience begins with a real, open problem.", "Analysis is organised as a traceable structure rather than a chat transcript."],
        facts: [{ value: "12", label: "perspective lenses" }, { value: "4", label: "analysis phases" }, { value: "MULTI", label: "model orchestration" }],
      },
    },
  },
  humancrypto: {
    media: [{ src: humancryptoHome, device: "laptop" }, { src: humancryptoStory, device: "phone" }],
    narrative: {
      de: {
        question: "Wie wird abstrakte Technologie erinnerbar und menschlich?",
        summary: "HUMANCRYP.TO übersetzt Kryptowährungen in Figuren. Archetypen, ein Emotionsmodell und eine automatisierte Bild-, Sprach- und Videopipeline machen technische Unterschiede als Charaktere erlebbar.",
        challengeTitle: "Technische Erklärung allein schafft noch kein Verständnis.",
        challengeBody: "Tokenomics, Konsensmechanismen und Communities sind abstrakt. Das Projekt nutzt Persönlichkeit und Geschichte als zweite Bedeutungsebene, ohne Metapher und Fakt gleichzusetzen.",
        systemTitle: "Ein automatisierter Storytelling-Stack.",
        capabilities: [{ title: "Archetypen-Modell", body: "Technische und kulturelle Eigenschaften werden auf konsistente Figuren übersetzt." }, { title: "Generative Produktion", body: "Bild, Stimme, Text und Video entstehen aus einem gemeinsamen Charakterprofil." }, { title: "Lernnarrativ", body: "Information wird als Geschichte und Vergleich erfahrbar, nicht als Glossar." }],
        transferTitle: "Was andere komplexe Themen davon lernen können.",
        transferIntro: "Das Prinzip funktioniert überall dort, wo Fakten zwar verfügbar, aber schwer erinnerbar oder emotional fern sind.",
        transfers: [{ title: "Onboarding", body: "Rollen, Produkte oder Regeln können durch konsistente Figuren verständlicher werden." }, { title: "Education", body: "Komplexe Portfolios lassen sich über wiederkehrende Narrative erschließen." }, { title: "Automatisierte Formate", body: "Ein strukturiertes Wissensmodell kann mehrere Medienformate konsistent speisen." }],
        value: "Komplexe Konzepte werden über Narrativ, Emotion und Wiedererkennbarkeit zugänglicher gemacht.",
        learning: "Storytelling kann technisches Lernen tragen, wenn Metapher und zugrunde liegende Fakten klar voneinander getrennt bleiben.",
        mediaCaptions: ["Kryptowährungen erscheinen als unterscheidbare Charaktere.", "Das visuelle System verbindet Persönlichkeit, Emotion und Lerninhalt."],
        facts: [{ value: "12", label: "archetypische Grundmuster" }, { value: "4", label: "generative Medienformen" }, { value: "ARCHIVED", label: "dokumentierter Lernstand" }],
      },
      en: {
        question: "How does abstract technology become memorable and human?",
        summary: "HUMANCRYP.TO turns cryptocurrencies into characters. Archetypes, an emotion model and an automated image, voice and video pipeline make technical differences tangible as personalities.",
        challengeTitle: "Technical explanation alone does not create understanding.",
        challengeBody: "Tokenomics, consensus mechanisms and communities are abstract. The project uses personality and story as a second layer of meaning without confusing metaphor with fact.",
        systemTitle: "An automated storytelling stack.",
        capabilities: [{ title: "Archetype model", body: "Technical and cultural properties become consistent characters." }, { title: "Generative production", body: "Image, voice, text and video share one character profile." }, { title: "Learning narrative", body: "Information becomes a story and comparison rather than a glossary." }],
        transferTitle: "What other complex subjects can learn from it.",
        transferIntro: "The principle applies wherever facts are available but difficult to remember or emotionally distant.",
        transfers: [{ title: "Onboarding", body: "Roles, products or rules can become clearer through consistent characters." }, { title: "Education", body: "Complex portfolios can be explored through recurring narratives." }, { title: "Automated formats", body: "A structured knowledge model can consistently feed several media formats." }],
        value: "Complex concepts become approachable through narrative, emotion and recognition.",
        learning: "Storytelling can carry technical learning when metaphor and underlying fact remain clearly separated.",
        mediaCaptions: ["Cryptocurrencies become distinct, memorable characters.", "The visual system connects personality, emotion and learning content."],
        facts: [{ value: "12", label: "archetypal patterns" }, { value: "4", label: "generative media formats" }, { value: "ARCHIVED", label: "documented learning state" }],
      },
    },
  },
  sapientshift: {
    media: [{ src: sapientshiftHome, device: "laptop" }, { src: sapientshiftSystem, device: "laptop" }],
    narrative: {
      de: {
        question: "Welche KI-Chance passt wirklich zu diesem Unternehmen, Team oder Menschen?",
        summary: "SAPIENTSHIFT übersetzt das abstrakte Versprechen von KI in personalisierte Potenziale. Drei Analysepfade, ein kuratierter Use-Case-Bestand und eine agentische Creative Guild erzeugen kontextbezogene Empfehlungen und Inhalte.",
        challengeTitle: "Generische KI-Listen helfen niemandem bei der Priorisierung.",
        challengeBody: "Unternehmen, Mitarbeitende und Einzelpersonen starten mit unterschiedlichen Zielen und Handlungsspielräumen. Das Produkt trennt diese Kontexte und verbindet sie erst danach mit konkreten Möglichkeiten.",
        systemTitle: "Analyse, Empfehlung und Content greifen ineinander.",
        capabilities: [{ title: "Drei Analysepfade", body: "Unternehmen, Mitarbeitende und Einzelpersonen erhalten passende Fragen und Bewertungslogiken." }, { title: "Opportunity Matching", body: "Kontext und Bereitschaft werden mit kuratierten KI-Anwendungen verbunden." }, { title: "Creative Guild", body: "Mehrere spezialisierte Agenten erzeugen personalisierte Artikel und Visuals." }],
        transferTitle: "Wie dieses Muster in anderen Angeboten funktioniert.",
        transferIntro: "Ein komplexes Portfolio wird zugänglich, wenn nicht das Angebot, sondern die Situation des Nutzers den Einstieg bestimmt.",
        transfers: [{ title: "Beratungsprodukte", body: "Diagnose und Empfehlung können vor einem persönlichen Gespräch strukturiert werden." }, { title: "Mitarbeiterportale", body: "Use Cases lassen sich passend zu Rolle und Reifegrad priorisieren." }, { title: "Content Experiences", body: "Ein Wissensbestand kann personalisierte Lernpfade und Magazine speisen." }],
        value: "Unterschiedliche Zielgruppen erhalten keine generische Trendübersicht, sondern einen priorisierten Ausgangspunkt für eigene Entscheidungen.",
        learning: "Personalisierung wird dann nützlich, wenn sie nicht nur Inhalte variiert, sondern Ausgangslage, Bereitschaft und Handlungsraum berücksichtigt.",
        mediaCaptions: ["Der Einstieg trennt Zielgruppen, bevor Empfehlungen entstehen.", "Ergebnisse werden als priorisierte Handlungsoptionen statt als Trendliste präsentiert."],
        facts: [{ value: "3", label: "getrennte Analysepfade" }, { value: "10", label: "spezialisierte Content-Agenten" }, { value: "BETA", label: "aktiver Produktstatus" }],
      },
      en: {
        question: "Which AI opportunity genuinely fits this company, team or person?",
        summary: "SAPIENTSHIFT translates the abstract promise of AI into personalised potential. Three analysis paths, a curated use-case base and an agentic Creative Guild generate contextual recommendations and content.",
        challengeTitle: "Generic AI lists do not help anyone prioritise.",
        challengeBody: "Companies, employees and individuals start with different goals and room for action. The product separates these contexts before connecting them to concrete possibilities.",
        systemTitle: "Analysis, recommendation and content work together.",
        capabilities: [{ title: "Three analysis paths", body: "Companies, employees and individuals receive questions and scoring logic suited to their situation." }, { title: "Opportunity matching", body: "Context and readiness are connected with curated AI applications." }, { title: "Creative Guild", body: "Several specialised agents produce personalised articles and visuals." }],
        transferTitle: "How this pattern works in other offers.",
        transferIntro: "A complex portfolio becomes accessible when the user’s situation — not the offer catalogue — defines the entry point.",
        transfers: [{ title: "Advisory products", body: "Diagnosis and recommendation can be structured before a personal conversation." }, { title: "Employee portals", body: "Use cases can be prioritised by role and readiness." }, { title: "Content experiences", body: "A knowledge base can feed personalised learning paths and magazines." }],
        value: "Different audiences receive a prioritised starting point for their own decisions rather than another generic trend overview.",
        learning: "Personalisation becomes useful when it adapts not only content, but the starting point, readiness and room for action.",
        mediaCaptions: ["The entry point separates audiences before generating recommendations.", "Results appear as prioritised actions rather than a trend list."],
        facts: [{ value: "3", label: "distinct analysis paths" }, { value: "10", label: "specialised content agents" }, { value: "BETA", label: "active product state" }],
      },
    },
  },
  "bitcoin-soundscape": {
    media: [{ src: bitcoinSoundscape, device: "laptop" }],
    narrative: {
      de: {
        question: "Was wird hörbar, wenn Marktdaten zu einem zweiten Sinneskanal werden?",
        summary: "BITCOIN_SOUNDSCAPE zerlegt Marktdaten in fünf Zeitebenen und ordnet jeder Ebene eine musikalische Dimension zu. Daraus entsteht ein kontinuierlicher KI-generierter Audiostream, der sich mit dem Markt verändert.",
        challengeTitle: "Dashboards konkurrieren permanent um visuelle Aufmerksamkeit.",
        challengeBody: "Das Experiment fragt, ob ein sorgfältig gestalteter Audiokanal Marktveränderungen nebenbei wahrnehmbar machen kann – ohne Daten lediglich in zufällige Töne zu übersetzen.",
        systemTitle: "Fünf Zeithorizonte formen ein Musikstück.",
        capabilities: [{ title: "Signalzerlegung", body: "Monat, Woche, Tag, Stunde und Echtzeit werden getrennt bewertet." }, { title: "Musikalisches Mapping", body: "Jede Ebene steuert Bass, Beat, Harmonie, Melodie oder Textur." }, { title: "Kontinuierlicher Betrieb", body: "Marktdaten, Generation und Stream laufen als wiederholbare Pipeline zusammen." }],
        transferTitle: "Was Sonifikation für andere Systeme leisten kann.",
        transferIntro: "Audio kann dort ein zweiter Informationskanal sein, wo Menschen einen Zustand überwachen, ohne dauerhaft auf einen Bildschirm zu schauen.",
        transfers: [{ title: "Operations", body: "Systemzustände können als ruhige, unterscheidbare Klangmuster wahrnehmbar werden." }, { title: "Accessibility", body: "Visuelle Daten erhalten eine ergänzende Darstellung für andere Nutzungssituationen." }, { title: "Ambient Intelligence", body: "Räume oder Produkte können Veränderungen kommunizieren, ohne permanent Aufmerksamkeit einzufordern." }],
        value: "Das Projekt erforscht Sonifikation nicht als Effekt, sondern als informationsdichte Ergänzung zu visuellen Dashboards.",
        learning: "Daten werden nicht automatisch verständlich, wenn man sie vertont. Erst eine klare semantische Zuordnung und musikalische Kohärenz schaffen einen brauchbaren zweiten Kanal.",
        mediaCaptions: ["Die Live-Oberfläche verbindet Preisbewegung, Marktstimmung und aktuell erzeugte Musik."],
        facts: [{ value: "5", label: "zeitliche Signalschichten" }, { value: "24/7", label: "gedachter Betriebsmodus" }, { value: "LIVE", label: "öffentlicher Stream" }],
      },
      en: {
        question: "What becomes audible when market data turns into a second sensory channel?",
        summary: "BITCOIN_SOUNDSCAPE separates market data into five time layers and maps each layer to a musical dimension. The result is a continuous AI-generated audio stream that changes with the market.",
        challengeTitle: "Dashboards compete continuously for visual attention.",
        challengeBody: "The experiment asks whether a carefully designed audio channel can make market changes perceptible in the background — without simply mapping data to random notes.",
        systemTitle: "Five time horizons shape one piece of music.",
        capabilities: [{ title: "Signal decomposition", body: "Month, week, day, hour and real-time movement are evaluated separately." }, { title: "Musical mapping", body: "Each layer controls bass, beat, harmony, melody or texture." }, { title: "Continuous operation", body: "Market data, generation and streaming meet in a repeatable pipeline." }],
        transferTitle: "What sonification can do for other systems.",
        transferIntro: "Audio can become a second information channel wherever people monitor a state without looking at a screen continuously.",
        transfers: [{ title: "Operations", body: "System states can become calm, distinguishable sound patterns." }, { title: "Accessibility", body: "Visual data gains a complementary representation for other usage situations." }, { title: "Ambient intelligence", body: "Spaces or products can communicate change without demanding continuous attention." }],
        value: "The project explores sonification as an information-rich complement to visual dashboards rather than a decorative effect.",
        learning: "Data does not become understandable simply by turning it into sound. Clear semantic mapping and musical coherence create a useful second channel.",
        mediaCaptions: ["The live surface connects price movement, market mood and currently generated music."],
        facts: [{ value: "5", label: "temporal signal layers" }, { value: "24/7", label: "intended operating mode" }, { value: "LIVE", label: "public stream" }],
      },
    },
  },
};
