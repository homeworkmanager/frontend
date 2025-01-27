import styles from './Loader.module.css';
import clsx from 'clsx';

interface LoaderProps extends React.ComponentProps<'div'> {
  spinnerSize?: number;
}

export const Loader = ({ spinnerSize = 40, className, ...props }: LoaderProps) => {
  return (
    <div className={clsx(styles['circular-skeleton'], className)} {...props}>
      <div style={{ width: spinnerSize, height: spinnerSize }} className={styles['spinner']}></div>
    </div>
  );
};
