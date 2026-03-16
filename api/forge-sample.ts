import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

export const maxDuration = 60; // Hobby plan max: 60s — MiniMax M2.5 reasoning can be slow

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 10 };
const MINIMAX_URL = 'https://api.minimax.io/v1/chat/completions';
const MINIMAX_MODEL = 'MiniMax-M2.5';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PRESET_PROMPTS: Record<string, (config: Record<string, string>) => string> = {
  'industry-radar': (c) => {
    const sourcesBlock = c.sources
      ? (() => {
          try {
            const parsed = JSON.parse(c.sources);
            if (Array.isArray(parsed) && parsed.length > 0) {
              return `\nYou are drawing from these real industry sources:\n${parsed.map((s: any) => `- ${s.name}: ${s.description || ''}`).join('\n')}\n`;
            }
          } catch { /* ignore */ }
          return '';
        })()
      : '';

    return `You are writing an industry intelligence briefing for a senior professional in ${c.industry || 'technology'} who reads this in 90 seconds between meetings.
${sourcesBlock}
Focus: ${c.focus || 'key trends and developments'}
Voice: ${c.voice || 'professional and analytical'}

Deliver exactly this structure — nothing else:

**[HEADLINE]** — one punchy line, max 12 words

**SIGNAL 1:** What is happening and why it matters — 2-3 sharp sentences
**SIGNAL 2:** What is happening and why it matters — 2-3 sharp sentences
**SIGNAL 3:** What is happening and why it matters — 2-3 sharp sentences

**INSIGHT:** One contrarian or non-obvious observation that reframes the above signals — 2 sentences max

**DEEP DIVE:** Pick the most important signal and go deeper. 6-8 sentences: explain the structural reason behind it, what most people are missing, and what it means over the next 12 months. This is where the real value is — not just what, but why and what next.

**TO ACTION:**
• [specific action] — one sentence, immediately executable
• [specific action] — one sentence, immediately executable

**LINKEDIN POST:**
One draft only. Hook + core insight + CTA. 100-120 words. Match the voice setting. Ready to post as-is.

Rules:
- Write entirely in English
- Total output: 380-480 words
- No filler phrases ("it's important to note", "in today's landscape", "as we navigate")
- No hedging ("might", "could potentially", "it seems")
- No meta-commentary about the briefing itself
- Deliver only the final output`;
  },

  'kpi-storyteller': (c) => `You are a data storytelling expert. Write a 250-350 word narrative report analyzing hypothetical KPI data for a ${c.industry || 'SaaS'} company. Audience: ${c.audience || 'leadership team'}. Voice: ${c.voice || 'clear and insight-driven'}. Include: an executive summary, 2-3 trend observations with context, and recommended actions. Use specific (fictional but realistic) numbers. Deliver only the final output, no meta-commentary.`,

  'content-recycler': (c) => `You are a content strategist. Take this core topic: "${c.topic || 'AI automation in business'}" and create a 250-350 word LinkedIn post. Audience: ${c.audience || 'B2B professionals'}. Voice: ${c.voice || 'thought-provoking and conversational'}. Include a hook, 3-4 key insights, and a call to engagement. Format with line breaks for readability. Deliver only the final output, no meta-commentary.`,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMIT);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { preset, config } = req.body;
    if (!preset || !config) return res.status(400).json({ error: 'preset and config are required' });

    const promptBuilder = PRESET_PROMPTS[preset];
    if (!promptBuilder) return res.status(400).json({ error: `Unknown preset: ${preset}` });

    const response = await fetch(MINIMAX_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MINIMAX_MODEL,
        messages: [
          { role: 'system', content: 'You are a professional content creator. Produce polished, ready-to-use output.' },
          { role: 'user', content: promptBuilder(config) },
        ],
        temperature: 0.7,
        max_tokens: 1500, // increased from 1000 — DEEP DIVE section needs ~700 tokens
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('MiniMax error:', response.status, errBody);
      return res.status(502).json({ error: 'LLM provider error' });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    // Strip MiniMax internal reasoning tags before returning
    const content = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    return res.status(200).json({ content });
  } catch (error) {
    console.error('Forge sample error:', error);
    return res.status(500).json({
      error: 'Sample generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
