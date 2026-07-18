// pages/blog/ux-research-half-true.js
// Research Article — dedicated page with abstract, keywords, full content

import { NextSeo, ArticleJsonLd } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../../lib/config';

const post = SITE_CONFIG.blogPosts.find(p => p.slug === 'ux-research-half-true');
const canonicalUrl = `${SITE_CONFIG.seo.siteUrl}/blog/ux-research-half-true`;

const articleStyles = `
  .research-body p { color: #8B97A8; font-size: 1.0625rem; line-height: 1.9; margin-bottom: 1.5rem; }
  .research-body h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.65rem; color: #E8EDF4; margin-top: 3rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #2C3D52; line-height: 1.25; }
  .research-body h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; color: #C8A96E; margin-top: 2rem; margin-bottom: 0.75rem; }
  .research-body blockquote { background: #1A2332; border-left: 3px solid #C8A96E; padding: 1.25rem 1.5rem; margin: 2rem 0; color: #E8EDF4; font-style: italic; font-size: 1.1rem; line-height: 1.7; }
  .research-body ul, .research-body ol { color: #8B97A8; padding-left: 1.5rem; margin-bottom: 1.5rem; }
  .research-body li { margin-bottom: 0.6rem; line-height: 1.8; }
  .research-body ul li::marker { color: #C8A96E; }
  .research-body strong { color: #E8EDF4; font-weight: 600; }
  .research-body em { color: #C8A96E; font-style: italic; }
  .research-body a { color: #C8A96E; text-decoration: underline; }
  .research-body .footnote { font-size: 0.875rem; color: #8B97A8; border-top: 1px solid #2C3D52; margin-top: 3rem; padding-top: 1rem; font-style: italic; }
`;

export default function ResearchArticle() {
  return (
    <>
      <NextSeo
        title={`${post.title} | ${SITE_CONFIG.name}`}
        description={post.excerpt}
        canonical={canonicalUrl}
        openGraph={{
          type:          'article',
          url:           canonicalUrl,
          title:         post.title,
          description:   post.excerpt,
          publishedTime: post.date,
          authors:       [SITE_CONFIG.name],
          tags:          post.keywords,
        }}
      />
      <ArticleJsonLd
        type="ScholarlyArticle"
        url={canonicalUrl}
        title={post.title}
        images={[`${SITE_CONFIG.seo.siteUrl}${post.image}`]}
        datePublished={post.date}
        dateModified={post.date}
        authorName={SITE_CONFIG.name}
        description={post.abstract}
      />

      <style dangerouslySetInnerHTML={{ __html: articleStyles }} />

      <Layout>

        {/* ── HERO ── */}
        <section className="pt-32 pb-0 bg-brand-ink relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(circle at 60% 20%, #C8A96E 0%, transparent 60%)' }}
          />
          <div className="section-wrapper max-w-3xl relative z-10">
            <AnimatedSection>
              {/* Breadcrumb */}
              <div className="flex items-center gap-3 mb-8">
                <Link href="/blog" className="btn-ghost text-xs">← Back to Blog</Link>
                <span className="text-brand-rule">·</span>
                <span className="inline-flex items-center gap-1.5 border border-purple-400/40 bg-purple-400/10 text-purple-400 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1">
                  Research
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-display-md text-brand-mist leading-tight mb-4">
                Most of What You've Been Told About UX Research Is Half True
              </h1>

              {/* Subtitle */}
              <p className="font-display text-lg text-brand-ghost italic leading-relaxed mb-8">
                Why "test with 5 users," heuristic evaluation, and AI-simulated participants aren't as reliable as the UX industry likes to pretend
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pb-8 border-b border-brand-rule">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-steel border-2 border-brand-accent/40 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm text-brand-accent">M</span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-brand-mist">{SITE_CONFIG.name}</p>
                    <p className="font-body text-[11px] text-brand-ghost">Frontend Developer & Independent Researcher</p>
                  </div>
                </div>
                <span className="text-brand-rule hidden sm:block">·</span>
                <span className="text-brand-ghost text-xs">July 2026</span>
                <span className="text-brand-rule">·</span>
                <span className="text-brand-ghost text-xs">{post.readTime}</span>
              </div>
            </AnimatedSection>

            {/* ── ABSTRACT ── */}
            <AnimatedSection delay={100} className="mt-8 mb-0">
              <div className="bg-brand-slate border border-brand-rule p-6">
                <p className="eyebrow mb-3">Abstract</p>
                <p className="text-brand-ghost text-sm leading-relaxed">
                  This article critically examines four widely-cited methodologies in UX and web design practice: small-sample usability testing, heuristic evaluation, A/B testing, and AI-simulated user research. Drawing on peer-reviewed literature — including Faulkner (2003), Nielsen (2000), and recent experimental studies — it argues that popular industry heuristics are directionally correct but systematically stripped of their caveats. The piece concludes with evidence-based recommendations for matching research method to decision stakes.
                </p>

                {/* Keywords */}
                <div className="mt-4 pt-4 border-t border-brand-rule">
                  <p className="eyebrow text-[10px] mb-2">Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map(kw => (
                      <span key={kw} className="border border-brand-rule text-brand-ghost text-[11px] px-2.5 py-1 hover:border-brand-accent hover:text-brand-accent transition-colors">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <section className="pt-12 pb-20 bg-brand-slate">
          <div className="section-wrapper max-w-3xl">
            <AnimatedSection>
              <div className="research-body">

                <p>If you've spent any time around product or design teams, you've heard the rules of thumb. Test with five users — that's enough. Run a heuristic evaluation before you bother real people. A/B test everything; the data doesn't lie. And now, increasingly: just simulate your users with AI and skip recruiting altogether.</p>

                <p>Most of these rules aren't wrong, exactly. They're incomplete — repeated so often that the caveats have quietly fallen off. I spent the last several weeks going back to the actual research behind them, the peer-reviewed papers and the industry studies that popularized these heuristics in the first place, and the picture that emerges is messier and more useful than the slogan version. Here's what actually holds up, what doesn't, and what that means for how you should be researching your own product.</p>

                <h2>The "Five Users" Rule Is Weaker Than You Think</h2>

                <p>Jakob Nielsen's 2000 claim that testing with five users is "enough" is probably the most repeated statistic in UX. It's based on a real mathematical model: each new participant in a usability test tends to reveal fewer <em>new</em> problems than the last, so after about five people, you're mostly hearing the same complaints over and over.</p>

                <p>The problem is what happens when someone actually checks this empirically. In 2003, researcher Laura Faulkner went back and resampled a real dataset of sixty usability-test participants, pulling different random groups of five people over and over to see how much they'd have found. The results should give anyone pause: depending on <em>which</em> five people you happened to recruit, that sample uncovered anywhere from 55% to 99% of the problems that eventually turned up. Same method, same product, wildly different outcomes depending on the luck of recruiting.</p>

                <blockquote>
                  That's not an argument against small qualitative studies — they're still fast, cheap, and genuinely useful. It's an argument against treating "five users" as a number with statistical guarantees behind it.
                </blockquote>

                <p>If a decision is high-stakes, test with more people. If it's a quick sanity check on a low-risk change, five is probably fine. The number was always supposed to be a starting point, not a law.</p>

                <h2>Expert Reviews Catch Different Problems Than Real Users Do — Not More of the Same Ones</h2>

                <p>Heuristic evaluation — having a UX expert review an interface against a known checklist (Nielsen's ten heuristics are the classic version) — is popular because it's fast and doesn't require recruiting anyone. Early research seemed to support it: get a handful of evaluators to review independently, and their combined list can rival what a full usability test finds.</p>

                <p>But later studies complicated that picture considerably. When researchers compared what heuristic evaluations actually flag against what real users actually struggle with, the overlap was underwhelming:</p>

                <ul>
                  <li>A meaningful share of "expert-identified" problems (estimates cluster around two-fifths) turned out not to bother real users at all</li>
                  <li>Evaluators simultaneously missed a large share of the problems that <strong>did</strong> trip people up</li>
                  <li>Expert and user perspectives consistently surfaced different, partially non-overlapping problem sets</li>
                </ul>

                <p>The honest takeaway isn't "heuristic evaluation is useless." It's that expert review and user testing are looking at partially different problem spaces. Use heuristic evaluation as a cheap first pass to catch obvious violations before you invest in recruiting — not as a substitute for watching real people struggle.</p>

                <h2>A/B Testing Is Rigorous in Theory and Sloppy in Practice</h2>

                <p>A/B testing has the best theoretical claim to real evidence of anything in this list — it's randomized, controlled, and measures actual behavior instead of what people say they'd do. But the applied literature is blunt about how often that rigor gets undermined in practice.</p>

                <p>Three failure modes show up constantly:</p>

                <h3>1. Peeking</h3>
                <p>Checking results early and stopping the moment you hit "significance," which inflates your false-positive rate far more than most teams realize.</p>

                <h3>2. Multiple Comparisons</h3>
                <p>Running many variants or many audience segments at once. One widely cited analysis of a "41 shades of blue"-style multivariate test found the effective false-positive risk could climb above 80%, even with a nominal 95% confidence threshold.</p>

                <h3>3. Underpowering</h3>
                <p>Not having enough traffic to detect the effect you're looking for, so noise gets mistaken for a real result.</p>

                <p>Even mature experimentation programs aren't immune — research from experimentation specialists has found false-positive rates among "statistically significant" wins approaching a quarter at some organizations. If your team runs A/B tests, the single highest-leverage fix isn't a better tool. It's statistical discipline: pre-registering how long a test will run, correcting for how many comparisons you're making, and resisting the urge to call a winner the moment the dashboard turns green.</p>

                <h2>AI-Simulated Users Are Useful for Speed, Not (Yet) a Substitute for Real People</h2>

                <p>This is the one I went in most skeptical about and came out <em>more</em> skeptical, not less. "Synthetic users" — AI personas built on large language models, meant to stand in for real research participants — are being pitched hard right now on speed and cost.</p>

                <p>But controlled comparisons keep finding the same pattern: an experienced UX team recreated one of its own past human-participant studies using AI-simulated interviews in 2025, and while the surface-level narratives looked plausible at first glance, closer probing revealed real limitations:</p>

                <ul>
                  <li>The simulated participants couldn't exercise genuine consent or agency</li>
                  <li>Their answers lacked the texture of real lived experience</li>
                  <li>Language models often get the general <em>shape</em> of a response pattern right but miss the actual magnitude and distribution</li>
                  <li>Several studies found systematic, unrepresentative skews in how models portray a target population</li>
                </ul>

                <blockquote>
                  The realistic use case right now: let AI accelerate the parts of research that are genuinely mechanical — transcription, first-pass synthesis, drafting interview guides, summarizing hours of session recordings. Don't let it replace the parts where individual variation, affect, and genuine consent actually matter.
                </blockquote>

                <h2>Accessibility Testing Needs All Three Layers, Not One</h2>

                <p>If there's a place where the evidence is <em>not</em> ambiguous, it's this one: no single accessibility-testing method is sufficient on its own.</p>

                <ul>
                  <li><strong>Automated scanners</strong> catch a real but limited slice of problems — missing alt text, contrast failures, broken markup — cheaply and at scale.</li>
                  <li><strong>Manual expert review</strong> (keyboard-only navigation, screen-reader walkthroughs) catches what automated tools structurally can't, like whether the <em>reading order</em> actually makes sense.</li>
                  <li><strong>Testing with actual assistive-technology users</strong> consistently surfaces real usability problems that neither of the first two methods catch — because using a screen reader in your daily life is a different skill than knowing WCAG's technical criteria.</li>
                </ul>

                <p>Skipping any one of these layers isn't a shortcut. It's a coverage gap.</p>

                <h2>What This Actually Means for How You Should Work</h2>

                <p>None of this is an argument for research nihilism — "nothing is reliable, why bother." It's an argument for matching the method to the actual stakes of the decision, and for treating popular heuristics as defensible defaults rather than settled facts:</p>

                <ul>
                  <li><strong>Low-stakes, fast iteration?</strong> Five-ish users and a heuristic pass are genuinely fine.</li>
                  <li><strong>High-stakes decision, or a redesign affecting a lot of users?</strong> Push sample sizes higher, and pair a quantitative signal (analytics, an A/B test) with a qualitative explanation (usability testing, interviews) rather than picking one.</li>
                  <li><strong>Using AI in your research process?</strong> Great for speeding up synthesis and drafting. Don't let it stand in for the humans when the question depends on real individual variation.</li>
                  <li><strong>Shipping to the public?</strong> Accessibility testing isn't optional, and it isn't a single checklist — it's automated scanning <em>plus</em> expert review <em>plus</em> real assistive-technology users.</li>
                </ul>

                <p>The field's most repeated rules of thumb earned their popularity honestly — they're memorable, they're mostly directionally right, and they've made research more approachable for teams without dedicated researchers. But "directionally right" and "a number you can cite without checking" are different things. The teams getting the most value out of research right now are the ones who know which is which.</p>

                <p className="footnote">
                  This article is a condensed, web-friendly summary of a longer independent research report, <em>"Research Methodologies in Modern Web Design: A Critical Analysis of User Research, Usability Evaluation, Accessibility Assessment, and Evidence-Based Design Practices"</em> (July 2026), which includes the full source list, methodology notes, and citation-level detail behind every claim above.
                </p>

              </div>
            </AnimatedSection>

            {/* ── REFERENCES ── */}
            <AnimatedSection delay={100}>
              <div className="mt-12 bg-brand-steel border border-brand-rule p-6">
                <p className="eyebrow mb-4">Key References</p>
                <ul className="space-y-3">
                  {[
                    'Nielsen, J. (2000). Why You Only Need to Test with 5 Users. Nielsen Norman Group.',
                    'Faulkner, L. (2003). Beyond the five-user assumption: Benefits of increased sample sizes in usability testing. Behavior Research Methods, Instruments, & Computers, 35(3), 379-383.',
                    'Cockton, G., & Woolrych, A. (2001). Understanding Inspection Methods: Lessons from an Assessment of Heuristic Evaluation. People and Computers XV — Interaction without Frontiers.',
                    'Kohavi, R., Longbotham, R., Sommerfield, D., & Henne, R. M. (2009). Controlled experiments on the web: survey and practical guide. Data Mining and Knowledge Discovery.',
                    'WCAG 2.2 (2023). Web Content Accessibility Guidelines. W3C Recommendation.',
                  ].map((ref, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-ghost text-xs leading-relaxed">
                      <span className="text-brand-accent font-mono flex-shrink-0 mt-0.5">[{i + 1}]</span>
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* ── AUTHOR BIO ── */}
            <AnimatedSection delay={150} className="mt-8">
              <div className="bg-brand-steel border border-brand-rule p-6 flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-brand-ink border-2 border-brand-accent/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-brand-accent">M</span>
                </div>
                <div>
                  <p className="eyebrow mb-1">About the Author</p>
                  <p className="font-body font-semibold text-brand-mist text-sm">{SITE_CONFIG.name}</p>
                  <p className="text-brand-ghost text-xs mt-1 leading-relaxed">
                    Frontend Web Developer and independent researcher from Pakistan. BS English graduate with a focus on evidence-based design, web development, and content strategy. Writes about UX research, web design, and freelancing.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-accent text-xs hover:underline">LinkedIn →</a>
                    <Link href="/contact" className="text-brand-accent text-xs hover:underline">Hire Me →</Link>
                    <Link href="/resume" className="text-brand-accent text-xs hover:underline">View Resume →</Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── SHARE + NAV ── */}
            <AnimatedSection delay={200} className="mt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-brand-rule">
                <div>
                  <p className="eyebrow text-[10px] mb-2">Share This Article</p>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="border border-brand-rule text-brand-ghost hover:border-brand-accent hover:text-brand-accent text-xs px-3 py-2 transition-all"
                    >
                      Share on LinkedIn
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="border border-brand-rule text-brand-ghost hover:border-brand-accent hover:text-brand-accent text-xs px-3 py-2 transition-all"
                    >
                      Share on Twitter
                    </a>
                  </div>
                </div>
                <Link href="/blog" className="btn-secondary text-xs py-2.5 px-5">
                  ← All Articles
                </Link>
              </div>
            </AnimatedSection>

            {/* ── MORE ARTICLES ── */}
            <AnimatedSection delay={250} className="mt-12">
              <h2 className="font-display text-2xl text-brand-mist mb-6">More Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {SITE_CONFIG.blogPosts
                  .filter(p => p.slug !== 'ux-research-half-true')
                  .slice(0, 2)
                  .map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                      <div className="bg-brand-steel border border-brand-rule group-hover:border-brand-accent/40 p-5 h-full transition-all duration-200">
                        <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-brand-accent">{p.category}</span>
                        <h3 className="font-display text-lg text-brand-mist mt-2 mb-2 group-hover:text-brand-accent transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-brand-ghost text-xs leading-relaxed line-clamp-2">{p.excerpt}</p>
                        <p className="text-brand-accent text-xs font-semibold mt-4">Read Article →</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </AnimatedSection>

          </div>
        </section>

      </Layout>
    </>
  );
}
