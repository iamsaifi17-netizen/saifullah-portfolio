// components/sections/Testimonials.jsx
// ── TESTIMONIALS ─────────────────────────────────────────────────────────────
// Real client testimonials — data from lib/config.js → SITE_CONFIG.testimonials

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-brand-accent text-lg' : 'text-brand-rule text-lg'}>★</span>
      ))}
    </div>
  );
}

// LinkedIn icon SVG
function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = SITE_CONFIG.testimonials;
  const active = testimonials[activeIndex];

  return (
    <section className="section-pad bg-brand-slate relative overflow-hidden">
      {/* Background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand-accent/20 to-transparent" />

      <div className="section-wrapper relative z-10">
        <SectionHeading
          eyebrow="Client Voices"
          title="What Clients Say"
          subtitle="Real words from real clients — people who trusted me with their online presence."
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
              className="bg-brand-steel border border-brand-rule p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-6 font-display text-9xl text-brand-accent/8 select-none leading-none pointer-events-none">
                "
              </div>

              {/* Stars */}
              <Stars rating={active.rating} />

              {/* Testimonial text */}
              <blockquote className="font-display text-xl lg:text-2xl text-brand-mist italic leading-relaxed mt-6 mb-8">
                "{active.text}"
              </blockquote>

              {/* Client info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-brand-rule">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-brand-ink border-2 border-brand-accent/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <span className="font-display text-xl text-brand-accent">
                      {active.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-brand-mist">{active.name}</p>
                    <p className="font-body text-xs text-brand-ghost mt-0.5">{active.role}</p>
                    <p className="font-body text-xs text-brand-accent/70 mt-0.5">{active.country}</p>
                  </div>
                </div>

                {/* Action buttons — only for Joylyn Rosa */}
                {(active.linkedinUrl || active.websiteUrl) && (
                  <div className="flex flex-wrap gap-3">
                    {active.linkedinUrl && (
                      <a
                        href={active.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white px-4 py-2 text-xs font-body font-semibold transition-all duration-200"
                      >
                        <LinkedInIcon />
                        View LinkedIn Recommendation
                      </a>
                    )}
                    {active.websiteUrl && (
                      <a
                        href={active.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs py-2 px-4"
                      >
                        Visit Client Website →
                      </a>
                    )}
                  </div>
                )}
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
                className={`transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 h-1.5 bg-brand-accent'
                    : 'w-2 h-1.5 bg-brand-rule hover:bg-brand-ghost'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── ALL TESTIMONIAL CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 100}>
              <button
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-6 border transition-all duration-200 ${
                  i === activeIndex
                    ? 'border-brand-accent/50 bg-brand-steel'
                    : 'border-brand-rule bg-brand-ink hover:border-brand-accent/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-steel border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg text-brand-accent">{t.name.charAt(0)}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-body text-sm font-semibold text-brand-mist">{t.name}</p>
                      <Stars rating={t.rating} />
                    </div>
                    <p className="font-body text-xs text-brand-ghost mt-0.5">{t.role}</p>
                    <p className="font-body text-xs text-brand-ghost/60 mt-0.5">{t.country}</p>
                    <p className="font-body text-xs text-brand-ghost leading-relaxed mt-3 line-clamp-3 italic">
                      "{t.text}"
                    </p>
                    {/* Real client badge */}
                    {t.linkedinUrl && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-2.5 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="font-body text-[10px] text-green-400 font-semibold uppercase tracking-widest">Verified Client</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
