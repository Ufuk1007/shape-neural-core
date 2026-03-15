interface InsightOGMeta {
  title: string;
  description: string;
  type: string;
  lens: string;
  projectTitle: string;
  projectId: string;
  date: string;
}

interface ProjectOGMeta {
  title: string;
  description: string;
  type: string;
  id: string;
  status: string;
}

export type OGMeta = InsightOGMeta | ProjectOGMeta;

export const OG_META: Record<string, OGMeta> = {
  // Projects
  "/project/sapientblock": {
    title: "SAPIENTBLOCK",
    description: "AI-powered blockchain relevance analysis for enterprises. Algorithmic pattern recognition meets use-case matching.",
    type: "website",
    id: "MOD_01",
    status: "LIVE",
  },
  "/project/melodeye": {
    title: "MELODEYE",
    description: "Multi-modal emotion recognition system that reads facial expressions and eye behaviors, generating adaptive music based on true emotional state.",
    type: "website",
    id: "MOD_02",
    status: "BETA",
  },
  "/project/problaim": {
    title: "PROBLAIM",
    description: "AI-orchestrated problem decomposition engine. Transforms cognitive noise into crystallized insight pyramids through multi-model synthesis.",
    type: "website",
    id: "MOD_03",
    status: "BETA",
  },
  "/project/humancrypto": {
    title: "HUMANCRYP.TO",
    description: "Crypto-education platform where cryptocurrencies take human form. Each coin reveals its distinct character through AI-generated personas.",
    type: "website",
    id: "MOD_04",
    status: "ARCHIVED",
  },
  "/project/sapientshift": {
    title: "SAPIENTSHIFT",
    description: "AI-powered potential analysis platform. Analyze your AI potential in 5 minutes — receive tailored use cases and actionable recommendations.",
    type: "website",
    id: "MOD_05",
    status: "BETA",
  },
  "/project/bitcoin-soundscape": {
    title: "BITCOIN_SOUNDSCAPE",
    description: "Real-time market sentiment translated into AI-generated soundscapes. Bitcoin's emotional pulse, rendered as ambient music through neural synthesis.",
    type: "website",
    id: "MOD_06",
    status: "LIVE",
  },
  // Insights
  "/insight/signal-layers": {
    title: "SIGNAL_LAYERS // WHY 5 AND NOT 1",
    description: "Bitcoin doesn't have one mood. It has five simultaneous pulses operating at different time scales.",
    type: "article",
    lens: "THE_STACK",
    projectTitle: "BITCOIN_SOUNDSCAPE",
    projectId: "MOD_06",
    date: "2025-03",
  },
  "/insight/silent-nameerror": {
    title: "THE_SILENT_NAMEERROR // 3 DAYS OF DEAD AUDIO",
    description: "The API returned 200 OK. The logs showed success. But no music was generated — for three days.",
    type: "article",
    lens: "THE_SIGNAL",
    projectTitle: "BITCOIN_SOUNDSCAPE",
    projectId: "MOD_06",
    date: "2025-02",
  },
  "/insight/no-emotion-layer": {
    title: "NO_EMOTION_LAYER // BITCOIN DATA IS DEAF",
    description: "We have 10,000 ways to visualize Bitcoin. Zero ways to hear what it feels like.",
    type: "article",
    lens: "THE_PROBLEM",
    projectTitle: "BITCOIN_SOUNDSCAPE",
    projectId: "MOD_06",
    date: "2025-01",
  },
};

export const FORGE_OG = {
  title: "AUTOFORGE | Content Automation Pipeline Generator",
  description: "Not content. The machine that makes it. Build your own automated content pipeline in minutes — monitors your industry, scores relevance, writes and delivers.",
  type: "website",
};

export const DEFAULT_OG = {
  title: "SHAPENEURAL | Designed Intelligence",
  description: "AI systems that move people, not just data.",
  type: "website",
};
