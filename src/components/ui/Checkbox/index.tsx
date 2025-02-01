import React from 'react';

import styles from './Checkbox.module.css';
import clsx from 'clsx';

type CheckboxProps = React.ComponentProps<'input'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return <input ref={ref} {...props} type="checkbox" className={clsx(styles['checkbox'], className)} />;
});
