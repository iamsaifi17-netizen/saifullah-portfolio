// pages/about.js
// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
// ✏️ Edit content in lib/config.js → SITE_CONFIG.about and SITE_CONFIG.skills

import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

// Skill bar component
function SkillBar({ name, level, index }) {
  return (
    <AnimatedSection delay={index * 60}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-sm text-brand-mist font-medium">{name}</span>
          <span className="font-body text-xs text-brand-accent font-mono">{level}%</span>
        </div>
        <div className="h-1 bg-brand-rule overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.06, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-accent to-brand-accent-light"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title={`About | ${SITE_CONFIG.name}`}
        description={`Learn about ${SITE_CONFIG.name} — freelance copywriter and LinkedIn content strategist. My background, mission, and skills.`}
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">About Me</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                The Writer Behind <span className="text-gold-shimmer">the Words</span>
              </h1>
            </AnimatedSection>
          </div>
        </section>

        {/* ── BIO + PHOTO ── */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-brand-accent/20" />
                <div className="relative aspect-[4/5] max-w-md bg-brand-steel overflow-hidden">
                  {/* ✏️ Replace with your real photo */}
                  <Image
                    src="/images/profile.jpg"
                    alt={SITE_CONFIG.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-6 right-0 bg-brand-ink border border-brand-accent/40 px-6 py-4">
                  <p className="font-display text-3xl text-brand-accent">{SITE_CONFIG.about.stats[0].value}</p>
                  <p className="font-body text-xs text-brand-ghost uppercase tracking-widest mt-1">{SITE_CONFIG.about.stats[0].label}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio text */}
            <AnimatedSection direction="right" className="space-y-6">
              <h2 className="font-display text-display-md text-brand-mist">
                {SITE_CONFIG.about.headline}
              </h2>

              {SITE_CONFIG.about.bio.map((para, i) => (
                <p key={i} className="text-brand-ghost text-base leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Mission */}
              <div className="border-l-2 border-brand-accent pl-6 py-2 bg-brand-steel/50">
                <p className="eyebrow mb-2">My Mission</p>
                <p className="font-display text-lg text-brand-mist italic">
                  "{SITE_CONFIG.about.mission}"
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/contact" className="btn-primary">Work With Me →</Link>
                <Link href="/portfolio" className="btn-secondary">View Portfolio</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── STATS ROW ── */}
        <section className="py-16 bg-brand-ink border-y border-brand-rule">
          <div className="section-wrapper grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {SITE_CONFIG.about.stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <p className="font-display text-5xl text-brand-accent">{stat.value}</p>
                <p className="font-body text-xs text-brand-ghost uppercase tracking-widest mt-2">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">
            <SectionHeading
              eyebrow="Skills & Expertise"
              title="What I Bring to Every Project"
              subtitle="Years of practice condensed into core capabilities — and I'm still sharpening them."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl">
              {SITE_CONFIG.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="section-pad bg-brand-ink">
          <div className="section-wrapper">
            <SectionHeading
              eyebrow="How I Work"
              title="My Process"
              subtitle="Simple, transparent, and built around your goals."
              center
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery',    desc: 'We talk about your goals, audience, tone, and competitors. I listen more than I speak.' },
                { step: '02', title: 'Research',     desc: 'I deep-dive into your niche, study what works, and identify the angle that\'ll resonate.' },
                { step: '03', title: 'Write',        desc: 'First draft in 48 hours. Clean, direct, and built on the brief — not guesswork.' },
                { step: '04', title: 'Refine',       desc: 'Up to 2 revision rounds. We polish until it\'s exactly right, then I deliver the final file.' },
              ].map((item, i) => (
                <AnimatedSection key={item.step} delay={i * 100}>
                  <div className="bg-brand-steel border border-brand-rule p-6 h-full">
                    <p className="font-display text-5xl text-brand-accent/20 font-bold mb-4">{item.step}</p>
                    <h3 className="font-display text-xl text-brand-mist mb-3">{item.title}</h3>
                    <p className="text-brand-ghost text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />

      </Layout>
    </>
  );
}
