// pages/api/track.js
// ── VISITOR TRACKING API ──────────────────────────────────────────────────────
// Saves every visit permanently to Supabase database.

import { recordVisit } from '../../lib/analytics';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page, referrer } = req.body;

    const ip = 
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';
    const country   = req.headers['x-vercel-ip-country'] || 'unknown';

    await recordVisit({ page, referrer, ip, userAgent, country });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(200).json({ success: false });
  }
}
