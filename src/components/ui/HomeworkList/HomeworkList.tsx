import styles from './HomeworkList.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface HomeworkListProps {
  children: React.ReactNode;
}

interface HomeworkListRowProps {
  children: React.ReactNode;
}

interface HomeworkListColumnProps {
  children: React.ReactNode;
}

export const HomeworkList = ({ children }: HomeworkListProps) => {
  return (
    <ul className={styles['homework-list']}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </ul>
  );
};

HomeworkList.Row = ({ children }: HomeworkListRowProps) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={styles['row']}
    >
      {children}
    </motion.li>
  );
};

HomeworkList.Column = ({ children }: HomeworkListColumnProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={styles['homework-column']}
    >
      {children}
    </motion.div>
  );
};
