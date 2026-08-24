// components/layout/Layout.jsx
// Updated: adds CustomCursor + PageTracker
// Do NOT modify Navbar or Footer — they stay exactly as they are

import Navbar from './Navbar';
import Footer from './Footer';
import PageTracker from '../ui/PageTracker';
import CustomCursor from '../ui/CustomCursor';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom gold cursor — desktop only, invisible on touch */}
      <CustomCursor />
      {/* Analytics tracker — invisible, fires on every route change */}
      <PageTracker />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
