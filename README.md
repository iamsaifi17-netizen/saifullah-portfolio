# Muhammad Saifullah — Personal Brand & Copywriting Portfolio

A fully professional, production-ready portfolio website built with **Next.js 14** and **Tailwind CSS**.

---

## 🗂️ Table of Contents

1. [What's Included](#whats-included)
2. [How to Edit the Website](#how-to-edit-the-website)
3. [How to Run It on Your Computer](#how-to-run-it-on-your-computer)
4. [How to Upload to GitHub](#how-to-upload-to-github)
5. [How to Deploy (Go Live)](#how-to-deploy-go-live)
6. [How to Connect a Custom Domain](#how-to-connect-a-custom-domain)
7. [FAQ for Beginners](#faq-for-beginners)

---

## 📦 What's Included

```
saifullah-portfolio/
├── pages/
│   ├── index.js          ← Home page
│   ├── about.js          ← About Me page
│   ├── services.js       ← Services page
│   ├── portfolio.js      ← Portfolio page
│   ├── contact.js        ← Contact page
│   ├── blog/
│   │   ├── index.js      ← Blog listing page
│   │   └── [slug].js     ← Individual blog post template
│   └── api/
│       └── contact.js    ← Email API (optional)
├── components/
│   ├── layout/
│   │   ├── Layout.jsx    ← Wraps every page (navbar + footer)
│   │   ├── Navbar.jsx    ← Top navigation bar
│   │   └── Footer.jsx    ← Footer with social links
│   ├── sections/
│   │   ├── Hero.jsx      ← Homepage hero section
│   │   ├── Services.jsx  ← Services cards
│   │   ├── Testimonials.jsx ← Client reviews
│   │   ├── FAQ.jsx       ← Accordion FAQ
│   │   └── CTABanner.jsx ← Call-to-action strip
│   └── ui/
│       ├── AnimatedSection.jsx ← Scroll animation wrapper
│       └── SectionHeading.jsx  ← Reusable headings
├── lib/
│   └── config.js         ← ⭐ EDIT ALL YOUR INFO HERE
├── styles/
│   └── globals.css       ← Global styles + Tailwind
├── public/
│   └── images/           ← Put your photos here
├── tailwind.config.js    ← Colors, fonts, animations
└── next.config.js        ← Deployment settings
```

---

## ✏️ How to Edit the Website

### The Golden Rule: Edit `lib/config.js` for 95% of changes

**Open** `lib/config.js` and you can change:

| What to change | Where in config.js |
|---|---|
| Your name | `SITE_CONFIG.name` |
| Your tagline | `SITE_CONFIG.tagline` |
| Your email | `SITE_CONFIG.email` |
| Your LinkedIn URL | `SITE_CONFIG.social.linkedin` |
| Your Fiverr URL | `SITE_CONFIG.social.fiverr` |
| Your bio paragraphs | `SITE_CONFIG.about.bio` |
| Your skills + levels | `SITE_CONFIG.skills` |
| Services + pricing | `SITE_CONFIG.services` |
| Portfolio projects | `SITE_CONFIG.portfolio` |
| Client testimonials | `SITE_CONFIG.testimonials` |
| Blog post metadata | `SITE_CONFIG.blogPosts` |
| FAQ questions | `SITE_CONFIG.faq` |

### How to Change Your Profile Photo

1. Find your professional headshot photo.
2. Rename it to `profile.jpg`.
3. Copy it into the `public/images/` folder (replace the existing one).
4. That's it — no code changes needed.

### How to Add a Blog Post

1. In `lib/config.js`, add a new object to `SITE_CONFIG.blogPosts`:
   ```js
   {
     slug:     'my-new-post',         // URL: /blog/my-new-post
     title:    'My Article Title',
     excerpt:  'Short description...',
     category: 'Copywriting',
     readTime: '5 min read',
     date:     '2025-02-01',
     image:    '/images/blog/blog-4.jpg',
     featured: false,
   }
   ```
2. In `pages/blog/[slug].js`, add the full content to `postContent`:
   ```js
   'my-new-post': `
     <p>Your full article content here...</p>
     <h2>A subheading</h2>
     <p>More content...</p>
   `,
   ```

### How to Change Colors

Open `tailwind.config.js` and find the `colors` section:
```js
brand: {
  ink:    '#0D1117',  // Main background (dark navy)
  accent: '#C8A96E',  // Gold accent color — change this to any color you like
  mist:   '#E8EDF4',  // Main text color
}
```
Change the hex values to your preferred colors.

### How to Change Fonts

Open `styles/globals.css` and edit the Google Fonts import URL at the top. Then update `tailwind.config.js` → `fontFamily` with your new font names.

---

## 💻 How to Run It on Your Computer

### Step 1: Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS version** (the one that says "Recommended for most users")
3. Install it (just click Next → Next → Install)
4. Open Command Prompt (Windows) or Terminal (Mac) and type:
   ```
   node --version
   ```
   If you see a number like `v20.x.x`, it worked!

### Step 2: Open the Project Folder

1. Unzip/extract the portfolio folder
2. Open Command Prompt or Terminal
3. Navigate to the folder:
   ```
   cd path/to/saifullah-portfolio
   ```
   (Replace `path/to` with the actual location of the folder on your computer)

### Step 3: Install Dependencies

Type this command and press Enter:
```bash
npm install
```
Wait for it to finish (may take 1–2 minutes).

### Step 4: Start the Development Server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

You'll see your website! Any changes you make to the files will automatically refresh in the browser.

---

## 📤 How to Upload to GitHub

GitHub is a free platform that stores your website code and lets you deploy it online.

### Step 1: Create a GitHub Account

Go to https://github.com and sign up for a free account.

### Step 2: Install Git

Download from https://git-scm.com and install it.

### Step 3: Create a New Repository

1. Click the **+** icon on GitHub → **New repository**
2. Name it: `portfolio` (or any name you like)
3. Keep it **Public**
4. Click **Create repository**

### Step 4: Upload Your Code

Open Terminal in your project folder and run these commands one by one:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

---

## 🚀 How to Deploy (Go Live)

### Option A: Vercel (Recommended — Free, Easiest)

Vercel is made by the creators of Next.js. It's the best option.

1. Go to https://vercel.com and sign up with your GitHub account
2. Click **New Project**
3. Select your `portfolio` repository
4. Click **Deploy** — that's it!

Your site will be live at: `https://your-project-name.vercel.app`

Every time you push new code to GitHub, Vercel automatically updates your live site.

### Option B: Netlify (Free)

1. Go to https://netlify.com and sign up
2. Click **Add new site** → **Import from Git**
3. Connect GitHub and select your repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click **Deploy site**

### Option C: GitHub Pages (Free, requires extra setup)

1. Open `next.config.js`
2. Uncomment these lines:
   ```js
   output: 'export',
   basePath: '/portfolio',  // Replace with your repo name
   assetPrefix: '/portfolio/',
   trailingSlash: true,
   ```
3. Also uncomment `unoptimized: true` in the `images` section
4. Run `npm run build` — this creates an `out/` folder
5. In GitHub repository settings → Pages → set source to your `out/` folder

---

## 🌐 How to Connect a Custom Domain

### If using Vercel:

1. Buy a domain from Namecheap, GoDaddy, or Google Domains
2. In Vercel dashboard → Your Project → **Settings** → **Domains**
3. Click **Add** and type your domain (e.g., `saifullah.com`)
4. Vercel shows you DNS records to add
5. Log in to your domain registrar (Namecheap, etc.)
6. Go to **DNS Settings** and add the records Vercel gives you
7. Wait 5–30 minutes for it to go live

### If using Netlify:

Same process — go to **Domain Management** in your site settings and follow the instructions.

---

## ❓ FAQ for Beginners

**Q: I got an error when running `npm install`. What do I do?**
A: Make sure Node.js is installed. Try closing and reopening Terminal, then run the command again.

**Q: The website looks broken locally. What's wrong?**
A: Make sure you're running `npm run dev` and visiting `http://localhost:3000` (not a file path).

**Q: How do I make the contact form actually send emails?**
A: The easiest way is Formspree. Go to https://formspree.io, create a free account, create a form, and copy your form ID. Then open `pages/contact.js` and follow the instructions in the comment inside `onSubmit`.

**Q: How do I add a real portfolio image instead of the placeholder?**
A: Add your image to `public/images/portfolio/` and update the `image` path in `lib/config.js` → `SITE_CONFIG.portfolio`.

**Q: How do I change the gold color to my brand color?**
A: Open `tailwind.config.js` and change `accent: '#C8A96E'` to any hex color you prefer.

**Q: Can I add more pages?**
A: Yes! Create a new file in the `pages/` folder (e.g., `pages/testimonials.js`) and it automatically becomes a new page at `/testimonials`.

**Q: How do I update the site after it's deployed?**
A: Edit your files, then run:
```bash
git add .
git commit -m "Updated about page"
git push
```
Vercel/Netlify will automatically redeploy within 1–2 minutes.

---

## 🎨 Design System

| Element | Value |
|---|---|
| Primary Font | Cormorant Garamond (headings) |
| Body Font | Inter |
| Background | `#0D1117` (deep navy) |
| Accent Color | `#C8A96E` (warm gold) |
| Text Color | `#E8EDF4` (near white) |
| Muted Text | `#8B97A8` (steel gray) |

---

## 📞 Support

If you get stuck, the most helpful resources are:

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **YouTube**: Search "Next.js beginner tutorial" for video walkthroughs

---

*Built with Next.js 14, Tailwind CSS, and Framer Motion.*
