import styles from './Theme.module.css';
import { Button } from '@/components/ui/Button';
import { QuitLogo } from '@/components/ui/Icons/Quit';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ThemeProps {
  onClose: () => void;
}

export const Theme = ({ onClose }: ThemeProps) => {
  return (
    <motion.section
      className={styles['content']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles['theme']}>
        <Typhography tag="p" variant="secondary" className={styles['title']} children="Варианты" />
        <Button variant="logo" onClick={onClose} children={<QuitLogo />} />
      </div>
      <div className={styles['theme-actions']}>
        <Button variant="attention" onClick={() => {}} className={clsx(styles['active'])} children="Тёмная" />
        <Button variant="attention" onClick={() => {}} className={styles['temp']} children="Скоро" />
      </div>
    </motion.section>
  );
};
