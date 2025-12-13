import { ExternalLink } from 'lucide-react';

const ProfileSection = () => {
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
            <span className="text-[#0f0] text-sm tracking-[0.3em] font-bold font-mono">OPERATOR_PROFILE</span>
          </div>
          
          {/* Chromatic Aberration Title */}
          <div className="relative">
            {/* Red Channel */}
            <div
              className="absolute top-0 left-[-2px] text-red-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl font-mono"
              style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
            >
              SOURCE_IDENTITY
            </div>
            {/* Blue Channel */}
            <div
              className="absolute top-0 left-[2px] text-blue-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl font-mono"
              style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
            >
              SOURCE_IDENTITY
            </div>
            {/* Main Channel */}
            <div
              className="relative text-[#e0e0e0] text-4xl md:text-6xl font-mono"
              style={{ letterSpacing: "-4px", lineHeight: 0.85 }}
            >
              SOURCE<span className="text-[#ff0055]">_</span>IDENTITY
            </div>
          </div>
          
          <p className="text-[#666] mt-6 max-w-xl tracking-wide font-mono">
            {">"} Accessing operator credentials. Decrypting profile data.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column - System Log */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Data Block Header */}
            <h3 className="text-[#0f0] font-mono text-base sm:text-lg tracking-[0.2em]">
              // DATA_BLOCK
            </h3>

            {/* Data Block */}
            <div className="font-mono space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
              <div className="flex flex-wrap">
                <span className="text-[#0f0] mr-2">{'>'}</span>
                <span className="text-gray-400 w-16 sm:w-20">IDENT:</span>
                <span className="text-white tracking-wider">UFUK AVCI</span>
              </div>
              <div className="flex flex-wrap">
                <span className="text-[#0f0] mr-2">{'>'}</span>
                <span className="text-gray-400 w-16 sm:w-20">ROLE:</span>
                <span className="text-white tracking-wider break-all sm:break-normal">CX_SPECIALIST && AI_ARCHITECT</span>
              </div>
              <div className="flex flex-wrap">
                <span className="text-[#0f0] mr-2">{'>'}</span>
                <span className="text-gray-400 w-16 sm:w-20">ORIGIN:</span>
                <span className="text-white tracking-wider">GRAFFITI_WRITER <span className="text-[#ff0055]">(TAG: SN)</span></span>
              </div>
              <div className="flex flex-wrap">
                <span className="text-[#0f0] mr-2">{'>'}</span>
                <span className="text-gray-400 w-16 sm:w-20">MISSION:</span>
                <span className="text-white tracking-wider break-all sm:break-normal">BRIDGING_ANALOG_AND_SYNTHETIC</span>
              </div>
            </div>

            {/* Manifesto Block */}
            <div className="mt-8 sm:mt-12 border-l-2 border-[#333] pl-4 sm:pl-6">
              <div className="text-[#0f0] font-mono text-xs tracking-[0.2em] mb-3 sm:mb-4 opacity-60">
                {'>'} MANIFESTO.TXT
              </div>
              <p className="text-gray-400 font-mono text-sm sm:text-base leading-relaxed italic">
                "I don't just prompt. I compose. Combining the raw energy of street art 
                with the precision of neural networks. Every project is a collision between 
                chaos and control—analog soul meeting synthetic precision."
              </p>
            </div>

            {/* Status Indicators */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0f0] animate-pulse" />
                <span className="text-gray-500">STATUS: ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">LOCATION:</span>
                <span className="text-white">BERLIN_NODE</span>
              </div>
            </div>
          </div>

          {/* Right Column - Cybernetic Portrait */}
          <div className="relative order-1 lg:order-2 max-w-sm mx-auto lg:max-w-none">
            {/* HUD Frame */}
            <div className="relative border-2 border-[#333] p-2">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#0f0]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#0f0]" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#0f0]" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#0f0]" />
              
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden">
                {/* Placeholder Portrait */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center font-mono">
                    <div className="text-6xl text-[#333] mb-4">SN</div>
                    <div className="text-xs text-gray-600 tracking-[0.2em]">[ PORTRAIT_DATA ]</div>
                  </div>
                </div>
                
                {/* Scanline Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                  }}
                />
                
                {/* CRT Vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
                  }}
                />

                {/* Glitch Line Effect */}
                <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-[#0f0] opacity-20 animate-pulse" />
              </div>

              {/* HUD Data Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-xs text-[#0f0] opacity-60">
                <span>ID_VERIFIED</span>
                <span>CLEARANCE: ALPHA</span>
              </div>
            </div>

            {/* Metadata below frame */}
            <div className="mt-4 font-mono text-xs text-gray-600 text-center tracking-[0.2em]">
              [ NEURAL_SCAN_COMPLETE ]
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
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-500 hover:text-[#0f0] transition-colors duration-300 text-sm"
            >
              <span className="text-[#0f0] opacity-60">[</span>
              <span className="tracking-[0.15em]">LINKEDIN</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[#0f0] opacity-60">]</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-500 hover:text-[#ff0055] transition-colors duration-300 text-sm"
            >
              <span className="text-[#ff0055] opacity-60">[</span>
              <span className="tracking-[0.15em]">INSTAGRAM</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[#ff0055] opacity-60">]</span>
            </a>
            <a 
              href="mailto:contact@shapeneural.com"
              className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm"
            >
              <span className="text-gray-600">[</span>
              <span className="tracking-[0.15em]">MAIL_PROTOCOL</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-gray-600">]</span>
            </a>
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
