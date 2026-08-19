// lib/adminAuth.js
// Simple secure admin auth using httpOnly cookies

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'saifi2026admin';
const COOKIE_NAME    = 'saifi_admin_session';
const COOKIE_VALUE   = process.env.ADMIN_TOKEN    || 'saifi_admin_2026_secure';

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
}

export function isAuthenticated(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  return cookies[COOKIE_NAME] === COOKIE_VALUE;
}

export function setAuthCookie(res) {
  res.setHeader('Set-Cookie',
    `${COOKIE_NAME}=${COOKIE_VALUE}; HttpOnly; SameSite=Strict; Max-Age=${60*60*24*7}; Path=/`
  );
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/`
  );
}

export function checkPassword(pw) {
  return pw === ADMIN_PASSWORD;
}

export function withAdmin(handler) {
  return (req, res) => {
    if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' });
    return handler(req, res);
  };
}
