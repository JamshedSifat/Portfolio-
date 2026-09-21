import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const vertexShader = /* glsl */ `
  attribute float aRadius;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aSize;
  attribute float aMix;
  attribute vec3  aTilt;      // x: tilt around X, y: tilt around Z, z: vertical offset

  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2  uPointer;

  varying float vMix;
  varying float vFade;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.,0.,0., 0.,c,-s, 0.,s,c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c,-s,0., s,c,0., 0.,0.,1.); }

  void main() {
    float ang = aPhase + uTime * aSpeed;
    vec3 p = vec3(cos(ang) * aRadius,
                  sin(uTime * 0.6 + aPhase * 3.0) * 0.10 + aTilt.z,
                  sin(ang) * aRadius);
    p = rotZ(aTilt.y) * rotX(aTilt.x) * p;
    p += position;                      // orbit centre
    p.xy += uPointer * 0.28;            // gentle pointer parallax

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (8.0 / max(0.5, -mv.z));

    vMix  = aMix;
    vFade = smoothstep(16.0, 6.0, -mv.z);   // fade the far ones a touch
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform vec3  uColorA;
  uniform vec3  uColorB;

  varying float vMix;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.9);
    if (a < 0.01) discard;
    vec3 col = mix(uColorA, uColorB, clamp(vMix, 0.0, 1.0));
    // HDR-ish centre so the brightest ones bloom
    col *= 1.0 + core * 2.2;
    gl_FragColor = vec4(col, a * uOpacity * vFade);
  }
`;

/**
 * Orbiting glowing particles. Everything is computed in the vertex shader;
 * the CPU only advances `uTime`, which accelerates when the cursor moves so
 * the swarm feels alive and reactive.
 */
export default function Particles({ input, phase, reducedMotion, layout, count = 650 }) {
  const matRef = useRef();
  const clock = useRef({ time: 0, energy: 0, opacity: 0, revealAt: null });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const radius = new Float32Array(count);
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    const size = new Float32Array(count);
    const mix = new Float32Array(count);
    const tilt = new Float32Array(count * 3);

    // Deterministic PRNG: identical field on every load, and render-pure.
    const random = mulberry32(1337 + count);
    const rand = (a, b) => a + random() * (b - a);

    for (let i = 0; i < count; i++) {
      // small jitter around the centre; the layout group positions the whole system
      positions[i * 3 + 0] = rand(-0.2, 0.2);
      positions[i * 3 + 1] = rand(-0.15, 0.15);
      positions[i * 3 + 2] = rand(-0.2, 0.2);

      const belt = random() < 0.72; // 72% in a tilted "galaxy" belt, rest volumetric
      radius[i] = belt ? rand(1.5, 3.4) : rand(1.2, 4.6);
      phase[i] = rand(0, Math.PI * 2);
      speed[i] = rand(0.08, 0.3) * (random() < 0.5 ? 1 : -1);
      size[i] = random() < 0.1 ? rand(9, 14) : rand(3, 7);
      mix[i] = random() < 0.55 ? rand(0, 0.35) : rand(0.65, 1);
      tilt[i * 3 + 0] = belt ? rand(-0.55, -0.25) : rand(-Math.PI, Math.PI);
      tilt[i * 3 + 1] = belt ? rand(-0.35, 0.15) : rand(-Math.PI, Math.PI);
      tilt[i * 3 + 2] = rand(-0.35, 0.35);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aMix', new THREE.BufferAttribute(mix, 1));
    geo.setAttribute('aTilt', new THREE.BufferAttribute(tilt, 3));
    // generous bounds so frustum culling never hides the system
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
      uOpacity: { value: 0 },
      uColorA: { value: new THREE.Color('#6366f1') },
      uColorB: { value: new THREE.Color('#22d3ee') },
    }),
    []
  );

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const c = clock.current;
    const s = input.current;
    const mat = matRef.current;
    if (!mat) return;

    // cursor velocity → burst of energy that decays once the pointer rests
    const age = performance.now() - (s.lastT || 0);
    const liveSpeed = s.speed * Math.exp(-age / 160);
    const target = reducedMotion ? 0 : Math.min(1, liveSpeed * 0.35);
    c.energy += (target - c.energy) * (target > c.energy ? 0.25 : 0.04);
    c.time += d * (reducedMotion ? 0.35 : 0.75 + c.energy * 2.6);

    // particles become visible ~0.5s into the intro
    if (phase !== 'loading' && c.revealAt === null) c.revealAt = state.clock.elapsedTime + 0.5;
    const shouldShow = c.revealAt !== null && state.clock.elapsedTime >= c.revealAt;
    c.opacity = THREE.MathUtils.damp(c.opacity, shouldShow ? 1 : 0, 2.2, d);

    mat.uniforms.uTime.value = c.time;
    mat.uniforms.uOpacity.value = c.opacity;
    mat.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    const interactive = phase === 'ready' && !reducedMotion;
    mat.uniforms.uPointer.value.lerp(
      interactive ? _tmp.set(s.x, s.y) : _tmp.set(0, 0),
      1 - Math.exp(-2.5 * d)
    );
  });

  return (
    <points geometry={geometry} position={layout.center} scale={layout.spread} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const _tmp = new THREE.Vector2();

/** Tiny seeded PRNG (32-bit), returns values in [0, 1). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
