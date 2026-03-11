import { streamText, convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, tool, jsonSchema, UIMessage } from 'ai';
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
    const modelMessages = await convertToModelMessages(messages);

    const setAtmosphereTool = tool({
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
    });

    // Multi-step UI-Message-Stream pattern:
    // Step 1: streamText WITH tools (setAtmosphere may fire)
    // Step 2: streamText WITHOUT tools (forces text generation after tool result)
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        // Step 1: Tool step
        const result1 = streamText({
          model: openai('gpt-4.1'),
          system: systemPrompt,
          messages: modelMessages,
          temperature: 0.3,
          tools: { setAtmosphere: setAtmosphereTool },
        });

        // Merge tool-call parts into the stream, but don't finish the message
        await writer.merge(result1.toUIMessageStream({ sendFinish: false }));

        // Step 2: Text-only step — model sees tool result and generates text
        const result2 = streamText({
          model: openai('gpt-4.1'),
          system: systemPrompt,
          messages: [...modelMessages, ...(await result1.response).messages],
          temperature: 0.3,
          // No tools — forces text generation
        });

        // Continue the same assistant message with the text response
        await writer.merge(result2.toUIMessageStream({ sendStart: false }));
      },
    });

    // Create the Response object
    const response = createUIMessageStreamResponse({
      stream,
      headers: { 'Content-Encoding': 'none' },
    });

    // Bridge: Vercel serverless uses (req, res) — pipe the Web Response to Node res
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.status(response.status);

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
