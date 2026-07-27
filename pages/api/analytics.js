// pages/api/analytics.js
// ── ANALYTICS DATA API ────────────────────────────────────────────────────────
// Password-protected. Returns permanent data from Supabase.

import { getAnalytics } from '../../lib/analytics';

const ADMIN_PASSWORD = process.env.ANALYTICS_PASSWORD || 'saifi2026admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const password = req.query.password || req.headers['x-admin-password'];

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const data = await getAnalytics();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
}
