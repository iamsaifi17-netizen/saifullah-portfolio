// pages/_app.js
// ── APP WRAPPER ──────────────────────────────────────────────────────────────
// This file wraps every page. Add global providers (auth, analytics) here.

import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { SITE_CONFIG } from '../lib/config';

// Default SEO config — overridden on each page as needed
const defaultSEO = {
  title:       SITE_CONFIG.seo.title,
  description: SITE_CONFIG.seo.description,
  canonical:   SITE_CONFIG.seo.siteUrl,
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         SITE_CONFIG.seo.siteUrl,
    siteName:    SITE_CONFIG.name,
    title:       SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    images: [{ url: SITE_CONFIG.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    handle:      SITE_CONFIG.seo.twitterHandle,
    site:        SITE_CONFIG.seo.twitterHandle,
    cardType:    'summary_large_image',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Global SEO defaults */}
      <DefaultSeo {...defaultSEO} />

      {/* Page content */}
      <Component {...pageProps} />

      {/* Toast notifications for form submissions */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A2332',
            color: '#E8EDF4',
            border: '1px solid #2C3D52',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#C8A96E', secondary: '#0D1117' } },
          error:   { iconTheme: { primary: '#EF4444', secondary: '#0D1117' } },
        }}
      />
    </>
  );
}
