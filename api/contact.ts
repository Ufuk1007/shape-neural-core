import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "./_rate-limit.js";

export const maxDuration = 30;

const SMTP_HOST = "mail.privateemail.com";
const SMTP_PORT = 587;
const SMTP_USER = "signal@shapeneural.com";
const RATE_LIMIT = { windowMs: 10 * 60_000, maxRequests: 4 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const clientIp = getClientIp(req);
  const rate = checkRateLimit(clientIp, RATE_LIMIT);
  if (!rate.allowed) {
    res.setHeader("Retry-After", Math.ceil((rate.retryAfterMs ?? 1000) / 1000));
    return res.status(429).json({ error: "Too many requests" });
  }

  const name = text(req.body?.name, 120);
  const company = text(req.body?.company, 160);
  const email = text(req.body?.email, 200);
  const offer = text(req.body?.offer, 80);
  const project = text(req.body?.project, 80);
  const message = text(req.body?.message, 3000);
  const language = req.body?.language === "en" ? "en" : "de";
  const consent = req.body?.consent === "yes";
  const honeypot = text(req.body?.website, 200);

  if (honeypot) return res.status(200).json({ success: true });
  if (!name || !EMAIL_PATTERN.test(email) || message.length < 20 || !consent) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpPassword) return res.status(500).json({ error: "Email service not configured" });

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: { user: SMTP_USER, pass: smtpPassword },
    });

    await transporter.sendMail({
      from: `"ShapeNeural Website" <${SMTP_USER}>`,
      to: SMTP_USER,
      replyTo: email,
      subject: `${language === "de" ? "Projektanfrage" : "Project enquiry"} — ${offer || "unsure"}${project ? ` / ${project}` : ""}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "—"}`,
        `Email: ${email}`,
        `Entry point: ${offer || "unsure"}`,
        `Reference project: ${project || "—"}`,
        `Language: ${language}`,
        "",
        message,
      ].join("\n"),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact delivery error:", error);
    return res.status(500).json({ error: "Email delivery failed" });
  }
}
