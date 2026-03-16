import type { VercelRequest, VercelResponse } from '@vercel/node';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { industry, keywords } = req.body;
    if (!industry) return res.status(400).json({ error: 'industry is required' });

    // Ask GPT-4.1 for more candidates than needed so we have room to drop dead feeds
    const prompt = `Find 10 real, currently active RSS feed URLs for the "${industry}" industry${keywords ? ` with focus on: ${keywords}` : ''}.

For each feed, provide:
- name: The publication or blog name
- feed_url: The actual RSS/Atom feed URL (must end in /feed, /rss, .xml, or similar)
- description: One sentence describing what it covers

Return ONLY valid JSON: {"sources": [{"name":"...","feed_url":"...","description":"..."}]}

Important: Only include feeds you are highly confident are real and active. Prefer well-known industry publications, major blogs, and authoritative news outlets. Avoid niche or obscure sources that may have inactive feeds.`;

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
    const candidates: Array<{ name: string; feed_url: string; description: string }> = parsed.sources || [];

    // Validate feeds: fetch each URL and keep only those that return actual entries
    const validated: typeof candidates = [];
    await Promise.allSettled(
      candidates.map(async (src) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);
          const resp = await fetch(src.feed_url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AutoForge/1.0; +https://shapeneural.com)' },
          });
          clearTimeout(timeout);
          if (!resp.ok) return;
          const body = await resp.text();
          // Must look like an RSS/Atom feed with at least one item/entry
          if ((body.includes('<item') || body.includes('<entry')) && body.includes('<title')) {
            validated.push(src);
          }
        } catch {
          // timeout or network error — skip this feed
        }
      })
    );

    // Keep up to 7 validated feeds; if somehow all fail, fall back to raw GPT list (best effort)
    const sources = validated.length >= 3 ? validated.slice(0, 7) : candidates.slice(0, 7);

    console.log(`[forge-research] ${industry}: ${candidates.length} candidates → ${validated.length} validated → ${sources.length} returned`);

    return res.status(200).json({ sources });
  } catch (error) {
    console.error('Forge research error:', error);
    return res.status(500).json({
      error: 'Research failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
