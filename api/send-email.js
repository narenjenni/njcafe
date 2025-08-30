// /api/send-email.js — Vercel Serverless Function
// Supports two backends:
// 1) RESEND_API_KEY (recommended) — use Resend to send email
// 2) SMTP_* via Nodemailer — fallback if you prefer SMTP
// Set environment variables in Vercel Project Settings.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { to, subject, text } = req.body || {};
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing "to", "subject", or "text"' });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      // Resend backend
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.MAIL_FROM || 'orders@njcafe.example.com';
      await resend.emails.send({ from, to, subject, text });
      return res.status(200).json({ ok: true, provider: 'resend' });
    }

    // SMTP fallback via Nodemailer
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    await transporter.sendMail({ from, to, subject, text });
    return res.status(200).json({ ok: true, provider: 'smtp' });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: 'Failed to send email', detail: String(err && err.message || err) });
  }
}
