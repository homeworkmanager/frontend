import React from 'react';

import styles from './Input.module.css';
import clsx from 'clsx';

type InputVarinat = 'primary' | 'homework';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  name: string;
  value?: string | number;
  error?: string;
  variant: InputVarinat;
  custom?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, name, label, className, value, error, type, custom = false, ...props }, ref) => {
    return (
      <div className={styles['container']}>
        {!custom && (
          <label className={styles['label']} htmlFor={name}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          value={value}
          name={name}
          type={type}
          placeholder={label[0].toLowerCase() + label.slice(1)}
          className={clsx(styles[variant ?? ''], styles['input'], className)}
          {...props}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);
