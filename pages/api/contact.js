// pages/api/contact.js
// ── CONTACT FORM API ROUTE ────────────────────────────────────────────────────
// ✏️ OPTIONAL: Use this if you want to handle form submissions server-side.
//    For Vercel/Netlify deployment, you can send emails via Nodemailer or Resend.
//
// SETUP (using Resend — recommended for simplicity):
//   1. npm install resend
//   2. Get API key from https://resend.com (free tier available)
//   3. Set RESEND_API_KEY in your environment variables
//   4. Update the FROM email and TO email below

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message, service, budget } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // ── OPTION 1: Using Resend ──────────────────────────────────────────────
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio Contact <noreply@yourdomain.com>',
    //   to: ['your.email@gmail.com'],  // ✏️ Your email
    //   subject: `[Portfolio] ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Service:</strong> ${service || 'Not specified'}</p>
    //     <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // ── OPTION 2: Using Formspree (no backend needed) ──────────────────────
    // Just point your form directly to Formspree — no API route needed.
    // See the comment in pages/contact.js for instructions.

    // Mock response for now
    console.log('Form submission:', { name, email, subject, message, service, budget });
    return res.status(200).json({ message: 'Message received!' });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please email directly.' });
  }
}
