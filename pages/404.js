import Link from 'next/link';
import Layout from '../components/layout/Layout';
export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center px-4">
          <p className="font-display text-[9rem] font-bold text-brand-accent/15 leading-none select-none">404</p>
          <h1 className="font-display text-4xl text-brand-ink -mt-8 mb-4">Page Not Found</h1>
          <p className="text-brand-muted max-w-md mx-auto mb-8">This page doesn't exist. Head back home and find what you're looking for.</p>
          <Link href="/" className="btn-primary">← Back to Home</Link>
        </div>
      </section>
    </Layout>
  );
}
