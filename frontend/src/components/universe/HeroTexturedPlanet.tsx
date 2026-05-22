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

const PLANET_TEXTURES = [
  '/planets/uranus.jpg',
  '/planets/earth.jpg',
  '/planets/moon.jpg',
  '/planets/earth_lights.png',
  '/planets/earth_clouds.png',
];

useTexture.preload(PLANET_TEXTURES);

class PlanetErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Planet background failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full opacity-70 blur-[1px]"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(103,232,249,0.95), rgba(79,70,229,0.55) 42%, rgba(15,23,42,0.15) 68%, transparent 72%)',
            boxShadow: '0 0 90px rgba(168,85,247,0.22)',
          }}
        />
      );
    }

    return this.props.children;
  }
}

const PlanetSphere: React.FC<{ planetId: PlanetId }> = ({ planetId }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gasTexture = useMemo(() => createGasGiantTexture(), []);

  const [uranus, earth, moon, earthLights, earthClouds] = useTexture(PLANET_TEXTURES);

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
          color="#a78bfa"
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
    <pointLight position={[6, 0, 9]} intensity={0.38} color="#c4b5fd" />

    <Stars
      radius={100}
      depth={50}
      count={isMobile ? 1500 : 3000}
      factor={4}
      saturation={0.15}
      fade
      speed={0.5}
    />

    <group position={[isMobile ? 2.6 : 4.6, isMobile ? 1.8 : 0, 0]}>
      <Suspense fallback={null}>
        <PlanetSphere planetId={planetId} />
      </Suspense>
    </group>
  </>
);

const HeroTexturedPlanet: React.FC<HeroTexturedPlanetProps> = ({ planetId, isMobile = false }) => (
  <div className="absolute inset-0 w-full h-full pointer-events-none">
    <div
      className={`absolute ${isMobile ? 'right-[2%]' : 'right-[-15%]'} ${isMobile ? 'top-[22%]' : 'top-1/2'} h-[65vmin] w-[65vmin] -translate-y-1/2 rounded-full opacity-80`}
      style={{
        background:
          planetId === 'gas'
            ? 'repeating-linear-gradient(8deg, #7c2d12 0 8%, #f59e0b 10% 17%, #fde68a 19% 23%, #92400e 25% 34%)'
            : planetId === 'ice'
              ? 'radial-gradient(circle at 34% 30%, #dff8ff, #38bdf8 36%, #1e3a8a 72%)'
              : planetId === 'ai'
                ? 'radial-gradient(circle at 35% 30%, #bfdbfe, #1d4ed8 36%, #052e16 58%, #020617 78%)'
                : 'radial-gradient(circle at 35% 30%, #e5e7eb, #64748b 45%, #111827 78%)',
        boxShadow: 'inset -42px -34px 60px rgba(0,0,0,0.72), 0 0 90px rgba(168,85,247,0.2)',
        filter: 'saturate(1.08) contrast(1.08)',
      }}
    />
    <PlanetErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
      >
        <Scene planetId={planetId} isMobile={isMobile} />
      </Canvas>
    </PlanetErrorBoundary>
  </div>
);

export default HeroTexturedPlanet;
