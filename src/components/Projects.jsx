import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/profile'

// Render links only when valid; omit completely if missing (per requirement)
export const ActionLink = ({ href, children, primary }) => {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`btn ${primary ? 'btn-primary' : 'btn-secondary'} text-xs py-2 px-3.5`}
    >
      {children}
    </a>
  )
}

// Modern Browser Frame Mockup Thumbnail
const ProjectMockup = ({ project, index }) => {
  const gradients = [
    'from-violet-600/30 via-indigo-900/40 to-[#080B16]',
    'from-cyan-600/30 via-blue-900/40 to-[#080B16]',
    'from-emerald-600/30 via-teal-900/40 to-[#080B16]',
    'from-fuchsia-600/30 via-purple-900/40 to-[#080B16]',
    'from-amber-600/30 via-orange-900/40 to-[#080B16]',
    'from-sky-600/30 via-indigo-900/40 to-[#080B16]',
  ]

  const bgGradient = gradients[index % gradients.length]

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1222] shadow-inner">
      {/* Mock Browser Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#14192b]/90 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1 rounded-md bg-white/[0.05] px-2.5 py-0.5 text-[10px] text-light-dim font-mono tracking-tight">
          <svg className="w-2.5 h-2.5 text-accent-cyan" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>preview.prashant.dev</span>
        </div>
        <div className="text-[10px] font-mono font-bold text-accent-cyan/80">
          #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Modern Interactive Graphic Canvas Area */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${bgGradient} p-5 flex flex-col justify-between overflow-hidden group`}>
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2.5 py-1 rounded-full border border-accent-cyan/20 backdrop-blur-sm">
            {project.category || 'Web Application'}
          </span>
        </div>

        <div className="relative z-10">
          <h4 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-1">
            {project.name}
          </h4>
          <p className="text-xs text-light-muted mt-1 line-clamp-2">
            {project.d}
          </p>
        </div>

        {/* Ambient Glow Orb */}
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent-violet/20 blur-2xl group-hover:bg-accent-cyan/25 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card flex flex-col justify-between p-5 rounded-2xl group border border-white/10 hover:border-accent-violet/40"
    >
      <div className="flex flex-col gap-4">
        <ProjectMockup project={project} index={index} />

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-light-muted leading-relaxed line-clamp-2">
            {project.d}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="rounded-lg bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 text-xs font-medium text-cyan-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer: only show live/github if they exist */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {project.live && (
            <ActionLink href={project.live} primary>
              Live Demo
            </ActionLink>
          )}
          {project.github && (
            <ActionLink href={project.github}>
              GitHub
            </ActionLink>
          )}
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="btn btn-secondary text-xs py-2 px-3.5 ml-auto flex items-center gap-1.5 hover:border-accent-cyan/50"
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

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <div className="w-full">
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

      {/* Case Study Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              className="glass-panel relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl text-left"
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-label="Close case study modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Category & Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/25">
                  {selectedProject.category || 'Featured Project'}
                </span>
              </div>

              <h3 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
                {selectedProject.name}
              </h3>
              <p className="mt-2 text-base text-light-muted">
                {selectedProject.d}
              </p>

              {/* Tech Stack Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.stack.map(s => (
                  <span
                    key={s}
                    className="rounded-lg bg-accent-violet/15 border border-accent-violet/30 px-3 py-1 text-xs font-semibold text-cyan-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Structured Case Study Content */}
              {selectedProject.caseStudy && (
                <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
                  {/* Problem */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent-cyan flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                      The Challenge & Problem
                    </h4>
                    <p className="mt-1.5 text-sm sm:text-base text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent-violet flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-violet" />
                      The Engineering Solution
                    </h4>
                    <p className="mt-1.5 text-sm sm:text-base text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Key Features & Architecture
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {selectedProject.caseStudy.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                          <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      Impact & Technical Outcome
                    </h4>
                    <p className="mt-1.5 text-sm text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {selectedProject.caseStudy.outcomes}
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.live && (
                    <ActionLink href={selectedProject.live} primary>
                      Launch Live Website
                    </ActionLink>
                  )}
                  {selectedProject.github && (
                    <ActionLink href={selectedProject.github}>
                      View GitHub Code
                    </ActionLink>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-secondary text-xs sm:text-sm py-2 px-5"
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
