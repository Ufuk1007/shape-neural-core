import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ExternalLink } from "lucide-react";
import sapientBlockImg from "@/assets/sapient-block-screenshot.png";
import melodeyeImg from "@/assets/melodeye-screenshot.png";

interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  status: "LIVE" | "BETA" | "ARCHIVED";
  tags: string[];
  desc: string;
  techStack: string[];
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: "MOD_01",
    title: "SAPIENT_BLOCK",
    client: "CLASSIFIED",
    year: "2024",
    status: "LIVE",
    tags: ["BLOCKCHAIN", "AI", "ANALYTICS"],
    desc: "AI-powered blockchain relevance analysis for enterprises. Algorithmic pattern recognition meets use-case matching – digital archaeology for decentralized potential.",
    techStack: ["React", "TypeScript", "Supabase", "OpenAI", "Tailwind CSS"],
    image: sapientBlockImg,
  },
  {
    id: "MOD_02",
    title: "MELODEYE_EMOTION_ADAPTIVE_MUSIC",
    client: "RESEARCH_PROJECT",
    year: "2024-2025",
    status: "LIVE",
    tags: ["BIOMETRIC_AI", "EMOTION_RECOGNITION", "MUSIC_GENERATION"],
    desc: "Multi-modal emotion recognition system that reads facial expressions and eye behaviors separately, generating adaptive music based on true emotional state rather than displayed affect.",
    techStack: ["React", "TypeScript", "Supabase", "MediaPipe", "Mureka_API"],
    image: melodeyeImg,
  },
  {
    id: "MOD_03",
    title: "NEURAL_COMMERCE",
    client: "ZALANDO_LABS",
    year: "2024",
    status: "BETA",
    tags: ["CX_UX", "ML"],
    desc: "Predictive shopping interfaces powered by behavioral AI. The system anticipates user desires before conscious intent, reducing friction between thought and transaction.",
    techStack: ["Python", "Kafka", "Redis", "Next.js"],
  },
  {
    id: "MOD_04",
    title: "PHANTOM_PROTOCOL",
    client: "CLASSIFIED",
    year: "2024",
    status: "LIVE",
    tags: ["META", "SECURITY"],
    desc: "Zero-knowledge authentication framework. Biometric neural patterns replace passwords, enabling seamless identity verification without exposing personal data.",
    techStack: ["Rust", "WebAssembly", "Zero-Knowledge Proofs", "Edge Computing"],
  },
  {
    id: "MOD_05",
    title: "ECHO_CHAMBER_BREAK",
    client: "MOZILLA_FOUNDATION",
    year: "2023",
    status: "ARCHIVED",
    tags: ["SOCIAL", "AI_ETHICS"],
    desc: "Algorithm intervention tool that deliberately introduces cognitive diversity. Designed to rupture filter bubbles and expose users to perspectives outside their algorithmic comfort zones.",
    techStack: ["GraphQL", "Neo4j", "Svelte", "Deno"],
  },
];

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "LIVE":
      return "#0f0";
    case "BETA":
      return "#ffaa00";
    case "ARCHIVED":
      return "#ff0055";
  }
};

const getStatusGlow = (status: Project["status"]) => {
  switch (status) {
    case "LIVE":
      return "0 0 10px #0f0, 0 0 20px #0f044";
    case "BETA":
      return "0 0 10px #ffaa00, 0 0 20px #ffaa0044";
    case "ARCHIVED":
      return "0 0 10px #ff0055, 0 0 20px #ff005544";
  }
};

// Signal Loss Component for glitch effect
const SignalLossMedia = ({ image }: { image?: string }) => {
  const [showSignal, setShowSignal] = useState(true);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!image) return;

    // Random signal loss intervals
    const triggerGlitch = () => {
      const randomDelay = Math.random() * 4000 + 2000; // 2-6 seconds between glitches
      
      setTimeout(() => {
        setGlitching(true);
        
        // Glitch duration
        setTimeout(() => {
          setShowSignal(false);
          setGlitching(false);
          
          // Show NO_SIGNAL for a bit
          setTimeout(() => {
            setGlitching(true);
            setTimeout(() => {
              setShowSignal(true);
              setGlitching(false);
              triggerGlitch(); // Loop
            }, 150);
          }, 800 + Math.random() * 1200);
        }, 150);
      }, randomDelay);
    };

    triggerGlitch();
  }, [image]);

  return (
    <div
      className="aspect-video relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        border: "1px solid #333",
      }}
    >
      {/* Image Layer */}
      {image && showSignal && (
        <img
          src={image}
          alt="Project screenshot"
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity"
          style={{
            opacity: glitching ? 0.3 : 1,
            filter: glitching ? "brightness(2) contrast(2) hue-rotate(90deg)" : "none",
          }}
        />
      )}

      {/* Glitch overlay when transitioning */}
      {glitching && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                top: `${Math.random() * 100}%`,
                height: `${Math.random() * 20 + 5}px`,
                backgroundColor: i % 2 === 0 ? "#0f0" : "#ff0055",
                opacity: Math.random() * 0.8,
                transform: `translateX(${Math.random() * 20 - 10}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* NO_SIGNAL Placeholder - shown when no image or signal lost */}
      {(!image || !showSignal) && !glitching && (
        <>
          {/* Glitch Lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px"
                style={{
                  top: `${12 + i * 12}%`,
                  backgroundColor: "#0f0",
                  opacity: Math.random() * 0.5 + 0.2,
                }}
              />
            ))}
          </div>

          {/* Placeholder Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#333] text-xs tracking-[0.5em] mb-2">MEDIA_FEED</div>
              <div className="text-[#666] text-2xl font-bold tracking-tight">[NO_SIGNAL]</div>
            </div>
          </div>
        </>
      )}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
};

const ProjectRack = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flashingId, setFlashingId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // Flash effect on click
    setFlashingId(id);
    setTimeout(() => setFlashingId(null), 150);

    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen py-20 px-8 md:px-20"
      style={{
        background: "linear-gradient(180deg, #111 0%, #050505 50%, #111 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: "#0f0",
              boxShadow: "0 0 10px #0f0, 0 0 20px #0f044",
            }}
          />
          <span className="text-[#0f0] text-sm tracking-[0.3em] font-bold">SYSTEM_ARCHIVE</span>
        </div>
        <div className="relative">
          {/* Red Channel */}
          <div
            className="absolute top-0 left-[-2px] text-red-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
          >
            PROJECT_RACK
          </div>
          {/* Blue Channel */}
          <div
            className="absolute top-0 left-[2px] text-blue-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
          >
            PROJECT_RACK
          </div>
          {/* Main Channel */}
          <div
            className="relative text-[#e0e0e0] text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
          >
            PROJECT<span className="text-[#ff0055]">_</span>RACK
          </div>
        </div>
        <p className="text-[#666] mt-4 max-w-xl tracking-wide">
          {">"} Accessing project modules. Select entry to decrypt.
        </p>
      </div>

      {/* Project Modules */}
      <div className="max-w-6xl mx-auto">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            className="relative border-b"
            style={{
              borderColor: flashingId === project.id ? "#fff" : "#333",
              transition: "border-color 0.15s ease",
            }}
          >
            {/* Collapsed State - The Spine */}
            <button
              onClick={() => handleToggle(project.id)}
              className="w-full py-6 px-4 flex items-center justify-between gap-4 group"
              style={{
                minHeight: "80px",
              }}
            >
              {/* Left: Status LED + ID + Title */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Status LED */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: getStatusColor(project.status),
                    boxShadow: getStatusGlow(project.status),
                  }}
                />

                {/* Module ID + Title */}
                <div className="text-left relative">
                  <span className="text-[#666] text-xs md:text-sm tracking-widest">[{project.id}]</span>
                  <span className="text-[#666] mx-2 hidden md:inline">//</span>
                  <span 
                    className="text-sm md:text-lg tracking-wider font-bold transition-colors block md:inline"
                    style={{ 
                      color: expandedId === project.id ? getStatusColor(project.status) : '#e0e0e0'
                    }}
                  >
                    <span className="group-hover:hidden">{project.title}</span>
                    <span 
                      className="hidden group-hover:inline"
                      style={{ color: getStatusColor(project.status) }}
                    >
                      {project.title}
                    </span>
                  </span>
                </div>
              </div>

              {/* Right: Tags + Expand Icon */}
              <div className="flex items-center gap-3 md:gap-6">
                {/* Tags - Hidden on mobile */}
                <div className="hidden md:flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs tracking-wider border"
                      style={{
                        color: "#0f0",
                        borderColor: "#0f044",
                        backgroundColor: "#0f0008",
                      }}
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>

                {/* Year */}
                <span className="text-[#666] text-xs tracking-widest hidden sm:block">{project.year}</span>

                {/* Expand Icon */}
                <div
                  className="w-8 h-8 flex items-center justify-center border group-hover:border-[#0f0] group-hover:text-[#0f0] transition-colors"
                  style={{
                    borderColor: "#333",
                    color: "#666",
                  }}
                >
                  {expandedId === project.id ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </div>
            </button>

            {/* Expanded State - The Content */}
            <AnimatePresence>
              {expandedId === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-8 pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left: Media with Signal Loss Effect */}
                      <SignalLossMedia image={project.image} />

                      {/* Right: Data Panel */}
                      <div className="space-y-6">
                        {/* Client + Status */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[#666] text-xs tracking-widest">CLIENT:</span>
                            <span className="text-[#e0e0e0] ml-2 tracking-wider">{project.client}</span>
                          </div>
                          <div
                            className="px-3 py-1 text-xs tracking-widest font-bold"
                            style={{
                              color: getStatusColor(project.status),
                              border: `1px solid ${getStatusColor(project.status)}`,
                              backgroundColor: `${getStatusColor(project.status)}11`,
                            }}
                          >
                            {project.status}
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="text-[#666] text-xs tracking-widest mb-2">BRIEF:</div>
                          <p className="text-[#aaa] leading-relaxed text-sm">{project.desc}</p>
                        </div>

                        {/* Tech Stack */}
                        <div>
                          <div className="text-[#666] text-xs tracking-widest mb-3">TECH_STACK:</div>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs tracking-wider"
                                style={{
                                  color: "#0f0",
                                  backgroundColor: "#0f0011",
                                  border: "1px solid #0f033",
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          className="w-full mt-4 py-4 px-6 flex items-center justify-center gap-3 font-bold tracking-wider group"
                          style={{
                            backgroundColor: "#ff0055",
                            color: "#fff",
                            border: "2px solid #ff0055",
                          }}
                          whileHover={{
                            backgroundColor: "#ff3377",
                            borderColor: "#ff3377",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{">"} INITIALIZE_CASE_STUDY</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            _
                          </motion.span>
                          <ExternalLink size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t" style={{ borderColor: "#222" }}>
        <div className="flex items-center justify-between text-[#444] text-xs tracking-widest">
          <span>MODULES_LOADED: {PROJECTS.length}</span>
          <span>END_OF_ARCHIVE</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectRack;
