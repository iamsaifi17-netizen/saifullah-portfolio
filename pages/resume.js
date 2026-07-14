// pages/resume.js
// ── RESUME PAGE ──────────────────────────────────────────────────────────────
// All data comes from lib/config.js → SITE_CONFIG.resume

import { NextSeo } from 'next-seo';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/sections/CTABanner';
import { SITE_CONFIG } from '../lib/config';

const { resume, name, email, phone, location } = SITE_CONFIG;

function SkillBadge({ skill }) {
  return (
    <span className="inline-block border border-brand-accent/40 text-brand-accent font-body text-xs font-medium px-3 py-1.5 hover:bg-brand-accent hover:text-brand-ink transition-all duration-200">
      {skill}
    </span>
  );
}

function ExperienceCard({ job, index }) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="relative pl-8 pb-10 border-l border-brand-rule last:pb-0">
        {/* Timeline dot */}
        <div className="absolute -left-2 top-0 w-4 h-4 bg-brand-accent rounded-none border-2 border-brand-ink" />
        <div className="bg-brand-steel border border-brand-rule p-6 hover:border-brand-accent/40 transition-all duration-300">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
            <div>
              <h3 className="font-display text-xl text-brand-mist">{job.title}</h3>
              <p className="font-body text-sm text-brand-accent mt-1">{job.company}</p>
            </div>
            <span className="font-body text-xs text-brand-ghost border border-brand-rule px-3 py-1 flex-shrink-0">
              {job.period}
            </span>
          </div>
          <ul className="space-y-2">
            {job.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-brand-ghost text-sm">
                <span className="text-brand-accent mt-0.5 flex-shrink-0">◆</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ResumePage() {
  return (
    <>
      <NextSeo
        title={`Resume | ${name}`}
        description={`Professional resume of ${name} — Frontend Web Developer & Web Designer from Pakistan.`}
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Resume</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                My <span className="text-gold-shimmer">Professional Profile</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Frontend Web Developer & Web Designer — building modern websites for businesses and personal brands worldwide.
              </p>
              {/* Download button */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={resume.downloadUrl} download className="btn-primary">
                  ⬇ Download Resume (PDF)
                </a>
                <a href={`mailto:${email}`} className="btn-secondary">
                  Hire Me →
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── RESUME CONTENT ── */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── LEFT SIDEBAR ── */}
              <div className="lg:col-span-1 space-y-8">

                {/* Contact Info */}
                <AnimatedSection>
                  <div className="bg-brand-steel border border-brand-rule p-6">
                    <h3 className="eyebrow mb-4">Contact</h3>
                    <ul className="space-y-3">
                      {[
                        { icon: '✉', label: email,    href: `mailto:${email}` },
                        { icon: '📞', label: phone,    href: `tel:${phone}` },
                        { icon: '📍', label: location, href: null },
                        { icon: '🌐', label: 'Portfolio Website', href: SITE_CONFIG.seo.siteUrl },
                      ].map((item) => (
                        <li key={item.label}>
                          {item.href ? (
                            <a href={item.href} className="flex items-center gap-2 text-brand-ghost text-sm hover:text-brand-accent transition-colors">
                              <span>{item.icon}</span> {item.label}
                            </a>
                          ) : (
                            <span className="flex items-center gap-2 text-brand-ghost text-sm">
                              <span>{item.icon}</span> {item.label}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

                {/* Education */}
                <AnimatedSection delay={100}>
                  <div className="bg-brand-steel border border-brand-rule p-6">
                    <h3 className="eyebrow mb-4">Education</h3>
                    <div className="space-y-4">
                      {resume.education.map((edu, i) => (
                        <div key={i} className="border-l-2 border-brand-accent pl-4">
                          <p className="font-body text-sm font-semibold text-brand-mist">{edu.degree}</p>
                          <p className="font-body text-xs text-brand-ghost mt-0.5">{edu.school}</p>
                          <p className="font-body text-xs text-brand-accent mt-0.5">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* AI Tools */}
                <AnimatedSection delay={200}>
                  <div className="bg-brand-steel border border-brand-rule p-6">
                    <h3 className="eyebrow mb-4">AI Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.aiTools.map(tool => <SkillBadge key={tool} skill={tool} />)}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Languages */}
                <AnimatedSection delay={300}>
                  <div className="bg-brand-steel border border-brand-rule p-6">
                    <h3 className="eyebrow mb-4">Languages</h3>
                    <ul className="space-y-1.5">
                      {resume.languages.map(lang => (
                        <li key={lang} className="text-brand-ghost text-sm flex items-center gap-2">
                          <span className="text-brand-accent text-xs">◆</span> {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

              </div>

              {/* ── RIGHT MAIN CONTENT ── */}
              <div className="lg:col-span-2 space-y-12">

                {/* Professional Summary */}
                <AnimatedSection>
                  <h2 className="font-display text-2xl text-brand-mist mb-4">Professional Summary</h2>
                  <div className="border-l-2 border-brand-accent pl-6">
                    <p className="text-brand-ghost text-base leading-relaxed">{resume.summary}</p>
                  </div>
                </AnimatedSection>

                {/* Tech Skills */}
                <AnimatedSection delay={100}>
                  <h2 className="font-display text-2xl text-brand-mist mb-5">Technical Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.techSkills.map(skill => <SkillBadge key={skill} skill={skill} />)}
                  </div>
                </AnimatedSection>

                {/* Content Skills */}
                <AnimatedSection delay={150}>
                  <h2 className="font-display text-2xl text-brand-mist mb-5">Content & Writing Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.contentSkills.map(skill => <SkillBadge key={skill} skill={skill} />)}
                  </div>
                </AnimatedSection>

                {/* Experience */}
                <div>
                  <AnimatedSection>
                    <h2 className="font-display text-2xl text-brand-mist mb-8">Experience</h2>
                  </AnimatedSection>
                  {resume.experience.map((job, i) => (
                    <ExperienceCard key={i} job={job} index={i} />
                  ))}
                </div>

                {/* Download CTA */}
                <AnimatedSection>
                  <div className="bg-brand-steel border border-brand-accent/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="font-display text-xl text-brand-mist">Want the full PDF version?</p>
                      <p className="text-brand-ghost text-sm mt-1">Download my complete resume to share or print.</p>
                    </div>
                    <a href={resume.downloadUrl} download className="btn-primary flex-shrink-0">
                      ⬇ Download PDF
                    </a>
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
