

# Make Liquid Core Bubble Interactive on Mobile

Currently the `LiquidCore` sphere has no click handler — tapping it on mobile does nothing despite being the most prominent visual element.

## Approach

Simple, low-risk addition: tapping the bubble cycles through debris nodes one by one, opening each node's DecryptionPanel. Visual feedback via a brief distortion "pulse" on tap.

## Changes — `src/components/NeuralCloud.tsx`

### 1. LiquidCore — add click handler + visual pulse

- Add an `onClick` prop to `LiquidCore`
- Make the `<Sphere>` mesh respond to click events
- On tap: briefly spike `distort` to 1.2 for ~300ms (a satisfying "vibration" effect), then ease back — purely via a ref flag, no complex state

### 2. NeuralCloud — cycle through nodes on bubble tap

- Track a `coreClickIndex` ref (starts at -1)
- When bubble is tapped (and not interrogating):
  - Increment index, wrap around `debrisPositions.length`
  - Set `decryptedShard` to that node → opens the DecryptionPanel
- This gives the user a way to browse all nodes just by tapping the bubble repeatedly

### 3. Visual feedback detail

In `LiquidCore.useFrame`: check a `tapPulse` ref. When true, temporarily override distort to 1.2 and speed to 4.0, then decay back over ~20 frames. Simple, robust, no new dependencies.

## Summary

- ~30 lines of code added
- No structural changes, no new state management complexity
- Works on both mobile and desktop
- Each tap = next node opens + sphere "pulses"

