/**
 * Lightweight in-memory rate limiter for the contact endpoint.
 *
 * Best-effort by design: state lives in the module scope of the running
 * function instance. On Vercel (Fluid Compute) a warm instance is reused
 * across invocations, so this reliably throttles bursts hitting the same
 * instance — but it is NOT shared across separate/scaled-out instances or
 * after a cold start. It is a cheap first layer on top of validation +
 * honeypot, not a hard guarantee. For strict, global limits use a shared
 * store (Vercel KV / Upstash Redis) or platform controls (Vercel Firewall
 * rate limiting / BotID). See the deployment notes.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5; // per IP per window
const MAX_TRACKED_IPS = 5000; // memory guard

const hits = new Map<string, number[]>();

/** Extract the client IP from platform-set headers (trusted on Vercel). */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Records an attempt for `ip` and reports whether it is within the limit.
 * Call once per genuine (valid, non-honeypot) submission, before sending.
 */
export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_ATTEMPTS) {
    hits.set(ip, recent); // keep the pruned window
    return { allowed: false };
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      const pruned = times.filter((t) => now - t < WINDOW_MS);
      if (pruned.length === 0) hits.delete(key);
      else hits.set(key, pruned);
    }
  }

  return { allowed: true };
}
