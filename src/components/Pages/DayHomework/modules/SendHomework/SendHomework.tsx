import React from 'react';

import styles from './SendHomework.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { AnimatePresence, motion } from 'framer-motion';

type ContentType = 'mobile' | 'desktop';

interface SendHomeworkProps {
  responseState: { isLoading: boolean; isSuccess: boolean; isError: boolean };
  type: ContentType;
}
export const SendHomework = ({ type, responseState }: SendHomeworkProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (responseState.isSuccess) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      setIsVisible(true);

      return () => clearTimeout(timer);
    }
  }, [responseState.isSuccess]);

  return (
    <div className={styles[`${type}`]}>
      {responseState.isError && <Typhography tag="p" variant="thirdy" children={'ошибка'} />}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={styles['container']}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Typhography tag="p" variant="thirdy" children={'Задание добавлено'} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
