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
    'absolute px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-white border border-crimson/40 bg-[#161616]/90 shadow-[0_0_20px_rgba(220,38,38,0.35)] backdrop-blur-xl rounded-full select-none'

  return (
    <motion.div
      className="relative mx-auto h-[350px] w-[280px] sm:h-[430px] sm:w-[340px] md:h-[480px] md:w-[380px] shrink-0"
      animate={reduce ? {} : { y: [0, -10, 0] }}
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
          className="absolute -inset-5 rounded-[2.8rem] opacity-75 blur-3xl transition-opacity duration-500 group-hover:opacity-95 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(220,38,38,0.6) 0%, rgba(153,27,27,0.3) 50%, transparent 75%)',
            transform: 'translateZ(-40px)',
          }}
        />

        {/* 3D Concentric Crimson Tech Orbit Rings */}
        <motion.div
          className="absolute -inset-4 rounded-[2.6rem] border border-dashed border-crimson/50 pointer-events-none shadow-[0_0_25px_rgba(220,38,38,0.3)]"
          style={{ transform: 'translateZ(-15px)' }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main Card Frame in Matte Black */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.2rem] border border-crimson/40 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
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
                className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_0_25px_rgba(220,38,38,0.25)]"
                onError={() => setImgError(true)}
                loading="eager"
              />

              {/* Crimson Rim Light Vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(to top, #090909 0%, rgba(9,9,9,0.4) 15%, transparent 50%, rgba(220,38,38,0.1) 100%)',
                }}
              />
            </div>
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center bg-gradient-to-br from-[#181818] to-[#050505] text-7xl font-extrabold text-white">
              {initials}
            </div>
          )}

          {/* Bottom Card Identity Badge */}
          <div className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-white/10 bg-[#121212]/90 p-3.5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold font-display text-white tracking-wide">{profile.name}</p>
                <p className="text-xs font-mono font-medium text-crimson-bright">{profile.role}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-crimson/15 px-2.5 py-0.5 border border-crimson/30">
                <span className="h-2 w-2 rounded-full bg-crimson-bright animate-ping" />
                <span className="text-[10px] font-mono font-bold text-white">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 3D Tech Badges in Depth */}
        <span
          className={`${chipBase} -left-4 top-10 sm:-left-6`}
          style={{ transform: 'translateZ(70px)' }}
        >
          ⚡ React / Next.js
        </span>
        <span
          className={`${chipBase} -right-4 top-32 sm:-right-6`}
          style={{ transform: 'translateZ(85px)' }}
        >
          🚀 Node / APIs
        </span>
        <span
          className={`${chipBase} -left-3 bottom-24 sm:-left-5`}
          style={{ transform: 'translateZ(65px)' }}
        >
          🤖 AI / ML Systems
        </span>
      </motion.div>
    </motion.div>
  )
}
