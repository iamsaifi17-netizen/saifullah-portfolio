// pages/services.js — Light theme

import { NextSeo } from 'next-seo';
import Layout from '../components/layout/Layout';
import CTABanner from '../components/sections/CTABanner';
import AnimatedSection from '../components/ui/AnimatedSection';
import SectionHeading from '../components/ui/SectionHeading';
import { SITE_CONFIG } from '../lib/config';

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <NextSeo title={`Services | ${SITE_CONFIG.name}`} description="Web design and full stack development services — business websites, portfolios, school sites, landing pages, and UI/UX design." />
      <Layout>

        <section className="pt-32 pb-20 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #C8A96B33 0%, transparent 70%)' }} />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Services</p>
              <h1 className="font-display text-display-lg text-brand-ink">
                Websites That <span className="text-brand-accent">Work For You</span>
              </h1>
              <p className="mt-4 text-brand-muted text-lg max-w-2xl leading-relaxed">
                From a simple landing page to a full business website — I design and develop everything with clean code, modern design, and real results in mind.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* All services */}
        <section className="section-pad bg-white">
          <div className="section-wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SITE_CONFIG.services.map((s, i) => (
                <AnimatedSection key={s.id} delay={i * 80}>
                  <div className={`bg-white border-2 shadow-card p-8 h-full flex flex-col hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 ${s.popular ? 'border-brand-accent' : 'border-brand-rule'}`}>
                    {s.popular && (
                      <span className="inline-block bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-4 self-start">Most Popular</span>
                    )}
                    <div className="text-4xl mb-5">{s.icon}</div>
                    <h3 className="font-display text-2xl text-brand-ink mb-3">{s.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-5">{s.description}</p>
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-brand-muted">
                          <span className="text-brand-accent text-xs flex-shrink-0">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-5 border-t border-brand-rule">
                      <p className="font-display text-xl text-brand-accent font-semibold">{s.price}</p>
                      <a href={SITE_CONFIG.whatsappMsg} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand-whatsapp text-white text-xs font-semibold px-4 py-2 hover:bg-[#22c55e] transition-colors">
                        <WhatsAppIcon /> Get Quote
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose me */}
        <section className="section-pad bg-brand-bg">
          <div className="section-wrapper">
            <SectionHeading eyebrow="Why Me" title="The Saifullah Difference" center />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '⚡', title: 'Fast Delivery',          desc: 'Most websites delivered in 3–7 days. Landing pages in 24–48 hours.' },
                { icon: '📱', title: '100% Mobile Responsive', desc: 'Every site works perfectly on phones, tablets, and desktops.' },
                { icon: '🔍', title: 'SEO Optimized',          desc: 'Built with proper meta tags, fast loading, and clean code for search engines.' },
                { icon: '🔄', title: 'Free Revisions',         desc: '2 rounds of revisions included — we work until it is exactly right.' },
                { icon: '💬', title: 'Clear Communication',    desc: 'Regular updates throughout the project. You always know where we stand.' },
                { icon: '🚀', title: 'Free Hosting',           desc: 'Deployed on Vercel for free. Only pay for a domain if you want one.' },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 70}>
                  <div className="bg-white border border-brand-rule shadow-card p-6 hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="font-display text-xl text-brand-ink mb-2">{item.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </Layout>
    </>
  );
}
