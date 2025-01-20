import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

type ModalIdVariants = 'journal' | 'admin';

interface ModalProps extends React.ComponentProps<'dialog'> {
  modalId: ModalIdVariants;
  showInfo: boolean;
  showDetails: () => void;
}

export const Modal = ({ modalId, showInfo, showDetails, children, className }: ModalProps) => {
  const portalTarget = document.getElementById(modalId);
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {showInfo && (
        <motion.dialog
          id={modalId}
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
