import { SCHEDULE_BEGIN_DATE, START_DATE } from '@/utils/configs/time.config';
import { createDate } from '@/utils/helpers/createDate';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';

const today = new Date();

export const generateValues = () => {
  const values = createDate({
    currentYear: START_DATE.year,
    currentMonthIndex: START_DATE.month,
    currentDayIndex: START_DATE.day,
    daysCount: SCHEDULE_BEGIN_DATE.days
  });

  const currentDateIndex = findIndexByDate(values, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  });

  return { values, currentDateIndex };
};
