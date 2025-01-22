import styles from './HomeworkList.module.css';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface HomeworkListProps {
  children: React.ReactNode;
}

interface HomeworkListRowProps {
  children: React.ReactNode;
}

interface HomeworkListColumnProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

export const HomeworkList = ({ children }: HomeworkListProps) => {
  return (
    <table className={styles['homework-list']}>
      <AnimatePresence>
        <tbody>{children}</tbody>
      </AnimatePresence>
    </table>
  );
};

HomeworkList.Row = ({ children }: HomeworkListRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={styles['homework-row']}
    >
      {children}
    </motion.tr>
  );
};

HomeworkList.Column = ({ children, isMobile }: HomeworkListColumnProps) => {
  return (
    <motion.td
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={clsx(isMobile && styles['mobile'])}
    >
      {children}
    </motion.td>
  );
};
