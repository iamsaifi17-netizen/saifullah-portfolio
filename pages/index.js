// pages/index.js
// ── HOME PAGE ─────────────────────────────────────────────────────────────────
// This is the main landing page. Import and arrange sections as you like.

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTABanner from '../components/sections/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../lib/config';

// ── PORTFOLIO PREVIEW (home page only) ───────────────────────────────────────
function PortfolioPreview() {
  const featured = SITE_CONFIG.portfolio.slice(0, 3);

  return (
    <section className="section-pad bg-brand-slate">
      <div className="section-wrapper">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          subtitle="Real results from real projects. Every number you see came from actual client campaigns."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 100}>
              <div className="group bg-brand-steel border border-brand-rule hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Image placeholder */}
                <div className="h-48 bg-brand-ink flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent" />
                  <span className="font-display text-6xl text-brand-accent/20">{String(i + 1).padStart(2, '0')}</span>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-brand-accent/20 border border-brand-accent/30 px-2.5 py-1">
                    <span className="font-body text-[10px] text-brand-accent font-semibold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl text-brand-mist mb-2 group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-ghost text-xs mb-4 leading-relaxed line-clamp-3">
                    {project.excerpt}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-brand-rule">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <p className="font-display text-lg text-brand-accent font-semibold">{val}</p>
                        <p className="font-body text-[10px] text-brand-ghost uppercase tracking-wider">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={300}>
          <Link href="/portfolio" className="btn-secondary">
            View Full Portfolio →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── BLOG PREVIEW (home page) ──────────────────────────────────────────────────
function BlogPreview() {
  const posts = SITE_CONFIG.blogPosts;

  return (
    <section className="section-pad bg-brand-ink">
      <div className="section-wrapper">
        <SectionHeading
          eyebrow="From the Blog"
          title="Insights on Writing &amp; Strategy"
          subtitle="Practical advice on copywriting, LinkedIn content, and building your brand through words."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="h-full bg-brand-steel border border-brand-rule group-hover:border-brand-accent/40 transition-all duration-300 group-hover:-translate-y-1">
                  {/* Image placeholder */}
                  <div className="h-40 bg-brand-ink relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent" />
                    <div className="absolute top-4 left-4 bg-brand-ink/80 border border-brand-rule px-2.5 py-1">
                      <span className="font-body text-[10px] text-brand-accent font-semibold uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-body text-[11px] text-brand-ghost">{post.date}</span>
                      <span className="text-brand-rule">·</span>
                      <span className="font-body text-[11px] text-brand-ghost">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl text-brand-mist group-hover:text-brand-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-brand-ghost text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-brand-accent text-xs font-body font-medium">
                      Read Article →
                    </p>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={300}>
          <Link href="/blog" className="btn-secondary">
            Read All Articles →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── MAIN HOME PAGE ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <NextSeo
        title={SITE_CONFIG.seo.title}
        description={SITE_CONFIG.seo.description}
      />
      <Layout>
        {/* Hero section */}
        <Hero />

        {/* Brief intro strip */}
        <div className="bg-brand-slate border-y border-brand-rule py-10">
          <div className="section-wrapper">
            <AnimatedSection className="flex flex-wrap items-center justify-between gap-6">
              <p className="font-display text-xl text-brand-mist max-w-2xl italic">
                "Every great brand has a story. I help you tell yours — with copy that converts, content that builds trust, and words that last."
              </p>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-brand-ghost uppercase tracking-widest">— {SITE_CONFIG.name}</span>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Services (preview — 3 cards) */}
        <Services preview={true} />

        {/* Portfolio preview */}
        <PortfolioPreview />

        {/* Testimonials */}
        <Testimonials />

        {/* Blog preview */}
        <BlogPreview />

        {/* FAQ */}
        <FAQ />

        {/* CTA banner */}
        <CTABanner />
      </Layout>
    </>
  );
}
