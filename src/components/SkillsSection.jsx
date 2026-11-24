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
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? 'border-crimson bg-crimson/20 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                  : 'border-white/10 bg-[#121212]/80 text-content-secondary hover:border-white/25 hover:text-white'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Categorized Skills Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {displayedCategories.map(cat => (
            <motion.div
              layout
              key={cat.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card-red flex flex-col justify-between p-6 rounded-2xl border border-white/10 hover:border-crimson/50"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-crimson/15 text-crimson-bright border border-crimson/30">
                    {cat.category}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-crimson-bright shadow-[0_0_6px_#ef4444]" />
                </div>

                <p className="text-xs text-content-dim mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-2">
                  {cat.items.map(skill => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3.5 py-2 border border-white/[0.05] hover:border-crimson/30 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-crimson-bright" />
                        <span className="text-xs font-semibold text-white tracking-wide">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block text-[11px] text-content-dim font-mono">
                          {skill.level}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/[0.06] text-content-secondary border border-white/[0.08]">
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
