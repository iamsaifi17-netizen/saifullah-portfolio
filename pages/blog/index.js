// pages/blog/index.js
// ── BLOG INDEX PAGE ───────────────────────────────────────────────────────────

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../../lib/config';

// Category color map
const categoryColors = {
  'Business':        'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Web Development': 'text-green-400 border-green-400/30 bg-green-400/10',
  'AI Content':      'text-orange-400 border-orange-400/30 bg-orange-400/10',
  'Research':        'text-purple-400 border-purple-400/30 bg-purple-400/10',
};

function CategoryBadge({ category }) {
  const color = categoryColors[category] || 'text-brand-accent border-brand-accent/30 bg-brand-accent/10';
  return (
    <span className={`font-body text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 border ${color}`}>
      {category}
    </span>
  );
}

function FeaturedCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white border border-brand-rule group-hover:border-brand-accent/40 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden md:flex">
        {/* Image */}
        <div className="md:w-1/2 h-56 md:h-auto bg-brand-bg relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/12 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl font-bold text-brand-accent/8 select-none">01</span>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <CategoryBadge category={post.category} />
            <span className="font-body text-[10px] text-brand-muted bg-white/70 px-2 py-1 border border-brand-rule">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-xs text-brand-muted">{post.date}</span>
            <span className="text-brand-rule">·</span>
            <span className="font-body text-xs text-brand-muted">{post.readTime}</span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl text-brand-ink group-hover:text-brand-accent transition-colors leading-snug mb-4">
            {post.title}
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <span className="text-brand-accent text-xs font-body font-semibold uppercase tracking-widest">
            Read Article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function BlogCard({ post, index }) {
  return (
    <AnimatedSection delay={index * 100}>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="h-full bg-white border border-brand-rule group-hover:border-brand-accent/40 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col">
          {/* Image */}
          <div className="h-44 bg-brand-bg relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/8 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl font-bold text-brand-accent/8 select-none">
                {String(index + 2).padStart(2, '0')}
              </span>
            </div>
            <div className="absolute top-4 left-4">
              <CategoryBadge category={post.category} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-[11px] text-brand-muted">{post.date}</span>
              <span className="text-brand-rule">·</span>
              <span className="font-body text-[11px] text-brand-muted">{post.readTime}</span>
            </div>
            <h2 className="font-display text-xl text-brand-ink group-hover:text-brand-accent transition-colors leading-snug mb-3 flex-grow">
              {post.title}
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed line-clamp-3 mb-5">
              {post.excerpt}
            </p>
            <span className="text-brand-accent text-xs font-body font-semibold uppercase tracking-widest">
              Read Article →
            </span>
          </div>
        </article>
      </Link>
    </AnimatedSection>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = SITE_CONFIG.blogPosts;

  return (
    <>
      <NextSeo
        title={`Blog | ${SITE_CONFIG.name}`}
        description="Practical articles on web development, website copy, LinkedIn strategy, and freelancing — by Muhammad Saifullah."
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Blog</p>
              <h1 className="font-display text-display-lg text-brand-ink">
                Insights on <span className="text-gold-shimmer">Web & Business</span>
              </h1>
              <p className="mt-4 text-brand-muted text-lg max-w-2xl leading-relaxed">
                Practical articles on web development, website copy, LinkedIn strategy, and freelancing. Written from real experience — no filler.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── BLOG CONTENT ── */}
        <section className="section-pad bg-brand-bg">
          <div className="section-wrapper">

            {/* Featured article */}
            {featured && (
              <AnimatedSection className="mb-10">
                <FeaturedCard post={featured} />
              </AnimatedSection>
            )}

            {/* Remaining articles */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            )}

            {/* More coming soon */}
            <AnimatedSection className="mt-16 text-center border border-dashed border-brand-rule py-12">
              <p className="font-display text-xl text-brand-ink mb-2">More Articles Coming Soon</p>
              <p className="text-brand-muted text-sm max-w-md mx-auto">
                New articles on web development, design, and freelancing published regularly.
              </p>
            </AnimatedSection>

          </div>
        </section>

      </Layout>
    </>
  );
}
