import fs from 'fs';
import { exit } from 'process';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const OUTPUT_PATH = './public/data/debris.json';

const SYSTEM_PROMPT = `You are NeuralCollector, an AI curator for SHAPENEURAL - an analog cybernetic design system.

Your mission: Find the most compelling intersections of AI with these four domains:
- STR_ART (Strategic Art): AI in visual arts, generative design, creative tools, artistic movements
- CX_UX (Customer/User Experience): AI in UX research, design systems, interaction patterns, accessibility
- SONIC (Sound/Audio): AI in music generation, audio processing, voice synthesis, sound design
- META (Philosophy/Theory): AI ethics, consciousness studies, societal implications, future speculation

STRICT FILTERING RULES:
- REJECT generic tech news ("Company X raises $Y million")
- REJECT product announcements without creative/design relevance
- REJECT repetitive AI chatbot news
- PRIORITIZE novel intersections, experimental projects, thought-provoking perspectives
- FAVOR sources: research papers, design blogs, artist portfolios, experimental projects

OUTPUT FORMAT: Return ONLY a valid JSON array with 15-20 items. Each item must match this exact schema:
{
  "id": "unique_snake_case_id",
  "category": "STR_ART" | "CX_UX" | "SONIC" | "META",
  "headline": "Concise, impactful headline (max 80 chars)",
  "summary": "2-3 sentence summary explaining why this matters for design/creativity",
  "url": "source URL",
  "relevance": 0-100 (how central is AI intersection? 100 = groundbreaking)
}

Return ONLY the JSON array, no markdown, no explanation.`;

const USER_PROMPT = `Scan the last 48 hours for the most compelling AI + Design/Art/Sound/Philosophy news and developments. 

Focus on:
1. New generative art tools or techniques
2. AI-driven UX innovations
3. Music/audio AI breakthroughs
4. Philosophical perspectives on AI creativity

Return 15-20 curated items as a JSON array.`;

async function fetchDebris() {
  console.log('[NeuralCollector] Initializing data fetch...');
  
  if (!PERPLEXITY_API_KEY) {
    console.error('[ERROR] PERPLEXITY_API_KEY not set in environment');
    exit(1);
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: USER_PROMPT }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse and validate JSON
    let debrisData;
    try {
      debrisData = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        debrisData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse API response as JSON');
      }
    }

    // Validate array structure
    if (!Array.isArray(debrisData)) {
      throw new Error('Response is not an array');
    }

    // Validate and sanitize each item
    const validatedData = debrisData.map((item, index) => ({
      id: item.id || `debris_${index}`,
      category: ['STR_ART', 'CX_UX', 'SONIC', 'META'].includes(item.category) 
        ? item.category 
        : 'META',
      headline: String(item.headline || 'Untitled').slice(0, 100),
      summary: String(item.summary || ''),
      url: String(item.url || '#'),
      relevance: Math.min(100, Math.max(0, Number(item.relevance) || 50))
    }));

    // Ensure output directory exists
    const outputDir = './public/data';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validatedData, null, 2));
    console.log(`[SUCCESS] Wrote ${validatedData.length} items to ${OUTPUT_PATH}`);
    
    // Log citations if available
    if (data.citations && data.citations.length > 0) {
      console.log('[SOURCES]', data.citations.slice(0, 5).join('\n'));
    }

  } catch (error) {
    console.error('[ERROR] Fetch failed:', error.message);
    
    // Keep existing data if available
    if (fs.existsSync(OUTPUT_PATH)) {
      console.log('[FALLBACK] Keeping existing debris.json');
    } else {
      console.log('[WARNING] No existing data to fall back to');
    }
    
    exit(1);
  }
}

fetchDebris();
