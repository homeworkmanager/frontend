import styles from './Auth.module.css';
import { Loader } from '@/components/ui/Loader';

export const AuthLoading = () => (
  <div className={styles['container']}>
    <Loader />
  </div>
);
