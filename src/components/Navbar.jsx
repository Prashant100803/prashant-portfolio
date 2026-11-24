import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'

const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Observe active section
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

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080B16]/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        {/* Brand Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-white focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg p-1"
          aria-label="Prashant Yadav - Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent-violet to-accent-cyan text-sm font-black text-[#080B16] shadow-glow group-hover:scale-105 transition-transform">
            PY
          </span>
          <span className="hidden sm:inline-block font-display text-lg tracking-wide text-white group-hover:text-accent-cyan transition-colors">
            Prashant<span className="text-accent-violet">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#14192b]/70 px-4 py-1.5 shadow-glass backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? 'text-white'
                    : 'text-light-muted hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-accent-violet/25 border border-accent-violet/40 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
            className="btn btn-primary hidden sm:inline-flex text-xs md:text-sm py-2 px-4"
          >
            Hire Me
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 md:hidden items-center justify-center rounded-xl border border-white/10 bg-[#14192b]/80 text-white focus-visible:ring-2 focus-visible:ring-accent-cyan"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/10 bg-[#080B16]/95 px-5 py-6 backdrop-blur-xl shadow-2xl"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {navLinks.map(link => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all ${
                      isActive
                        ? 'bg-accent-violet/20 border border-accent-violet/40 text-accent-cyan'
                        : 'text-light-muted hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-cyanGlow" />
                    )}
                  </a>
                )
              })}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full text-center justify-center py-3"
                >
                  Start a Project / Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
