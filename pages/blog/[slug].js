// pages/blog/[slug].js
// ── BLOG POST TEMPLATE ────────────────────────────────────────────────────────
// This dynamically renders each blog post from SITE_CONFIG.blogPosts.
// ✏️ To write a full article:
//    1. Add the post metadata to SITE_CONFIG.blogPosts in lib/config.js
//    2. Add the full content in the `postContent` object below

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../../lib/config';

// ✏️ ADD YOUR FULL ARTICLE CONTENT HERE
// Key = slug from SITE_CONFIG.blogPosts
const postContent = {
  'linkedin-content-strategy-2025': `
    <p>Most LinkedIn posts disappear into the void. They get written, published, forgotten. No comments, no connections, no clients. Just another status update in an endless feed.</p>

    <p>I've been studying what separates LinkedIn posts that generate inbound leads from those that generate nothing. After analyzing hundreds of posts and running campaigns for multiple clients, I've found a repeatable framework that works — consistently.</p>

    <h2>The Problem With Most LinkedIn Content</h2>

    <p>People write about themselves. "Excited to announce..." "I'm proud to share..." "Today I learned..." All ego, no value. The reader asks: why should I care?</p>

    <p>High-performing LinkedIn content solves a problem, challenges a belief, or tells a story that makes the reader feel something. Everything else is noise.</p>

    <h2>The Framework: P.A.C.E</h2>

    <p><strong>P — Problem:</strong> Open with a problem your audience recognizes instantly. Make them feel seen.</p>
    <p><strong>A — Agitate:</strong> Dig into why it hurts. Don't rush to the solution.</p>
    <p><strong>C — Content:</strong> Deliver the value. The insight, the framework, the lesson.</p>
    <p><strong>E — End with a hook:</strong> Close with a question, a bold statement, or a soft call to action.</p>

    <h2>The 12 Leads in 30 Days</h2>

    <p>I ran this framework for a SaaS founder posting 3x per week. Within 30 days, his profile views jumped 340%. More importantly, 12 people reached out directly asking to work with him — without a single paid ad.</p>

    <p>The secret? Consistency + specificity. Generic content attracts no one. Specific insights attract exactly the right people.</p>

    <p>Want me to apply this to your LinkedIn profile? <a href="/contact" style="color: #C8A96E;">Get in touch here.</a></p>
  `,

  'ai-copywriting-human-touch': `
    <p>Every copywriter is worried about AI. I was too — until I figured out how to use it as a superpower instead of a threat.</p>

    <p>Here's my honest take: AI won't replace great copywriters. But copywriters who use AI intelligently will replace those who don't. The question is: how do you use it without losing your voice, your quality, or your value?</p>

    <h2>What AI Is Good At</h2>

    <p>AI is exceptional at research aggregation, generating multiple angle options, creating first drafts at speed, and suggesting structural frameworks. Use it for speed and breadth.</p>

    <h2>What AI Is Bad At</h2>

    <p>AI doesn't know your specific client. It can't feel the tension in a room, understand cultural nuance, or write the kind of sentence that makes someone stop scrolling and read again. That's the human layer — and it's irreplaceable.</p>

    <h2>My Exact Workflow</h2>

    <p>I use AI to generate 3-5 angle options for any piece. Then I select the strongest angle, rewrite from scratch in my own voice, and run a final human edit for tone, rhythm, and clarity. The result is content that's fast to produce and genuinely excellent to read.</p>
  `,

  'product-descriptions-that-sell': `
    <p>Your product description is your silent salesperson. When a customer lands on your product page, there's no one there to answer their questions, handle their objections, or close the sale. Your words have to do all of that — alone.</p>

    <p>Most product descriptions fail because they describe. Great product descriptions sell.</p>

    <h2>Formula 1: Features → Benefits → Feeling</h2>

    <p>Don't just list what it does — tell them what it means for their life. "Noise-cancelling headphones" becomes "Your own personal silence, wherever you go."</p>

    <h2>Formula 2: The Before/After Bridge</h2>

    <p>Paint the pain state, then reveal the product as the solution. Make the gap feel real before you close it.</p>

    <h2>Formula 3: The Specificity Rule</h2>

    <p>Specific details build credibility. "Lasts all day" is weak. "11.5 hours of battery life, tested over 6 months" is powerful.</p>

    <h2>Formula 4: Sensory Language</h2>

    <p>Make them feel, smell, taste, or hear the product. The more senses you engage, the more real it becomes in their imagination — and the more likely they are to buy.</p>

    <h2>Formula 5: The Risk Reversal Close</h2>

    <p>End with something that removes fear. A guarantee, a return policy, a social proof stat. Eliminate the last reason not to buy.</p>
  `,
};

export async function getStaticPaths() {
  const paths = SITE_CONFIG.blogPosts.map(post => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = SITE_CONFIG.blogPosts.find(p => p.slug === params.slug);
  const content = postContent[params.slug] || '<p>Full article coming soon.</p>';

  return {
    props: { post, content },
  };
}

export default function BlogPost({ post, content }) {
  const relatedPosts = SITE_CONFIG.blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <NextSeo
        title={`${post.title} | ${SITE_CONFIG.name}`}
        description={post.excerpt}
      />
      <Layout>

        {/* ── ARTICLE HEADER ── */}
        <section className="pt-32 pb-16 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10 max-w-3xl">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <Link href="/blog" className="btn-ghost text-xs">
                  ← Back to Blog
                </Link>
                <span className="text-brand-rule">·</span>
                <span className="eyebrow">{post.category}</span>
              </div>
              <h1 className="font-display text-display-md text-brand-mist mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-brand-ghost text-sm">{post.date}</span>
                <span className="text-brand-rule">·</span>
                <span className="text-brand-ghost text-sm">{post.readTime}</span>
                <span className="text-brand-rule">·</span>
                <span className="text-brand-ghost text-sm">By {SITE_CONFIG.name}</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <section className="py-16 bg-brand-slate">
          <div className="section-wrapper max-w-3xl">
            <AnimatedSection>
              {/* Article content */}
              {/* ✏️ Styles for article content — edit these classes to change typography */}
              <div
                className="prose-article"
                style={{
                  color: '#8B97A8',
                  fontSize: '17px',
                  lineHeight: '1.8',
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Author bio */}
              <div className="mt-16 pt-10 border-t border-brand-rule flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-steel border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-brand-accent">
                    {SITE_CONFIG.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-brand-mist text-sm">
                    Written by {SITE_CONFIG.name}
                  </p>
                  <p className="text-brand-ghost text-xs mt-1 leading-relaxed">
                    Freelance copywriter and LinkedIn content strategist. I help brands communicate with clarity and convert readers into clients.
                  </p>
                  <div className="flex gap-4 mt-3">
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-brand-accent text-xs hover:underline">
                      LinkedIn →
                    </a>
                    <Link href="/contact" className="text-brand-accent text-xs hover:underline">
                      Hire Me →
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── RELATED POSTS ── */}
        {relatedPosts.length > 0 && (
          <section className="section-pad bg-brand-ink">
            <div className="section-wrapper">
              <h2 className="font-display text-2xl text-brand-mist mb-8">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(rPost => (
                  <Link key={rPost.slug} href={`/blog/${rPost.slug}`} className="group block">
                    <div className="bg-brand-steel border border-brand-rule group-hover:border-brand-accent/40 p-6 transition-all duration-200">
                      <span className="eyebrow text-[10px]">{rPost.category}</span>
                      <h3 className="font-display text-xl text-brand-mist mt-3 mb-2 group-hover:text-brand-accent transition-colors">
                        {rPost.title}
                      </h3>
                      <p className="text-brand-ghost text-sm line-clamp-2">{rPost.excerpt}</p>
                      <p className="text-brand-accent text-xs mt-4 font-semibold">Read →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </Layout>
    </>
  );
}
