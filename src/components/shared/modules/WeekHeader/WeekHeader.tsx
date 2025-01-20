import React from 'react';

import { monthData } from '../../../Pages/Journal/constants';
import { calculateWeek } from '../../../Pages/Journal/helpers/calculateWeek';

import { Typhography } from '@/components/ui/Typhography';

type WeekHeaderVariant = 'mobile' | 'desktop';

interface WeekHeaderProps {
  currentDate: { year: number; month: number; day: number };
  firstSessionDay: { year: number; month: number; day: number };
  monthsNumbers: number[];
  index: number;
  variant: WeekHeaderVariant;
}

export const WeekHeader = ({ currentDate, index, variant, firstSessionDay }: WeekHeaderProps) => {
  const sessionStartDate = new Date(firstSessionDay.year, firstSessionDay.month, firstSessionDay.day);
  const isSession = new Date(currentDate.year, currentDate.month, currentDate.day) >= sessionStartDate;

  const weekData = !isSession ? `${calculateWeek(index)} неделя` : 'сессия';

  return (
    <React.Fragment>
      <Typhography
        tag="h2"
        variant={variant === 'mobile' ? 'thirdy' : 'primary'}
        children={`${monthData[currentDate.month]} ${currentDate.year} — ${weekData}`}
      />
    </React.Fragment>
  );
};
