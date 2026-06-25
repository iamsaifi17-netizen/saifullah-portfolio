// components/sections/Testimonials.jsx
// ── TESTIMONIALS ─────────────────────────────────────────────────────────────
// ✏️ Edit client reviews in lib/config.js → SITE_CONFIG.testimonials

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';

// Star rating component
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-brand-accent' : 'text-brand-rule'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = SITE_CONFIG.testimonials;

  return (
    <section className="section-pad bg-brand-slate relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand-accent/20 to-transparent" />

      <div className="section-wrapper relative z-10">
        <SectionHeading
          eyebrow="Client Voices"
          title="What Clients Say"
          subtitle="Results speak — but so do the people who saw them first-hand."
          center
        />

        {/* ── FEATURED TESTIMONIAL ── */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-brand-steel border border-brand-rule p-10 lg:p-14 relative"
            >
              {/* Quotation mark */}
              <div className="absolute top-6 right-8 font-display text-8xl text-brand-accent/10 select-none leading-none">
                "
              </div>

              <Stars rating={testimonials[activeIndex].rating} />

              <blockquote className="font-display text-2xl lg:text-3xl text-brand-mist italic leading-snug mt-6 mb-8">
                "{testimonials[activeIndex].text}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-brand-rule">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-brand-ink border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-lg text-brand-accent">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-brand-mist text-sm">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="font-body text-xs text-brand-ghost mt-0.5">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="font-body text-xs text-brand-accent/70 mt-0.5">
                    {testimonials[activeIndex].country}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-none ${
                  i === activeIndex
                    ? 'w-8 h-1.5 bg-brand-accent'
                    : 'w-2 h-1.5 bg-brand-rule hover:bg-brand-ghost'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── GRID (all testimonials) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 80}>
              <button
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-5 border transition-all duration-200 ${
                  i === activeIndex
                    ? 'border-brand-accent/50 bg-brand-steel'
                    : 'border-brand-rule bg-brand-ink hover:border-brand-accent/30'
                }`}
              >
                <Stars rating={t.rating} />
                <p className="font-body text-xs text-brand-ghost leading-relaxed mt-3 line-clamp-3">
                  "{t.text}"
                </p>
                <p className="font-body text-xs font-semibold text-brand-mist mt-3">{t.name}</p>
                <p className="font-body text-[11px] text-brand-ghost/70">{t.country}</p>
              </button>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
