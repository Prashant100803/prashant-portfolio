import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { profile } from '../data/profile'

const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

export default function Portrait() {
  const [imgError, setImgError] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [-0.5, 0.5], [10, -10])
  const ry = useTransform(x, [-0.5, 0.5], [-10, 10])
  const showPhoto = profile.photo && !imgError
  const initials = profile.name
    .split(' ')
    .map(w => w[0])
    .join('')

  const chipBase =
    'absolute px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-white border border-crimson/40 bg-[#161616]/95 shadow-[0_0_15px_rgba(220,38,38,0.35)] backdrop-blur-xl rounded-full select-none z-30 pointer-events-none'

  return (
    <motion.div
      className="relative mx-auto h-[310px] w-[240px] xs:h-[350px] xs:w-[270px] sm:h-[420px] sm:w-[330px] md:h-[470px] md:w-[370px] shrink-0 max-w-full"
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1100,
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
        {/* Ambient Crimson Rim Glow in 3D Depth */}
        <div
          className="absolute -inset-3 sm:-inset-5 rounded-[2.2rem] sm:rounded-[2.8rem] opacity-70 blur-2xl sm:blur-3xl transition-opacity duration-500 group-hover:opacity-95 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(220,38,38,0.55) 0%, rgba(153,27,27,0.25) 50%, transparent 75%)',
            transform: 'translateZ(-30px)',
          }}
        />

        {/* 3D Concentric Crimson Tech Orbit Rings */}
        <motion.div
          className="absolute -inset-2 sm:-inset-4 rounded-[2rem] sm:rounded-[2.6rem] border border-dashed border-crimson/40 pointer-events-none shadow-[0_0_20px_rgba(220,38,38,0.25)]"
          style={{ transform: 'translateZ(-15px)' }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main Card Frame in Matte Black */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] sm:rounded-[2.2rem] border border-crimson/40 bg-[#050505] shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {/* Subtle Radial Crimson Studio Spotlight Behind Head */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-80"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.45) 0%, rgba(153, 27, 27, 0.2) 40%, transparent 70%)',
            }}
          />

          {showPhoto ? (
            <div className="relative z-10 h-full w-full overflow-hidden">
              <img
                src={profile.photo}
                alt={`Portrait photograph of ${profile.name}`}
                className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_0_20px_rgba(220,38,38,0.25)]"
                onError={() => setImgError(true)}
                loading="eager"
              />

              {/* Crimson Rim Light Vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(to top, #090909 0%, rgba(9,9,9,0.3) 15%, transparent 50%, rgba(220,38,38,0.1) 100%)',
                }}
              />
            </div>
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center bg-gradient-to-br from-[#181818] to-[#050505] text-6xl sm:text-7xl font-extrabold text-white">
              {initials}
            </div>
          )}

          {/* Bottom Card Identity Badge */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212]/90 p-2.5 sm:p-3.5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="min-w-0 pr-1">
                <p className="text-xs sm:text-sm font-bold font-display text-white tracking-wide truncate">{profile.name}</p>
                <p className="text-[10px] sm:text-xs font-mono font-medium text-crimson-bright truncate">{profile.role}</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-crimson/15 px-2 sm:px-2.5 py-0.5 border border-crimson/30 shrink-0">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright animate-ping" />
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 3D Tech Badges with safe mobile positioning */}
        <span
          className={`${chipBase} -left-2 sm:-left-6 top-8 sm:top-10`}
          style={{ transform: 'translateZ(60px)' }}
        >
          ⚡ React / Next
        </span>
        <span
          className={`${chipBase} -right-2 sm:-right-6 top-28 sm:top-32`}
          style={{ transform: 'translateZ(75px)' }}
        >
          🚀 Node.js
        </span>
        <span
          className={`${chipBase} -left-2 sm:-left-5 bottom-20 sm:bottom-24`}
          style={{ transform: 'translateZ(55px)' }}
        >
          🤖 AI / ML
        </span>
      </motion.div>
    </motion.div>
  )
}
