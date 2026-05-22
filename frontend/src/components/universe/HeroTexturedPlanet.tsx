import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createGasGiantTexture } from './generateGasGiantTexture';

export type PlanetId = 'gas' | 'ice' | 'ai' | 'singularity';

interface HeroTexturedPlanetProps {
  planetId: PlanetId;
  isMobile?: boolean;
}

const PlanetSphere: React.FC<{ planetId: PlanetId }> = ({ planetId }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gasTexture = useMemo(() => createGasGiantTexture(), []);

  const [uranus, earth, moon, earthLights, earthClouds] = useTexture([
    '/planets/uranus.jpg',
    '/planets/earth.jpg',
    '/planets/moon.jpg',
    '/planets/earth_lights.png',
    '/planets/earth_clouds.png',
  ]);

  [uranus, earth, moon, earthLights, earthClouds].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const materialProps = useMemo(() => {
    switch (planetId) {
      case 'gas':
        return { map: gasTexture, emissiveMap: undefined as THREE.Texture | undefined, emissiveIntensity: 0, color: '#ffffff' };
      case 'ice':
        return { map: uranus, emissiveMap: undefined, emissiveIntensity: 0, color: '#d0ecff' };
      case 'ai':
        return { map: earth, emissiveMap: earthLights, emissiveIntensity: 0.4, color: '#ffffff' };
      case 'singularity':
        return { map: moon, emissiveMap: undefined, emissiveIntensity: 0, color: '#9999bb' };
      default:
        return { map: gasTexture, emissiveMap: undefined, emissiveIntensity: 0, color: '#ffffff' };
    }
  }, [planetId, gasTexture, uranus, earth, moon, earthLights]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.035;
  });

  const radius = 2.4;

  return (
    <group ref={groupRef} rotation={[0.15, -0.6, 0.06]}>
      <mesh>
        <sphereGeometry args={[radius, 72, 72]} />
        <meshStandardMaterial
          map={materialProps.map}
          emissiveMap={materialProps.emissiveMap}
          emissive={materialProps.emissiveMap ? new THREE.Color('#3366cc') : new THREE.Color('#000000')}
          emissiveIntensity={materialProps.emissiveIntensity}
          color={materialProps.color}
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>
      {planetId === 'ai' && (
        <mesh scale={[1.003, 1.003, 1.003]}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial
            map={earthClouds}
            transparent
            opacity={0.4}
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      )}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const Scene: React.FC<{ planetId: PlanetId; isMobile: boolean }> = ({ planetId, isMobile }) => (
  <>
    <ambientLight intensity={0.15} />
    <directionalLight position={[8, 4, 7]} intensity={2.6} color="#eef2ff" />
    <directionalLight position={[-5, -3, -5]} intensity={0.15} color="#020617" />
    <pointLight position={[6, 0, 9]} intensity={0.45} color="#22d3ee" />

    <Stars
      radius={100}
      depth={50}
      count={isMobile ? 1500 : 3000}
      factor={4}
      saturation={0.15}
      fade
      speed={0.5}
    />

    <group position={[2.35, 0, 0]}>
      <Suspense fallback={null}>
        <PlanetSphere planetId={planetId} />
      </Suspense>
    </group>
  </>
);

const HeroTexturedPlanet: React.FC<HeroTexturedPlanetProps> = ({ planetId, isMobile = false }) => (
  <div className="absolute inset-0 w-full h-full pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
    >
      <Scene planetId={planetId} isMobile={isMobile} />
    </Canvas>
  </div>
);

export default HeroTexturedPlanet;
