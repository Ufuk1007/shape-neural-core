

# Fix: Legal Modal — Remove Internal Scroll

The Legal Modal currently has `max-h-[90vh] overflow-y-auto`, which causes scrollable content inside the modal. The content is short enough to fit without scrolling.

## Change — `src/components/LegalModal.tsx`

**Line 38**: Remove `max-h-[90vh] overflow-y-auto` from the modal container class.

```
// Before
className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"

// After
className="w-full max-w-4xl pointer-events-auto"
```

Also update the `LAST_UPDATE` date from `2025-12-13` to `2026-03-11`.

