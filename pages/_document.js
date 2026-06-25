// pages/_document.js
// ── DOCUMENT WRAPPER ─────────────────────────────────────────────────────────
// Controls the outer HTML shell. Add third-party scripts here.

import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_CONFIG } from '../lib/config';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon — replace /public/favicon.ico with your own */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0D1117" />

        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": SITE_CONFIG.name,
              "jobTitle": "Freelance Copywriter",
              "url": SITE_CONFIG.seo.siteUrl,
              "email": SITE_CONFIG.email,
              "sameAs": Object.values(SITE_CONFIG.social),
              "description": SITE_CONFIG.seo.description,
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
