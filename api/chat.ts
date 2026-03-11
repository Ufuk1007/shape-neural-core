import { streamText, convertToModelMessages, tool, jsonSchema, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemPrompt } from '../shared/context.js';
import { checkRateLimit, RATE_LIMITS, getClientIp } from './_rate-limit.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMITS.chat);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  try {
    const { messages }: { messages: UIMessage[] } = req.body;

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid request body:', req.body);
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const systemPrompt = getSystemPrompt();

    // AI SDK 5.0: convertToModelMessages (replaces deprecated convertToCoreMessages)
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: openai('gpt-4.1'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.3,
      maxSteps: 3, // Step 1: tool call, Step 2: text response (extra buffer)
      tools: {
        setAtmosphere: tool({
          description: 'Update the visual atmosphere of the 3D world based on conversation sentiment. Call this tool to set the mood, then ALWAYS continue with your text response in the same turn.',
          inputSchema: jsonSchema({
            type: 'object' as const,
            properties: {
              mood: {
                type: 'string',
                enum: ['NEUTRAL', 'AGITATED', 'ENLIGHTENED', 'DARK'],
              },
            },
            required: ['mood'],
          }),
          execute: async (input: unknown) => {
            const { mood } = input as { mood: string };
            return { success: true, mood };
          },
        }),
      },
    });

    // Stream response with Content-Encoding: none to prevent Vercel proxy compression
    // which can break multi-step streaming
    const response = result.toUIMessageStreamResponse({
      headers: {
        'Content-Encoding': 'none',
      },
    });

    // Copy all headers to Vercel response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    } finally {
      reader.releaseLock();
      res.end();
    }

  } catch (error) {
    console.error('Chat API error:', error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    res.end();
  }
}
