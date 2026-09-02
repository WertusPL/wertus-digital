import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact/schema";
import { buildContactEmail } from "@/lib/contact/email";
import { getMailConfig, sendContactEmail } from "@/lib/contact/mailer";
import { checkRateLimit, getClientIp } from "@/lib/contact/rate-limit";

/**
 * Contact form endpoint — real SMTP delivery to the studio inbox.
 *
 * Flow: POST → validation → honeypot → rate limit → SMTP transport → the
 * studio inbox (CONTACT_TO_EMAIL, default the public studio address).
 * Success (200) is returned ONLY after the mail transport accepts the message;
 * we never fake delivery. Errors are deliberately generic to the client — no
 * SMTP host, credentials or stack traces leak out. SMTP settings come from
 * environment variables (see .env.example); when they're absent the route
 * refuses to send and returns a safe 500.
 */

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

// Reject bodies larger than this before parsing (contact payloads are tiny).
const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  const len = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(len) && len > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false }, { status: 413 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ success: false }, { status: 415 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  const result = validateContact(raw);
  if (!result.ok) {
    return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
  }

  // Honeypot filled → a bot. Pretend success, send nothing (and don't let it
  // consume the rate-limit budget).
  if (result.honeypot) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Throttle genuine submissions per IP (best-effort; see rate-limit.ts).
  const ip = getClientIp(request);
  if (!checkRateLimit(ip).allowed) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  const config = getMailConfig();
  if (!config) {
    // Missing SMTP env — refuse to send, stay generic to the client.
    console.error("[contact] SMTP is not configured — required environment variables are missing.");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  try {
    const email = buildContactEmail(result.data);
    await sendContactEmail(config, email);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    // Log the fact of failure (message only, never credentials/secrets).
    console.error(
      "[contact] Failed to send message:",
      err instanceof Error ? err.message : "unknown error",
    );
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
