// lib/supabase.js
// Server-side only Supabase REST client. Never import in client components.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export async function sb(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase env vars not set');
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...options.headers,
    },
  });

  // No content returned
  if (res.status === 204) {
    return null;
  }

  // Read response as text first so empty responses don't crash JSON.parse
  const text = await res.text();

  let data = null;

  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response from Supabase: ${text}`);
    }
  }

  if (!res.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      data?.details ||
      `Supabase ${res.status}`
    );
  }

  return data;
}