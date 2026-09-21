import { useEffect } from 'react';
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1];

// Entrance choreography (seconds, relative to intro start)
const fade = (delay, y = 18) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE, delay },
  },
});

/*
 * NOTE on glassmorphism: Chrome disables `backdrop-filter` for an element
 * (or ignores content behind it) as soon as the element itself – or any
 * ancestor – has opacity < 1, a filter, or will-change: opacity. So the glass
 * panel never animates its own opacity; instead a dark "cover" child fades
 * out on top of it (entrance) and back in (scroll), which looks identical.
 */
const panelVariants = {
  hidden: { y: 26, scale: 0.985 },
  visible: { y: 0, scale: 1, transition: { duration: 0.9, ease: EASE, delay: 0.35 } },
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Glass UI that sits on top of the 3D scene.
 * `visible` toggles the staggered entrance (text fades in, buttons slide up).
 * `sectionRef` drives the scroll-linked drift/fade.
 */
const HeroOverlay = ({ visible, sectionRef, reduceMotion }) => {
  const state = visible ? 'visible' : 'hidden';

  // scroll-linked drift + fade (0 → 1 across the hero height)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);

  // entrance cover: 1 (hidden) → 0 (revealed)
  const intro = useMotionValue(1);
  useEffect(() => {
    if (!visible) return undefined;
    const controls = animate(intro, 0, { duration: 0.9, delay: 0.35, ease: EASE });
    return () => controls.stop();
  }, [visible, intro]);

  const coverOpacity = useTransform([intro, scrollYProgress], ([i, s]) => {
    const scrollVeil = Math.min(1, Math.max(0, (s - 0.04) / 0.5)) * 0.94;
    return Math.max(i, scrollVeil);
  });

  return (
    <motion.div
      style={{ y: driftY }}
      className="relative z-[2] mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 items-start gap-10 px-5 pb-[62vw] pt-28 sm:px-8 sm:pb-[52vw] lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-24"
    >
      {/* LEFT — glass panel */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate={state}
        className="hero-glass pointer-events-auto rounded-[28px] p-7 sm:p-10 lg:col-span-6 xl:col-span-5"
      >
        <motion.div variants={fade(0.55, 10)} initial="hidden" animate={state}>
          <span className="hero-chip">
            <span className="dot" />
            Available for new opportunities
          </span>
        </motion.div>

        <motion.p
          variants={fade(0.65)}
          initial="hidden"
          animate={state}
          className="mt-6 text-base font-medium tracking-wide text-slate-400 sm:text-lg"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={fade(0.72, 22)}
          initial="hidden"
          animate={state}
          className="relative mt-1 text-[2.75rem] leading-none sm:text-6xl xl:text-7xl"
        >
          <span className="hero-title-glow" aria-hidden="true">
            Jamshed Sifat
          </span>
          <span className="hero-title">Jamshed Sifat</span>
        </motion.h1>

        <motion.h2
          variants={fade(0.86)}
          initial="hidden"
          animate={state}
          className="mt-5 text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl"
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          variants={fade(0.96)}
          initial="hidden"
          animate={state}
          className="mt-3 text-sm font-medium tracking-wide text-slate-400 sm:text-base"
        >
          React <span className="hero-sep">•</span> Django <span className="hero-sep">•</span> AI
          Integration
        </motion.p>

        <motion.p
          variants={fade(1.02)}
          initial="hidden"
          animate={state}
          className="mt-5 max-w-md text-sm leading-relaxed text-slate-400/90 sm:text-[0.95rem]"
        >
          I design and build fast, elegant web products — from pixel-perfect interfaces to
          scalable backends and AI-powered features.
        </motion.p>

        {/* Buttons slide upward */}
        <motion.div
          variants={fade(1.15, 34)}
          initial="hidden"
          animate={state}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton strength={0.4}>
            <Link to="/#projects" className="hero-btn hero-btn-primary w-full sm:w-auto">
              <span className="shine" aria-hidden="true" />
              <span className="relative">View Projects</span>
              <span className="relative">
                <ArrowIcon />
              </span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.4}>
            <a
              href="/jamshedCv.pdf"
              download="Jamshed_Sifat_Resume.pdf"
              className="hero-btn hero-btn-ghost w-full sm:w-auto"
            >
              <DownloadIcon />
              <span>Download Resume</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          variants={fade(1.3, 10)}
          initial="hidden"
          animate={state}
          className="mt-8 hidden grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:grid"
        >
          {[
            ['10+', 'Projects shipped'],
            ['1+', 'Years building'],
            ['∞', 'Curiosity'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-xl font-bold tracking-tight text-white sm:text-2xl">{value}</div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* entrance / scroll veil (see note above) */}
        <motion.div
          aria-hidden="true"
          className="hero-cover"
          style={{ opacity: coverOpacity }}
        />
      </motion.div>

      {/* RIGHT — reserved for the 3D laptop (empty on purpose) */}
      <div className="hidden lg:col-span-6 lg:block xl:col-span-7" aria-hidden="true" />

      {/* Scroll hint */}
      <motion.div
        variants={fade(1.6, 0)}
        initial="hidden"
        animate={state}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <div className="hero-scroll-hint">
          <span />
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
      </motion.div>
    </motion.div>
  );
};

export default HeroOverlay;
