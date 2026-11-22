import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Same logic lives in dev-server.js (local copy). If you change one, change the other.

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Names end up in the subject and the Reply-To header, so no line breaks allowed.
const oneLine = (value: string) => value.replace(/\s+/g, ' ').trim();

export default async function (request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};
  const { name: rawName, email: rawEmail, message: rawMessage } = body as Record<string, unknown>;

  if (typeof rawName !== 'string' || typeof rawEmail !== 'string' || typeof rawMessage !== 'string') {
    return response.status(400).send('Missing required fields.');
  }

  const name = oneLine(rawName);
  const email = rawEmail.trim();
  const message = rawMessage.trim();

  if (!name || !email || !message) {
    return response.status(400).send('Missing required fields.');
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return response
      .status(400)
      .send(`Too long. Name up to ${LIMITS.name}, email up to ${LIMITS.email}, message up to ${LIMITS.message} characters.`);
  }
  if (!EMAIL_RE.test(email)) {
    return response.status(400).send('That email address does not look right.');
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, TARGET_EMAIL } = process.env;
  const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASSWORD, TARGET_EMAIL })
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    console.error(`Contact form is not set up. Missing env vars: ${missing.join(', ')}`);
    return response.status(500).send('Failed to send message.');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'), // 587 for STARTTLS, 465 for SSL
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: { name: 'Portfolio contact', address: SMTP_USER as string },
      replyTo: { name, address: email },
      to: TARGET_EMAIL,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p>You have a new contact form message:</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        </ul>
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
      `,
    });

    return response.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).send('Failed to send message.');
  }
}
