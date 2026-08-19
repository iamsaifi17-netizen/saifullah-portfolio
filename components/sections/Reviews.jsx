// components/sections/Reviews.jsx
// Shows approved reviews from DB + Leave a Review form

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { StarRating } from '../ui/StarRating';

function ReviewCard({ review, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-brand-steel border border-brand-rule p-6 flex flex-col gap-4
                 hover:border-brand-accent/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(200,169,110,0.08)]
                 transition-all duration-300"
    >
      <StarRating rating={review.rating} animate={true} />
      <p className="text-brand-ghost text-sm leading-relaxed flex-grow italic">
        "{review.comment}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-brand-rule">
        <div className="w-9 h-9 rounded-full bg-brand-ink border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-sm text-brand-accent">
            {review.name?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div className="flex-grow min-w-0">
          <p className="font-body text-sm font-semibold text-brand-mist truncate">{review.name}</p>
          {review.project_name && (
            <p className="font-body text-xs text-brand-ghost/70">Project: {review.project_name}</p>
          )}
        </div>
        {review.linkedin && (
          <a href={review.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-brand-ghost hover:text-brand-accent transition-colors flex-shrink-0"
            aria-label="LinkedIn">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ReviewForm() {
  const [form,    setForm]    = useState({ name:'', email:'', rating:5, comment:'', linkedin:'', project_name:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const h = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="text-center py-8">
      <p className="text-4xl mb-3">🎉</p>
      <p className="font-display text-xl text-brand-mist mb-2">Thank You!</p>
      <p className="text-brand-ghost text-sm">Your review has been submitted and is awaiting approval.</p>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">Your Name *</label>
          <input type="text" required value={form.name} onChange={h('name')} placeholder="John Smith" className="input-field" />
        </div>
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">Email Address *</label>
          <input type="email" required value={form.email} onChange={h('email')} placeholder="john@example.com" className="input-field" />
        </div>
      </div>

      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-3">Your Rating *</label>
        <StarRating
          rating={form.rating}
          animate={false}
          size="lg"
          interactive={true}
          onChange={(v) => setForm(f => ({ ...f, rating: v }))}
        />
      </div>

      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">Project (Optional)</label>
        <input type="text" value={form.project_name} onChange={h('project_name')} placeholder="Which project are you reviewing?" className="input-field" />
      </div>

      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
          Your Review * <span className="text-brand-ghost/50 normal-case font-normal">(min 20 characters)</span>
        </label>
        <textarea required rows={5} value={form.comment} onChange={h('comment')}
          placeholder="Share your experience working with Muhammad..." className="textarea-field" />
      </div>

      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">LinkedIn Profile (Optional)</label>
        <input type="url" value={form.linkedin} onChange={h('linkedin')} placeholder="https://linkedin.com/in/your-profile" className="input-field" />
      </div>

      {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">{error}</p>}

      <button type="submit" disabled={loading}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Submitting...' : 'Submit Review →'}
      </button>
      <p className="text-brand-ghost text-xs text-center">
        Reviews appear after approval. Your email is never shown publicly.
      </p>
    </form>
  );
}

export default function Reviews() {
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/public/reviews')
      .then(r => r.json())
      .then(d => setReviews(Array.isArray(d) ? d : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="section-pad bg-brand-ink">
      <div className="section-wrapper">
        <SectionHeading
          eyebrow="Client Feedback"
          title="Ratings & Reviews"
          subtitle="Genuine feedback from real clients. Every review is verified before appearing here."
          center
        />

        {/* Average rating bar */}
        {reviews.length > 0 && (
          <AnimatedSection className="flex items-center justify-center gap-10 mb-12">
            <div className="text-center">
              <p className="font-display text-5xl text-brand-accent">{avg}</p>
              <StarRating rating={Math.round(Number(avg))} animate={false} />
              <p className="font-body text-xs text-brand-ghost mt-1">Average Rating</p>
            </div>
            <div className="w-px h-14 bg-brand-rule" />
            <div className="text-center">
              <p className="font-display text-5xl text-brand-accent">{reviews.length}</p>
              <p className="font-body text-xs text-brand-ghost mt-2">Verified Reviews</p>
            </div>
          </AnimatedSection>
        )}

        {/* Reviews grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-ghost text-sm">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <AnimatedSection className="text-center py-16 border border-dashed border-brand-rule mb-12">
            <p className="font-display text-xl text-brand-mist mb-2">No reviews yet</p>
            <p className="text-brand-ghost text-sm">Be the first to leave a review below.</p>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        )}

        {/* Leave a review CTA */}
        <AnimatedSection>
          <div className="border border-brand-rule bg-brand-slate p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
              <div>
                <p className="eyebrow mb-2">Share Your Experience</p>
                <h3 className="font-display text-2xl text-brand-mist mb-2">Worked With Me? Leave a Review</h3>
                <p className="text-brand-ghost text-sm max-w-md">
                  Your honest feedback helps other clients. All reviews are moderated before appearing publicly.
                </p>
              </div>
              {!showForm && (
                <button onClick={() => setShowForm(true)} className="btn-primary flex-shrink-0">
                  ⭐ Leave a Review
                </button>
              )}
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-brand-rule pt-8"
                >
                  <ReviewForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
