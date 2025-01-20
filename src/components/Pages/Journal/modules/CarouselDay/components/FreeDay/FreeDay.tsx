import styles from './FreeDay.module.css';
// import { BezParIcon } from '@/components/ui/Icons/BezPar';
import { Typhography } from '@/components/ui/Typhography';

export const FreeDay = () => {
  return (
    <article className={styles['container']}>
      {/* <BezParIcon className={styles['icon']} /> */}
      <Typhography tag="h2" variant="header" children={`Без пар`} className={styles['title']} />
    </article>
  );
};
