// pages/api/public/projects.js
import { sb } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const data = await sb('/projects?select=*&is_published=eq.true&order=sort_order.asc,created_at.desc');
    return res.status(200).json(data || []);
  } catch {
    return res.status(200).json([]);
  }
}
