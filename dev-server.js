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
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Missing required fields.');
  }

  // Configure email transporter (same as in api/contact.ts)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || 'your-email@example.com',
      pass: process.env.SMTP_PASSWORD || 'your-email-password',
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.TARGET_EMAIL || 'your-target-email@example.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
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
