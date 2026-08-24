// pages/api/admin/stats.js
import { withAdmin } from '../../../lib/adminAuth';
import { sb } from '../../../lib/supabase';

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const [projects, reviews, messages] = await Promise.allSettled([
      sb('/projects?select=id,is_published,is_featured'),
      sb('/reviews?select=id,status,rating'),
      sb('/messages?select=id,is_read'),
    ]);
    const p = projects.value  || [];
    const r = reviews.value   || [];
    const m = messages.value  || [];
    const approved = r.filter(x => x.status === 'approved');
    const avg = approved.length
      ? (approved.reduce((s, x) => s + x.rating, 0) / approved.length).toFixed(1)
      : null;
    return res.status(200).json({
      totalProjects:     p.length,
      publishedProjects: p.filter(x => x.is_published).length,
      featuredProjects:  p.filter(x => x.is_featured).length,
      pendingReviews:    r.filter(x => x.status === 'pending').length,
      approvedReviews:   approved.length,
      avgRating:         avg,
      totalMessages:     m.length,
      unreadMessages:    m.filter(x => !x.is_read).length,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
export default withAdmin(handler);
