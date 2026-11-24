import { useState } from 'react'
import { profile } from '../data/profile'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Web Development',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = k => e => {
    setFormData({ ...formData, [k]: e.target.value })
    if (status.type === 'error') setStatus({ type: '', message: '' })
  }

  const handleSubmit = e => {
    e.preventDefault()

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
        message: 'Please provide a message of at least 10 characters describing your project.',
      })
      return
    }

    setSubmitting(true)

    const subject = `[Project Inquiry: ${formData.service}] from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nService Interested In: ${formData.service}\n\nProject Details:\n${formData.message}\n\n— Sent via Prashant Yadav Portfolio Contact Form`

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl

    setStatus({
      type: 'info',
      message:
        'Your email client has been launched with your inquiry drafted to ' +
        profile.email +
        '. If it didn’t open automatically, you can write directly to ' +
        profile.email +
        ' or reach out on WhatsApp below.',
    })
    setSubmitting(false)
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-[#0c0c0c] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-content-dim transition-all focus:border-crimson focus:bg-[#141414] focus:outline-none focus:ring-1 focus:ring-crimson'

  return (
    <div className="w-full">
      {/* Top Banner CTA */}
      <div className="glass-card-red mb-8 sm:mb-12 p-4 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-crimson/30 bg-gradient-to-r from-crimson/15 via-[#121212] to-[#090909]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-crimson/20 px-2.5 sm:px-3 py-0.5 sm:py-1 border border-crimson/40 text-[10px] sm:text-xs font-mono font-semibold text-white mb-2.5 sm:mb-3">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright animate-ping" />
              <span>Available for Immediate Projects &amp; Contract Roles</span>
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              Ready to create something extraordinary?
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-content-secondary max-w-xl leading-relaxed">
              Let's talk about your project, idea, or role. I collaborate with clients worldwide to build cutting-edge digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {profile.whatsapp && (
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-crimson py-3 sm:py-3.5 px-5 sm:px-6 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
              >
                <span>💬 Quick WhatsApp Chat</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-5">
        {/* Contact Info & Socials (2 cols) */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-5 sm:gap-6">
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
              Direct Contact
            </h4>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
              Reach out directly through any preferred channel. Fast turnaround guaranteed.
            </p>

            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212] hover:border-crimson/60 hover:bg-[#181818] transition-all group"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-crimson/15 text-crimson-bright group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-mono text-content-dim uppercase tracking-wider">Email Address</p>
                <p className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-crimson-bright transition-colors">
                  {profile.email}
                </p>
              </div>
            </a>

            {/* Phone / WhatsApp */}
            {profile.phone && (
              <a
                href={profile.whatsapp || `tel:${profile.phone}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212] hover:border-crimson/60 hover:bg-[#181818] transition-all group"
              >
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-crimson/15 text-crimson-bright group-hover:scale-105 transition-transform shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-[11px] font-mono text-content-dim uppercase tracking-wider">Phone &amp; WhatsApp</p>
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-crimson-bright transition-colors truncate">
                    {profile.phone}
                  </p>
                </div>
              </a>
            )}

            {/* GitHub & LinkedIn Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-white/10 bg-[#121212] hover:border-crimson text-xs font-mono font-bold text-white transition-all hover:bg-[#181818]"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-crimson-bright shrink-0" fill="currentColor" viewBox="0 0 24 24">
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
                  className="flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-white/10 bg-[#121212] hover:border-crimson text-xs font-mono font-bold text-white transition-all hover:bg-[#181818]"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-crimson-bright shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.02] text-[11px] sm:text-xs font-mono text-content-dim">
            <p>📍 Location: {profile.location}</p>
            <p className="mt-1">🌐 Available for remote projects worldwide</p>
          </div>
        </div>

        {/* Form (3 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass-card-red flex flex-col gap-3.5 sm:gap-4 p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10"
          noValidate
        >
          <h4 className="text-lg sm:text-xl font-bold font-display text-white">
            Send a Project Message
          </h4>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-content-dim mb-1">
                Your Name <span className="text-crimson-bright">*</span>
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
              <label htmlFor="contact-email" className="block text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-content-dim mb-1">
                Email Address <span className="text-crimson-bright">*</span>
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
            <label htmlFor="contact-service" className="block text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-content-dim mb-1">
              Service Interested In
            </label>
            <select
              id="contact-service"
              className={inputClass}
              value={formData.service}
              onChange={handleChange('service')}
            >
              <option value="Full-Stack Web Development" className="bg-[#121212]">Full-Stack Web Development (React / Node)</option>
              <option value="Interactive 3D & Creative Frontend" className="bg-[#121212]">Interactive 3D &amp; Creative Frontend (Three.js)</option>
              <option value="AI Integration & Automation" className="bg-[#121212]">AI Integration &amp; Intelligent Apps</option>
              <option value="Performance & Speed Optimization" className="bg-[#121212]">Performance, SEO &amp; Speed Optimization</option>
              <option value="Full-Time / Contract Role" className="bg-[#121212]">Full-Time / Contract Software Developer Role</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-content-dim mb-1">
              Project Details <span className="text-crimson-bright">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              className={inputClass}
              placeholder="Tell me about what you are building, timeline, or requirements..."
              value={formData.message}
              onChange={handleChange('message')}
            />
          </div>

          {status.message && (
            <div
              role="status"
              className={`p-3 rounded-xl text-xs font-mono leading-relaxed border ${
                status.type === 'error'
                  ? 'bg-crimson/20 border-crimson/40 text-red-200'
                  : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="pt-1.5 sm:pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-crimson w-full py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase font-display"
            >
              {submitting ? 'Preparing Email...' : 'Send Inquiry Message →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
