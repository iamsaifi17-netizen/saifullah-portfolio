// pages/api/admin/messages.js
import { withAdmin } from '../../../lib/adminAuth';
import { sb } from '../../../lib/supabase';

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await sb('/messages?select=*&order=created_at.desc');
      return res.status(200).json(data || []);
    }
    if (req.method === 'PATCH') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'ID required' });
      const data = await sb(`/messages?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID required' });
      await sb(`/messages?id=eq.${id}`, { method: 'DELETE', prefer: 'return=minimal' });
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
export default withAdmin(handler);
