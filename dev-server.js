import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const VITE_PORT = 5173;

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint for contact form
// Same logic as api/contact.ts. If you change one, change the other.
const CONTACT_LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Names end up in the subject and the Reply-To header, so no line breaks allowed.
const oneLine = (value) => value.replace(/\s+/g, ' ').trim();

app.post('/api/contact', async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const { name: rawName, email: rawEmail, message: rawMessage } = body;

  if (typeof rawName !== 'string' || typeof rawEmail !== 'string' || typeof rawMessage !== 'string') {
    return res.status(400).send('Missing required fields.');
  }

  const name = oneLine(rawName);
  const email = rawEmail.trim();
  const message = rawMessage.trim();

  if (!name || !email || !message) {
    return res.status(400).send('Missing required fields.');
  }
  if (
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    message.length > CONTACT_LIMITS.message
  ) {
    return res
      .status(400)
      .send(
        `Too long. Name up to ${CONTACT_LIMITS.name}, email up to ${CONTACT_LIMITS.email}, message up to ${CONTACT_LIMITS.message} characters.`
      );
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).send('That email address does not look right.');
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, TARGET_EMAIL } = process.env;
  const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASSWORD, TARGET_EMAIL })
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    console.error(`Contact form is not set up. Missing env vars: ${missing.join(', ')}`);
    return res.status(500).send('Failed to send message.');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: { name: 'Portfolio contact', address: SMTP_USER },
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

    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message.');
  }
});

// API endpoint for Medium feed
app.get('/api/medium', async (req, res) => {
  try {
    const feedUrl = 'https://medium.com/feed/@harshdadiya';
    const response = await fetch(feedUrl);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch Medium feed' });
    }

    const xml = await response.text();

    // Parse RSS feed
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(xml)) !== null) {
      const itemContent = itemMatch[1];

      const titleMatch = /<title[^>]*?>\s*([\s\S]*?)\s*<\/title>/.exec(itemContent);
      const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
      const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(itemContent);
      const descriptionMatch = /<description>([\s\S]*?)<\/description>/.exec(itemContent);
      const categoryMatches = itemContent.match(/<category[^>]*?>([\s\S]*?)<\/category>/g) || [];

      const cleanText = (str) => {
        if (!str) return '';
        let cleaned = str.trim();
        if (cleaned.startsWith('<![CDATA[')) {
          cleaned = cleaned.substring(9);
        }
        if (cleaned.endsWith(']]>')) {
          cleaned = cleaned.substring(0, cleaned.length - 3);
        }
        cleaned = cleaned
          .replace(/<[^>]*>/g, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .trim();
        return cleaned;
      };

      const title = cleanText(titleMatch ? titleMatch[1] : '');
      const link = cleanText(linkMatch ? linkMatch[1] : '');
      const pubDate = cleanText(pubDateMatch ? pubDateMatch[1] : '');
      const description = cleanText(descriptionMatch ? descriptionMatch[1] : '');

      const categories = categoryMatches
        .map((cat) => {
          const match = /<category[^>]*?>([\s\S]*?)<\/category>/.exec(cat);
          return match ? cleanText(match[1]) : '';
        })
        .filter((cat) => cat !== '');

      if (title && link) {
        items.push({
          title,
          link,
          pubDate,
          description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          categories,
        });
      }
    }

    const articles = items.slice(0, 6);
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching Medium feed:', error);
    res.status(500).json({ error: 'Failed to fetch Medium feed' });
  }
});

// Proxy all other requests to Vite dev server
app.use(
  '/',
  createProxyMiddleware({
    target: `http://localhost:${VITE_PORT}`,
    changeOrigin: true,
    ws: true, // Proxy WebSocket for HMR
  })
);

app.listen(PORT, () => {
  console.log(`\n🚀 Dev server running at http://localhost:${PORT}`);
  console.log(`📧 API endpoint available at http://localhost:${PORT}/api/contact`);
  console.log(`📝 Blog API endpoint available at http://localhost:${PORT}/api/medium`);
  console.log(`🔄 Proxying to Vite at http://localhost:${VITE_PORT}\n`);
});
