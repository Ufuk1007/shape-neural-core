

# Implementation: Multi-Step UI-Message-Stream for `api/chat.ts`

## Problem
After `setAtmosphere` tool call, the model stops with `finishReason: "tool-calls"` — no text response follows. `maxSteps` does not guarantee a final text step.

## Solution
Adopt the official multi-step cookbook pattern using `createUIMessageStream` with two explicit `streamText` steps merged via `writer.merge()`.

## Changes — `api/chat.ts` only

**Imports**: Add `createUIMessageStream`, `createUIMessageStreamResponse`. Remove `maxSteps`.

**Core logic**:
```typescript
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    // Step 1: Tool step (setAtmosphere may fire)
    const result1 = streamText({
      model: openai('gpt-4.1'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.3,
      tools: { setAtmosphere: /* same tool def */ },
    });
    writer.merge(result1.toUIMessageStream({ sendFinish: false }));

    // Step 2: Text-only step — model sees tool result, generates text
    const result2 = streamText({
      model: openai('gpt-4.1'),
      system: systemPrompt,
      messages: [...modelMessages, ...(await result1.response).messages],
      temperature: 0.3,
      // no tools — forces text generation
    });
    writer.merge(result2.toUIMessageStream({ sendStart: false }));
  },
});

const response = createUIMessageStreamResponse({
  stream,
  headers: { 'Content-Encoding': 'none' },
});
```

**Vercel bridge** stays: The handler uses `(req, res)` signature so we still need to copy headers and pipe the response body via `reader.read()` → `res.write()`. This is a runtime constraint of the Vercel Node handler format, not an SDK requirement.

## Client — `InterrogationUI.tsx`

No changes expected. The existing `useEffect` scanning `message.parts` for `tool-invocation` parts will receive the tool parts from Step 1 as before. Text from Step 2 arrives as continuation of the same assistant message (due to `sendFinish: false` / `sendStart: false`). Will verify after deploy by inspecting `message.parts` in browser console.

## Files

| File | Change |
|---|---|
| `api/chat.ts` | Rewrite to multi-step `createUIMessageStream` pattern |
| `src/components/InterrogationUI.tsx` | No change (verify after deploy) |

