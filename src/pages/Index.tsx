import { useEffect, useState } from "react";
import { Grid3x3, Diamond, MessageSquare, Terminal } from "lucide-react";

const Index = () => {
  const [time, setTime] = useState(0);

  // Session Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#111]"
      style={{
        // STYLES FROM ROUTE H - ENFORCED
        fontFamily: "'Courier New', Courier, monospace",
        color: "#0f0",
        backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        backgroundSize: "100% 4px, 6px 100%"
      }}
    >
      {/* CRT FLICKER OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-50 animate-flicker bg-[rgba(18,16,16,0.1)] opacity-20" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col gap-12">
        
        {/* TOP BAR: SYS / ID / TIMER */}
        <div className="flex justify-between items-center text-sm md:text-base font-bold tracking-widest border-b-2 border-[#0f0]/30 pb-4">
          <div className="flex items-center gap-6">
            <span className="text-[#ff0055] animate-pulse">SYS</span>
            <span className="text-[#ff0055] hidden md:inline">[SN_CORE_V1]</span>
          </div>
          <div className="text-[#0f0] font-bold">
            SESSION: {formatTime(time)}
          </div>
        </div>

        {/* HERO TYPOGRAPHY */}
        <div className="flex flex-col gap-4">
          <h1 
            className="text-7xl md:text-9xl font-bold uppercase leading-[0.85] tracking-tighter text-[#e0e0e0]"
            style={{ textShadow: "4px 0 red, -4px 0 blue" }}
          >
            SHAPE<br />NEURAL<span className="animate-pulse">_</span>
          </h1>
          
          <div className="mt-8">
            <span className="inline-block bg-white text-black font-sans font-black text-lg px-4 py-2 -skew-x-12 transform">
              DESIGNING INTELLIGENCE
            </span>
          </div>
        </div>

        {/* BUTTON INTERFACE */}
        <div className="mt-12">
          <div className="text-[#0f0] font-bold mb-4 flex items-center gap-2">
            <Terminal size={16} /> 
            <span>SELECT_MODE:</span>
          </div>
          
          <div className="flex flex-wrap gap-6">
            {/* BUTTON 1: DATA CLOUD */}
            <a href="#cloud" className="group flex items-center gap-4 border-4 border-[#0f0] px-8 py-4 font-bold text-xl hover:bg-[#0f0] hover:text-black transition-all cursor-pointer min-w-[200px]">
              <Grid3x3 className="w-6 h-6" />
              <span>DATA_CLOUD</span>
            </a>

            {/* BUTTON 2: PROJECTS */}
            <a href="#projects" className="group flex items-center gap-4 border-4 border-[#0f0] px-8 py-4 font-bold text-xl hover:bg-[#0f0] hover:text-black transition-all cursor-pointer min-w-[200px]">
              <Diamond className="w-6 h-6" />
              <span>PROJECTS</span>
            </a>

            {/* BUTTON 3: AI CHAT (RED) */}
            <button className="group flex items-center gap-4 bg-[#ff0055] border-4 border-[#ff0055] text-white px-8 py-4 font-bold text-xl hover:bg-[#ff3377] hover:border-[#ff3377] transition-all cursor-pointer min-w-[200px]">
              <MessageSquare className="w-6 h-6 fill-current" />
              <span>AI_CHAT</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
