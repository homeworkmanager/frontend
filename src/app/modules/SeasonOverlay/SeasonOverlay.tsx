import { NewYearSnow } from './NewYearSnow';
import styles from './SeasonOverlay.module.css';
import { NEW_YEAR, SEASONS_BACKGROUNDS } from '@/utils/constants/seasons';
import { isSpecialSeason } from '@/utils/helpers/calculateSpecialSeason';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';

export const SeasonOverlay = () => {
  const season = isSpecialSeason();

  return (
    <>
      {!!season && (
        <div className={clsx(styles['season-overlay'], season && styles[SEASONS_BACKGROUNDS[season]])}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            style={{ pointerEvents: 'none' }}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
          >
            {season === NEW_YEAR && <NewYearSnow />}
          </Canvas>
        </div>
      )}
    </>
  );
};
