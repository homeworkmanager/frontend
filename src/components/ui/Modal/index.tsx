import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps extends React.ComponentProps<'dialog'> {
  showInfo: boolean;
  showDetails: () => void;
}

export const Modal = ({ showInfo, showDetails, children, className }: ModalProps) => {
  const portalTarget = document.body;

  return createPortal(
    <AnimatePresence>
      {showInfo && (
        <motion.dialog
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx(styles['environment'], className)}
        >
          <div className={styles['background']} onClick={showDetails} />
          {children}
        </motion.dialog>
      )}
    </AnimatePresence>,
    portalTarget
  );
};
