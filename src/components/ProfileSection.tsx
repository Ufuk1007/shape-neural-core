import { ExternalLink, FileText } from "lucide-react";
import profilePortrait from "@/assets/profile-portrait.png";

interface ProfileSectionProps {
  onOpenLegal: () => void;
}

const ProfileSection = ({ onOpenLegal }: ProfileSectionProps) => {
  return (
    <section
      className="relative min-h-screen py-20 px-8 md:px-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #111 0%, #050505 50%, #111 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Section Header - matching Project Rack style */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: "#0f0",
              boxShadow: "0 0 10px #0f0, 0 0 20px #0f044",
            }}
          />
          <span className="text-[#0f0] text-sm tracking-[0.3em] font-bold" style={{ fontFamily: "'Courier New', monospace" }}>OPERATOR_PROFILE</span>
        </div>

        {/* Chromatic Aberration Title */}
        <div className="relative">
          {/* Red Channel */}
          <div
            className="absolute top-0 left-[-2px] text-red-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
          >
            SOURCE_IDENTITY
          </div>
          {/* Blue Channel */}
          <div
            className="absolute top-0 left-[2px] text-blue-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
          >
            SOURCE_IDENTITY
          </div>
          {/* Main Channel */}
          <div
            className="relative text-[#e0e0e0] text-4xl md:text-6xl"
            style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
          >
            SOURCE<span className="text-[#ff0055]">_</span>IDENTITY
          </div>
        </div>

        <p className="text-[#666] mt-6 max-w-xl tracking-wide" style={{ fontFamily: "'Courier New', monospace" }}>
          {">"} Accessing operator credentials. Decrypting profile data.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column - System Log */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          {/* Data Block Header */}
          <h3 className="text-[#0f0] font-mono text-base sm:text-lg tracking-[0.2em]">// DATA_BLOCK</h3>

          {/* Data Block */}
          <div className="font-mono space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">IDENT:</span>
              <span className="text-white tracking-wider">UFUK AVCI</span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">ROLE:</span>
              <span className="text-white tracking-wider break-all sm:break-normal">CX_STRATEGIST && AI_ARCHITECT</span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">ORIGIN:</span>
              <span className="text-white tracking-wider">STREET_ART → DESIGN → STRATEGY</span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">SECTOR:</span>
              <span className="text-white tracking-wider">
                FINTECH_VP <span className="text-[#ff0055]">@ TIER1_BANK</span>
              </span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">TIMELINE:</span>
              <span className="text-white tracking-wider">
                1996_ANALOG {">"}
                {">"} 2025_SYNTHETIC
              </span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-[#0f0] mr-2">{">"}</span>
              <span className="text-gray-400 w-20 sm:w-24">MISSION:</span>
              <span className="text-white tracking-wider break-all sm:break-normal">HUMAN_POTENTIAL × AI_FUTURES</span>
            </div>
          </div>

          {/* Manifesto Block */}
          <div className="mt-8 sm:mt-12">
            <div className="text-[#0f0] font-mono text-xs tracking-[0.2em] mb-3 sm:mb-4 opacity-60">
              {">"} MANIFESTO.TXT
            </div>
            <div className="flex gap-4">
              {/* Profile Portrait */}
              <div className="shrink-0">
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid #333",
                    boxShadow: "0 0 10px rgba(0,255,0,0.1)",
                  }}
                >
                  <img
                    src={profilePortrait}
                    alt="Ufuk Avci"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23666' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-size='120' font-family='monospace'%3EUA%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                    }}
                  />
                </div>
              </div>

              {/* Manifesto Text */}
              <div className="border-l-2 border-[#333] pl-4 sm:pl-6">
                <p className="text-gray-400 font-mono text-sm sm:text-base leading-relaxed italic">
                  "From walls to interfaces, from spray cans to neural networks. Three decades of shaping environments—first
                  with paint, now with prompts. I architect experiences where human intuition meets machine intelligence.
                  Every system I build carries the DNA of street art:{" "}
                  <span
                    className="text-[#ff0055] not-italic font-bold"
                    style={{
                      textShadow: "0 0 10px rgba(255, 0, 85, 0.3)"
                    }}
                  >
                    bold, unapologetic, designed to move people
                  </span>
                  ."
                </p>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0f0] animate-pulse" />
              <span className="text-gray-500">STATUS: ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">LOCATION:</span>
              <span className="text-white">FRANKFURT_NODE</span>
            </div>
          </div>
        </div>

        {/* Right Column - Reserved for Animation */}
        <div className="relative order-1 lg:order-2 max-w-sm mx-auto lg:max-w-none">
          {/* TODO: SN → Code transformation animation will be added here */}
          <div className="relative border-2 border-[#333] p-2 aspect-[3/4] bg-[#0a0a0a] flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-[#333] text-xs tracking-[0.2em]">[ ANIMATION_SLOT ]</div>
              <div className="text-[#222] text-xs mt-2">SN → CODE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t relative" style={{ borderColor: "#222" }}>
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#050505] px-4">
          <div className="w-2 h-2 rounded-full bg-[#0f0] animate-pulse" />
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto text-center">
        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
          <a
            href="https://www.linkedin.com/in/ufuk-avci-1346871b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-500 hover:text-[#0f0] transition-colors duration-300 text-sm"
          >
            <span className="text-[#0f0] opacity-60">[</span>
            <span className="tracking-[0.15em]">LINKEDIN_NODE</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[#0f0] opacity-60">]</span>
          </a>
          <a
            href="mailto:signal@shapeneural.com"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm"
          >
            <span className="text-gray-600">[</span>
            <span className="tracking-[0.15em]">SIGNAL_TRANSMISSION</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-gray-600">]</span>
          </a>
          <button
            onClick={onOpenLegal}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#ff0055] transition-colors duration-300 text-sm"
          >
            <span className="text-[#ff0055] opacity-60">[</span>
            <span className="tracking-[0.15em]">LEGAL_PROTOCOLS</span>
            <FileText size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[#ff0055] opacity-60">]</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[#444] text-xs tracking-widest">
          © 2025 SHAPENEURAL // <span className="text-[#0f0]">SYSTEM_ONLINE</span>
        </div>
      </footer>
    </section>
  );
};

export default ProfileSection;
