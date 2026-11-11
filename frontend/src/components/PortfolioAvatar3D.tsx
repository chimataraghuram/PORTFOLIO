import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, useGLTF } from '@react-three/drei';

interface AvatarProps {
  isMobile: boolean;
  mouse: { x: number; y: number; active: boolean };
}

const MODEL_URL = '/models/portfolio_3d_avatar.glb';

const AvatarModel: React.FC<AvatarProps> = ({ isMobile, mouse }) => {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    const targetY = !isMobile && mouse.active
      ? THREE.MathUtils.clamp((mouse.x / window.innerWidth - 0.64) * 0.6, -0.25, 0.25)
      : 0;
    const targetX = !isMobile && mouse.active
      ? THREE.MathUtils.clamp((mouse.y / window.innerHeight - 0.5) * -0.16, -0.09, 0.09)
      : 0;

    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY, 5, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetX, 5, delta);
    root.current.position.y = Math.sin(clock.elapsedTime * 1.25) * 0.045;
  });

  return <group ref={root}><Center><primitive object={model} /></Center></group>;
};

const PortfolioAvatar3D: React.FC<AvatarProps> = (props) => (
  <div className="relative w-52 sm:w-64 md:w-full md:max-w-[310px] lg:max-w-[360px] aspect-[4/5] mx-auto md:ml-auto md:mr-0">
    <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-cyan-400/35 via-fuchsia-500/20 to-amber-400/25 blur-3xl animate-pulse" />
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      fallback={<img src="/avatar-3d.png" alt="3D avatar fallback" className="h-full w-full object-contain" />}
      className="relative z-10 h-full w-full"
    >
      <ambientLight intensity={1.05} />
      <hemisphereLight args={['#cdeaff', '#1b1029', 1.15]} />
      <spotLight position={[3.5, 5, 5]} intensity={3} angle={0.5} penumbra={0.85} color="#edf6ff" castShadow />
      <pointLight position={[-3, 1.5, 3]} intensity={2} color="#f472b6" />
      <pointLight position={[2, -1, 2]} intensity={1.1} color="#22d3ee" />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.22}>
          <AvatarModel {...props} />
        </Bounds>
      </Suspense>
      <ContactShadows position={[0, -1.9, 0]} opacity={0.42} scale={4.3} blur={2.5} far={3} color="#020617" />
    </Canvas>
  </div>
);

useGLTF.preload(MODEL_URL);

export default React.memo(PortfolioAvatar3D);
