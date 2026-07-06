// pages/portfolio.js
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

const allCategories = ['All', ...new Set(SITE_CONFIG.portfolio.map(p => p.category))];

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-brand-steel border border-brand-rule hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="h-52 bg-brand-ink relative overflow-hidden flex-shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-7xl font-bold text-brand-accent/10">
            {String(project.id).padStart(2, '0')}
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-brand-ink/80 border border-brand-rule px-2.5 py-1">
          <span className="font-body text-[10px] text-brand-accent font-semibold uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        {/* Live badge */}
        {project.liveUrl && (
          <div className="absolute top-4 right-4 bg-green-500/20 border border-green-500/40 px-2.5 py-1 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-body text-[10px] text-green-400 font-semibold uppercase tracking-widest">Live</span>
          </div>
        )}
        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="bg-brand-ink/70 border border-brand-rule px-2 py-0.5 font-body text-[10px] text-brand-ghost">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="font-body text-xs text-brand-ghost mb-2">{project.client}</p>
        <h3 className="font-display text-xl text-brand-mist mb-3 group-hover:text-brand-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-brand-ghost text-sm leading-relaxed mb-5 flex-grow">
          {project.excerpt}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-rule mb-4">
          {Object.entries(project.metrics).map(([key, val]) => (
            <div key={key}>
              <p className="font-display text-lg font-semibold text-brand-accent">{val}</p>
              <p className="font-body text-[10px] text-brand-ghost uppercase tracking-wider">{key}</p>
            </div>
          ))}
        </div>

        {/* Visit Website button — only shows if liveUrl exists */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 justify-center w-full"
          >
            Visit Live Website →
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? SITE_CONFIG.portfolio
    : SITE_CONFIG.portfolio.filter(p => p.category === activeCategory);

  return (
    <>
      <NextSeo
        title={`Portfolio | ${SITE_CONFIG.name}`}
        description="Real websites and writing projects by Muhammad Saifullah — web developer and copywriter from Pakistan."
      />
      <Layout>
        {/* PAGE HERO */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Portfolio</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                Real Work. <span className="text-gold-shimmer">Real Results.</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Live websites I have built and writing samples I have created. Click "Visit Live Website" to see my web development work in action.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">

            {/* Category filter */}
            <AnimatedSection className="flex flex-wrap gap-3 mb-12">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-xs font-semibold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-brand-accent text-brand-ink border-brand-accent'
                      : 'border-brand-rule text-brand-ghost hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </AnimatedSection>

            {/* Projects grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatedSection className="mt-16 text-center">
              <p className="text-brand-ghost text-sm">
                More projects available on request.{' '}
                <a href="/contact" className="text-brand-accent hover:underline">
                  Get in touch →
                </a>
              </p>
            </AnimatedSection>
          </div>
        </section>

        <CTABanner />
      </Layout>
    </>
  );
}
