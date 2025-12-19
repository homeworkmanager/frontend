import { useMemo, useRef } from 'react';

import { useTheme } from '@/utils/contexts/theme/useTheme';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, DoubleSide, InstancedMesh, MathUtils, Object3D } from 'three';

const SNOW_COUNT = 700;
const TYPES_COUNT = 4;

export const NewYearSnow = () => {
  const meshRefs = useRef<(InstancedMesh | null)[]>([]);
  const dummy = useMemo(() => new Object3D(), []);
  const { theme } = useTheme();

  const snowTextures = useMemo(() => {
    return Array.from({ length: TYPES_COUNT }).map(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new CanvasTexture(canvas);

      ctx.translate(128, 128);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -100);
        ctx.stroke();
        for (let j = 1; j <= 3; j++) {
          const bp = -j * 25;
          const bl = 10 + Math.random() * 30;
          ctx.beginPath();
          ctx.moveTo(0, bp);
          ctx.lineTo(bl, bp - 10);
          ctx.moveTo(0, bp);
          ctx.lineTo(-bl, bp - 10);
          ctx.stroke();
        }
        ctx.restore();
      }
      const tex = new CanvasTexture(canvas);
      tex.anisotropy = 16;
      return tex;
    });
  }, []);

  const groups = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const temp = Array.from({ length: TYPES_COUNT }).map(() => [] as any[]);
    for (let i = 0; i < SNOW_COUNT; i++) {
      const type = Math.floor(Math.random() * TYPES_COUNT);
      temp[type].push({
        t: Math.random() * 100,
        speed: 0.009 + Math.random() / 50,
        xFactor: MathUtils.randFloatSpread(40),
        yFactor: MathUtils.randFloatSpread(20),
        zFactor: MathUtils.randFloatSpread(15),
        spin: MathUtils.randFloat(0.5, 2),
        size: 0.18 + (Math.random() + Math.random()) / 25
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    groups.forEach((group, typeIndex) => {
      const mesh = meshRefs.current[typeIndex];
      if (!mesh) return;

      group.forEach((p, i) => {
        p.t += p.speed;
        const x = p.xFactor + Math.sin(p.t) * 0.7;
        const y = ((p.yFactor - p.t) % 20) + 10;
        const z = p.zFactor;

        dummy.position.set(x, y, z);
        dummy.scale.setScalar(p.size);
        dummy.quaternion.copy(state.camera.quaternion);
        dummy.rotateZ(p.t * p.spin);
        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <>
      {snowTextures.map((tex, idx) => (
        <instancedMesh
          key={idx}
          args={[undefined, undefined, groups[idx].length]}
          ref={(el) => (meshRefs.current[idx] = el)}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            color={theme === 'dark' ? 'white' : '#8ebad9'}
            alphaTest={0.1}
            depthWrite={false}
            side={DoubleSide}
          />
        </instancedMesh>
      ))}
    </>
  );
};
