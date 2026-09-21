import { Component, Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import Preloader from './Preloader';
import HeroOverlay from './HeroOverlay';
import './hero.css';

// The whole Three.js / R3F stack is code-split: the main bundle stays light
// and the preloader covers the download + shader compile time.
const HeroCanvas = lazy(() => import('./Scene'));

const MIN_LOADER_MS = 1100; // keep the cube on screen at least this long
const MAX_LOADER_MS = 9000; // never trap the user behind the preloader

const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

/** If the 3D chunk fails to load (offline, old GPU…) the hero degrades to the static backdrop. */
class CanvasErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    if (this.props.onError) this.props.onError(error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Phase machine
 *   loading → preloader on, scene mounting / compiling
 *   intro   → preloader fades, camera flies in, lid opens, UI staggers in
 *   ready   → interactive (mouse parallax fully weighted)
 */
const Hero3D = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState('loading');
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const [progress, setProgress] = useState(0);
  const webgl = useMemo(() => (typeof window !== 'undefined' ? supportsWebGL() : true), []);
  const mountedAt = useRef(0);

  // Mutable input shared with the R3F scene (no re-renders on mouse move).
  const input = useRef({ x: 0, y: 0, speed: 0, scroll: 0, lastX: 0, lastY: 0, lastT: 0 });

  // ---- pointer → normalised (-1..1) relative to the section -------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    // touch-first devices: no hover parallax (idle animation only)
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const now = performance.now();
      const s = input.current;
      const dt = Math.max(16, now - (s.lastT || now));
      const v = Math.hypot(nx - s.lastX, ny - s.lastY) / (dt / 1000);
      s.speed = Math.min(6, v);
      s.x = Math.max(-1, Math.min(1, nx));
      s.y = Math.max(-1, Math.min(1, ny));
      s.lastX = nx;
      s.lastY = ny;
      s.lastT = now;
    };
    const onLeave = () => {
      input.current.speed = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  // ---- scroll progress (0..1 across the hero) ---------------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const onScroll = () => {
      const h = el.offsetHeight || window.innerHeight;
      input.current.scroll = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---- pause rendering when the hero is scrolled out of view -----------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- loading → intro orchestration -----------------------------------
  useEffect(() => {
    if (phase !== 'loading') return undefined;
    if (!mountedAt.current) mountedAt.current = performance.now();
    let raf = 0;
    let done = false;
    let lastPct = -1;

    const startIntro = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      setProgress(1);
      // tiny beat so the bar visibly reaches 100%
      setTimeout(() => setPhase('intro'), 140);
    };

    const tick = () => {
      const elapsed = performance.now() - mountedAt.current;
      // ease-out fake progress that stalls at ~88% until the scene is ready
      const fake = Math.min(0.88, 1 - Math.exp(-elapsed / 900));
      const pct = Math.round(fake * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(fake);
      }
      const ready = sceneReady || sceneFailed || !webgl;
      if (ready && elapsed >= MIN_LOADER_MS) startIntro();
      else if (elapsed >= MAX_LOADER_MS) startIntro();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, sceneReady, sceneFailed, webgl]);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleIntroComplete = useCallback(() => setPhase('ready'), []);
  const handleSceneError = useCallback((error) => {
    console.warn('[Hero3D] 3D scene unavailable, falling back to static hero.', error);
    setSceneFailed(true);
  }, []);

  const uiVisible = phase !== 'loading';

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-bleed hero-root relative min-h-svh overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D scene (lazy) */}
      {webgl && !sceneFailed && (
        <div className="hero-canvas" aria-hidden="true">
          <CanvasErrorBoundary onError={handleSceneError}>
            <Suspense fallback={null}>
              <HeroCanvas
                input={input}
                phase={phase}
                active={inView}
                reducedMotion={!!reduceMotion}
                onReady={handleSceneReady}
                onIntroComplete={handleIntroComplete}
              />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      )}

      {/* Glass UI */}
      <div className="pointer-events-none relative z-[2]">
        <HeroOverlay visible={uiVisible} sectionRef={sectionRef} reduceMotion={!!reduceMotion} />
      </div>

      <div className="hero-fade-bottom" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      {/* Black screen + rotating glowing cube (portaled so it covers the fixed navbar too) */}
      {createPortal(
        <AnimatePresence>{phase === 'loading' && <Preloader progress={progress} />}</AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Hero3D;
