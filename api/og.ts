import { OG_META, DEFAULT_OG } from '../shared/og-metadata.js';
import { SPA_SHELL } from './_spa-shell.js';

export const config = {
  runtime: 'edge',
};

const CRAWLER_USER_AGENTS = [
  'linkedinbot',
  'twitterbot',
  'facebookexternalhit',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'discordbot',
  'googlebot',
  'bingbot',
  'yandexbot',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot));
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function handler(req: Request): Response {
  const userAgent = req.headers.get('user-agent') || '';
  const url = new URL(req.url);
  const path = url.searchParams.get('path') || url.pathname;

  // Normal visitors get the SPA shell
  if (!isCrawler(userAgent)) {
    return new Response(SPA_SHELL, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Crawlers get minimal OG HTML
  const meta = OG_META[path] || DEFAULT_OG;
  const origin = url.origin;
  const canonicalUrl = `${origin}${path}`;

  // Dynamic OG image for projects and insights, static fallback otherwise
  const insightMatch = path.match(/^\/insight\/([a-z0-9-]+)$/);
  const projectMatch = path.match(/^\/project\/([a-z0-9-]+)$/);

  let ogImage: string;
  if (insightMatch) {
    ogImage = `${origin}/api/og-image?type=insight&slug=${insightMatch[1]}`;
  } else if (projectMatch) {
    ogImage = `${origin}/api/og-image?type=project&slug=${projectMatch[1]}`;
  } else {
    ogImage = `${origin}/og-image-social.png`;
  }

  const title = escapeHtml(meta.title);
  // Ensure description meets LinkedIn's 100-character minimum
  let rawDescription = meta.description;
  if (rawDescription.length < 100) {
    rawDescription += ` — An insight from the SHAPENEURAL designed intelligence portfolio.`;
  }
  const description = escapeHtml(rawDescription);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image" content="${ogImage}"/>
<meta property="og:url" content="${canonicalUrl}"/>
<meta property="og:type" content="${meta.type}"/>
<meta property="og:site_name" content="SHAPENEURAL"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${description}"/>
<meta name="twitter:image" content="${ogImage}"/>
<meta name="description" content="${description}"/>
<meta http-equiv="refresh" content="0;url=${canonicalUrl}"/>
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
