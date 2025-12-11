import { ExternalLink } from 'lucide-react';

const ProfileSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Top vignette for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111] to-transparent z-10 pointer-events-none" />
      
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[#0f0] font-mono text-xs sm:text-sm tracking-[0.3em] opacity-60">
            {'>'} ACCESSING_PROFILE...
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column - System Log */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Header */}
            <h2 className="text-[#0f0] font-mono text-base sm:text-lg lg:text-xl tracking-[0.2em]">
              // SOURCE_CODE_IDENTITY
            </h2>

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
        <div className="mt-12 sm:mt-16 lg:mt-24 mb-8 sm:mb-12 relative">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#0f0] to-transparent opacity-60" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#0a0a0a] px-4">
            <div className="w-2 h-2 rounded-full bg-[#0f0] animate-pulse" />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center font-mono">
          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-500 hover:text-[#0f0] transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="text-[#0f0] opacity-60">[</span>
              <span className="tracking-[0.1em] sm:tracking-[0.15em]">LINKEDIN</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[#0f0] opacity-60">]</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-500 hover:text-[#ff0055] transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="text-[#ff0055] opacity-60">[</span>
              <span className="tracking-[0.1em] sm:tracking-[0.15em]">INSTAGRAM</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[#ff0055] opacity-60">]</span>
            </a>
            <a 
              href="mailto:contact@shapeneural.com"
              className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="text-gray-600">[</span>
              <span className="tracking-[0.1em] sm:tracking-[0.15em]">MAIL_PROTOCOL</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-gray-600">]</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em]">
            © 2025 SHAPENEURAL // <span className="text-[#0f0]">SYSTEM_ONLINE</span>
          </div>

          {/* Bottom padding with decorative element */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-8 h-[1px] bg-[#333]" />
            <div className="w-2 h-2 border border-[#333] rotate-45" />
            <div className="w-8 h-[1px] bg-[#333]" />
          </div>
        </footer>
      </div>

      {/* Background noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

export default ProfileSection;
