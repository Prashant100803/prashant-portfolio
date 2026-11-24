import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsCategories } from '../data/profile'

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...skillsCategories.map(c => c.category)]

  const displayedCategories =
    selectedCategory === 'All'
      ? skillsCategories
      : skillsCategories.filter(c => c.category === selectedCategory)

  return (
    <div className="w-full">
      {/* Category Filter Pills (Horizontal scroll on mobile, wrap on tablet/desktop) */}
      <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 pb-2 sm:pb-0 px-1 -mx-2 sm:mx-0">
        {categories.map(cat => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? 'border-crimson bg-crimson/25 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                  : 'border-white/10 bg-[#121212]/80 text-content-secondary hover:border-white/25 hover:text-white'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Categorized Skills Grid */}
      <motion.div layout className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {displayedCategories.map(cat => (
            <motion.div
              layout
              key={cat.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card-red flex flex-col justify-between p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-crimson/50"
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-crimson/15 text-crimson-bright border border-crimson/30">
                    {cat.category}
                  </span>
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright shadow-[0_0_6px_#ef4444]" />
                </div>

                <p className="text-[11px] sm:text-xs text-content-dim mb-3 sm:mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-1.5 sm:space-y-2">
                  {cat.items.map(skill => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 sm:px-3.5 py-1.5 sm:py-2 border border-white/[0.05] hover:border-crimson/30 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-crimson-bright shrink-0" />
                        <span className="text-xs font-semibold text-white tracking-wide">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <span className="hidden md:inline-block text-[11px] text-content-dim font-mono">
                          {skill.level}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded bg-white/[0.06] text-content-secondary border border-white/[0.08]">
                          {skill.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
