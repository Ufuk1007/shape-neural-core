import type { VercelRequest, VercelResponse } from '@vercel/node';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };

const ALLOWED_ORIGINS = [
  'https://shapeneural.com',
  'https://www.shapeneural.com',
  'https://input-output-loom.lovable.app',
];

function isAllowedOrigin(origin: string | undefined) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    const isHttp = protocol === 'http:' || protocol === 'https:';
    return isHttp && (hostname.endsWith('.lovableproject.com') || hostname.endsWith('.lovable.app'));
  } catch {
    return false;
  }
}

function corsHeaders(origin: string | undefined) {
  const allowed = isAllowedOrigin(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin as string | undefined;
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMIT);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { industry, keywords } = req.body;
    if (!industry) return res.status(400).json({ error: 'industry is required' });

    const prompt = `Find 5-7 real, currently active RSS feed URLs for the "${industry}" industry${keywords ? ` with focus on: ${keywords}` : ''}.

For each feed, provide:
- name: The publication or blog name
- feed_url: The actual RSS/Atom feed URL (must end in /feed, /rss, .xml, or similar)
- description: One sentence describing what it covers

Return ONLY valid JSON: {"sources": [{"name":"...","feed_url":"...","description":"..."}]}

Important: Only include feeds you are confident are real and active. Prefer well-known industry publications, major blogs, and news outlets. Verify the URL format looks correct for an RSS feed.`;

    const result = await generateText({
      model: openai('gpt-4.1'),
      prompt,
      temperature: 0.2,
    });

    // Parse the JSON from the response
    const text = result.text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse research results' });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Forge research error:', error);
    return res.status(500).json({
      error: 'Research failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
