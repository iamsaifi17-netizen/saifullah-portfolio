// components/ui/SectionHeading.jsx
import AnimatedSection from './AnimatedSection';

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <AnimatedSection className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`font-display text-display-lg text-brand-ink ${center ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-brand-muted text-base leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 h-0.5 w-12 bg-brand-accent ${center ? 'mx-auto' : ''}`} />
    </AnimatedSection>
  );
}
