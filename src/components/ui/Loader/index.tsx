import React from 'react';

import styles from './Loader.module.css';
import clsx from 'clsx';

interface LoaderProps extends React.ComponentProps<'div'> {
  spinnerSize?: number;
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ spinnerSize = 40, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles['circular-skeleton'], className)} {...props}>
        <div style={{ width: spinnerSize, height: spinnerSize }} className={styles['spinner']}></div>
      </div>
    );
  }
);
