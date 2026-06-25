// components/sections/Services.jsx
// ── SERVICES SECTION ─────────────────────────────────────────────────────────
// ✏️ Edit services in lib/config.js → SITE_CONFIG.services

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SITE_CONFIG } from '../../lib/config';
import SectionHeading from '../ui/SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group bg-brand-steel border p-8 transition-all duration-300
        hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(200,169,110,0.12)]
        ${service.popular
          ? 'border-brand-accent/60'
          : 'border-brand-rule hover:border-brand-accent/30'
        }`}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute -top-3 left-6 bg-brand-accent px-3 py-0.5">
          <p className="font-body text-[10px] font-bold text-brand-ink uppercase tracking-widest">
            Most Popular
          </p>
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-6">{service.icon}</div>

      {/* Title */}
      <h3 className="font-display text-2xl text-brand-mist mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-brand-ghost text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="space-y-2.5 mb-8">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-brand-ghost">
            <span className="text-brand-accent text-xs flex-shrink-0">◆</span>
            {feat}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-brand-rule">
        <p className="font-display text-lg text-brand-accent">{service.price}</p>
        <Link href="/contact" className="btn-ghost text-xs">
          Get a Quote →
        </Link>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)' }}
      />
    </motion.div>
  );
}

export default function Services({ preview = false }) {
  const services = preview ? SITE_CONFIG.services.slice(0, 3) : SITE_CONFIG.services;

  return (
    <section className="section-pad bg-brand-ink">
      <div className="section-wrapper">
        <SectionHeading
          eyebrow="What I Do"
          title="Services Designed to Drive Results"
          subtitle="From conversion-focused copy to platform-native content strategy — I write for audiences that matter and clients who value quality."
          center
        />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA row */}
        {preview && (
          <AnimatedSection className="mt-12 text-center">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
