

# SHAPENEURAL // INSIGHT_SYSTEM — Implementation Plan

## Overview
Implement the Insight System as described in Concept V1: extract project data, create 3 route layers (`/`, `/project/:slug`, `/insight/:slug`), build reusable components, all within the Analog Cybernetic design system. No 3D on subpages.

## Phase 1: Data Layer

**Create `src/data/projects.ts`**
- Define `Insight` and `Project` interfaces exactly as specified in the concept
- Move all 6 project definitions from `ProjectRack.tsx` into this file
- Add `slug` field to each project
- Add empty `insights[]` arrays (content added later)
- Add 2-3 sample insights to BITCOIN_SOUNDSCAPE for testing

**Update `ProjectRack.tsx`**
- Import `PROJECTS` from `data/projects.ts` instead of local array
- Remove local project definitions
- Add a "DEEP_DIVE →" button in expanded state linking to `/project/:slug`

## Phase 2: Shell & Components

**Create `src/components/SubpageShell.tsx`**
- Sticky top bar: `[< MAINFRAME]` (links to `/`) + optional `[← PROJECT]` link + `[SN//LAB]` branding
- CSS scanline overlay (lightweight, no postprocessing)
- Bottom footer with `BACK_TO_MAINFRAME` + module count
- Monospace, terminal green, dark background — consistent with design system

**Create `src/components/InsightCard.tsx`**
- Props: `insight`, `expanded` (boolean), `onToggle`, `projectSlug`
- Collapsed: lens tag + headline + date, `[+]` icon
- Expanded: full content, tags, `[→ LINKEDIN]` link (if `linkedInUrl` exists), `[→ STANDALONE]` link to `/insight/:id`
- Framer Motion `AnimatePresence` for expand/collapse (same pattern as ProjectRack)

## Phase 3: Pages & Routes

**Create `src/pages/ProjectPage.tsx`**
- `useParams()` to get slug, find project in `PROJECTS`
- Project header: status LED, module ID, title, collaboration, brief, tech stack
- Generic header visualization (simple CSS scanline/pulse — not per-project custom viz yet)
- Insight feed: map `project.insights` → `InsightCard` components
- Hash-based auto-expand: `useLocation().hash` → set matching insight as initially expanded → `scrollIntoView()`
- 404 fallback if slug not found

**Create `src/pages/InsightPage.tsx`**
- `useParams()` to get insight slug
- Flat lookup across all projects to find insight + parent project
- Render `InsightCard` in permanent expanded mode (no toggle)
- Project context header: lens tag, project name + module ID, date
- Navigation links: `[→ VIEW FULL PROJECT]`, `[→ LINKEDIN DISCUSSION]`
- 404 fallback if insight not found

**Update `src/App.tsx`**
- Add routes: `/project/:slug` → `ProjectPage`, `/insight/:slug` → `InsightPage`
- Place above the catch-all `*` route

## Phase 4: OG Meta Tags (Basic)

- Install `react-helmet-async`
- Add `<Helmet>` to `InsightPage` and `ProjectPage` with title, description, og:title, og:description
- Note: This enables browser tab titles and basic meta. Full LinkedIn OG preview requires server-side rendering or Vercel middleware — flagged as a follow-up

## File Changes Summary

| Action | File |
|--------|------|
| Create | `src/data/projects.ts` |
| Create | `src/components/SubpageShell.tsx` |
| Create | `src/components/InsightCard.tsx` |
| Create | `src/pages/ProjectPage.tsx` |
| Create | `src/pages/InsightPage.tsx` |
| Modify | `src/components/ProjectRack.tsx` (import data, add DEEP_DIVE link) |
| Modify | `src/App.tsx` (add 2 routes) |
| Install | `react-helmet-async` |

## Deferred to Phase 2+

- Per-project custom `ProjectHeaderViz` (6 unique CSS/SVG visualizations)
- Vercel Edge Middleware for server-side OG tags (LinkedIn crawler)
- Markdown rendering for insight content (if needed beyond plain text)

