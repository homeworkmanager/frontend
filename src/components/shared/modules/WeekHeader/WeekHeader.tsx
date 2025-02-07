import { calculateWeek } from '../../../../utils/helpers/calculateWeek';
import { monthData } from '../../../Pages/Journal/constants';

import { Typhography } from '@/components/ui/Typhography';
import { semStart } from '@/utils/constants/time';

type WeekHeaderVariant = 'mobile' | 'desktop';

interface WeekHeaderProps {
  currentDate: { year: number; month: number; day: number };
  firstSessionDay: { year: number; month: number; day: number };
  monthsNumbers: number[];
  index: number;
  variant: WeekHeaderVariant;
}

export const WeekHeader = ({ currentDate, variant, firstSessionDay }: WeekHeaderProps) => {
  const sessionStartDate = new Date(firstSessionDay.year, firstSessionDay.month, firstSessionDay.day);
  const semStartDate = new Date(semStart.year, semStart.month, semStart.day);
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
