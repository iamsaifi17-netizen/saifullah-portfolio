// pages/contact.js — WhatsApp-first contact page

import { NextSeo } from 'next-seo';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../lib/config';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <NextSeo title={`Contact | ${SITE_CONFIG.name}`} description="Get in touch with Muhammad Saifullah on WhatsApp to discuss your web design project." />
      <Layout>

        {/* HERO */}
        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #C8A96B33 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10 text-center max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="eyebrow mb-3">Let's Talk</p>
              <h1 className="font-display text-display-lg text-brand-ink mb-4">
                Ready to Build Your Website?
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed">
                Let's discuss your project on WhatsApp. Tell me what you need and I'll get back to you fast with a timeline and a fair price.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="section-pad bg-white">
          <div className="section-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* LEFT — WhatsApp CTA */}
              <AnimatedSection direction="left">
                <div className="space-y-6">
                  <h2 className="font-display text-display-md text-brand-ink">
                    Start a Conversation
                  </h2>
                  <p className="text-brand-muted text-base leading-relaxed">
                    The fastest way to reach me is WhatsApp. Send me a message describing your project and I'll reply with ideas, a timeline, and a fair price — usually within a few hours.
                  </p>

                  {/* Big WhatsApp button */}
                  <a
                    href={SITE_CONFIG.whatsappMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-base px-8 py-5 w-full justify-center"
                  >
                    <WhatsAppIcon size={22} />
                    Chat on WhatsApp Now
                  </a>

                  {/* Alternative contacts */}
                  <div className="space-y-4 pt-6 border-t border-brand-rule">
                    <p className="font-body text-xs text-brand-muted uppercase tracking-widest font-semibold">Other Ways to Reach Me</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-brand-muted hover:text-brand-accent transition-colors text-sm">
                      <span className="w-8 h-8 border border-brand-rule flex items-center justify-center text-brand-accent">✉</span>
                      {SITE_CONFIG.email}
                    </a>
                    <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-muted hover:text-brand-accent transition-colors text-sm">
                      <span className="w-8 h-8 border border-brand-rule flex items-center justify-center text-brand-accent">📘</span>
                      Facebook Page
                    </a>
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-muted hover:text-brand-accent transition-colors text-sm">
                      <span className="w-8 h-8 border border-brand-rule flex items-center justify-center text-brand-accent">💼</span>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* RIGHT — Info cards */}
              <AnimatedSection direction="right" className="space-y-5">

                {/* Availability */}
                <div className="bg-brand-bg border border-brand-rule p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="font-body text-xs font-semibold text-green-600 uppercase tracking-widest">Currently Available</p>
                  </div>
                  <p className="text-brand-muted text-sm">Open to new projects, landing pages, and full websites. Book your spot before my calendar fills up.</p>
                </div>

                {/* Process */}
                <div className="bg-brand-bg border border-brand-rule p-6">
                  <p className="eyebrow mb-4">How It Works</p>
                  <ol className="space-y-4">
                    {[
                      { n: '01', t: 'Message Me on WhatsApp', d: 'Tell me about your project — what you need, your audience, and your goals.' },
                      { n: '02', t: 'Get a Proposal',         d: 'I reply with a timeline, price, and plan within 24 hours.' },
                      { n: '03', t: 'We Build It Together',   d: 'I design and develop your website with regular updates throughout.' },
                      { n: '04', t: 'Launch & Support',       d: 'Your website goes live on Vercel. I provide a guide and ongoing support.' },
                    ].map(item => (
                      <li key={item.n} className="flex items-start gap-4">
                        <span className="font-display text-2xl text-brand-accent/30 font-bold flex-shrink-0">{item.n}</span>
                        <div>
                          <p className="font-body text-sm font-semibold text-brand-ink">{item.t}</p>
                          <p className="font-body text-xs text-brand-muted mt-0.5">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Pricing reminder */}
                <div className="bg-brand-accent/5 border border-brand-accent/30 p-6">
                  <p className="eyebrow mb-3">Starting Prices</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Landing Page',     price: '$30' },
                      { label: 'Portfolio Site',   price: '$50' },
                      { label: 'School Website',   price: '$70' },
                      { label: 'Business Website', price: '$80' },
                    ].map(item => (
                      <div key={item.label} className="bg-white border border-brand-rule p-3">
                        <p className="font-display text-lg text-brand-accent font-semibold">{item.price}</p>
                        <p className="font-body text-xs text-brand-muted mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </AnimatedSection>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
}
