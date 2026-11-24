import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, education } from './data/profile'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Portrait from './components/Portrait'
import SkillsSection from './components/SkillsSection'
import ServicesSection from './components/ServicesSection'
import BoxIntro from './components/BoxIntro'
import { view } from './utils/sceneState'

const Scene = lazy(() => import('./components/Scene'))
gsap.registerPlugin(ScrollTrigger)

const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

const Sec = ({ id, cam, badge, title, subtitle, children, className = '' }) => (
  <section
    id={id}
    data-cam={cam}
    className={`relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32 ${className}`}
  >
    {(badge || title) && (
      <div className="mb-10 sm:mb-14">
        {badge && (
          <p className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-crimson-bright mb-2">
            // {badge}
          </p>
        )}
        {title && (
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white">
            <span className="gradient-red-white">{title}</span>
          </h2>
        )}
        {subtitle && (
          <p className="mt-2.5 sm:mt-3.5 max-w-2xl text-xs sm:text-base text-content-secondary leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    )}
    {children}
  </section>
)

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches || reduce) return
    const onMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-5 w-5 rounded-full border border-crimson/80 mix-blend-screen md:block shadow-[0_0_12px_#ef4444] transition-opacity duration-200"
    />
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('hasSeenBoxIntro')
  })

  const heroRef = useRef(null)

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem('hasSeenBoxIntro', 'true')
  }

  const handleReplayIntro = () => {
    setShowIntro(true)
  }

  // 360-Degree Hero ScrollTrigger (Adaptive for desktop & mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      if (heroRef.current && !reduce) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: isMobile ? 'top 20%' : 'top top',
          end: isMobile ? '+=100%' : '+=150%',
          pin: !isMobile, // Hard-pin only on desktop/tablet to prevent mobile viewport clipping
          scrub: 1,
          onUpdate: self => {
            view.orbitProgress = self.progress
          },
        })
      }

      document.querySelectorAll('[data-cam]').forEach(el => {
        const [x, y, z] = el.dataset.cam.split(',').map(Number)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 65%',
          onToggle: s => {
            if (s.isActive && view.target) {
              gsap.to(view.target, {
                x,
                y,
                z,
                duration: reduce ? 0 : 1.6,
                ease: 'power2.out',
                overwrite: true,
              })
            }
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#090909] text-white selection:bg-crimson/40 selection:text-white overflow-x-hidden">
      {/* 3D Animated Cartoon Box Fullscreen Intro */}
      <AnimatePresence>
        {showIntro && <BoxIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Floating Replay Intro Button (Responsive position) */}
      {!showIntro && (
        <button
          onClick={handleReplayIntro}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-crimson/50 bg-[#121212]/95 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-mono font-semibold text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] backdrop-blur-xl hover:scale-105 hover:border-crimson-bright transition-all focus-visible:ring-2 focus-visible:ring-crimson cursor-pointer"
          title="Replay 3D Box Introduction"
          aria-label="Replay 3D Box Introduction"
        >
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright animate-ping" />
          <span>✨ Replay 3D Intro</span>
        </button>
      )}

      <CustomCursor />
      <Navbar />

      {/* Background Three.js Cinematic Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Suspense fallback={<div className="h-full w-full bg-[#090909]" />}>
          <Scene />
        </Suspense>
      </div>

      <main className="relative z-10 overflow-x-hidden">
        {/* HERO SECTION WITH 360-DEGREE SCROLL */}
        <div ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center">
          <section
            id="top"
            data-cam="0,0,8"
            className="relative mx-auto flex min-h-screen max-w-6xl w-full flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-32"
          >
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Content (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold text-white backdrop-blur-md mb-4 sm:mb-6 w-fit"
                >
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright animate-ping" />
                  <span>{profile.greeting}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight leading-[1.08] text-white break-words"
                >
                  {profile.role}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-2.5 sm:mt-3 text-base sm:text-xl md:text-2xl font-mono font-bold text-crimson-bright"
                >
                  {profile.subrole}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-content-secondary max-w-xl font-normal leading-relaxed"
                >
                  "{profile.tagline}"
                </motion.p>

                {/* Buttons (Responsive layout: stacks on tiny phones, inline on xs+) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4"
                >
                  <a href="#projects" className="btn btn-crimson py-3 sm:py-3.5 px-6 sm:px-7 text-xs sm:text-sm text-center justify-center">
                    <span>Explore My Work</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>

                  <a href="#contact" className="btn btn-outline-red py-3 sm:py-3.5 px-6 sm:px-7 text-xs sm:text-sm text-center justify-center">
                    <span>Let's Talk</span>
                  </a>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-6 sm:mt-8 flex items-center gap-2.5 text-[11px] sm:text-xs font-mono text-content-dim"
                >
                  <span className="flex h-2 w-2 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-bright" />
                  </span>
                  <span className="truncate">{profile.status}</span>
                </motion.div>
              </div>

              {/* Right Content: Fullscreen 3D Portrait (5 cols) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <Portrait />
              </div>
            </div>
          </section>
        </div>

        {/* ABOUT ME SECTION */}
        <Sec
          id="about"
          cam="0,-6,8"
          badge="Philosophy &amp; Background"
          title={profile.aboutHeading}
          subtitle="Engineering performant, human-centered digital products."
        >
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 glass-card-red p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10">
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal">
                {profile.about}
              </p>
              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm text-content-secondary leading-relaxed">
                From responsive single-page applications and high-converting commercial platforms to interactive 3D WebGL scenes and AI-assisted automation, I blend clean software architecture with bold aesthetics.
              </p>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                <h4 className="text-[11px] sm:text-xs uppercase font-mono font-bold tracking-widest text-crimson-bright mb-2.5 sm:mb-3">
                  Core Technical Focus
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Full-Stack Architecture',
                    'Interactive 3D / WebGL',
                    'AI & LLM Integration',
                    'Performance & Fast LCP',
                    'Mobile-First Responsive',
                  ].map(item => (
                    <span
                      key={item}
                      className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-4">
              <div className="glass-card-red p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10">
                <h4 className="text-xs sm:text-sm font-bold font-display text-white mb-1.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright" />
                  Speed &amp; Production Reliability
                </h4>
                <p className="text-[11px] sm:text-xs text-content-secondary leading-relaxed">
                  Building modular code with React, Next.js, and Node ensures fast turnaround and effortless scalability.
                </p>
              </div>

              <div className="glass-card-red p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10">
                <h4 className="text-xs sm:text-sm font-bold font-display text-white mb-1.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright" />
                  Client &amp; Result Oriented
                </h4>
                <p className="text-[11px] sm:text-xs text-content-secondary leading-relaxed">
                  Every interaction and animation is purposeful, designed to maximize user engagement and business conversions.
                </p>
              </div>

              <div className="glass-card-red p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10">
                <h4 className="text-xs sm:text-sm font-bold font-display text-white mb-1.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright" />
                  Direct Collaboration
                </h4>
                <p className="text-[11px] sm:text-xs text-content-secondary leading-relaxed">
                  Transparent milestone communication, daily progress visibility, and post-launch support.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* SKILLS SECTION */}
        <Sec
          id="skills"
          cam="0,-14,9"
          badge="Interactive Universe"
          title="Skills &amp; Technology Stack"
          subtitle="Explore the complete spectrum of programming languages, frameworks, AI/ML tools, and cloud environments."
        >
          <SkillsSection />
        </Sec>

        {/* PROJECTS SECTION */}
        <Sec
          id="projects"
          cam="0,-24,10"
          badge="Featured Work"
          title="Projects &amp; Case Studies"
          subtitle="Interactive 3D showcase of client platforms, full-stack systems, and AI prototypes."
        >
          <Projects />
        </Sec>

        {/* SERVICES SECTION */}
        <Sec
          id="services"
          cam="0,-36,9"
          badge="What I Offer"
          title="Services &amp; Solutions"
          subtitle="Tailored software engineering and modern web development services for founders, agencies, and businesses."
        >
          <ServicesSection />
        </Sec>

        {/* CONTACT SECTION */}
        <Sec
          id="contact"
          cam="0,-48,9"
          badge="Let's Connect"
          title="Let’s Build Something Iconic"
          subtitle="Have an inquiry, project, or developer role? I'm ready to collaborate."
        >
          <Contact />
        </Sec>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.08] bg-[#050505] py-8 sm:py-10 px-4 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-content-dim text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide">Prashant Yadav</span>
              <span>·</span>
              <span className="text-crimson-bright">Full-Stack Software Developer</span>
            </div>

            <p>© {new Date().getFullYear()} Prashant Yadav. All rights reserved.</p>

            <a
              href="#top"
              className="hover:text-crimson-bright transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
