import styles from './HomeworkAggregated.module.css';
import { ScheduleHomeworkSkeleton } from './ScheduleHomework';

export const HomeworkAggregatedLoading = () => (
  <ul className={styles['container']}>
    <li>
      <ScheduleHomeworkSkeleton />
    </li>
  </ul>
);
