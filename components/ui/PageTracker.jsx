// components/ui/PageTracker.jsx
// ── INVISIBLE PAGE TRACKER ────────────────────────────────────────────────────
// Add this to your Layout and it automatically tracks every page visit.
// Completely invisible to visitors — no cookies, no popups, no GDPR banners.
// Runs AFTER page load so it never slows down the user experience.

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PageTracker() {
  const router = useRouter();

  useEffect(() => {
    // Track function — called on every page change
    const trackVisit = async (url) => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page:     url || window.location.pathname,
            referrer: document.referrer || 'direct',
          }),
        });
      } catch {
        // Fail silently — never interrupt the user
      }
    };

    // Track initial page load
    trackVisit(router.asPath);

    // Track subsequent navigation (SPA routing)
    const handleRouteChange = (url) => trackVisit(url);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Renders nothing — completely invisible
  return null;
}
