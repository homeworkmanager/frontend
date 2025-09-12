import styles from './FreeDay.module.css';
import { BezParIcon } from '@/shared/Icons/BezPar';
import { Typhography } from '@/shared/ui/Typhography';

export const FreeDay = () => {
  return (
    <article className={styles['container']}>
      <Typhography tag="h2" variant="header" children={`Без пар`} className={styles['title']} />
      <BezParIcon className={styles['icon']} />
    </article>
  );
};
