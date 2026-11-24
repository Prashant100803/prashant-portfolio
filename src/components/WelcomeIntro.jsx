import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeIntro({ isOpen, onClose }) {
  const [phase, setPhase] = useState('orb') // 'orb' -> 'expanded'
  const [progress, setProgress] = useState(0)

  // Animation Choreography:
  // 1. Orb rushes from depth to front (0 to 900ms)
  // 2. Orb expands and reveals "Welcome To PRASHANT PORTFOLIO Software Developer" (900ms+)
  useEffect(() => {
    if (!isOpen) return

    setPhase('orb')
    setProgress(0)

    const timerPhase = setTimeout(() => {
      setPhase('expanded')
    }, 900)

    // Auto-progress bar over 6 seconds
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 120)

    const autoClose = setTimeout(() => {
      onClose()
    }, 6500)

    return () => {
      clearTimeout(timerPhase)
      clearTimeout(autoClose)
      clearInterval(interval)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="welcome-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080B16]/92 p-4 backdrop-blur-2xl"
      >
        {/* Background Ambient Radiance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-red-600/30 via-violet-600/20 to-cyan-400/20 blur-[100px]"
          />
        </div>

        {/* Phase 1: Small Glowing Orb / Beacon Rushing Front */}
        {phase === 'orb' && (
          <motion.div
            key="small-orb"
            initial={{ scale: 0.05, z: -800, opacity: 0 }}
            animate={{ scale: [0.05, 1.25, 1], opacity: 1 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center"
          >
            {/* Outer expanding energy pulses */}
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute h-28 w-28 rounded-full border border-red-500/60"
            />
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.9, 0] }}
              transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute h-24 w-24 rounded-full border border-cyan-400/60"
            />

            {/* Glowing Core */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 p-1 shadow-[0_0_50px_rgba(239,68,68,0.8)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#080B16]">
                <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">
                  PY
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Expanded Content - Emerging Smoothly out of the small front element */}
        {phase === 'expanded' && (
          <motion.div
            key="expanded-content"
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24,
            }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-red-500/30 bg-[#0e1222]/95 p-6 sm:p-10 text-center shadow-[0_0_60px_rgba(239,68,68,0.25)] backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-red-500/20 hover:text-white transition-colors"
              aria-label="Close intro"
            >
              ✕
            </button>

            {/* Small Glowing Energy Crest at Top */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-red-300 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
              <span>✨ WELCOME &amp; GREETINGS ✨</span>
            </motion.div>

            {/* Main Animated Title: Welcome To PRASHANT PORTFOLIO */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-1.5"
            >
              <p className="text-base sm:text-lg font-medium text-light-muted tracking-wide">
                Welcome To
              </p>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 drop-shadow-[0_2px_20px_rgba(239,68,68,0.4)]">
                  PRASHANT PORTFOLIO
                </span>
              </h1>
            </motion.div>

            {/* Role: Software Developer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3"
            >
              <div className="inline-block rounded-xl bg-white/[0.05] border border-white/10 px-4 py-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-wider text-cyan-300">
                  ⚡ Software Developer ⚡
                </span>
              </div>
            </motion.div>

            {/* Positive Uplifting Message */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-5 text-sm sm:text-base text-white/80 leading-relaxed max-w-md mx-auto"
            >
              "Bringing positivity, creative energy, and robust engineering to every project. Delighted to have you here — let’s craft something incredible together!"
            </motion.p>

            {/* Positive Pillars */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold"
            >
              <span className="rounded-full bg-red-500/15 border border-red-500/30 px-3 py-1 text-red-200">
                🚀 High Performance
              </span>
              <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-cyan-200">
                🎯 Clean Architecture
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-emerald-200">
                ✨ Positive Collaboration
              </span>
            </motion.div>

            {/* Call To Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={onClose}
                className="btn btn-primary py-3.5 px-8 text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105 transition-transform"
              >
                <span>Explore Portfolio →</span>
              </button>
            </motion.div>

            {/* Subtle Countdown Progress Bar */}
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-amber-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
