import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 10 };
const MINIMAX_URL = 'https://api.minimax.io/v1/chat/completions';
const MINIMAX_MODEL = 'MiniMax-M2.5';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PRESET_PROMPTS: Record<string, (config: Record<string, string>) => string> = {
  'industry-radar': (c) => `You are a senior industry analyst. Write a 250-350 word intelligence briefing for the ${c.industry || 'technology'} industry, targeted at ${c.audience || 'decision-makers'}. Voice: ${c.voice || 'professional and analytical'}. Include: a headline, 2-3 key developments with analysis, and a "So What?" section with actionable takeaways. Format as a polished email newsletter.`,

  'kpi-storyteller': (c) => `You are a data storytelling expert. Write a 250-350 word narrative report analyzing hypothetical KPI data for a ${c.industry || 'SaaS'} company. Audience: ${c.audience || 'leadership team'}. Voice: ${c.voice || 'clear and insight-driven'}. Include: an executive summary, 2-3 trend observations with context, and recommended actions. Use specific (fictional but realistic) numbers.`,

  'content-recycler': (c) => `You are a content strategist. Take this core topic: "${c.topic || 'AI automation in business'}" and create a 250-350 word LinkedIn post. Audience: ${c.audience || 'B2B professionals'}. Voice: ${c.voice || 'thought-provoking and conversational'}. Include a hook, 3-4 key insights, and a call to engagement. Format with line breaks for readability.`,
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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('MiniMax error:', response.status, errBody);
      return res.status(502).json({ error: 'LLM provider error' });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ content });
  } catch (error) {
    console.error('Forge sample error:', error);
    return res.status(500).json({
      error: 'Sample generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
