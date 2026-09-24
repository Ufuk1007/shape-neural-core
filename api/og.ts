import { OG_META, type OGMeta } from "../shared/og-metadata.js";
import { getGeneratedSeoRoute, safeJsonLd } from "../shared/seo-runtime.js";
import { SPA_SHELL } from "./_spa-shell.js";

export const config = { runtime: "edge" };

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function markHelmetManaged(markup: string): string {
  if (/^<(meta|link)\b/i.test(markup)) return markup.replace(/\s*\/?>$/, ' data-rh="true" />');
  if (/^<script\b/i.test(markup)) return markup.replace(">", ' data-rh="true">');
  return markup;
}

function replaceOrInsert(html: string, pattern: RegExp, replacement: string): string {
  const managedReplacement = markHelmetManaged(replacement);
  if (pattern.test(html)) return html.replace(pattern, managedReplacement);
  return html.replace("</head>", `${managedReplacement}\n</head>`);
}

function insertBeforeHeadEnd(html: string, markup: string): string {
  return html.replace("</head>", `${markHelmetManaged(markup)}\n</head>`);
}

function routeMeta(path: string): OGMeta | null {
  return OG_META[path] ?? null;
}

function pageSlug(path: string): string {
  if (path === "/") return "home";
  return path.split("/").filter(Boolean).at(-1) ?? "home";
}

export default function handler(req: Request): Response {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || url.pathname;
  const meta = routeMeta(path);
  const machineRoute = getGeneratedSeoRoute(path);

  if (!meta) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const canonicalPath = meta.canonical ?? path;
  const canonicalUrl = `https://www.shapeneural.com${canonicalPath}`;
  const projectMatch = path.match(/^\/studio\/projekte\/([a-z0-9-]+)$/);
  const imageUrl = meta.image
    ? new URL(meta.image, "https://www.shapeneural.com").toString()
    : projectMatch
      ? `https://www.shapeneural.com/api/og-image?type=project&slug=${projectMatch[1]}`
      : `https://www.shapeneural.com/api/og-image?type=page&slug=${pageSlug(path)}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const imageAlt = escapeHtml(`${meta.title} — ShapeNeural`);
  const markdownUrl = machineRoute?.markdown ? `${origin(machineRoute.markdown)}` : null;
  const jsonLdUrl = machineRoute?.jsonld ? `${origin(machineRoute.jsonld)}` : null;

  let html = SPA_SHELL;
  html = replaceOrInsert(html, /<title>.*?<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${meta.type}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${imageUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:secure_url"[^>]*>/i, `<meta property="og:image:secure_url" content="${imageUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:width"[^>]*>/i, `<meta property="og:image:width" content="1200" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:height"[^>]*>/i, `<meta property="og:image:height" content="630" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:alt"[^>]*>/i, `<meta property="og:image:alt" content="${imageAlt}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="ShapeNeural" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:locale"[^>]*>/i, `<meta property="og:locale" content="de_DE" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:locale:alternate"[^>]*>/i, `<meta property="og:locale:alternate" content="en_GB" />`);
  if (machineRoute) html = replaceOrInsert(html, /<meta\s+property="og:updated_time"[^>]*>/i, `<meta property="og:updated_time" content="${machineRoute.dateModified}" />`);
  html = replaceOrInsert(html, /<meta\s+name="author"[^>]*>/i, `<meta name="author" content="ShapeNeural" />`);
  html = replaceOrInsert(html, /<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
  html = replaceOrInsert(html, /<meta\s+name="googlebot"[^>]*>/i, `<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
  html = replaceOrInsert(html, /<meta\s+name="bingbot"[^>]*>/i, `<meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image:alt"[^>]*>/i, `<meta name="twitter:image:alt" content="${imageAlt}" />`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = replaceOrInsert(html, /<link\s+rel="sitemap"[^>]*>/i, `<link rel="sitemap" type="application/xml" href="https://www.shapeneural.com/sitemap.xml" />`);
  html = insertBeforeHeadEnd(html, `<link rel="alternate" type="text/plain" title="LLM-readable site overview" href="https://www.shapeneural.com/llms.txt" />`);
  if (markdownUrl) html = insertBeforeHeadEnd(html, `<link rel="alternate" type="text/markdown" title="Markdown version" href="${markdownUrl}" />`);
  if (jsonLdUrl) html = insertBeforeHeadEnd(html, `<link rel="alternate" type="application/ld+json" title="Structured data" href="${jsonLdUrl}" />`);
  if (machineRoute) {
    html = insertBeforeHeadEnd(html, `<script type="application/ld+json">${safeJsonLd(machineRoute.structuredData)}</script>`);
    html = html.replace(/<div\s+id="root"\s*><\/div>/i, `<div id="root">${machineRoute.fallbackHtml}</div>`);
  }

  const alternateLinks = [
    `<${canonicalUrl}>; rel="canonical"`,
    `<https://www.shapeneural.com/llms.txt>; rel="alternate"; type="text/plain"`,
    ...(markdownUrl ? [`<${markdownUrl}>; rel="alternate"; type="text/markdown"`] : []),
    ...(jsonLdUrl ? [`<${jsonLdUrl}>; rel="alternate"; type="application/ld+json"`] : []),
  ].join(", ");

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Language": "de",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Link": alternateLinks,
      "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
  });
}

function origin(pathname: string): string {
  return `https://www.shapeneural.com${pathname}`;
}
