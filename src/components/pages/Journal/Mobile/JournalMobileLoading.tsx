import { CarouselDaySkeleton } from '../modules/CarouselDay/CarouselDaySkeleton';

import { CarouselWeekSkeleton } from '@/components/shared/CarouselWeek/CarouselWeekSkeleton';

export const JournalMobileLoading = () => (
  <>
    <CarouselWeekSkeleton />
    <CarouselDaySkeleton />
  </>
);
