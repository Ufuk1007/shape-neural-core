import sapientBlockImg from "@/assets/sapient-block-screenshot.png";
import melodeyeImg from "@/assets/melodeye-screenshot.png";
import problaimImg from "@/assets/problaim-screenshot.png";
import humancryptoImg from "@/assets/humancrypto-screenshot.png";
import sapientshiftImg from "@/assets/sapientshift-screenshot.png";

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
  year: number;
  category: string;
  tags: string[];
  image?: string;
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
    brief: "AI-powered blockchain relevance analysis for enterprises. Algorithmic pattern recognition meets use-case matching – digital archaeology for decentralized potential.",
    techStack: ["React", "TypeScript", "Supabase", "OpenAI", "Tailwind CSS"],
    image: sapientBlockImg,
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
    brief: "Multi-modal emotion recognition system that reads facial expressions and eye behaviors separately, generating adaptive music based on true emotional state rather than displayed affect.",
    techStack: ["React", "TypeScript", "Supabase", "MediaPipe", "Mureka_API"],
    image: melodeyeImg,
    url: "https://melodeye.com",
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
    brief: "AI-orchestrated problem decomposition engine. Transforms cognitive noise into crystallized insight pyramids through multi-model synthesis.",
    techStack: ["React", "TypeScript", "Supabase", "OpenAI", "Perplexity", "Stripe"],
    image: problaimImg,
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
    brief: "Crypto-education platform where cryptocurrencies take human form. Each coin reveals its distinct character through AI-generated personas, transforming complex blockchain concepts into memorable learning journeys.",
    techStack: ["Wix", "AI Image Generation", "Video Production", "Storytelling"],
    image: humancryptoImg,
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
    brief: "AI-powered potential analysis platform. Analyze your AI potential in 5 minutes – receive tailored use cases, actionable recommendations, and a personal command center for sustainable transformation. From insight to implementation.",
    techStack: ["React", "TypeScript", "Supabase Edge Functions", "OpenAI", "Perplexity", "DeepSeek", "Tailwind CSS"],
    image: sapientshiftImg,
    url: "https://sapientshift.com",
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
    brief: "Real-time market sentiment translated into AI-generated soundscapes. Bitcoin's emotional pulse, rendered as ambient music through neural synthesis.",
    techStack: ["React", "Supabase Edge Functions", "Suno API", "Framer Motion"],
    url: "https://www.youtube.com/@BitcoinVibesFM",
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
