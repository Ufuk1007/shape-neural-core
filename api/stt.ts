import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, RATE_LIMITS, getClientIp } from './_rate-limit.js';

export const config = {
  api: {
    bodyParser: false, // We need raw body for file upload
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMITS.stt);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Read raw body as buffer
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const body = Buffer.concat(chunks);

    // Limit file size (max 25MB — OpenAI Whisper limit)
    if (body.length > 25 * 1024 * 1024) {
      return res.status(413).json({ error: 'File too large. Max 25MB.' });
    }

    if (body.length === 0) {
      return res.status(400).json({ error: 'No audio data received' });
    }

    // Forward to OpenAI Whisper API as multipart/form-data
    const formData = new FormData();
    const audioBlob = new Blob([body], { type: 'audio/webm' });
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI Whisper error:', response.status, errorText);
      return res.status(502).json({ error: 'Transcription failed' });
    }

    const result = await response.json();
    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error('STT API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
