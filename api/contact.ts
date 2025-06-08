import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function (request: VercelRequest, response: VercelResponse) {
  if (request.method === 'POST') {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).send('Missing required fields.');
    }

    // Configure your email transporter
    // IMPORTANT: Use environment variables for your email credentials in a real deployment!
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com', // e.g., smtp.gmail.com, smtp-mail.outlook.com
      port: parseInt(process.env.SMTP_PORT || '587'), // e.g., 587 for TLS, 465 for SSL
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports  
      auth: {
        user: process.env.SMTP_USER || 'your-email@example.com',
        pass: process.env.SMTP_PASSWORD || 'your-email-password',
      },
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.TARGET_EMAIL || 'your-target-email@example.com', // Your email address to receive messages
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

      response.status(200).send('Message sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      response.status(500).send('Failed to send message.');
    }
  } else {
    response.status(405).send('Method Not Allowed');
  }
} 