import React from 'react';

import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonVariant = 'accept' | 'cancel' | 'question' | 'attention' | 'menu-item' | 'logo';

type ColorTypes = 'warn' | 'current';

const colors = {
  warn: '--button-attention-color',
  current: '--border-focus-color'
};

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  rotate?: boolean;
  color?: ColorTypes;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, children, color, rotate, type, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      {...(!!color && { style: { color: `var(${colors[color]})`, borderColor: `var(${colors[color]})` } })}
      className={clsx(styles['Button'], variant && styles[variant], rotate && styles.rotate, className)}
      {...props}
    >
      {children}
    </button>
  )
);
