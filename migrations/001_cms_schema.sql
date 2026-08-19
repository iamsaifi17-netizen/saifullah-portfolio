-- ============================================================
-- Saifullah Portfolio — CMS Schema Migration
-- Run this in Supabase Dashboard → SQL Editor → New query
-- Safe to run once. Re-running will error on "already exists"
-- (that's fine — it means it already applied).
-- ============================================================

-- ------------------------------------------------------------
-- 1. CLIENTS (created first — projects references it)
-- ------------------------------------------------------------
create table if not exists public.clients (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  image         text,
  position      text,
  company       text,
  linkedin_url  text,
  website_url   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. PROJECTS
-- ------------------------------------------------------------
create table if not exists public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  client            text,
  category          text not null default 'Web Development',
  tags              text[] not null default '{}',
  excerpt           text,
  description       text,
  image             text,               -- main card image path
  screenshots       text[] default '{}', -- additional gallery images
  metrics           jsonb default '{}', -- e.g. {"Tech":"Next.js","Type":"Business","Status":"Live"}
  tech_stack        text[] default '{}',
  live_url          text,
  github_url        text,
  seo_title         text,
  seo_description   text,
  image_alt         text,
  published         boolean not null default true,
  featured          boolean not null default false,
  sort_order        integer not null default 0,
  project_date      date,
  client_id         uuid references public.clients(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. TESTIMONIALS (admin-authored, genuine praise you add yourself)
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid references public.clients(id) on delete set null,
  project_id    uuid references public.projects(id) on delete set null,
  name          text not null,
  role          text,
  company       text,
  rating        smallint not null check (rating between 1 and 5),
  text          text not null,
  linkedin_url  text,
  published     boolean not null default true,
  featured      boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. REVIEWS (public-submitted, must be moderated before showing)
-- ------------------------------------------------------------
create table if not exists public.reviews (
  id                uuid primary key default gen_random_uuid(),
  project_id        uuid references public.projects(id) on delete set null,
  name              text not null,
  email             text not null,
  rating            smallint not null check (rating between 1 and 5),
  comment           text not null,
  linkedin_or_site  text,
  status            text not null default 'pending' check (status in ('pending','approved','rejected')),
  featured          boolean not null default false,
  ip_address        text,               -- for basic dedupe/spam checks, not shown publicly
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- prevent obvious rapid-fire duplicate submissions from the same IP+email within a short window
create index if not exists reviews_ip_created_idx on public.reviews (ip_address, created_at);
create index if not exists reviews_status_idx on public.reviews (status);
create index if not exists projects_published_idx on public.projects (published, sort_order);
create index if not exists testimonials_published_idx on public.testimonials (published, sort_order);

-- ------------------------------------------------------------
-- 5. updated_at auto-touch trigger (shared)
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_clients_updated on public.clients;
create trigger trg_clients_updated before update on public.clients
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_testimonials_updated on public.testimonials;
create trigger trg_testimonials_updated before update on public.testimonials
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_reviews_updated on public.reviews;
create trigger trg_reviews_updated before update on public.reviews
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- 6. ROW LEVEL SECURITY
-- All admin writes go through our server-side API routes using
-- the service_role key, which BYPASSES RLS entirely — so these
-- policies only govern what happens if the anon/public key is
-- ever used directly (defense in depth). Public can read only
-- published/approved rows, and can INSERT reviews (pending only).
-- ------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select using (published = true);

drop policy if exists "public read clients" on public.clients;
create policy "public read clients" on public.clients
  for select using (true);

drop policy if exists "public read published testimonials" on public.testimonials;
create policy "public read published testimonials" on public.testimonials
  for select using (published = true);

drop policy if exists "public read approved reviews" on public.reviews;
create policy "public read approved reviews" on public.reviews
  for select using (status = 'approved');

drop policy if exists "public submit reviews" on public.reviews;
create policy "public submit reviews" on public.reviews
  for insert with check (status = 'pending');

-- No public update/delete policies exist on any table — meaning
-- with only the anon key, nothing can be edited or removed.
-- All admin mutations use the service_role key from our API
-- routes (protected by ANALYTICS_PASSWORD), which ignores RLS.

-- ============================================================
-- End of migration
-- ============================================================
