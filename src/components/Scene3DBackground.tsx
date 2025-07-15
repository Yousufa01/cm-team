import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface PaperPlane3DProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

function PaperPlane3D({ position, scale = 1, color = "#87CEEB" }: PaperPlane3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  // Create paper plane geometry
  const planeGeometry = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    // Front triangle
    0, 0.2, 0.5,
    -0.3, -0.1, -0.2,
    0.3, -0.1, -0.2,
    
    // Back triangle
    0, 0.2, 0.5,
    0, -0.1, -0.5,
    -0.3, -0.1, -0.2,
    
    0, 0.2, 0.5,
    0.3, -0.1, -0.2,
    0, -0.1, -0.5,
  ])
  
  planeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  planeGeometry.computeVertexNormals()

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={planeGeometry}>
        <meshPhongMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

interface Scene3DBackgroundProps {
  children?: React.ReactNode
}

export function Scene3DBackground({ children }: Scene3DBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={0.4} />
        
        {/* Floating paper planes */}
        <PaperPlane3D position={[-3, 2, -2]} scale={0.8} color="#FFB6C1" />
        <PaperPlane3D position={[3, -1, -1]} scale={1.2} color="#87CEEB" />
        <PaperPlane3D position={[-2, -2, -3]} scale={0.6} color="#E6E6FA" />
        <PaperPlane3D position={[2, 3, -2]} scale={0.9} color="#F0E68C" />
        <PaperPlane3D position={[0, 1, -4]} scale={1.1} color="#98FB98" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      {/* Content overlay */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}