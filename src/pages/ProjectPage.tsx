import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SubpageShell from "@/components/SubpageShell";
import InsightCard from "@/components/InsightCard";
import ProjectHeaderViz from "@/components/ProjectHeaderViz";
import { findProjectBySlug } from "@/data/projects";

const getStatusColor = (status: string) => {
  switch (status) {
    case "LIVE": return "#0f0";
    case "BETA": return "#ffaa00";
    case "ARCHIVED": return "#ff0055";
    default: return "#666";
  }
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const project = findProjectBySlug(slug || "");
  const hashInsightId = location.hash?.replace("#", "");
  const [expandedId, setExpandedId] = useState<string | null>(hashInsightId || null);
  const insightRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll to hash insight
  useEffect(() => {
    if (hashInsightId && insightRefs.current[hashInsightId]) {
      setTimeout(() => {
        insightRefs.current[hashInsightId]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [hashInsightId]);

  if (!project) return <Navigate to="/404" replace />;

  const sortedInsights = [...project.insights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Helmet>
        <title>{project.title} // SHAPENEURAL</title>
        <meta name="description" content={project.brief} />
        <meta property="og:title" content={`${project.title} // SHAPENEURAL`} />
        <meta property="og:description" content={project.brief} />
      </Helmet>

      <SubpageShell footerMeta={`MODULES_LOADED: ${sortedInsights.length} // END_OF_FEED`}>
        {/* Project Header */}
        <div className="mb-12">
          {/* Status + ID */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: getStatusColor(project.status),
                boxShadow: `0 0 10px ${getStatusColor(project.status)}, 0 0 20px ${getStatusColor(project.status)}44`,
              }}
            />
            <span className="text-xs tracking-[0.3em]" style={{ color: "#666" }}>
              [{project.id}]
            </span>
            <span className="text-xs tracking-[0.3em]" style={{ color: "#666" }}>
              //
            </span>
            <span
              className="text-xs tracking-[0.3em] font-bold px-2 py-0.5"
              style={{
                color: getStatusColor(project.status),
                border: `1px solid ${getStatusColor(project.status)}`,
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ color: "#e0e0e0", letterSpacing: "-2px", lineHeight: 0.9 }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 mb-6 text-xs tracking-widest" style={{ color: "#666" }}>
            <span>YEAR: {project.year}</span>
            <span>COLLABORATION: {project.collaboration}</span>
          </div>

          {/* Per-project header visualization */}
          <ProjectHeaderViz slug={project.slug} />

          {/* Brief */}
          <div className="mb-6">
            <span className="text-xs tracking-widest block mb-2" style={{ color: "#666" }}>BRIEF:</span>
            <p className="text-sm leading-relaxed" style={{ color: "#aaa" }}>{project.brief}</p>
          </div>

          {/* Signal Tags */}
          {project.signalTags && project.signalTags.length > 0 && (
            <div className="mb-6">
              <span className="text-xs tracking-widest block mb-3" style={{ color: "#666" }}>SIGNAL_TAGS:</span>
              <div className="flex flex-wrap gap-2">
                {project.signalTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wider font-mono uppercase whitespace-nowrap"
                    style={{ color: "#00ccff", backgroundColor: "#00ccff08", border: "1px solid #00ccff33" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <span className="text-xs tracking-widest block mb-3" style={{ color: "#666" }}>TECH_STACK:</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs tracking-wider"
                  style={{ color: "#0f0", backgroundColor: "#0f0011", border: "1px solid #0f033" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External link */}
          {project.url && (
            project.url.startsWith("/") ? (
              <Link
                to={project.url}
                className="inline-block mt-6 px-6 py-3 text-xs tracking-[0.3em] font-bold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#ff0055", color: "#fff", border: "2px solid #ff0055" }}
              >
                {">"} VISIT_PROJECT
              </Link>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 text-xs tracking-[0.3em] font-bold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#ff0055", color: "#fff", border: "2px solid #ff0055" }}
              >
                {">"} VISIT_PROJECT
              </a>
            )
          )}
        </div>

        {/* Insight Feed */}
        {sortedInsights.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6 border-t pt-8" style={{ borderColor: "#222" }}>
              <span className="text-xs tracking-[0.3em] font-bold" style={{ color: "#0f0" }}>
                INSIGHT_FEED
              </span>
              <span className="text-xs tracking-widest" style={{ color: "#666" }}>
                // {sortedInsights.length} {sortedInsights.length === 1 ? "ENTRY" : "ENTRIES"}
              </span>
            </div>

            {sortedInsights.map((insight) => (
              <div key={insight.id} ref={(el) => { insightRefs.current[insight.id] = el; }}>
                <InsightCard
                  insight={insight}
                  projectSlug={project.slug}
                  expanded={expandedId === insight.id}
                  onToggle={() => setExpandedId(expandedId === insight.id ? null : insight.id)}
                />
              </div>
            ))}
          </div>
        )}

        {sortedInsights.length === 0 && (
          <div className="border-t pt-8" style={{ borderColor: "#222" }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-[0.3em] font-bold" style={{ color: "#0f0" }}>
                INSIGHT_FEED
              </span>
              <span className="text-xs tracking-widest" style={{ color: "#666" }}>
                // INCOMING
              </span>
            </div>
            <div
              className="py-12 px-6 text-center"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a" }}
            >
              <div className="space-y-2">
                <p className="text-xs tracking-[0.2em] font-mono" style={{ color: "#00ff41" }}>
                  {">"} FIRST_TRANSMISSION_PENDING
                </p>
                <p className="text-xs tracking-widest" style={{ color: "#444" }}>
                  INSIGHTS_WILL_APPEAR_HERE // CHECK_BACK_SOON
                </p>
              </div>
            </div>
          </div>
        )}
      </SubpageShell>
    </>
  );
};

export default ProjectPage;
