// pages/api/admin/projects.js
import { withAdmin } from '../../../lib/adminAuth';
import { sb } from '../../../lib/supabase';

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await sb('/projects?select=*&order=sort_order.asc,created_at.desc');
      return res.status(200).json(data || []);
    }
    if (req.method === 'POST') {
      const body = req.body;
      const project = {
        title:        body.title?.trim(),
        slug:         body.slug?.trim() || body.title?.trim().toLowerCase().replace(/\s+/g,'-'),
        short_desc:   body.short_desc?.trim(),
        long_desc:    body.long_desc?.trim(),
        category:     body.category?.trim(),
        tags:         Array.isArray(body.tags) ? body.tags : [],
        client:       body.client?.trim(),
        status:       body.status || 'completed',
        image_url:    body.image_url?.trim() || null,
        live_url:     body.live_url?.trim()  || null,
        github_url:   body.github_url?.trim()|| null,
        is_published: Boolean(body.is_published),
        is_featured:  Boolean(body.is_featured),
        sort_order:   Number(body.sort_order) || 0,
        seo_title:    body.seo_title?.trim()       || null,
        seo_description: body.seo_description?.trim() || null,
      };
      if (!project.title) return res.status(400).json({ error: 'Title required' });
      const data = await sb('/projects', { method: 'POST', body: JSON.stringify(project) });
      return res.status(201).json(data);
    }
    if (req.method === 'PATCH') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'ID required' });
      const data = await sb(`/projects?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID required' });
      await sb(`/projects?id=eq.${id}`, { method: 'DELETE', prefer: 'return=minimal' });
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
export default withAdmin(handler);
