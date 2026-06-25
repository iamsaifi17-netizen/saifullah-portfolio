// components/layout/Layout.jsx
// ── PAGE LAYOUT WRAPPER ──────────────────────────────────────────────────────
// Wraps every page with Navbar and Footer.
// Import and use: <Layout> ... page content ... </Layout>

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
