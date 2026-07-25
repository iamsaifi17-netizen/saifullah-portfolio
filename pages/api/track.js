// pages/api/track.js
// ── VISITOR TRACKING API ──────────────────────────────────────────────────────
// Called automatically on every page load via PageTracker component.
// Lightweight — adds < 1ms to page load time.

import { recordVisit } from '../../lib/analytics';

export default function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page, referrer } = req.body;

    // Get IP address — works on Vercel
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    // Get User-Agent
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Get country from Vercel's geo headers (free, automatic)
    const country = req.headers['x-vercel-ip-country'] || 'unknown';

    // Record the visit
    const visit = recordVisit({
      page:      page || '/',
      referrer:  referrer || 'direct',
      ip,
      userAgent,
      country,
    });

    return res.status(200).json({ success: true, id: visit.id });

  } catch (error) {
    console.error('Tracking error:', error);
    // Fail silently — never break the user's page load
    return res.status(200).json({ success: false });
  }
}
