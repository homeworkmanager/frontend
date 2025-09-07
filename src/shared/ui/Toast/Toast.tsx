import React from 'react';

import { Typhography } from '../Typhography';

import styles from './Toast.module.css';
import { AnimatePresence, motion } from 'framer-motion';

type DeviceType = 'mobile' | 'desktop';

interface ToastProps {
  type: DeviceType;
  text: string;
}
export const Toast = ({ type, text }: ToastProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    setIsVisible(true);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles[`${type}`]}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={styles['container']}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Typhography tag="p" variant="thirdy" children={text} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
