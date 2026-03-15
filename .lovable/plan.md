

# AUTOFORGE — Architecture Plan

## Overview

AUTOFORGE is a 4-step wizard on a hidden `/forge` route. It needs 4 server-side endpoints. Your existing stack (Vercel Serverless Functions in `api/`) is the right choice — no need to involve Supabase Edge Functions for this.

## 1. Page Setup

- Create `src/pages/ForgePage.tsx` — minimal wrapper that renders `AutoforgeWizard`
- Add route `/forge` in `App.tsx` — no nav links, no sitemap entry
- Add OG rewrite in `vercel.json` for `/forge` (optional, for link previews)
- The component handles its own styling, so the page wrapper is trivial

## 2. API Architecture — Vercel Serverless Functions

All 4 endpoints live in the `api/` directory, following your existing pattern (TypeScript, `@vercel/node`, rate limiting via `_rate-limit.ts`).

```text
api/
├── _rate-limit.ts          (existing)
├── forge-research.ts       ← Call A: RSS feed discovery
├── forge-sample.ts         ← Call B: Sample output generation
├── forge-generate.ts       ← Call C: LLM proxy for user scripts
└── forge-deliver.ts        ← Call D: Email delivery via SMTP
```

### Secrets (Vercel Environment Variables)

| Variable | Purpose |
|----------|---------|
| `MINIMAX_API_KEY` | MiniMax LLM for Calls B, C |
| `OPENAI_API_KEY` | Already exists — used for Call A (web search via GPT-4.1 or Perplexity) |
| `SMTP_PASSWORD` | Namecheap SMTP password for `autoforge@shapeneural.com` |

### Call A — `api/forge-research.ts` (Source Research)

**Web search problem**: MiniMax has no web search. Two practical options:

**Option 1 (Recommended): Use your existing OpenAI key + GPT-4.1**
GPT-4.1 with web search tools can find current RSS feeds. You already have `OPENAI_API_KEY` configured. This is the simplest path — one endpoint, no new dependencies.

**Option 2: Perplexity connector**
Perplexity (`sonar`) has built-in web search and returns citations. Available as a Lovable connector. Better search quality but adds a dependency.

I recommend **Option 1** — you already pay for OpenAI, and GPT-4.1 with a well-crafted prompt produces good RSS feed results. If accuracy isn't sufficient, we can swap to Perplexity later.

- CORS: `shapeneural.com` only
- Rate limit: 5 requests/minute/IP
- Input: `{ industry, keywords }`
- Output: `{ sources: [{name, feed_url, description}] }`

### Call B — `api/forge-sample.ts` (Sample Output)

- Provider: MiniMax (`https://api.minimaxi.chat/v1/chat/completions`, model `MiniMax-Text-01`)
- CORS: `shapeneural.com` only
- Rate limit: 10 requests/minute/IP
- Input: `{ preset, config }` → builds prompt server-side
- Output: `{ content: "..." }`

### Call C — `api/forge-generate.ts` (LLM Proxy for Scripts)

- Provider: MiniMax
- CORS: `*` (called from user machines)
- Rate limit: 5 requests/minute/IP
- Budget tracking: simple in-memory counter + optional Vercel KV for persistence. Log each call's estimated token cost. Return 402 when budget exceeded.
- Input: `{ prompt, email }` — email for logging/attribution
- Output: `{ content: "..." }`

### Call D — `api/forge-deliver.ts` (Email via SMTP)

- SMTP: `mail.privateemail.com:587` with TLS
- Library: `nodemailer` (works in Vercel Serverless Functions — NOT in Edge Runtime, but standard serverless is fine)
- CORS: `*` (called from user machines)
- Rate limit: 3 requests/minute/IP
- Input: `{ content, to, subject, email }` — `email` for auth/matching
- Output: `{ success: true }`

**SMTP in serverless caveat**: Vercel Serverless Functions (Node.js runtime) support `nodemailer` TCP connections fine. The only watch-out is cold start latency (~1-2s on first call). This is not an issue for a cron-triggered script.

## 3. Email Delivery Notes

- Namecheap SMTP with DKIM is solid for transactional email at low volume
- `nodemailer` handles TLS negotiation on port 587 natively
- The SMTP password goes in Vercel env vars as `SMTP_PASSWORD`
- Sender: `autoforge@shapeneural.com`
- At high volume (100+ emails/day), Namecheap may throttle — but for a lead magnet tool this is unlikely to matter

## 4. Budget Tracking (Call C)

Simple approach: add rate limits in `_rate-limit.ts` with a new config for `forge-generate`. For actual dollar-based budget caps, we'd need persistent storage (Vercel KV or a Supabase table). Start with aggressive rate limiting; add KV-based budget tracking if needed.

## 5. Dependencies to Add

- `nodemailer` + `@types/nodemailer` — for SMTP email delivery in Call D

## 6. Implementation Order

1. Create `/forge` route + page wrapper
2. Add `api/forge-sample.ts` (simplest — MiniMax proxy, no search)
3. Add `api/forge-research.ts` (OpenAI with search prompt)
4. Add `api/forge-generate.ts` (MiniMax proxy with rate limiting)
5. Add `api/forge-deliver.ts` (nodemailer + SMTP)
6. Integrate the AutoforgeWizard component (once you provide it)
7. Wire the component's fetch calls to the new endpoints

## Summary

- **Stay on Vercel Serverless Functions** — matches your existing `api/` pattern perfectly
- **MiniMax for text generation** (Calls B + C), **OpenAI for web-search research** (Call A)
- **Nodemailer + Namecheap SMTP** for email (Call D) — no third-party email service
- **3 new env vars**: `MINIMAX_API_KEY`, `SMTP_PASSWORD`, `SMTP_USER` (or hardcode the user as `autoforge@shapeneural.com`)
- **1 new dependency**: `nodemailer`

Once you confirm this architecture and provide the AutoforgeWizard component, I'll build it out.

