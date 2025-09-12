import { Typhography } from '@/shared/ui/Typhography';
import { FIRST_SESSION_DAY, MONTH_DATA, SEM_START } from '@/utils/constants/dates';
import { calculateWeek } from '@/utils/helpers/calculateWeek';

type WeekHeaderVariant = 'mobile' | 'desktop';

interface WeekHeaderProps {
  currentDate: { year: number; month: number; day: number };
  variant: WeekHeaderVariant;
}

const monthData = MONTH_DATA;

export const WeekHeader = ({ currentDate, variant }: WeekHeaderProps) => {
  const sessionStartDate = new Date(FIRST_SESSION_DAY.year, FIRST_SESSION_DAY.month, FIRST_SESSION_DAY.day);
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
