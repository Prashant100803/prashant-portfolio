import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { profile } from '../data/profile'

const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

export default function Portrait() {
  const [imgError, setImgError] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [-0.5, 0.5], [12, -12])
  const ry = useTransform(x, [-0.5, 0.5], [-12, 12])
  const showPhoto = profile.photo && !imgError
  const initials = profile.name
    .split(' ')
    .map(w => w[0])
    .join('')

  const chipBase =
    'absolute px-3 py-1 text-xs font-semibold tracking-wide text-red-100 border border-red-500/30 bg-[#25080c]/80 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md rounded-full select-none'

  return (
    <motion.div
      className="relative mx-auto h-[330px] w-[270px] sm:h-[400px] sm:w-[320px] md:h-[440px] md:w-[350px] shrink-0"
      animate={reduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        onPointerMove={e => {
          const r = e.currentTarget.getBoundingClientRect()
          x.set((e.clientX - r.left) / r.width - 0.5)
          y.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onPointerLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        {/* Ambient Back Glow - Bold Red & Crimson Studio Lighting */}
        <div
          className="absolute -inset-4 rounded-[2.5rem] opacity-65 blur-2xl transition-opacity duration-500 group-hover:opacity-85 pointer-events-none"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #ef4444 0deg, #dc2626 90deg, #b91c1c 180deg, #f43f5e 270deg, #ef4444 360deg)',
            transform: 'translateZ(-30px)',
          }}
        />

        {/* Outer Tech Orbit Border with Red Neon Stroke */}
        <motion.div
          className="absolute -inset-3 rounded-[2.2rem] border border-dashed border-red-500/40 pointer-events-none shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          style={{ transform: 'translateZ(-10px)' }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main Card Container */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-red-500/30 bg-[#160608] shadow-2xl backdrop-blur-xl">
          {/* Vivid Red Studio Background Backdrop */}
          <div
            className="absolute inset-0 z-0 bg-gradient-to-tr from-[#7f1d1d] via-[#dc2626] to-[#ef4444]"
            style={{
              background: 'radial-gradient(circle at 50% 30%, #ef4444 0%, #dc2626 35%, #991b1b 70%, #450a0a 100%)',
            }}
          />

          {showPhoto ? (
            <>
              {/* Photo with multiply blend against the deep red studio background */}
              <img
                src={profile.photo}
                alt={`Portrait photo of ${profile.name}`}
                className="relative z-10 h-full w-full object-cover object-top filter contrast-[1.08] brightness-[0.97]"
                style={{
                  mixBlendMode: 'multiply',
                }}
                onError={() => setImgError(true)}
                loading="eager"
              />

              {/* Edge rim light & red vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: 'radial-gradient(circle at 50% 35%, transparent 45%, rgba(185, 28, 28, 0.4) 75%, rgba(69, 10, 10, 0.85) 100%)',
                }}
              />
            </>
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center bg-gradient-to-br from-red-900/80 to-rose-950 text-7xl font-extrabold text-white">
              {initials}
            </div>
          )}

          {/* Bottom Vignette for text legibility */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#080B16] via-[#080B16]/30 to-transparent" />

          {/* Bottom Card Identity Badge with Red Accent */}
          <div className="absolute bottom-4 left-4 right-4 z-30 rounded-xl border border-red-500/30 bg-[#14080a]/85 p-3 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white tracking-wide">{profile.name}</p>
                <p className="text-xs font-semibold text-red-400">{profile.title}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 border border-red-500/30">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_#ef4444]" />
                <span className="text-[10px] font-bold text-red-200">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Skill Badges in 3D Space with Red Cyberpunk Theme */}
        <span
          className={`${chipBase} -left-4 top-8 sm:-left-6`}
          style={{ transform: 'translateZ(60px)' }}
        >
          ⚡ React.js
        </span>
        <span
          className={`${chipBase} -right-4 top-28 sm:-right-6`}
          style={{ transform: 'translateZ(75px)' }}
        >
          🚀 Node.js
        </span>
        <span
          className={`${chipBase} -left-3 bottom-24 sm:-left-5`}
          style={{ transform: 'translateZ(50px)' }}
        >
          🎨 Modern UI
        </span>
      </motion.div>
    </motion.div>
  )
}
