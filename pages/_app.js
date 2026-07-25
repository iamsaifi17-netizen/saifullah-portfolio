import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { SITE_CONFIG } from '../lib/config';

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title={SITE_CONFIG.seo.title}
        description={SITE_CONFIG.seo.description}
        openGraph={{ type: 'website', url: SITE_CONFIG.seo.siteUrl, siteName: SITE_CONFIG.name }}
      />
      <Component {...pageProps} />
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#fff', color: '#1F1F1F', border: '1px solid #DDD5C8', fontFamily: 'Inter, sans-serif', fontSize: '14px' },
        success: { iconTheme: { primary: '#C8A96B', secondary: '#fff' } },
      }} />
    </>
  );
}
