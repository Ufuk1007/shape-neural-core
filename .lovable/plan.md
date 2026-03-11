

# Fix: Tablet Horizontal Overflow

The horizontal scroll at tablet widths (768px–1024px) is caused by two issues:

## Root Causes

1. **Aggressive padding**: `md:px-20` (80px per side) kicks in at 768px — too much for tablet
2. **Tags in ProjectRack spine**: `hidden md:flex` shows all tags at 768px+, but combined with title + year + padding there's not enough room

## Changes

### 1. `src/components/ProjectRack.tsx`

- **Line 163**: Change `px-8 md:px-20` → `px-6 md:px-12 lg:px-20` (reduce tablet padding)
- **Line 260**: Change `hidden md:flex` → `hidden lg:flex` for tags (only show on desktop)

### 2. `src/pages/Index.tsx`

- **Line 65**: Change `px-8 md:px-20` → `px-6 md:px-12 lg:px-20`

### 3. `src/components/ProfileSection.tsx`

- **Line 9**: Change `px-8 md:px-20` → `px-6 md:px-12 lg:px-20`

These are minimal changes — just adjusting breakpoints and padding. No visual design changes on desktop or mobile.

