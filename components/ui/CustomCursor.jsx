// components/ui/CustomCursor.jsx
// Elegant gold custom cursor — desktop only, GPU accelerated

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      }
      if (!visible) setVisible(true);
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const onOver  = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) setExpanded(true);
    };
    const onOut   = () => setExpanded(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove',    onMove);
    window.addEventListener('mouseover',    onOver);
    window.addEventListener('mouseout',     onOut);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove',    onMove);
      window.removeEventListener('mouseover',    onOver);
      window.removeEventListener('mouseout',     onOut);
      document.removeEventListener('mouseleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: '#C8A96E',
          marginLeft: -4, marginTop: -4,
          pointerEvents: 'none', zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width:  expanded ? 44 : 28,
          height: expanded ? 44 : 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(200,169,110,0.55)',
          marginLeft: expanded ? -22 : -14,
          marginTop:  expanded ? -22 : -14,
          pointerEvents: 'none', zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'width 0.3s, height 0.3s, margin 0.3s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
