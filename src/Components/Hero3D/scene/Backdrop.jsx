import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

/** Soft radial-gradient texture used by blobs and the halo. */
function useRadialTexture() {
  const tex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.14)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function Blob({ map, color, position, scale, opacity, drift, reducedMotion }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    const [ax, ay, fx, fy, ph] = drift;
    ref.current.position.x = position[0] + Math.sin(t * fx + ph) * ax;
    ref.current.position.y = position[1] + Math.cos(t * fy + ph * 1.7) * ay;
    ref.current.material.opacity = opacity * (0.9 + Math.sin(t * 0.4 + ph) * 0.1);
  });
  return (
    <sprite ref={ref} position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={map}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

/**
 * Background layer: floating gradient blobs, a radial glow behind the
 * laptop and a distant, slowly twinkling star field.
 */
export default function Backdrop({ reducedMotion, layout, lowPerf }) {
  const radial = useRadialTexture();

  return (
    <group>
      {/* far background blobs */}
      <group>
        <Blob
          map={radial}
          color="#4f46e5"
          position={[-5.5, 2.4, -9]}
          scale={11}
          opacity={0.32}
          drift={[0.9, 0.6, 0.11, 0.09, 0.3]}
          reducedMotion={reducedMotion}
        />
        <Blob
          map={radial}
          color="#6366f1"
          position={[4.5, -3.2, -10]}
          scale={12}
          opacity={0.28}
          drift={[1.1, 0.7, 0.08, 0.12, 2.1]}
          reducedMotion={reducedMotion}
        />
        <Blob
          map={radial}
          color="#22d3ee"
          position={[6.5, 3.6, -11]}
          scale={9}
          opacity={0.14}
          drift={[0.8, 0.9, 0.13, 0.07, 4.2]}
          reducedMotion={reducedMotion}
        />
      </group>

      {/* soft halo behind the 3D object */}
      <group>
        <Blob
          map={radial}
          color="#6366f1"
          position={layout.glow.position}
          scale={layout.glow.scale}
          opacity={0.55}
          drift={[0.08, 0.06, 0.4, 0.3, 1]}
          reducedMotion={reducedMotion}
        />
        <Blob
          map={radial}
          color="#22d3ee"
          position={[layout.glow.position[0] + 1.4, layout.glow.position[1] - 1.2, layout.glow.position[2]]}
          scale={layout.glow.scale * 0.5}
          opacity={0.22}
          drift={[0.12, 0.1, 0.3, 0.45, 2]}
          reducedMotion={reducedMotion}
        />
      </group>

      {/* tiny animated stars, far away so parallax barely moves them */}
      <Stars
        radius={60}
        depth={40}
        count={lowPerf ? 900 : 1800}
        factor={3.2}
        saturation={0.15}
        fade
        speed={reducedMotion ? 0 : 0.6}
      />
    </group>
  );
}
