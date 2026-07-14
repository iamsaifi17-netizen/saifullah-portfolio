// components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../lib/config';

const navLinks = [
  { label: 'Home',      href: '/'         },
  { label: 'About',     href: '/about'    },
  { label: 'Services',  href: '/services' },
  { label: 'Portfolio', href: '/portfolio'},
  { label: 'Resume',    href: '/resume'   },
  { label: 'Blog',      href: '/blog'     },
  { label: 'Contact',   href: '/contact'  },
];

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [router.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-brand-ink/95 backdrop-blur-md border-b border-brand-rule shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'bg-transparent'
    }`}>
      <nav className="section-wrapper flex items-center justify-between h-18">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-body text-sm font-bold text-brand-accent border border-brand-accent px-1.5 py-0.5 mr-1">&lt;/&gt;</span>
          <span className="font-display text-lg font-semibold text-brand-mist group-hover:text-brand-accent transition-colors duration-200">
            {SITE_CONFIG.shortName}<span className="text-brand-accent">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, href }) => {
            const isActive = router.pathname === href;
            return (
              <li key={href}>
                <Link href={href} className={`font-body text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  isActive ? 'text-brand-accent' : 'text-brand-ghost hover:text-brand-mist'
                }`}>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-brand-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
            Hire Me →
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`w-6 h-px bg-brand-mist transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-px bg-brand-mist transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : ''}`} />
          <span className={`w-6 h-px bg-brand-mist transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-brand-slate border-t border-brand-rule overflow-hidden"
          >
            <ul className="section-wrapper py-6 flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={`font-body text-base font-medium transition-colors duration-200 ${
                    router.pathname === href ? 'text-brand-accent' : 'text-brand-ghost'
                  }`}>
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" className="btn-primary w-full justify-center">Hire Me →</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
