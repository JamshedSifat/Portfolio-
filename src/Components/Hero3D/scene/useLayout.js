import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Where the DOM glass panel's right edge sits (as a fraction of the viewport
 * width). Mirrors the Tailwind layout in HeroOverlay: max-w-7xl container,
 * px-8 padding, 12-column grid with gap-10, panel = 6 cols (lg) / 5 cols (xl).
 */
function panelEdgeFraction(width) {
  const container = Math.min(width, 1280);
  const inner = container - 64;
  const col = (inner - 11 * 40) / 12;
  const cols = width >= 1280 ? 5 : 6;
  const panel = cols * col + (cols - 1) * 40;
  return ((width - container) / 2 + 32 + panel) / width;
}

/** Horizontal half-extent of the view at a given depth for the final camera pose. */
function halfWidthAt(camera, z, aspect) {
  const dist = camera.end.z - z;
  return dist * Math.tan((camera.end.fov * Math.PI) / 360) * aspect;
}

/**
 * Responsive placement of the 3D objects + camera.
 * Desktop  : text on the left, laptop centre-right (positions are derived
 *            from the real panel edge so both layers always line up).
 * Narrow   : glass panel stacks on top, laptop drops to the lower half.
 */
export default function useLayout() {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  return useMemo(() => {
    const narrow = width < 1024;
    const compact = width < 640;
    const aspect = width / Math.max(1, height);

    if (narrow) {
      // Glass panel stacks on top (items-start + bottom padding in HeroOverlay);
      // the laptop is anchored to a fraction of the section height below it.
      const scale = compact ? 0.66 : 0.82;
      const camera = {
        start: { x: 0, y: 1.8, z: 17, fov: 42 },
        end: { x: 0, y: 0.1, z: compact ? 10.5 : 9.6, fov: 38 },
        look: { x: 0, y: -0.45, z: 0 },
      };
      const halfH = camera.end.z * Math.tan((camera.end.fov * Math.PI) / 360);
      const yAt = (fraction) => camera.look.y + (0.5 - fraction) * 2 * halfH;
      const baseY = yAt(compact ? 0.88 : 0.87); // laptop base (pivot)
      const midY = baseY + 0.7 * scale; // visual centre of the open laptop

      return {
        narrow,
        compact,
        laptop: { position: [0, baseY, 0], rotationY: -0.28, scale },
        cube: {
          position: [compact ? 1.15 : 2.1, baseY + 1.9 * scale, -0.9],
          scale: compact ? 0.5 : 0.7,
        },
        rings: { position: [0, midY, -1.4], scale: compact ? 0.72 : 0.9 },
        glow: { position: [0, midY, -2.4], scale: compact ? 4.2 : 5.2 },
        particles: { center: [0, midY, -0.4], spread: compact ? 0.8 : 1 },
        camera,
      };
    }

    const camera = {
      start: { x: 0, y: 1.6, z: 15.5, fov: 40 },
      end: { x: 0, y: 0.35, z: 7.9, fov: 35 },
      look: { x: 0.45, y: 0.02, z: 0 },
    };

    // world-space x of the panel edge and the centre of the free area to its right
    const edgeF = panelEdgeFraction(width);
    const toWorld = (fraction, z) => camera.look.x + (fraction - 0.5) * 2 * halfWidthAt(camera, z, aspect);
    const laptopX = toWorld((edgeF + 1) / 2, 0);
    const cubeX = toWorld(edgeF, -0.6) + 0.3; // peeks out from behind the glass edge

    return {
      narrow,
      compact,
      laptop: { position: [laptopX, -0.32, 0], rotationY: -0.42, scale: 1 },
      cube: { position: [cubeX, 1.35, -0.6], scale: 1 },
      rings: { position: [laptopX + 0.15, -0.05, -1.4], scale: 1 },
      glow: { position: [laptopX, -0.2, -2.6], scale: 6.4 },
      particles: { center: [laptopX - 0.6, 0.1, -0.5], spread: 1.15 },
      camera,
    };
  }, [width, height]);
}
