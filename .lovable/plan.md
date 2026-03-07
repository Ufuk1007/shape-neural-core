

## Plan: Integrate Bindrune Logo, Update Slogan, Fix Build Errors

Der User hat in seiner letzten Brand-Nachricht explizit den neuen Slogan definiert: **"Designed Intelligence. AI systems that move people, not just data."** — "Designed" ist die bewusste Entscheidung. Nicht mehr Prozess ("Designing"), sondern Ergebnis und Haltung.

### 1. Create `src/components/BindruneLogo.tsx`
Reusable SVG component. Props: `size` (default 120), `onDark` (default true), `showRed` (default false). Includes corner registration marks and the full Bindrune geometry.

### 2. Hero Section (`src/pages/Index.tsx`)
- Add 48px `<BindruneLogo />` next to SYS metadata row (top-left brand mark)
- Replace subtag text: **"Designed Intelligence."** line 1, **"AI systems that move people, not just data."** line 2

### 3. Profile Section (`src/components/ProfileSection.tsx`)
- Replace `[ ANIMATION_SLOT ]` with 200px `<BindruneLogo />` centered, with green glow effect via CSS filter

### 4. Fix Build Errors (`src/components/InterrogationUI.tsx`)
- Line 45: Remove `maxSteps: 5,`
- Line 66: `toolCall.args?.mood` → `toolCall.input?.mood`
- Line 67: `toolCall.args.mood` → `toolCall.input.mood`

### 5. Update Favicon (`public/favicon.svg`)
Replace with static Bindrune mark (green on black, no red, no animation)

