// components/sections/Hero.jsx
// Premium responsive hero section

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';
import HeroBg from '../ui/HeroBg';
import MagneticButton from '../ui/MagneticButton';

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

function StatItem({ value, label }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-3xl font-semibold text-brand-accent">
        {value}
      </p>

      <p className="font-body text-xs text-brand-muted uppercase tracking-widest mt-0.5">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg">

      {/* Animated background */}
      <HeroBg />

      {/* Static background decoration */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Top-right glow */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, #C8A96B22 0%, transparent 70%)',
          }}
        />

        {/* Bottom-left glow */}
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #C8A96B22 0%, transparent 70%)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#1F1F1F 1px, transparent 1px), linear-gradient(90deg, #1F1F1F 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="section-wrapper relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-28 pb-20">

        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-7"
        >

          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-0.5 bg-brand-accent flex-shrink-0" />

            <p className="eyebrow">
              Web Designer & Full Stack Developer
            </p>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-brand-ink"
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.025em',
            }}
          >
            <span className="block text-brand-ink">
              Designing
            </span>

            <span className="block text-brand-accent">
              Websites That
            </span>

            <span className="block text-brand-ink">
              Grow Businesses.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-brand-muted text-base lg:text-lg leading-relaxed max-w-xl"
          >
            {SITE_CONFIG.subTagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >

            {/* WhatsApp */}
            <MagneticButton strength={0.18}>
              <a
                href={
                  SITE_CONFIG.whatsappMsg ||
                  'https://wa.me/923185352563'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4"
              >
                <WhatsAppIcon />
                <span>Let's Discuss Your Project</span>
              </a>
            </MagneticButton>

            {/* Portfolio */}
            <MagneticButton strength={0.18}>
              <Link
                href="/portfolio"
                className="btn-secondary inline-flex items-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4"
              >
                <span>View My Work</span>

                <span
                  aria-hidden="true"
                  className="text-lg transition-transform duration-300"
                >
                  →
                </span>
              </Link>
            </MagneticButton>

          </motion.div>

          {/* Technology badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2.5"
          >
            {[
              'Next.js',
              'React',
              'Tailwind CSS',
              'Full Stack',
            ].map((tech) => (
              <span
                key={tech}
                className="font-body text-xs text-brand-ink font-medium border border-brand-rule px-3 py-1.5 bg-white shadow-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-brand-rule"
          >
            {SITE_CONFIG.about.stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </motion.div>

        </motion.div>

        {/* RIGHT SIDE — PROFILE IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="relative flex justify-center lg:justify-end"
        >

          {/* Decorative gold frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="absolute -top-3 -right-3 w-full max-w-xs lg:max-w-sm h-full border-2 border-brand-accent/30 hidden lg:block pointer-events-none"
          />

          {/* Image wrapper */}
          <div
            className="relative w-full max-w-xs lg:max-w-sm overflow-hidden bg-brand-bg-alt shadow-card-lg"
            style={{ aspectRatio: '4/5' }}
          >

            <Image
              src="/images/profile.jpg"
              alt={`${SITE_CONFIG.name} — Web Designer & Full Stack Developer`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 400px"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 via-transparent to-transparent pointer-events-none" />

            {/* Gold shine */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  'linear-gradient(135deg, transparent 40%, rgba(200,169,110,0.18) 50%, transparent 60%)',
              }}
            />
          </div>

          {/* Availability badge */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.5,
            }}
            className="absolute bottom-6 -left-2 lg:-left-4 bg-white border border-brand-rule px-4 py-3 shadow-card-lg z-10"
          >
            <div className="flex items-center gap-2 mb-0.5">

              <div className="relative w-2 h-2 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50" />
                <div className="relative w-2 h-2 rounded-full bg-green-500" />
              </div>

              <p className="font-body text-xs font-semibold text-green-600 uppercase tracking-widest whitespace-nowrap">
                Available Now
              </p>
            </div>

            <p className="font-display text-sm text-brand-ink font-medium whitespace-nowrap">
              Ready for New Projects
            </p>
          </motion.div>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-body text-xs text-brand-muted uppercase tracking-widest">
          Scroll
        </p>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="w-px h-8 bg-gradient-to-b from-brand-accent to-transparent"
        />
      </motion.div>

    </section>
  );
}