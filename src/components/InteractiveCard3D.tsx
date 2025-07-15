import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveCard3DProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

function FloatingHeart() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  // Heart shape geometry
  const heartShape = new THREE.Shape()
  heartShape.moveTo(0, 0)
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0)
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1)
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0)
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0)

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  }

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={0.3}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhongMaterial color="#FF69B4" />
      </mesh>
    </Float>
  )
}

function MiniPaperPlane({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[1]) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  const planeGeometry = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    0, 0.1, 0.2,
    -0.15, -0.05, -0.1,
    0.15, -0.05, -0.1,
    
    0, 0.1, 0.2,
    0, -0.05, -0.2,
    -0.15, -0.05, -0.1,
    
    0, 0.1, 0.2,
    0.15, -0.05, -0.1,
    0, -0.05, -0.2,
  ])
  
  planeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  planeGeometry.computeVertexNormals()

  return (
    <mesh ref={meshRef} position={position} scale={0.5} geometry={planeGeometry}>
      <meshPhongMaterial color="#87CEEB" side={THREE.DoubleSide} transparent opacity={0.7} />
    </mesh>
  )
}

export function InteractiveCard3D({ name, onClick, children }: InteractiveCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCardTheme = () => {
    switch (name) {
      case "Vrindha":
        return "from-blush-pink/30 to-gentle-lavender/30";
      case "Hardik":
        return "from-sky-blue/30 to-pastel-mint/30";
      case "Jenna":
        return "from-gentle-lavender/30 to-blush-pink/30";
      case "Deno":
        return "from-pastel-mint/30 to-sky-blue/30";
      case "Harshitha":
        return "from-soft-white/50 to-gentle-lavender/30";
      case "Surbhi":
        return "from-blush-pink/30 to-sky-blue/30";
      default:
        return "from-card/80 to-card/60";
    }
  }

  return (
    <div className="relative group">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[2, 2, 2]} intensity={0.4} />
          
          <FloatingHeart />
          
          {/* Mini floating paper planes */}
          <MiniPaperPlane position={[-0.8, 0.3, 0]} />
          <MiniPaperPlane position={[0.8, -0.2, -0.5]} />
          <MiniPaperPlane position={[0.2, 0.7, -0.3]} />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={2} />
        </Canvas>
      </div>

      {/* Card Content */}
      <Card 
        className={`relative z-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-md border border-primary/30 bg-gradient-to-br ${getCardTheme()}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Card>
    </div>
  )
}