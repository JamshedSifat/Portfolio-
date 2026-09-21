import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

const _look = new THREE.Vector3();

/**
 * Camera choreography:
 *  • intro   → GSAP flies the camera from far away toward the laptop
 *  • idle    → mouse parallax (position + gentle look-at tilt) with damping
 *  • scroll  → slight dolly-in as the user scrolls past the hero
 */
export default function CameraRig({ input, phase, reducedMotion, layout, onIntroComplete }) {
  const camera = useThree((s) => s.camera);
  const base = useRef({ ...layout.camera.start });
  const smooth = useRef({ x: 0, y: 0, weight: 0, scroll: 0 });
  const tweenRef = useRef(null);
  const introRef = useRef({ started: false, done: false });
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  /** Kill any running camera tween and glide to a new pose. */
  const flyTo = useCallback((pose, duration, ease, onComplete) => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(base.current, {
      ...pose,
      duration,
      ease,
      onComplete: () => {
        tweenRef.current = null;
        if (onComplete) onComplete();
      },
    });
    return tweenRef.current;
  }, []);

  const finishIntro = useCallback(() => {
    introRef.current.done = true;
    onIntroComplete();
  }, [onIntroComplete]);

  // place the camera at its starting pose immediately
  useEffect(() => {
    const start = reducedMotion ? layout.camera.end : layout.camera.start;
    Object.assign(base.current, start);
    camera.position.set(start.x, start.y, start.z);
    camera.fov = start.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(layout.camera.look.x, layout.camera.look.y, layout.camera.look.z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);

  // intro fly-in (also runs if the scene mounted after the preloader left)
  useEffect(() => {
    if (phase === 'loading' || introRef.current.started) return;
    introRef.current.started = true;

    if (reducedMotion) {
      Object.assign(base.current, layout.camera.end);
      finishIntro();
      return;
    }
    flyTo(layout.camera.end, 1.6, 'power3.out', finishIntro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // breakpoint changed → glide to the new pose (keeps the intro promise alive)
  useEffect(() => {
    const intro = introRef.current;
    if (!intro.started) return;
    if (!intro.done) {
      const running = tweenRef.current;
      const remaining = running ? Math.max(0.5, running.duration() - running.time()) : 0.8;
      flyTo(layout.camera.end, remaining, 'power3.out', finishIntro);
    } else {
      flyTo(layout.camera.end, 1.1, 'power2.inOut');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  // cleanup on unmount
  useEffect(
    () => () => {
      if (tweenRef.current) tweenRef.current.kill();
    },
    []
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const s = input.current;
    const sm = smooth.current;
    const b = base.current;
    const { look } = layoutRef.current.camera;

    // parallax weight blends in after the intro so there's no jump
    const targetWeight = phase === 'ready' && !reducedMotion ? 1 : 0;
    sm.weight = THREE.MathUtils.damp(sm.weight, targetWeight, 2, d);
    sm.x = THREE.MathUtils.damp(sm.x, s.x, 3.5, d);
    sm.y = THREE.MathUtils.damp(sm.y, s.y, 3.5, d);
    sm.scroll = THREE.MathUtils.damp(sm.scroll, s.scroll, 6, d);

    const w = sm.weight;
    camera.position.set(
      b.x + sm.x * 0.5 * w,
      b.y + sm.y * 0.28 * w - sm.scroll * 0.35,
      b.z - sm.scroll * 1.4
    );

    if (Math.abs(camera.fov - b.fov) > 0.01) {
      camera.fov = b.fov;
      camera.updateProjectionMatrix();
    }

    _look.set(look.x + sm.x * 0.3 * w, look.y + sm.y * 0.18 * w - sm.scroll * 0.25, look.z);
    camera.lookAt(_look);
  });

  return null;
}
