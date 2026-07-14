// components/layout/Footer.jsx
import Link from 'next/link';
import { SITE_CONFIG } from '../../lib/config';

const quickLinks = [
  { label: 'Home',      href: '/'         },
  { label: 'About',     href: '/about'    },
  { label: 'Services',  href: '/services' },
  { label: 'Portfolio', href: '/portfolio'},
  { label: 'Resume',    href: '/resume'   },
  { label: 'Blog',      href: '/blog'     },
  { label: 'Contact',   href: '/contact'  },
];

const socialLinks = [
  { label: 'LinkedIn',  href: SITE_CONFIG.social.linkedin,  icon: 'in' },
  { label: 'Facebook',  href: SITE_CONFIG.social.facebook,  icon: 'fb' },
  { label: 'GitHub',    href: SITE_CONFIG.social.github,    icon: 'gh' },
  { label: 'Fiverr',    href: SITE_CONFIG.social.fiverr,    icon: 'fv' },
];

function SocialIcon({ label, href, icon }) {
  const icons = {
    in: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    fb: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    gh: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    fv: <span className="text-xs font-bold">Fv</span>,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 border border-brand-rule flex items-center justify-center text-brand-ghost hover:text-brand-accent hover:border-brand-accent transition-all duration-200"
    >
      {icons[icon]}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate border-t border-brand-rule">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-body text-xs font-bold text-brand-accent border border-brand-accent px-1 py-0.5">&lt;/&gt;</span>
              <span className="font-display text-xl font-semibold text-brand-mist">
                {SITE_CONFIG.shortName}<span className="text-brand-accent">.</span>
              </span>
            </Link>
            <p className="text-brand-ghost text-sm leading-relaxed max-w-xs">
              Frontend Web Developer & Web Designer. Building modern websites for businesses and personal brands worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(s => <SocialIcon key={s.label} {...s} />)}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="eyebrow mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-brand-ghost text-sm hover:text-brand-accent transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="eyebrow mb-5">Get In Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-ghost text-sm hover:text-brand-accent transition-colors flex items-center gap-2">
                  <span>✉</span> {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-ghost text-sm hover:text-brand-accent transition-colors flex items-center gap-2">
                  <span>📞</span> {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-ghost text-sm hover:text-brand-accent transition-colors flex items-center gap-2">
                  <span>📘</span> Facebook Page
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-ghost text-sm hover:text-brand-accent transition-colors flex items-center gap-2">
                  <span>💼</span> LinkedIn Profile
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">Start a Project →</Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-rule py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-ghost text-xs">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-brand-ghost text-xs">
            Designed &amp; Developed by <span className="text-brand-accent">Muhammad Saifullah</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
