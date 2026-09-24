import generatedSeo from "./generated-seo.json";

export type GeneratedSeoRoute = {
  title: string;
  description: string;
  markdown: string | null;
  jsonld: string | null;
  fallbackHtml: string;
  structuredData: Record<string, unknown>;
  dateModified: string;
};

type GeneratedSeo = {
  generatedAt: string;
  site: Record<string, string>;
  routes: Record<string, GeneratedSeoRoute>;
  catalogs: Record<string, string>;
};

const seo = generatedSeo as GeneratedSeo;

export function getGeneratedSeoRoute(pathname: string): GeneratedSeoRoute | null {
  return seo.routes[pathname] ?? null;
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const generatedSeoSite = seo.site;
export const generatedSeoAt = seo.generatedAt;
