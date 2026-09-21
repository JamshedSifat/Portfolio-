# Jamshed Sifat — Portfolio

React + Vite portfolio with a premium, cinematic **3D hero section** built on Three.js /
React Three Fiber.

## Stack

- React 19 (JavaScript, no TypeScript) · Vite 7
- Tailwind CSS v4 + daisyUI
- **Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing**
- GSAP (camera / lid choreography) · Framer Motion (UI entrance, magnetic buttons)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## 3D Hero (`src/Components/Hero3D`)

```
Hero3D/
├─ Hero3D.jsx          section shell, phase machine (loading → intro → ready),
│                      pointer/scroll input, lazy-loads the 3D chunk
├─ Preloader.jsx       black screen + rotating glowing cube (CSS 3D)
├─ HeroOverlay.jsx     glassmorphism panel (name, role, stack, CTAs)
├─ MagneticButton.jsx  magnetic hover wrapper (framer-motion springs)
├─ hero.css            palette, glass, noise overlay, preloader keyframes
├─ Scene.jsx           <Canvas>: lights, HDRI-style environment, composition
└─ scene/
   ├─ Laptop.jsx        procedural floating laptop + canvas "code editor" screen
   ├─ GlassCube.jsx     rotating transmission-glass cube with glowing core
   ├─ Particles.jsx     GPU orbiting particles (custom shader)
   ├─ Rings.jsx         neon rings behind the laptop
   ├─ Backdrop.jsx      gradient blobs, halo, star field
   ├─ CameraRig.jsx     GSAP fly-in, mouse parallax, scroll dolly
   ├─ Effects.jsx       Bloom + Vignette + ACES tone mapping
   ├─ screenTexture.js  typing animation drawn into a CanvasTexture
   └─ useLayout.js      responsive placement (desktop / tablet / phone)
```

### Entrance timeline (~2.7 s)

1. Black screen with a rotating glowing cube while the 3D chunk downloads and shaders compile
2. Preloader fades, camera flies toward the laptop and the lid opens (GSAP)
3. Headline fades in, buttons slide up (Framer Motion)
4. Particles become visible; mouse parallax blends in

### Performance notes

- The whole Three.js stack is **code-split** (`React.lazy`) — the main bundle stays light.
- `PerformanceMonitor` lowers DPR / swaps the glass material / trims bloom on weak GPUs.
- Rendering pauses when the hero scrolls out of view or the tab is hidden.
- No external HDR / GLB downloads: lighting comes from an in-scene light-former environment
  and the laptop is procedural. To use a real model, load it with `useGLTF('/models/x.glb')`
  inside `Laptop.jsx` (keep it inside `<Suspense>` so the preloader covers the download).
- `prefers-reduced-motion` skips the fly-in and idle motion.

### Tweaking

- Colours: CSS variables at the top of `hero.css` and the hex values in `scene/*.jsx`.
- Copy: `HeroOverlay.jsx` (and the code lines on the laptop screen in `screenTexture.js`).
- Composition: `scene/useLayout.js` (positions are derived from the glass panel's edge, so the
  2D and 3D layers always line up).
