import styles from './Checkbox.module.css';
import clsx from 'clsx';

type CheckboxProps = React.ComponentProps<'input'>;

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return <input {...props} type="checkbox" className={clsx(styles['checkbox'], className)} />;
};
