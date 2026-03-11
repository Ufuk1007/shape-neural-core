import { streamText, convertToCoreMessages, tool, jsonSchema } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemPrompt } from '../shared/context.js';
import { checkRateLimit, RATE_LIMITS, getClientIp } from './_rate-limit.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMITS.chat);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  try {
    // AI SDK 5.0 sends { messages: [...] } instead of { message, history }
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid request body:', req.body);
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Get the full system prompt with all context
    const systemPrompt = getSystemPrompt();

    // Convert AI SDK 5.0 UIMessages to CoreMessages
    const coreMessages = convertToCoreMessages(messages);

    // Stream the response (AI SDK 5.0)
    const result = streamText({
      model: openai('gpt-4.1'),
      system: systemPrompt,
      messages: coreMessages,
      temperature: 0.3,
      maxSteps: 2, // Allow model to continue after tool call
      tools: {
        setAtmosphere: tool({
          description: 'Update the visual atmosphere of the 3D world based on conversation sentiment. Call this tool to set the mood, then continue with your text response.',
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

    // Use toUIMessageStreamResponse for useChat compatibility
    const response = result.toUIMessageStreamResponse();

    // Copy headers to Vercel response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // CRITICAL: Simplified streaming - let chunks flow naturally
    // This ensures tool continuation events are properly streamed
    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();

    try {
      // Stream chunks as they arrive
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Write immediately without buffering
        res.write(value);
      }
    } finally {
      reader.releaseLock();
      res.end();
    }

  } catch (error) {
    console.error('Chat API error:', error);

    // If headers not sent yet, send JSON error
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // If streaming already started, just end the response
    res.end();
  }
}
