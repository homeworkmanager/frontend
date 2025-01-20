import React from 'react';

import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonVariant = 'accept' | 'question' | 'menu-item' | 'slide';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  rotate?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, children, rotate, type, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={clsx(styles['Button'], variant && styles[variant], rotate && styles.rotate, className)}
      {...props}
    >
      {children}
    </button>
  )
);
