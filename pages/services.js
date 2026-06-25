// pages/services.js
// ── SERVICES PAGE ────────────────────────────────────────────────────────────

import { NextSeo } from 'next-seo';
import Layout from '../components/layout/Layout';
import Services from '../components/sections/Services';
import CTABanner from '../components/sections/CTABanner';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../lib/config';

export default function ServicesPage() {
  return (
    <>
      <NextSeo
        title={`Services | ${SITE_CONFIG.name}`}
        description="Copywriting, LinkedIn content, AI-assisted writing, and social media content. Clear pricing, fast turnaround, real results."
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Services</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                Words That Work <span className="text-gold-shimmer">For You</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Choose the service that fits your need — or combine them for a complete content strategy. All projects come with clear timelines, honest pricing, and a satisfaction guarantee.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* All 4 services */}
        <Services preview={false} />

        {/* Why choose me */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">
            <AnimatedSection className="text-center mb-14">
              <p className="eyebrow mb-3">Why Me</p>
              <h2 className="font-display text-display-md text-brand-mist">The Saifullah Difference</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '⚡', title: '48-Hour Delivery',     desc: 'Most projects delivered in 2 days. I respect your time because I respect my own.' },
                { icon: '🎯', title: 'Results-First Mindset', desc: 'I write to achieve outcomes — clicks, signups, sales — not just to fill word counts.' },
                { icon: '🌍', title: 'International Experience', desc: 'I\'ve worked with clients from 10+ countries. I understand global audiences and tone adaptation.' },
                { icon: '🔄', title: 'Free Revisions',       desc: '2 rounds of revisions included in every project — because your satisfaction is non-negotiable.' },
                { icon: '🤝', title: 'Clear Communication',  desc: 'You\'ll always know what I\'m working on, where we stand, and when to expect the draft.' },
                { icon: '🧠', title: 'Strategy + Craft',      desc: 'Not just a writer — a strategic thinker. Every piece connects to a bigger goal.' },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 80}>
                  <div className="card h-full">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="font-display text-xl text-brand-mist mb-2">{item.title}</h3>
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
