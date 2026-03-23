

## AUTOFORGE ins Project Rack aufnehmen

### Was passiert

1. **Neuer Projekteintrag in `src/data/projects.ts`**
   - MOD_07, slug: `autoforge`, title: AUTOFORGE, status: LIVE, year: 2025
   - category: AUTOMATION, tags: AUTOMATION, AI, CONTENT_PIPELINE
   - collaboration: INDEPENDENT
   - Brief basierend auf dem LinkedIn-Post und AutoforgeWizard-Code: "A machine that builds your automation machine. Answer 3 questions about your industry, audience, and voice — AUTOFORGE generates a tailored content automation pipeline. Local execution, no platform dependency, no subscription. Copy. Paste. Done."
   - signalTags: PIPELINE GENERATOR, LOCAL EXECUTION, ZERO VENDOR LOCK-IN, 3-QUESTION ONBOARDING, MULTI-LLM ORCHESTRATION, COPY.PASTE.DONE
   - techStack: React, TypeScript, Python, OpenAI GPT-4, Perplexity, FastAPI, Vercel Serverless
   - url: `/forge` (interne Route statt externe URL)
   - Kein Screenshot-Image vorhanden — wird ohne Bild angezeigt (Signal Loss Media zeigt dann den NO_SIGNAL-Zustand)
   - insights: leer (erstmal)

2. **Projektseite `/project/autoforge` funktioniert automatisch**
   - ProjectPage.tsx rendert bereits alles basierend auf dem Dateneintrag
   - VISIT_PROJECT-Button verlinkt auf `/forge` (die bestehende Wizard-Seite)
   - DEEP_DIVE-Button verlinkt auf `/project/autoforge`

3. **ProjectRack-Anpassung für internen Link**
   - Der VISIT_PROJECT-Button nutzt aktuell `target="_blank"` mit `<a>`. Für AUTOFORGE muss erkannt werden, dass die URL intern ist (`/forge`), und stattdessen ein React Router `<Link>` ohne `target="_blank"` verwendet werden.
   - Kleine Logik: wenn `project.url` mit `/` beginnt, rendern wir einen `<Link>` statt `<a>`.

4. **Gleiches gilt für ProjectPage.tsx**
   - Der VISIT_PROJECT-Button dort braucht dieselbe interne/externe Link-Logik.

### Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/data/projects.ts` | Neuer MOD_07 AUTOFORGE Eintrag |
| `src/components/ProjectRack.tsx` | Interne URL-Erkennung für VISIT_PROJECT |
| `src/pages/ProjectPage.tsx` | Interne URL-Erkennung für VISIT_PROJECT |

### Keine Änderungen an
- `/forge` Route und `AutoforgeWizard.tsx` bleiben unverändert
- Alle anderen Projekte bleiben unberührt

