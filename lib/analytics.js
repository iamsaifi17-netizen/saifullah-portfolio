// lib/analytics.js
// ── ANALYTICS STORAGE ─────────────────────────────────────────────────────────
// Uses a simple in-memory store that persists via Vercel's serverless functions.
// Data resets on cold starts but accumulates during active sessions.
// For permanent storage, connect Vercel KV (free) later.

// In-memory store — persists as long as the serverless function is warm
const store = {
  visits: [],
  maxVisits: 500, // Keep last 500 visits in memory
};

// ── RECORD A VISIT ────────────────────────────────────────────────────────────
export function recordVisit(data) {
  const visit = {
    id:        Date.now().toString(36) + Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    page:      data.page      || '/',
    ip:        data.ip        || 'unknown',
    userAgent: data.userAgent || 'unknown',
    referrer:  data.referrer  || 'direct',
    country:   data.country   || 'unknown',
    device:    parseDevice(data.userAgent || ''),
    browser:   parseBrowser(data.userAgent || ''),
  };

  // Add to front of array
  store.visits.unshift(visit);

  // Keep only last N visits to avoid memory issues
  if (store.visits.length > store.maxVisits) {
    store.visits = store.visits.slice(0, store.maxVisits);
  }

  return visit;
}

// ── GET ANALYTICS DATA ────────────────────────────────────────────────────────
export function getAnalytics() {
  const visits = store.visits;
  const now = new Date();

  // Time boundaries
  const oneDayAgo   = new Date(now - 1000 * 60 * 60 * 24);
  const oneWeekAgo  = new Date(now - 1000 * 60 * 60 * 24 * 7);
  const oneMonthAgo = new Date(now - 1000 * 60 * 60 * 24 * 30);

  // Filter by time period
  const todayVisits   = visits.filter(v => new Date(v.timestamp) > oneDayAgo);
  const weekVisits    = visits.filter(v => new Date(v.timestamp) > oneWeekAgo);
  const monthVisits   = visits.filter(v => new Date(v.timestamp) > oneMonthAgo);

  // Unique visitors by IP
  const uniqueIPs = new Set(visits.map(v => v.ip));
  const uniqueToday = new Set(todayVisits.map(v => v.ip));

  // Most visited pages
  const pageCounts = {};
  visits.forEach(v => {
    pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  // Device breakdown
  const deviceCounts = {};
  visits.forEach(v => {
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
  });

  // Browser breakdown
  const browserCounts = {};
  visits.forEach(v => {
    browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
  });

  // Daily visits for chart (last 7 days)
  const dailyVisits = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now - 1000 * 60 * 60 * 24 * i);
    const dateStr = date.toISOString().slice(0, 10);
    const count = visits.filter(v => v.timestamp.slice(0, 10) === dateStr).length;
    dailyVisits.push({
      date:  dateStr,
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      count,
    });
  }

  // Referrer breakdown
  const referrerCounts = {};
  visits.forEach(v => {
    const ref = v.referrer === '' ? 'direct' : v.referrer;
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  return {
    totalVisits:    visits.length,
    uniqueVisitors: uniqueIPs.size,
    todayVisits:    todayVisits.length,
    todayUnique:    uniqueToday.size,
    weekVisits:     weekVisits.length,
    monthVisits:    monthVisits.length,
    topPages,
    topReferrers,
    dailyVisits,
    deviceCounts,
    browserCounts,
    recentVisits:   visits.slice(0, 20), // Last 20 visits
  };
}

// ── HELPER: PARSE DEVICE TYPE ─────────────────────────────────────────────────
function parseDevice(ua) {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

// ── HELPER: PARSE BROWSER ─────────────────────────────────────────────────────
function parseBrowser(ua) {
  if (/edg/i.test(ua))     return 'Edge';
  if (/chrome/i.test(ua))  return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua))  return 'Safari';
  if (/opera/i.test(ua))   return 'Opera';
  if (/msie|trident/i.test(ua)) return 'IE';
  return 'Other';
}
