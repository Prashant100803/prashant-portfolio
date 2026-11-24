import { motion } from 'framer-motion'
import { skillsCategories } from '../data/profile'

const categoryIcons = {
  'Frontend Development': (
    <svg className="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'Backend Development': (
    <svg className="w-5 h-5 text-accent-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  'Tools & Workflow': (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'Other Technologies': (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function SkillsSection() {
  return (
    <div className="w-full">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold tracking-widest text-accent-cyan uppercase mb-2">
          Technical Arsenal
        </p>
        <p className="text-light-muted text-base">
          A structured breakdown of technologies, frameworks, and modern tools I leverage to engineer robust digital solutions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skillsCategories.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card flex flex-col justify-between p-6 rounded-2xl border border-white/10 hover:border-accent-violet/30"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {categoryIcons[cat.category] || null}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-light-dim mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {cat.items.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-accent-cyan/80" />
                      <span className="text-sm font-medium text-light-text">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-xs text-light-muted">
                        {skill.level}
                      </span>
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-accent-violet/15 text-accent-violet border border-accent-violet/25">
                        {skill.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
