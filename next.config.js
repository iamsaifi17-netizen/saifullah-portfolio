/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── DEPLOYMENT ────────────────────────────────────────────────────
  // For Vercel or Netlify: leave these commented out
  // For GitHub Pages: uncomment and set YOUR_REPO_NAME:
  // output: 'export',
  // basePath: '/YOUR_REPO_NAME',
  // assetPrefix: '/YOUR_REPO_NAME/',

  reactStrictMode: true,

  // ── IMAGE OPTIMIZATION ────────────────────────────────────────────
  images: {
    // Add any external image domains here
    domains: [],
    // For static export (GitHub Pages), uncomment:
    // unoptimized: true,
  },

  // ── TRAILING SLASH ────────────────────────────────────────────────
  // Set to true for GitHub Pages compatibility
  // trailingSlash: true,
};

module.exports = nextConfig;
