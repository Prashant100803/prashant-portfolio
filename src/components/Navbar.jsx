import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'

const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionElements = navLinks
      .map(link => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    )

    sectionElements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close mobile drawer on Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:py-5 transition-all duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Brand Logo with Red Glow Pill */}
        <a
          href="#top"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#121212]/80 px-3 py-1.5 backdrop-blur-md hover:border-crimson/50 transition-all focus-visible:ring-2 focus-visible:ring-crimson"
          aria-label="Prashant Yadav - Home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-crimson to-crimson-bright text-xs font-black font-display text-white shadow-crimsonGlow group-hover:scale-105 transition-transform shrink-0">
            PY
          </span>
          <span className="font-display font-bold text-xs xs:text-sm tracking-wide text-white group-hover:text-crimson-bright transition-colors">
            Prashant<span className="text-crimson">.dev</span>
          </span>
        </a>

        {/* Desktop Liquid-Glass Pill Navbar */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#121212]/75 p-1.5 shadow-liquid backdrop-blur-2xl"
          aria-label="Main Navigation"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            const isHovered = hoveredLink === link.id

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onMouseEnter={() => setHoveredLink(link.id)}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-full z-10 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-content-secondary hover:text-white'
                }`}
              >
                {/* Crimson Liquid Hover / Active Indicator */}
                {(isActive || isHovered) && (
                  <motion.span
                    layoutId="liquidIndicator"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-crimson/30 via-crimson/20 to-crimson/30 border border-crimson/50 shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn btn-crimson hidden sm:inline-flex text-xs py-2 px-4 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Let's Talk
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 md:hidden items-center justify-center rounded-full border border-white/10 bg-[#121212]/85 text-white focus-visible:ring-2 focus-visible:ring-crimson"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-3 mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e]/95 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map(link => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-crimson/20 border border-crimson/50 text-white'
                        : 'text-content-secondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-crimson-bright shadow-[0_0_8px_#ef4444]" />
                    )}
                  </a>
                )
              })}
              <div className="mt-3 pt-3 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-crimson w-full text-center justify-center py-3 text-xs"
                >
                  Start a Project / Let's Talk
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
