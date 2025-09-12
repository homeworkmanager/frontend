import styles from './Themes.module.css';
import { QuitLogo } from '@/shared/Icons/Quit';
import { Button } from '@/shared/ui/Button';
import { Typhography } from '@/shared/ui/Typhography';
import { useTheme } from '@/utils/contexts/theme/useTheme';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ThemeProps {
  onClose: () => void;
}

export const Themes = ({ onClose }: ThemeProps) => {
  const { theme, toggleTheme } = useTheme();

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
        <Button
          variant="attention"
          disabled={theme === 'dark'}
          onClick={() => toggleTheme('dark')}
          className={clsx(theme === 'dark' && styles['active'])}
          children="Тёмная"
        />
        <Button
          variant="attention"
          disabled={theme === 'light'}
          onClick={() => toggleTheme('light')}
          className={clsx(theme === 'light' && styles['active'])}
          children="Светлая"
        />
      </div>
    </motion.section>
  );
};
