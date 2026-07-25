import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_CONFIG } from '../lib/config';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#F8F4EE" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person",
          "name": SITE_CONFIG.name, "jobTitle": "Web Designer & Full Stack Developer",
          "url": SITE_CONFIG.seo.siteUrl, "email": SITE_CONFIG.email,
          "sameAs": Object.values(SITE_CONFIG.social).filter(Boolean),
        })}} />
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}
