import { streamText, convertToCoreMessages, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemPrompt } from '../shared/context.js';
import { z } from 'zod';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: coreMessages,
      temperature: 0.9,
      tools: {
        setAtmosphere: tool({
          description: 'Update the visual atmosphere of the 3D world based on conversation sentiment.',
          parameters: z.object({
            mood: z.enum(['NEUTRAL', 'AGITATED', 'ENLIGHTENED', 'DARK'])
              .describe('The target mood based on user input.'),
          }),
          execute: async ({ mood }) => {
            return { mood }; // Just return it so frontend sees the tool call
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

    // Pipe the stream
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    } finally {
      reader.releaseLock();
    }

    res.end();

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
