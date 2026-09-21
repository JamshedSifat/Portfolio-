import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';
import { createScreenTexture } from './screenTexture';

const LID_OPEN = Math.PI / 2 - 1.86; // ≈ 106° display angle
const LID_HOVER = Math.PI / 2 - 1.98;
const LID_CLOSED = Math.PI / 2 - 0.22;

const KEY_COLS = 15;
const KEY_ROWS = 5;
const KEY_COUNT = KEY_COLS * KEY_ROWS;

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

/**
 * Procedural, asset-free laptop (no GLB download needed):
 * aluminium chassis, backlit key grid, trackpad, hinge and a canvas-driven
 * "code editor" screen. Hovering rotates it slightly and opens the lid a bit
 * more; the lid also performs a cinematic open during the intro.
 *
 * To swap in a real model later: replace the <Chassis/> group with
 * `const { scene } = useGLTF('/models/laptop.glb')` inside <Suspense>.
 */
export default function Laptop({ input, phase, reducedMotion, layout, lowPerf }) {
  const tiltRef = useRef();
  const lidRef = useRef();
  const screenMatRef = useRef();
  const keysRef = useRef();
  const [hovered, setHovered] = useState(false);

  const screen = useMemo(() => createScreenTexture(), []);
  useEffect(() => () => screen.dispose(), [screen]);

  // lid angle is tweened by GSAP (intro) and damped on hover
  const initialLid = reducedMotion ? LID_OPEN : LID_CLOSED;
  const lid = useRef({ angle: initialLid, introDone: !!reducedMotion });

  useEffect(() => {
    if (phase === 'loading' || lid.current.introDone) return undefined;
    const tween = gsap.to(lid.current, {
      angle: LID_OPEN,
      duration: 1.7,
      delay: 0.25,
      ease: 'power3.out',
      onComplete: () => {
        lid.current.introDone = true;
      },
    });
    return () => tween.kill();
  }, [phase]);

  // key grid instances (static)
  useEffect(() => {
    const mesh = keysRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const keyW = 0.14;
    const keyD = 0.13;
    const startX = -((KEY_COLS - 1) * keyW) / 2;
    const startZ = -0.38;
    let i = 0;
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        // last row: wide space bar in the middle
        const isSpace = r === KEY_ROWS - 1 && c >= 4 && c <= 10;
        if (isSpace && c !== 4) {
          m.makeScale(0, 0, 0);
          mesh.setMatrixAt(i++, m);
          continue;
        }
        const sx = isSpace ? 8.1 : 1;
        const x = startX + c * keyW + (isSpace ? (keyW * 6) / 2 : 0);
        m.compose(
          new THREE.Vector3(x, 0, startZ + r * keyD),
          new THREE.Quaternion(),
          new THREE.Vector3(sx, 1, 1)
        );
        mesh.setMatrixAt(i++, m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    screen.update(d);

    const s = input.current;
    const t = tiltRef.current;
    if (t) {
      const interactive = phase === 'ready' && !reducedMotion;
      const targetY = layout.rotationY + (interactive ? s.x * 0.14 : 0) + (hovered ? 0.16 : 0);
      const targetX = interactive ? -s.y * 0.07 : 0;
      t.rotation.y = damp(t.rotation.y, targetY, 3.2, d);
      t.rotation.x = damp(t.rotation.x, targetX, 3.2, d);
    }

    if (lidRef.current) {
      let angle = lid.current.angle;
      if (lid.current.introDone) {
        angle = damp(lid.current.angle, hovered ? LID_HOVER : LID_OPEN, 4, d);
        lid.current.angle = angle;
      }
      lidRef.current.rotation.x = angle;

      // screen "turns on" as the lid passes ~35°
      const open = THREE.MathUtils.clamp((Math.PI / 2 - angle - 0.55) / 0.6, 0, 1);
      if (screenMatRef.current) {
        screenMatRef.current.emissiveIntensity = open * (hovered ? 1.55 : 1.3);
      }
    }
  });

  const { position, scale } = layout;

  return (
    <group position={position} scale={scale}>
      <Float
        speed={reducedMotion ? 0 : 1.3}
        rotationIntensity={reducedMotion ? 0 : 0.22}
        floatIntensity={reducedMotion ? 0 : 0.55}
        floatingRange={[-0.07, 0.07]}
      >
        <group ref={tiltRef} rotation={[0, layout.rotationY, 0]}>
          <group
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
          >
            {/* ---------- base ---------- */}
            <RoundedBox args={[2.6, 0.085, 1.72]} radius={0.035} smoothness={4}>
              <meshStandardMaterial
                color="#2b3446"
                metalness={0.9}
                roughness={0.32}
                envMapIntensity={1.25}
              />
            </RoundedBox>

            {/* keyboard deck (slight recess) */}
            <mesh position={[0, 0.0435, -0.1]}>
              <boxGeometry args={[2.25, 0.004, 0.78]} />
              <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.6} />
            </mesh>

            {/* backlit keys */}
            <instancedMesh
              ref={keysRef}
              args={[undefined, undefined, KEY_COUNT]}
              position={[0, 0.056, 0.0]}
            >
              <boxGeometry args={[0.116, 0.014, 0.104]} />
              <meshStandardMaterial
                color="#0b1220"
                roughness={0.55}
                metalness={0.25}
                emissive="#22d3ee"
                emissiveIntensity={lowPerf ? 0.06 : 0.09}
              />
            </instancedMesh>

            {/* trackpad */}
            <mesh position={[0, 0.045, 0.52]}>
              <boxGeometry args={[0.8, 0.003, 0.5]} />
              <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
            </mesh>

            {/* hinge */}
            <mesh position={[0, 0.06, -0.83]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.032, 0.032, 2.35, 24]} />
              <meshStandardMaterial color="#1f2937" metalness={0.95} roughness={0.25} />
            </mesh>

            {/* ---------- lid (pivots at hinge) ---------- */}
            <group ref={lidRef} position={[0, 0.06, -0.83]} rotation={[initialLid, 0, 0]}>
              <group position={[0, 0.83, 0]}>
                <RoundedBox args={[2.6, 1.66, 0.055]} radius={0.03} smoothness={4}>
                  <meshStandardMaterial
                    color="#2b3446"
                    metalness={0.9}
                    roughness={0.3}
                    envMapIntensity={1.25}
                  />
                </RoundedBox>

                {/* glossy cover glass / bezel */}
                <mesh position={[0, 0, 0.029]}>
                  <planeGeometry args={[2.5, 1.56]} />
                  <meshPhysicalMaterial
                    color="#02040a"
                    roughness={0.12}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    envMapIntensity={0.8}
                  />
                </mesh>

                {/* emissive display */}
                <mesh position={[0, 0.01, 0.031]}>
                  <planeGeometry args={[2.38, 1.44]} />
                  <meshStandardMaterial
                    ref={screenMatRef}
                    color="#000000"
                    emissive="#ffffff"
                    emissiveMap={screen.texture}
                    emissiveIntensity={1.3}
                    roughness={0.35}
                    metalness={0}
                  />
                </mesh>

                {/* screen light spill onto the keyboard */}
                <pointLight
                  position={[0, -0.2, 0.7]}
                  color="#6366f1"
                  intensity={lowPerf ? 0 : 1.6}
                  distance={2.4}
                  decay={2}
                />

                {/* glowing logo on the back of the lid */}
                <mesh position={[0, 0.05, -0.029]} rotation={[0, Math.PI, 0]}>
                  <circleGeometry args={[0.11, 32]} />
                  <meshBasicMaterial color={[1.2, 1.3, 4]} toneMapped={false} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </Float>
    </group>
  );
}
