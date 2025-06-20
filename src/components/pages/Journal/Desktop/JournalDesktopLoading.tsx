import { CarouselDaySkeleton } from '../modules/CarouselDay/CarouselDaySkeleton';

import styles from './JournalDesktop.module.css';
import { CarouselMonthSkeleton } from '@/components/shared/CarouselMonth/CarouselMonthSkeleton';

export const JournalDesktopLoading = () => (
  <div className={styles['journal-body']}>
    <CarouselMonthSkeleton />
    <CarouselDaySkeleton className={styles['desktop']} />
  </div>
);
