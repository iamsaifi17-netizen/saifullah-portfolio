// components/ui/SectionHeading.jsx
// ── REUSABLE SECTION HEADING ─────────────────────────────────────────────────
// Usage: <SectionHeading eyebrow="About" title="My Story" subtitle="..." center />

import AnimatedSection from './AnimatedSection';

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <AnimatedSection className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="eyebrow mb-3">{eyebrow}</p>
      )}
      <h2 className={`font-display text-display-lg text-brand-mist ${center ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-brand-ghost text-base leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      {/* Decorative gold rule */}
      <div className={`mt-6 h-px w-16 bg-brand-accent ${center ? 'mx-auto' : ''}`} />
    </AnimatedSection>
  );
}
