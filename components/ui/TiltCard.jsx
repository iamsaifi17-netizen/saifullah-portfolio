// components/ui/TiltCard.jsx
// Subtle 3D tilt on hover — desktop + reduced motion safe

import { useRef, useEffect } from 'react';

export default function TiltCard({ children, className = '', intensity = 7 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) scale3d(1.015,1.015,1.015)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)'; };

    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
