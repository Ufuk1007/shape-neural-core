import { streamText, convertToCoreMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemPrompt } from '../shared/context.js';

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

    // Stream the response
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: coreMessages,
      temperature: 0.9,
      maxTokens: 250,
    });

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    // Stream the text using toAIStream (original working version)
    const stream = result.toAIStream();
    const reader = stream.getReader();

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
