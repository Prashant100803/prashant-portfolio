import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, education } from './data/profile'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Portrait from './components/Portrait'
import SkillsSection from './components/SkillsSection'
import WelcomeIntro from './components/WelcomeIntro'
import { view } from './utils/sceneState'

const Scene = lazy(() => import('./components/Scene'))
gsap.registerPlugin(ScrollTrigger)

const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

const Sec = ({ id, cam, badge, title, subtitle, children, className = '' }) => (
  <section
    id={id}
    data-cam={cam}
    className={`relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 sm:py-28 ${className}`}
  >
    {(badge || title) && (
      <div className="mb-12">
        {badge && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-cyan mb-2">
            {badge}
          </p>
        )}
        {title && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            <span className="gradient-text">{title}</span>
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-light-muted">
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
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-5 w-5 rounded-full border border-accent-cyan/60 mix-blend-screen md:block shadow-cyanGlow transition-opacity duration-200"
    />
  )
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-cam]').forEach(el => {
        const [x, y, z] = el.dataset.cam.split(',').map(Number)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
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
    <div className="relative min-h-screen bg-[#080B16] text-[#F1F5F9] selection:bg-accent-violet/40 selection:text-white">
      {/* Interactive Welcome Entrance Animation */}
      <WelcomeIntro isOpen={showWelcome} onClose={() => setShowWelcome(false)} />

      {/* Floating Replay Welcome Button */}
      {!showWelcome && (
        <button
          onClick={() => setShowWelcome(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-red-500/40 bg-[#160608]/90 px-4 py-2 text-xs font-semibold text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-md hover:scale-105 hover:border-red-400 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
          title="Replay Welcome Animation"
          aria-label="Replay Welcome Greeting"
        >
          <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_#ef4444]" />
          <span>✨ Welcome Intro</span>
        </button>
      )}

      <CustomCursor />
      <Navbar />

      {/* Background 3D Canvas with WebGL Fallback */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Suspense fallback={<div className="h-full w-full bg-[#080B16]" />}>
          <Scene />
        </Suspense>
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section
          id="top"
          data-cam="0,0,8"
          className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:py-32"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-3.5 py-1 text-xs font-semibold text-accent-cyan backdrop-blur-md mb-6 w-fit"
              >
                <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
                <span>Creative Web Developer</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
              >
                Hi, I'm <span className="gradient-text">{profile.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 text-lg sm:text-xl text-light-muted max-w-xl font-normal leading-relaxed"
              >
                {profile.headline}. I craft responsive, modern, and accessible websites tailored to convert visitors and elevate brands.
              </motion.p>

              {/* Action Buttons: View Projects & Hire Me */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a href="#projects" className="btn btn-primary py-3.5 px-6 text-sm sm:text-base">
                  <span>View Projects</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>

                <a href="#contact" className="btn btn-secondary py-3.5 px-6 text-sm sm:text-base">
                  <span>Hire Me / Let's Talk</span>
                </a>
              </motion.div>

              {/* Quick Status Pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex items-center gap-3 text-xs text-light-dim"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{profile.status}</span>
              </motion.div>
            </div>

            {/* Right Content: 3D Portrait (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Portrait />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Sec
          id="about"
          cam="0,-6,8"
          badge="About Me"
          title="Bridging Creative Vision & Solid Engineering"
          subtitle="Transforming ideas into polished, performant web applications."
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {profile.about}
              </p>
              <p className="mt-4 text-sm sm:text-base text-light-muted leading-relaxed">
                Whether creating a high-converting business website, an interactive product showcase, or a full-stack platform, I focus on intuitive user journeys, clean code standards, and pixel-perfect responsiveness across all screen sizes.
              </p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase font-bold tracking-wider text-accent-cyan mb-3">
                  Core Disciplines
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(item => (
                    <span
                      key={item}
                      className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-xs text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent-cyan" />
                  Fast Turnaround & Clean Code
                </h4>
                <p className="text-xs text-light-muted leading-relaxed">
                  Building with modern frameworks like React and Tailwind ensures quick deployment, excellent maintainability, and fluid cross-device experiences.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent-violet" />
                  Client & Business Focused
                </h4>
                <p className="text-xs text-light-muted leading-relaxed">
                  Every feature is built around your end-users' needs to maximize engagement, retention, and business inquiries.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Direct Collaboration
                </h4>
                <p className="text-xs text-light-muted leading-relaxed">
                  Clear communication, regular milestone updates, and prompt responses from discovery to launch.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* SKILLS SECTION (2D Grid + 3D Interactive) */}
        <Sec
          id="skills"
          cam="0,-12,9"
          badge="Expertise"
          title="Skills & Technologies"
        >
          <SkillsSection />
        </Sec>

        {/* PROJECTS SECTION */}
        <Sec
          id="projects"
          cam="0,-24,10"
          badge="Portfolio"
          title="Featured Projects & Case Studies"
          subtitle="Explore recent client platforms, web applications, and interactive prototypes."
        >
          <Projects />
        </Sec>

        {/* JOURNEY / EDUCATION SECTION */}
        <Sec
          id="journey"
          cam="0,-36,9"
          badge="Background"
          title="Education & Academic Journey"
          subtitle="The academic foundation and continuous development milestones behind my work."
        >
          <div className="relative ml-4 max-w-2xl border-l-2 border-accent-violet/30 pl-6 sm:pl-8 space-y-8">
            {education.map((item, idx) => (
              <div key={item.t} className="relative group">
                {/* Node Indicator */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent-cyan border-2 border-[#080B16] shadow-cyanGlow group-hover:scale-125 transition-transform" />

                <div className="glass-card p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">
                      {item.period || `Step 0${idx + 1}`}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {item.t}
                  </h3>
                  <p className="text-sm text-light-muted mt-1 leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* CONTACT SECTION */}
        <Sec
          id="contact"
          cam="0,-48,9"
          badge="Get In Touch"
          title="Let’s Build Something Exceptional"
          subtitle="Have a freelance project, full-time opportunity, or want to collaborate? I'd love to hear from you."
        >
          <Contact />
        </Sec>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.08] bg-[#060810]/90 py-10 px-5">
          <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-dim">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide">Prashant Yadav</span>
              <span>·</span>
              <span>Crafted with React & Three.js</span>
            </div>

            <p>© {new Date().getFullYear()} Prashant Yadav. All rights reserved.</p>

            <a
              href="#top"
              className="hover:text-accent-cyan transition-colors flex items-center gap-1"
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
