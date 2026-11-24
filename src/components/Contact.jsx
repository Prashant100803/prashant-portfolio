import { useState } from 'react'
import { profile } from '../data/profile'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Website Development',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = k => e => {
    setFormData({ ...formData, [k]: e.target.value })
    if (status.type === 'error') {
      setStatus({ type: '', message: '' })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Validate inputs
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ type: 'error', message: 'Please provide a valid email address.' })
      return
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({
        type: 'error',
        message: 'Please enter a message of at least 10 characters describing your project.',
      })
      return
    }

    setSubmitting(true)

    // Construct mailto payload with full context
    const subject = `[Project Inquiry: ${formData.service}] from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nService Interested In: ${formData.service}\n\nProject Details:\n${formData.message}\n\n— Sent via Prashant Yadav Portfolio Contact Form`

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    // Open email client
    window.location.href = mailtoUrl

    // Display honest status (never fake a server response)
    setStatus({
      type: 'info',
      message:
        'Your email client has been launched with your message pre-filled to ' +
        profile.email +
        '. If it didn’t open, you can also write directly or message on WhatsApp below.',
    })
    setSubmitting(false)
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-[#0c101e]/80 px-4 py-3 text-sm text-white placeholder-light-dim transition-all focus:border-accent-cyan focus:bg-[#14192b] focus:outline-none focus:ring-1 focus:ring-accent-cyan'

  return (
    <div className="w-full">
      {/* Top Banner / Call to Action */}
      <div className="glass-card mb-10 p-6 sm:p-8 rounded-2xl border border-accent-violet/30 bg-gradient-to-r from-accent-violet/10 via-[#14192b] to-accent-cyan/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Freelance & Contract Projects</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Have a website or web app project in mind?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-light-muted max-w-xl">
              I collaborate with businesses, entrepreneurs, and agencies to build responsive, fast, and high-converting modern digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {profile.whatsapp && (
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary py-3 px-5 text-sm"
              >
                <span>💬 Quick WhatsApp Chat</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Contact Info & Socials (2 cols) */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white tracking-wide">
              Connect Directly
            </h4>
            <p className="text-sm text-light-muted">
              Choose your preferred channel. I typically respond within 24 hours.
            </p>

            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-[#14192b]/70 hover:border-accent-cyan/40 hover:bg-[#1a2138] transition-all group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-cyan/15 text-accent-cyan group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-light-dim uppercase font-semibold tracking-wider">Email Address</p>
                <p className="text-sm font-medium text-white truncate group-hover:text-accent-cyan transition-colors">
                  {profile.email}
                </p>
              </div>
            </a>

            {/* Phone / WhatsApp Card */}
            {profile.phone && (
              <a
                href={profile.whatsapp || `tel:${profile.phone}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-[#14192b]/70 hover:border-emerald-400/40 hover:bg-[#1a2138] transition-all group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-light-dim uppercase font-semibold tracking-wider">Phone & WhatsApp</p>
                  <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </a>
            )}

            {/* Socials Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-[#14192b]/70 hover:border-accent-violet/40 text-xs font-semibold text-white transition-all hover:bg-[#1a2138]"
                >
                  <svg className="w-4 h-4 text-accent-violet" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-[#14192b]/70 hover:border-accent-cyan/40 text-xs font-semibold text-white transition-all hover:bg-[#1a2138]"
                >
                  <svg className="w-4 h-4 text-accent-cyan" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-light-dim">
            <p>📍 Location: {profile.location}</p>
            <p className="mt-1">⏱️ Timezone: IST (UTC +5:30) · Global remote collaboration</p>
          </div>
        </div>

        {/* Validated Inquiry Form (3 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass-panel flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-white/10"
          noValidate
        >
          <h4 className="text-xl font-bold text-white">
            Send a Project Brief
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-light-muted mb-1.5">
                Your Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="contact-name"
                required
                className={inputClass}
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange('name')}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-light-muted mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                id="contact-email"
                required
                type="email"
                className={inputClass}
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-light-muted mb-1.5">
              Service / Project Type
            </label>
            <select
              id="contact-service"
              className={inputClass}
              value={formData.service}
              onChange={handleChange('service')}
            >
              <option value="Full Website Development" className="bg-[#14192b]">Full Website Development (React / Tailwind)</option>
              <option value="Modern Landing Page" className="bg-[#14192b]">Modern High-Converting Landing Page</option>
              <option value="Web Application & Frontend" className="bg-[#14192b]">Custom Web Application Frontend</option>
              <option value="Website Redesign & Speed Optimization" className="bg-[#14192b]">Website Redesign & Speed Optimization</option>
              <option value="Full-Time / Contract Role" className="bg-[#14192b]">Full-Time / Contract Developer Role</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-light-muted mb-1.5">
              Project Details & Goals <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              className={inputClass}
              placeholder="Tell me about what you want to build, timeline, or any specific requirements..."
              value={formData.message}
              onChange={handleChange('message')}
            />
          </div>

          {/* Status Notifications */}
          {status.message && (
            <div
              role="status"
              className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                status.type === 'error'
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-200'
                  : 'bg-accent-cyan/10 border-accent-cyan/30 text-cyan-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full py-3.5 text-sm font-bold tracking-wide"
            >
              {submitting ? 'Preparing Email...' : 'Send Inquiry Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
