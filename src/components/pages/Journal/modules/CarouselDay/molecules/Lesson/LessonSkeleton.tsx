import styles from './Lesson.module.css';
import { Skeleton } from '@/components/ui/Skeleton';

export const LessonSkeleton = () => (
  <section className={styles['container']}>
    <Skeleton height="5rem" background={false} />
  </section>
);
