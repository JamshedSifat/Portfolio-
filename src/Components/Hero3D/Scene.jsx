import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor, Preload, Sparkles } from '@react-three/drei';
import Laptop from './scene/Laptop';
import GlassCube from './scene/GlassCube';
import Particles from './scene/Particles';
import Rings from './scene/Rings';
import Backdrop from './scene/Backdrop';
import CameraRig from './scene/CameraRig';
import Effects from './scene/Effects';
import useLayout from './scene/useLayout';

/** Fires `onReady` once the scene has actually rendered a couple of frames. */
function ReadySignal({ onReady }) {
  const frames = useRef(0);
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    frames.current += 1;
    if (frames.current >= 2) {
      fired.current = true;
      onReady();
    }
  });
  return null;
}

/** HDRI-style image based lighting built from light panels (no HDR download). */
function Studio() {
  return (
    <Environment resolution={256} frames={1} environmentIntensity={0.85}>
      {/* big soft key above */}
      <Lightformer form="rect" intensity={3} color="#e0e7ff" position={[0, 6, -1]} scale={[12, 6]} />
      {/* blue-purple rim from the left/back */}
      <Lightformer form="rect" intensity={3.2} color="#6366f1" position={[-7, 1.5, -2]} scale={[6, 5]} />
      {/* cyan strip on the right */}
      <Lightformer form="rect" intensity={2.4} color="#22d3ee" position={[7, 0.5, -1]} scale={[5, 1.4]} />
      {/* ring reflection behind */}
      <Lightformer form="ring" intensity={1.6} color="#a5b4fc" position={[0, 2.5, -7]} scale={[5, 5]} />
      {/* faint front fill */}
      <Lightformer form="rect" intensity={0.7} color="#ffffff" position={[0, 0.5, 8]} scale={[10, 5]} />
      {/* floor bounce */}
      <Lightformer form="rect" intensity={0.5} color="#4f46e5" position={[0, -6, 0]} scale={[12, 6]} />
    </Environment>
  );
}

function Lights({ lowPerf }) {
  return (
    <>
      <ambientLight intensity={0.28} color="#c7d2fe" />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color="#eef2ff" />
      {/* blue-purple rim */}
      <pointLight position={[-4, 2.5, -3]} intensity={lowPerf ? 14 : 22} color="#6366f1" distance={16} decay={2} />
      {/* cyan rim */}
      <pointLight position={[4.5, -1.5, -2.5]} intensity={lowPerf ? 10 : 16} color="#22d3ee" distance={14} decay={2} />
      {/* key spot */}
      <spotLight
        position={[2.5, 5, 4]}
        angle={0.55}
        penumbra={1}
        intensity={lowPerf ? 30 : 45}
        color="#e0e7ff"
        distance={20}
        decay={2}
      />
    </>
  );
}

function SceneContent({ input, phase, reducedMotion, lowPerf, onIntroComplete }) {
  const layout = useLayout();

  return (
    <>
      <color attach="background" args={['#020617']} />
      <Lights lowPerf={lowPerf} />
      <Studio />

      <Backdrop reducedMotion={reducedMotion} layout={layout} lowPerf={lowPerf} />
      <Rings reducedMotion={reducedMotion} layout={layout.rings} lowPerf={lowPerf} />

      <Laptop input={input} phase={phase} reducedMotion={reducedMotion} layout={layout.laptop} lowPerf={lowPerf} />
      <GlassCube input={input} phase={phase} reducedMotion={reducedMotion} layout={layout.cube} lowPerf={lowPerf} />

      <Particles
        input={input}
        phase={phase}
        reducedMotion={reducedMotion}
        layout={layout.particles}
        count={lowPerf ? 320 : 650}
      />
      <Sparkles
        position={layout.particles.center}
        count={lowPerf ? 30 : 60}
        scale={[7, 4, 4]}
        size={2.2}
        speed={reducedMotion ? 0 : 0.35}
        opacity={0.55}
        color="#a5b4fc"
        noise={0.8}
      />

      <CameraRig
        input={input}
        phase={phase}
        reducedMotion={reducedMotion}
        layout={layout}
        onIntroComplete={onIntroComplete}
      />
    </>
  );
}

/**
 * The lazy-loaded 3D hero canvas.
 * Props:
 *  input          – mutable ref { x, y, speed, scroll } fed by the DOM layer
 *  phase          – 'loading' | 'intro' | 'ready'
 *  active         – false when the hero is scrolled out of view (pauses rendering)
 *  reducedMotion  – prefers-reduced-motion
 *  onReady        – scene rendered its first frames
 *  onIntroComplete– camera fly-in finished
 */
export default function HeroCanvas({ input, phase, active, reducedMotion, onReady, onIntroComplete }) {
  const coarse = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    []
  );
  const maxDpr = useMemo(
    () => Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, coarse ? 1.5 : 2),
    [coarse]
  );
  const [dpr, setDpr] = useState(maxDpr);
  const [lowPerf, setLowPerf] = useState(coarse);

  // pause the loop entirely while the tab is hidden
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <Canvas
      frameloop={active && visible ? 'always' : 'never'}
      dpr={dpr}
      camera={{ fov: 40, near: 0.1, far: 200, position: [0, 1.6, 15.5] }}
      gl={{
        antialias: false, // MSAA is handled by the post-processing composer
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#020617', 1);
      }}
    >
      <PerformanceMonitor
        ms={250}
        iterations={6}
        threshold={0.7}
        flipflops={2}
        onDecline={() => {
          setDpr(1);
          setLowPerf(true);
        }}
        onIncline={() => setDpr(maxDpr)}
        onFallback={() => {
          setDpr(1);
          setLowPerf(true);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            input={input}
            phase={phase}
            reducedMotion={reducedMotion}
            lowPerf={lowPerf}
            onIntroComplete={onIntroComplete}
          />
          <Effects lowPerf={lowPerf} />
          <Preload all />
          <ReadySignal onReady={onReady} />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
