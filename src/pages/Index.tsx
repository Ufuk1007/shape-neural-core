import { useEffect, useState } from "react";
import { Grid3x3, Zap, MessageSquare, Terminal } from "lucide-react";
import NeuralCloud from "@/components/NeuralCloud";
import ProjectRack from "@/components/ProjectRack";
import ProfileSection from "@/components/ProfileSection";
import LegalModal from "@/components/LegalModal";

const Index = () => {
  const [time, setTime] = useState(0);
  const [blink, setBlink] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isInterrogating, setIsInterrogating] = useState(false);

  const handleInterrogationStart = () => {
    // First, smooth scroll to the cloud section
    const cloudSection = document.getElementById('cloud');
    if (cloudSection) {
      cloudSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Wait for scroll to complete, then activate interrogation
      setTimeout(() => {
        setIsInterrogating(true);
      }, 800);
    } else {
      setIsInterrogating(true);
    }
  };

  // Lock body scroll when interrogating
  useEffect(() => {
    if (isInterrogating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInterrogating]);

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Blinking Logic for "SYS"
  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 800);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  return (
    <>
      <div
        className={`relative min-h-screen w-full flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#111] transition-opacity duration-1000 ${isInterrogating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          color: "#0f0",
        }}
      >
        {/* 1. SCANLINE OVERLAY (Direct Port from User Code) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
          linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
        `,
            backgroundSize: "100% 4px, 6px 100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* MOVING SCANLINE */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-[#0f0] opacity-10 pointer-events-none z-10"
          style={{
            animation: "scanMove 4s linear infinite",
          }}
        />

        {/* 2. CRT FLICKER */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[rgba(18,16,16,0.1)] opacity-10 animate-pulse" />

        {/* 3. CONTENT CONTAINER */}
        <div className="relative z-30 w-full max-w-6xl">
          {/* TOP METADATA ROW */}
          <div className="flex items-center gap-4 mb-6 font-bold tracking-widest text-sm md:text-base">
            <div className="flex items-center gap-2 text-[#ff0055]">
              <span
                style={{
                  opacity: blink ? 1 : 0.3,
                  transition: "opacity 0.1s",
                }}
              >
                SYS ●
              </span>
              <span>[SN_LAB_V1]</span>
              <span className="text-[#0f0]">{formatTime(time)}</span>
            </div>
          </div>

          {/* MAIN HEADLINE (The 3-Layer Technique) */}
          <div className="relative mb-8">
            {/* Red Channel */}
            <div
              className="absolute top-0 left-[-2px] text-red-600 opacity-70 select-none pointer-events-none"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                lineHeight: 0.85,
                letterSpacing: "-4px",
              }}
            >
              SHAPE
              <br />
              NEURAL_
            </div>
            {/* Blue Channel */}
            <div
              className="absolute top-0 left-[2px] text-blue-600 opacity-70 select-none pointer-events-none"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                lineHeight: 0.85,
                letterSpacing: "-4px",
              }}
            >
              SHAPE
              <br />
              NEURAL_
            </div>
            {/* Main Channel */}
            <div
              className="relative text-[#e0e0e0]"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                lineHeight: 0.85,
                letterSpacing: "-4px",
              }}
            >
              SHAPE
              <br />
              NEURAL
              <span
                style={{
                  opacity: blink ? 1 : 0.3,
                  transition: "opacity 0.1s",
                }}
              >
                _
              </span>
            </div>
          </div>

          {/* SUBTAG */}
          <div className="inline-block bg-white text-black font-sans font-black text-lg px-4 py-2 -skew-x-12 transform mb-16">
            DESIGNING INTELLIGENCE
          </div>

          {/* BUTTON INTERFACE */}
          <div>
            <div className="text-[#0f0] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Terminal size={14} />
              <span>SELECT_MODE:</span>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              {/* DATA CLOUD */}
              <a
                href="#cloud"
                className="group flex items-center gap-3 border-2 border-[#0f0] px-6 py-3 hover:bg-[#0f0] hover:text-black transition-colors min-w-[180px] font-bold tracking-wider"
              >
                <Grid3x3 className="w-5 h-5" />
                <span>DATA_CLOUD</span>
              </a>

              {/* PROJECTS */}
              <a
                href="#projects"
                className="group flex items-center gap-3 border-2 border-[#0f0] px-6 py-3 hover:bg-[#0f0] hover:text-black transition-colors min-w-[180px] font-bold tracking-wider"
              >
                <Zap className="w-5 h-5" />
                <span>PROJECTS</span>
              </a>

              {/* AI ORACLE (Beta) */}
              <button
                onClick={handleInterrogationStart}
                className="group flex items-center gap-3 bg-[#ff0055] border-2 border-[#ff0055] text-white px-6 py-3 hover:bg-[#ff3377] hover:border-[#ff3377] transition-colors min-w-[180px] font-bold tracking-wider"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>AI_ORACLE (Beta)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NEURAL DEBRIS CLOUD SECTION */}
      <NeuralCloud
        isInterrogating={isInterrogating}
        onExitInterrogation={() => setIsInterrogating(false)}
      />

      {/* PROJECT RACK SECTION */}
      <div className={`transition-opacity duration-1000 ${isInterrogating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <ProjectRack />
      </div>

      {/* PROFILE & FOOTER SECTION */}
      <div className={`transition-opacity duration-1000 ${isInterrogating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <ProfileSection onOpenLegal={() => setIsLegalOpen(true)} />
      </div>

      {/* EXIT BUTTON - Only visible during interrogation */}
      {isInterrogating && (
        <button
          onClick={() => setIsInterrogating(false)}
          className="fixed top-8 right-8 z-50 px-6 py-3 font-bold tracking-wider border-2 transition-colors"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            backgroundColor: '#000',
            color: '#ff0055',
            borderColor: '#ff0055',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff0055';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000';
            e.currentTarget.style.color = '#ff0055';
          }}
        >
          {'>'} EXIT
        </button>
      )}

      {/* LEGAL MODAL */}
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </>
  );
};
export default Index;
