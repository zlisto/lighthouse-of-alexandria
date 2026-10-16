import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BRONZE, Boat, Box, GEO, Hills, Instanced, Palm, Water, mat } from './kit.jsx'
import { CAUSEWAY, ISLAND, TOWER } from './wonder.js'

// The island of Pharos at dusk: the three-tiered lighthouse (square base, octagonal middle, round
// top) with its fire burning and a statue above, on a walled platform at the island's heart, reached
// by the long causeway from the city. Ships ride the harbor; Alexandria glows across the water.

const STONE = '#efe6d4'
const OCT = new THREE.CylinderGeometry(1, 1.06, 1, 8)

function Fire({ y }) {
  const flame = useRef()
  const light = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const k = 1 + Math.sin(t * 9) * 0.08 + Math.sin(t * 13.7) * 0.06
    flame.current.scale.set(2.6 * k, 5 * (2 - k), 2.6 * k)
    light.current.intensity = 900 * k
  })
  return (
    <group position={[TOWER.x, y, TOWER.z]}>
      <mesh ref={flame} geometry={GEO.cone} position={[0, 2.2, 0]}>
        <meshStandardMaterial color="#ffd27a" emissive="#ff7a1a" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh geometry={GEO.sph} scale={2.4} position={[0, 1.2, 0]}>
        <meshBasicMaterial color="#ffb347" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, 3, 0]} color="#ffae4a" distance={260} decay={1.4} />
    </group>
  )
}

function Lighthouse() {
  const stone = mat(STONE, { roughness: 0.7 })
  const T1 = 44 // the square tier
  const T2 = 22 // the octagonal tier
  const T3 = 9 // the round lantern
  const B = 3 // the platform it stands on
  const windows = useMemo(() => {
    const out = []
    for (let y = B + 6; y < B + T1 - 4; y += 6)
      for (const s of [-1, 1])
        for (const k of [-5, 0, 5]) {
          out.push({ p: [TOWER.x + k, y, TOWER.z + s * 10.06], s: [1.2, 2.2, 0.1] })
          out.push({ p: [TOWER.x + s * 10.06, y, TOWER.z + k], s: [0.1, 2.2, 1.2] })
        }
    return out
  }, [])
  const ring = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    return { p: [TOWER.x + Math.sin(a) * 4.4, B + T1 + T2 + T3 / 2, TOWER.z + Math.cos(a) * 4.4], s: [0.45, T3, 0.45] }
  }), [])
  return (
    <>
      {/* the walled platform with a gate facing the causeway */}
      <Box p={[TOWER.x, B / 2, TOWER.z]} s={[26, B, 26]} c="#e2d6bd" />
      {[-1, 1].map((s) => (
        <Box key={s} p={[TOWER.x + s * 13, B + 1.5, TOWER.z]} s={[1, 3, 26]} c="#d9cdb3" />
      ))}
      <Box p={[TOWER.x, B + 1.5, TOWER.z - 13]} s={[26, 3, 1]} c="#d9cdb3" />
      {/* tier one: the tall square tower, slightly tapered, with windows */}
      <mesh material={stone} position={[TOWER.x, B + T1 / 2, TOWER.z]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[(17 / 2) * Math.SQRT2, (20 / 2) * Math.SQRT2, T1, 4, 1]} />
      </mesh>
      <Instanced items={windows} geometry={GEO.box} material={mat('#3a2e26')} />
      {/* bronze Tritons blowing conch shells at the corners of the first tier */}
      {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => (
        <group key={`${sx}${sz}`} position={[TOWER.x + sx * 8, B + T1, TOWER.z + sz * 8]}>
          <mesh geometry={GEO.cyl} material={mat('#9a7040', BRONZE)} position={[0, 1.5, 0]} scale={[0.6, 3, 0.6]} />
          <mesh geometry={GEO.sph} material={mat('#9a7040', BRONZE)} position={[0, 3.4, 0]} scale={0.6} />
          <mesh geometry={GEO.cone} material={mat('#9a7040', BRONZE)} position={[sx * 0.6, 3.6, sz * 0.6]} rotation={[sz * 1.1, 0, -sx * 1.1]} scale={[0.25, 1.4, 0.25]} />
        </group>
      )))}
      <Box p={[TOWER.x, B + T1 + 0.3, TOWER.z]} s={[18, 0.6, 18]} c="#e8dcc4" />
      {/* tier two: the octagon */}
      <mesh geometry={OCT} material={stone} position={[TOWER.x, B + T1 + T2 / 2, TOWER.z]} scale={[7.5, T2, 7.5]} />
      <mesh geometry={OCT} material={mat('#e8dcc4')} position={[TOWER.x, B + T1 + T2, TOWER.z]} scale={[8.2, 0.6, 8.2]} />
      {/* tier three: a ring of columns around the fire, a dome, and the statue */}
      <Instanced items={ring} geometry={GEO.cyl} material={stone} />
      <mesh geometry={GEO.cyl} material={stone} position={[TOWER.x, B + T1 + T2 + T3 + 0.4, TOWER.z]} scale={[5.2, 0.8, 5.2]} />
      <mesh geometry={GEO.sph} material={stone} position={[TOWER.x, B + T1 + T2 + T3 + 0.8, TOWER.z]} scale={[4.2, 2.2, 4.2]} />
      <group position={[TOWER.x, B + T1 + T2 + T3 + 2.8, TOWER.z]}>
        <mesh geometry={GEO.cyl} material={mat('#a77a40', BRONZE)} position={[0, 2, 0]} scale={[0.8, 4, 0.8]} />
        <mesh geometry={GEO.sph} material={mat('#a77a40', BRONZE)} position={[0, 4.5, 0]} scale={0.75} />
        <mesh geometry={GEO.cyl} material={mat('#a77a40', BRONZE)} position={[0.9, 4.5, 0]} rotation={[0, 0, -0.4]} scale={[0.12, 5, 0.12]} />
      </group>
      <Fire y={B + T1 + T2} />
    </>
  )
}

export default function Scene() {
  return (
    <>
      <Hills color="#b9a37a" r={460} h={20} />
      <Water x0={-600} x1={600} z0={-600} z1={600} y={0.05} color="#2f6f9a" />
      {/* the island and the causeway, a little above the water */}
      <Box p={[(ISLAND.x0 + ISLAND.x1) / 2, ISLAND.h / 2, (ISLAND.z0 + ISLAND.z1) / 2]} s={[ISLAND.x1 - ISLAND.x0, ISLAND.h, ISLAND.z1 - ISLAND.z0]} c="#d9c79c" />
      <Box p={[0, CAUSEWAY.h / 2, (CAUSEWAY.z0 + CAUSEWAY.z1) / 2]} s={[CAUSEWAY.x1 - CAUSEWAY.x0, CAUSEWAY.h, CAUSEWAY.z1 - CAUSEWAY.z0]} c="#cdbb8f" />
      {/* the city of Alexandria across the harbor: a long low skyline with lamps lit */}
      <Instanced
        items={Array.from({ length: 60 }, (_, i) => ({ p: [-280 + i * 9.5, 4 + (i % 4) * 2, 140 + (i % 3) * 6], s: [8, 8 + (i % 4) * 4, 8] }))}
        geometry={GEO.box}
        material={mat('#d8c8a8')}
      />
      <Instanced
        items={Array.from({ length: 40 }, (_, i) => ({ p: [-270 + i * 14, 6 + (i % 3) * 3, 135], s: [0.8, 0.8, 0.8] }))}
        geometry={GEO.box}
        material={mat('#ffcf80', { emissive: '#ffae4a', emissiveIntensity: 2 })}
      />
      <Lighthouse />
      <Boat x={-28} z={10} r={0.4} />
      <Boat x={30} z={-5} r={-0.8} sail="#e6c9a0" phase={1.1} />
      <Boat x={-60} z={-80} r={1.2} sail="#d9a0a0" phase={2.3} />
      <Boat x={70} z={-120} r={-1.4} phase={0.4} />
      <Boat x={25} z={45} r={2.6} sail="#e6d8b0" phase={3.1} />
      {[
        [-30, -30],
        [32, -28],
        [-36, -95],
        [36, -100],
      ].map(([x, z], i) => (
        <group key={i} position={[0, ISLAND.h, 0]}>
          <Palm x={x} z={z} h={8} r={i} />
        </group>
      ))}
    </>
  )
}
