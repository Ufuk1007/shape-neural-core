

## Bug: "Rendered fewer hooks than expected"

**Root cause**: Line 1770-1791 — a `useState` hook is called inside an IIFE within conditional JSX (`step === 0 && ((() => { const [comingSoonBtn, setComingSoonBtn] = useState(false); ... })())`). React hooks cannot be called conditionally or inside nested functions. When `step` changes away from 0, that hook disappears, causing the hook count mismatch.

**Fix**: Move `comingSoonBtn` state up to the `AutoforgeWizard` component level (alongside the other `useState` calls at lines 1668-1676), then remove the IIFE wrapper and render the step 0 content as a plain conditional block.

### Changes

**`src/components/AutoforgeWizard.tsx`**:
1. Add `const [comingSoonBtn, setComingSoonBtn] = useState(false);` at line ~1677 (component top level)
2. Replace the IIFE pattern at lines 1770-1792 with a simple `{step === 0 && (<div>...</div>)}` block using the hoisted state

This is a one-line state hoist + removing the IIFE wrapper. No logic changes needed.

