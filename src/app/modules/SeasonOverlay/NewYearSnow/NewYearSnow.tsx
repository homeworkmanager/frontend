import { useMemo, useRef } from 'react';

import { snowGroups, snowTextures } from './utils';
import { useTheme } from '@/utils/contexts/theme/useTheme';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, InstancedMesh, Object3D } from 'three';

export const NewYearSnow = () => {
  const meshRefs = useRef<(InstancedMesh | null)[]>([]);
  const dummy = useMemo(() => new Object3D(), []);
  const { theme } = useTheme();

  useFrame((state, delta) => {
    const speedFactor = delta * 50;

    snowGroups.forEach((group, typeIndex) => {
      const mesh = meshRefs.current[typeIndex];
      if (!mesh) return;

      group.forEach((p, i) => {
        p.t += p.speed * speedFactor;

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
          args={[undefined, undefined, snowGroups[idx].length]}
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
