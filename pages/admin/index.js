// pages/admin/index.js - Full Admin Dashboard with cookie auth

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const TABS = ['Dashboard', 'Projects', 'Reviews', 'Messages'];

function StatCard({ label, value, sub, color = 'text-yellow-400' }) {
  return (
    <div className="bg-[#1A2332] border border-[#2C3D52] p-5">
      <p className="text-[#8B97A8] text-xs uppercase tracking-widest mb-1">{label}</p>
      <p className={`font-bold text-3xl ${color}`}>{value ?? '—'}</p>
      {sub && <p className="text-[#8B97A8] text-xs mt-1">{sub}</p>}
    </div>
  );
}

function Badge({ label, color }) {
  const c = { green:'bg-green-500/20 text-green-400 border-green-500/30', yellow:'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', red:'bg-red-500/20 text-red-400 border-red-500/30', blue:'bg-blue-500/20 text-blue-400 border-blue-500/30', gray:'bg-gray-500/20 text-gray-400 border-gray-500/30' };
  return <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${c[color]||c.gray}`}>{label}</span>;
}

function Inp({ label, k, form, h, type='text' }) {
  return (
    <div>
      <label className="block text-xs text-[#8B97A8] uppercase tracking-widest mb-1">{label}</label>
      <input type={type} value={form[k]||''} onChange={h(k)} className="w-full bg-[#0D1117] border border-[#2C3D52] text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400" />
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setErr('');
    try {
      const res = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:pw}) });
      if (res.ok) onLogin(); else { setErr('Wrong password.'); setPw(''); }
    } catch { setErr('Network error.'); } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-xs font-bold text-yellow-400 border border-yellow-400 px-2 py-1 mr-2">&lt;/&gt;</span>
          <span className="text-white text-xl font-semibold">Admin Panel</span>
        </div>
        <form onSubmit={submit} className="bg-[#1A2332] border border-[#2C3D52] p-8 space-y-5">
          <div>
            <label className="block text-xs text-[#8B97A8] uppercase tracking-widest mb-2">Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="w-full bg-[#0D1117] border border-[#2C3D52] text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400" placeholder="Enter admin password..." autoFocus />
          </div>
          {err && <p className="text-red-400 text-xs">{err}</p>}
          <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-[#0D1117] font-bold py-3 text-sm hover:bg-yellow-300 transition-colors disabled:opacity-60">
            {loading ? 'Checking...' : 'Access Dashboard →'}
          </button>
        </form>
        <p className="text-[#8B97A8] text-xs text-center mt-4">This page is not publicly linked.</p>
      </div>
    </div>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState([]); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState(null); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState('');
  const EMPTY = { title:'',slug:'',short_desc:'',long_desc:'',category:'',tags:'',client:'',status:'completed',image_url:'',live_url:'',github_url:'',is_published:true,is_featured:false,sort_order:0,seo_title:'',seo_description:'' };
  const [form, setForm] = useState(EMPTY);
  const load = useCallback(async () => { setLoading(true); try { const r=await fetch('/api/admin/projects'); setProjects(await r.json()); } catch { setProjects([]); } finally { setLoading(false); } }, []);
  useEffect(() => { load(); }, [load]);
  const h = k => e => setForm(f => ({...f,[k]:e.target.type==='checkbox'?e.target.checked:e.target.value}));
  const save = async () => {
    setSaving(true); setMsg('');
    try {
      const body = {...form, tags: form.tags ? form.tags.split(',').map(t=>t.trim()).filter(Boolean) : []};
      const isNew = editing==='new';
      const res = await fetch('/api/admin/projects', { method:isNew?'POST':'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(isNew?body:{id:editing.id,...body}) });
      if (!res.ok) throw new Error((await res.json()).error);
      setMsg('Saved!'); setEditing(null); load();
    } catch(e) { setMsg('Error: '+e.message); } finally { setSaving(false); }
  };
  const toggle = async (id,field,val) => { await fetch('/api/admin/projects',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,[field]:val})}); load(); };
  const remove = async id => { if(!confirm('Delete?'))return; await fetch('/api/admin/projects',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); load(); };

  if (editing) return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><h2 className="text-white text-lg font-semibold">{editing==='new'?'New Project':'Edit Project'}</h2><button onClick={()=>setEditing(null)} className="text-[#8B97A8] hover:text-white text-sm">← Back</button></div>
      {msg && <p className={`text-sm px-4 py-2 ${msg.startsWith('Error')?'bg-red-500/10 text-red-400':'bg-green-500/10 text-green-400'}`}>{msg}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Inp label="Title *" k="title" form={form} h={h} />
        <Inp label="Slug" k="slug" form={form} h={h} />
        <Inp label="Client" k="client" form={form} h={h} />
        <Inp label="Category" k="category" form={form} h={h} />
        <Inp label="Image URL" k="image_url" form={form} h={h} />
        <Inp label="Live URL" k="live_url" form={form} h={h} />
        <Inp label="GitHub URL" k="github_url" form={form} h={h} />
        <Inp label="Sort Order" k="sort_order" form={form} h={h} type="number" />
        <div>
          <label className="block text-xs text-[#8B97A8] uppercase tracking-widest mb-1">Status</label>
          <select value={form.status} onChange={h('status')} className="w-full bg-[#0D1117] border border-[#2C3D52] text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400">
            <option value="completed">Completed</option><option value="coming-soon">Coming Soon</option><option value="in-development">In Development</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#8B97A8] uppercase tracking-widest mb-1">Tags (comma separated)</label>
          <input type="text" value={form.tags||''} onChange={h('tags')} placeholder="React, Next.js, Firebase" className="w-full bg-[#0D1117] border border-[#2C3D52] text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400" />
        </div>
      </div>
      {[['short_desc','Short Description *',3],['long_desc','Long Description',5],['seo_title','SEO Title',2],['seo_description','SEO Description',2]].map(([k,label,rows])=>(
        <div key={k}>
          <label className="block text-xs text-[#8B97A8] uppercase tracking-widest mb-1">{label}</label>
          <textarea value={form[k]||''} onChange={h(k)} rows={rows} className="w-full bg-[#0D1117] border border-[#2C3D52] text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-none" />
        </div>
      ))}
      <div className="flex gap-6">
        {[['is_published','Published'],['is_featured','Featured']].map(([k,label])=>(
          <label key={k} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!form[k]} onChange={h(k)} className="accent-yellow-400 w-4 h-4" />
            <span className="text-[#8B97A8] text-sm">{label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving} className="bg-yellow-400 text-[#0D1117] font-bold px-8 py-3 text-sm hover:bg-yellow-300 transition-colors disabled:opacity-60">{saving?'Saving...':'Save Project'}</button>
        <button onClick={()=>setEditing(null)} className="border border-[#2C3D52] text-[#8B97A8] px-6 py-3 text-sm hover:text-white hover:border-white transition-colors">Cancel</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">DB Projects ({projects.length})</h2>
        <button onClick={()=>{setForm(EMPTY);setEditing('new');setMsg('');}} className="bg-yellow-400 text-[#0D1117] font-bold px-5 py-2 text-sm hover:bg-yellow-300 transition-colors">+ Add Project</button>
      </div>
      {loading ? <p className="text-[#8B97A8]">Loading...</p> : (
        <div className="space-y-3">
          {projects.length===0 && <p className="text-[#8B97A8] text-sm py-8 text-center">No DB projects yet. Your existing projects are in config.js.</p>}
          {projects.map(p=>(
            <div key={p.id} className="bg-[#1A2332] border border-[#2C3D52] p-4 flex flex-wrap items-center gap-3">
              <div className="flex-grow min-w-0">
                <p className="text-white text-sm font-semibold truncate">{p.title}</p>
                <p className="text-[#8B97A8] text-xs">{p.category} · {p.client}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge label={p.status||'completed'} color={p.status==='completed'?'green':p.status==='coming-soon'?'blue':'yellow'} />
                {p.is_published ? <Badge label="Live" color="green"/> : <Badge label="Draft" color="gray"/>}
                {p.is_featured && <Badge label="Featured" color="yellow"/>}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>toggle(p.id,'is_published',!p.is_published)} className="text-xs border border-[#2C3D52] px-3 py-1.5 text-[#8B97A8] hover:text-white hover:border-white transition-colors">{p.is_published?'Unpublish':'Publish'}</button>
                <button onClick={()=>{setForm({...p,tags:Array.isArray(p.tags)?p.tags.join(', '):p.tags||''});setEditing(p);setMsg('');}} className="text-xs border border-[#2C3D52] px-3 py-1.5 text-[#8B97A8] hover:text-white hover:border-white transition-colors">Edit</button>
                <button onClick={()=>remove(p.id)} className="text-xs border border-red-500/30 px-3 py-1.5 text-red-400 hover:bg-red-500/10 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsTab() {
  const [reviews,setReviews]=useState([]); const [filter,setFilter]=useState('all'); const [loading,setLoading]=useState(true);
  const load = useCallback(async () => { setLoading(true); try { const q=filter!=='all'?`?status=${filter}`:''; const r=await fetch(`/api/admin/reviews${q}`); setReviews(await r.json()); } catch { setReviews([]); } finally { setLoading(false); } },[filter]);
  useEffect(()=>{load();},[load]);
  const update = async (id,updates) => { await fetch('/api/admin/reviews',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,...updates})}); load(); };
  const remove = async id => { if(!confirm('Delete review?'))return; await fetch('/api/admin/reviews',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); load(); };
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-white text-lg font-semibold">Reviews ({reviews.length})</h2>
        <div className="flex gap-2">
          {['all','pending','approved','rejected'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`text-xs px-3 py-1.5 border transition-colors ${filter===s?'bg-yellow-400 text-[#0D1117] border-yellow-400 font-bold':'border-[#2C3D52] text-[#8B97A8] hover:text-white'}`}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {loading ? <p className="text-[#8B97A8]">Loading...</p> : (
        <div className="space-y-3">
          {reviews.length===0 && <p className="text-[#8B97A8] text-sm py-8 text-center">No reviews found.</p>}
          {reviews.map(r=>(
            <div key={r.id} className="bg-[#1A2332] border border-[#2C3D52] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-[#8B97A8] text-xs">{r.email}</p>
                  {r.project_name && <p className="text-yellow-400/70 text-xs mt-0.5">Project: {r.project_name}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                  <Badge label={r.status} color={r.status==='approved'?'green':r.status==='pending'?'yellow':'red'} />
                </div>
              </div>
              <p className="text-[#8B97A8] text-sm leading-relaxed mb-4 italic">"{r.comment}"</p>
              <div className="flex flex-wrap gap-2">
                {r.status!=='approved' && <button onClick={()=>update(r.id,{status:'approved'})} className="text-xs bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 hover:bg-green-500/30 transition-colors">✓ Approve</button>}
                {r.status!=='rejected' && <button onClick={()=>update(r.id,{status:'rejected'})} className="text-xs bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 hover:bg-red-500/30 transition-colors">✗ Reject</button>}
                {r.status==='approved' && <button onClick={()=>update(r.id,{status:'pending'})} className="text-xs border border-[#2C3D52] text-[#8B97A8] px-3 py-1.5 hover:text-white transition-colors">Hide</button>}
                <button onClick={()=>remove(r.id)} className="text-xs border border-red-500/30 text-red-400 px-3 py-1.5 hover:bg-red-500/10 transition-colors">Delete</button>
                <span className="ml-auto text-[#8B97A8] text-xs self-center">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesTab() {
  const [messages,setMessages]=useState([]); const [loading,setLoading]=useState(true);
  const load = useCallback(async () => { setLoading(true); try { const r=await fetch('/api/admin/messages'); setMessages(await r.json()); } catch { setMessages([]); } finally { setLoading(false); } },[]);
  useEffect(()=>{load();},[load]);
  const update = async (id,updates) => { await fetch('/api/admin/messages',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,...updates})}); load(); };
  const remove = async id => { if(!confirm('Delete message?'))return; await fetch('/api/admin/messages',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); load(); };
  const unread = messages.filter(m=>!m.is_read).length;
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Messages ({messages.length}){unread>0 && <span className="ml-2 bg-yellow-400 text-[#0D1117] text-xs font-bold px-2 py-0.5">{unread} unread</span>}</h2>
      </div>
      {loading ? <p className="text-[#8B97A8]">Loading...</p> : (
        <div className="space-y-3">
          {messages.length===0 && <p className="text-[#8B97A8] text-sm py-8 text-center">No messages yet.</p>}
          {messages.map(m=>(
            <div key={m.id} className={`border p-5 ${!m.is_read?'bg-[#1A2332] border-yellow-400/30':'bg-[#0D1117] border-[#2C3D52]'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-white font-semibold text-sm">{m.name}{!m.is_read && <span className="text-yellow-400 text-xs ml-1">● New</span>}</p>
                  <p className="text-[#8B97A8] text-xs">{m.email}{m.phone?` · ${m.phone}`:''}</p>
                  {m.subject && <p className="text-[#8B97A8] text-xs mt-0.5 font-medium">{m.subject}</p>}
                </div>
                <span className="text-[#8B97A8] text-xs">{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-[#8B97A8] text-sm leading-relaxed mb-4">{m.message}</p>
              <div className="flex flex-wrap gap-2">
                {!m.is_read && <button onClick={()=>update(m.id,{is_read:true})} className="text-xs border border-[#2C3D52] text-[#8B97A8] px-3 py-1.5 hover:text-white transition-colors">Mark Read</button>}
                <a href={`mailto:${m.email}`} className="text-xs bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-3 py-1.5 hover:bg-yellow-400/20 transition-colors">Reply via Email</a>
                <button onClick={()=>remove(m.id)} className="text-xs border border-red-500/30 text-red-400 px-3 py-1.5 hover:bg-red-500/10 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardTab() {
  const [stats,setStats]=useState(null);
  useEffect(()=>{ fetch('/api/admin/stats').then(r=>r.json()).then(setStats).catch(()=>{}); },[]);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="DB Projects" value={stats?.totalProjects} sub={`${stats?.publishedProjects||0} published`} />
        <StatCard label="Pending Reviews" value={stats?.pendingReviews} color="text-orange-400" />
        <StatCard label="Approved Reviews" value={stats?.approvedReviews} color="text-green-400" />
        <StatCard label="Avg Rating" value={stats?.avgRating?`${stats.avgRating}★`:'—'} />
        <StatCard label="Total Messages" value={stats?.totalMessages} sub={`${stats?.unreadMessages||0} unread`} color="text-blue-400" />
        <StatCard label="Featured" value={stats?.featuredProjects} color="text-purple-400" />
      </div>
      <div className="bg-[#1A2332] border border-[#2C3D52] p-6">
        <p className="text-white font-semibold mb-4">Quick Guide</p>
        <ul className="space-y-2 text-[#8B97A8] text-sm">
          <li>📌 <strong className="text-white">Projects</strong> — Add new projects. They auto-appear on the portfolio page alongside your existing ones.</li>
          <li>⭐ <strong className="text-white">Reviews</strong> — Approve/reject reviews submitted by visitors. Only approved reviews show publicly.</li>
          <li>✉️ <strong className="text-white">Messages</strong> — Read and reply to contact form submissions saved from your website.</li>
          <li>🔑 Your existing projects stay in <code className="text-yellow-400">lib/config.js</code> — no need to re-add them.</li>
        </ul>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [authed,setAuthed]=useState(false); const [checked,setChecked]=useState(false); const [tab,setTab]=useState('Dashboard');
  useEffect(()=>{ fetch('/api/admin/stats').then(r=>{ if(r.ok) setAuthed(true); }).catch(()=>{}).finally(()=>setChecked(true)); },[]);
  const logout = async () => { await fetch('/api/admin/login',{method:'DELETE'}); setAuthed(false); };
  if (!checked) return <div className="min-h-screen bg-[#0D1117] flex items-center justify-center"><p className="text-[#8B97A8]">Loading...</p></div>;
  if (!authed) return <LoginScreen onLogin={()=>setAuthed(true)} />;
  return (
    <>
      <Head><title>Admin | Muhammad Saifullah</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="min-h-screen bg-[#0D1117] text-white">
        <header className="bg-[#0D1117] border-b border-[#2C3D52] px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-yellow-400 border border-yellow-400 px-1.5 py-0.5">&lt;/&gt;</span>
            <span className="font-semibold text-white">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-[#8B97A8] text-xs hover:text-white transition-colors hidden sm:block">← View Site</a>
            <button onClick={logout} className="text-[#8B97A8] text-xs border border-[#2C3D52] px-3 py-1.5 hover:text-white hover:border-white transition-colors">Logout</button>
          </div>
        </header>
        <div className="flex">
          <nav className="w-48 min-h-screen bg-[#0A0F17] border-r border-[#2C3D52] pt-6 flex-shrink-0 hidden sm:block">
            {TABS.map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`w-full text-left px-5 py-3 text-sm transition-colors ${tab===t?'text-yellow-400 bg-yellow-400/5 border-l-2 border-yellow-400 font-semibold':'text-[#8B97A8] hover:text-white hover:bg-white/5'}`}>{t}</button>
            ))}
          </nav>
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0D1117] border-t border-[#2C3D52] flex z-50">
            {TABS.map(t=>(<button key={t} onClick={()=>setTab(t)} className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-widest ${tab===t?'text-yellow-400':'text-[#8B97A8]'}`}>{t}</button>))}
          </div>
          <main className="flex-grow p-4 sm:p-8 pb-20 sm:pb-8 max-w-5xl">
            {tab==='Dashboard' && <DashboardTab />}
            {tab==='Projects'  && <ProjectsTab  />}
            {tab==='Reviews'   && <ReviewsTab   />}
            {tab==='Messages'  && <MessagesTab  />}
          </main>
        </div>
      </div>
    </>
  );
}
