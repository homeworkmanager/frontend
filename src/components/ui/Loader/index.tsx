import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles['circular-skeleton']}>
      <div className={styles['spinner']}></div>
    </div>
  );
};
