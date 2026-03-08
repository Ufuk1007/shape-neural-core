import { Navigate, Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SubpageShell from "@/components/SubpageShell";
import InsightCard from "@/components/InsightCard";
import { findInsightById } from "@/data/projects";
import { ExternalLink } from "lucide-react";

const InsightPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const result = findInsightById(slug || "");

  if (!result) return <Navigate to="/404" replace />;

  const { project, insight } = result;

  const getLensColor = (lens: string) => {
    switch (lens) {
      case "THE_PROBLEM": return "#ff0055";
      case "THE_STACK": return "#0f0";
      case "THE_SIGNAL": return "#ffaa00";
      default: return "#0f0";
    }
  };

  const lensColor = getLensColor(insight.lens);

  return (
    <>
      <Helmet>
        <title>{insight.headline} // SHAPENEURAL</title>
        <meta name="description" content={insight.teaser} />
        <meta property="og:title" content={insight.headline} />
        <meta property="og:description" content={insight.teaser} />
        <meta property="og:type" content="article" />
      </Helmet>

      <SubpageShell
        projectLink={{ label: project.title, to: `/project/${project.slug}` }}
        footerMeta="TRANSMISSION_END"
      >
        {/* Insight context header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs tracking-[0.3em]" style={{ color: "#666" }}>INSIGHT //</span>
            <span
              className="text-xs tracking-[0.2em] font-bold px-2 py-0.5"
              style={{
                color: lensColor,
                border: `1px solid ${lensColor}33`,
                backgroundColor: `${lensColor}08`,
              }}
            >
              {insight.lens}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2 text-xs tracking-widest" style={{ color: "#666" }}>
            <span>FROM: {project.title} [{project.id}]</span>
            <span>//</span>
            <span>DATE: {insight.date}</span>
          </div>

          {/* Separator */}
          <div className="my-6" style={{ borderTop: "2px solid #222" }} />

          {/* Headline */}
          <h1
            className="text-2xl md:text-4xl font-bold mb-2"
            style={{ color: "#e0e0e0", letterSpacing: "-1px", lineHeight: 1 }}
          >
            {insight.headline}
          </h1>

          <div className="my-6" style={{ borderTop: "2px solid #222" }} />
        </div>

        {/* Insight content — rendered standalone */}
        <InsightCard
          insight={insight}
          projectSlug={project.slug}
          expanded={true}
          standalone={true}
        />

        {/* Navigation links */}
        <div className="mt-12 pt-8 space-y-4" style={{ borderTop: "1px solid #222" }}>
          <Link
            to={`/project/${project.slug}`}
            className="flex items-center gap-2 text-xs tracking-[0.2em] font-bold hover:opacity-80 transition-opacity"
            style={{ color: "#0f0" }}
          >
            {">"} VIEW_FULL_PROJECT: {project.title} <ExternalLink size={12} />
          </Link>

          {insight.linkedInUrl && (
            <a
              href={insight.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[0.2em] font-bold hover:opacity-80 transition-opacity"
              style={{ color: "#00aaff" }}
            >
              {">"} LINKEDIN_DISCUSSION <ExternalLink size={12} />
            </a>
          )}
        </div>
      </SubpageShell>
    </>
  );
};

export default InsightPage;
