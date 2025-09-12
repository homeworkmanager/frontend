import styles from './LessonsList.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';

const lessons = generateNumericArray(3);

export const LessonsListSkeleton = () => (
  <ul className={styles['list']}>
    {lessons.map((lesson) => (
      <li key={lesson}>
        <Skeleton height="0.5rem" width="0.5rem" radius="50%" className={styles['skeleton-item']} />
      </li>
    ))}
  </ul>
);
