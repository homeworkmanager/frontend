import styles from './MultiList.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MultiListProps extends React.ComponentProps<'ul'> {
  children: React.ReactNode;
}

interface MultiListRowProps extends React.ComponentProps<'li'> {
  children: React.ReactNode;
}

interface MultiListColumnProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  icons?: number;
}

export const MultiList = ({ children, className, ...props }: MultiListProps) => {
  return (
    <ul className={clsx(styles['homework-list'], className)} {...props}>
      {children}
    </ul>
  );
};

MultiList.Row = ({ children, className }: MultiListRowProps) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={clsx(styles['row'], className)}
    >
      {children}
    </motion.li>
  );
};

MultiList.Column = ({ children, className, icons }: MultiListColumnProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={clsx(styles['column'], className)}
      {...(icons !== undefined && { style: { maxWidth: `calc(100% - ${30 + icons * 35}px)` } })}
    >
      {children}
    </motion.div>
  );
};
