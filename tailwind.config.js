/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind scans these files to purge unused styles in production
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ── BRAND COLORS ──────────────────────────────────────────────
      // Edit these hex values to change the entire site color scheme
      colors: {
        brand: {
          ink:      '#0D1117', // Deep navy-black — used for backgrounds
          slate:    '#1A2332', // Section backgrounds
          steel:    '#243447', // Card/panel backgrounds
          accent:   '#C8A96E', // Warm gold — primary accent (CTAs, highlights)
          'accent-light': '#E8C98A', // Lighter gold for hover states
          mist:     '#E8EDF4', // Near-white for body text on dark bg
          ghost:    '#8B97A8', // Muted text / labels (on dark backgrounds)
          rule:     '#2C3D52', // Subtle dividers
          // ── ADDED — were missing, causing invisible/uncolored text ──
          bg:       '#F8F4EE', // Page background (cream) — matches theme-color meta tag
          muted:    '#5B6472', // Muted text on LIGHT backgrounds (e.g. navbar inactive links)
          whatsapp: '#25D366', // WhatsApp brand green for the CTA button
        },
      },
      // ── TYPOGRAPHY ────────────────────────────────────────────────
      fontFamily: {
        // Display: Cormorant Garamond — editorial, confident, literary
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Body: Inter — clean, professional, highly legible
        body:    ['Inter', 'system-ui', 'sans-serif'],
        // Mono: JetBrains Mono — for code snippets or labels
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom scale tuned for editorial feel
        'display-xl': ['clamp(3rem, 8vw, 7rem)',   { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.2rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      // ── ANIMATIONS ────────────────────────────────────────────────
      animation: {
        'fade-up':     'fadeUp 0.7s ease forwards',
        'fade-in':     'fadeIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.6s ease forwards',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      // ── SPACING & LAYOUT ──────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, #C8A96E40 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
