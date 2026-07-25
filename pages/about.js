// pages/about.js — Light theme, Full Stack Developer

import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

function SkillBar({ name, level, index }) {
  return (
    <AnimatedSection delay={index * 60}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-sm text-brand-ink font-medium">{name}</span>
          <span className="font-body text-xs text-brand-accent font-semibold">{level}%</span>
        </div>
        <div className="h-1.5 bg-brand-rule rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.06, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-full"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function AboutPage() {
  return (
    <>
      <NextSeo title={`About | ${SITE_CONFIG.name}`} description={`Learn about ${SITE_CONFIG.name} — Web Designer & Full Stack Developer from Pakistan.`} />
      <Layout>

        {/* HERO */}
        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #C8A96B33 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">About Me</p>
              <h1 className="font-display text-display-lg text-brand-ink">
                The Developer Behind <span className="text-brand-accent">the Design</span>
              </h1>
            </AnimatedSection>
          </div>
        </section>

        {/* BIO + PHOTO */}
        <section className="section-pad bg-white">
          <div className="section-wrapper grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-accent/20" />
                <div className="relative aspect-[4/5] max-w-md bg-brand-bg-alt overflow-hidden shadow-card-lg">
                  <Image src="/images/profile.jpg" alt={SITE_CONFIG.name} fill className="object-cover object-top" sizes="500px" />
                </div>
                <div className="absolute -bottom-6 right-0 bg-white border border-brand-rule shadow-card-lg px-6 py-4">
                  <p className="font-display text-3xl text-brand-accent">{SITE_CONFIG.about.stats[0].value}</p>
                  <p className="font-body text-xs text-brand-muted uppercase tracking-widest mt-1">{SITE_CONFIG.about.stats[0].label}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <h2 className="font-display text-display-md text-brand-ink">{SITE_CONFIG.about.headline}</h2>
              {SITE_CONFIG.about.bio.map((para, i) => (
                <p key={i} className="text-brand-muted text-base leading-relaxed">{para}</p>
              ))}
              <div className="border-l-4 border-brand-accent pl-6 py-2 bg-brand-bg">
                <p className="eyebrow mb-2">My Mission</p>
                <p className="font-display text-lg text-brand-ink italic">"{SITE_CONFIG.about.mission}"</p>
              </div>
              <div className="flex gap-4 pt-4">
                <a href={SITE_CONFIG.whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Hire Me on WhatsApp</a>
                <Link href="/portfolio" className="btn-secondary">View Portfolio</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-brand-bg border-y border-brand-rule">
          <div className="section-wrapper grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {SITE_CONFIG.about.stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <p className="font-display text-5xl text-brand-accent">{stat.value}</p>
                <p className="font-body text-xs text-brand-muted uppercase tracking-widest mt-2">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section-pad bg-white">
          <div className="section-wrapper">
            <SectionHeading eyebrow="Skills" title="What I Bring to Every Project" subtitle="Years of self-taught development and design skills — always learning, always improving." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl">
              {SITE_CONFIG.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-pad bg-brand-bg">
          <div className="section-wrapper">
            <SectionHeading eyebrow="How I Work" title="My Process" subtitle="Simple, transparent, and built around your goals." center />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery',  desc: 'We talk about your goals, audience, and brand. I listen and ask the right questions.' },
                { step: '02', title: 'Design',     desc: 'I create a clean, modern design that matches your brand and impresses your visitors.' },
                { step: '03', title: 'Develop',    desc: 'I build your website with clean code — fast, responsive, and ready for any device.' },
                { step: '04', title: 'Launch',     desc: 'Your website goes live on Vercel. I deliver a guide and stay available for support.' },
              ].map((item, i) => (
                <AnimatedSection key={item.step} delay={i * 100}>
                  <div className="bg-white border border-brand-rule shadow-card p-6 h-full hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300">
                    <p className="font-display text-5xl text-brand-accent/20 font-bold mb-4">{item.step}</p>
                    <h3 className="font-display text-xl text-brand-ink mb-3">{item.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
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
