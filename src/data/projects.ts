import sapientBlockAsset from "@/assets/sapient-block-screenshot.png.asset.json";
import melodeyeAsset from "@/assets/melodeye-screenshot.png.asset.json";
import problaimImg from "@/assets/problaim-screenshot.png";
import humancryptoImg from "@/assets/humancrypto-screenshot.png";
import sapientshiftImg from "@/assets/sapientshift-screenshot.png";
import btcRadioImg from "@/assets/btc-radio-screenshot.png";

export interface Insight {
  id: string;
  lens: string;
  headline: string;
  teaser: string;
  content: string;
  tags: string[];
  date: string;
  linkedInUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  status: "LIVE" | "BETA" | "ARCHIVED";
  collaboration: string;
  collaborationUrl?: string;
  brief: string;
  techStack: string[];
  signalTags: string[];
  year: number;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
  url?: string;
  insights: Insight[];
}

export const PROJECTS: Project[] = [
  {
    id: "MOD_01",
    slug: "sapientblock",
    title: "SAPIENTBLOCK",
    collaboration: "BLOCKCHAIN REALLABOR",
    collaborationUrl: "https://blockchain-reallabor.de/showroom-bcrl/use-case-bot/",
    year: 2024,
    status: "LIVE",
    category: "BLOCKCHAIN",
    tags: ["BLOCKCHAIN", "AI", "ANALYTICS"],
    brief: "AI-powered blockchain relevance analysis for the German Mittelstand. The platform ingests a company's profile — via URL crawl or manual input — matches it against 250+ validated use cases across 74 industries, and delivers a data-driven relevance score with concrete recommendations. Built in collaboration with Blockchain Reallabor (Fraunhofer FIT).",
    signalTags: ["250+ VALIDATED USE CASES", "74 INDUSTRY VERTICALS", "RAG-POWERED MATCHING", "REGIONAL INTELLIGENCE", "SELF-REINFORCING DATA FLYWHEEL", "BLOCKCHAIN REALLABOR COLLABORATION"],
    techStack: ["React", "TypeScript", "Supabase", "OpenAI GPT-4", "Perplexity", "Pinecone", "RAG", "Tailwind CSS"],
    image: sapientBlockAsset.url,
    video: "/videos/sapientblock.mp4",
    url: "https://sapientblock.com",
    insights: [],
  },
  {
    id: "MOD_02",
    slug: "melodeye",
    title: "MELODEYE",
    collaboration: "INDEPENDENT",
    year: 2024,
    status: "BETA",
    category: "BIOMETRIC_AI",
    tags: ["BIOMETRIC_AI", "EMOTION_RECOGNITION", "MUSIC_GENERATION"],
    brief: "A multi-modal emotion recognition system that distinguishes between displayed and experienced emotion — then generates music that responds to what you actually feel, not what you show. The system fuses facial expression analysis, gaze tracking, and pupil dynamics in real-time, entirely within the browser. No server ever sees your biometric data.",
    signalTags: ["DISPLAYED vs. EXPERIENCED EMOTION", "EMER THEORY", "GAP-AWARE INTELLIGENCE", "SAFETY OVERRIDE LOGIC", "100% BROWSER-BASED BIOMETRICS", "THERAPEUTIC MUSIC GENERATION"],
    techStack: ["React", "TypeScript", "MediaPipe", "WebEyeTrack", "LibreFace ONNX", "Tone.js", "Mureka API", "Supabase"],
    image: melodeyeAsset.url,
    video: "/videos/melodeye.mp4",
    // url removed — site under construction
    insights: [],
  },
  {
    id: "MOD_03",
    slug: "problaim",
    title: "PROBLAIM",
    collaboration: "INDEPENDENT",
    year: 2025,
    status: "BETA",
    category: "AI_ANALYSIS",
    tags: ["AI_ANALYSIS", "DECISION_INTELLIGENCE", "SAAS"],
    brief: "An AI-orchestrated problem decomposition engine that treats complex problems like an experienced consultant would — systematically breaking them down, illuminating them from multiple perspectives, enriching them with external research, and deepening the analysis iteratively over days and weeks. The system runs a multi-LLM pipeline autonomously. You bring the problem. It builds the clarity.",
    signalTags: ["MULTI-LLM ORCHESTRATION", "INSIGHT PYRAMID", "12 ARCHETYPE PERSPECTIVES", "AUTONOMOUS DAILY ANALYSIS", "4-PHASE PIPELINE", "PROBLEM-SOLUTION CO-EVOLUTION"],
    techStack: ["React", "TypeScript", "Supabase", "Claude", "GPT-4", "Gemini", "Perplexity", "Stripe", "XYFlow"],
    image: problaimImg,
    video: "/videos/problaim.mp4",
    url: "https://problaim.com",
    insights: [],
  },
  {
    id: "MOD_04",
    slug: "humancrypto",
    title: "HUMANCRYP.TO",
    collaboration: "INDEPENDENT",
    year: 2023,
    status: "ARCHIVED",
    category: "CRYPTO_EDUCATION",
    tags: ["CRYPTO_EDUCATION", "STORYTELLING", "AI_PERSONAS"],
    brief: "A crypto-education platform where digital currencies take human form. Each cryptocurrency is mapped to one of Jung's 12 archetypes, given a personality shaped by the Plutchik emotion model, and brought to life through AI-generated narratives, voice, and video. The result: complex blockchain concepts become memorable characters you can actually relate to.",
    signalTags: ["JUNGIAN ARCHETYPES", "PLUTCHIK EMOTION MODEL", "AI AVATAR PIPELINE", "AUTOMATED VIDEO PRODUCTION", "CRYPTO AS CHARACTER", "STORY-DRIVEN EDUCATION"],
    techStack: ["Python", "OpenAI", "ElevenLabs", "D-ID Avatars", "DALL-E", "CoinGecko API", "MoviePy"],
    image: humancryptoImg,
    video: "/videos/humancrypto.mp4",
    url: "https://humancryp.to",
    insights: [],
  },
  {
    id: "MOD_05",
    slug: "sapientshift",
    title: "SAPIENTSHIFT",
    collaboration: "INDEPENDENT",
    year: 2025,
    status: "BETA",
    category: "AI_PLATFORM",
    tags: ["AI_PLATFORM", "POTENTIAL_ANALYSIS", "STRATEGY"],
    brief: "An AI-powered potential analysis platform that translates the abstract promise of artificial intelligence into personalized, actionable insight — for companies, employees, and individuals. Three distinct analysis pipelines, one shared knowledge base of 318 curated AI use cases, and an autonomous Creative Guild of 10 AI agents that generate tailored articles and visuals based on your specific context.",
    signalTags: ["3 ANALYSIS PIPELINES (B2B / EMPLOYEE / B2C)", "318 CURATED AI USE CASES", "CREATIVE GUILD: 10 AI AGENTS", "PERSONALIZED MAGAZINE", "5-FACTOR READINESS SCORE", "FROM INSIGHT TO ACTION"],
    techStack: ["React", "TypeScript", "Supabase", "OpenAI GPT-4o", "Perplexity Sonar", "DeepSeek", "DALL-E 3", "Tailwind CSS"],
    image: sapientshiftImg,
    video: "/videos/sapientshift.mp4",
    url: "https://sapientshift.com",
    insights: [],
  },
  {
    id: "MOD_07",
    slug: "autoforge",
    title: "AUTOFORGE",
    collaboration: "INDEPENDENT",
    year: 2025,
    status: "LIVE" as const,
    category: "AUTOMATION",
    tags: ["AUTOMATION", "AI", "CONTENT_PIPELINE"],
    brief: "A machine that builds your automation machine. Answer 3 questions about your industry, audience, and voice — AUTOFORGE generates a tailored content automation pipeline. Local execution, no platform dependency, no subscription. Copy. Paste. Done.",
    signalTags: ["PIPELINE GENERATOR", "LOCAL EXECUTION", "ZERO VENDOR LOCK-IN", "3-QUESTION ONBOARDING", "MULTI-LLM ORCHESTRATION", "COPY.PASTE.DONE"],
    techStack: ["React", "TypeScript", "Python", "OpenAI GPT-4", "Perplexity", "FastAPI", "Vercel Serverless"],
    video: "/videos/autoforge.mp4",
    url: "/forge",
    insights: [],
  },
  {
    id: "MOD_06",
    slug: "bitcoin-soundscape",
    title: "BITCOIN_SOUNDSCAPE",
    collaboration: "INDEPENDENT",
    year: 2025,
    status: "LIVE",
    category: "GENERATIVE_AI",
    tags: ["GENERATIVE_AI", "FINTECH", "AUDIO"],
    brief: "Real-time Bitcoin market data translated into a continuous AI-generated soundscape. The system decomposes market signals across five temporal layers — from monthly macro trends to individual whale transactions — and maps each layer to a distinct musical dimension. The output is a 24/7 livestream where the music genuinely reflects market state: not a gimmick, but an information-dense audio layer that evolves with every trade.",
    signalTags: ["5 TEMPORAL LAYERS", "MONTHLY→BASS / WEEKLY→BEAT / DAILY→HARMONY / HOURLY→MELODY / REALTIME→TEXTURE", "24/7 GENERATIVE LIVESTREAM", "DUAL AI PROVIDER", "SMART TRACK REUSE", "MARKET SONIFICATION"],
    techStack: ["Python", "FastAPI", "ACE-Step 1.5", "MiniMax M2.5", "React", "Supabase", "OBS Studio", "Cloudflare Tunnel"],
    image: btcRadioImg,
    url: "https://radio.shapeneural.com/",
    insights: [
      {
        id: "signal-layers",
        lens: "THE_STACK",
        headline: "SIGNAL_LAYERS // WHY 5 AND NOT 1",
        teaser: "Bitcoin doesn't have one mood. It has five simultaneous pulses operating at different time scales.",
        content: `Bitcoin doesn't have one mood. It has five simultaneous pulses operating at different time scales — and collapsing them into a single signal destroys the information that makes the music interesting.

The system decomposes market data into 5 temporal layers:

**LAYER 1 — MONTHLY TREND → BASS FREQUENCY**
The macro direction. Bull or bear. This becomes the foundational drone — deep, slow, persistent. When the monthly trend shifts, the entire harmonic foundation changes.

**LAYER 2 — WEEKLY MOMENTUM → BEAT PATTERN**
The rhythm of capital flow. Weekly momentum drives the percussion layer — faster accumulation phases produce driving beats, distribution phases create sparse, irregular patterns.

**LAYER 3 — DAILY VOLATILITY → HARMONIC TEXTURE**
Day-to-day price action generates the harmonic content. High volatility days produce rich, complex chord structures. Quiet days yield minimal, ambient pads.

**LAYER 4 — HOURLY SENTIMENT → MELODIC FRAGMENTS**
Social sentiment analysis at the hourly level creates melodic motifs. Euphoria generates ascending patterns. Fear produces descending, minor-key phrases.

**LAYER 5 — REAL-TIME TRADES → PERCUSSIVE DETAIL**
Individual large transactions become percussive events — clicks, pops, transients. Whale movements create distinct sonic signatures.

Each layer operates independently but is mixed in real-time. The result is music that genuinely reflects market state — not a gimmick, but an information-dense audio representation that traders can actually parse by ear.`,
        tags: ["ARCHITECTURE", "SIGNAL_PROCESSING", "AUDIO_DESIGN"],
        date: "2025-03-01",
      },
      {
        id: "silent-nameerror",
        lens: "THE_SIGNAL",
        headline: "THE_SILENT_NAMEERROR // 3 DAYS OF DEAD AUDIO",
        teaser: "The API returned 200 OK. The logs showed success. But no music was generated — for three days.",
        content: `The API returned 200 OK. The logs showed success. The frontend displayed "Generation complete." But no audio file existed. For three days.

The bug was a Python NameError in the audio generation pipeline — a variable renamed in a refactor that was only used in one specific branch of the conditional logic. The branch that handled the most common case: a neutral market with low volatility.

During testing, I'd been running it against historical data from a volatile week. Every test passed because the volatile-market branch used the old variable name correctly. The neutral-market branch — the one that would handle 70% of real-world requests — referenced a variable that no longer existed.

Python didn't raise the error at import time. The function was defined correctly. The error only triggered at runtime, inside a try/except block that caught Exception broadly and logged "Processing complete" regardless.

**The fix was three characters.** Renaming one variable reference. But finding it required:
1. Removing every broad except clause
2. Adding typed exception handling
3. Running the pipeline against 30 days of mixed-volatility data
4. Watching it fail on day 4 — the first calm day in the dataset

**The lesson:** Never trust a 200 OK. Never catch Exception without re-raising. And always test with boring data — the edge case is usually the common case.`,
        tags: ["DEBUGGING", "PYTHON", "API_DESIGN"],
        date: "2025-02-15",
      },
      {
        id: "no-emotion-layer",
        lens: "THE_PROBLEM",
        headline: "NO_EMOTION_LAYER // BITCOIN DATA IS DEAF",
        teaser: "We have 10,000 ways to visualize Bitcoin. Zero ways to hear what it feels like.",
        content: `Every Bitcoin dashboard shows the same thing: candlesticks, volume bars, moving averages, RSI oscillators. The data is rich. The representation is monotone.

Traders stare at charts for hours. They develop intuition — a "feel" for market state that goes beyond any single indicator. But that feel is built through visual pattern matching, which is cognitively expensive and limited to one information channel.

**Sound is the missing modality.**

Humans process audio with different cognitive pathways than visual data. We can detect patterns in sound that we'd miss in charts — subtle rhythmic changes, harmonic shifts, tonal movements. A trader who can *hear* market sentiment while looking at charts gains a second information channel without additional cognitive load.

But existing "sonification" projects treat it as a novelty: map price to pitch, volume to loudness. The result sounds like a theremin having a seizure. No one listens twice.

The problem isn't sonification. The problem is that no one has treated it as a *music* problem. Market data needs to become something you'd actually want to listen to — ambient, evolving, information-dense but aesthetically coherent.

That's the gap: between data sonification (technically correct, musically unbearable) and AI music generation (musically interesting, informationally empty). Bitcoin Soundscape sits in that gap.`,
        tags: ["MARKET_ANALYSIS", "SONIFICATION", "UX_PHILOSOPHY"],
        date: "2025-01-20",
      },
    ],
  },
];

/** Find a project by its slug */
export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Find an insight by its globally unique ID, returns both insight and parent project */
export function findInsightById(
  insightId: string
): { project: Project; insight: Insight } | undefined {
  for (const project of PROJECTS) {
    const insight = project.insights.find((i) => i.id === insightId);
    if (insight) return { project, insight };
  }
  return undefined;
}
