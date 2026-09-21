import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

/**
 * Post-processing: selective bloom (only HDR values above the threshold
 * glow), a cinematic vignette and ACES filmic tone mapping.
 * The composer disables the renderer's own tone mapping, so ToneMapping must
 * be the last effect in the chain.
 */
export default function Effects({ lowPerf }) {
  return (
    <EffectComposer multisampling={lowPerf ? 0 : 4} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        intensity={lowPerf ? 0.7 : 0.95}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.28}
        radius={0.7}
        levels={lowPerf ? 5 : 7}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.78} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
