// pages/404.js — Custom 404 Not Found page

import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-brand-ink">
        <div className="text-center px-4">
          <p className="font-display text-[10rem] font-bold text-brand-accent/10 leading-none select-none">404</p>
          <h1 className="font-display text-4xl text-brand-mist -mt-8 mb-4">Page Not Found</h1>
          <p className="text-brand-ghost max-w-md mx-auto mb-8">
            This page doesn't exist — but great content does. Head back home and find what you're looking for.
          </p>
          <Link href="/" className="btn-primary">← Back to Home</Link>
        </div>
      </section>
    </Layout>
  );
}
