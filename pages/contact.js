// pages/contact.js
// ── CONTACT PAGE ─────────────────────────────────────────────────────────────
// ✏️ Contact details come from lib/config.js → SITE_CONFIG.email / social
// ✏️ For real form submissions, replace the mock submit with a service like:
//    - Formspree: https://formspree.io (free tier available)
//    - EmailJS:   https://www.emailjs.com
//    - Your own API route in /pages/api/contact.js

import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SITE_CONFIG } from '../lib/config';

// ── CONTACT INFO CARD ─────────────────────────────────────────────────────────
function ContactInfo({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-10 h-10 border border-brand-rule flex items-center justify-center flex-shrink-0 group-hover:border-brand-accent transition-colors duration-200">
        <span className="text-brand-accent">{icon}</span>
      </div>
      <div>
        <p className="font-body text-xs text-brand-ghost uppercase tracking-widest mb-0.5">{label}</p>
        <p className="font-body text-sm text-brand-mist group-hover:text-brand-accent transition-colors">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a>;
  }
  return <div>{content}</div>;
}

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);

    // ──────────────────────────────────────────────────────────────────────────
    // ✏️ TO MAKE THE FORM ACTUALLY SEND EMAILS:
    //    Option A (Formspree — easiest):
    //      1. Go to https://formspree.io and create a free account
    //      2. Create a new form and get your form ID
    //      3. Replace the URL below:
    //         const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //           method: 'POST',
    //           headers: { 'Content-Type': 'application/json' },
    //           body: JSON.stringify(data),
    //         });
    //
    //    Option B (API route):
    //      Create pages/api/contact.js and POST to '/api/contact'
    // ──────────────────────────────────────────────────────────────────────────

    // MOCK: Simulates a successful submission (remove this when using real form)
    await new Promise(r => setTimeout(r, 1200));

    toast.success('Message sent! I\'ll respond within 24 hours.');
    reset();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
            Your Name *
          </label>
          <input
            type="text"
            placeholder="John Smith"
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-red-400 text-xs">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="john@company.com"
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>}
        </div>
      </div>

      {/* Service + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
            Service Needed
          </label>
          <select
            className="input-field"
            defaultValue=""
            {...register('service')}
          >
            <option value="" disabled>Select a service</option>
            {SITE_CONFIG.services.map(s => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
        <div>
          <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
            Your Budget
          </label>
          <select className="input-field" defaultValue="" {...register('budget')}>
            <option value="" disabled>Select budget range</option>
            <option>Under $50</option>
            <option>$50 – $150</option>
            <option>$150 – $500</option>
            <option>$500 – $1,000</option>
            <option>$1,000+</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
          Subject *
        </label>
        <input
          type="text"
          placeholder="Brief description of your project"
          className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
          {...register('subject', { required: 'Subject is required' })}
        />
        {errors.subject && <p className="mt-1 text-red-400 text-xs">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block font-body text-xs text-brand-ghost uppercase tracking-widest mb-2">
          Your Message *
        </label>
        <textarea
          rows={6}
          placeholder="Tell me about your project — what you need, your audience, your goals, and any relevant details. The more you share, the better I can help."
          className={`textarea-field ${errors.message ? 'border-red-500' : ''}`}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 30, message: 'Please write at least 30 characters' },
          })}
        />
        {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Message →'}
      </button>

      <p className="text-brand-ghost text-xs text-center">
        I respond to all messages within 24 hours.
      </p>
    </form>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <NextSeo
        title={`Contact | ${SITE_CONFIG.name}`}
        description={`Get in touch with ${SITE_CONFIG.name}. Start your copywriting project, ask questions, or request a quote. Fast response guaranteed.`}
      />
      <Layout>

        {/* ── PAGE HERO ── */}
        <section className="pt-32 pb-20 bg-brand-ink relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
            style={{ background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)' }}
          />
          <div className="section-wrapper relative z-10">
            <AnimatedSection>
              <p className="eyebrow mb-3">Let's Talk</p>
              <h1 className="font-display text-display-lg text-brand-mist">
                Start Your <span className="text-gold-shimmer">Next Project</span>
              </h1>
              <p className="mt-4 text-brand-ghost text-lg max-w-2xl leading-relaxed">
                Got a project in mind? A question? A vague idea that needs shaping? I'd love to hear it. Fill out the form and I'll reply within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── CONTACT CONTENT ── */}
        <section className="section-pad bg-brand-slate">
          <div className="section-wrapper grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection>
                <h2 className="font-display text-2xl text-brand-mist mb-8">Contact Details</h2>
                <div className="space-y-6">
                  {/* ✏️ Replace with your real email */}
                  <ContactInfo
                    icon="✉"
                    label="Email"
                    value={SITE_CONFIG.email}
                    href={`mailto:${SITE_CONFIG.email}`}
                  />
                  {/* ✏️ Replace with your real LinkedIn */}
                  <ContactInfo
                    icon="💼"
                    label="LinkedIn"
                    value="Connect on LinkedIn"
                    href={SITE_CONFIG.social.linkedin}
                  />
                  {/* ✏️ Replace with your Fiverr profile */}
                  <ContactInfo
                    icon="🌿"
                    label="Fiverr"
                    value="View Fiverr Gigs"
                    href={SITE_CONFIG.social.fiverr}
                  />
                  <ContactInfo
                    icon="📍"
                    label="Location"
                    value={`${SITE_CONFIG.location} (UTC+5)`}
                  />
                  <ContactInfo
                    icon="⏱"
                    label="Response Time"
                    value="Within 24 hours"
                  />
                </div>
              </AnimatedSection>

              {/* Availability badge */}
              <AnimatedSection delay={200}>
                <div className="bg-brand-steel border border-brand-accent/30 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="font-body text-xs font-semibold text-green-400 uppercase tracking-widest">
                      Currently Available
                    </p>
                  </div>
                  <p className="text-brand-ghost text-sm">
                    Open to new projects, retainers, and long-term collaborations. Book your spot before my calendar fills.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <h2 className="font-display text-2xl text-brand-mist mb-8">Send a Message</h2>
                <ContactForm />
              </AnimatedSection>
            </div>

          </div>
        </section>

      </Layout>
    </>
  );
}
