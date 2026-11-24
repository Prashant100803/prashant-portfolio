import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Sparkles, MeshDistortMaterial, Html } from '@react-three/drei'
import { skills } from '../data/profile'
import { view } from '../utils/sceneState'

export { view }
const lite = typeof window !== 'undefined' && window.matchMedia('(max-width:768px)').matches
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches

const Geo = ({ k }) => k === 'knot' ? <torusKnotGeometry args={[1, .3, 128, 16]} /> : k === 'torus' ? <torusGeometry args={[1.2, .4, 16, 64]} />
  : k === 'ico' ? <icosahedronGeometry args={[1.2, 1]} /> : k === 'box' ? <boxGeometry args={[1.5, 1.5, 1.5]} />
  : k === 'cone' ? <coneGeometry args={[.9, 1.6, 5]} /> : k === 'dod' ? <dodecahedronGeometry args={[1]} />
  : k === 'oct' ? <octahedronGeometry args={[1.1]} /> : <sphereGeometry args={[1, 32, 32]} />

function Rig() {
  useFrame(({ camera }, dt) => {
    const k = 1 - Math.exp(-3 * dt), t = view.target
    camera.position.x += (t.x + view.mx * .7 - camera.position.x) * k
    camera.position.y += (t.y + view.my * .45 - camera.position.y) * k
    camera.position.z += (t.z - camera.position.z) * k
  })
  return null
}

function Hero() {
  const g = useRef()
  useFrame((_, dt) => { if (!reduce) { g.current.rotation.y += dt * .15; g.current.rotation.x = view.my * .2 } })
  return (
    <Float speed={reduce ? 0 : 1.5} floatIntensity={1.2}>
      <group ref={g} position={[lite ? 0 : 2.6, lite ? 1.2 : 0, 0]} scale={lite ? .8 : 1}>
        <mesh><icosahedronGeometry args={[1.7, 12]} />
          <MeshDistortMaterial color="#5b21b6" emissive="#1e1b4b" metalness={.9} roughness={.2} distort={.35} speed={reduce ? 0 : 1.6} /></mesh>
        <mesh rotation={[1.2, .3, 0]}><torusGeometry args={[2.6, .02, 8, 128]} /><meshBasicMaterial color="#22d3ee" /></mesh>
        <mesh rotation={[.4, 1, 0]}><torusGeometry args={[3.1, .015, 8, 128]} /><meshBasicMaterial color="#3b82f6" /></mesh>
      </group>
    </Float>
  )
}

const decor = [{ y: -6, x: 3.2, z: 0, c: '#22d3ee', k: 'ico' }, { y: -24, x: 0, z: -5, c: '#8b5cf6', k: 'knot' },
  { y: -36, x: -3.6, z: 0, c: '#3b82f6', k: 'torus' }, { y: -48, x: 3.2, z: 0, c: '#a855f7', k: 'sphere' }]

function Skills() {
  const g = useRef(), { viewport } = useThree()
  const sc = Math.min(1, viewport.width / 9)
  useFrame((_, dt) => { g.current.rotation.y += ((view.mx * .35) - g.current.rotation.y) * dt * 2; g.current.rotation.x += ((-view.my * .2) - g.current.rotation.x) * dt * 2 })
  return (
    <group ref={g} position={[0, -12, 0]} scale={sc}>
      {skills.map((s, i) => {
        const row = i < 4 ? 0 : 1, n = row ? 3 : 4, idx = row ? i - 4 : i
        return (
          <Float key={s.n} speed={reduce ? 0 : 2} floatIntensity={1.5} position={[(idx - (n - 1) / 2) * 2.6, row ? -1.6 : 1.4, 0]}>
            <mesh><Geo k={s.k} /><meshStandardMaterial color={s.c} metalness={.7} roughness={.25} emissive={s.c} emissiveIntensity={.25} /></mesh>
            <Html center position={[0, -1.5, 0]} style={{ pointerEvents: 'none' }}><span className="text-xs font-medium text-white/90 whitespace-nowrap">{s.n}</span></Html>
          </Float>
        )
      })}
    </group>
  )
}

export default function Scene() {
  useEffect(() => {
    const m = e => { view.mx = (e.clientX / innerWidth - .5) * 2; view.my = -(e.clientY / innerHeight - .5) * 2 }
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m)
  }, [])
  return (
    <Canvas dpr={[1, lite ? 1 : 1.5]} camera={{ fov: 48, position: [0, 0, 8] }} gl={{ antialias: !lite, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#080B16']} />
      <fog attach="fog" args={['#080B16', 15, 38]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-6, 4, 6]} intensity={70} color="#8b5cf6" />
      <pointLight position={[6, -2, 6]} intensity={50} color="#3b82f6" />
      <pointLight position={[0, 6, 2]} intensity={25} color="#22d3ee" />
      <Rig />
      <Stars radius={60} depth={50} count={lite ? 800 : 2200} factor={3.5} fade speed={reduce ? 0 : 0.8} />
      <Sparkles count={lite ? 30 : 90} scale={[16, 50, 10]} position={[0, -20, 0]} size={2.5} speed={reduce ? 0 : 0.3} color="#a5b4fc" />
      <Hero />
      {decor.map((d, i) => (
        <Float key={i} speed={reduce ? 0 : 1.2} rotationIntensity={reduce ? 0 : 1} position={[lite ? 0 : d.x, d.y, d.z]}>
          <mesh scale={lite ? .6 : 1}><Geo k={d.k} /><meshStandardMaterial color={d.c} wireframe={d.k === 'ico'} metalness={.8} roughness={.3} emissive={d.c} emissiveIntensity={.2} /></mesh>
        </Float>
      ))}
      <Skills />
    </Canvas>
  )
}
