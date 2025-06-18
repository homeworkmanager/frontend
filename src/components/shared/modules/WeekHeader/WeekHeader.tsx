import { calculateWeek } from '../../../../utils/helpers/calculateWeek';
import { monthData } from '../../../pages/Journal/constants';

import { Typhography } from '@/components/ui/Typhography';
import { SEM_START } from '@/utils/constants/dates';

type WeekHeaderVariant = 'mobile' | 'desktop';

interface WeekHeaderProps {
  currentDate: { year: number; month: number; day: number };
  firstSessionDay: { year: number; month: number; day: number };
  monthsNumbers: number[];
  variant: WeekHeaderVariant;
}

export const WeekHeader = ({ currentDate, variant, firstSessionDay }: WeekHeaderProps) => {
  const sessionStartDate = new Date(firstSessionDay.year, firstSessionDay.month, firstSessionDay.day);
  const semStartDate = new Date(SEM_START.year, SEM_START.month, SEM_START.day);
  const weekView =
    new Date(currentDate.year, currentDate.month, currentDate.day) < sessionStartDate &&
    new Date(currentDate.year, currentDate.month, currentDate.day) >= semStartDate;

  const weekData = weekView ? `${calculateWeek(currentDate)} неделя` : 'сессия';

  return (
    <Typhography
      tag="h2"
      variant={variant === 'mobile' ? 'thirdy' : 'primary'}
      children={`${monthData[currentDate.month]} ${currentDate.year} — ${weekData}`}
    />
  );
};
