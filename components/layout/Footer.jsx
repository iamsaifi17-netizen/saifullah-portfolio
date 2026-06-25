// components/layout/Footer.jsx
// ── FOOTER ───────────────────────────────────────────────────────────────────
// ✏️ Social links, copyright text, and quick links are pulled from lib/config.js

import Link from 'next/link';
import { SITE_CONFIG } from '../../lib/config';

// Social icon SVG components
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FiverrIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61V11.88h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.743zm-6.786 1.05h-3.43c.097.703.508 1.005 1.171 1.005.478 0 .82-.156 1.006-.546l1.278.37c-.38.76-1.122 1.23-2.284 1.23-1.61 0-2.654-1.083-2.654-2.624 0-1.503 1.034-2.626 2.596-2.626 1.514 0 2.43 1.045 2.43 2.566.001.274-.02.459-.113.625zm-1.562-.957c-.05-.548-.39-.88-.957-.88-.528 0-.89.293-1.006.88h1.963zm-4.903 2.466H7.15v-3.558h-1.61v3.558H4.22V9.403h1.32v2.477h1.61V9.403h1.61v5.04zm-5.51 0H2.64v-3.558H1.03V11.88H2.64v-.37c0-1.25.547-1.876 1.992-1.876h.547v1.35h-.37c-.45 0-.547.117-.547.566v.33h.918v1.603zM24 12.13C24 5.435 18.627 0 12 0 5.372 0 0 5.435 0 12.13 0 18.826 5.372 24 12 24c6.628 0 12-5.174 12-11.87z"/>
  </svg>
);

const socialIcons = {
  linkedin:  LinkedInIcon,
  twitter:   TwitterIcon,
  instagram: InstagramIcon,
  fiverr:    FiverrIcon,
};

const quickLinks = [
  { label: 'Home',      href: '/'         },
  { label: 'About',     href: '/about'    },
  { label: 'Services',  href: '/services' },
  { label: 'Portfolio', href: '/portfolio'},
  { label: 'Blog',      href: '/blog'     },
  { label: 'Contact',   href: '/contact'  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate border-t border-brand-rule">
      <div className="section-wrapper">

        {/* ── MAIN FOOTER GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-semibold text-brand-mist">
              {SITE_CONFIG.shortName}<span className="text-brand-accent">.</span>
            </Link>
            <p className="text-brand-ghost text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.subTagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 pt-2">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="text-brand-ghost hover:text-brand-accent transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="eyebrow mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-brand-ghost text-sm hover:text-brand-accent transition-colors duration-200"
                  >
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
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-brand-ghost text-sm hover:text-brand-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <span>✉</span> {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-ghost text-sm hover:text-brand-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <span>💼</span> LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.social.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-ghost text-sm hover:text-brand-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <span>🌿</span> Fiverr Profile
                </a>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-brand-rule py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* ✏️ Edit the copyright text here */}
          <p className="text-brand-ghost text-xs">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-brand-ghost text-xs">
            Crafting words that convert — from Pakistan to the world.
          </p>
        </div>

      </div>
    </footer>
  );
}
