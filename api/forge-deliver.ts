import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIp } from './_rate-limit.js';

export const maxDuration = 60; // Hobby plan max: 60s — SMTP can be slow

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 3 };

const SMTP_HOST = 'mail.privateemail.com';
const SMTP_PORT = 587;
const SMTP_USER = 'signal@shapeneural.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS: allow from anywhere (called from user scripts)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp, RATE_LIMIT);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', Math.ceil((rateCheck.retryAfterMs || 1000) / 1000));
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpPassword) return res.status(500).json({ error: 'SMTP not configured' });

  try {
    const { content, to, subject, email } = req.body;
    if (!content || !to || !subject) {
      return res.status(400).json({ error: 'content, to, and subject are required' });
    }

    console.log(`[forge-deliver] Sending to ${to} from ${email || 'unknown'} (${clientIp})`);

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // STARTTLS on port 587
      auth: {
        user: SMTP_USER,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"AUTOFORGE" <${SMTP_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: 'Courier New', 'IBM Plex Mono', monospace; background: #06060a; color: #d4d4dc; max-width: 640px; margin: 0 auto;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0c0c14 0%, #111122 100%); padding: 32px 32px 24px; border-bottom: 2px solid #00ff41;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
              <td><span style="color: #00ff41; font-size: 16px; letter-spacing: 5px; font-weight: 600;">AUTOFORGE</span></td>
              <td align="right"><span style="color: #8888a0; font-size: 10px; letter-spacing: 3px;">PIPELINE OUTPUT</span></td>
            </tr></table>
            <div style="margin-top: 12px; font-size: 11px; color: #8888a0; letter-spacing: 2px;">${subject}</div>
          </div>

          <!-- Body -->
          <div style="background: #0c0c14; padding: 32px; border-left: 1px solid #1a1a2e; border-right: 1px solid #1a1a2e;">
            <div style="white-space: pre-wrap; line-height: 1.8; font-size: 13px; color: #d4d4dc;">${content}</div>
          </div>

          <!-- Footer -->
          <div style="background: #06060a; padding: 24px 32px; border-top: 1px solid #1a1a2e;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
              <td><a href="https://shapeneural.com" style="color: #8888a0; text-decoration: none; font-size: 10px; letter-spacing: 2px;">SHAPENEURAL LABS</a></td>
              <td align="right"><span style="color: #555; font-size: 10px; letter-spacing: 2px;">designed intelligence</span></td>
            </tr></table>
          </div>
        </div>
      `,
      text: content, // Plain text fallback
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Forge deliver error:', error);
    return res.status(500).json({
      error: 'Email delivery failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
