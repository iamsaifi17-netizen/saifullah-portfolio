// pages/portfolio.js - Enhanced with DB projects + 3D tilt + image hover zoom

import { useState, useEffect, useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

const FILTERS = ['All', 'Websites', 'Web Apps', 'Mobile Apps', 'AI Projects', 'Healthcare'];

function matchesFilter(project, filter) {
  if (filter === 'All') return true;
  const cat = (project.category || '').toLowerCase();
  const map = {
    'Websites':    ['business website','education website','portfolio website','landing page'],
    'Web Apps':    ['web application','saas','ai software'],
    'Mobile Apps': ['mobile app','business software','restaurant software'],
    'AI Projects': ['ai software','ai project'],
    'Healthcare':  ['healthcare','hospital'],
  };
  return (map[filter] || []).some(c => cat.includes(c));
}

function StatusBadge({ status }) {
  const map = {
    'completed':      { label: 'Completed',   cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
    'coming-soon':    { label: 'Coming Soon', cls: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    'in-development': { label: 'In Dev',      cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  };
  const s = map[status] || map['completed'];
  return (
    <span className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border ${s.cls}`}>
      {s.label}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) scale3d(1.018,1.018,1.018)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  const imgSrc = project.image_url || project.image;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      ref={cardRef}
      className="group relative bg-brand-steel border border-brand-rule overflow-hidden transition-all duration-500 hover:border-brand-accent/50 hover:shadow-[0_20px_60px_rgba(200,169,110,0.10)]"
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-52 overflow-hidden bg-brand-ink">
        {imgSrc ? (
          <>
            <img src={imgSrc} alt={project.title} loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-brand-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {(project.liveUrl || project.live_url) ? (
                  <a href={project.liveUrl || project.live_url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm py-2.5 px-6" onClick={e => e.stopPropagation()}>
                    View Live Site →
                  </a>
                ) : (
                  <span className="font-body text-xs text-brand-mist border border-brand-rule px-5 py-2.5 bg-brand-ink/80">
                    {project.status === 'coming-soon' ? 'Coming Soon' : project.status === 'in-development' ? 'In Development' : 'Private Project'}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-accent/5 to-transparent">
            <span className="font-display text-7xl font-bold text-brand-accent/10 select-none">
              {String(project.id || index + 1).padStart(2, '0')}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest bg-brand-ink/80 border border-brand-rule px-2.5 py-1 text-brand-accent">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status || 'completed'} />
        </div>
      </div>

      <div className="p-6">
        <p className="font-body text-xs text-brand-ghost mb-1.5">{project.client}</p>
        <h3 className="font-display text-xl text-brand-mist mb-3 leading-snug group-hover:text-brand-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-brand-ghost text-sm leading-relaxed mb-5 line-clamp-3">
          {project.short_desc || project.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {(project.tags || []).slice(0, 4).map(tag => (
            <span key={tag} className="font-body text-[10px] text-brand-ghost border border-brand-rule px-2 py-0.5 group-hover:border-brand-accent/30 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-rule items-center">
          {Object.entries(project.metrics || {}).slice(0, 3).map(([k, v]) => (
            <div key={k}>
              <p className="font-display text-base font-semibold text-brand-accent">{v}</p>
              <p className="font-body text-[10px] text-brand-ghost uppercase tracking-wider">{k}</p>
            </div>
          ))}
          {(project.liveUrl || project.live_url) && (
            <a href={project.liveUrl || project.live_url} target="_blank" rel="noopener noreferrer"
              className="ml-auto btn-ghost text-xs">Visit →</a>
          )}
        </div>
      </div>
      <div className="absolute inset-0 border border-brand-accent/0 group-hover:border-brand-accent/15 transition-all duration-500 pointer-events-none" />
    </motion.article>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [dbProjects, setDbProjects] = useState([]);

  useEffect(() => {
    fetch('/api/public/projects')
      .then(r => r.json())
      .then(d => setDbProjects(Array.isArray(d) ? d : []))
      .catch(() => setDbProjects([]));
  }, []);

  const staticProjects = SITE_CONFIG.portfolio || [];
  const staticTitles   = new Set(staticProjects.map(p => p.title?.toLowerCase()));
  const uniqueDb       = dbProjects.filter(p => !staticTitles.has(p.title?.toLowerCase()));
  const allProjects    = [...staticProjects, ...uniqueDb];
  const filtered       = allProjects.filter(p => matchesFilter(p, activeFilter));

  return (
    <>
      <NextSeo
        title={`Portfolio | ${SITE_CONFIG.name}`}
        description="Real websites, mobile apps, hospital management systems, and AI software by Muhammad Saifullah."
      />
      <Layout>
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Portfolio</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                Real Work. <span className="text-gold-shimmer">Real Results.</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Websites, mobile apps, hospital management systems, and AI-powered software — built for real businesses worldwide.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">
            <AnimatedSection className="flex flex-wrap gap-3 mb-12">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`font-body text-xs font-semibold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                    activeFilter === f
                      ? 'bg-brand-accent text-brand-ink border-brand-accent'
                      : 'border-brand-rule text-brand-ghost hover:border-brand-accent hover:text-brand-accent'
                  }`}>
                  {f}
                </button>
              ))}
              <span className="ml-auto font-body text-xs text-brand-ghost self-center">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </AnimatedSection>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id || project.title} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-brand-ghost text-sm">No projects in this category yet.</p>
              </div>
            )}

            <AnimatedSection className="mt-16 text-center">
              <p className="text-brand-ghost text-sm">
                More projects available on request.{' '}
                <Link href="/contact" className="text-brand-accent hover:underline">Get in touch →</Link>
              </p>
            </AnimatedSection>
          </div>
        </section>
        <CTABanner />
      </Layout>
    </>
  );
}
