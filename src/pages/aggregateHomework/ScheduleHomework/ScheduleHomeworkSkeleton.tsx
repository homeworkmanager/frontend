import styles from './ScheduleHomework.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';

const homeworks = generateNumericArray(3);

export const ScheduleHomeworkSkeleton = () => (
  <article className={styles['container']}>
    <div className={styles['title']}>
      <Skeleton height="2rem" width="9.5rem" radius="1rem" className={styles['current']} />
    </div>
    <ul>
      {homeworks.map((_, index) => (
        <div key={index} className={styles['content']}>
          <Skeleton height="8.4rem" radius="0.25rem" />
        </div>
      ))}
    </ul>
  </article>
);
