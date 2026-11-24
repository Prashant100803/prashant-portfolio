import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/profile'

export const ActionLink = ({ href, children, primary }) => {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`btn ${primary ? 'btn-crimson' : 'btn-outline-red'} text-xs py-2 px-4`}
    >
      {children}
    </a>
  )
}

// Matte Black & Crimson Browser Frame Card
function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass-card-red flex flex-col justify-between p-5 rounded-2xl border border-white/10 hover:border-crimson/50 group"
    >
      <div className="flex flex-col gap-4">
        {/* Browser Mockup Window */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#080808]">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#121212] px-3.5 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#333333]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#222222]" />
            </div>
            <span className="text-[10px] font-mono text-content-dim tracking-tight">
              project.prashant.dev
            </span>
            <span className="text-[10px] font-mono font-bold text-crimson-bright">
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Graphic Banner */}
          <div className="relative h-44 w-full bg-gradient-to-br from-[#1a0507] via-[#101010] to-[#050505] p-5 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-crimson-bright bg-crimson/15 px-2.5 py-1 rounded-full border border-crimson/30 backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            <div className="relative z-10">
              <h4 className="text-lg font-bold font-display text-white group-hover:text-crimson-bright transition-colors line-clamp-1">
                {project.name}
              </h4>
              <p className="text-xs text-content-secondary mt-1 line-clamp-2 leading-relaxed">
                {project.d}
              </p>
            </div>

            {/* Ambient Red Glow Orb */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-crimson/25 blur-3xl group-hover:bg-crimson/40 transition-all pointer-events-none" />
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs font-mono text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {project.live && <ActionLink href={project.live} primary>Live Demo</ActionLink>}
          {project.github && <ActionLink href={project.github}>GitHub</ActionLink>}
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="btn btn-outline-red text-xs py-2 px-3.5 ml-auto flex items-center gap-1.5"
          aria-label={`View case study for ${project.name}`}
        >
          <span>Case Study</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [viewMode, setViewMode] = useState('carousel') // 'carousel' | 'grid'

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const nextSlide = () => {
    setCarouselIndex(prev => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCarouselIndex(prev => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="w-full">
      {/* View Switcher Controls */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-content-dim uppercase tracking-wider">Display Mode:</span>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
              viewMode === 'carousel'
                ? 'bg-crimson/20 border-crimson text-white shadow-crimsonGlow'
                : 'bg-[#141414] border-white/10 text-content-secondary hover:text-white'
            }`}
          >
            3D Carousel
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
              viewMode === 'grid'
                ? 'bg-crimson/20 border-crimson text-white shadow-crimsonGlow'
                : 'bg-[#141414] border-white/10 text-content-secondary hover:text-white'
            }`}
          >
            Full Grid
          </button>
        </div>

        {/* Carousel Prev/Next Buttons */}
        {viewMode === 'carousel' && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-white hover:border-crimson hover:bg-crimson/20 transition-all"
              aria-label="Previous project"
            >
              ←
            </button>
            <span className="text-xs font-mono font-bold text-white px-2">
              {carouselIndex + 1} / {projects.length}
            </span>
            <button
              onClick={nextSlide}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-white hover:border-crimson hover:bg-crimson/20 transition-all"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* 3D Carousel View */}
      {viewMode === 'carousel' ? (
        <div className="relative overflow-hidden py-4">
          <div className="flex justify-center items-center min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, scale: 0.9, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -60 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl"
              >
                <ProjectCard
                  project={projects[carouselIndex]}
                  index={carouselIndex}
                  onOpenModal={setSelectedProject}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  carouselIndex === i
                    ? 'w-8 bg-crimson shadow-[0_0_10px_#ef4444]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Full Grid View */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      )}

      {/* Structured Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-crimson/40 bg-[#0e0e0e]/95 p-6 sm:p-10 shadow-[0_0_60px_rgba(220,38,38,0.25)] text-left"
              initial={{ y: 35, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 25, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-crimson hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-bright bg-crimson/15 px-3 py-1 rounded-full border border-crimson/30">
                {selectedProject.category}
              </span>

              <h3 id="case-study-title" className="text-2xl sm:text-3xl font-black font-display text-white mt-3">
                {selectedProject.name}
              </h3>

              <p className="mt-2 text-sm sm:text-base text-content-secondary leading-relaxed">
                {selectedProject.d}
              </p>

              {/* Tech Stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.stack.map(s => (
                  <span
                    key={s}
                    className="rounded-lg bg-crimson/15 border border-crimson/30 px-3 py-1 text-xs font-mono font-semibold text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Case Study Sections */}
              {selectedProject.caseStudy && (
                <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-bright flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-crimson-bright" />
                      The Problem &amp; Challenge
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      The Solution
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-bright flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-crimson-bright" />
                      Key Features &amp; Architecture
                    </h4>
                    <ul className="space-y-2 mt-2">
                      {selectedProject.caseStudy.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                          <span className="text-crimson-bright font-mono">▸</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Outcomes &amp; Impact
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.outcomes}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.live && <ActionLink href={selectedProject.live} primary>Launch Live Website</ActionLink>}
                  {selectedProject.github && <ActionLink href={selectedProject.github}>View Source Code</ActionLink>}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-outline-red text-xs py-2 px-5"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
