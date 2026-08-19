-- ============================================================
-- SUPABASE DATABASE SETUP — Muhammad Saifullah Portfolio
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Click "Run without RLS" when prompted
-- ============================================================

-- ── PROJECTS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  title            TEXT NOT NULL,
  slug             TEXT,
  short_desc       TEXT,
  long_desc        TEXT,
  category         TEXT,
  tags             TEXT[] DEFAULT '{}',
  client           TEXT,
  status           TEXT DEFAULT 'completed',
  image_url        TEXT,
  screenshots      TEXT[] DEFAULT '{}',
  live_url         TEXT,
  github_url       TEXT,
  is_published     BOOLEAN DEFAULT TRUE,
  is_featured      BOOLEAN DEFAULT FALSE,
  sort_order       INTEGER DEFAULT 0,
  seo_title        TEXT,
  seo_description  TEXT,
  project_date     TEXT
);

-- ── REVIEWS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  rating       INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment      TEXT NOT NULL,
  linkedin     TEXT,
  project_name TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected'))
);

-- ── MESSAGES TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  service    TEXT,
  budget     TEXT,
  is_read    BOOLEAN DEFAULT FALSE
);

-- ── INDEXES (for fast queries) ───────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_order     ON projects(sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_status     ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created    ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read      ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created   ON messages(created_at DESC);

-- ── DONE ─────────────────────────────────────────────────────
-- You should see 3 new tables: projects, reviews, messages
-- Your existing "visits" table is untouched
