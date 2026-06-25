// components/sections/CTABanner.jsx
// ── CALL-TO-ACTION BANNER ─────────────────────────────────────────────────────
// ✏️ Edit the headline and subtext below

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CTABanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A2332 0%, #0D1117 50%, #1A2332 100%)' }}
    >
      {/* Gold radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] opacity-20"
          style={{ background: 'radial-gradient(ellipse, #C8A96E 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-wrapper relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-4"
        >
          Ready to Grow?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-display-lg text-brand-mist max-w-2xl mx-auto"
        >
          {/* ✏️ Edit CTA headline here */}
          Let's Build Something <span className="text-gold-shimmer">Worth Reading.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-brand-ghost text-lg max-w-xl mx-auto"
        >
          {/* ✏️ Edit subtext here */}
          Tell me about your project. I'll get back to you within 24 hours with ideas, a timeline, and a fair price.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary text-base px-10 py-4">
            Hire Me Now →
          </Link>
          <Link href="/portfolio" className="btn-ghost text-base">
            See My Work First
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
