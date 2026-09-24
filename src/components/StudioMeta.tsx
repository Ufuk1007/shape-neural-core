import { Helmet } from "react-helmet-async";
import type { StudioLanguage } from "@/hooks/use-studio-language";
import { OG_META } from "../../shared/og-metadata";
import { getGeneratedSeoRoute, safeJsonLd } from "../../shared/seo-runtime";

const SITE_ORIGIN = "https://www.shapeneural.com";

type StudioMetaProps = {
  title: string;
  description: string;
  path: string;
  language: StudioLanguage;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export default function StudioMeta({
  title,
  description,
  path,
  language,
  image,
  noIndex = false,
  type = "website",
}: StudioMetaProps) {
  const sharedMeta = OG_META[path];
  const machineRoute = getGeneratedSeoRoute(path);
  const canonical = `${SITE_ORIGIN}${path}`;
  const pageSlug = path === "/" ? "home" : path.split("/").filter(Boolean).at(-1) ?? "home";
  const resolvedImage = image ?? `/api/og-image?type=page&slug=${encodeURIComponent(pageSlug)}`;
  const imageUrl = resolvedImage.startsWith("http") ? resolvedImage : `${SITE_ORIGIN}${resolvedImage}`;
  const selectedTitle = language === "de" && sharedMeta ? sharedMeta.title : title;
  const selectedDescription = language === "de" && sharedMeta ? sharedMeta.description : description;
  const fullTitle = selectedTitle.includes("ShapeNeural") ? selectedTitle : `${selectedTitle} — ShapeNeural`;
  const robots = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const imageAlt = `${fullTitle} — ShapeNeural`;

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{fullTitle}</title>
      <meta name="description" content={selectedDescription} />
      <meta name="author" content="ShapeNeural" />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot" content={robots} />
      <meta name="theme-color" content="#0b0e0c" />
      <link rel="canonical" href={canonical} />
      <link rel="sitemap" type="application/xml" href={`${SITE_ORIGIN}/sitemap.xml`} />
      <link rel="alternate" type="text/plain" title="LLM-readable site overview" href={`${SITE_ORIGIN}/llms.txt`} />
      {machineRoute?.markdown ? <link rel="alternate" type="text/markdown" title="Markdown version" href={`${SITE_ORIGIN}${machineRoute.markdown}`} /> : null}
      {machineRoute?.jsonld ? <link rel="alternate" type="application/ld+json" title="Structured data" href={`${SITE_ORIGIN}${machineRoute.jsonld}`} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={selectedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="ShapeNeural" />
      <meta property="og:locale" content={language === "de" ? "de_DE" : "en_GB"} />
      <meta property="og:locale:alternate" content={language === "de" ? "en_GB" : "de_DE"} />
      {machineRoute ? <meta property="og:updated_time" content={machineRoute.dateModified} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={selectedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {machineRoute ? <script type="application/ld+json">{safeJsonLd(machineRoute.structuredData)}</script> : null}
    </Helmet>
  );
}
