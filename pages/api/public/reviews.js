// pages/api/public/reviews.js
import { sb } from '../../../lib/supabase';

export default async function handler(req, res) {
  // GET approved reviews
  if (req.method === 'GET') {
    try {
      const data = await sb(
        '/reviews?select=*&status=eq.approved&order=created_at.desc'
      );

      return res.status(200).json(data || []);
    } catch (err) {
      console.error('GET REVIEWS ERROR:', err);
      return res.status(200).json([]);
    }
  }

  // POST new review
  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        rating,
        comment,
        linkedin,
        project_name,
      } = req.body;

      // Validation
      if (!name?.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      if (!email?.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }

      if (!comment?.trim()) {
        return res.status(400).json({ error: 'Review is required' });
      }

      if (!rating || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ error: 'Rating 1-5 required' });
      }

      if (comment.trim().length < 20) {
        return res.status(400).json({
          error: 'Review must be at least 20 characters',
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: 'Invalid email' });
      }

      // Insert using the EXISTING database column:
      // linkedin_or_site
      await sb('/reviews', {
        method: 'POST',
        prefer: 'return=minimal',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          rating: Number(rating),
          comment: comment.trim(),

          // Existing column in your database
          linkedin_or_site: linkedin?.trim() || null,

          status: 'pending',

          // project_name is intentionally not inserted here.
          // Your existing database already has project_id,
          // but project_name is not required for submitting a review.
        }),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your review is awaiting approval.',
      });
    } catch (err) {
      console.error('REVIEW SUBMIT ERROR:', err);

      return res.status(500).json({
        error: err?.message || 'Failed to submit review.',
      });
    }
  }

  return res.status(405).json({
    error: 'Method not allowed',
  });
}