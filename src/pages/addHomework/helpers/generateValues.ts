import { today } from '@/pages/journal/constants';
import { SCHEDULE_BEGIN, START_DATE } from '@/utils/constants/dates';
import { scheduleDaysFindIndex } from '@/utils/services/scheduleDays/findIndex';
import { scheduleDaysGenerate } from '@/utils/services/scheduleDays/generate';

export const generateValues = () => {
  const values = scheduleDaysGenerate({
    currentYear: START_DATE.year,
    currentMonthIndex: START_DATE.month,
    currentDayIndex: START_DATE.day,
    daysCount: SCHEDULE_BEGIN.days
  });

  const currentDateIndex = scheduleDaysFindIndex(values, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  });

  return { values, currentDateIndex };
};
