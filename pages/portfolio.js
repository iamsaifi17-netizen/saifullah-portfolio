// pages/portfolio.js — Light theme with live buttons

import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

const allCats = ['All', ...new Set(SITE_CONFIG.portfolio.map(p => p.category))];

function ProjectCard({ project, index }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white border border-brand-rule shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-48 bg-brand-bg-alt relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-7xl font-bold text-brand-accent/10">{String(project.id).padStart(2,'0')}</span>
        </div>
        <div className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{project.category}</div>
        {project.liveUrl && (
          <div className="absolute top-4 right-4 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="bg-white/80 border border-brand-rule text-brand-muted text-[10px] px-2 py-0.5">{tag}</span>
          ))}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="font-body text-xs text-brand-muted mb-1">{project.client}</p>
        <h3 className="font-display text-xl text-brand-ink mb-3">{project.title}</h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-4 flex-grow">{project.excerpt}</p>
        <div className="flex flex-wrap gap-3 pt-4 border-t border-brand-rule">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k}>
              <p className="font-display text-base text-brand-accent font-semibold">{v}</p>
              <p className="font-body text-[10px] text-brand-muted uppercase tracking-wider">{k}</p>
            </div>
          ))}
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full justify-center mt-4 text-xs py-2.5">
            Visit Live Website ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? SITE_CONFIG.portfolio : SITE_CONFIG.portfolio.filter(p => p.category === active);

  return (
    <>
      <NextSeo title={`Portfolio | ${SITE_CONFIG.name}`} description="Real websites built by Muhammad Saifullah — live business sites, portfolios, and educational websites." />
      <Layout>
        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #C8A96B33 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Portfolio</p>
              <h1 className="font-display text-display-lg text-brand-ink">Real Work. <span className="text-brand-accent">Real Results.</span></h1>
              <p className="mt-4 text-brand-muted text-lg max-w-2xl">Live websites I have designed and developed for real clients. Click to visit each one.</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="section-wrapper">
            <AnimatedSection className="flex flex-wrap gap-3 mb-12">
              {allCats.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`font-body text-xs font-semibold uppercase tracking-widest px-4 py-2 border-2 transition-all duration-200 ${
                    active === cat ? 'bg-brand-accent text-white border-brand-accent' : 'border-brand-rule text-brand-muted hover:border-brand-accent hover:text-brand-accent'
                  }`}>
                  {cat}
                </button>
              ))}
            </AnimatedSection>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </AnimatePresence>
            </motion.div>
            <AnimatedSection className="mt-16 text-center">
              <p className="text-brand-muted text-sm">More projects available on request. <a href={SITE_CONFIG.whatsappMsg} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Chat on WhatsApp →</a></p>
            </AnimatedSection>
          </div>
        </section>

        <CTABanner />
      </Layout>
    </>
  );
}
