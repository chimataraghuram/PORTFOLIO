import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createGasGiantTexture } from './generateGasGiantTexture';

export type PlanetId = 'earth' | 'moon' | 'neptune' | 'mars';

interface HeroTexturedPlanetProps {
  planetId: PlanetId;
  isMobile?: boolean;
}

const PLANET_TEXTURES = [
  '/planets/earth.jpg',
  '/planets/moon.jpg',
  '/planets/neptune.jpg',
  '/planets/venus.jpg',
  '/planets/earth_lights.png',
  '/planets/earth_clouds.png',
];

// Only preload textures on desktop — Three.js never renders on mobile
if (typeof window !== 'undefined' && window.innerWidth >= 768) {
  useTexture.preload(PLANET_TEXTURES);
}

class PlanetErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Planet background failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }

    return this.props.children;
  }
}

const PlanetSphere: React.FC<{ planetId: PlanetId; isMobile: boolean }> = ({ planetId, isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gasTexture = useMemo(() => createGasGiantTexture(), []);

  const [earth, moon, neptune, venus, earthLights, earthClouds] = useTexture(PLANET_TEXTURES);

  [earth, moon, neptune, venus, earthLights, earthClouds].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const materialProps = useMemo(() => {
    switch (planetId) {
      case 'earth':
        return { map: earth, emissiveMap: earthLights, emissiveIntensity: 0.4, color: '#ffffff' };
      case 'moon':
        return { map: moon, emissiveMap: undefined, emissiveIntensity: 0, color: '#dddddd' };
      case 'neptune':
        return { map: neptune, emissiveMap: undefined, emissiveIntensity: 0, color: '#ffffff' };
      case 'mars':
        return { map: venus, emissiveMap: undefined, emissiveIntensity: 0, color: '#ffccaa' };
      default:
        return { map: earth, emissiveMap: undefined, emissiveIntensity: 0, color: '#ffffff' };
    }
  }, [planetId, earth, moon, neptune, venus, earthLights]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  // The camera is at z=8.5 with fov 36, giving a visible width of ~5.52 units at z=0 in the 75vmin square Canvas.
  // A radius of 2.6 (diameter 5.2) fits perfectly inside the 5.52 unit viewport.
  const radius = isMobile ? 2.2 : 2.6;

  return (
    <group ref={groupRef} rotation={[0.15, -0.6, 0.06]} key={planetId}>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          key={`mat-${planetId}`}
          map={materialProps.map}
          emissiveMap={materialProps.emissiveMap}
          emissive={materialProps.emissiveMap ? new THREE.Color('#3366cc') : new THREE.Color('#000000')}
          emissiveIntensity={materialProps.emissiveIntensity}
          color={materialProps.color}
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>
      {planetId === 'earth' && (
        <mesh scale={[1.003, 1.003, 1.003]}>
          <sphereGeometry args={[radius, 48, 48]} />
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

const Scene: React.FC<{ planetId: PlanetId; isMobile: boolean }> = ({ planetId, isMobile }) => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[8, 4, 7]} intensity={2.6} color="#eef2ff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.15} color="#020617" />
      <pointLight position={[6, 0, 9]} intensity={0.38} color="#c4b5fd" />

      <group position={[0, 0.5, 0]}>
        <Suspense fallback={null}>
          <PlanetSphere planetId={planetId} isMobile={isMobile} />
        </Suspense>
      </group>
    </>
  );
};

const HeroTexturedPlanet: React.FC<HeroTexturedPlanetProps> = ({ planetId, isMobile = false }) => {
  const cssFallback = (
    <div
      className={`absolute h-[65vmin] w-[65vmin] md:h-[75vmin] md:w-[75vmin] rounded-full opacity-80 transition-all duration-1000 ${planetId === 'mars' ? 'animate-spin-slow' : ''}`}
      style={{
        right: isMobile ? '-5%' : '0',
        top: isMobile ? '30%' : '50%',
        transform: isMobile ? 'none' : 'translate(65%, -50%)',
        background:
          planetId === 'earth'
            ? 'radial-gradient(circle at 35% 30%, #bfdbfe, #1d4ed8 36%, #052e16 58%, #020617 78%)'
            : planetId === 'neptune'
              ? 'radial-gradient(circle at 34% 30%, #dff8ff, #38bdf8 36%, #1e3a8a 72%)'
              : planetId === 'mars'
                ? 'repeating-linear-gradient(8deg, #7c2d12 0 8%, #f59e0b 10% 17%, #fde68a 19% 23%, #92400e 25% 34%)'
                : 'radial-gradient(circle at 35% 30%, #e5e7eb, #64748b 45%, #111827 78%)',
        boxShadow: 'inset -42px -34px 60px rgba(0,0,0,0.72), 0 0 90px rgba(168,85,247,0.2)',
        filter: 'saturate(1.08) contrast(1.08)',
      }}
    />
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* ALWAYS render CSS fallback as a guaranteed base layer. If Canvas loads, it appears perfectly on top. If Canvas hangs in Suspense, the user still sees this beautiful planet. */}
      {cssFallback}
      
      {!isMobile && (
        <PlanetErrorBoundary fallback={null}>
          <div 
            className="absolute h-[75vmin] w-[75vmin]"
            style={{ right: 0, top: '50%', transform: 'translate(65%, -50%)' }}
          >
            <Canvas
              camera={{ position: [0, 0, 8.5], fov: 36 }}
              gl={{ alpha: true, antialias: true }}
              style={{ background: 'transparent' }}
              dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
            >
              <Scene planetId={planetId} isMobile={isMobile} />
            </Canvas>
          </div>
        </PlanetErrorBoundary>
      )}
    </div>
  );
};

export default HeroTexturedPlanet;
