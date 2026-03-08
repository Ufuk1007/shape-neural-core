

# SHAPENEURAL // OG Meta Tags — Implementation Plan

## Approach

Vercel Edge Function at `api/og.ts` handles all `/project/*` and `/insight/*` requests. Detects crawlers by User-Agent — returns minimal OG HTML for bots, returns the SPA shell for normal visitors. A post-build script extracts the built `index.html` into an importable constant so the edge function serves the exact production SPA shell.

## Architecture

```text
/project/:slug or /insight/:slug
    → vercel.json rewrite → api/og.ts (Edge Function)
        → Crawler? → Return minimal HTML with OG meta tags
        → Normal?  → Return production SPA shell (React Router handles route)
```

## File Changes

| Action | File | Purpose |
|--------|------|---------|
| Create | `shared/og-metadata.ts` | Path → {title, description, type} map for all 6 projects + 3 insights |
| Create | `api/og.ts` | Edge Function: crawler detection, OG HTML or SPA shell |
| Create | `scripts/generate-spa-shell.js` | Post-build: reads `dist/index.html`, writes `api/_spa-shell.ts` |
| Create | `api/_spa-shell.ts` | Auto-generated placeholder (real content created at build time) |
| Modify | `vercel.json` | Add rewrites for `/project/:slug` and `/insight/:slug` |
| Modify | `package.json` | Update build script to run shell generation |
| Modify | `.gitignore` | Add `api/_spa-shell.ts` |

## Key Details

**`shared/og-metadata.ts`** — flat record keyed by path, derived from `src/data/projects.ts` content:
```typescript
export const OG_META: Record<string, { title: string; description: string; type: string }> = {
  "/project/sapientblock": { title: "SAPIENTBLOCK // SHAPENEURAL", description: "AI-powered blockchain...", type: "website" },
  "/insight/signal-layers": { title: "SIGNAL_LAYERS // WHY 5 AND NOT 1", description: "Bitcoin doesn't have one mood...", type: "article" },
  // all 6 projects + 3 insights
};
```

**`api/og.ts`** — Edge runtime, ~60 lines:
- `export const config = { runtime: 'edge' }`
- Crawler list: linkedinbot, twitterbot, facebookexternalhit, slackbot, telegrambot, whatsapp, discordbot
- Crawler path: return `<!DOCTYPE html>` with og:title, og:description, og:image (`/og-image-social.png`), og:url, og:type, twitter:card tags
- Normal path: return imported `SPA_SHELL` with `Content-Type: text/html`
- Unknown paths get default SHAPENEURAL metadata

**`vercel.json`** rewrites (order matters):
```json
{ "source": "/api/(.*)", "destination": "/api/$1" },
{ "source": "/project/:slug", "destination": "/api/og?path=/project/:slug" },
{ "source": "/insight/:slug", "destination": "/api/og?path=/insight/:slug" },
{ "source": "/(.*)", "destination": "/index.html" }
```

**Build script** — `package.json` build becomes:
```
"build": "vite build && node scripts/generate-spa-shell.js"
```

The generate script reads `dist/index.html` and writes `api/_spa-shell.ts` as `export const SPA_SHELL = "<html>..."`. For local dev / initial commit, `api/_spa-shell.ts` ships with a minimal fallback HTML that redirects to `/`.

**Note:** `api/og.ts` uses Vercel Edge Runtime syntax (`export default function(req: Request)`) not the Node.js `VercelRequest/VercelResponse` pattern used by `api/chat.ts`. Both patterns coexist in the `api/` folder — Vercel handles this based on the `config.runtime` export.

