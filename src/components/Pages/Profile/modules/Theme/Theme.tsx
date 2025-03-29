import { Button } from '@/components/ui/Button';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import styles from './Theme.module.css';

export const Theme = () => {
  return (
    <div className={styles['content']}>
      <Typhography tag="p" variant="secondary" className={styles['theme']} children={<span>Тема</span>} />

      <div className={styles['theme-actions']}>
        <Button variant="attention" onClick={() => {}} className={clsx(styles['active'])} children="Тёмная" />
        <Button variant="attention" onClick={() => {}} className={styles['temp']} children="Скоро" />
      </div>
    </div>
  );
};
