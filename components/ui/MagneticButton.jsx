// components/ui/MagneticButton.jsx
// Subtle magnetic cursor attraction on hover — desktop only

import { useRef, useEffect } from 'react';

export default function MagneticButton({ children, className = '', strength = 0.28, tag: Tag = 'span', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r  = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      el.style.transform = `translate(${dx * strength}px,${dy * strength}px)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0,0)'; };

    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <Tag
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
