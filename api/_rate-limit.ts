// Simple in-memory IP-based rate limiter for Vercel serverless functions
// Each function instance has its own memory, so this is per-instance limiting.
// For production at scale, use Redis or Vercel KV instead.

interface RateLimitConfig {
  windowMs: number;   // Time window in milliseconds
  maxRequests: number; // Max requests per window per IP
}

const requestMap = new Map<string, number[]>();

// Cleanup stale entries every 5 minutes
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [ip, timestamps] of requestMap.entries()) {
    const valid = timestamps.filter(t => now - t < windowMs);
    if (valid.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, valid);
    }
  }
}

export function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  cleanup(config.windowMs);

  const timestamps = requestMap.get(ip) || [];
  const windowStart = now - config.windowMs;
  const recentRequests = timestamps.filter(t => t > windowStart);

  if (recentRequests.length >= config.maxRequests) {
    const oldestInWindow = Math.min(...recentRequests);
    const retryAfterMs = oldestInWindow + config.windowMs - now;
    return { allowed: false, retryAfterMs: Math.max(retryAfterMs, 1000) };
  }

  recentRequests.push(now);
  requestMap.set(ip, recentRequests);
  return { allowed: true };
}

// Default configs for different endpoints
export const RATE_LIMITS = {
  chat: { windowMs: 60_000, maxRequests: 15 },  // 15 messages per minute
  tts:  { windowMs: 60_000, maxRequests: 20 },  // 20 TTS requests per minute
  stt:  { windowMs: 60_000, maxRequests: 20 },  // 20 STT requests per minute
} as const;

export function getClientIp(req: { headers: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string') return real;
  return 'unknown';
}
