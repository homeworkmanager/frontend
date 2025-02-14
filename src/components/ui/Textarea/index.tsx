import React from 'react';

import styles from './Textarea.module.css';
import clsx from 'clsx';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label: string;
  name: string;
  value?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, value, className, ...props }, ref) => (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={name}>
        {label}
      </label>
      <textarea
        ref={ref}
        id={name}
        value={value}
        name={name}
        placeholder={label[0].toLowerCase() + label.slice(1)}
        className={clsx(styles['textarea'], className)}
        {...props}
      />
    </div>
  )
);
