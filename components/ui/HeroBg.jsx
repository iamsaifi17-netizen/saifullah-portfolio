// components/ui/HeroBg.jsx
// Animated subtle gold orbs on canvas — behind hero content

import { useEffect, useRef } from 'react';

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const orbs = [
      { x: w * 0.85, y: h * 0.15, r: 260, color: 'rgba(200,169,110,0.06)', vx:  0.15, vy:  0.08 },
      { x: w * 0.10, y: h * 0.75, r: 200, color: 'rgba(200,169,110,0.04)', vx: -0.10, vy: -0.11 },
      { x: w * 0.55, y: h * 0.45, r: 160, color: 'rgba(200,169,110,0.035)',vx:  0.07, vy:  0.14 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r || o.x > w + o.r) o.vx *= -1;
        if (o.y < -o.r || o.y > h + o.r) o.vy *= -1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
