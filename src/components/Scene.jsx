import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { view } from '../utils/sceneState'
import { skills3D } from '../data/profile'

export { view }

const lite = typeof window !== 'undefined' && window.matchMedia('(max-width:768px)').matches
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches

// 3D Orbital Rings surrounding the Hero environment
function OrbitalRings({ scrollProgress = 0 }) {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((_, dt) => {
    if (reduce) return
    if (ring1.current) ring1.current.rotation.z += dt * 0.15
    if (ring2.current) ring2.current.rotation.x += dt * 0.12
    if (ring3.current) ring3.current.rotation.y += dt * 0.18
  })

  return (
    <group position={[lite ? 0 : 2.5, lite ? 0.8 : 0, -1]}>
      {/* Outer Crimson Orbital Ring */}
      <mesh ref={ring1} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[lite ? 2.4 : 3.2, 0.025, 16, 128]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#DC2626"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Middle Crimson Orbital Ring */}
      <mesh ref={ring2} rotation={[0.4, 1.2, 0.5]}>
        <torusGeometry args={[lite ? 2.8 : 3.7, 0.018, 16, 128]} />
        <meshStandardMaterial
          color="#DC2626"
          emissive="#991B1B"
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Deep Orbital Ring */}
      <mesh ref={ring3} rotation={[1.8, 0.2, 0.8]}>
        <torusGeometry args={[lite ? 3.2 : 4.2, 0.015, 16, 128]} />
        <meshStandardMaterial
          color="#B91C1C"
          emissive="#7F1D1D"
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

// 360-Degree Camera Rig with scroll orbit
function CameraRig() {
  const { camera } = useThree()

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-3.2 * dt)
    const t = view.target

    // 360 degree orbit calculation around center
    // When view.orbitProgress changes from 0 to 1, camera orbits a full 360 degrees
    const progress = view.orbitProgress || 0
    const angle = progress * Math.PI * 2
    const radius = 8

    // Calculate orbital X and Z when orbiting
    const orbitX = Math.sin(angle) * (lite ? 1.5 : 3.2)
    const orbitZ = t.z + (Math.cos(angle) - 1) * 2

    camera.position.x += (t.x + orbitX + view.mx * 0.6 - camera.position.x) * k
    camera.position.y += (t.y + view.my * 0.4 - camera.position.y) * k
    camera.position.z += (orbitZ - camera.position.z) * k

    // Subtle look-at orientation
    camera.lookAt(t.x * 0.2, t.y, 0)
  })

  return null
}

const Geo = ({ k }) =>
  k === 'knot' ? <torusKnotGeometry args={[1, 0.3, 128, 16]} />
  : k === 'torus' ? <torusGeometry args={[1.2, 0.4, 16, 64]} />
  : k === 'ico' ? <icosahedronGeometry args={[1.2, 1]} />
  : k === 'box' ? <boxGeometry args={[1.5, 1.5, 1.5]} />
  : k === 'cone' ? <coneGeometry args={[0.9, 1.6, 5]} />
  : k === 'dod' ? <dodecahedronGeometry args={[1]} />
  : k === 'oct' ? <octahedronGeometry args={[1.1]} />
  : <sphereGeometry args={[1, 32, 32]} />

// 3D Skills Universe in Deep Black & Crimson
function SkillsUniverse() {
  const groupRef = useRef()
  const { viewport } = useThree()
  const sc = Math.min(1, viewport.width / 9)

  useFrame((_, dt) => {
    if (groupRef.current && !reduce) {
      groupRef.current.rotation.y += ((view.mx * 0.35) - groupRef.current.rotation.y) * dt * 2
      groupRef.current.rotation.x += ((-view.my * 0.2) - groupRef.current.rotation.x) * dt * 2
    }
  })

  return (
    <group ref={groupRef} position={[0, -14, 0]} scale={sc}>
      {skills3D.map((s, i) => {
        const row = i < 4 ? 0 : 1
        const n = row ? 4 : 4
        const idx = row ? i - 4 : i
        return (
          <Float
            key={s.n}
            speed={reduce ? 0 : 1.8}
            floatIntensity={1.4}
            position={[(idx - (n - 1) / 2) * 2.7, row ? -1.8 : 1.5, 0]}
          >
            <mesh>
              <Geo k={s.k} />
              <meshStandardMaterial
                color="#141414"
                emissive={s.c}
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.25}
                wireframe={i % 2 === 1}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

export default function Scene() {
  useEffect(() => {
    const handleMove = e => {
      view.mx = (e.clientX / window.innerWidth - 0.5) * 2
      view.my = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <Canvas
      dpr={[1, lite ? 1 : 1.5]}
      camera={{ fov: 48, position: [0, 0, 8] }}
      gl={{ antialias: !lite, powerPreference: 'high-performance' }}
    >
      {/* Cinematic Deep Black Fog & Background */}
      <color attach="background" args={['#090909']} />
      <fog attach="fog" args={['#090909', 12, 35]} />

      <ambientLight intensity={0.45} />
      
      {/* Crimson & Dark Red Lighting Array */}
      <pointLight position={[-6, 4, 6]} intensity={65} color="#DC2626" />
      <pointLight position={[6, -2, 4]} intensity={45} color="#EF4444" />
      <pointLight position={[0, 6, 2]} intensity={25} color="#991B1B" />

      <CameraRig />

      {/* Crimson & Starlight Particle Canopy */}
      <Stars
        radius={60}
        depth={50}
        count={lite ? 700 : 2000}
        factor={3.5}
        fade
        speed={reduce ? 0 : 0.6}
      />
      <Sparkles
        count={lite ? 40 : 120}
        scale={[18, 55, 12]}
        position={[0, -20, 0]}
        size={3}
        speed={reduce ? 0 : 0.4}
        color="#EF4444"
      />

      {/* 360-Degree Orbital Rings */}
      <OrbitalRings />

      {/* 3D Skills Universe */}
      <SkillsUniverse />
    </Canvas>
  )
}
