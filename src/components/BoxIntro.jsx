import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// 3D Cartoon Box with Hinged Opening Lid
function CartoonBox({ isOpen, isMobile }) {
  const boxRef = useRef()
  const lidHingeRef = useRef()
  const lightRef = useRef()

  useFrame((_, dt) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += dt * 0.35
    }

    if (lidHingeRef.current) {
      const targetRotation = isOpen ? -Math.PI * 0.72 : 0
      lidHingeRef.current.rotation.x = THREE.MathUtils.lerp(
        lidHingeRef.current.rotation.x,
        targetRotation,
        dt * 3.5
      )
    }

    if (lightRef.current) {
      const targetIntensity = isOpen ? 95 : 10
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        dt * 4
      )
    }
  })

  const scale = isMobile ? 0.8 : 1

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={boxRef} position={[0, isMobile ? 0.1 : -0.3, 0]} scale={scale}>
        {/* Interior Glowing Light & Core */}
        <pointLight ref={lightRef} position={[0, 0.4, 0]} color="#EF4444" intensity={15} distance={12} />
        
        {/* Glowing Red Core inside the box */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#DC2626" />
        </mesh>

        {/* Box Base (Matte Black with Red Edges) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 1.2, 1.6]} />
          <meshStandardMaterial
            color="#121212"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Decorative Red Ribbon / Edge Trim on Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.62, 0.15, 1.62]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#991B1B"
            emissiveIntensity={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.62, 1.22, 0.2]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#991B1B"
            emissiveIntensity={0.3}
            roughness={0.3}
          />
        </mesh>

        {/* Lid Hinge Pivot */}
        <group ref={lidHingeRef} position={[0, 0.6, -0.8]}>
          <group position={[0, 0.08, 0.8]}>
            <mesh>
              <boxGeometry args={[1.7, 0.2, 1.7]} />
              <meshStandardMaterial
                color="#161616"
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.2, 0.25, 0.12, 16]} />
              <meshStandardMaterial
                color="#EF4444"
                emissive="#DC2626"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  )
}

function EmergingParticles({ isOpen, isMobile }) {
  if (!isOpen) return null
  return (
    <Sparkles
      count={isMobile ? 70 : 140}
      scale={[2.5, 4.5, 2.5]}
      position={[0, isMobile ? 0.8 : 1.2, 0]}
      size={isMobile ? 3 : 4}
      speed={1.6}
      color="#EF4444"
    />
  )
}

export default function BoxIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showText, setShowText] = useState(false)
  const [zoomOut, setZoomOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 900)
    const textTimer = setTimeout(() => setShowText(true), 1700)
    const zoomTimer = setTimeout(() => setZoomOut(true), 4600)
    const finishTimer = setTimeout(() => onComplete(), 5300)

    return () => {
      clearTimeout(openTimer)
      clearTimeout(textTimer)
      clearTimeout(zoomTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={zoomOut ? { opacity: 0, scale: 1.12 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#050505] overflow-hidden px-4"
    >
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-[#181818]/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md hover:border-crimson hover:text-crimson-bright transition-all"
        aria-label="Skip introduction"
      >
        <span>Skip Intro</span>
        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>

      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0.8, isMobile ? 5.2 : 4.2], fov: isMobile ? 52 : 46 }}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, -2, -2]} color="#DC2626" intensity={25} />
          <CartoonBox isOpen={isOpen} isMobile={isMobile} />
          <EmergingParticles isOpen={isOpen} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* Rising Cinematic Text */}
      <AnimatePresence>
        {showText && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-2 pointer-events-none mt-28 xs:mt-36 sm:mt-48 max-w-xl">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.3em] text-crimson-bright uppercase mb-1.5"
            >
              • EXPERIENCE UNLOCKED •
            </motion.p>

            <motion.h1
              initial={{ y: 50, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-tight drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-bright via-red-500 to-crimson">PRASHANT'S PORTFOLIO</span>
            </motion.h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 sm:px-5 py-1 sm:py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-crimson-bright animate-ping" />
              <span className="text-xs sm:text-lg md:text-xl font-bold font-mono tracking-wider sm:tracking-widest text-white">
                SOFTWARE DEVELOPMENT
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
