import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, OrbitControls, Center } from '@react-three/drei'
import * as THREE from 'three'

interface Character3DProps {
  name: string
  onComplete?: () => void
}

function Giraffe3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Giraffe body */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
          <meshPhongMaterial color="#DAA520" />
        </mesh>
        
        {/* Giraffe neck */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
          <meshPhongMaterial color="#DAA520" />
        </mesh>
        
        {/* Giraffe head */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshPhongMaterial color="#DAA520" />
        </mesh>
        
        {/* Spots */}
        <mesh position={[0.2, 0.8, 0.15]}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshPhongMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.15, 0.3, 0.2]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshPhongMaterial color="#8B4513" />
        </mesh>
      </group>
    </Float>
  )
}

function Motorbike3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 3) * 2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Bike body */}
      <mesh>
        <boxGeometry args={[1.5, 0.3, 0.5]} />
        <meshPhongMaterial color="#FF4500" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-0.6, -0.4, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshPhongMaterial color="#2F4F4F" />
      </mesh>
      <mesh position={[0.6, -0.4, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshPhongMaterial color="#2F4F4F" />
      </mesh>
      
      {/* Exhaust trail */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.2, 6, 6]} />
        <meshPhongMaterial color="#D3D3D3" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function Trophy3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Trophy base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.3, 8]} />
          <meshPhongMaterial color="#DAA520" />
        </mesh>
        
        {/* Trophy cup */}
        <mesh>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshPhongMaterial color="#FFD700" />
        </mesh>
        
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 3) * 0.8,
            Math.sin(i * Math.PI / 3) * 0.5,
            Math.sin(i * Math.PI / 4) * 0.3
          ]}>
            <octahedronGeometry args={[0.05]} />
            <meshPhongMaterial color="#FFFF00" />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Artist3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <group ref={meshRef}>
        {/* Paintbrush */}
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI/4]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshPhongMaterial color="#8B4513" />
        </mesh>
        
        {/* Brush tip */}
        <mesh position={[0.35, 0.65, 0]}>
          <coneGeometry args={[0.1, 0.3, 8]} />
          <meshPhongMaterial color="#FF69B4" />
        </mesh>
        
        {/* Paint splashes */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 0.5
          ]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshPhongMaterial color={['#FF69B4', '#00CED1', '#FFD700', '#FF6347'][i]} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function LightBulb3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.2)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={meshRef}>
        {/* Bulb */}
        <mesh>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshPhongMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.2, 8]} />
          <meshPhongMaterial color="#C0C0C0" />
        </mesh>
        
        {/* Light rays */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 4) * 0.8,
            Math.sin(i * Math.PI / 4) * 0.8,
            0
          ]} rotation={[0, 0, i * Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.02, 0.02]} />
            <meshPhongMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Basketball3D() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 2 - 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 3
    }
  })

  return (
    <group ref={meshRef}>
      {/* Basketball */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshPhongMaterial color="#FF8C00" />
      </mesh>
      
      {/* Basketball lines */}
      <mesh>
        <torusGeometry args={[0.41, 0.02, 8, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.41, 0.02, 8, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      
      {/* Book nearby */}
      <mesh position={[1, -2, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshPhongMaterial color="#8B0000" />
      </mesh>
    </group>
  )
}

export function Character3D({ name, onComplete }: Character3DProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      onComplete?.()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  const getCharacter = () => {
    switch (name) {
      case "Vrindha": return <Giraffe3D />
      case "Hardik": return <Motorbike3D />
      case "Jenna": return <Trophy3D />
      case "Deno": return <Artist3D />
      case "Harshitha": return <LightBulb3D />
      case "Surbhi": return <Basketball3D />
      default: return <Giraffe3D />
    }
  }

  if (!isVisible) return null

  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        
        {getCharacter()}
        
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}