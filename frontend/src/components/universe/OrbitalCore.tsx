import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail, Float, Ring } from '@react-three/drei';
import * as THREE from 'three';

const CorePulse = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    // Gentle rotation and pulse
    sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={sphereRef} scale={1.5}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          distort={0.3}
          speed={2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Outer energy rings */}
      <Ring args={[2.5, 2.55, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[3.2, 3.22, 64]} rotation={[-Math.PI / 3, Math.PI / 8, 0]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
    </Float>
  );
};

/**
 * Lightweight Three.js centerpiece for the Hero section.
 * Renders a holographic, rotating AI core.
 */
const OrbitalCore: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <CorePulse />
      </Canvas>
    </div>
  );
};

export default OrbitalCore;
