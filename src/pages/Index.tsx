import { useEffect, useState } from "react";
import { Grid3x3, Diamond, MessageSquare, Terminal } from "lucide-react";

const Index = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      
      {/* 1. THE SCANLINE LAYER (From CSS) */}
      <div className="scanlines" />
      
      {/* 2. THE FLICKER LAYER */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-flicker bg-[rgba(18,16,16,0.1)] opacity-20" />

      {/* 3. CONTENT */}
      <div className="relative z-30 w-full max-w-5xl px-6 md:px-12 flex flex-col gap-12">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-end border-b-2 border-[#0f0]/30 pb-4 text-sm md:text-base font-bold tracking-widest">
          <div className="flex items-center gap-4 text-[#ff0055]">
            <span className="animate-pulse">SYS</span>
            <span className="hidden md:inline">[SN_CORE_V1]</span>
          </div>
          <div className="text-[#0f0]">
            SESSION: {formatTime(time)}
          </div>
        </div>

        {/* HEADLINE */}
        <div className="flex flex-col gap-6">
          <h1 className="glitch-shadow text-7xl md:text-9xl font-bold uppercase leading-[0.85] tracking-tighter text-[#e0e0e0]">
            SHAPE<br />NEURAL<span className="animate-pulse">_</span>
          </h1>
          
          <div>
            <span className="inline-block bg-white text-black font-sans font-black text-lg px-4 py-2 -skew-x-12 transform">
              DESIGNING INTELLIGENCE
            </span>
          </div>
        </div>

        {/* BUTTONS (FIXED FONTS & ICONS) */}
        <div className="mt-12">
          <div className="text-[#0f0] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
            <Terminal size={16} /> 
            <span>SELECT_MODE:</span>
          </div>
          
          <div className="flex flex-wrap gap-6 font-bold text-lg tracking-widest">
            {/* DATA CLOUD */}
            <a href="#cloud" className="group flex items-center gap-4 border-4 border-[#0f0] px-6 py-4 hover:bg-[#0f0] hover:text-black transition-colors min-w-[200px]">
              <Grid3x3 className="w-6 h-6" />
              DATA_CLOUD
            </a>

            {/* PROJECTS */}
            <a href="#projects" className="group flex items-center gap-4 border-4 border-[#0f0] px-6 py-4 hover:bg-[#0f0] hover:text-black transition-colors min-w-[200px]">
              <Diamond className="w-6 h-6" />
              PROJECTS
            </a>

            {/* AI CHAT */}
            <button className="group flex items-center gap-4 bg-[#ff0055] border-4 border-[#ff0055] text-white px-6 py-4 hover:bg-[#ff3377] hover:border-[#ff3377] transition-colors min-w-[200px]">
              <MessageSquare className="w-6 h-6 fill-current" />
              AI_CHAT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
