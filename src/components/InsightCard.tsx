import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Insight } from "@/data/projects";

interface InsightCardProps {
  insight: Insight;
  projectSlug: string;
  expanded: boolean;
  onToggle?: () => void;
  /** If true, renders permanently expanded with no toggle */
  standalone?: boolean;
}

const getLensColor = (lens: string) => {
  switch (lens) {
    case "THE_PROBLEM": return "#ff0055";
    case "THE_STACK": return "#0f0";
    case "THE_SIGNAL": return "#ffaa00";
    case "THE_CONCEPT": return "#00aaff";
    case "THE_SOLUTION": return "#0f0";
    case "THE_VALUE": return "#ff00ff";
    case "THE_LANDSCAPE": return "#00ffaa";
    case "THE_EXPERIENCE": return "#ffaa00";
    default: return "#0f0";
  }
};

const InsightCard = ({ insight, projectSlug, expanded, onToggle, standalone }: InsightCardProps) => {
  const lensColor = getLensColor(insight.lens);
  const isExpanded = standalone || expanded;

  return (
    <div
      className="border-b"
      style={{ borderColor: "#222" }}
      id={insight.id}
    >
      {/* Header / Toggle */}
      {!standalone ? (
        <button
          onClick={onToggle}
          className="w-full py-5 px-4 flex items-center justify-between gap-4 group text-left"
        >
          <div className="flex items-center gap-4 min-w-0">
            <span
              className="text-xs tracking-[0.2em] font-bold shrink-0 px-2 py-0.5"
              style={{
                color: lensColor,
                border: `1px solid ${lensColor}33`,
                backgroundColor: `${lensColor}08`,
              }}
            >
              {insight.lens}
            </span>
            <span
              className="text-sm tracking-wider truncate transition-colors"
              style={{ color: isExpanded ? lensColor : "#e0e0e0" }}
            >
              {insight.headline}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs tracking-widest hidden sm:block" style={{ color: "#666" }}>
              {insight.date.slice(0, 7)}
            </span>
            <div
              className="w-7 h-7 flex items-center justify-center border group-hover:border-[#0f0] group-hover:text-[#0f0] transition-colors"
              style={{ borderColor: "#333", color: "#666" }}
            >
              {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
            </div>
          </div>
        </button>
      ) : null}

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={standalone ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={standalone ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={standalone ? "" : "overflow-hidden"}
          >
            <div className={standalone ? "" : "px-4 pb-8"}>
              {/* Teaser */}
              <p
                className="text-sm italic mb-6 leading-relaxed"
                style={{ color: "#888" }}
              >
                {insight.teaser}
              </p>

              {/* Content body */}
              <div
                className="text-sm leading-relaxed whitespace-pre-line space-y-4"
                style={{ color: "#ccc" }}
                dangerouslySetInnerHTML={{
                  __html: insight.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e0e0e0">$1</strong>')
                    .replace(/\n\n/g, '</p><p style="margin-top:1rem">')
                }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs tracking-wider"
                    style={{
                      color: "#0f0",
                      border: "1px solid #0f033",
                      backgroundColor: "#0f0008",
                    }}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              {/* Action links */}
              <div className="flex flex-wrap gap-4 mt-6">
                {!standalone && (
                  <Link
                    to={`/insight/${insight.id}`}
                    className="text-xs tracking-[0.2em] flex items-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ color: "#0f0" }}
                  >
                    {">"} STANDALONE_VIEW <ExternalLink size={12} />
                  </Link>
                )}
                {insight.linkedInUrl && (
                  <a
                    href={insight.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-[0.2em] flex items-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ color: "#00aaff" }}
                  >
                    {">"} LINKEDIN_DISCUSSION <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsightCard;
