// components/layout/Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';
import PageTracker from '../ui/PageTracker';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PageTracker />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
