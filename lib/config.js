// ============================================================================
// SITE CONFIGURATION — lib/config.js
// ✏️  EDIT THIS FILE to update your personal info across the entire website.
//     Change name, bio, email, social links, services — all in one place.
// ============================================================================

export const SITE_CONFIG = {
  // ── PERSONAL INFO ──────────────────────────────────────────────────────────
  name:        'Muhammad Saifullah',
  shortName:   'Saifullah',
  tagline:     'Words That Persuade. Content That Converts.',
  subTagline:  'Freelance Copywriter & LinkedIn Content Strategist helping brands speak with clarity, authority, and intent.',
  location:    'Pakistan', // shown in hero / about
  email:       'iamsaifi17@gmail.com',
  phone:       '+92-308-2612190',

  // ── SOCIAL LINKS ───────────────────────────────────────────────────────────
  social: {
    linkedin:  'https://www.linkedin.com/in/muhammad-saifullah-8a3469416',
    fiverr:    'https://www.fiverr.com/saifii1201',
    twitter:   'https://twitter.com/iamsaifi17',
    instagram: 'https://instagram.com/iamsaifi17',
    github:    'https://github.com/iamsaifi17',
  },

  // ── SEO METADATA ───────────────────────────────────────────────────────────
  seo: {
    title:       'Muhammad Saifullah | Freelance Copywriter & LinkedIn Content Writer',
    description: 'Professional copywriter specializing in LinkedIn content, AI-assisted writing, product descriptions, and social media. Based in Pakistan, serving international clients.',
    keywords:    'copywriter Pakistan, LinkedIn content writer, AI content, freelance writer, Muhammad Saifullah',
    siteUrl:     'https://saifullah.com', // ✏️ Replace with your real domain
    ogImage:     '/images/og-image.jpg',  // ✏️ Replace with your real image
    twitterHandle: '@YourHandle',         // ✏️ Replace
  },

  // ── ABOUT ──────────────────────────────────────────────────────────────────
  about: {
    headline: 'A Writer Who Thinks Like a Marketer',
    bio: [
      "I'm Muhammad Saifullah — a freelance copywriter and content strategist who crafts words that move people to act. With a foundation in linguistics and a deep curiosity for human behavior, I write content that doesn't just fill space — it builds brands, attracts audiences, and drives results.",
      "I specialize in LinkedIn content writing, AI-assisted content creation, product copywriting, and social media strategy. My approach blends psychological insight with clean, compelling prose — no jargon, no filler, just writing that works.",
      "I work with startups, personal brands, e-commerce businesses, and professionals worldwide who want their online presence to reflect the quality of their work.",
    ],
    mission: "To help businesses and personal brands communicate with the clarity and authority that wins clients, builds trust, and creates lasting impact — one strategically crafted word at a time.",
    stats: [
      { value: '50+',  label: 'Projects Completed'  },
      { value: '20+',  label: 'Happy Clients'        },
      { value: '100%', label: 'Client Satisfaction'  },
      { value: '48h',  label: 'Average Turnaround'   },
    ],
  },

  // ── SKILLS ─────────────────────────────────────────────────────────────────
  skills: [
    { name: 'Persuasive Copywriting',     level: 95 },
    { name: 'LinkedIn Content Strategy',  level: 92 },
    { name: 'AI-Assisted Writing (GPT)',  level: 90 },
    { name: 'Brand Voice Development',    level: 88 },
    { name: 'SEO Writing',               level: 85 },
    { name: 'Email Marketing Copy',       level: 87 },
    { name: 'Social Media Content',       level: 90 },
    { name: 'Product Descriptions',       level: 93 },
  ],

  // ── SERVICES ───────────────────────────────────────────────────────────────
  services: [
    {
      id:          'copywriting',
      icon:        '✍️',
      title:       'Persuasive Copywriting',
      description: 'Sales pages, landing pages, product descriptions, and marketing copy that compels readers to take action. Every word earns its place.',
      features:    ['Sales Page Copy', 'Landing Page Copy', 'Product Descriptions', 'Ad Copy', 'Email Sequences'],
      price:       'Starting at $25',
      popular:     false,
    },
    {
      id:          'linkedin',
      icon:        '💼',
      title:       'LinkedIn Content Writing',
      description: 'Build authority on LinkedIn with posts, articles, and profile optimization that grow your network and attract opportunities.',
      features:    ['LinkedIn Posts (5–10/week)', 'Profile Optimization', 'Article Writing', 'Thought Leadership', 'Engagement Strategy'],
      price:       'Starting at $30/post',
      popular:     true,
    },
    {
      id:          'ai-content',
      icon:        '🤖',
      title:       'AI-Assisted Content Creation',
      description: 'Harness the speed of AI with the quality of human editing. I use advanced AI tools to deliver high-volume content without sacrificing voice or accuracy.',
      features:    ['Blog Posts & Articles', 'Bulk Content Packages', 'Content Repurposing', 'AI Prompt Engineering', 'Human Review & Polish'],
      price:       'Starting at $15/piece',
      popular:     false,
    },
    {
      id:          'social-media',
      icon:        '📱',
      title:       'Social Media Content',
      description: 'Scroll-stopping captions, threads, and posts for Instagram, Twitter/X, Facebook, and TikTok that build community and drive engagement.',
      features:    ['Caption Writing', 'Content Calendars', 'Hashtag Strategy', 'Story Copy', 'Reel Scripts'],
      price:       'Starting at $10/post',
      popular:     false,
    },
  ],

  // ── PORTFOLIO SAMPLES ──────────────────────────────────────────────────────
  // ✏️ Replace these with your real work. Add/remove objects as needed.
  portfolio: [
    {
      id:       1,
      title:    'LinkedIn Thought Leadership Campaign',
      client:   'SaaS Startup (Confidential)',
      category: 'LinkedIn Content',
      tags:     ['LinkedIn', 'B2B', 'Thought Leadership'],
      excerpt:  'A 30-day LinkedIn content campaign for a B2B SaaS founder. Result: 340% increase in profile views, 12 inbound leads, and a viral post with 8,000+ impressions.',
      metrics:  { impressions: '8K+', leads: '12', growth: '340%' },
      image:    '/images/portfolio/portfolio-1.jpg', // ✏️ Add your image
    },
    {
      id:       2,
      title:    'E-Commerce Product Description Pack',
      client:   'Electronics Brand',
      category: 'Copywriting',
      tags:     ['E-Commerce', 'Product Copy', 'SEO'],
      excerpt:  '50 product descriptions for a consumer electronics brand. Optimized for both SEO and conversion — average product page CTR improved by 22%.',
      metrics:  { items: '50', ctrLift: '22%', wordCount: '15K+' },
      image:    '/images/portfolio/portfolio-2.jpg', // ✏️ Add your image
    },
    {
      id:       3,
      title:    'Email Welcome Sequence',
      client:   'Personal Brand Coach',
      category: 'Email Marketing',
      tags:     ['Email', 'Nurture Sequence', 'Personal Brand'],
      excerpt:  'A 5-email onboarding sequence that converted 38% of new subscribers into paid consultations within the first 14 days.',
      metrics:  { openRate: '52%', conversion: '38%', emails: '5' },
      image:    '/images/portfolio/portfolio-3.jpg', // ✏️ Add your image
    },
    {
      id:       4,
      title:    'Social Media Content Calendar',
      client:   'Fashion E-Commerce',
      category: 'Social Media',
      tags:     ['Instagram', 'Facebook', 'Captions'],
      excerpt:  'Month-long content calendar with 30 captions, 4 reels scripts, and hashtag sets for a growing fashion brand. Follower growth: +800 in 30 days.',
      metrics:  { posts: '30', growth: '+800', reach: '45K' },
      image:    '/images/portfolio/portfolio-4.jpg', // ✏️ Add your image
    },
    {
      id:       5,
      title:    'AI-Powered Blog Content Package',
      client:   'FinTech Startup',
      category: 'AI Content',
      tags:     ['Blog', 'SEO', 'AI-Assisted'],
      excerpt:  '10 SEO-optimized blog articles produced in 5 days using AI-assisted workflows with full human review. All ranked on Page 2 or better within 60 days.',
      metrics:  { articles: '10', deliveryDays: '5', ranking: 'P1–P2' },
      image:    '/images/portfolio/portfolio-5.jpg', // ✏️ Add your image
    },
    {
      id:       6,
      title:    'Landing Page Rewrite',
      client:   'Coaching Business',
      category: 'Copywriting',
      tags:     ['Landing Page', 'Conversion', 'Sales Copy'],
      excerpt:  'Complete rewrite of an underperforming landing page for a life coach. Conversion rate went from 1.8% to 6.4% — a 255% improvement.',
      metrics:  { before: '1.8%', after: '6.4%', improvement: '255%' },
      image:    '/images/portfolio/portfolio-6.jpg', // ✏️ Add your image
    },
  ],

  // ── TESTIMONIALS ──────────────────────────────────────────────────────────
  // ✏️ Replace these with real client reviews as you receive them.
  testimonials: [
    {
      id:      1,
      name:    'James Thornton',
      role:    'Founder, TechLaunch SaaS',
      country: '🇺🇸 United States',
      rating:  5,
      text:    "Saifullah transformed our LinkedIn presence completely. His posts don't just get likes — they start conversations that bring in clients. The ROI has been exceptional. Highly recommend for any B2B brand.",
      image:   '/images/testimonials/client-1.jpg', // ✏️ Add client photo
    },
    {
      id:      2,
      name:    'Amelia Clarke',
      role:    'E-Commerce Brand Owner',
      country: '🇬🇧 United Kingdom',
      rating:  5,
      text:    "Our product descriptions were boring and generic before Saifullah rewrote them. Now customers actually read them — and our add-to-cart rate jumped 30%. Worth every penny.",
      image:   '/images/testimonials/client-2.jpg', // ✏️ Add client photo
    },
    {
      id:      3,
      name:    'Ravi Sharma',
      role:    'Digital Marketing Consultant',
      country: '🇨🇦 Canada',
      rating:  5,
      text:    "Fast, professional, and genuinely talented. Saifullah delivered a 10-article content package in record time and every piece required almost no revisions. That's rare in this industry.",
      image:   '/images/testimonials/client-3.jpg', // ✏️ Add client photo
    },
    {
      id:      4,
      name:    'Sarah Mitchell',
      role:    'Personal Brand Coach',
      country: '🇦🇺 Australia',
      rating:  5,
      text:    "The email sequence Saifullah wrote for my coaching business is a machine. New subscribers book calls without me lifting a finger. He understands psychology and persuasion at a deep level.",
      image:   '/images/testimonials/client-4.jpg', // ✏️ Add client photo
    },
  ],

  // ── BLOG POSTS ─────────────────────────────────────────────────────────────
  // ✏️ Replace these with real articles. Create new pages in /pages/blog/
  blogPosts: [
    {
      slug:     'linkedin-content-strategy-2025',
      title:    'The LinkedIn Content Strategy That Generated 12 Inbound Leads in 30 Days',
      excerpt:  'Most LinkedIn posts disappear into the void. Here\'s the exact framework I use to write posts that start conversations, build authority, and attract clients — without being salesy.',
      category: 'LinkedIn',
      readTime: '6 min read',
      date:     '2025-01-15',
      image:    '/images/blog/blog-1.jpg',
      featured: true,
    },
    {
      slug:     'ai-copywriting-human-touch',
      title:    'How I Use AI to Write Faster Without Losing the Human Touch',
      excerpt:  'AI won\'t replace copywriters — but copywriters who use AI will replace those who don\'t. Here\'s my exact workflow for producing high-quality content at scale.',
      category: 'AI Content',
      readTime: '5 min read',
      date:     '2025-01-08',
      image:    '/images/blog/blog-2.jpg',
      featured: false,
    },
    {
      slug:     'product-descriptions-that-sell',
      title:    '5 Product Description Formulas That Actually Drive Sales',
      excerpt:  'Your product description is your silent salesperson. These 5 battle-tested formulas will transform how browsers become buyers — with real before/after examples.',
      category: 'Copywriting',
      readTime: '7 min read',
      date:     '2024-12-20',
      image:    '/images/blog/blog-3.jpg',
      featured: false,
    },
  ],

  // ── FAQ ────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'What types of clients do you work with?',
      a: "I work with startups, e-commerce brands, coaches, consultants, and personal brands from around the world — primarily from the US, UK, Canada, and Australia. If you need persuasive, well-written content, I can help.",
    },
    {
      q: 'What is your typical turnaround time?',
      a: "Most projects are delivered within 48–72 hours. For larger packages (10+ pieces), I\'ll give you a clear timeline upfront. I respect deadlines and communicate any changes immediately.",
    },
    {
      q: 'Do you offer revisions?',
      a: "Yes — all projects include 2 rounds of free revisions. I want you to be completely satisfied with the work. If something doesn\'t feel right, we\'ll fix it.",
    },
    {
      q: 'How do payments work?',
      a: "For new clients, I require 50% upfront and 50% on delivery. Payment is via PayPal, Wise, or Fiverr. I\'ll always send a clear invoice and a simple contract for your protection and mine.",
    },
    {
      q: 'Can you write in my brand voice?',
      a: "Absolutely. I start every project with a brief questionnaire about your brand, audience, and tone. Share past content, and I\'ll match your voice so closely that your audience won\'t notice the difference.",
    },
    {
      q: 'Do you use AI to write content?',
      a: "I use AI tools as a research and drafting accelerator, but every piece I deliver is heavily edited, fact-checked, and humanized by me. You\'re not getting raw AI output — you\'re getting human-crafted content informed by AI efficiency.",
    },
    {
      q: 'How do I get started?',
      a: "Simple: click the \'Hire Me\' button, fill out the contact form with your project details, and I\'ll respond within 24 hours with a proposal and timeline.",
    },
    {
      q: 'Do you offer packages or bulk discounts?',
      a: "Yes! I offer discounted rates for ongoing retainers and bulk content orders. If you need consistent content every month, let\'s talk about a custom package that fits your budget.",
    },
  ],
};
