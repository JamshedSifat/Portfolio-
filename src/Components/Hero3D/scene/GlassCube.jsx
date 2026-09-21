import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';

/**
 * Rotating glass cube with a glowing core.
 * Reacts to the cursor (tilts toward it + drifts slightly) on top of a slow
 * idle spin. Falls back to a cheaper glossy material on low-end devices.
 */
export default function GlassCube({ input, phase, reducedMotion, layout, lowPerf }) {
  const groupRef = useRef();
  const cubeRef = useRef();
  const coreRef = useRef();

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const s = input.current;
    const interactive = phase === 'ready' && !reducedMotion;

    if (cubeRef.current) {
      const c = cubeRef.current;
      const spin = reducedMotion ? 0 : t * 0.35;
      const tx = spin * 0.6 + (interactive ? -s.y * 0.55 : 0);
      const ty = spin + (interactive ? s.x * 0.7 : 0);
      c.rotation.x = THREE.MathUtils.damp(c.rotation.x, tx, 3, d);
      c.rotation.y = THREE.MathUtils.damp(c.rotation.y, ty, 3, d);
    }

    if (groupRef.current) {
      const g = groupRef.current;
      const [bx, by, bz] = layout.position;
      const px = interactive ? s.x * 0.22 : 0;
      const py = interactive ? s.y * 0.16 : 0;
      g.position.x = THREE.MathUtils.damp(g.position.x, bx + px, 2.5, d);
      g.position.y = THREE.MathUtils.damp(g.position.y, by + py, 2.5, d);
      g.position.z = bz;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.12;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y = -t * 0.8;
      coreRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={layout.position} scale={layout.scale}>
      <Float
        speed={reducedMotion ? 0 : 1.8}
        rotationIntensity={0}
        floatIntensity={reducedMotion ? 0 : 0.9}
        floatingRange={[-0.12, 0.12]}
      >
        <RoundedBox ref={cubeRef} args={[0.95, 0.95, 0.95]} radius={0.11} smoothness={5}>
          {lowPerf ? (
            <meshPhysicalMaterial
              color="#a5b4fc"
              transparent
              opacity={0.28}
              roughness={0.08}
              metalness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.6}
              depthWrite={false}
            />
          ) : (
            <MeshTransmissionMaterial
              samples={6}
              resolution={512}
              transmission={1}
              thickness={0.55}
              roughness={0.03}
              ior={1.45}
              chromaticAberration={0.04}
              anisotropy={0.1}
              distortion={0.16}
              distortionScale={0.3}
              temporalDistortion={0.08}
              color="#e0e7ff"
              attenuationColor="#818cf8"
              attenuationDistance={2.2}
              envMapIntensity={0.9}
              clearcoat={1}
              clearcoatRoughness={0.06}
            />
          )}
        </RoundedBox>

        {/* glowing core (blooms) */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshBasicMaterial color={[1.6, 1.8, 6]} toneMapped={false} />
        </mesh>
        <pointLight color="#818cf8" intensity={lowPerf ? 0 : 3} distance={4} decay={2} />
      </Float>
    </group>
  );
}
