// pages/api/contact.js
// Saves contact form submissions to Supabase messages table for admin management

import { sb } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, subject, message, service, budget, phone } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sb('/messages', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        phone:   phone?.trim()   || null,
        subject: subject.trim(),
        message: message.trim(),
        service: service         || null,
        budget:  budget          || null,
        is_read: false,
      }),
    });
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please contact via WhatsApp.' });
  }
}
