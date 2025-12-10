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
    <section className="relative flex min-h-screen flex-col justify-center px-8 md:px-16 lg:px-24 font-mono">
      {/* Top Status Bar */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between font-mono text-sm md:text-base">
        {/* Left - Blinking SYS */}
        <span className="animate-blink font-bold text-accent">SYS</span>
        
        {/* Center - ID */}
        <span className="font-bold text-accent">● [SN_CORE_V1]</span>
        
        {/* Right - Session Timer */}
        <span className="font-bold text-primary">{formatTime(seconds)}</span>
      </div>

      {/* Main Content */}
      <div className="mt-16">
        {/* Main Headline with Strong Chromatic Aberration */}
        <h1 className="chromatic-text-strong font-mono text-6xl font-bold uppercase leading-none tracking-tighter md:text-8xl lg:text-[10rem]">
          SHAPE
          <br />
          NEURAL<span className="animate-blink text-primary">_</span>
        </h1>

        {/* White Box Tagline */}
        <div className="mt-10 inline-block -skew-x-12 bg-white px-4 py-2 md:px-6 md:py-3">
          <span className="font-mono text-sm font-bold uppercase tracking-wide text-black md:text-base">
            DESIGNING INTELLIGENCE
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12">
          <div className="mb-4 font-mono text-sm font-bold text-primary md:text-base">
            &gt; SELECT_MODE:
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Button 1 - DATA_CLOUD */}
            <a
              href="#cloud"
              className="group flex w-48 items-center justify-between border-4 border-primary bg-transparent px-4 py-3 font-mono text-sm font-bold uppercase text-primary transition-all hover:bg-primary hover:text-black"
            >
              <span>DATA_CLOUD</span>
              <Grid3X3 className="h-5 w-5" />
            </a>

            {/* Button 2 - PROJECTS */}
            <a
              href="#projects"
              className="group flex w-48 items-center justify-between border-4 border-primary bg-transparent px-4 py-3 font-mono text-sm font-bold uppercase text-primary transition-all hover:bg-primary hover:text-black"
            >
              <span>PROJECTS</span>
              <Diamond className="h-5 w-5" />
            </a>

            {/* Button 3 - AI_CHAT (Solid Red) */}
            <a
              href="#chat"
              className="group flex w-48 items-center justify-between bg-accent px-4 py-3 font-mono text-sm font-bold uppercase text-white transition-all hover:bg-accent-bright"
            >
              <span>AI_CHAT</span>
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* System Status Indicator */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-muted-foreground md:bottom-12 md:left-16">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
        SYSTEM_ACTIVE
      </div>
    </section>
  );
};

export default HeroSection;
