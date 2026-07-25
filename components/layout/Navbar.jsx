// components/layout/Navbar.jsx — Light theme + WhatsApp button

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

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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
        ? 'bg-white/95 backdrop-blur-md border-b border-brand-rule shadow-card'
        : 'bg-transparent'
    }`}>
      <nav className="section-wrapper flex items-center justify-between h-18">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-body text-xs font-bold text-white bg-brand-accent px-1.5 py-0.5 mr-1">&lt;/&gt;</span>
          <span className="font-display text-lg font-semibold text-brand-ink group-hover:text-brand-accent transition-colors">
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
                  isActive ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-ink'
                }`}>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA — WhatsApp */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE_CONFIG.whatsappMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs py-2.5 px-4"
          >
            <WhatsAppIcon size={15} />
            Chat on WhatsApp
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-brand-ink transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-0.5 bg-brand-ink transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-brand-ink transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
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
            className="lg:hidden bg-white border-t border-brand-rule shadow-card-lg overflow-hidden"
          >
            <ul className="section-wrapper py-6 flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={`font-body text-base font-medium transition-colors ${
                    router.pathname === href ? 'text-brand-accent' : 'text-brand-muted'
                  }`}>
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={SITE_CONFIG.whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center"
                >
                  <WhatsAppIcon size={16} />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
