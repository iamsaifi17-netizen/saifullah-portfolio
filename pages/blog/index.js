// pages/blog/index.js
// ── BLOG INDEX PAGE ───────────────────────────────────────────────────────────
// ✏️ Add new posts in lib/config.js → SITE_CONFIG.blogPosts
// ✏️ Create individual post pages at pages/blog/[your-slug].js

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import AnimatedSection from '../../components/ui/AnimatedSection';
import SectionHeading from '../../components/ui/SectionHeading';
import { SITE_CONFIG } from '../../lib/config';

function BlogCard({ post, featured = false }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`bg-brand-steel border border-brand-rule group-hover:border-brand-accent/40 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden h-full flex flex-col ${
          featured ? 'md:flex-row' : ''
        }`}
      >
        {/* Image placeholder */}
        <div className={`bg-brand-ink relative overflow-hidden flex-shrink-0 ${featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent" />
          <div className="absolute top-4 left-4 bg-brand-ink/80 border border-brand-rule px-2.5 py-1">
            <span className="font-body text-[10px] text-brand-accent font-semibold uppercase tracking-widest">
              {post.category}
            </span>
          </div>
          {featured && (
            <div className="absolute bottom-4 left-4 bg-brand-accent px-3 py-1">
              <span className="font-body text-[10px] font-bold text-brand-ink uppercase tracking-widest">Featured</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-body text-[11px] text-brand-ghost">{post.date}</span>
            <span className="text-brand-rule">·</span>
            <span className="font-body text-[11px] text-brand-ghost">{post.readTime}</span>
          </div>
          <h2 className={`font-display text-brand-mist group-hover:text-brand-accent transition-colors leading-snug flex-grow ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
          <p className="mt-3 text-brand-ghost text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <p className="mt-5 text-brand-accent text-xs font-body font-semibold uppercase tracking-widest">
            Read Article →
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = SITE_CONFIG.blogPosts;

  return (
    <>
      <NextSeo
        title={`Blog | ${SITE_CONFIG.name}`}
        description="Insights on copywriting, LinkedIn strategy, AI content, and building brands through words."
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Blog</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                Writing About <span className="text-gold-shimmer">Writing</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Practical advice on copywriting craft, LinkedIn strategy, AI tools, and building a brand through words. New articles every week.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── BLOG CONTENT ── */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper">

            {/* Featured post */}
            {featured && (
              <AnimatedSection className="mb-10">
                <BlogCard post={featured} featured={true} />
              </AnimatedSection>
            )}

            {/* Remaining posts grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((post, i) => (
                  <AnimatedSection key={post.slug} delay={i * 100}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            )}

            {/* Coming soon note */}
            <AnimatedSection className="mt-16 text-center border border-dashed border-brand-rule py-12">
              <p className="font-display text-xl text-brand-mist mb-2">More Articles Coming Soon</p>
              <p className="text-brand-ghost text-sm max-w-md mx-auto">
                I publish new content every week on copywriting, LinkedIn strategy, and brand building. Check back soon.
              </p>
            </AnimatedSection>

          </div>
        </section>

      </Layout>
    </>
  );
}
