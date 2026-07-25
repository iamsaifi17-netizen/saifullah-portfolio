// pages/api/analytics.js
// ── ANALYTICS DATA API ────────────────────────────────────────────────────────
// Password-protected endpoint that returns all analytics data.
// Only YOU can access this — set your password in ANALYTICS_PASSWORD env var.

import { getAnalytics } from '../../lib/analytics';

// ✏️ CHANGE THIS PASSWORD — set it in Vercel Environment Variables
// Go to Vercel → Your Project → Settings → Environment Variables
// Add: ANALYTICS_PASSWORD = your_secret_password
const ADMIN_PASSWORD = process.env.ANALYTICS_PASSWORD || 'saifi2026admin';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check password from query param or header
  const password = req.query.password || req.headers['x-admin-password'];

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const data = getAnalytics();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Error fetching analytics' });
  }
}
