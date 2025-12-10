import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-start justify-center px-8 md:px-16 lg:px-24">
      {/* System Tag */}
      <div className="mb-6 font-mono text-sm font-bold uppercase tracking-wider text-accent tag-glow md:text-base">
        SYS ● [SN_CORE_V1]
      </div>

      {/* Main Headline with Chromatic Aberration */}
      <h1 className="chromatic-text font-mono text-5xl font-bold uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">
        SHAPE
        <br />
        NEURAL
        <span className="animate-blink text-primary">_</span>
      </h1>

      {/* Subline with Skew Effect */}
      <div className="mt-8 inline-block -skew-x-6 bg-foreground px-4 py-2 font-sans text-sm font-bold uppercase tracking-wide text-background md:text-base">
        RAW INPUT // HIGH OUTPUT
      </div>

      {/* Terminal Button */}
      <Button
        variant="terminal"
        size="lg"
        className="mt-12"
      >
        [ INITIALIZE_STREAM ]
      </Button>

      {/* System Status Indicator */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-muted-foreground md:bottom-12 md:left-16">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
        SYSTEM_ACTIVE
      </div>
    </section>
  );
};

export default HeroSection;
