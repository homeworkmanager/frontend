import clsx from 'clsx';
import styles from './Loader.module.css';

type LoaderProps = React.ComponentProps<'div'>;

export const Loader = ({ className, ...props }: LoaderProps) => {
  return (
    <div className={clsx(styles['circular-skeleton'], className)} {...props}>
      <div className={styles['spinner']}></div>
    </div>
  );
};
