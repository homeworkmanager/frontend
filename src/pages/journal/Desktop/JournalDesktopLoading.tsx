import { CarouselDaySkeleton } from '../components/CarouselDay';

import styles from './JournalDesktop.module.css';
import { CarouselMonthSkeleton } from '@/widgets/CarouselMonth';

export const JournalDesktopLoading = () => (
  <div className={styles['journal-body']}>
    <CarouselMonthSkeleton />
    <CarouselDaySkeleton className={styles['desktop']} />
  </div>
);
