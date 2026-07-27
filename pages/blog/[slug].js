// pages/blog/[slug].js
// ── BLOG POST TEMPLATE ────────────────────────────────────────────────────────

import { NextSeo, ArticleJsonLd } from 'next-seo';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../../lib/config';

// ── FULL ARTICLE CONTENT ──────────────────────────────────────────────────────
// ✏️ To add a new article: add slug to SITE_CONFIG.blogPosts in lib/config.js
//    then add its full HTML content here below.

const postContent = {

  'ux-research-half-true': `
    <p class="lead">If you've spent any time around product or design teams, you've heard the rules of thumb. Test with five users — that's enough. Run a heuristic evaluation before you bother real people. A/B test everything; the data doesn't lie. And now, increasingly: just simulate your users with AI and skip recruiting altogether.</p>
    <p>Most of these rules aren't wrong, exactly. They're incomplete — repeated so often that the caveats have quietly fallen off. Here's what actually holds up, what doesn't, and what that means for how you should be researching your own product.</p>
    <h2>The "Five Users" Rule Is Weaker Than You Think</h2>
    <p>Jakob Nielsen's 2000 claim that testing with five users is "enough" is based on a real mathematical model. But in 2003, researcher Laura Faulkner resampled a real dataset of sixty participants — and found that depending on <em>which</em> five people you recruited, that sample uncovered anywhere from 55% to 99% of the problems. Same method, wildly different outcomes.</p>
    <blockquote>That's not an argument against small qualitative studies. It's an argument against treating "five users" as a number with statistical guarantees behind it.</blockquote>
    <h2>Expert Reviews Catch Different Problems Than Real Users Do</h2>
    <p>Heuristic evaluation is popular because it's fast and doesn't require recruiting. But later studies found the overlap between expert-identified problems and real user struggles was underwhelming — roughly two-fifths of "expert" problems didn't bother real users, while evaluators missed a large share of what actually tripped people up.</p>
    <h2>A/B Testing Is Rigorous in Theory and Sloppy in Practice</h2>
    <p>Three failure modes show up constantly: <strong>peeking</strong> (stopping when you hit significance), <strong>multiple comparisons</strong> (one multivariate test found false-positive risk above 80%), and <strong>underpowering</strong> (not enough traffic to detect real effects). Statistical discipline — not better tools — is the fix.</p>
    <h2>AI-Simulated Users Are Useful for Speed, Not a Substitute</h2>
    <p>Controlled comparisons keep finding the same pattern: AI personas look plausible at first glance but can't exercise genuine consent or agency, lack the texture of real lived experience, and often miss the actual magnitude of real user responses.</p>
    <blockquote>Let AI accelerate the mechanical parts — transcription, synthesis, drafting guides. Don't let it replace the parts where individual variation and genuine consent actually matter.</blockquote>
    <h2>Accessibility Testing Needs All Three Layers</h2>
    <ul>
      <li><strong>Automated scanners</strong> — catch contrast failures, missing alt text, broken markup</li>
      <li><strong>Manual expert review</strong> — catches reading order issues automated tools miss</li>
      <li><strong>Real assistive-technology users</strong> — surfaces problems neither method above catches</li>
    </ul>
    <p>Skipping any one of these layers isn't a shortcut. It's a coverage gap.</p>
    <h2>What This Means for How You Should Work</h2>
    <p>Match the method to the actual stakes: five users for low-risk changes, larger samples and paired methods for high-stakes decisions, AI for synthesis not simulation, and all three accessibility layers before shipping to the public. The field's heuristics are directionally right — but "directionally right" and "a number you can cite without checking" are different things.</p>
    <p><em>This is a condensed summary of a longer independent research report (July 2026). <a href="/blog/ux-research-half-true">Read the full research article with abstract, references, and complete analysis →</a></em></p>
  `,

  'website-copy-that-converts': `
    <p class="lead">Most business websites look fine. They just don't sell.</p>

    <p>You've probably seen it yourself — a clean design, nice colors, a logo in the corner... and copy that says absolutely nothing. "We are a leading provider of innovative solutions." Cool. What do you actually do?</p>

    <p>Here's the thing: design gets people to stay for three seconds. Copy is what makes them stay for three minutes, pick up the phone, or fill out your contact form. If your website isn't converting visitors into customers, the words are usually the problem — not the layout.</p>

    <h2>1. Lead With the Problem, Not the Company</h2>

    <p>Nobody lands on your homepage caring about your "20 years of combined experience." They care about their own problem. Start there.</p>

    <p>Instead of:</p>
    <blockquote>"ABC Traders has been serving the industry since 2010 with a wide range of solutions."</blockquote>

    <p>Try:</p>
    <blockquote>"Struggling to find reliable suppliers who actually deliver on time? That's exactly what we fix."</blockquote>

    <p>Same information, completely different effect. One talks about you. The other talks about them.</p>

    <h2>2. Cut the Buzzwords</h2>

    <p>"Synergy," "innovative," "cutting-edge," "world-class" — these words used to mean something. Now they mean nothing, because every website uses them. Readers skip right over them without absorbing a single idea.</p>

    <p>Replace vague claims with specific ones:</p>
    <ul>
      <li><strong>"Fast website"</strong> becomes <strong>"Your site loads in under 2 seconds."</strong></li>
      <li><strong>"Affordable pricing"</strong> becomes <strong>"Packages starting at $80."</strong></li>
      <li><strong>"Experienced team"</strong> becomes <strong>"Built 10+ websites for real clients."</strong></li>
    </ul>

    <p>Specifics feel real. Buzzwords feel like filler.</p>

    <h2>3. Write Like You Talk</h2>

    <p>Formal, stiff copy creates distance. Read your homepage out loud. If it sounds like something you'd never actually say to a client sitting across from you, rewrite it.</p>

    <p>Short sentences work better than long ones. Simple words beat fancy ones. You're not writing a thesis — you're having a conversation with someone deciding whether to trust you with their money.</p>

    <h2>4. One Page, One Job</h2>

    <p>Every page on your site should push the visitor toward exactly one action — book a call, request a quote, send a message. When a page tries to do five things at once, it usually does none of them well.</p>

    <p>Pick the single most important action for that page, and make sure your copy, your button, and your layout all point toward it.</p>

    <h2>5. End With a Clear, Low-Pressure CTA</h2>

    <p>"Contact us for more information" is weak. It doesn't tell the reader what happens next or why they should bother.</p>

    <p>Try something more direct:</p>
    <blockquote>"Tell me about your project — I'll reply within 24 hours with a timeline and a fair price."</blockquote>

    <p>It's specific, it sets expectations, and it removes the guesswork.</p>

    <h2>The Real Takeaway</h2>

    <p>Good website copy isn't about sounding impressive. It's about being clear, specific, and human — so the right visitor reads three lines and thinks, "okay, this person gets it." That's the moment a visitor turns into a lead.</p>

    <p>If your website copy still sounds like a brochure from 2015, it might be time for a rewrite.</p>
  `,

  'signs-website-costing-clients': `
    <p class="lead">A website is supposed to be your best salesperson — working 24/7, never taking a day off. But a poorly built one can quietly do the opposite: chase potential clients away before they even reach out.</p>

    <p>If you've had a website for a while but leads have slowed down or never really picked up, one of these five problems is likely the culprit.</p>

    <h2>1. It Loads Too Slowly</h2>

    <p>Every second of load time costs you visitors. Most people won't wait more than a few seconds for a page to appear before they hit the back button — especially on mobile, where a big chunk of your traffic comes from.</p>

    <p>Slow websites are usually the result of:</p>
    <ul>
      <li>Unoptimized images that are too large</li>
      <li>Outdated or cheap hosting</li>
      <li>Bloated page builders with too much code</li>
    </ul>

    <p>A fast, modern framework built for performance (like Next.js) solves this at the foundation, not with band-aid fixes.</p>

    <h2>2. It Doesn't Work Properly on Phones</h2>

    <p>If your site looks great on a laptop but breaks, overlaps, or becomes hard to tap on a phone, you're losing the majority of your visitors. Mobile traffic isn't a "nice to have" anymore — for most small businesses, it's the majority.</p>

    <p>A properly responsive site should feel just as smooth on a phone as it does on a desktop, without any pinching, zooming, or awkward scrolling.</p>

    <h2>3. There's No Clear Way to Contact You</h2>

    <p>This sounds basic, but it happens constantly. Visitors get interested, look for a way to reach out, and find... nothing obvious. No visible phone number, no WhatsApp button, no simple contact form above the fold.</p>

    <p>Make it stupidly easy to get in touch. A visible "Hire Me" or "Get a Quote" button, a WhatsApp link, and a short contact form should be within one click from anywhere on the site.</p>

    <h2>4. It Looks Outdated</h2>

    <p>Fair or not, people judge trustworthiness by design. A site with old fonts, clashing colors, or a layout that looks like it's from a decade ago quietly tells visitors, "this business might not be active anymore" — even if that's not true.</p>

    <p>A clean, modern design signals that you're active, professional, and worth the investment.</p>

    <h2>5. There's No Real Content — Just a Homepage</h2>

    <p>A single page with a logo, a paragraph, and a phone number doesn't give people a reason to trust you or stay. Visitors want to see your work, understand exactly what you offer, and hear what past clients say about you.</p>

    <p>A proper site needs, at minimum:</p>
    <ul>
      <li>A clear services or portfolio section</li>
      <li>Social proof — testimonials and project examples</li>
      <li>A simple way to take the next step</li>
    </ul>

    <h2>The Fix</h2>

    <p>None of these problems require starting from zero. Most can be fixed with a focused rebuild — same brand, same voice, but built on a modern, fast, mobile-first foundation that actually turns visitors into inquiries.</p>

    <p>If any of the five points above sound familiar, your website isn't broken beyond repair — it's just overdue for an update.</p>
  `,

  'linkedin-content-strategy-freelancers': `
    <p class="lead">Most freelancers avoid LinkedIn for one honest reason: it feels awkward to talk about yourself. Posting "excited to announce I finished a new project!" every few weeks doesn't feel natural, and it rarely brings in clients anyway.</p>

    <p>The good news — you don't need to be loud, salesy, or post every day to get results from LinkedIn. You need a small, consistent system. Here's one that actually works.</p>

    <h2>Stop Posting Announcements. Start Posting Lessons.</h2>

    <p>Nobody scrolls LinkedIn hoping to see your achievements. They scroll hoping to learn something or be entertained for thirty seconds. Instead of announcing what you did, share what you learned while doing it.</p>

    <p>Compare these two:</p>
    <blockquote>"Just delivered a new website for a client! Grateful for the opportunity."</blockquote>
    <blockquote>"A client asked me why their old website wasn't bringing in leads. Here's the exact thing that was wrong with it — and it's probably wrong with yours too."</blockquote>

    <p>The second one gets read. The first one gets scrolled past.</p>

    <h2>Use the 3-Bucket System</h2>

    <p>Instead of guessing what to post, rotate between three simple content buckets:</p>

    <h3>1. Problem + Fix</h3>
    <p>Describe a common problem your ideal client faces, then explain how you'd solve it. This shows expertise without sounding like an ad.</p>

    <h3>2. Behind the Scenes</h3>
    <p>Show your actual process. A quick before/after, a screenshot of your workflow, or a short story about a challenge on a recent project. People trust what they can see.</p>

    <h3>3. Opinion</h3>
    <p>"Most businesses don't need a mobile app — they need a website that actually works" is more interesting than a generic tip, and it starts conversations in the comments.</p>

    <p>Rotate through these three, and you'll never run out of ideas.</p>

    <h2>Write the First Line Like It's an Ad Headline</h2>

    <p>On LinkedIn, only the first one or two lines show before "see more." That first line decides whether anyone reads the rest. Skip the throat-clearing and go straight into something specific or slightly surprising.</p>

    <ul>
      <li><strong>Weak:</strong> "I wanted to share some thoughts on websites today."</li>
      <li><strong>Strong:</strong> "Your website is probably losing you clients. Here's why."</li>
    </ul>

    <h2>Comments Matter More Than Most People Think</h2>

    <p>You don't need thousands of followers to get clients from LinkedIn. You need to be visible in the right rooms. Commenting thoughtfully on posts from people in your target industry — actual insight, not just "Great post!" — puts your name in front of potential clients without ever posting yourself.</p>

    <h2>Consistency Beats Frequency</h2>

    <p>Two well-written posts a week, every week, will outperform seven rushed ones followed by a month of silence. Pick a rhythm you can actually keep — even once a week is enough if the content is genuinely useful.</p>

    <h2>The Bottom Line</h2>

    <p>LinkedIn isn't about performing confidence or bragging about wins. It's about showing, consistently, that you understand your client's problems better than the next freelancer does. Do that quietly and steadily, and the clients start coming to you instead of the other way around.</p>
  `,
};

// ── ARTICLE STYLES ────────────────────────────────────────────────────────────
const articleStyles = `
  .article-body p { color: #8B97A8; font-size: 1.0625rem; line-height: 1.85; margin-bottom: 1.4rem; }
  .article-body p.lead { color: #E8EDF4; font-size: 1.2rem; line-height: 1.7; font-style: italic; border-left: 3px solid #C8A96E; padding-left: 1.25rem; margin-bottom: 2rem; }
  .article-body h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.75rem; color: #E8EDF4; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
  .article-body h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem; color: #C8A96E; margin-top: 1.75rem; margin-bottom: 0.75rem; }
  .article-body blockquote { background: #1A2332; border-left: 3px solid #C8A96E; padding: 1rem 1.5rem; margin: 1.75rem 0; color: #E8EDF4; font-style: italic; font-size: 1.05rem; }
  .article-body ul, .article-body ol { color: #8B97A8; padding-left: 1.5rem; margin-bottom: 1.4rem; }
  .article-body li { margin-bottom: 0.5rem; line-height: 1.7; }
  .article-body ul li::marker { color: #C8A96E; }
  .article-body ol li::marker { color: #C8A96E; font-weight: 600; }
  .article-body strong { color: #E8EDF4; font-weight: 600; }
  .article-body a { color: #C8A96E; text-decoration: underline; }
`;

export async function getStaticPaths() {
  const paths = SITE_CONFIG.blogPosts.map(post => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = SITE_CONFIG.blogPosts.find(p => p.slug === params.slug);
  const content = postContent[params.slug] || '<p>Full article coming soon.</p>';
  const allPosts = SITE_CONFIG.blogPosts;
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { props: { post, content, prevPost, nextPost } };
}

export default function BlogPost({ post, content, prevPost, nextPost }) {
  const canonicalUrl = `${SITE_CONFIG.seo.siteUrl}/blog/${post.slug}`;

  return (
    <>
      <NextSeo
        title={`${post.title} | ${SITE_CONFIG.name}`}
        description={post.excerpt}
        canonical={canonicalUrl}
        openGraph={{
          type:            'article',
          url:             canonicalUrl,
          title:           post.title,
          description:     post.excerpt,
          publishedTime:   post.date,
          authors:         [SITE_CONFIG.name],
          tags:            [post.category],
        }}
      />

      {/* BlogPosting Schema */}
      <ArticleJsonLd
        type="BlogPosting"
        url={canonicalUrl}
        title={post.title}
        images={[`${SITE_CONFIG.seo.siteUrl}${post.image}`]}
        datePublished={post.date}
        dateModified={post.date}
        authorName={SITE_CONFIG.name}
        description={post.excerpt}
      />

      <style dangerouslySetInnerHTML={{ __html: articleStyles }} />

      <Layout>

        {/* ── ARTICLE HERO ── */}
        <section className="pt-32 pb-16 bg-brand-bg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(circle at 70% 30%, #C8A96E 0%, transparent 60%)' }}
          />
          <div className="section-wrapper max-w-3xl relative z-10">
            <AnimatedSection>
              {/* Breadcrumb */}
              <div className="flex items-center gap-3 mb-6">
                <Link href="/blog" className="btn-ghost text-xs">← Back to Blog</Link>
                <span className="text-brand-rule">·</span>
                <span className="eyebrow text-[10px]">{post.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-display-md text-brand-ink leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-brand-rule">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-brand-accent/40 flex items-center justify-center">
                    <span className="font-display text-sm text-brand-accent">M</span>
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-brand-ink">{SITE_CONFIG.name}</p>
                    <p className="font-body text-[11px] text-brand-muted">Frontend Developer & Writer</p>
                  </div>
                </div>
                <span className="text-brand-rule hidden sm:block">·</span>
                <span className="text-brand-muted text-xs">{post.date}</span>
                <span className="text-brand-rule">·</span>
                <span className="text-brand-muted text-xs">{post.readTime}</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <section className="py-16 bg-brand-bg">
          <div className="section-wrapper max-w-3xl">
            <AnimatedSection>
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-brand-rule">
                <span className="eyebrow">Category:</span>
                <span className="border border-brand-accent/40 text-brand-accent text-xs px-3 py-1">
                  {post.category}
                </span>
              </div>
            </AnimatedSection>

            {/* ── AUTHOR BIO ── */}
            <AnimatedSection delay={100} className="mt-12">
              <div className="bg-white border border-brand-rule p-6 flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-brand-bg border-2 border-brand-accent/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-brand-accent">M</span>
                </div>
                <div>
                  <p className="eyebrow mb-1">About the Author</p>
                  <p className="font-body font-semibold text-brand-ink text-sm">{SITE_CONFIG.name}</p>
                  <p className="text-brand-muted text-xs mt-1 leading-relaxed">
                    Frontend Web Developer & Web Designer from Pakistan. I build modern, responsive websites for businesses and personal brands, and write about web development, content strategy, and freelancing.
                  </p>
                  <div className="flex gap-4 mt-3">
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-accent text-xs hover:underline">LinkedIn →</a>
                    <Link href="/contact" className="text-brand-accent text-xs hover:underline">Hire Me →</Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── PREV / NEXT NAVIGATION ── */}
            {(prevPost || nextPost) && (
              <AnimatedSection delay={150} className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="group block bg-white border border-brand-rule hover:border-brand-accent/40 p-5 transition-all duration-200">
                      <p className="font-body text-xs text-brand-muted uppercase tracking-widest mb-2">← Previous Article</p>
                      <p className="font-display text-base text-brand-ink group-hover:text-brand-accent transition-colors leading-snug">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : <div />}

                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="group block bg-white border border-brand-rule hover:border-brand-accent/40 p-5 transition-all duration-200 sm:text-right">
                      <p className="font-body text-xs text-brand-muted uppercase tracking-widest mb-2">Next Article →</p>
                      <p className="font-display text-base text-brand-ink group-hover:text-brand-accent transition-colors leading-snug">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : <div />}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>

        {/* ── MORE ARTICLES ── */}
        <section className="section-pad bg-brand-ink">
          <div className="section-wrapper max-w-3xl">
            <h2 className="font-display text-2xl text-brand-ink mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SITE_CONFIG.blogPosts
                .filter(p => p.slug !== post.slug)
                .map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <div className="bg-white border border-brand-rule group-hover:border-brand-accent/40 p-5 h-full transition-all duration-200">
                      <span className="eyebrow text-[10px]">{p.category}</span>
                      <h3 className="font-display text-lg text-brand-ink mt-2 mb-2 group-hover:text-brand-accent transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{p.excerpt}</p>
                      <p className="text-brand-accent text-xs font-semibold mt-4">Read Article →</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
}
