import { motion } from 'framer-motion';

/**
 * Black screen + rotating glowing cube shown while the 3D chunk loads
 * and the scene compiles. `progress` is 0..1.
 */
const Preloader = ({ progress = 0 }) => {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  return (
    <motion.div
      className="hero-preloader"
      key="hero-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-busy={pct < 100}
    >
      <div className="pl-stage" aria-hidden="true">
        <div className="pl-glow" />
        <div className="pl-cube-wobble">
          <div className="pl-cube">
            <span className="pl-face" />
            <span className="pl-face" />
            <span className="pl-face" />
            <span className="pl-face" />
            <span className="pl-face" />
            <span className="pl-face" />
            <span className="pl-core" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="pl-bar">
          <i style={{ width: `${pct}%` }} />
        </div>
        <p className="pl-label">Loading experience · {pct}%</p>
      </div>
    </motion.div>
  );
};

export default Preloader;
