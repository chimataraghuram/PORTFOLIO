import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Ring, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const CorePulse = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!sphereRef.current || !glowRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Core rotation
    sphereRef.current.rotation.x = t * 0.1;
    sphereRef.current.rotation.y = t * 0.2;
    
    // Cinematic breathing pulse
    const scale = 1.5 + Math.sin(t * 2) * 0.05;
    sphereRef.current.scale.set(scale, scale, scale);
    
    // Inner glow pulse
    const glowScale = 1.3 + Math.sin(t * 2 + Math.PI) * 0.1;
    glowRef.current.scale.set(glowScale, glowScale, glowScale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      {/* Inner glowing energy reactor */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Outer distorted wireframe mesh */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={1.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Floating data fragments around the core */}
      <Sparkles count={40} scale={4} size={3} speed={0.4} color="#06b6d4" opacity={0.5} />
      
      {/* Outer holographic data rings */}
      <group rotation={[Math.PI / 2.5, 0, 0]}>
        <Ring args={[2.5, 2.52, 64]} >
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </Ring>
        {/* Secondary ring track */}
        <Ring args={[2.7, 2.71, 64]} >
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} side={THREE.DoubleSide} />
        </Ring>
      </group>
      
      <group rotation={[-Math.PI / 3, Math.PI / 8, 0]}>
        <Ring args={[3.2, 3.22, 64]} >
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </Ring>
      </group>
    </Float>
  );
};

/**
 * The Signature Cinematic Object for the Hero Section.
 * A holographic AI core that anchors the visual language.
 */
const OrbitalCore: React.FC = () => {
  return (
    <div className="absolute inset-0 md:left-[40%] w-full md:w-[60%] h-full pointer-events-none z-0 flex items-center justify-center opacity-40 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <CorePulse />
      </Canvas>
    </div>
  );
};

export default OrbitalCore;
