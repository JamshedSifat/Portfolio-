import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const hdr = (hex, k) => new THREE.Color(hex).multiplyScalar(k);

/**
 * Animated neon rings behind the laptop.
 * Ring colours are pushed above 1.0 so the bloom pass picks them up.
 */
export default function Rings({ reducedMotion, layout, lowPerf }) {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();
  const group = useRef();

  const colors = useMemo(
    () => ({
      indigo: hdr('#6366f1', 2.4),
      cyan: hdr('#22d3ee', 2.1),
      violet: hdr('#4f46e5', 1.7),
    }),
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (r1.current) {
      r1.current.rotation.z = t * 0.18;
      r1.current.rotation.x = Math.sin(t * 0.25) * 0.14;
    }
    if (r2.current) {
      r2.current.rotation.z = -t * 0.26 + 1.2;
      r2.current.rotation.y = Math.sin(t * 0.2 + 1) * 0.12;
    }
    if (r3.current) {
      r3.current.rotation.z = t * 0.09 + 2.4;
      r3.current.rotation.x = Math.cos(t * 0.18) * 0.1;
    }
    if (group.current) {
      const breathe = 1 + Math.sin(t * 0.7) * 0.012;
      group.current.scale.setScalar(breathe * (layout.scale ?? 1));
    }
  });

  const seg = lowPerf ? 96 : 160;

  return (
    <group
      ref={group}
      position={layout.position}
      scale={layout.scale ?? 1}
      rotation={[0.35, -0.25, 0]}
    >
      {/* full thin ring */}
      <mesh ref={r1}>
        <torusGeometry args={[1.55, 0.009, 10, seg]} />
        <meshBasicMaterial color={colors.indigo} toneMapped={false} transparent opacity={0.85} />
      </mesh>

      {/* dashed ring (3 arcs) */}
      <group ref={r2}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <torusGeometry args={[2.0, 0.012, 10, Math.round(seg * 0.6), Math.PI * 0.42]} />
            <meshBasicMaterial color={colors.cyan} toneMapped={false} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>

      {/* faint outer ring + tiny orbiting dots (children so they share its wobble) */}
      <mesh ref={r3}>
        <torusGeometry args={[2.55, 0.006, 8, seg]} />
        <meshBasicMaterial color={colors.violet} toneMapped={false} transparent opacity={0.55} />
        {[0, 1, 2, 3].map((i) => (
          <OrbitDot
            key={i}
            radius={2.55}
            offset={(i * Math.PI) / 2}
            speed={0.22}
            reducedMotion={reducedMotion}
          />
        ))}
      </mesh>
    </group>
  );
}

function OrbitDot({ radius, offset, speed, reducedMotion }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const a = t * speed + offset + 2.4;
    ref.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={[2.5, 3.2, 6]} toneMapped={false} />
    </mesh>
  );
}
