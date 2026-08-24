// pages/index.js — Home page light theme

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import CTABanner from '../components/sections/CTABanner';
import Reviews from '../components/sections/Reviews';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import { SITE_CONFIG } from '../lib/config';

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Services preview
function ServicesPreview() {
  return (
    <section className="section-pad bg-white">
      <div className="section-wrapper">
        <SectionHeading eyebrow="What I Do" title="Services Built to Grow Your Business" subtitle="From single landing pages to complete web applications — I design and develop websites that work as hard as you do." center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.services.slice(0, 3).map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 80}>
              <div className={`card h-full ${s.popular ? 'border-brand-accent/60 ring-1 ring-brand-accent/20' : ''}`}>
                {s.popular && <span className="inline-block bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-4">Most Popular</span>}
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display text-xl text-brand-ink mb-2">{s.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-4">{s.description}</p>
                <p className="font-display text-lg text-brand-accent font-semibold">{s.price}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-10 text-center" delay={200}>
          <Link href="/services" className="btn-secondary">View All Services →</Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Portfolio preview
function PortfolioPreview() {
  return (
    <section className="section-pad bg-brand-bg">
      <div className="section-wrapper">
        <SectionHeading eyebrow="Portfolio" title="Real Websites. Real Results." subtitle="Live websites I have designed and built for real clients — click to visit each one." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.portfolio.slice(0, 2).map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 100}>
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="bg-white border border-brand-rule shadow-card group-hover:shadow-card-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="h-44 bg-brand-bg-alt flex items-center justify-center relative">
                    <span className="font-display text-7xl font-bold text-brand-accent/15">{String(i+1).padStart(2,'0')}</span>
                    <div className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">Live ↗</div>
                  </div>
                  <div className="p-6">
                    <p className="text-brand-muted text-xs mb-1">{p.client}</p>
                    <h3 className="font-display text-xl text-brand-ink group-hover:text-brand-accent transition-colors mb-2">{p.title}</h3>
                    <p className="text-brand-muted text-sm line-clamp-2">{p.excerpt}</p>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-10 text-center" delay={200}>
          <Link href="/portfolio" className="btn-secondary">View Full Portfolio →</Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Testimonial preview
function TestimonialPreview() {
  const t = SITE_CONFIG.testimonials[0];
  return (
    <section className="section-pad bg-white">
      <div className="section-wrapper max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <p className="eyebrow mb-4">Client Voices</p>
          <div className="text-brand-accent text-3xl mb-6">★★★★★</div>
          <blockquote className="font-display text-2xl text-brand-ink italic leading-snug mb-8">
            "{t.text.slice(0, 180)}..."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-bg-alt border-2 border-brand-accent/30 flex items-center justify-center">
              <span className="font-display text-lg text-brand-accent">{t.name.charAt(0)}</span>
            </div>
            <div className="text-left">
              <p className="font-body font-semibold text-brand-ink text-sm">{t.name}</p>
              <p className="font-body text-xs text-brand-muted">{t.role}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// WhatsApp mid-section CTA
function WhatsAppMidCTA() {
  return (
    <section className="py-16 bg-brand-bg-alt">
      <div className="section-wrapper text-center">
        <AnimatedSection>
          <p className="text-brand-muted text-lg mb-6 max-w-xl mx-auto">
            Have a project in mind? Let's discuss it on WhatsApp — I reply fast.
          </p>
          <a href={SITE_CONFIG.whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-8 py-4">
            <WhatsAppIcon />
            Get a Free Consultation
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <NextSeo title={SITE_CONFIG.seo.title} description={SITE_CONFIG.seo.description} />
      <Layout>
        <Hero />
        <ServicesPreview />
        <PortfolioPreview />
        <TestimonialPreview />
        <WhatsAppMidCTA />
        <Reviews />
        <CTABanner />
      </Layout>
    </>
  );
}
