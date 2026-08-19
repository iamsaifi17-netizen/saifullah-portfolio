// components/ui/StarRating.jsx
import { useState, useEffect, useRef } from 'react';

export function StarRating({ rating = 5, animate = true, size = 'md', interactive = false, onChange }) {
  const [shown,   setShown]   = useState(animate ? 0 : rating);
  const [hovered, setHovered] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  const sz = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }[size] || 'text-lg';

  useEffect(() => {
    if (!animate || done.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(rating); return; }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let i = 0;
        const t = setInterval(() => { i++; setShown(i); if (i >= rating) clearInterval(t); }, 120);
      }
    }, { threshold: 0.5 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rating, animate]);

  const cur = interactive ? (hovered || shown) : shown;

  return (
    <div ref={ref} className={`flex gap-0.5 ${sz}`} aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={`transition-all duration-150 ${n <= cur ? 'text-brand-accent' : 'text-brand-rule'} ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
          onClick={interactive ? () => { setShown(n); onChange?.(n); } : undefined}
          onMouseEnter={interactive ? () => setHovered(n) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
        >★</span>
      ))}
    </div>
  );
}
