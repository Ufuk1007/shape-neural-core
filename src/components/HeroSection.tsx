import { useState, useEffect } from "react";
import { Grid3X3, Diamond, MessageSquare } from "lucide-react";

const HeroSection = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="split-h">
      {/* Top Status Bar */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-sm">
        <span className="tag-h animate-blink">SYS</span>
        <span className="tag-h">● [SN_CORE_V1]</span>
        <span className="text-[#0f0] font-bold font-mono">{formatTime(seconds)}</span>
      </div>

      {/* Tag */}
      <div className="tag-h">
        REC ● [SN_CORE_V1]
      </div>

      {/* Main Headline */}
      <h1 className="headline-h">
        SHAPE
        <br />
        NEURAL<span className="animate-blink">_</span>
      </h1>

      {/* White Subline Box */}
      <div className="sub-h">
        DESIGNING INTELLIGENCE
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10">
        <div className="mb-4 text-[#0f0] font-mono font-bold text-sm">
          &gt; SELECT_MODE:
        </div>
        
        <div className="flex flex-wrap gap-4">
          {/* Button 1 - DATA_CLOUD */}
          <a
            href="#cloud"
            className="nav-btn-green"
          >
            <span>DATA_CLOUD</span>
            <Grid3X3 className="h-5 w-5" />
          </a>

          {/* Button 2 - PROJECTS */}
          <a
            href="#projects"
            className="nav-btn-green"
          >
            <span>PROJECTS</span>
            <Diamond className="h-5 w-5" />
          </a>

          {/* Button 3 - AI_CHAT (Solid Red) */}
          <a
            href="#chat"
            className="nav-btn-red"
          >
            <span>AI_CHAT</span>
            <MessageSquare className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
