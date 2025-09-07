import { CarouselDaySkeleton } from '../components/CarouselDay';

import { CarouselWeekSkeleton } from '@/widgets/CarouselWeek';

export const JournalMobileLoading = () => (
  <>
    <CarouselWeekSkeleton />
    <CarouselDaySkeleton />
  </>
);
