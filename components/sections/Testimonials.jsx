// components/sections/Testimonials.jsx — Fixed for light theme

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-brand-accent text-lg' : 'text-brand-rule text-lg'}>★</span>
      ))}
    </div>
  );
}

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
    <section className="section-pad bg-brand-bg relative overflow-hidden">
      <div className="section-wrapper relative z-10">
        <SectionHeading
          eyebrow="Client Voices"
          title="What Clients Say"
          subtitle="Real words from real clients — people who trusted me with their online presence."
          center
        />

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-brand-rule shadow-card-lg p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Decorative quote */}
              <div className="absolute top-4 right-6 font-display text-9xl text-brand-accent/10 select-none leading-none pointer-events-none">
                "
              </div>

              <Stars rating={active.rating} />

              <blockquote className="font-display text-xl lg:text-2xl text-brand-ink italic leading-snug mt-6 mb-8">
                "{active.text}"
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-brand-rule">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-bg-alt border-2 border-brand-accent/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <span className="font-display text-lg text-brand-accent">{active.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-brand-ink text-sm">{active.name}</p>
                    <p className="font-body text-xs text-brand-muted mt-0.5">{active.role}</p>
                    <p className="font-body text-xs text-brand-accent/80 mt-0.5">{active.country}</p>
                  </div>
                </div>

                {(active.linkedinUrl || active.websiteUrl) && (
                  <div className="flex flex-wrap gap-3">
                    {active.linkedinUrl && (
                      <a href={active.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white px-4 py-2 text-xs font-body font-semibold transition-all duration-200">
                        <LinkedInIcon /> View Recommendation
                      </a>
                    )}
                    {active.websiteUrl && (
                      <a href={active.websiteUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary text-xs py-2 px-4">
                        Visit Website →
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
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 h-1.5 ${i === activeIndex ? 'w-8 bg-brand-accent' : 'w-2 bg-brand-rule hover:bg-brand-muted'}`}
              />
            ))}
          </div>
        </div>

        {/* All testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 100}>
              <button onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-5 border transition-all duration-200 ${
                  i === activeIndex
                    ? 'border-brand-accent/50 bg-white shadow-card'
                    : 'border-brand-rule bg-brand-bg hover:border-brand-accent/30 hover:bg-white'
                }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-bg-alt border border-brand-rule flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm text-brand-accent">{t.name.charAt(0)}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-body text-sm font-semibold text-brand-ink">{t.name}</p>
                      <Stars rating={t.rating} />
                    </div>
                    <p className="font-body text-xs text-brand-muted mt-0.5">{t.role}</p>
                    <p className="font-body text-xs text-brand-muted/70 leading-relaxed mt-2 line-clamp-2 italic">"{t.text}"</p>
                    {t.linkedinUrl && (
                      <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 border border-green-200 px-2 py-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="font-body text-[10px] text-green-700 font-semibold uppercase tracking-widest">Verified</span>
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
