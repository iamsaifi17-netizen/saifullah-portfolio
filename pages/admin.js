// pages/admin.js
// ── ADMIN ANALYTICS DASHBOARD ─────────────────────────────────────────────────
// Access at: yourwebsite.vercel.app/admin
// Password: saifi2026admin (change in Vercel env vars → ANALYTICS_PASSWORD)
// This page is NOT linked anywhere — only you know the URL.

import { useState, useEffect } from 'react';
import Head from 'next/head';

// ── PASSWORD ──────────────────────────────────────────────────────────────────
// ✏️ Change this to match your ANALYTICS_PASSWORD environment variable
const ADMIN_PASSWORD = 'saifi2026admin';

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = 'text-brand-accent' }) {
  return (
    <div className="bg-brand-steel border border-brand-rule p-6">
      <p className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">{label}</p>
      <p className={`font-display text-4xl font-bold ${color}`}>{value ?? '—'}</p>
      {sub && <p className="font-body text-xs text-brand-ghost mt-1">{sub}</p>}
    </div>
  );
}

// ── BAR CHART ─────────────────────────────────────────────────────────────────
function MiniBar({ label, count, max, color = '#C8A96E' }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="font-body text-xs text-brand-ghost w-32 truncate flex-shrink-0">{label}</span>
      <div className="flex-grow h-2 bg-brand-ink rounded-none overflow-hidden">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="font-body text-xs text-brand-accent w-8 text-right flex-shrink-0">{count}</span>
    </div>
  );
}

// ── DAILY CHART ───────────────────────────────────────────────────────────────
function DailyChart({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((day) => (
        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
          <span className="font-body text-[10px] text-brand-ghost">{day.count || ''}</span>
          <div className="w-full relative flex-grow flex items-end">
            <div
              className="w-full bg-brand-accent/80 transition-all duration-700 hover:bg-brand-accent"
              style={{ height: `${max > 0 ? (day.count / max) * 100 : 0}%`, minHeight: day.count > 0 ? '4px' : '0' }}
            />
          </div>
          <span className="font-body text-[9px] text-brand-ghost text-center">
            {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── LOGIN SCREEN ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin(password);
    } else {
      setError('Wrong password. Try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-brand-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-body text-xs font-bold text-brand-accent border border-brand-accent px-1.5 py-0.5 mr-2">&lt;/&gt;</span>
          <span className="font-display text-2xl text-brand-mist">Admin Panel</span>
        </div>
        <form onSubmit={handleSubmit} className="bg-brand-steel border border-brand-rule p-8 space-y-5">
          <div>
            <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter password..."
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="btn-primary w-full justify-center">
            Access Dashboard →
          </button>
        </form>
        <p className="text-center text-brand-ghost text-xs mt-4">
          This page is not publicly linked.
        </p>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed,   setAuthed]   = useState(false);
  const [password, setPassword] = useState('');
  const [data,     setData]     = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [lastRefresh, setLastRefresh] = useState(null);

  // Fetch analytics data
  const fetchData = async (pwd) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/analytics?password=${pwd}`);
      if (!res.ok) throw new Error('Unauthorized');
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to load analytics. Check your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (pwd) => {
    setPassword(pwd);
    setAuthed(true);
    fetchData(pwd);
  };

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!authed || !password) return;
    const interval = setInterval(() => fetchData(password), 60000);
    return () => clearInterval(interval);
  }, [authed, password]);

  if (!authed) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Muhammad Saifullah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-brand-ink text-brand-mist">

        {/* ── HEADER ── */}
        <div className="bg-brand-slate border-b border-brand-rule px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-body text-xs font-bold text-brand-accent border border-brand-accent px-1.5 py-0.5">&lt;/&gt;</span>
            <span className="font-display text-xl text-brand-mist">Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {lastRefresh && (
              <span className="text-brand-ghost text-xs">Last updated: {lastRefresh}</span>
            )}
            <button
              onClick={() => fetchData(password)}
              disabled={loading}
              className="btn-secondary text-xs py-2 px-4"
            >
              {loading ? 'Loading...' : '↻ Refresh'}
            </button>
            <a href="/" className="btn-ghost text-xs">← Back to Site</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {loading && !data && (
            <div className="text-center py-20">
              <p className="text-brand-ghost">Loading analytics...</p>
            </div>
          )}

          {data && (
            <>
              {/* ── STAT CARDS ── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Visits"      value={data.totalVisits}    sub="All time" />
                <StatCard label="Unique Visitors"   value={data.uniqueVisitors} sub="By IP address" />
                <StatCard label="Today"             value={data.todayVisits}    sub={`${data.todayUnique} unique`} color="text-green-400" />
                <StatCard label="This Week"         value={data.weekVisits}     sub="Last 7 days" color="text-blue-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* ── DAILY CHART ── */}
                <div className="lg:col-span-2 bg-brand-steel border border-brand-rule p-6">
                  <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-6">
                    Daily Visits — Last 7 Days
                  </h2>
                  <DailyChart data={data.dailyVisits} />
                </div>

                {/* ── DEVICE BREAKDOWN ── */}
                <div className="bg-brand-steel border border-brand-rule p-6">
                  <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-4">
                    Device Types
                  </h2>
                  {Object.entries(data.deviceCounts || {}).length === 0 ? (
                    <p className="text-brand-ghost text-sm">No data yet</p>
                  ) : (
                    Object.entries(data.deviceCounts).map(([device, count]) => (
                      <MiniBar
                        key={device}
                        label={device}
                        count={count}
                        max={Math.max(...Object.values(data.deviceCounts))}
                      />
                    ))
                  )}

                  <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-4 mt-6">
                    Browsers
                  </h2>
                  {Object.entries(data.browserCounts || {}).length === 0 ? (
                    <p className="text-brand-ghost text-sm">No data yet</p>
                  ) : (
                    Object.entries(data.browserCounts).map(([browser, count]) => (
                      <MiniBar
                        key={browser}
                        label={browser}
                        count={count}
                        max={Math.max(...Object.values(data.browserCounts))}
                        color="#60A5FA"
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* ── TOP PAGES ── */}
                <div className="bg-brand-steel border border-brand-rule p-6">
                  <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-4">
                    Most Visited Pages
                  </h2>
                  {data.topPages?.length === 0 ? (
                    <p className="text-brand-ghost text-sm">No data yet</p>
                  ) : (
                    data.topPages?.map(({ page, count }) => (
                      <MiniBar
                        key={page}
                        label={page}
                        count={count}
                        max={data.topPages[0]?.count || 1}
                      />
                    ))
                  )}
                </div>

                {/* ── TOP REFERRERS ── */}
                <div className="bg-brand-steel border border-brand-rule p-6">
                  <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-4">
                    Traffic Sources
                  </h2>
                  {data.topReferrers?.length === 0 ? (
                    <p className="text-brand-ghost text-sm">No data yet</p>
                  ) : (
                    data.topReferrers?.map(({ referrer, count }) => (
                      <MiniBar
                        key={referrer}
                        label={referrer === 'direct' ? '🔗 Direct' : referrer}
                        count={count}
                        max={data.topReferrers[0]?.count || 1}
                        color="#A78BFA"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* ── RECENT VISITS TABLE ── */}
              <div className="bg-brand-steel border border-brand-rule p-6">
                <h2 className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-5">
                  Recent Visitors
                </h2>
                {data.recentVisits?.length === 0 ? (
                  <p className="text-brand-ghost text-sm">No visits recorded yet. Visit your website to start tracking!</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-brand-rule">
                          {['Time', 'Page', 'IP', 'Device', 'Browser', 'Country', 'Referrer'].map(h => (
                            <th key={h} className="text-left text-brand-ghost font-body font-medium uppercase tracking-widest py-2 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.recentVisits.map((visit) => (
                          <tr key={visit.id} className="border-b border-brand-rule/50 hover:bg-brand-ink/30 transition-colors">
                            <td className="py-2.5 pr-4 text-brand-ghost whitespace-nowrap">
                              {new Date(visit.timestamp).toLocaleString('en-US', {
                                month: 'short', day: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </td>
                            <td className="py-2.5 pr-4 text-brand-accent font-mono">{visit.page}</td>
                            <td className="py-2.5 pr-4 text-brand-ghost font-mono">{visit.ip}</td>
                            <td className="py-2.5 pr-4 text-brand-ghost">{visit.device}</td>
                            <td className="py-2.5 pr-4 text-brand-ghost">{visit.browser}</td>
                            <td className="py-2.5 pr-4 text-brand-ghost">{visit.country}</td>
                            <td className="py-2.5 pr-4 text-brand-ghost truncate max-w-[150px]">
                              {visit.referrer === 'direct' ? '—' : visit.referrer}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ── NOTE ── */}
              <div className="mt-6 bg-brand-slate border border-brand-rule p-4">
                <p className="text-brand-ghost text-xs leading-relaxed">
                  <strong className="text-brand-accent">Note:</strong> Analytics data is stored in server memory and resets when Vercel cold-starts the serverless function (usually after ~30 minutes of inactivity). To make data permanent, connect a free database like PlanetScale or Supabase later. Your password is: <code className="text-brand-accent bg-brand-ink px-1.5 py-0.5 rounded">saifi2026admin</code> — change it in Vercel Environment Variables.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
