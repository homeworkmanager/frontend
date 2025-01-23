
import clsx from 'clsx';
import styles from './Checkbox.module.css';

type CheckboxProps = React.ComponentProps<'input'>;

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return <input {...props} type="checkbox" className={clsx(styles['checkbox'], className)} />;
};