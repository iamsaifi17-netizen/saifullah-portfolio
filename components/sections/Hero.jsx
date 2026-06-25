// components/sections/Hero.jsx
// ── HOME PAGE HERO ────────────────────────────────────────────────────────────
// ✏️ Edit text in lib/config.js → SITE_CONFIG.tagline / subTagline
// ✏️ To change the profile photo: replace /public/images/profile.jpg

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';

// Stagger container for child animations
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// Stat counter item
function StatItem({ value, label }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-3xl font-semibold text-brand-accent">{value}</p>
      <p className="font-body text-xs text-brand-ghost uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">

      {/* ── BACKGROUND ELEMENTS ── */}
      <div className="absolute inset-0 bg-brand-ink">
        {/* Radial glow — top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{ background: 'radial-gradient(circle at 70% 30%, #C8A96E 0%, transparent 65%)' }}
        />
        {/* Radial glow — bottom left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(circle at 30% 70%, #C8A96E 0%, transparent 65%)' }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="section-wrapper relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-24 pb-12">

        {/* ── LEFT: TEXT CONTENT ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Eyebrow */}
          <motion.p variants={fadeUp} className="eyebrow">
            Freelance Copywriter &amp; Content Strategist
          </motion.p>

          {/* Main headline */}
          {/* ✏️ Edit tagline in lib/config.js */}
          <motion.h1 variants={fadeUp} className="font-display text-display-xl text-brand-mist leading-[1.0]">
            {SITE_CONFIG.tagline.split('.').map((part, i) => (
              <span key={i}>
                {i === 0 ? (
                  <>
                    <span className="text-gold-shimmer">{part}.</span>
                    <br />
                  </>
                ) : part.trim() ? (
                  <span>{part.trim()}.</span>
                ) : null}
              </span>
            ))}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} className="text-brand-ghost text-lg leading-relaxed max-w-xl">
            {SITE_CONFIG.subTagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Start a Project →
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              View My Work
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-brand-rule"
          >
            {SITE_CONFIG.about.stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: PROFILE PHOTO ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Gold frame decoration */}
          <div className="absolute -top-4 -right-4 w-full max-w-sm h-full border border-brand-accent/30 hidden lg:block" />

          {/* Profile image container */}
          {/* ✏️ Replace /images/profile.jpg with your own photo */}
          <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden bg-brand-steel">
            <Image
              src="/images/profile.jpg"
              alt={`${SITE_CONFIG.name} — Freelance Copywriter`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 450px"
            />
            {/* Overlay gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-ink/60 to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-8 -left-4 bg-brand-slate border border-brand-accent/40 px-5 py-3 shadow-xl"
          >
            <p className="font-body text-xs text-brand-ghost uppercase tracking-widest">Available for</p>
            <p className="font-display text-base text-brand-accent font-medium mt-0.5">Freelance Projects</p>
          </motion.div>
        </motion.div>

      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-body text-xs text-brand-ghost uppercase tracking-widest">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-accent to-transparent"
        />
      </motion.div>

    </section>
  );
}
