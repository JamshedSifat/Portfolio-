import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic hover wrapper.
 * The wrapper gently follows the cursor while it's near, and snaps back with
 * a spring when it leaves. The inner content moves a little less than the
 * wrapper, which gives a subtle depth/parallax feel.
 *
 * Usage:
 *   <MagneticButton strength={0.35}>
 *     <a className="hero-btn hero-btn-primary">...</a>
 *   </MagneticButton>
 */
const MagneticButton = ({ children, strength = 0.35, radius = 110, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = useCallback(
    (e) => {
      if (reduceMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      // Pull falls off as the pointer moves away from the centre.
      const falloff = Math.max(0, 1 - dist / (radius + rect.width / 2));
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    },
    [radius, reduceMotion, strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
