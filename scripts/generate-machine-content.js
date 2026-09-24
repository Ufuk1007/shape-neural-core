import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sharedDir = path.join(root, "shared");
const origin = "https://www.shapeneural.com";
const updated = process.env.SEO_UPDATED_DATE
  || new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());

const site = {
  name: "ShapeNeural",
  legalName: "ShapeNeural",
  url: origin,
  email: "signal@shapeneural.com",
  location: "Frankfurt am Main / Remote",
  description: "Unabhängiges KI-Produktstudio für kleine Unternehmen, kompakte Teams und Selbstständige. ShapeNeural richtet KI praktisch ein, gestaltet Arbeitsabläufe neu und macht digitale Produktideen testbar.",
  descriptionEn: "Independent applied AI product studio for small organisations, compact teams and independent professionals. ShapeNeural configures AI for real use, redesigns workflows and makes digital product ideas testable.",
  slogan: "Designed Intelligence. AI systems that move people, not just data.",
  audience: "Kleine Unternehmen, kompakte Teams und beruflich Selbstständige",
  serviceArea: "Deutschland und Remote",
};

const focusDay = {
  name: "Focus Day",
  description: "Ein fokussierter Arbeitstag plus Vorbereitung. ShapeNeural priorisiert ein reales Problem, prüft Daten und Werkzeuge und liefert eine Opportunity Map sowie eine klare Empfehlung.",
  descriptionEn: "One focused working day plus preparation. ShapeNeural prioritises one real problem, assesses data and tools, and delivers an opportunity map with a clear recommendation.",
  duration: "Ein Arbeitstag plus Vorbereitung",
  price: 950,
  currency: "EUR",
  result: "Opportunity Map und klare Empfehlung – auch ohne Folgeprojekt",
};

const method = [
  { name: "Understand", description: "Ausgangslage, Menschen, Daten, Werkzeuge und Grenzen verstehen." },
  { name: "Design", description: "Die kleinste sinnvolle Veränderung und ihre Kontrollpunkte entwerfen." },
  { name: "Implement", description: "Workspace, Workflow oder Produktprototyp tatsächlich bauen." },
  { name: "Validate", description: "Nutzen, Qualität, Fehlerfälle, Kosten und menschliche Eingriffe testen." },
  { name: "Transfer", description: "Wissen, Dokumentation und Verantwortung nachvollziehbar übergeben." },
];

const faq = [
  { question: "Für wen ist das gedacht?", answer: "Für kleine Unternehmen, kompakte Teams und Selbstständige, die KI praktisch einsetzen wollen. Nicht für große Kernsystemmigrationen oder unternehmenskritischen 24/7-Betrieb." },
  { question: "Muss ich mich bereits für ein KI-Tool entschieden haben?", answer: "Nein. Die Werkzeugwahl folgt aus Arbeit, Daten, Risiko und Budget – nicht aus einer bevorzugten Plattform." },
  { question: "Was passiert mit sensiblen Daten?", answer: "Datenflüsse und Anbieter werden vor der Umsetzung sichtbar gemacht. Besondere rechtliche oder sicherheitskritische Anforderungen werden früh benannt und bei Bedarf mit Spezialisten ergänzt." },
  { question: "Was passiert nach dem Projekt?", answer: "Sie erhalten ein nutzbares System, Dokumentation und eine Übergabe. Ein klar begrenztes Care-Modell kann separat vereinbart werden; ein 24/7 Managed Service ist nicht Teil des Kernangebots." },
  { question: "Sind die genannten Preise verbindlich?", answer: "Die Bandbreiten sind eine Orientierung für typische Vorhaben. Nach einer kurzen Bestandsaufnahme folgen ein klar abgegrenzter Umfang und ein verbindlicher Festpreis. Lizenzen und vereinbarte Fremdkosten werden separat ausgewiesen." },
];

const kindLabels = {
  OWN_PRODUCT: "Eigenes Produkt",
  EXPERIMENT: "Experiment",
  PARTNER_PROJECT: "Partnerprojekt",
  CLIENT_PROJECT: "Kundenprojekt",
};

const priceRanges = {
  augment: { min: 2900, max: 6500 },
  transform: { min: 7500, max: 18000 },
  create: { min: 9500, max: 22000 },
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const absolute = (pathname) => `${origin}${pathname}`;
const list = (items) => items.map((item) => `- ${item}`).join("\n");
const htmlList = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

function organisationSchema() {
  return {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: origin,
    logo: { "@type": "ImageObject", url: absolute("/favicon.png") },
    email: site.email,
    slogan: site.slogan,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wasserhofstraße 47",
      postalCode: "60529",
      addressLocality: "Frankfurt am Main",
      addressCountry: "DE",
    },
    areaServed: [{ "@type": "Country", name: "Deutschland" }, { "@type": "Place", name: "Remote" }],
    knowsAbout: ["Angewandte künstliche Intelligenz", "KI-Workspaces", "KI-Agenten", "Workflow-Automatisierung", "Digitale Produktentwicklung", "AI Enablement", "Human-in-the-loop-Systeme"],
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: site.name,
    url: origin,
    description: site.description,
    inLanguage: ["de-DE", "en-GB"],
    publisher: { "@id": `${origin}/#organization` },
  };
}

function webPageSchema(pathname, meta, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${absolute(pathname)}#webpage`,
    url: absolute(pathname),
    name: meta.title,
    description: meta.description,
    inLanguage: ["de-DE", "en-GB"],
    isPartOf: { "@id": `${origin}/#website` },
    about: { "@id": `${origin}/#organization` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${origin}/api/og-image?type=${pathname.startsWith("/studio/projekte/") ? "project" : "page"}&slug=${pathname === "/" ? "home" : pathname.split("/").filter(Boolean).at(-1)}` },
    dateModified: updated,
  };
}

function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": [organisationSchema(), websiteSchema(), ...nodes] };
}

function serviceOfferSchema(offer) {
  const range = priceRanges[offer.id];
  return {
    "@type": "Offer",
    url: `${origin}/studio/leistungen#${offer.id}`,
    availability: "https://schema.org/InStock",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: range.min,
      maxPrice: range.max,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
    itemOffered: {
      "@type": "Service",
      "@id": `${origin}/studio/leistungen#service-${offer.id}`,
      name: offer.title.de,
      alternateName: offer.title.en,
      serviceType: offer.label,
      description: offer.description.de,
      provider: { "@id": `${origin}/#organization` },
      areaServed: site.serviceArea,
      audience: { "@type": "BusinessAudience", audienceType: site.audience },
      produces: offer.outcome.de,
      serviceOutput: offer.deliverables.de,
      termsOfService: offer.boundaries.de.join("; "),
    },
  };
}

function projectSchema(project, detail) {
  const de = detail.narrative.de;
  const properties = [
    { "@type": "PropertyValue", name: "Projektstatus", value: project.status },
    { "@type": "PropertyValue", name: "Projekttyp", value: kindLabels[project.kind] },
    { "@type": "PropertyValue", name: "Zusammenarbeit", value: project.collaboration },
    { "@type": "PropertyValue", name: "Wert für übertragbare Kundenprojekte", value: de.value },
    { "@type": "PropertyValue", name: "Zentrale Erkenntnis", value: de.learning },
  ];
  return {
    "@type": ["SoftwareApplication", "CreativeWork"],
    "@id": `${origin}/studio/projekte/${project.slug}#project`,
    name: project.title.replaceAll("_", " "),
    url: `${origin}/studio/projekte/${project.slug}`,
    sameAs: project.url || undefined,
    description: de.summary,
    abstract: de.question,
    applicationCategory: project.category.replaceAll("_", " "),
    operatingSystem: "Web",
    dateCreated: String(project.year),
    dateModified: updated,
    inLanguage: ["de-DE", "en-GB"],
    creator: { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
    isPartOf: { "@id": `${origin}/studio/projekte#collection` },
    keywords: project.tags,
    featureList: de.capabilities.map((item) => item.title),
    additionalProperty: properties,
    citation: project.collaborationUrl ? [project.collaborationUrl] : undefined,
    image: `${origin}/api/og-image?type=project&slug=${project.slug}`,
  };
}

function routeHtml(title, description, body, machineLinks = []) {
  const alternatives = `<ul>${machineLinks.map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("")}</ul>`;
  return `<main class="seo-fallback" data-machine-readable="true"><header><p>SHAPENEURAL / MASCHINENLESBARE SEITENFASSUNG</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></header>${body}<footer><h2>Maschinenlesbare Alternativen</h2>${alternatives}</footer></main>`;
}

function homeMarkdown(offers, projects) {
  return `# ShapeNeural — KI-Agentur und unabhängiges KI-Produktstudio

> ${site.description}

${site.slogan}

ShapeNeural arbeitet für kleine Unternehmen, kompakte Teams und beruflich Selbstständige. Das Studio verbindet Beratung, Produktentwicklung, Betrieb und Enablement. Ziel ist kein allgemeines Transformationsprogramm, sondern ein klar begrenztes Vorhaben, nach dem ein nutzbares Setup, ein funktionierender Workflow oder ein testbarer Prototyp existiert.

## Drei Wege der Zusammenarbeit

${offers.map((offer) => `### ${offer.label} — ${offer.title.de}\n\n${offer.promise.de}\n\n**Ergebnis:** ${offer.outcome.de}\n\n**Dauer:** ${offer.duration.de}\n\n**Preisorientierung:** ${offer.price.de}`).join("\n\n")}

## Arbeitsmethode

${method.map((step, index) => `${index + 1}. **${step.name}:** ${step.description}`).join("\n")}

## Was bleibt

- AUGMENT: Assistenten, Anweisungen, Wissensquellen und direkt nutzbare Anwendungsfälle.
- TRANSFORM: Workflow-Blueprint, Automationen, menschliche Kontrollpunkte, Evaluation und Runbook.
- CREATE: Produktkonzept, funktionaler Prototyp, Validierung und Roadmap.

## Portfolio

${projects.map((project) => `- [${project.title.replaceAll("_", " ")}](${origin}/studio/projekte/${project.slug}) — ${kindLabels[project.kind]}, ${project.status}: ${project.brief}`).join("\n")}

## Kontakt

- [Fit-Check und Kontakt](${origin}/kontakt)
- E-Mail: ${site.email}
- Standort: ${site.location}

---

English summary: ${site.descriptionEn}
`;
}

function servicesMarkdown(offers) {
  return `# Leistungen und Preise — ShapeNeural

> KI einrichten. Arbeit neu gestalten. Produktideen real testen.

Der richtige Auftrag hängt nicht vom neuesten Werkzeug ab, sondern von der Ausgangslage. Jedes Angebot löst ein anderes Problem und endet mit einem konkret nutzbaren Ergebnis.

${offers.map((offer) => `## ${offer.number} / ${offer.label} — ${offer.title.de}

${offer.promise.de}

${offer.description.de}

- **Konkretes Ergebnis:** ${offer.outcome.de}
- **Rahmen:** ${offer.frame.de}
- **Dauer:** ${offer.duration.de}
- **Preisorientierung:** ${offer.price.de}
- **Voraussetzung:** ${offer.prerequisites.de}

### Enthalten

${list(offer.deliverables.de)}

### Ablauf

${offer.phases.de.map((phase, index) => `${index + 1}. ${phase}`).join("\n")}

### Bewusst nicht enthalten

${list(offer.boundaries.de)}

English: **${offer.title.en}** — ${offer.description.en} Outcome: ${offer.outcome.en} Duration: ${offer.duration.en} Price guide: ${offer.price.en}`).join("\n\n")}

## Focus Day

${focusDay.description}

- **Dauer:** ${focusDay.duration}
- **Preis:** ${focusDay.price} € netto
- **Ergebnis:** ${focusDay.result}

## Arbeitsmethode

${method.map((step, index) => `${index + 1}. **${step.name}:** ${step.description}`).join("\n")}

## Häufige Fragen

${faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Kontakt

[Vorhaben beschreiben](${origin}/kontakt)
`;
}

function projectMarkdown(project, detail) {
  const de = detail.narrative.de;
  const en = detail.narrative.en;
  const evidence = de.evidence ? `
## Was ShapeNeural gebaut hat

${de.evidence.builtBody}

${list(de.evidence.builtItems)}

## Validierung

${de.evidence.validationBody}

${list(de.evidence.validationItems)}

## Heutige Nutzung

${de.evidence.usageBody}

${list(de.evidence.usageItems)}
` : "";
  return `# ${project.title.replaceAll("_", " ")} — ShapeNeural Projekt

> ${de.question}

- **Projekttyp:** ${kindLabels[project.kind]}
- **Status:** ${project.status}
- **Kategorie:** ${project.category.replaceAll("_", " ")}
- **Jahr:** ${project.year}
- **Zusammenarbeit:** ${project.collaboration}
- **Kanonische Seite:** ${origin}/studio/projekte/${project.slug}
${project.url ? `- **Live-Projekt:** ${project.url}` : ""}

## Kontext

${de.summary}

## Aufgabe

### ${de.challengeTitle}

${de.challengeBody}

## System

### ${de.systemTitle}

${de.capabilities.map((item) => `#### ${item.title}\n\n${item.body}`).join("\n\n")}
${evidence}
## Übertragbarkeit

### ${de.transferTitle}

${de.transferIntro}

${de.transfers.map((item) => `#### ${item.title}\n\n${item.body}`).join("\n\n")}

## Wert und Erkenntnis

- **Value:** ${de.value}
- **Learning:** ${de.learning}

## Fakten

${de.facts.map((fact) => `- **${fact.label}:** ${fact.value}`).join("\n")}

## Technologie

${project.techStack.join(", ")}

## English summary

**Question:** ${en.question}

${en.summary}

**Challenge:** ${en.challengeTitle} ${en.challengeBody}

**Transfer:** ${en.transferTitle} ${en.transferIntro}

**Value:** ${en.value}
`;
}

function projectsMarkdown(projects, details) {
  return `# ShapeNeural Projekte

> Vollständiges Portfolio aus eigenen Produkten, Experimenten und Partnerprojekten. Status und Projekttyp werden transparent ausgewiesen; Demonstratoren werden nicht als Kundenprojekte dargestellt.

${projects.map((project) => {
    const de = details[project.slug].narrative.de;
    return `## [${project.title.replaceAll("_", " ")}](${origin}/studio/projekte/${project.slug})\n\n- **Typ:** ${kindLabels[project.kind]}\n- **Status:** ${project.status}\n- **Jahr:** ${project.year}\n- **Kategorie:** ${project.category.replaceAll("_", " ")}\n\n${de.summary}\n\n**Kundenübertragbarkeit:** ${de.transferIntro}\n\n[Markdown](${origin}/studio/projekte/${project.slug}.md) · [JSON-LD](${origin}/studio/projekte/${project.slug}.jsonld)${project.url ? ` · [Live-Projekt](${project.url})` : ""}`;
  }).join("\n\n")}
`;
}

function labMarkdown(signals) {
  return `# ShapeNeural Lab — Signal Cloud

> Das Lab ist die Forschungsoberfläche von ShapeNeural. Es sammelt schwache Signale, verbindet Entwicklungen und macht sichtbar, welche Fragen hinter dem nächsten Produkt oder Kundenproblem liegen könnten.

## Rolle

Das Studio löst konkrete Aufgaben. Das Lab hält den Blick offen. Die Cloud ist kein Newsfeed und kein Wahrheitsautomat. Jedes Signal bleibt mit seiner Quelle verbunden. Relevanz ist eine Arbeitshypothese, keine Gewissheit.

## Vom Signal zum Vorhaben

1. **Signal:** Eine beobachtbare Veränderung mit Quelle und Kontext festhalten.
2. **Muster:** Verbindungen, Spannungen und wiederkehrende Bewegungen sichtbar machen.
3. **Frage:** Eine konkrete Frage formulieren, die nicht schon die Lösung vorgibt.
4. **Probe:** Mit Research, Prototyp oder Experiment prüfen, ob die Annahme trägt.

## Aktuelle Signale

${signals.map((signal) => `### ${signal.headline}\n\n- **ID:** ${signal.id}\n- **Kategorie:** ${signal.category}\n- **Relevanz:** ${signal.relevance}%\n- **Quelle:** ${signal.url || "Keine externe URL"}\n\n${signal.summary || ""}`).join("\n\n")}
`;
}

async function writePublic(relativePath, content) {
  const target = path.join(publicDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content.endsWith("\n") ? content : `${content}\n`, "utf8");
}

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "silent" });

try {
  const [{ PROJECTS }, { PROJECT_DETAILS }, { STUDIO_OFFERS }, { OG_META }] = await Promise.all([
    vite.ssrLoadModule("/src/data/projects.ts"),
    vite.ssrLoadModule("/src/data/project-details.ts"),
    vite.ssrLoadModule("/src/data/studio.ts"),
    vite.ssrLoadModule("/shared/og-metadata.ts"),
  ]);
  const signals = JSON.parse(await readFile(path.join(publicDir, "data", "debris.json"), "utf8"));
  const routes = {};

  const pageLinks = (markdown, jsonld) => [
    ...(markdown ? [{ label: "Markdown", href: absolute(markdown) }] : []),
    ...(jsonld ? [{ label: "JSON-LD", href: absolute(jsonld) }] : []),
    { label: "LLM-Übersicht", href: absolute("/llms.txt") },
  ];

  const homeMd = homeMarkdown(STUDIO_OFFERS, PROJECTS);
  const servicesMd = servicesMarkdown(STUDIO_OFFERS);
  const portfolioMd = projectsMarkdown(PROJECTS, PROJECT_DETAILS);
  const labMd = labMarkdown(signals);
  const contactMd = `# Kontakt und Fit-Check — ShapeNeural\n\nBeschreiben Sie kurz, welche Arbeit, welcher Ablauf oder welche Produktidee besser werden soll. ShapeNeural antwortet in der Regel innerhalb von zwei Werktagen mit einer Einschätzung zu Fit und nächstem Schritt.\n\n- Kontaktformular: ${origin}/kontakt\n- E-Mail: ${site.email}\n- Zielgruppe: Unternehmen und beruflich Selbstständige\n- Keine Verkaufsschleife; klare Einschätzung zu Fit und nächstem Schritt.\n`;

  const offerSchemas = STUDIO_OFFERS.map(serviceOfferSchema);
  const focusOfferSchema = {
    "@type": "Offer",
    url: `${origin}/studio/leistungen#focus-day`,
    price: focusDay.price,
    priceCurrency: focusDay.currency,
    priceSpecification: { "@type": "UnitPriceSpecification", price: focusDay.price, priceCurrency: focusDay.currency, valueAddedTaxIncluded: false, unitText: focusDay.duration },
    itemOffered: { "@type": "Service", name: focusDay.name, description: focusDay.description, provider: { "@id": `${origin}/#organization` }, produces: focusDay.result },
  };

  const schemas = {
    "/": graph(
      webPageSchema("/", OG_META["/"]),
      { "@type": "OfferCatalog", "@id": `${origin}/studio/leistungen#catalog`, name: "ShapeNeural Leistungen", itemListElement: [...offerSchemas, focusOfferSchema] },
    ),
    "/studio/leistungen": graph(
      webPageSchema("/studio/leistungen", OG_META["/studio/leistungen"]),
      breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Leistungen", path: "/studio/leistungen" }]),
      { "@type": "OfferCatalog", "@id": `${origin}/studio/leistungen#catalog`, name: "ShapeNeural Leistungen", description: OG_META["/studio/leistungen"].description, itemListElement: [...offerSchemas, focusOfferSchema] },
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ),
    "/studio/projekte": graph(
      { ...webPageSchema("/studio/projekte", OG_META["/studio/projekte"], "CollectionPage"), "@id": `${origin}/studio/projekte#collection` },
      breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Projekte", path: "/studio/projekte" }]),
      { "@type": "ItemList", name: "ShapeNeural Projektportfolio", numberOfItems: PROJECTS.length, itemListElement: PROJECTS.map((project, index) => ({ "@type": "ListItem", position: index + 1, url: `${origin}/studio/projekte/${project.slug}`, item: projectSchema(project, PROJECT_DETAILS[project.slug]) })) },
    ),
    "/studio/lab": graph(
      webPageSchema("/studio/lab", OG_META["/studio/lab"], "CollectionPage"),
      breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Lab", path: "/studio/lab" }]),
      { "@type": "Dataset", "@id": `${origin}/studio/lab#signal-dataset`, name: "ShapeNeural Signal Cloud", description: OG_META["/studio/lab"].description, dateModified: updated, creator: { "@id": `${origin}/#organization` }, inLanguage: "en", variableMeasured: ["category", "relevance", "headline", "source", "summary"], distribution: { "@type": "DataDownload", contentUrl: `${origin}/data/debris.json`, encodingFormat: "application/json" } },
    ),
    "/kontakt": graph(
      webPageSchema("/kontakt", OG_META["/kontakt"], "ContactPage"),
      breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Kontakt", path: "/kontakt" }]),
      { "@type": "ContactPoint", contactType: "project enquiries", email: site.email, availableLanguage: ["German", "English"], areaServed: "DE" },
    ),
    "/impressum": graph(webPageSchema("/impressum", OG_META["/impressum"]), breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Impressum", path: "/impressum" }])),
    "/datenschutz": graph(webPageSchema("/datenschutz", OG_META["/datenschutz"]), breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Datenschutz", path: "/datenschutz" }])),
    "/agb": graph(webPageSchema("/agb", OG_META["/agb"]), breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "AGB", path: "/agb" }])),
  };

  for (const project of PROJECTS) {
    const pathname = `/studio/projekte/${project.slug}`;
    schemas[pathname] = graph(
      webPageSchema(pathname, OG_META[pathname]),
      breadcrumbs([{ name: "ShapeNeural", path: "/" }, { name: "Projekte", path: "/studio/projekte" }, { name: project.title.replaceAll("_", " "), path: pathname }]),
      projectSchema(project, PROJECT_DETAILS[project.slug]),
    );
  }

  const routeDefinitions = [
    { path: "/", markdown: "/home.md", jsonld: "/schema.jsonld", md: homeMd, html: `<section><h2>Unabhängiges KI-Produktstudio</h2><p>${escapeHtml(site.description)}</p><h2>Drei Wege der Zusammenarbeit</h2>${STUDIO_OFFERS.map((offer) => `<article><h3>${escapeHtml(offer.label)} — ${escapeHtml(offer.title.de)}</h3><p>${escapeHtml(offer.description.de)}</p><p><strong>Ergebnis:</strong> ${escapeHtml(offer.outcome.de)}</p><a href="/studio/leistungen#${offer.id}">Leistung ansehen</a></article>`).join("")}<h2>Aus dem Portfolio</h2>${PROJECTS.map((project) => `<article><h3><a href="/studio/projekte/${project.slug}">${escapeHtml(project.title.replaceAll("_", " "))}</a></h3><p>${escapeHtml(PROJECT_DETAILS[project.slug].narrative.de.summary)}</p></article>`).join("")}</section>` },
    { path: "/studio/leistungen", markdown: "/studio/leistungen.md", jsonld: "/studio/leistungen.jsonld", md: servicesMd, html: `<section><h2>Leistungen, Ergebnisse und Preisrahmen</h2>${STUDIO_OFFERS.map((offer) => `<article><h3>${escapeHtml(offer.label)} — ${escapeHtml(offer.title.de)}</h3><p>${escapeHtml(offer.description.de)}</p><dl><dt>Ergebnis</dt><dd>${escapeHtml(offer.outcome.de)}</dd><dt>Dauer</dt><dd>${escapeHtml(offer.duration.de)}</dd><dt>Preis</dt><dd>${escapeHtml(offer.price.de)}</dd></dl>${htmlList(offer.deliverables.de)}</article>`).join("")}<article><h3>Focus Day</h3><p>${escapeHtml(focusDay.description)}</p><p>${focusDay.price} € netto · ${escapeHtml(focusDay.duration)}</p></article><h2>Häufige Fragen</h2>${faq.map((item) => `<details open><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</section>` },
    { path: "/studio/projekte", markdown: "/studio/projekte.md", jsonld: "/studio/projekte.jsonld", md: portfolioMd, html: `<section><h2>Vollständiges Portfolio</h2>${PROJECTS.map((project) => `<article><p>${escapeHtml(kindLabels[project.kind])} · ${project.status} · ${project.year}</p><h3><a href="/studio/projekte/${project.slug}">${escapeHtml(project.title.replaceAll("_", " "))}</a></h3><p>${escapeHtml(PROJECT_DETAILS[project.slug].narrative.de.summary)}</p></article>`).join("")}</section>` },
    { path: "/studio/lab", markdown: "/studio/lab.md", jsonld: "/studio/lab.jsonld", md: labMd, html: `<section><h2>Signal Cloud</h2><p>Das Lab ist kein Newsfeed und kein Wahrheitsautomat. Relevanz ist eine Arbeitshypothese; jedes Signal bleibt mit seiner Quelle verbunden.</p>${signals.map((signal) => `<article><h3>${escapeHtml(signal.headline)}</h3><p>${escapeHtml(signal.category)} · ${signal.relevance}%</p><p>${escapeHtml(signal.summary || "")}</p>${signal.url ? `<a href="${escapeHtml(signal.url)}" rel="nofollow">Quelle</a>` : ""}</article>`).join("")}</section>` },
    { path: "/kontakt", markdown: "/kontakt.md", jsonld: "/kontakt.jsonld", md: contactMd, html: `<section><h2>Projektanfrage</h2><p>Beschreiben Sie die Arbeit, den Ablauf oder die Produktidee, die besser werden soll. ShapeNeural antwortet in der Regel innerhalb von zwei Werktagen.</p><p><a href="mailto:${site.email}">${site.email}</a></p></section>` },
  ];

  for (const project of PROJECTS) {
    const pathname = `/studio/projekte/${project.slug}`;
    const de = PROJECT_DETAILS[project.slug].narrative.de;
    routeDefinitions.push({
      path: pathname,
      markdown: `${pathname}.md`,
      jsonld: `${pathname}.jsonld`,
      md: projectMarkdown(project, PROJECT_DETAILS[project.slug]),
      html: `<article><p>${escapeHtml(kindLabels[project.kind])} · ${project.status} · ${project.year}</p><h2>${escapeHtml(de.question)}</h2><p>${escapeHtml(de.summary)}</p><h2>${escapeHtml(de.challengeTitle)}</h2><p>${escapeHtml(de.challengeBody)}</p><h2>${escapeHtml(de.systemTitle)}</h2>${de.capabilities.map((item) => `<section><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></section>`).join("")}<h2>${escapeHtml(de.transferTitle)}</h2><p>${escapeHtml(de.transferIntro)}</p>${de.transfers.map((item) => `<section><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></section>`).join("")}<h2>Ergebnis und Erkenntnis</h2><p>${escapeHtml(de.value)}</p><p>${escapeHtml(de.learning)}</p></article>`,
    });
  }

  const genericRoutes = ["/impressum", "/datenschutz", "/agb"];
  for (const pathname of genericRoutes) {
    routeDefinitions.push({ path: pathname, markdown: null, jsonld: `${pathname}.jsonld`, md: null, html: `<section><p>Die vollständigen und verbindlichen Inhalte stehen auf dieser Seite.</p></section>` });
  }

  for (const route of routeDefinitions) {
    const meta = OG_META[route.path];
    const links = pageLinks(route.markdown, route.jsonld);
    routes[route.path] = {
      title: meta.title,
      description: meta.description,
      markdown: route.markdown,
      jsonld: route.jsonld,
      fallbackHtml: routeHtml(meta.title, meta.description, route.html, links),
      structuredData: schemas[route.path],
      dateModified: updated,
    };
    if (route.markdown && route.md) await writePublic(route.markdown.slice(1), route.md);
    if (route.jsonld) await writePublic(route.jsonld.slice(1), JSON.stringify(schemas[route.path], null, 2));
  }

  const projectCatalog = {
    name: "ShapeNeural Project Catalog",
    description: "Machine-readable catalog of ShapeNeural own products, experiments and partner projects.",
    dateModified: updated,
    canonical: `${origin}/studio/projekte`,
    projects: PROJECTS.map((project) => ({
      id: project.id,
      slug: project.slug,
      name: project.title.replaceAll("_", " "),
      status: project.status,
      type: kindLabels[project.kind],
      category: project.category,
      year: project.year,
      collaboration: project.collaboration,
      description: PROJECT_DETAILS[project.slug].narrative.de.summary,
      canonical: `${origin}/studio/projekte/${project.slug}`,
      markdown: `${origin}/studio/projekte/${project.slug}.md`,
      jsonld: `${origin}/studio/projekte/${project.slug}.jsonld`,
      liveProject: project.url,
      technologies: project.techStack,
    })),
  };
  const serviceCatalog = {
    name: "ShapeNeural Service Catalog",
    dateModified: updated,
    canonical: `${origin}/studio/leistungen`,
    currency: "EUR",
    pricesExcludeVat: true,
    focusDay,
    offers: STUDIO_OFFERS.map((offer) => ({ ...offer, priceRange: priceRanges[offer.id] })),
    method,
    faq,
  };

  await writePublic("studio/projekte/catalog.json", JSON.stringify(projectCatalog, null, 2));
  await writePublic("studio/leistungen/catalog.json", JSON.stringify(serviceCatalog, null, 2));
  await writePublic("studio/projekte/dataset.jsonld", JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "ShapeNeural Project Portfolio",
    description: projectCatalog.description,
    url: projectCatalog.canonical,
    dateModified: updated,
    creator: { "@id": `${origin}/#organization`, name: "ShapeNeural" },
    distribution: { "@type": "DataDownload", contentUrl: `${origin}/studio/projekte/catalog.json`, encodingFormat: "application/json" },
    hasPart: projectCatalog.projects.map((project) => ({ "@type": "CreativeWork", name: project.name, url: project.canonical })),
  }, null, 2));

  const llms = `# ShapeNeural

> ${site.description}

${site.slogan}

Stand: ${updated}. Primärsprache ist Deutsch; die Website besitzt einen Deutsch/Englisch-Umschalter. Kanonische Domain: ${origin}.

## Was ShapeNeural ist

ShapeNeural ist ein unabhängiges Studio für angewandte KI in Frankfurt am Main und remote. Das Studio verbindet Beratung, Produktentwicklung, Workflow-Umsetzung, Betrieb und Enablement für kleine Unternehmen, kompakte Teams und beruflich Selbstständige. Die Angebote sind bewusst begrenzt; Preisangaben sind Netto-Orientierungen und keine automatischen Vertragsangebote.

## Hauptseiten

- [Startseite](${origin}/) · [Markdown](${origin}/home.md) · [JSON-LD](${origin}/schema.jsonld)
- [Leistungen und Preise](${origin}/studio/leistungen) · [Markdown](${origin}/studio/leistungen.md) · [JSON-LD](${origin}/studio/leistungen.jsonld) · [Service-Katalog](${origin}/studio/leistungen/catalog.json)
- [Projektportfolio](${origin}/studio/projekte) · [Markdown](${origin}/studio/projekte.md) · [JSON-LD](${origin}/studio/projekte.jsonld) · [Projekt-Katalog](${origin}/studio/projekte/catalog.json)
- [ShapeNeural Lab](${origin}/studio/lab) · [Markdown](${origin}/studio/lab.md) · [JSON-LD](${origin}/studio/lab.jsonld)
- [Kontakt und Fit-Check](${origin}/kontakt) · [Markdown](${origin}/kontakt.md)

## Leistungen

${STUDIO_OFFERS.map((offer) => `- **${offer.label} / ${offer.title.de}:** ${offer.outcome.de} ${offer.duration.de}; ${offer.price.de}.`).join("\n")}
- **Focus Day:** ${focusDay.result}. ${focusDay.duration}; ${focusDay.price} € netto.

## Projekte

${PROJECTS.map((project) => `- [${project.title.replaceAll("_", " ")}](${origin}/studio/projekte/${project.slug}) — ${kindLabels[project.kind]}, Status ${project.status}. [Markdown](${origin}/studio/projekte/${project.slug}.md) · [JSON-LD](${origin}/studio/projekte/${project.slug}.jsonld)`).join("\n")}

## Provenienz und Interpretationsregeln

- „Eigenes Produkt“, „Experiment“, „Partnerprojekt“ und „Kundenprojekt“ sind getrennte Projekttypen. Ein Experiment oder Demonstrator ist kein Kundenprojekt.
- LIVE, BETA und ARCHIVED beschreiben den veröffentlichten Projektstatus, nicht automatisch Nutzerzahlen oder wirtschaftlichen Erfolg.
- Zahlen auf Projektseiten werden nur in ihrem ausdrücklich genannten Kontext verwendet. Bei SAPIENTBLOCK beschreiben 326 und 74 den publizierten Use-Case-Bestand und die abgedeckten Branchen, nicht Kunden oder Nutzer.
- Die Signal Cloud ist eine kuratierte Forschungsoberfläche. Relevanzwerte sind Arbeitshypothesen, keine objektiven Wahrheiten.
- Rechtlich verbindliche Anbieterangaben stehen ausschließlich im [Impressum](${origin}/impressum).

## Volltext und Discovery

- [Vollständige LLM-Fassung](${origin}/llms-full.txt)
- [Sitemap](${origin}/sitemap.xml)
- [robots.txt](${origin}/robots.txt)
- [Portfolio-Dataset](${origin}/studio/projekte/dataset.jsonld)

## Kontakt

- E-Mail: ${site.email}
- [Kurzer Fit-Check](${origin}/kontakt)
`;
  const llmsFull = `# ShapeNeural — vollständige maschinenlesbare Fassung

Diese Datei bündelt die öffentlich sichtbaren Kerninhalte der Website in Lesereihenfolge. Übersicht und Interpretationsregeln: ${origin}/llms.txt

---

${homeMd}

---

${servicesMd}

---

${portfolioMd}

---

${PROJECTS.map((project) => projectMarkdown(project, PROJECT_DETAILS[project.slug])).join("\n\n---\n\n")}

---

${labMd}

---

${contactMd}
`;

  await writePublic("llms.txt", llms);
  await writePublic("llms-full.txt", llmsFull);

  const sitemapRoutes = routeDefinitions.filter((route) => !["/impressum", "/datenschutz", "/agb"].includes(route.path));
  const legalRoutes = ["/impressum", "/datenschutz", "/agb"];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapRoutes.map((route) => {
    const isProject = route.path.startsWith("/studio/projekte/");
    const priority = route.path === "/" ? "1.0" : route.path === "/studio/leistungen" || route.path === "/studio/projekte" ? "0.9" : isProject ? "0.8" : route.path === "/kontakt" ? "0.8" : "0.7";
    const changefreq = route.path === "/studio/lab" ? "weekly" : "monthly";
    const image = isProject ? `\n    <image:image><image:loc>${origin}/api/og-image?type=project&amp;slug=${route.path.split("/").at(-1)}</image:loc><image:title>${escapeHtml(OG_META[route.path].title)}</image:title></image:image>` : "";
    return `  <url><loc>${absolute(route.path)}</loc><lastmod>${updated}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${image}\n  </url>`;
  }).join("\n")}
${legalRoutes.map((pathname) => `  <url><loc>${absolute(pathname)}</loc><lastmod>${updated}</lastmod><changefreq>yearly</changefreq><priority>0.2</priority>\n  </url>`).join("\n")}
</urlset>`;
  await writePublic("sitemap.xml", sitemap);

  const generated = {
    generatedAt: `${updated}T00:00:00+02:00`,
    site,
    routes,
    catalogs: {
      services: "/studio/leistungen/catalog.json",
      projects: "/studio/projekte/catalog.json",
      projectDataset: "/studio/projekte/dataset.jsonld",
      signals: "/data/debris.json",
    },
  };
  await mkdir(sharedDir, { recursive: true });
  await writeFile(path.join(sharedDir, "generated-seo.json"), `${JSON.stringify(generated, null, 2)}\n`, "utf8");

  console.log(`Generated machine-readable content for ${Object.keys(routes).length} canonical routes.`);
} finally {
  await vite.close();
}
