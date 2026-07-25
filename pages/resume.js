// pages/resume.js — Light theme, Full Stack Developer

import { NextSeo } from 'next-seo';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';
import { motion } from 'framer-motion';

const { resume } = SITE_CONFIG;

function SkillBadge({ skill }) {
  return (
    <span className="inline-block border border-brand-accent/50 text-brand-accent bg-brand-accent/5 font-body text-xs font-medium px-3 py-1.5 hover:bg-brand-accent hover:text-white transition-all duration-200">
      {skill}
    </span>
  );
}

export default function ResumePage() {
  return (
    <>
      <NextSeo title={`Resume | ${SITE_CONFIG.name}`} description={`Resume of ${SITE_CONFIG.name} — Web Designer & Full Stack Developer.`} />
      <Layout>

        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #C8A96B33 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Resume</p>
              <h1 className="font-display text-display-lg text-brand-ink">
                My <span className="text-brand-accent">Professional Profile</span>
              </h1>
              <p className="mt-4 text-brand-muted text-lg max-w-2xl">Web Designer & Full Stack Developer — building modern websites for businesses and personal brands worldwide.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={resume.downloadUrl} download className="btn-primary">⬇ Download Resume (PDF)</a>
                <a href={SITE_CONFIG.whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Hire Me on WhatsApp</a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="section-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <AnimatedSection>
                  <div className="bg-brand-bg border border-brand-rule p-6">
                    <p className="eyebrow mb-4">Contact</p>
                    <ul className="space-y-3">
                      {[
                        { icon: '✉', label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                        { icon: '📞', label: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                        { icon: '📍', label: SITE_CONFIG.location, href: null },
                        { icon: '🌐', label: 'Portfolio Website', href: SITE_CONFIG.seo.siteUrl },
                      ].map(item => (
                        <li key={item.label}>
                          {item.href ? (
                            <a href={item.href} className="flex items-center gap-2 text-brand-muted text-sm hover:text-brand-accent transition-colors">
                              <span>{item.icon}</span> {item.label}
                            </a>
                          ) : (
                            <span className="flex items-center gap-2 text-brand-muted text-sm"><span>{item.icon}</span> {item.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  <div className="bg-brand-bg border border-brand-rule p-6">
                    <p className="eyebrow mb-4">Education</p>
                    <div className="space-y-4">
                      {resume.education.map((edu, i) => (
                        <div key={i} className="border-l-2 border-brand-accent pl-4">
                          <p className="font-body text-sm font-semibold text-brand-ink">{edu.degree}</p>
                          <p className="font-body text-xs text-brand-muted mt-0.5">{edu.school}</p>
                          <p className="font-body text-xs text-brand-accent mt-0.5">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <div className="bg-brand-bg border border-brand-rule p-6">
                    <p className="eyebrow mb-4">AI Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {resume.aiTools.map(tool => <SkillBadge key={tool} skill={tool} />)}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="bg-brand-bg border border-brand-rule p-6">
                    <p className="eyebrow mb-4">Languages</p>
                    <ul className="space-y-1.5">
                      {resume.languages.map(lang => (
                        <li key={lang} className="text-brand-muted text-sm flex items-center gap-2">
                          <span className="text-brand-accent text-xs">✓</span> {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">

                <AnimatedSection>
                  <h2 className="font-display text-2xl text-brand-ink mb-4">Professional Summary</h2>
                  <div className="border-l-2 border-brand-accent pl-6">
                    <p className="text-brand-muted text-base leading-relaxed">{resume.summary}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  <h2 className="font-display text-2xl text-brand-ink mb-5">Technical Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.techSkills.map(s => <SkillBadge key={s} skill={s} />)}
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={150}>
                  <h2 className="font-display text-2xl text-brand-ink mb-8">Experience</h2>
                  <div className="space-y-6">
                    {resume.experience.map((job, i) => (
                      <div key={i} className="relative pl-8 pb-8 border-l-2 border-brand-rule last:pb-0">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-brand-accent border-2 border-white" />
                        <div className="bg-brand-bg border border-brand-rule p-6 hover:border-brand-accent/40 transition-colors">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                            <div>
                              <h3 className="font-display text-xl text-brand-ink">{job.title}</h3>
                              <p className="font-body text-sm text-brand-accent mt-1">{job.company}</p>
                            </div>
                            <span className="font-body text-xs text-brand-muted border border-brand-rule px-3 py-1">{job.period}</span>
                          </div>
                          <ul className="space-y-2">
                            {job.points.map((point, j) => (
                              <li key={j} className="flex items-start gap-2.5 text-brand-muted text-sm">
                                <span className="text-brand-accent mt-0.5 flex-shrink-0">◆</span> {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-brand-bg border border-brand-accent/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="font-display text-xl text-brand-ink">Want the full PDF version?</p>
                      <p className="text-brand-muted text-sm mt-1">Download my complete resume to share or print.</p>
                    </div>
                    <a href={resume.downloadUrl} download className="btn-primary flex-shrink-0">⬇ Download PDF</a>
                  </div>
                </AnimatedSection>

              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </Layout>
    </>
  );
}
