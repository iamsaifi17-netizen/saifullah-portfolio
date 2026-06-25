// components/sections/FAQ.jsx
// ── FAQ ACCORDION ─────────────────────────────────────────────────────────────
// ✏️ Edit questions and answers in lib/config.js → SITE_CONFIG.faq

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';

function FAQItem({ question, answer, isOpen, onClick, index }) {
  return (
    <AnimatedSection delay={index * 60}>
      <div className={`border-b border-brand-rule transition-colors duration-200 ${isOpen ? 'border-brand-accent/40' : ''}`}>
        <button
          onClick={onClick}
          className="w-full flex items-center justify-between gap-4 py-6 text-left group"
          aria-expanded={isOpen}
        >
          <span className={`font-body text-base font-medium transition-colors duration-200 ${isOpen ? 'text-brand-accent' : 'text-brand-mist group-hover:text-brand-accent'}`}>
            {question}
          </span>
          <span className={`flex-shrink-0 w-6 h-6 border border-current flex items-center justify-center text-xs transition-all duration-300 ${isOpen ? 'text-brand-accent rotate-45' : 'text-brand-ghost group-hover:text-brand-accent'}`}>
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-brand-ghost text-sm leading-relaxed">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-pad bg-brand-ink">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Heading */}
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions I Get All the Time"
              subtitle="If yours isn't here, send me a message — I respond within 24 hours."
            />

            {/* CTA card */}
            <AnimatedSection delay={300}>
              <div className="bg-brand-steel border border-brand-accent/30 p-8 mt-8">
                <p className="font-display text-xl text-brand-mist mb-3">Still have questions?</p>
                <p className="text-brand-ghost text-sm mb-6">
                  I'm always happy to chat before you commit. Let's talk about your project, timeline, and budget.
                </p>
                <a href="/contact" className="btn-primary text-sm">
                  Ask Me Anything →
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Accordion */}
          <div>
            {SITE_CONFIG.faq.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
