import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };
const MINIMAX_URL = 'https://api.minimaxi.chat/v1/chat/completions';
const MINIMAX_MODEL = 'MiniMax-Text-01';

// Simple in-memory budget tracker (resets on cold start)
let totalTokensUsed = 0;
const MAX_TOKENS_BUDGET = 5_000_000; // ~$6 worth at MiniMax rates

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS: allow from anywhere (called from user scripts)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMIT);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  if (totalTokensUsed > MAX_TOKENS_BUDGET) {
    return res.status(402).json({ error: 'Service budget exceeded. Contact admin.' });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { prompt, email } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });
    if (!email) return res.status(400).json({ error: 'email is required' });

    console.log(`[forge-generate] Request from ${email} (${clientIp})`);

    const response = await fetch(MINIMAX_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MINIMAX_MODEL,
        messages: [
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('MiniMax error:', response.status, errBody);
      return res.status(502).json({ error: 'LLM provider error' });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Track token usage
    const usage = data.usage;
    if (usage) {
      totalTokensUsed += (usage.total_tokens || 0);
      console.log(`[forge-generate] Tokens used: ${usage.total_tokens}, total: ${totalTokensUsed}`);
    }

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Forge generate error:', error);
    return res.status(500).json({
      error: 'Generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
