// lib/analytics.js
// ── PERMANENT ANALYTICS WITH SUPABASE ────────────────────────────────────────
// Stores all visitor data permanently in Supabase free database.
// Data NEVER resets — stored forever.
// Keys are stored safely in Vercel Environment Variables

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

// ── SUPABASE FETCH HELPER ─────────────────────────────────────────────────────
async function supabaseQuery(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      ...options.headers,
    },
  });
  if (res.status === 204 || res.status === 201) return null;
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }
  return res.json();
}

// ── RECORD A VISIT ────────────────────────────────────────────────────────────
export async function recordVisit(data) {
  const visit = {
    page:       data.page      || '/',
    ip:         data.ip        || 'unknown',
    user_agent: data.userAgent || 'unknown',
    referrer:   data.referrer  || 'direct',
    country:    data.country   || 'unknown',
    device:     parseDevice(data.userAgent || ''),
    browser:    parseBrowser(data.userAgent || ''),
  };

  await supabaseQuery('/visits', {
    method:  'POST',
    headers: { 'Prefer': 'return=minimal' },
    body:    JSON.stringify(visit),
  });

  return visit;
}

// ── GET ANALYTICS DATA ────────────────────────────────────────────────────────
export async function getAnalytics() {
  const now         = new Date();
  const oneDayAgo   = new Date(now - 1000 * 60 * 60 * 24).toISOString();
  const oneWeekAgo  = new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString();

  const visits = await supabaseQuery(
    '/visits?select=*&order=timestamp.desc&limit=1000',
    { headers: { 'Prefer': 'return=representation' } }
  ) || [];

  const todayVisits = visits.filter(v => v.timestamp > oneDayAgo);
  const weekVisits  = visits.filter(v => v.timestamp > oneWeekAgo);

  const uniqueIPs   = new Set(visits.map(v => v.ip));
  const uniqueToday = new Set(todayVisits.map(v => v.ip));

  const pageCounts = {};
  visits.forEach(v => { pageCounts[v.page] = (pageCounts[v.page] || 0) + 1; });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1]).slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  const deviceCounts = {};
  visits.forEach(v => { deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1; });

  const browserCounts = {};
  visits.forEach(v => { browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1; });

  const dailyVisits = [];
  for (let i = 6; i >= 0; i--) {
    const date    = new Date(now - 1000 * 60 * 60 * 24 * i);
    const dateStr = date.toISOString().slice(0, 10);
    const count   = visits.filter(v => v.timestamp?.slice(0, 10) === dateStr).length;
    dailyVisits.push({
      date:  dateStr,
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      count,
    });
  }

  const referrerCounts = {};
  visits.forEach(v => {
    const ref = (!v.referrer || v.referrer === '') ? 'direct' : v.referrer;
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  return {
    totalVisits:    visits.length,
    uniqueVisitors: uniqueIPs.size,
    todayVisits:    todayVisits.length,
    todayUnique:    uniqueToday.size,
    weekVisits:     weekVisits.length,
    monthVisits:    visits.length,
    topPages,
    topReferrers,
    dailyVisits,
    deviceCounts,
    browserCounts,
    recentVisits:   visits.slice(0, 20),
  };
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function parseDevice(ua) {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function parseBrowser(ua) {
  if (/edg/i.test(ua))          return 'Edge';
  if (/chrome/i.test(ua))       return 'Chrome';
  if (/firefox/i.test(ua))      return 'Firefox';
  if (/safari/i.test(ua))       return 'Safari';
  if (/opera/i.test(ua))        return 'Opera';
  if (/msie|trident/i.test(ua)) return 'IE';
  return 'Other';
}